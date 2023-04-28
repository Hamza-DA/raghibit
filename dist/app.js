gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
window.scrollTo(0, 0);

const infiniteTextScroll = () => {
    const marquee = document.querySelector('.marquee')
    const marqueeContent = marquee.firstElementChild
    const maruqeeContentClone = marqueeContent.cloneNode(true);
    marquee.appendChild(maruqeeContentClone)



    const width = parseInt(getComputedStyle(marqueeContent).getPropertyValue('width'), 10)
    const gap = parseInt(getComputedStyle(marqueeContent).getPropertyValue('column-gap'), 10)


    gsap.fromTo(
        marquee.children,
        { x: 0 },
        { x: -1 * (width + gap), duration: 25, ease: 'none', repeat: -1 }
    )
}


infiniteTextScroll()


const parameters = {
    ease: "expo.out", duration: 1, stagger: 0.1
}
let initTl = gsap.timeline({
    delay: 2
})
initTl.fromTo('.wrapper', { paddingTop: 40 }, { paddingTop: 0, ...parameters }).to('.loader', {
    height: 0, ...parameters,
    onComplete: () => {
        animateBlackSection()
        serviceItemImageAnimation()
    },

}, '-=1')

const animateServicesSection = () => {
    const servicesSection = gsap.timeline({
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
            end: 'bottom 50%',
            // markers: true,
            toggleActions: "play none reset none",


        }
    })

    servicesSection
        .fromTo('.service-heading', { opacity: 0, y: 40, rotateX: '30deg' }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: .2, ease: 'expo.out' })
        .fromTo('.service-item', { opacity: 0, y: 40, rotateX: '30deg' }, {
            opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: .2, ease: 'expo.out', onComplete: () => {
                serviceItemImageAnimation()
            },
        })
}


ScrollTrigger.normalizeScroll(true);

const animateBlackSection = () => {
    gsap.set('.black-sec', {
        y: -window.innerHeight,
        zIndex: 0
    });
    let timeLine = gsap.timeline({
        scrollTrigger: {
            trigger: ".black-sec",
            start: "top top",
            end: `top+=${window.innerHeight} top`,
            // start: "top 50%",
            // end: 'bottom bottom',
            pinSpacing: false,
            pin: true,
            toggleActions: "play none none reverse",
            scrub: 2,
            // markers: true
        }
    });
    const parameters = {
        ease: "expo.out", duration: 2, stagger: 0.5, delay: 3
    }
    timeLine.fromTo('.black-sec span', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, ...parameters, stagger: .4
    })
        .fromTo('.black-sec p', { opacity: 0, x: 40 }, {
            opacity: 1, x: 0, ...parameters
        }, "<+= 1")
        .fromTo('.black-sec img', { opacity: 0, y: '20%' }, {
            opacity: 1, y: 0, ...parameters
        }, "-= .5")
}

const backToTopButton = document.querySelector('.btt')
const bttContent = document.querySelector('.btt-text')
const bttArrow = document.querySelector('.btt-arrow')

backToTopButton.addEventListener('click', () => {
    gsap.to(window, { duration: 2, scrollTo: document.querySelector('.services').getBoundingClientRect().top - 40, ease: 'expo.out' });
})

window.addEventListener('scroll', () => {
    scrollIndicator();
    if (window.scrollY > 100) {
        bttContent.textContent = 'Back to top'
        bttArrow.classList.add('rotate-180')
        // back to top if the user's Y position is above 100 pixels
        backToTopButton.addEventListener('click', () => {
            gsap.to(window, { duration: 2, ease: 'expo.out', scrollTo: 0 });
        })
    } else {
        // scroll to Services section
        backToTopButton.addEventListener('click', () => {
            gsap.to(window, { duration: 2, scrollTo: document.querySelector('.services').getBoundingClientRect().top - 40, ease: 'expo.out' });
        })
        bttArrow.classList.remove('rotate-180')
        bttContent.textContent = 'Scroll down'
    }
})
const scrollIndicator = () => {
    // set scrollbar height based on the returned percentage
    gsap.to('.scroll-bar', { height: `${getScrollPercent()}%`, duration: 2, ease: 'expo.out' })
    // get scroll percentage based on user Y position and return it
    function getScrollPercent() {
        var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    }
}


const serviceItemImageAnimation = () => {


    const navLinks = document.querySelectorAll('.service-item')
    const cursor = document.querySelector('.service-image-wrapper')
    const cursorMedias = document.querySelectorAll('.service-image')
    const servicesSection = document.querySelector('.services')

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        scale: .8
    });

    const setCursorX = gsap.quickTo(cursor, "x", {
        duration: 0.6,
        ease: "expo.out"
    });

    const setCursorY = gsap.quickTo(cursor, "y", {
        duration: 0.6,
        ease: "expo.out"
    });

    window.addEventListener("mousemove", (e) => {
        setCursorX(e.clientX);
        setCursorY(e.clientY);
    });

    const tl = gsap.timeline({
        paused: true
    });

    tl.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: .5,
        ease: "expo.Out"
    });

    navLinks.forEach((navLink, i) => {
        navLink.addEventListener("mouseover", () => {
            gsap.to(cursorMedias[i], { opacity: .5, duration: 0.5 })

            tl.play();
        });
    });

    navLinks.forEach((navLink, i) => {
        navLink.addEventListener("mouseout", () => {
            tl.reverse();
            gsap.to(cursorMedias[i], { opacity: 0, duration: 0.5 })

        });
    });
}

