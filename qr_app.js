// ===========================
// QR CODE GENERATOR APP
// Wrapped in IIFE to prevent global scope pollution
// ===========================
(function() {
'use strict';

// ===== TRANSLATIONS =====
const translations = {
    hu: {
        title: 'QR kód generátor',
        subtitle: 'Professzionális QR kód készítő minden célra',
        preview: 'Előnézet',
        download: 'Letöltés (PNG)',

        typeTitle: 'QR kód típusa',
        typeUrl: 'URL',
        typeText: 'Szöveg',
        typeEmail: 'Email',
        typePhone: 'Telefon',
        typeSms: 'SMS',
        typeWifi: 'WiFi',
        typeVcard: 'vCard',
        typeLocation: 'Helyszín',

        urlLabel: 'Weboldal címe',
        urlPlaceholder: 'https://www.example.com',

        textLabel: 'Szöveg',
        textPlaceholder: 'Írj be bármilyen szöveget...',

        emailAddressLabel: 'Email cím',
        emailAddressPlaceholder: 'pelda@email.com',
        emailSubjectLabel: 'Tárgy (opcionális)',
        emailSubjectPlaceholder: 'Email tárgya',
        emailBodyLabel: 'Üzenet (opcionális)',
        emailBodyPlaceholder: 'Email szövege...',

        phoneLabel: 'Telefonszám',
        phonePlaceholder: '+36 30 123 4567',

        smsNumberLabel: 'Telefonszám',
        smsNumberPlaceholder: '+36 30 123 4567',
        smsMessageLabel: 'Üzenet',
        smsMessagePlaceholder: 'SMS szövege...',

        wifiSsidLabel: 'Hálózat neve (SSID)',
        wifiSsidPlaceholder: 'WiFi_neve',
        wifiPasswordLabel: 'Jelszó',
        wifiPasswordPlaceholder: 'jelszo123',
        wifiEncryptionLabel: 'Titkosítás',
        wifiHiddenLabel: 'Rejtett hálózat',

        vcardNameLabel: 'Teljes név',
        vcardNamePlaceholder: 'Kiss János',
        vcardOrgLabel: 'Cég (opcionális)',
        vcardOrgPlaceholder: 'CodeNest Kft.',
        vcardPhoneLabel: 'Telefonszám',
        vcardPhonePlaceholder: '+36 30 123 4567',
        vcardEmailLabel: 'Email cím',
        vcardEmailPlaceholder: 'pelda@email.com',
        vcardUrlLabel: 'Weboldal (opcionális)',
        vcardUrlPlaceholder: 'https://www.example.com',

        locationLatLabel: 'Szélesség (latitude)',
        locationLatPlaceholder: '47.4979',
        locationLngLabel: 'Hosszúság (longitude)',
        locationLngPlaceholder: '19.0402',
        locationHint: 'Google Maps koordináták (Budapest példa)',

        designTitle: 'Megjelenés',
        designLabel: 'Stílus',

        presetClassic: 'Klasszikus',
        presetRounded: 'Lekerekített',
        presetDots: 'Pontozott',
        presetGradient: 'Gradiens',
        presetBrand: 'CodeNest',

        colorFg: 'Előtér színe',
        colorBg: 'Háttér színe',
        sizeLabel: 'Méret',

        gradientDirection: 'Gradiens iránya',
        gradientLeftRight: 'Balról jobbra',
        gradientTopBottom: 'Fentről lefelé',
        gradientDiagonal1: 'Átlós (bal felső → jobb alsó)',
        gradientDiagonal2: 'Átlós (jobb felső → bal alsó)',
        gradientRadial: 'Középről kifelé',

        reset: 'Alaphelyzet',
        errorEmpty: 'A QR kód generálásához töltsd ki a mezőket',

        footerText: 'Professzionális QR kód generátor',

        copy: 'Másolás vágólapra',
        copied: 'Sikeresen másolva!',
        copyError: 'A másolás nem sikerült',
        downloaded: 'Letöltve!',
        generating: 'QR kód generálása...',
        validationError: 'Érvénytelen adat'
    },
    en: {
        title: 'QR Code Generator',
        subtitle: 'Professional QR code creator for any purpose',
        preview: 'Preview',
        download: 'Download (PNG)',
        typeTitle: 'QR Code Type',
        typeUrl: 'URL',
        typeText: 'Text',
        typeEmail: 'Email',
        typePhone: 'Phone',
        typeSms: 'SMS',
        typeWifi: 'WiFi',
        typeVcard: 'vCard',
        typeLocation: 'Location',
        urlLabel: 'Website URL',
        urlPlaceholder: 'https://www.example.com',
        textLabel: 'Text',
        textPlaceholder: 'Enter any text here...',
        emailAddressLabel: 'Email address',
        emailAddressPlaceholder: 'example@email.com',
        emailSubjectLabel: 'Subject (optional)',
        emailSubjectPlaceholder: 'Email subject',
        emailBodyLabel: 'Message (optional)',
        emailBodyPlaceholder: 'Email body...',
        phoneLabel: 'Phone number',
        phonePlaceholder: '+1 234 567 8900',
        smsNumberLabel: 'Phone number',
        smsNumberPlaceholder: '+1 234 567 8900',
        smsMessageLabel: 'Message',
        smsMessagePlaceholder: 'SMS text...',
        wifiSsidLabel: 'Network name (SSID)',
        wifiSsidPlaceholder: 'WiFi_name',
        wifiPasswordLabel: 'Password',
        wifiPasswordPlaceholder: 'password123',
        wifiEncryptionLabel: 'Encryption',
        wifiHiddenLabel: 'Hidden network',
        vcardNameLabel: 'Full name',
        vcardNamePlaceholder: 'John Doe',
        vcardOrgLabel: 'Company (optional)',
        vcardOrgPlaceholder: 'CodeNest Ltd.',
        vcardPhoneLabel: 'Phone',
        vcardPhonePlaceholder: '+1 234 567 8900',
        vcardEmailLabel: 'Email',
        vcardEmailPlaceholder: 'example@email.com',
        vcardUrlLabel: 'Website (optional)',
        vcardUrlPlaceholder: 'https://www.example.com',
        locationLatLabel: 'Latitude',
        locationLatPlaceholder: '40.7128',
        locationLngLabel: 'Longitude',
        locationLngPlaceholder: '-74.0060',
        locationHint: 'Google Maps coordinates (New York example)',
        designTitle: 'Design',
        designLabel: 'Style',
        presetClassic: 'Classic',
        presetRounded: 'Rounded',
        presetDots: 'Dots',
        presetBrand: 'CodeNest',
        colorFg: 'Foreground',
        colorBg: 'Background',
        sizeLabel: 'Size',
        reset: 'Reset',
        errorEmpty: 'Fill in the fields to generate the QR code',
        footerText: 'Professional QR code generator',
        copy: 'Copy to Clipboard',
        copied: 'Copied!',
        copyError: 'Copy failed',
        downloaded: 'Downloaded!',
        generating: 'Generating QR code...',
        validationError: 'Invalid data'
    }
};

// ============================================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================================
function showToast(message, type = 'success') {
    if (!elements?.toast || !elements?.toastMessage) return;

    elements.toastMessage.textContent = message;
    elements.toast.className = `toast toast-${type} show`;

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}
function showToast(message, type = 'success') {
    if (!elements?.toast || !elements?.toastMessage) return;

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ============================================================================
// INPUT VALIDATION SYSTEM
// ============================================================================
const validators = {
    url: (value) => {
        if (!value || value.trim() === '') return { valid: false, message: 'URL is required' };
        try {
            const url = new URL(value.startsWith('http') ? value : `https://${value}`);
            return { valid: true };
        } catch {
            return { valid: false, message: 'Please enter a valid URL' };
        }
    },

    email: (value) => {
        if (!value || value.trim() === '') return { valid: false, message: 'Email address is required' };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)
            ? { valid: true }
            : { valid: false, message: 'Please enter a valid email address' };
    },

    phone: (value) => {
        if (!value || value.trim() === '') return { valid: false, message: 'Phone number is required' };
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 7
            ? { valid: true }
            : { valid: false, message: 'Please enter a valid phone number' };
    },

    text: (value) => {
        if (!value || value.trim() === '') return { valid: false, message: 'Text is required' };
        return { valid: true };
    },

    wifi: (ssid, password) => {
        if (!ssid || ssid.trim() === '') return { valid: false, message: 'WiFi network name is required' };
        if (!password || password.trim() === '') return { valid: false, message: 'WiFi password is required' };
        return { valid: true };
    },

    vcard: (name, phone) => {
        if (!name || name.trim() === '') return { valid: false, message: 'Name is required' };
        if (!phone || phone.trim() === '') return { valid: false, message: 'Phone number is required' };
        return { valid: true };
    },

    location: (lat, lng) => {
        if (!lat || !lng) return { valid: false, message: 'Coordinates are required' };
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        if (isNaN(latNum) || isNaN(lngNum)) return { valid: false, message: 'Invalid coordinates' };
        if (latNum < -90 || latNum > 90) return { valid: false, message: 'Latitude must be between -90 and 90' };
        if (lngNum < -180 || lngNum > 180) return { valid: false, message: 'Longitude must be between -180 and 180' };
        return { valid: true };
    }
};

// ===== STATE MANAGEMENT =====
let qrCode = null; // Egyetlen QRCodeStyling példány
let currentLang = localStorage.getItem('qr-lang') || 'en';
let currentType = localStorage.getItem('qr-type') || 'url'; // Aktuális QR típus (persisted)
let debounceTimer = null;
let isValidQRData = false; // Track if current QR data is valid

// Alapértelmezett beállítások
const defaultSettings = {
    data: '',
    width: 300,
    height: 300,
    type: 'canvas',
    margin: 10,
    qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H'
    },
    dotsOptions: {
        color: '#000000',
        type: 'square'
    },
    backgroundOptions: {
        color: '#ffffff'
    },
    cornersSquareOptions: {
        color: '#000000',
        type: 'square'
    },
    cornersDotOptions: {
        color: '#000000',
        type: 'square'
    }
};

// CodeNest logo WebP (Base64 encoded inline)
const codeNestLogo =
    'data:image/webp;base64,UklGRvhIAABXRUJQ...TJaTU6AKwAA';

let currentSettings = { ...defaultSettings };

// ===== DOM ELEMENTS =====
const elements = {
    qrCodeContainer: document.getElementById('qrCode'),
    errorMessage: document.getElementById('errorMessage'),
    downloadBtn: document.getElementById('downloadBtn'),
    copyBtn: document.getElementById('copyBtn'),
    stickyDownloadBtn: document.getElementById('stickyDownloadBtn'),
    stickyCopyBtn: document.getElementById('stickyCopyBtn'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    colorFg: document.getElementById('colorFg'),
    colorBg: document.getElementById('colorBg'),
    colorFgValue: document.getElementById('colorFgValue'),
    colorBgValue: document.getElementById('colorBgValue'),
    qrSize: document.getElementById('qrSize'),
    sizeValue: document.getElementById('sizeValue'),
    resetBtn: document.getElementById('resetBtn'),
    presetBtns: document.querySelectorAll('.qr-preset-btn'),
    typeTabs: document.querySelectorAll('.qr-type-tab'),
    inputForms: document.querySelectorAll('.qr-input-form'),
    langBtns: document.querySelectorAll('.lang-btn'),
    designToggle: document.getElementById('designToggle'),
    designContent: document.getElementById('designContent'),
    // URL
    urlInput: document.getElementById('urlInput'),
    // Text
    textInput: document.getElementById('textInput'),
    // Email
    emailAddress: document.getElementById('emailAddress'),
    emailSubject: document.getElementById('emailSubject'),
    emailBody: document.getElementById('emailBody'),
    // Phone
    phoneNumber: document.getElementById('phoneNumber'),
    // SMS
    smsNumber: document.getElementById('smsNumber'),
    smsMessage: document.getElementById('smsMessage'),
    // WiFi
    wifiSsid: document.getElementById('wifiSsid'),
    wifiPassword: document.getElementById('wifiPassword'),
    wifiEncryption: document.getElementById('wifiEncryption'),
    wifiHidden: document.getElementById('wifiHidden'),
    // vCard
    vcardName: document.getElementById('vcardName'),
    vcardOrg: document.getElementById('vcardOrg'),
    vcardPhone: document.getElementById('vcardPhone'),
    vcardEmail: document.getElementById('vcardEmail'),
    vcardUrl: document.getElementById('vcardUrl'),
    // Location
    locationLat: document.getElementById('locationLat'),
    locationLng: document.getElementById('locationLng')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initQRCode();
    initEventListeners();
    initLanguage();
    initKeyboardShortcuts();
    initMobileMenuToggle();
    initDesignToggle();
    // Kezdetben hibaüzenetet mutatunk
    elements.qrCodeContainer.style.display = 'none';
    elements.errorMessage.classList.add('show');
});

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S: Download QR
        if ((e.ctrlKey || e.metaKey) && e.key === 's' && !elements.downloadBtn.disabled) {
            e.preventDefault();
            downloadQRCode();
        }

        // Ctrl/Cmd + C: Copy QR (when focused on preview)
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !elements.copyBtn.disabled) {
            const activeEl = document.activeElement;
            // Only if not in an input field
            if (!['INPUT', 'TEXTAREA'].includes(activeEl.tagName)) {
                e.preventDefault();
                copyQRToClipboard();
            }
        }

        // Escape: Clear focus
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
}

