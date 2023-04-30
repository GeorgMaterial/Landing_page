// DEFINING SOME VARIABLES //

const navbar__ul = document.querySelector('#navbar__list') ;
const sections__el = document.querySelectorAll('section') ;
const page__header = document.querySelector('.page__header') ;
const vpHeight = visualViewport.height ;
const links = [] ;

let rect = page__header.getBoundingClientRect();
const header_bottom = rect['bottom'] ;



// CREATING DYNAMIC NAVBAR //

function getButton(section){
    let data_attr = section.getAttribute('data-nav') ;
    let new_li = document.createElement('li') ;
    new_li.dataset.nav = data_attr ;
    let button = document.createElement('button') ;
    button.className = `nav__button` ;
    button.innerText = data_attr ;
    button.dataset.section = section.id ; 
    new_li.appendChild(button) ;
    navbar__ul.appendChild(new_li) ;

    return button ;
}

// CLASS OF LINKS BETWEEN SECTIONS & NAV BUTTONS //

class Link {

    constructor(section){
        this.nav_button = getButton(section) ;
        this.section = section ;
        this.lyric_button = section.querySelector('button') ;
        
    }

    // DETERMINE IF SECTION IS 'ACTIVE' (IN VIEWPORT/WINDOW) //

    active(){
        const rect = this.section.getBoundingClientRect();
        let s_top = rect['top'] ;
        let s_bottom = rect['bottom'] ;
        if (s_top >= header_bottom & s_bottom <= vpHeight) {

            // Add some math so that it's still active when 90% is on screen //

            this.nav_button.classList.add('__active') ;
            this.section.classList.add('__active') ;

            return true ;

        } else {

            this.nav_button.classList.remove('__active') ;
            this.section.classList.remove('__active') ;
            
            return false ;

        }
    }

}

// creates group of link objects //

for (let section of sections__el){
    let link = new Link(section)
    links.push(link) ;

    // adds scroll on click functionality //
    link.nav_button.addEventListener('click', _ => {
        if (link.active() !== true ){
            link.section.scrollIntoView({block: 'center', behavior:'smooth'});
        }
    })
    
    link.lyric_button.addEventListener('click', _ => {
        let lyrics = link.section.querySelector('.lyrics') ;
        lyrics.toggleAttribute('active');
        link.lyric_button.toggleAttribute('active');
        if (lyrics.hasAttribute('active')){
            link.lyric_button.innerHTML = "<em>Hide Lyrics</em>" ;
        } else {
            link.lyric_button.innerHTML = "<em>View Lyrics</em>" ;
        }
    })
}  

// SCROLL EVENT LISTENER //

document.addEventListener("scroll", _ => {
    for (let link of links ){
        link.active() ;
    }

    // back to top //

});





