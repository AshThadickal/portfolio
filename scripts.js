
const myPage = {};

myPage.init = () => {
    myPage.handleNavigation();
    // myPage.fadeOut();
    // myPage.handleScrollAnimation();
    // myPage.scrollEventListener();
}

// // need a handle click of the nav anchors to smooth scroll to the section

myPage.handleNavigation = () => {
    const navLinks = document.querySelectorAll('.navContainer ul li a')
    for (let navLink of navLinks) {
        navLink.addEventListener('click', myPage.handleNavScroll);
    }
}

myPage.handleNavScroll = function handleNavClick(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;
    
    scroll({
        top: offsetTop,
        behavior: 'smooth'
    });

}

// need scroll functions such that elements become visible on scolling the page

myPage.scrollElements = document.querySelectorAll('.jsScroll');

myPage.elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return elementTop <= (window.innerHeight || document.documentElement.clientHeight / dividend);
};

myPage.elementOutOfView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

myPage.displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

myPage.hideScrollElement = (element) => {
    element.classList.remove('scrolled');
};

myPage.handleScrollAnimation = () => {
    myPage.scrollElements.forEach((el) => {
        if(myPage.elementInView(el, 1.25)) {
            myPage.displayScrollElement(el);
        } else if (myPage.elementOutOfView(el)) {
            myPage.hideScrollElement(el);
        }
    })
}

window.addEventListener('scroll', () => {
    myPage.handleScrollAnimation();
})




// need a handle click of a hamburger menu on mobile to open a menu and to close (display block/none?)



myPage.init();

