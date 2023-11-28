document.addEventListener('DOMContentLoaded', function () {
    function searchMovie() {
        const apiKey = '02060eb776090fd24272888c1f1cf44e';
        const searchInput = document.getElementById('searchInput').value;

        // Faça a chamada à API usando fetch
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}&language=pt-BR`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na chamada à API do TMDb.');
                }
                return response.json();
            })
            .then(data => {
                // Exiba as informações do filme (ou faça o que desejar)
                const searchResults = document.getElementById('searchResults');
                if (data.results.length > 0) {
                    const movieId = data.results[0].id; // Obtemos o ID do filme
                    return Promise.all([
                        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`),
                        fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`)
                    ]);
                } else {
                    // Exemplo: Informar que nenhum resultado foi encontrado
                    searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
                }
            })
            .then(([movieResponse, providersResponse]) => Promise.all([movieResponse.json(), providersResponse.json()]))
            .then(([movie, providers]) => {
                // Exiba as informações detalhadas do filme
                const title = movie.title;
                const releaseDate = formatBrazilianDate(movie.release_date); // Formatar a data
                const director = getDirector(movie);
                const actors = getActors(movie);
                const overview = movie.overview;
                const streamingProviders = getStreamingProviders(providers);

                // Exemplo: Exibir informações na página
                const searchResults = document.getElementById('searchResults');
                searchResults.innerHTML = `
                    <h2>${title}</h2>
                    <p><strong>Ano de Lançamento:</strong> ${releaseDate}</p>
                    <p><strong>Diretor:</strong> ${director}</p>
                    <p><strong>Atores:</strong> ${actors.join(', ')}</p>
                    <p><strong>Resumo:</strong> ${overview}</p>
                    <p><strong>Disponível em:</strong> ${streamingProviders}</p>
                `;
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    function formatBrazilianDate(dateString) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function getDirector(movie) {
        const director = movie.credits?.crew?.find(person => person.job === 'Director');
        return director ? director.name : 'Não disponível';
    }

    function getActors(movie) {
        const actors = movie.credits?.cast?.slice(0, 5) || []; // Pegue os primeiros 5 atores
        return actors.map(actor => actor.name);
    }

    function getStreamingProviders(providers) {
        const results = [];
        const streamingInfo = providers.results?.BR; // Altere 'BR' para o código do país desejado, se necessário
    
        if (streamingInfo?.flatrate) {
            for (const provider of streamingInfo.flatrate) {
                results.push(provider.provider_name);
            }
        }
    
        return results.length > 0 ? results.join(', ') : 'Não disponível';
    }    

    // Adicione este evento de clique ao botão
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', searchMovie);
    }
});
