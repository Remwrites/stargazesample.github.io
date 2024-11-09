document.addEventListener("DOMContentLoaded", function () {
    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const clearText = document.getElementById('clearText');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && clearText && searchButton) {
        searchInput.addEventListener('input', function () {
            clearText.style.display = searchInput.value.trim().length > 0 ? 'inline' : 'none';
        });

        clearText.addEventListener('click', function () {
            searchInput.value = '';
            clearText.style.display = 'none';
            searchInput.focus();
        });

        function handleSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                window.location.href = `results.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }

        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') handleSearch();
        });
    } else {
        console.error('Search input, clear text button, or search button not found.');
    }

    // Initialize the results page
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';
    const resultsContainer = document.querySelector('.results');

    const services = {
        "face care": [{ img: "images/facetreatments.jpg", title: "Face Treatments", link: "facetreatments.html" }],
        "skin treatments": [{ img: "images/microtest3.jpg", title: "Microneedling", link: "rfmicro.html" }],
        "dermaplaning": [{ img: "images/dermaplanninggirl.jpg", title: "Dermaplaning", link: "facetreatments.html" }],
        "mesotherapy": [{ img: "images/mesogirl.jpg", title: "Mesotherapy", link: "facetreatments.html" }],
        "prp face": [{ img: "images/prpfacehead.jpg", title: "PRP Face", link: "prpface.html" }],
        "hair removal": [{ img: "images/laserhairbody.jpg", title: "Hair Removal", link: "laserhair.html" }],
        "laser treatments": [{ img: "images/laserhair4.jpg", title: "Laser Treatments", link: "laserhair.html" }],
        "anti-wrinkle injections": [{ img: "images/antiwrinkle.jpg", title: "Anti-Wrinkle Injections", link: "antiwrinkle.html" }],
        "fillers": [{ img: "images/hairfiller.jpg", title: "Hair Fillers", link: "hairtreatments.html" }],
        "acne treatment": [{ img: "images/warttowellady.jpg", title: "Acne Treatment", link: "facetreatments.html" }],
        "scar treatment": [{ img: "images/wrinkleheadergirl.jpg", title: "Warts, Moles & Skin Tags", link: "warts.html" }],
        "wart treatment": [{ img: "images/wrinkleheadergirl.jpg", title: "Warts, Moles & Skin Tags", link: "warts.html" }],
        "mole treatment": [{ img: "images/wrinkleheadergirl.jpg", title: "Warts, Moles & Skin Tags", link: "warts.html" }],
        "skin tag treatment": [{ img: "images/wrinkleheadergirl.jpg", title: "Warts, Moles & Skin Tags", link: "warts.html" }],
        "hair loss treatment": [{ img: "images/prptreathair.jpg", title: "Hair Loss Treatment", link: "hairtreatments.html" }],
        "prp hair": [{ img: "images/prphair.jpg", title: "Hair Loss Treatment", link: "prptreatments.html" }],
        "vitamin treatment": [{ img: "images/vitamintherapy.jpg", title: "Vitamin Treatment", link: "vitamin.html" }],
       "microneedling": [{ img: "images/microtest1.jpg", title: "Micro Treatment", link: "rfmicro.html" }],
       "face wrinkles": [{ img: "images/antiwrinkle.jpg", title: "Face Wrinkles", link: "antiwrinkle.html" }],
       "facial": [{ img: "images/hydra1.jpg", title: "Hydra Facial", link: "hydrafacial.html" }],
    };

    const keyTerms = {
        "face": ["face care", "skin treatments", "dermaplaning", "mesotherapy", "prp face", "facial"],
        "skin": ["skin treatments", "mesotherapy", "prp face", "chemical peels", "facials", "microdermabrasion"],
        "hair": ["hair removal", "hair loss treatment, prp hair"],
        "laser": ["laser treatments", "hair removal", "tattoo removal"],
        "wrinkle": ["anti-wrinkle injections", "fillers"],
        "filler": ["fillers", "dermal fillers"],
        "peel": ["chemical peels", "facials"],
        "acne": ["acne treatment"],
        "scar": ["scar treatment"],
        "vein": ["vein treatment"],
        "hyperpigmentation": ["hyperpigmentation treatment"],
        "tightening": ["skin tightening"],
        "stretch marks": ["stretch marks treatment"],
        "microneedling": ["Microneedling", "skin treatments"],
        "facial": ["facial", "face wrinkles"]
    };

    function getResults(searchTerm) {
        let results = [];
        for (const [term, pages] of Object.entries(services)) {
            if (term.includes(searchTerm) || searchTerm.split(' ').some(word => term.includes(word))) {
                results = results.concat(pages);
            }
        }

        for (const [key, relatedTerms] of Object.entries(keyTerms)) {
            if (searchTerm.includes(key)) {
                relatedTerms.forEach(relatedTerm => {
                    if (services[relatedTerm]) {
                        results = results.concat(services[relatedTerm]);
                    }
                });
            }
        }

        return results;
    }

    if (resultsContainer) {
        const results = getResults(searchTerm);
        const seenServices = new Set();

        if (results.length > 0) {
            resultsContainer.innerHTML = results.map(result => {
                if (!seenServices.has(result.title)) {
                    seenServices.add(result.title);
                    return `
                        <div class="service">
                            <img src="${result.img}" alt="${result.title}">
                            <div class="service-details">
                                <h3>${result.title}</h3>
                                <a href="${result.link}" class="view-details">View Details</a>
                            </div>
                        </div>
                    `;
                }
                return '';
            }).join('');
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }

    // Scroll Functionality for fixed buttons
    const fixedButtons = document.getElementById("fixed-buttons");
    const heroSection = document.getElementById("home");
    const servicesSection = document.getElementById("services");

    if (fixedButtons && heroSection && servicesSection) {
        window.addEventListener("scroll", function () {
            const heroSectionBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const servicesSectionTop = servicesSection.offsetTop;
            const servicesSectionBottom = servicesSectionTop + servicesSection.offsetHeight;
            const scrollPosition = window.scrollY || window.pageYOffset;

            if (scrollPosition >= servicesSectionTop && scrollPosition < servicesSectionBottom) {
                fixedButtons.style.display = "flex";
            } else {
                fixedButtons.style.display = "none";
            }
        });
    } else {
        console.error('One or more elements for scroll functionality not found.');
    }

    // Slider functionality
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;

if (slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
    function createDots() {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add(i === 0 ? 'active' : '');
            dot.setAttribute('data-slide', i);
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(slide) {
        const sliderWrapper = document.querySelector('.slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${slide * 100}%)`;
            document.querySelectorAll('.slider-dots button').forEach(dot => dot.classList.remove('active'));
            document.querySelector(`.slider-dots button[data-slide="${slide}"]`).classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dotsContainer.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            currentSlide = parseInt(e.target.getAttribute('data-slide'));
            goToSlide(currentSlide);
        }
    });

    createDots();
} else {
    console.error('One or more elements for slider functionality not found.');
}


    // Microslider functionality
    const microslides = document.querySelectorAll('.microslide');
    const microsliderPrevBtn = document.querySelector('.microslider-navigation .prev');
    const microsliderNextBtn = document.querySelector('.microslider-navigation .next');
    const microsliderDotsContainer = document.querySelector('.microslider-dots');
    let currentMicroslide = 0;

    if (microslides.length > 0 && microsliderPrevBtn && microsliderNextBtn && microsliderDotsContainer) {
        function createMicrosliderDots() {
            microslides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add(i === 0 ? 'active' : '');
                dot.setAttribute('data-slide', i);
                microsliderDotsContainer.appendChild(dot);
            });
        }

        function goToMicroslide(slide) {
            const microsliderWrapper = document.querySelector('.microslider-wrapper');
            if (microsliderWrapper) {
                microsliderWrapper.style.transform = `translateX(-${slide * 100}%)`;
                document.querySelectorAll('.microslider-dots button').forEach(dot => dot.classList.remove('active'));
                document.querySelector(`.microslider-dots button[data-slide="${slide}"]`).classList.add('active');
            }
        }

        function nextMicroslide() {
            currentMicroslide = (currentMicroslide + 1) % microslides.length;
            goToMicroslide(currentMicroslide);
        }

        function prevMicroslide() {
            currentMicroslide = (currentMicroslide - 1 + microslides.length) % microslides.length;
            goToMicroslide(currentMicroslide);
        }

        microsliderPrevBtn.addEventListener('click', prevMicroslide);
        microsliderNextBtn.addEventListener('click', nextMicroslide);

        microsliderDotsContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                currentMicroslide = parseInt(e.target.getAttribute('data-slide'));
                goToMicroslide(currentMicroslide);
            }
        });

        createMicrosliderDots();
        goToMicroslide(currentMicroslide); // Initialize the microslider position
    } else {
        console.error('One or more elements for the microslider functionality not found.');
    }

    // Q&A toggle functionality
    const qaItems = document.querySelectorAll('.qa-item');

    if (qaItems.length > 0) {
        qaItems.forEach(item => {
            const question = item.querySelector('.qa-question');
            const answer = item.querySelector('.qa-answer');
            const toggle = item.querySelector('.qa-toggle');

            if (question && answer && toggle) {
                question.addEventListener('click', () => {
                    qaItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherAnswer = otherItem.querySelector('.qa-answer');
                            const otherToggle = otherItem.querySelector('.qa-toggle');
                            otherAnswer.style.maxHeight = null;
                            otherToggle.innerHTML = '&#9662;';
                        }
                    });

                    const isActive = item.classList.toggle('active');
                    answer.style.maxHeight = isActive ? answer.scrollHeight + 'px' : null;
                    toggle.innerHTML = isActive ? '&#9650;' : '&#9662;';
                });
            }
        });
    } else {
        console.error('Q&A items not found.');
    }

// Select the hamburger icon and the mobile menu
const hamburger = document.getElementById('hamburger');  // Use the correct ID
const mobileMenu = document.getElementById('mobileMenu');  // Use the correct ID

// Ensure both elements are available before adding the event listener
if (hamburger && mobileMenu) {
    // Add a click event to the hamburger menu
    hamburger.addEventListener('click', function () {
        // Toggle the 'open' class to show or hide the menu
        mobileMenu.classList.toggle('open');
    });
} else {
    console.error('Hamburger menu or mobile menu not found.');
}


    // Accordion functionality
    document.querySelectorAll('.accordion-title').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });

    // Read More functionality
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', () => {
            const moreText = button.previousElementSibling.querySelector('.more-text');
            moreText.style.display = moreText.style.display === 'none' || moreText.style.display === '' ? 'inline' : 'none';
            button.textContent = moreText.style.display === 'inline' ? 'Read Less' : 'Read More';
        });
    });
// Toggle mobile menu visibility
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('open');
    } else {
        console.error('Mobile menu not found.');
    }
}

   

    console.log("JavaScript file is loaded");
});