// ============================================================================
// INPUT VALIDATION
// ============================================================================
function validateInput(type) {
    let validation;

    switch (type) {
        case 'url':
            validation = validators.url(elements.urlInput?.value);
            break;
        case 'text':
            validation = validators.text(elements.textInput?.value);
            break;
        case 'email':
            validation = validators.email(elements.emailAddress?.value);
            break;
        case 'phone':
            validation = validators.phone(elements.phoneNumber?.value);
            break;
        case 'sms':
            validation = validators.phone(elements.smsNumber?.value);
            break;
        case 'wifi':
            validation = validators.wifi(elements.wifiSsid?.value, elements.wifiPassword?.value);
            break;
        case 'vcard':
            validation = validators.vcard(elements.vcardName?.value, elements.vcardPhone?.value);
            break;
        case 'location':
            validation = validators.location(elements.locationLat?.value, elements.locationLng?.value);
            break;
        default:
            validation = { valid: true };
    }

    // Show validation error if invalid
    if (!validation.valid && validation.message) {
        const errorMsg = elements.errorMessage.querySelector('[data-i18n="errorEmpty"]');
        if (errorMsg) {
            errorMsg.textContent = validation.message;
        }
    }

    return validation;
}

// ===== QR CODE INITIALIZATION =====
function initQRCode() {
    try {
        if (typeof QRCodeStyling === 'undefined') {
            console.error('QRCodeStyling library is not defined!');
            return;
        }

        // Clear container content
        elements.qrCodeContainer.innerHTML = '';

        // Create QR code
        qrCode = new QRCodeStyling(currentSettings);
        qrCode.append(elements.qrCodeContainer);
    } catch (error) {
        console.error('❌ QR inicializálási hiba:', error);
    }
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Type tabs
    elements.typeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchQRType(tab.dataset.type);
        });

        // Keyboard support for tabs
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchQRType(tab.dataset.type);
            }
        });
    });

    // Input listeners for all types
    addInputListener(elements.urlInput);
    addInputListener(elements.textInput);
    addInputListener(elements.emailAddress);
    addInputListener(elements.emailSubject);
    addInputListener(elements.emailBody);
    addInputListener(elements.phoneNumber);
    addInputListener(elements.smsNumber);
    addInputListener(elements.smsMessage);
    addInputListener(elements.wifiSsid);
    addInputListener(elements.wifiPassword);
    addInputListener(elements.wifiEncryption);
    addInputListener(elements.wifiHidden, 'change');
    addInputListener(elements.vcardName);
    addInputListener(elements.vcardOrg);
    addInputListener(elements.vcardPhone);
    addInputListener(elements.vcardEmail);
    addInputListener(elements.vcardUrl);
    addInputListener(elements.locationLat);
    addInputListener(elements.locationLng);

    // Preset buttons
    elements.presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyPreset(btn.dataset.preset);
        });

        // Keyboard support for presets
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                elements.presetBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyPreset(btn.dataset.preset);
            }
        });
    });

    // Color pickers
    elements.colorFg.addEventListener('input', (e) => {
        const newColor = e.target.value;

        // Update dot colors
        currentSettings.dotsOptions = {
            type: currentSettings.dotsOptions.type || 'square',
            color: newColor
        };

        // Update corner colors
        currentSettings.cornersDotOptions = {
            ...currentSettings.cornersDotOptions,
            color: newColor
        };

        elements.colorFgValue.textContent = newColor.toUpperCase();
        updateQRCode();
    });

    elements.colorBg.addEventListener('input', (e) => {
        const newColor = e.target.value;

        // Update background color
        currentSettings.backgroundOptions.color = newColor;

        elements.colorBgValue.textContent = newColor.toUpperCase();
        updateQRCode();
    });

    // Size slider
    elements.qrSize.addEventListener('input', (e) => {
        const size = parseInt(e.target.value);
        currentSettings.width = size;
        currentSettings.height = size;
        elements.sizeValue.textContent = size + 'px';
        updateQRCode();
    });

    // Reset button
    elements.resetBtn.addEventListener('click', resetSettings);

    // Download button
    elements.downloadBtn.addEventListener('click', downloadQRCode);

    // Copy button
    elements.copyBtn.addEventListener('click', copyQRToClipboard);

    // Language buttons
    elements.langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(btn.dataset.lang);
        });
    });
    
    // Sticky action bar buttons (mobile)
    if (elements.stickyDownloadBtn) {
        elements.stickyDownloadBtn.addEventListener('click', downloadQRCode);
    }
    
    if (elements.stickyCopyBtn) {
        elements.stickyCopyBtn.addEventListener('click', copyQRToClipboard);
    }
}

