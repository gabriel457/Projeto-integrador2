class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();

  document.addEventListener('DOMContentLoaded', function () {
    function searchMovie() {
        const apiKey = '02060eb776090fd24272888c1f1cf44e';
        const searchInput = document.getElementById('searchInput').value;

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}&language=pt-BR`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na chamada à API do TMDb.');
                }
                return response.json();
            })
            .then(data => {
                const searchResults = document.getElementById('searchResults');
                if (data.results.length > 0) {
                    const movie = data.results[0];
                    const movieId = movie.id;
                    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,genres,watch/providers`);
                } else {
                    searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
                }
            })
            .then(movieResponse => movieResponse.json())
            .then(movie => {
                const title = movie.title;
                const releaseDate = formatBrazilianDate(movie.release_date);
                const director = getDirector(movie);
                const actors = getActors(movie);
                const overview = movie.overview;
                const genres = getGenres(movie);
                const duration = getDuration(movie);
                const streamingProviders = getStreamingProviders(movie);

                const searchResults = document.getElementById('searchResults');
                searchResults.innerHTML = `
                    <h2>${title}</h2>
                    <p><strong>Ano de Lançamento:</strong> ${releaseDate}</p>
                    <p><strong>Diretor:</strong> ${director}</p>
                    <p><strong>Atores:</strong> ${actors.join(', ')}</p>
                    <p><strong>Gêneros:</strong> ${genres.join(', ')}</p>
                    <p><strong>Duração:</strong> ${duration}</p>
                    <p><strong>Resumo:</strong> ${overview}</p>
                    <p><strong>Provedores de Streaming:</strong> ${streamingProviders.join(', ')}</p>
                `;

                const addToFavoritesBtn = document.createElement('button');
                addToFavoritesBtn.id = 'addToFavoritesBtn';
                addToFavoritesBtn.className = 'btn btn-primary mt-3';
                addToFavoritesBtn.style.display = 'block';
                addToFavoritesBtn.innerText = 'Adicionar aos Favoritos';

                addToFavoritesBtn.addEventListener('click', function () {
                    addToFavorites(movie); 
                });

                searchResults.appendChild(addToFavoritesBtn);
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    function addToFavorites(movie) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
        if (!favorites.includes(movie.title)) {
            favorites.push(movie.title);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Adicionado aos favoritos!');
        } else {
            alert('Este filme já está nos favoritos.');
        }
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
        const actors = movie.credits?.cast?.slice(0, 5) || [];
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

    function getStreamingProviders(movie) {
        if (movie['watch/providers'] && movie['watch/providers'].results && movie['watch/providers'].results.BR) {
            const providers = movie['watch/providers'].results.BR.flatrate || [];
            return providers.map(provider => provider.provider_name);
        } else {
            return ['Informações de provedores não disponíveis'];
        }
    }

    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', searchMovie);
    }
});

function getFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Favoritos:', favorites);
    return favorites;
}











