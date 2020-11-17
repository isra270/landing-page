/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/*create section 4*/
// let section4 = document.createElement('section')
// section4.setAttribute("id","section4")
// section4.setAttribute("data-nav","Section 3")
// let div1 = document.createElement("div")
// div1.setAttribute("class","landing__container")
// let heading = document.createElement("h2")
// heading.textContent='Section 4'
// let phar1 = document.createElement("p")
// phar1.textContent='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus'
// let phar2 = document.createElement("p")
// phar2.textContent='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentummetus faucibus'
//
// div1.appendChild(heading)
// div1.appendChild(phar1)
// div1.appendChild(phar2)
// section4.appendChild(div1)
// let fragramtsection = document.createDocumentFragment()
//
// let main= document.getElementsByTagName("main")
// fragramtsection.appendChild(section4)
// main.appendChild(fragramtsection)
// document.append(main,section4)

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section')
let ul = document.getElementById('navbar__list')
let fragramtLi = document.createDocumentFragment()


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//sectionViewport is the section start top in view port that is active section
function sectionViewport(){
    let activeSection = sections[0];
    minVal =1000000
    sections.forEach(section =>{
        let rect = section.getBoundingClientRect()
        if (rect.top > -200 && rect.top < minVal){
            activeSection = section
            minVal= rect.top
            // console.log('activvvvvvvv    ',activeSection)
        }
    })
    // console.log('activvvvvvvv  +++++  ',activeSection)
    return activeSection
}
//active link set active active and remove active link on other based on section active
function activeLink(activeSection){
     let links = document.querySelectorAll('a')
     let sectionData = activeSection.getAttribute('data-nav')
    for(let alink of links){
        if(alink.textContent != sectionData && alink.classList.contains('active_link')) {
           alink.classList.remove('active_link')
        }
        if(alink.textContent == sectionData){
            alink.classList.add('active_link')
            // console.log('active link',alink)
         }
    }

}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    sections.forEach(section => {
        let nameLink = section.getAttribute('data-nav')
        let sectionID = section.getAttribute('id')
        let li = document.createElement('li')
        let alink = document.createElement('a')
        // alink.setAttribute('href','#'+sectionID)
        alink.setAttribute('data-nav',sectionID)
        alink.textContent = nameLink
        alink.className = "menu__link"

        section.scrollIntoView({behavior: 'smooth'})

        li.appendChild(alink)
        fragramtLi.appendChild(li)
    })
    ul.appendChild(fragramtLi)
}


// Add class 'active' to section when near top of viewport
function setActive(){
    window.addEventListener('scroll', function (event) {
        let sectionActive = sectionViewport()
        //remove property active class from all sections
        for (let sectionStatus of sections) {
            if (sectionStatus.id != sectionActive.id && sectionStatus.classList.contains('your-active-class')) {
                sectionStatus.classList.remove('your-active-class')
            }
        }
        //add active class to section active
        sectionActive.classList.add('your-active-class')
        activeLink(sectionActive)
    })
}

// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    ul.addEventListener('click', function (event) {
        const section = document.querySelector('#' + event.target.dataset.nav)

        section.scrollIntoView()
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav()
// Scroll to section on link click
scrollToClick()
// Set sections as active
setActive()

