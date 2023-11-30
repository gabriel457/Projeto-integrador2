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
                    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,genres`);
                } else {
                    // Exemplo: Informar que nenhum resultado foi encontrado
                    searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
                }
            })
            .then(movieResponse => movieResponse.json())
            .then(movie => {
                // Exiba as informações detalhadas do filme, incluindo duração e gêneros
                const title = movie.title;
                const releaseDate = formatBrazilianDate(movie.release_date); // Formatar a data
                const director = getDirector(movie);
                const actors = getActors(movie);
                const overview = movie.overview;
                const genres = getGenres(movie);
                const duration = getDuration(movie);

                // Exemplo: Exibir informações na página
                const searchResults = document.getElementById('searchResults');
                searchResults.innerHTML = `
                    <h2>${title}</h2>
                    <p><strong>Ano de Lançamento:</strong> ${releaseDate}</p>
                    <p><strong>Diretor:</strong> ${director}</p>
                    <p><strong>Atores:</strong> ${actors.join(', ')}</p>
                    <p><strong>Gêneros:</strong> ${genres.join(', ')}</p>
                    <p><strong>Duração:</strong> ${duration} minutos</p>
                    <p><strong>Resumo:</strong> ${overview}</p>
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

    function getGenres(movie) {
        const genres = movie.genres || [];
        return genres.map(genre => genre.name);
    }

    function getDuration(movie) {
        const durationInMinutes = movie.runtime;
        
        if (durationInMinutes) {
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;
    
            return `${hours}h ${minutes}min`;
        } else {
            return 'Não disponível';
        }
    }

    // Adicione este evento de clique ao botão
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', searchMovie);
    }
});
