(function () {
    "use strict";

    const LANGUAGES = {
        en: {
            pageTitle: "CodeNest - Editable Web Systems",
            pageDescription: "CodeNest is a two-person digital studio building editable web systems, municipal portals, booking flows, admin interfaces and managed websites.",
            languageChanged: "Language changed: English",
            sending: "Sending... Please wait.",
            success: "Sent successfully. Thank you.",
            errors: "Please check the required fields.",
            nameRequired: "Name is required",
            emailRequired: "Email is required",
            emailInvalid: "Please enter a valid email address",
            projectRequired: "Project type is required",
            submitError: "An error occurred while sending. Please try again.",
            switchLabel: "Magyarra váltás"
        },
        hu: {
            pageTitle: "CodeNest - Szerkeszthető webes rendszerek",
            pageDescription: "A CodeNest kétfős digitális stúdió szerkeszthető webes rendszerekhez, települési portálokhoz, foglalási folyamatokhoz, adminfelületekhez és üzemeltetéshez.",
            languageChanged: "Nyelv megváltoztatva: Magyar",
            sending: "Küldés folyamatban... Kérjük várj.",
            success: "Sikeresen elküldve. Köszönjük.",
            errors: "Kérjük, ellenőrizd a kötelező mezőket.",
            nameRequired: "A név megadása kötelező",
            emailRequired: "Az email megadása kötelező",
            emailInvalid: "Kérjük, érvényes email címet adj meg",
            projectRequired: "A projekttípus kiválasztása kötelező",
            submitError: "Hiba történt a küldés során. Próbáld újra.",
            switchLabel: "Switch to English"
        }
    };

    let currentLang = "en";
    const EMAILJS_PUBLIC_KEY = "l6VpSyq4uewrDcg_u";
    const EMAILJS_SERVICE_ID = "service_mkhy8en";
    const EMAILJS_TEMPLATE_ID = "template_hdly37v";

    function getSavedLanguage() {
        const hashLang = window.location.hash.replace("#", "");
        if (LANGUAGES[hashLang]) return hashLang;

        const savedLang = localStorage.getItem("preferredLanguage");
        if (LANGUAGES[savedLang]) return savedLang;

        return "en";
    }

    function announce(message) {
        const srAnnouncements = document.getElementById("sr-announcements");
        if (srAnnouncements) srAnnouncements.textContent = message;
    }

    function updateMetadata() {
        const labels = LANGUAGES[currentLang];
        document.documentElement.lang = currentLang === "hu" ? "hu" : "en";
        document.title = labels.pageTitle;

        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute("content", labels.pageDescription);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", labels.pageTitle);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute("content", labels.pageDescription);
    }

    function updateLocalizedText() {
        document.querySelectorAll("[data-en][data-hu]").forEach((element) => {
            const value = element.getAttribute(`data-${currentLang}`);
            if (value !== null) element.textContent = value;
        });

        document.querySelectorAll("[data-en-placeholder][data-hu-placeholder]").forEach((element) => {
            const value = element.getAttribute(`data-${currentLang}-placeholder`);
            if (value !== null) element.setAttribute("placeholder", value);
        });

        updateOpenFAQHeights();
    }

    function updateLanguageButtons() {
        document.querySelectorAll(".lang-btn").forEach((button) => {
            const isActive = button.getAttribute("data-lang") === currentLang;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        const opposite = currentLang === "en" ? "hu" : "en";
        const switchMarkup = `<a href="#" class="lang-btn lang-switch-footer" data-lang="${opposite}" aria-label="Switch language">${LANGUAGES[currentLang].switchLabel}</a>`;

        const footerLang = document.querySelector(".footer-lang");
        if (footerLang) footerLang.innerHTML = switchMarkup;

        const mobileSwitch = document.querySelector(".mobile-language-switch");
        if (mobileSwitch) {
            mobileSwitch.innerHTML = `<div class="language-switch" aria-label="Language switcher mobile">${switchMarkup}</div>`;
        }

        bindLanguageButtons();
    }

    function setLanguage(lang, shouldAnnounce = true) {
        if (!LANGUAGES[lang]) return;

        currentLang = lang;
        localStorage.setItem("preferredLanguage", lang);
        updateMetadata();
        updateLocalizedText();
        updateLanguageButtons();

        if (shouldAnnounce) announce(LANGUAGES[currentLang].languageChanged);
    }

    function bindLanguageButtons() {
        document.querySelectorAll(".lang-btn").forEach((button) => {
            if (button.dataset.bound === "true") return;

            button.dataset.bound = "true";
            button.addEventListener("click", (event) => {
                event.preventDefault();
                setLanguage(button.getAttribute("data-lang"));
            });
        });
    }

    function initMobileMenu() {
        const menuToggle = document.getElementById("menuToggle");
        const navMenu = document.getElementById("navMenu");
        if (!menuToggle || !navMenu) return;

        function closeMenu() {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        navMenu.querySelectorAll("a[href^='#']").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navMenu.classList.contains("active")) closeMenu();
        });
    }

    function initActiveNavigation() {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");
        if (!sections.length || !navLinks.length) return;

        function updateActiveLink() {
            let currentSection = "";
            sections.forEach((section) => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (window.scrollY + 120 >= top && window.scrollY + 120 < top + height) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
            });
        }

        updateActiveLink();
        window.addEventListener("scroll", updateActiveLink, { passive: true });
    }

    function initRevealAnimation() {
        const elements = document.querySelectorAll(".fade-in");
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        elements.forEach((element) => observer.observe(element));
    }

    function initFAQ() {
        const faqContainer = document.getElementById("faq");
        if (!faqContainer) return;

        faqContainer.querySelectorAll(".faq-question").forEach((button) => {
            button.addEventListener("click", () => {
                const card = button.closest(".faq-card");
                const answer = card.querySelector(".faq-answer");
                const isOpen = button.getAttribute("aria-expanded") === "true";

                if (faqContainer.dataset.accordion === "true") {
                    faqContainer.querySelectorAll(".faq-card.open").forEach((openCard) => {
                        if (openCard === card) return;
                        openCard.classList.remove("open");
                        openCard.querySelector(".faq-question").setAttribute("aria-expanded", "false");
                        openCard.querySelector(".faq-answer").style.maxHeight = null;
                    });
                }

                button.setAttribute("aria-expanded", String(!isOpen));
                card.classList.toggle("open", !isOpen);
                answer.style.maxHeight = isOpen ? null : getFAQAnswerHeight(answer);

                if (!isOpen) {
                    requestAnimationFrame(() => {
                        answer.style.maxHeight = getFAQAnswerHeight(answer);
                    });
                }
            });
        });

        window.addEventListener("resize", updateOpenFAQHeights, { passive: true });
    }

    function getFAQAnswerHeight(answer) {
        return `${answer.scrollHeight + 32}px`;
    }

    function updateOpenFAQHeights() {
        document.querySelectorAll("#faq .faq-card.open .faq-answer").forEach((answer) => {
            answer.style.maxHeight = getFAQAnswerHeight(answer);
        });
    }

    function initContactForm() {
        const contactForm = document.querySelector(".contact-form");
        if (!contactForm) return;

        const submitButton = contactForm.querySelector("button[type='submit']");
        const status = document.createElement("div");
        status.className = "form-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        contactForm.appendChild(status);

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const labels = LANGUAGES[currentLang];
            const name = contactForm.querySelector("[name='name']");
            const email = contactForm.querySelector("[name='email']");
            const project = contactForm.querySelector("[name='project']");
            const errors = [];

            if (!name.value.trim()) errors.push(labels.nameRequired);
            if (!email.value.trim()) errors.push(labels.emailRequired);
            if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.push(labels.emailInvalid);
            if (!project.value) errors.push(labels.projectRequired);

            if (errors.length) {
                status.className = "form-status error";
                status.textContent = `${labels.errors} ${errors.join(" ")}`;
                announce(status.textContent);
                return;
            }

            if (submitButton) submitButton.disabled = true;
            status.className = "form-status";
            status.textContent = labels.sending;
            announce(labels.sending);

            if (window.emailjs) {
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                    .then(() => {
                        status.className = "form-status success";
                        status.textContent = labels.success;
                        announce(labels.success);
                        contactForm.reset();
                    })
                    .catch(() => {
                        status.className = "form-status error";
                        status.textContent = labels.submitError;
                        announce(labels.submitError);
                    })
                    .finally(() => {
                        if (submitButton) submitButton.disabled = false;
                    });
                return;
            }

            status.className = "form-status success";
            status.textContent = labels.success;
            contactForm.reset();
            if (submitButton) submitButton.disabled = false;
        });
    }

    function init() {
        currentLang = getSavedLanguage();
        if (window.emailjs && typeof window.emailjs.init === "function") {
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
        }
        bindLanguageButtons();
        setLanguage(currentLang, false);
        initMobileMenu();
        initActiveNavigation();
        initRevealAnimation();
        initFAQ();
        initContactForm();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
