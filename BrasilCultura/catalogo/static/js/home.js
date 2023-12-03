document.getElementById('login-link').addEventListener('click', function() {
    window.location.href = '/login/'; 
});

document.getElementById('cadastro-link').addEventListener('click', function() {
    window.location.href = '/cadastro/'; 
    });

document.getElementById('cartaz-link').addEventListener('click', function() {
    window.location.href = '/cinema/'; 
    });
    
document.getElementById('breve-link').addEventListener('click', function() {
    window.location.href = '/breve/embreve.html'; 
        });

document.getElementById('pesquisar-button').addEventListener('click', function() {
        window.location.href = 'pesquisa/'; 
            });
    
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

    

