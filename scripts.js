
const myPage = {};

myPage.init = () => {
    myPage.handleNavigation();
    myPage.handleScroll();
    myPage.arrowDownClick();
    myPage.mobileMenuListener();
    myPage.closeMobileListener();
}

// // need a handle click of the nav anchors to smooth scroll to the section

myPage.handleNavigation = () => {
    const navLinks = document.querySelectorAll('.hrefLink a')
    for (const navLink of navLinks) {
        console.log(navLink)
        navLink.addEventListener('click', myPage.handleNavScroll);
    }
}

myPage.arrowDownClick = function (e) {
    const arrowDown = document.querySelector('.arrowDown')
    arrowDown.addEventListener('click', myPage.handleNavScroll)
}

myPage.handleNavScroll = function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;
    
    scroll({
        top: offsetTop,
        behavior: 'smooth'
    });

}

// need scroll functions such that elements become visible on scolling the page

// managing the amount of time the scroll is checked
myPage.debounce = function (func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
        timeout = null;
        if (!immediate) func.apply(context.args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
    };
};

myPage.scrollElements = document.querySelectorAll('.jsScroll');
console.log(myPage.scrollElements)
myPage.checkSlide = function(e) {
    myPage.scrollElements.forEach(scrollElement => {
        // halfway through the element
        const slideInAt = (window.scrollY + window.innerHeight) - scrollElement.clientHeight / 2;
        // bottom of element
        const elementBottom = scrollElement.offsetTop + scrollElement.clientHeight;
        const isHalfShown = slideInAt > scrollElement.offsetTop;
        const isNotScrolledPast = window.scrollY < elementBottom
        if(isHalfShown && isNotScrolledPast) {
            scrollElement.classList.add('scrolled');
        } else {
            scrollElement.classList.remove('scrolled');
        }
    })
}

myPage.handleScroll = function() {
    window.addEventListener('scroll', myPage.debounce(myPage.checkSlide))
}
// need a handle click of a hamburger menu on mobile to open a menu and to close (display block/none?)

myPage.mobileMenuListener = function() {
    const burger = document.querySelector('.mobileMenuButton');
    const mobileNav = document.querySelector('.mobileNav');
    
    burger.addEventListener('click', function(e) {
        this.classList.toggle('mobileNavIsOpen');
        mobileNav.classList.toggle('mobileNavIsOpen');
        
    });
}

myPage.closeMobileListener = function() {
    const anchorTags = document.querySelectorAll('.mobileNav a');
    const burger = document.querySelector('.mobileMenuButton');
    const mobileNav = document.querySelector('.mobileNav');

    console.log(anchorTags)
    anchorTags.forEach(anchor => {
        anchor.addEventListener('click', function() {
            burger.classList.toggle('mobileNavIsOpen');
            mobileNav.classList.toggle('mobileNavIsOpen');
        })
    })
}

myPage.init();