function addInputListener(element, eventType = 'input') {
    if (element) {
        element.addEventListener(eventType, () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                buildQRData();
            }, 300);
        });

        // Add Enter key support for text inputs
        if (element.tagName === 'INPUT' && eventType === 'input') {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    clearTimeout(debounceTimer);
                    buildQRData();
                }
            });
        }
    }
}

// ===== QR TYPE SWITCHING =====
function switchQRType(type) {
    currentType = type;

    // Persist user's last selected QR type
    localStorage.setItem('qr-type', type);

    // Update tabs
    elements.typeTabs.forEach(tab => {
        if (tab.dataset.type === type) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update forms
    elements.inputForms.forEach(form => {
        if (form.dataset.form === type) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });

    // Auto-focus the first input field of the active form
    const activeForm = document.querySelector(`.qr-input-form[data-form="${type}"].active`);
    if (activeForm) {
        const firstInput = activeForm.querySelector('input, textarea, select');
        if (firstInput) {
            // Delay slightly to allow DOM to settle
            setTimeout(() => {
                firstInput.focus();
                // On mobile, scroll into view
                if (window.innerWidth < 768) {
                    firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }

    // Build QR data
    buildQRData();
}

// ===== BUILD QR DATA STRING =====
function buildQRData() {
    // Validate input first
    const validation = validateInput(currentType);

    if (!validation.valid) {
        currentSettings.data = '';
        updateQRCode();
        return;
    }

    let data = '';

    switch (currentType) {
        case 'url':
            data = normalizeUrl(elements.urlInput.value.trim());
            break;

        case 'text':
            data = elements.textInput.value.trim();
            break;

        case 'email':
            const email = elements.emailAddress.value.trim();
            const subject = elements.emailSubject.value.trim();
            const body = elements.emailBody.value.trim();

            if (email) {
                data = 'mailto:' + email;
                const params = [];
                if (subject) params.push('subject=' + encodeURIComponent(subject));
                if (body) params.push('body=' + encodeURIComponent(body));
                if (params.length > 0) data += '?' + params.join('&');
            }
            break;

        case 'phone':
            const phone = elements.phoneNumber.value.trim();
            if (phone) {
                data = 'tel:' + phone.replace(/\s/g, '');
            }
            break;

        case 'sms':
            const smsNum = elements.smsNumber.value.trim();
            const smsMsg = elements.smsMessage.value.trim();

            if (smsNum) {
                data = 'sms:' + smsNum.replace(/\s/g, '');
                if (smsMsg) data += '?body=' + encodeURIComponent(smsMsg);
            }
            break;

        case 'wifi':
            const ssid = elements.wifiSsid.value.trim();
            const password = elements.wifiPassword.value.trim();
            const encryption = elements.wifiEncryption.value;
            const hidden = elements.wifiHidden.checked;

            if (ssid) {
                data = 'WIFI:T:' + encryption + ';S:' + ssid + ';P:' + password + ';H:' + (hidden ? 'true' : 'false') + ';;';
            }
            break;

        case 'vcard':
            const name = elements.vcardName.value.trim();
            const org = elements.vcardOrg.value.trim();
            const vcPhone = elements.vcardPhone.value.trim();
            const vcEmail = elements.vcardEmail.value.trim();
            const vcUrl = elements.vcardUrl.value.trim();

            if (name) {
                data = 'BEGIN:VCARD\n';
                data += 'VERSION:3.0\n';
                data += 'FN:' + name + '\n';
                if (org) data += 'ORG:' + org + '\n';
                if (vcPhone) data += 'TEL:' + vcPhone + '\n';
                if (vcEmail) data += 'EMAIL:' + vcEmail + '\n';
                if (vcUrl) data += 'URL:' + vcUrl + '\n';
                data += 'END:VCARD';
            }
            break;

        case 'location':
            const lat = elements.locationLat.value.trim();
            const lng = elements.locationLng.value.trim();

            if (lat && lng) {
                data = 'https://www.google.com/maps?q=' + lat + ',' + lng;
            }
            break;
    }

    currentSettings.data = data;
    updateQRCode();
}

// ===== URL NORMALIZATION =====
function normalizeUrl(url) {
    if (!url) return '';

    // Add protocol if missing
    if (!url.match(/^https?:\/\//i) && url.match(/^(www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/)) {
        return 'https://' + url;
    }

    return url;
}

// ===== PRESET STYLES =====
function applyPreset(preset) {
    const presetTypes = {
        classic: { dots: 'square', corners: 'square', dots_corner: 'square' },
        rounded: { dots: 'rounded', corners: 'extra-rounded', dots_corner: 'dot' },
        dots: { dots: 'dots', corners: 'dot', dots_corner: 'dot' },
        brand: { dots: 'rounded', corners: 'extra-rounded', dots_corner: 'dot' }
    };

    if (!presetTypes[preset]) return;

    const types = presetTypes[preset];

    if (preset === 'brand') {
        currentSettings.dotsOptions = {
            type: types.dots,
            color: '#000000'
        };
        currentSettings.cornersSquareOptions = { type: types.corners, color: '#000000' };
        currentSettings.cornersDotOptions = { type: types.dots_corner, color: '#000000' };
        currentSettings.backgroundOptions.color = '#ffffff';

        // CodeNest logó hozzáadása
        currentSettings.imageOptions = {
            hideBackgroundDots: true,
            imageSize: 0.3,
            margin: 8
        };
        currentSettings.image = codeNestLogo;

        elements.colorBg.value = '#ffffff';
        elements.colorBgValue.textContent = '#FFFFFF';
    } else {
        // Classic, Rounded, Dots - felhasználó színei
        currentSettings.dotsOptions = {
            type: types.dots,
            color: elements.colorFg.value
        };
        currentSettings.cornersSquareOptions = { type: types.corners, color: elements.colorFg.value };
        currentSettings.cornersDotOptions = { type: types.dots_corner, color: elements.colorFg.value };
        currentSettings.backgroundOptions.color = elements.colorBg.value;

        // Logó eltávolítása
        delete currentSettings.imageOptions;
        delete currentSettings.image;
    }

    updateQRCode();
}

// ===== UPDATE QR CODE =====
function updateQRCode() {
    const hasData = currentSettings.data && currentSettings.data.trim() !== '';

    if (hasData) {
        try {
            if (!qrCode) {
                console.error('QR code instance error');
                initQRCode();
            }

            isValidQRData = true;
            updateDesignControlsState();
            updateStatusBadge('ready');
            elements.qrCodeContainer.style.opacity = '0.5';
            elements.qrCodeContainer.style.transform = 'scale(0.95)';

            // Update QR code
            console.log('Updating QR with settings:', currentSettings);
            qrCode.update(currentSettings);

            // Fade in effect after update
            setTimeout(() => {
                elements.qrCodeContainer.style.opacity = '1';
                elements.qrCodeContainer.style.transform = 'scale(1)';
            }, 100);

            // UI frissítése
            elements.qrCodeContainer.style.display = 'flex';
            elements.errorMessage.classList.remove('show');
            elements.downloadBtn.disabled = false;
            elements.copyBtn.disabled = false;
            
            // Update sticky buttons as well
            if (elements.stickyDownloadBtn) elements.stickyDownloadBtn.disabled = false;
            if (elements.stickyCopyBtn) elements.stickyCopyBtn.disabled = false;

            console.log('QR code updated successfully');
        } catch (error) {
            console.error('❌ QR kód generálási hiba:', error);
            elements.errorMessage.classList.add('show');
            elements.qrCodeContainer.style.display = 'none';
            showToast(translations[currentLang].validationError, 'error');
        }
    } else {
        elements.qrCodeContainer.style.display = 'none';
        elements.errorMessage.classList.add('show');
        elements.downloadBtn.disabled = true;
        elements.copyBtn.disabled = true;
        
        // Update sticky buttons as well
        if (elements.stickyDownloadBtn) elements.stickyDownloadBtn.disabled = true;
        if (elements.stickyCopyBtn) elements.stickyCopyBtn.disabled = true;
    }
}

// ===== DOWNLOAD QR CODE =====
function downloadQRCode() {
    if (!currentSettings.data) return;

    const fileName = 'codenest-qr-' + currentType;
    qrCode.download({
        name: fileName,
        extension: 'png'
    });
    showToast(translations[currentLang].downloaded, 'success');
}

// ===== COPY QR TO CLIPBOARD =====
async function copyQRToClipboard() {
    if (!currentSettings.data) return;

    try {
        elements.copyBtn.disabled = true;
        elements.copyBtn.innerHTML = '<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<circle cx="12" cy="12" r="10" opacity="0.25"></circle>' +
            '<path d="M12 2 A10 10 0 0 1 22 12" stroke-linecap="round"></path>' +
            '</svg>' +
            '<span>' + translations[currentLang].generating + '</span>';

        // Get QR as blob
        const blob = await qrCode.getRawData('png');

        if (!blob) {
            throw new Error('Failed to generate QR image');
        }

        // Copy to clipboard using Clipboard API
        if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
            ]);
            showToast(translations[currentLang].copied, 'success');
        } else {
            // Fallback: download if clipboard not supported
            downloadQRCode();
            showToast('Clipboard not supported - Downloaded instead', 'warning');
        }
    } catch (error) {
        console.error('Copy error:', error);
        showToast(translations[currentLang].copyError, 'error');
    } finally {
        // Restore button
        setTimeout(() => {
            elements.copyBtn.disabled = false;
            elements.copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>' +
                '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
                '</svg>' +
                '<span data-i18n="copy">' + translations[currentLang].copy + '</span>';
        }, 500);
    }
}

// ===== RESET SETTINGS =====
function resetSettings() {
    // Clear all inputs based on current type
    elements.inputForms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    });

    // Reset preset
    elements.presetBtns.forEach(btn => btn.classList.remove('active'));
    elements.presetBtns[0].classList.add('active');

    // Reset colors
    elements.colorFg.value = '#000000';
    elements.colorBg.value = '#ffffff';
    elements.colorFgValue.textContent = '#000000';
    elements.colorBgValue.textContent = '#FFFFFF';

    // Reset size
    elements.qrSize.value = 300;
    elements.sizeValue.textContent = '300px';

    // Reset settings
    currentSettings = { ...defaultSettings };

    // Clear gradient if present
    // Clear QR data to remove old QR code
    currentSettings.data = '';

    // Update QR
    updateQRCode();
}

// ===== LANGUAGE MANAGEMENT =====
function initLanguage() {
    setLanguage(currentLang);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('qr-lang', lang);

    document.documentElement.lang = lang;

    elements.langBtns.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateTexts();
}

// ===== UX HELPER: Update design controls state =====
function updateDesignControlsState() {
    // Disable design controls if no valid QR data exists
    const shouldDisable = !isValidQRData;

    elements.presetBtns.forEach(btn => {
        btn.disabled = shouldDisable;
        btn.setAttribute('aria-disabled', shouldDisable);
        if (shouldDisable) {
            btn.title = 'Fill in the required fields first to customize design';
        } else {
            btn.title = '';
        }
    });

    elements.colorFg.disabled = shouldDisable;
    elements.colorBg.disabled = shouldDisable;
    elements.qrSize.disabled = shouldDisable;
}

function updateTexts() {
    const t = translations[currentLang];

    // Update elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update elements with data-en/data-hu attributes (header and footer)
    document.querySelectorAll('[data-en][data-hu]').forEach(el => {
        const text = currentLang === 'hu' ? el.getAttribute('data-hu') : el.getAttribute('data-en');
        if (text) {
            el.textContent = text;
        }
    });

    // Update input placeholders with data-i18n-placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });
}

// ===== UPDATE STATUS BADGE =====
function updateStatusBadge(status) {
    const badge = document.getElementById('statusBadge');
    if (!badge) return;

    badge.classList.remove('empty', 'generating', 'ready', 'error');

    switch (status) {
        case 'ready':
            badge.classList.add('ready');
            badge.querySelector('span').textContent = translations[currentLang].statusReady || 'Ready to download';
            break;
        case 'error':
            badge.classList.add('empty');
            badge.querySelector('span').textContent = translations[currentLang].statusError || 'Error generating QR code';
            break;
        case 'empty':
        default:
            badge.classList.add('empty');
            badge.querySelector('span').textContent = translations[currentLang].statusEmpty || 'Ready to generate';
    }
}

// ===== MOBILE MENU TOGGLE =====
function initMobileMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Update aria-expanded attribute
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);

            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Keyboard support - Escape to close menu
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                menuToggle.focus();
            }
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== DESIGN PANEL TOGGLE (MOBILE) =====
function initDesignToggle() {
    if (!elements.designToggle || !elements.designContent) return;
    
    // Check if mobile view
    const isMobile = () => window.innerWidth <= 850;
    
    // Set initial state based on screen size
    if (isMobile()) {
        elements.designContent.classList.remove('expanded');
        elements.designToggle.setAttribute('aria-expanded', 'false');
    } else {
        elements.designContent.classList.add('expanded');
        elements.designToggle.setAttribute('aria-expanded', 'true');
    }
    
    // Toggle function
    elements.designToggle.addEventListener('click', () => {
        const isExpanded = elements.designContent.classList.contains('expanded');
        
        if (isExpanded) {
            elements.designContent.classList.remove('expanded');
            elements.designToggle.setAttribute('aria-expanded', 'false');
        } else {
            elements.designContent.classList.add('expanded');
            elements.designToggle.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (!isMobile()) {
                elements.designContent.classList.add('expanded');
                elements.designToggle.setAttribute('aria-expanded', 'true');
            }
        }, 250);
    });
}

})(); // End of IIFE
