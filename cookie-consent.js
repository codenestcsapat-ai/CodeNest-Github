/**
 * ========================================
 * CODENEST - GDPR COOKIE CONSENT MANAGER
 * Full-featured, GDPR-compliant cookie consent system
 * ========================================
 * 
 * Features:
 * - Auto-popup banner on first visit
 * - Modal with granular settings
 * - localStorage with versioning
 * - Multi-language support (HU/EN)
 * - Accessibility (ARIA, focus trap, ESC)
 * - Analytics only after consent
 * - Global reset function for testing
 */

(function() {
    'use strict';

    // ========================================
    // CONFIGURATION
    // ========================================
    
    const CONFIG = {
        STORAGE_KEY: 'cookie_consent_v2',
        VERSION: 'v2',
        EXPIRY_DAYS: 365,
        AUTO_SHOW_DELAY: 500, // Show banner after 500ms
    };

    // ========================================
    // TRANSLATIONS
    // ========================================
    
    const TRANSLATIONS = {
        hu: {
            // Banner
            bannerTitle: '🍪 Süti beállítások',
            bannerText: 'Weboldalunk sütiket használ a felhasználói élmény javítása, statisztikák készítése és funkcionalitás biztosítása érdekében. Kérjük, válasszon a beállítások közül.',
            btnAcceptAll: 'Összes elfogadása',
            btnRejectNonEssential: 'Csak szükséges',
            btnSettings: 'Beállítások',
            
            // Modal
            modalTitle: 'Részletes Süti Beállítások',
            modalDescription: 'Válassza ki, mely süti kategóriákat szeretné engedélyezni. A szükséges sütik mindig aktívak.',
            
            // Cookie categories
            essentialTitle: 'Szükséges sütik',
            essentialDesc: 'Ezek a sütik elengedhetetlenek a weboldal alapvető funkcióihoz. Nem kapcsolhatók ki.',
            essentialAlways: 'Mindig aktív',
            
            analyticsTitle: 'Analitikai sütik',
            analyticsDesc: 'Segítenek megérteni, hogy a látogatók hogyan használják a weboldalt. Az adatokat anonimizált formában gyűjtjük (Google Analytics, anonymizeIP: true).',
            
            functionalTitle: 'Funkcionális sütik',
            functionalDesc: 'Továbbfejlesztett funkciókat és személyre szabást biztosítanak, mint például nyelvválasztás és preferenciák mentése.',
            
            // Modal buttons
            btnSaveSettings: 'Beállítások mentése',
            btnAcceptAllModal: 'Összes elfogadása',
            btnClose: 'Bezárás',
            
            // Footer indicator
            footerStatus: 'Sütik:',
            statusAccepted: 'Analitika: Elfogadva',
            statusRejected: 'Analitika: Elutasítva',
            linkSettings: 'Süti beállítások módosítása',
        },
        en: {
            // Banner
            bannerTitle: '🍪 Cookie Settings',
            bannerText: 'We use cookies to improve user experience, collect statistics, and provide functionality. Please choose your preferences.',
            btnAcceptAll: 'Accept All',
            btnRejectNonEssential: 'Reject Non-Essential',
            btnSettings: 'Settings',
            
            // Modal
            modalTitle: 'Detailed Cookie Settings',
            modalDescription: 'Choose which cookie categories you want to enable. Essential cookies are always active.',
            
            // Cookie categories
            essentialTitle: 'Essential Cookies',
            essentialDesc: 'These cookies are essential for the basic functions of the website. They cannot be disabled.',
            essentialAlways: 'Always Active',
            
            analyticsTitle: 'Analytics Cookies',
            analyticsDesc: 'Help us understand how visitors use the website. Data is collected in anonymized form (Google Analytics, anonymizeIP: true).',
            
            functionalTitle: 'Functional Cookies',
            functionalDesc: 'Provide enhanced functionality and personalization, such as language selection and preference storage.',
            
            // Modal buttons
            btnSaveSettings: 'Save Settings',
            btnAcceptAllModal: 'Accept All',
            btnClose: 'Close',
            
            // Footer indicator
            footerStatus: 'Cookies:',
            statusAccepted: 'Analytics: Accepted',
            statusRejected: 'Analytics: Rejected',
            linkSettings: 'Modify Cookie Settings',
        }
    };

    // ========================================
    // MAIN COOKIE CONSENT OBJECT
    // ========================================
    
    const CookieConsent = {
        
        // Current language
        lang: 'en',
        
        // Translation getter
        t: function(key) {
            return TRANSLATIONS[this.lang][key] || TRANSLATIONS.en[key] || key;
        },
        
        // ========================================
        // INITIALIZATION
        // ========================================
        
        init: function() {
            console.log('🍪 Cookie Consent Manager v2 initialized');
            
            // Detect language
            this.detectLanguage();
            
            // Create UI elements
            this.createBanner();
            this.createModal();
            this.createFixedButton();
            this.updateFooterIndicator();
            
            // Check if consent exists
            const consent = this.getConsent();
            
            if (consent && consent.version === CONFIG.VERSION) {
                // Consent exists - apply it silently
                console.log('✅ Existing consent found:', consent);
                this.applyConsent(consent);
            }
            
            // Always show banner on page load
            console.log('📢 Showing cookie consent banner');
            this.showBanner();
            
            // Attach event listeners
            this.attachEventListeners();
            
            // Register global reset function
            window.__resetCookieConsent = this.resetConsent.bind(this);
            console.log('🔧 Global reset function registered: window.__resetCookieConsent()');
        },
        
        // ========================================
        // LANGUAGE DETECTION
        // ========================================
        
        detectLanguage: function() {
            // MINDIG angol az alapértelmezett
            // CSAK a localStorage-ből vesszük a módosított nyelvet
            const savedLang = localStorage.getItem('preferredLanguage');
            this.lang = (savedLang && TRANSLATIONS[savedLang]) ? savedLang : 'en';
            console.log(`🌍 Language set to: ${this.lang}`);
        },
        
        // ========================================
        // UI CREATION
        // ========================================
        
        createBanner: function() {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.id = 'cookieConsentBanner';
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-live', 'polite');
            banner.setAttribute('aria-label', this.t('bannerTitle'));
            
            banner.innerHTML = `
                <div class="cookie-banner-overlay"></div>
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h3>${this.t('bannerTitle')}</h3>
                        <p>${this.t('bannerText')}</p>
                    </div>
                    <div class="cookie-banner-actions">
                        <button class="btn-cookie btn-secondary" id="btnRejectNonEssential" aria-label="${this.t('btnRejectNonEssential')}">
                            ${this.t('btnRejectNonEssential')}
                        </button>
                        <button class="btn-cookie btn-secondary" id="btnSettings" aria-label="${this.t('btnSettings')}">
                            ${this.t('btnSettings')}
                        </button>
                        <button class="btn-cookie btn-primary" id="btnAcceptAll" aria-label="${this.t('btnAcceptAll')}">
                            ${this.t('btnAcceptAll')}
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(banner);
        },
        
        createModal: function() {
            const modal = document.createElement('div');
            modal.className = 'cookie-modal';
            modal.id = 'cookieModal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'cookieModalTitle');
            
            modal.innerHTML = `
                <div class="cookie-modal-overlay"></div>
                <div class="cookie-modal-content" tabindex="-1">
                    <div class="cookie-modal-header">
                        <h2 id="cookieModalTitle">${this.t('modalTitle')}</h2>
                        <button class="cookie-modal-close" id="modalClose" aria-label="${this.t('btnClose')}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="cookie-modal-body">
                        <p class="cookie-modal-description">${this.t('modalDescription')}</p>
                        
                        <!-- Essential Cookies -->
                        <div class="cookie-option">
                            <div class="cookie-option-header">
                                <div>
                                    <h3>${this.t('essentialTitle')}</h3>
                                    <span class="cookie-always-active">${this.t('essentialAlways')}</span>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="essentialCookies" checked disabled aria-label="${this.t('essentialTitle')}">
                                    <span class="toggle-slider" aria-hidden="true"></span>
                                </label>
                            </div>
                            <p>${this.t('essentialDesc')}</p>
                        </div>
                        
                        <!-- Analytics Cookies -->
                        <div class="cookie-option">
                            <div class="cookie-option-header">
                                <div>
                                    <h3>${this.t('analyticsTitle')}</h3>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="analyticsCookies" aria-label="${this.t('analyticsTitle')}">
                                    <span class="toggle-slider" aria-hidden="true"></span>
                                </label>
                            </div>
                            <p>${this.t('analyticsDesc')}</p>
                        </div>
                        
                        <!-- Functional Cookies -->
                        <div class="cookie-option">
                            <div class="cookie-option-header">
                                <div>
                                    <h3>${this.t('functionalTitle')}</h3>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="functionalCookies" aria-label="${this.t('functionalTitle')}">
                                    <span class="toggle-slider" aria-hidden="true"></span>
                                </label>
                            </div>
                            <p>${this.t('functionalDesc')}</p>
                        </div>
                    </div>
                    
                    <div class="cookie-modal-info">
                        <p class="cookie-modal-info-text">
                            Több információért: 
                            <a href="legal-hu.html" target="_blank" rel="noopener noreferrer" class="cookie-modal-info-link">
                                Jogi információk és Adatvédelem
                            </a>
                        </p>
                    </div>
                    
                    <div class="cookie-modal-footer">
                        <button class="btn-cookie btn-secondary" id="btnSaveSettings">
                            ${this.t('btnSaveSettings')}
                        </button>
                        <button class="btn-cookie btn-primary" id="btnAcceptAllModal">
                            ${this.t('btnAcceptAllModal')}
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        },
        
        createFixedButton: function() {
            const btn = document.createElement('button');
            btn.className = 'cookie-settings-btn-fixed';
            btn.id = 'cookieSettingsFixed';
            btn.setAttribute('title', this.t('btnSettings'));
            btn.setAttribute('aria-label', this.t('btnSettings'));
            
            // Add SVG cookie icon
            btn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9"></circle>
                    <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"></circle>
                    <circle cx="16" cy="8" r="1.5" fill="currentColor"></circle>
                    <circle cx="8" cy="16" r="1.5" fill="currentColor"></circle>
                </svg>
            `;
            
            document.body.appendChild(btn);
        },
        
        // ========================================
        // EVENT LISTENERS
        // ========================================
        
        attachEventListeners: function() {
            const that = this;
            
            // Banner buttons
            document.getElementById('btnAcceptAll')?.addEventListener('click', () => {
                that.acceptAll();
            });
            
            document.getElementById('btnRejectNonEssential')?.addEventListener('click', () => {
                that.rejectNonEssential();
            });
            
            document.getElementById('btnSettings')?.addEventListener('click', () => {
                that.hideBanner();
                that.showModal();
            });
            
            // Fixed cookie settings button
            document.getElementById('cookieSettingsFixed')?.addEventListener('click', () => {
                that.showModal();
            });
            
            // Modal buttons
            document.getElementById('btnSaveSettings')?.addEventListener('click', () => {
                that.saveSettings();
            });
            
            document.getElementById('btnAcceptAllModal')?.addEventListener('click', () => {
                that.acceptAll();
                that.hideModal();
            });
            
            document.getElementById('modalClose')?.addEventListener('click', () => {
                that.hideModal();
            });
            
            // Modal overlay click
            document.addEventListener('click', function(e) {
                const overlay = e.target.closest('.cookie-modal-overlay');
                if (overlay) {
                    that.hideModal();
                }
            });
            
            // ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const modal = document.getElementById('cookieModal');
                    if (modal && modal.classList.contains('show')) {
                        that.hideModal();
                    }
                }
            });
        },
        
        // ========================================
        // BANNER CONTROL
        // ========================================
        
        showBanner: function() {
            const banner = document.getElementById('cookieConsentBanner');
            if (banner) {
                banner.classList.add('show');
                console.log('📢 Cookie banner displayed');
            }
        },
        
        hideBanner: function() {
            const banner = document.getElementById('cookieConsentBanner');
            if (banner) {
                banner.classList.remove('show');
                console.log('🙈 Cookie banner hidden');
            }
        },
        
        // ========================================
        // MODAL CONTROL
        // ========================================
        
        showModal: function() {
            const modal = document.getElementById('cookieModal');
            if (modal) {
                // Load current settings
                const consent = this.getConsent() || this.getDefaultConsent();
                const analyticsCookie = document.getElementById('analyticsCookies');
                const functionalCookie = document.getElementById('functionalCookies');
                
                if (analyticsCookie) analyticsCookie.checked = consent.analytics;
                if (functionalCookie) functionalCookie.checked = consent.functional;
                
                modal.classList.add('show');
                
                // Focus trap
                const modalContent = modal.querySelector('.cookie-modal-content');
                if (modalContent) {
                    modalContent.focus();
                    this.trapFocus(modalContent);
                }
                
                console.log('⚙️ Cookie settings modal displayed');
            }
        },
        
        hideModal: function() {
            const modal = document.getElementById('cookieModal');
            if (modal) {
                modal.classList.remove('show');
                console.log('🙈 Cookie settings modal hidden');
            }
        },
        
        // ========================================
        // FOCUS TRAP FOR ACCESSIBILITY
        // ========================================
        
        trapFocus: function(element) {
            if (!element) return;
            
            const focusableElements = element.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            const handleTabKey = (e) => {
                if (e.key !== 'Tab') return;
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            };
            
            element.addEventListener('keydown', handleTabKey);
        },
        
        // ========================================
        // CONSENT ACTIONS
        // ========================================
        
        acceptAll: function() {
            const consent = {
                essential: true,
                analytics: true,
                functional: true,
                timestamp: Date.now(),
                version: CONFIG.VERSION
            };
            
            this.saveConsent(consent);
            this.applyConsent(consent);
            this.hideBanner();
            this.updateFooterIndicator();
            console.log('✅ All cookies accepted');
        },
        
        rejectNonEssential: function() {
            const consent = {
                essential: true,
                analytics: false,
                functional: false,
                timestamp: Date.now(),
                version: CONFIG.VERSION
            };
            
            this.saveConsent(consent);
            this.applyConsent(consent);
            this.hideBanner();
            this.updateFooterIndicator();
            console.log('❌ Non-essential cookies rejected');
        },
        
        saveSettings: function() {
            const consent = {
                essential: true,
                analytics: document.getElementById('analyticsCookies').checked,
                functional: document.getElementById('functionalCookies').checked,
                timestamp: Date.now(),
                version: CONFIG.VERSION
            };
            
            this.saveConsent(consent);
            this.applyConsent(consent);
            this.hideModal();
            this.hideBanner();
            this.updateFooterIndicator();
            console.log('💾 Custom settings saved:', consent);
        },
        
        // ========================================
        // CONSENT STORAGE
        // ========================================
        
        getDefaultConsent: function() {
            return {
                essential: true,
                analytics: false,
                functional: false,
                timestamp: null,
                version: CONFIG.VERSION
            };
        },
        
        saveConsent: function(consent) {
            try {
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(consent));
                console.log('💾 Consent saved to localStorage');
            } catch (e) {
                console.error('❌ Failed to save consent:', e);
            }
        },
        
        getConsent: function() {
            try {
                const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                console.error('❌ Failed to get consent:', e);
                return null;
            }
        },
        
        resetConsent: function() {
            try {
                localStorage.removeItem(CONFIG.STORAGE_KEY);
                console.log('🗑️ Consent reset - reloading page');
                window.location.reload();
            } catch (e) {
                console.error('❌ Failed to reset consent:', e);
            }
        },
        
        // ========================================
        // APPLY CONSENT & INITIALIZE SERVICES
        // ========================================
        
        applyConsent: function(consent) {
            console.log('🔧 Applying consent settings...');
            
            // Show fixed settings button after consent is given
            const fixedBtn = document.getElementById('cookieSettingsFixed');
            if (fixedBtn) {
                fixedBtn.classList.add('show');
            }
            
            // Essential cookies are always active
            console.log('✅ Essential cookies: ACTIVE (always)');
            
            // Analytics
            if (consent.analytics) {
                this.initAnalytics();
                console.log('✅ Analytics cookies: ACTIVE');
            } else {
                this.disableAnalytics();
                console.log('🚫 Analytics cookies: DISABLED');
            }
            
            // Functional
            if (consent.functional) {
                this.initFunctional();
                console.log('✅ Functional cookies: ACTIVE');
            } else {
                this.disableFunctional();
                console.log('🚫 Functional cookies: DISABLED');
            }
        },
        
        // ========================================
        // ANALYTICS INITIALIZATION
        // ========================================
        
        initAnalytics: function() {
            console.log('📊 Initializing Analytics...');
            
            // ⚠️ IMPORTANT: Only initialize analytics if user has consented!
            // This is where you would load Google Analytics, GTM, or other analytics tools
            
            // Example: Google Analytics 4
            /*
            const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID
            
            // Load GA script
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            document.head.appendChild(script);
            
            // Initialize GA
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID, {
                'anonymize_ip': true,              // GDPR requirement
                'cookie_flags': 'SameSite=Strict', // Security
                'cookie_expires': 63072000,        // 2 years in seconds
            });
            
            console.log('✅ Google Analytics initialized with anonymizeIP');
            */
            
            // For now, just log (uncomment the above when ready to use GA)
            console.log('📊 Analytics ready (uncomment code to activate Google Analytics)');
        },
        
        disableAnalytics: function() {
            // Disable analytics if previously enabled
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
            console.log('🚫 Analytics disabled');
        },
        
        // ========================================
        // FUNCTIONAL COOKIES
        // ========================================
        
        initFunctional: function() {
            console.log('🔧 Functional cookies enabled');
            // Here you can enable functional features like:
            // - Language preference persistence
            // - UI customization storage
            // - User preferences
        },
        
        disableFunctional: function() {
            console.log('🚫 Functional cookies disabled');
        },
        
        // ========================================
        // FOOTER INDICATOR UPDATE
        // ========================================
        
        updateFooterIndicator: function() {
            const indicator = document.getElementById('cookieStatusIndicator');
            if (!indicator) return;
            
            const consent = this.getConsent();
            const that = this;
            if (consent) {
                const status = consent.analytics ? 
                    this.t('statusAccepted') : 
                    this.t('statusRejected');
                
                indicator.innerHTML = `
                    <span class="cookie-status-text">${this.t('footerStatus')} ${status}</span>
                    <button class="cookie-status-link">
                        ${this.t('linkSettings')}
                    </button>
                `;
                
                // Attach event listener to the newly created button
                const linkBtn = indicator.querySelector('.cookie-status-link');
                if (linkBtn) {
                    linkBtn.addEventListener('click', function() {
                        that.showBanner();
                        that.showModal();
                    });
                }
            }
        }
    };

    // ========================================
    // GLOBAL EXPORT
    // ========================================
    
    window.CookieConsent = CookieConsent;

    // ========================================
    // AUTO-INITIALIZE
    // ========================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            CookieConsent.init();
        });
    } else {
        CookieConsent.init();
    }

})();