# QR CODE GENERATOR - COMPLETE DOCUMENTATION

## PROJECT OVERVIEW
**Purpose**: Professional QR Code Generator tool for CodeNest website  
**Location**: `/qr-generator.html`  
**Language Support**: English (en) & Hungarian (hu)  
**Framework**: Vanilla JavaScript + QRCodeStyling Library v1.6.0-rc.1  
**Theme**: Dark mode with gradient backgrounds  

---

## COLOR PALETTE & CSS VARIABLES

### Primary Brand Colors
```css
--brand-primary: #6366f1;      /* Indigo - Main brand color */
--brand-secondary: #8b5cf6;    /* Purple - Secondary/accent */
--brand-accent: #ec4899;       /* Pink - Tertiary accent */
--brand-light: #818cf8;        /* Light indigo - Hover states */
```

### Background Colors
```css
--bg-primary: #0f172a;         /* Very dark blue - Main background */
--bg-secondary: #1e293b;       /* Dark slate - Secondary background */
--bg-card: #1a2a45;            /* Dark blue-gray - Card backgrounds */
```

### Text Colors
```css
--text-primary: #f1f5f9;       /* Light slate - Main text (light mode) */
--text-secondary: #cbd5e1;     /* Medium slate - Secondary text */
```

### Semantic Colors
```css
--success: #10b981;            /* Green - Success messages */
--error: #ef4444;              /* Red - Error messages */
--warning: #f59e0b;            /* Amber - Warning messages */
--border-color: #334155;       /* Slate - Borders */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 12px rgba(99, 102, 241, 0.15);    /* Brand-tinted shadow */
--shadow-lg: 0 20px 40px rgba(99, 102, 241, 0.2);    /* Large brand shadow */
--shadow-xl: 0 25px 50px rgba(99, 102, 241, 0.25);   /* Extra large shadow */
```

### Transitions
```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Smooth cubic easing */
```

---

## HTML STRUCTURE

### Header Navigation
- Fixed header with dark QR page background
- Navigation links with data-en/data-hu attributes
- Language switcher with data-lang="en" and data-lang="hu"
- "Get a Quote" CTA button

### Main Sections
1. **QR Page Header** - Title, subtitle, margin-top for fixed header
2. **QR Generator Section** - Main content area
3. **Settings Panel** (Left) - Input forms and design options
4. **Preview Panel** (Right) - QR code preview and download/copy buttons
5. **Footer** - Links and company information

### QR Code Types (8 Types)
1. **URL** - Website links
2. **Text** - Plain text
3. **Email** - Email addresses with subject/body
4. **Phone** - Phone numbers
5. **SMS** - Text messages
6. **WiFi** - Network credentials (SSID, password, encryption)
7. **vCard** - Contact information (name, org, phone, email, website)
8. **Location** - GPS coordinates (latitude, longitude)

---

## JAVASCRIPT FUNCTIONS (qr_app.js)

### Core Initialization
```javascript
/* ===== INITIALIZATION ===== */
window.addEventListener('DOMContentLoaded', () => {
    // Initializes on page load
    initQRCode();           // Setup QR code container
    initEventListeners();   // Attach event handlers
    initLanguage();         // Load saved language preference
    initKeyboardShortcuts(); // Enable keyboard shortcuts
});
```

### 1. TOAST NOTIFICATION SYSTEM
```javascript
showToast(message, type = 'success')
// Shows temporary notification popup
// Types: 'success', 'error', 'warning'
// Auto-dismisses after 3000ms
```

### 2. INPUT VALIDATION SYSTEM
```javascript
const validators = {
    url: (value) => { /* Validates URL format */ },
    email: (value) => { /* Validates email format */ },
    phone: (value) => { /* Validates phone format */ },
    coordinates: (value) => { /* Validates lat/lng */ }
}

validateInput(type)
// Returns true if input is valid for selected QR type
// Shows error message if invalid
```

### 3. KEYBOARD SHORTCUTS
```javascript
initKeyboardShortcuts()
// Keyboard controls:
// Ctrl+S / Cmd+S = Download QR code
// Ctrl+C / Cmd+C = Copy to clipboard
// Ctrl+R / Cmd+R = Reset all settings
// Esc = Cancel any active operation
```

### 4. QR CODE INITIALIZATION
```javascript
initQRCode()
// Sets currentLang from localStorage or browser default
// Initializes QRCodeStyling instance
// Loads saved user settings from localStorage
// Renders initial QR code
```

### 5. EVENT LISTENER SETUP
```javascript
initEventListeners()
// Attaches click/input handlers to:
// - Type tabs (8 QR types)
// - Preset buttons (4 design presets)
// - Color pickers (foreground, background)
// - Size slider (50-500px)
// - Gradient direction buttons
// - Download, Copy, Reset buttons
// - Language switcher buttons
```

### 6. INPUT LISTENERS
```javascript
addInputListener(element, eventType = 'input')
// Adds input/change listener with 300ms debounce
// Calls buildQRData() when content changes
// Supports Enter key for text inputs
```

### 7. QR TYPE SWITCHING
```javascript
switchQRType(type)
// Parameter types: 'url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard', 'location'
// Updates active tab highlighting
// Shows/hides relevant input fields
// Resets fields to defaults
// Regenerates QR code
```

### 8. QR DATA BUILDING
```javascript
buildQRData()
// Constructs QR string based on type and inputs
// Validates all required fields
// Handles special formatting:
//   - URL: Normalizes with https://
//   - Email: Format "mailto:email?subject=X&body=Y"
//   - Phone: Format "tel:+1234567890"
//   - SMS: Format "sms:+1234567890?body=message"
//   - WiFi: Format "WIFI:T:encryption;S:ssid;P:password;H:hidden;"
//   - vCard: VCF format with all fields
//   - Location: Format "geo:latitude,longitude"
// Shows error if validation fails
// Calls updateQRCode()
```

### 9. URL NORMALIZATION
```javascript
normalizeUrl(url)
// Adds 'https://' if no protocol specified
// Returns properly formatted URL
// Example: "example.com" → "https://example.com"
```

### 10. DESIGN PRESET APPLICATION
```javascript
applyPreset(preset)
// Parameter presets: 'classic', 'rounded', 'dots', 'gradient'
// Applies predefined style settings:
//   - Classic: Standard square dots
//   - Rounded: Rounded corners on dots
//   - Dots: Circular dot pattern
//   - Gradient: Gradient color effect
// Updates color pickers to match preset
// Updates size slider
// Regenerates QR code
```

### 11. QR CODE RENDERING
```javascript
updateQRCode()
// Applies all current settings to QR code:
// - Data string
// - Colors (foreground/background)
// - Dot styling (square/rounded/dots)
// - Size (50-500px)
// - Gradient direction (if gradient mode)
// - Module settings (border radius, space ratio)
// Renders via QRCodeStyling.render()
// Shows loading toast during generation
```

### 12. DOWNLOAD QR CODE
```javascript
downloadQRCode()
// Generates PNG file from QR code
// Filename: 'codenest-qr-[type].png'
// Includes timestamp for uniqueness
// Shows success toast notification
// Triggers browser download dialog
// Stores download count
```

### 13. COPY TO CLIPBOARD
```javascript
copyQRToClipboard()
// Converts QR code SVG to canvas
// Copies PNG image to system clipboard
// Shows "Copied!" toast on success
// Shows error toast on failure
// Supports modern Clipboard API
```

### 14. RESET SETTINGS
```javascript
resetSettings()
// Resets all settings to defaults:
// - QR type: URL
// - All input fields cleared
// - Colors: Black foreground, white background
// - Size: Default (200px)
// - Preset: Classic
// - Gradient direction: Left to right
// Regenerates QR code
// Shows confirmation toast
```

### 15. LANGUAGE MANAGEMENT
```javascript
initLanguage()
// Loads saved language from localStorage ('qr-lang')
// Falls back to browser language
// Calls setLanguage() with detected language

setLanguage(lang)
// Parameters: 'en' (English) or 'hu' (Hungarian)
// Updates currentLang variable
// Saves to localStorage
// Sets HTML lang attribute
// Updates active language button styling
// Calls updateTexts()

updateTexts()
// Updates all elements with:
// - data-i18n attributes (QR-specific content)
// - data-en/data-hu attributes (Header/footer)
// - data-i18n-placeholder attributes (Input placeholders)
// Reads from translations object
// Supports bilingual content
```

---

## DEFAULT SETTINGS & CONSTANTS

### Default QR Settings
```javascript
const defaultSettings = {
    type: 'square',              // Dot shape
    width: 200,                  // Size in pixels
    height: 200,
    data: '',                    // QR string
    margin: 0,
    margin_: 0,
    qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H'
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0
    },
    dotsOptions: {
        color: '#000000',
        type: 'square'
    },
    backgroundOptions: {
        color: '#ffffff'
    },
    cornersSquareOptions: {
        type: 'square',
        color: '#000000'
    },
    cornersDotOptions: {
        type: 'dot',
        color: '#000000'
    }
};

let currentType = 'url';        // Active QR type
let currentLang = 'en';         // Active language
let currentSettings = {...};    // User's current settings
let currentGradientRotation = 0; // Gradient angle
```

### DOM Elements Object
```javascript
const elements = {
    // Containers
    qrCodeContainer: getElementById('qrCode'),
    errorMessage: getElementById('errorMessage'),
    
    // Buttons
    downloadBtn: getElementById('downloadBtn'),
    copyBtn: getElementById('copyBtn'),
    resetBtn: getElementById('resetBtn'),
    presetBtns: querySelectorAll('.preset-btn'),
    typeTabs: querySelectorAll('.type-tab'),
    
    // Input fields (all 8 types)
    urlInput, textInput, emailAddress, emailSubject, emailBody,
    phoneNumber, smsNumber, smsMessage,
    wifiSsid, wifiPassword, wifiEncryption, wifiHidden,
    vcardName, vcardOrg, vcardPhone, vcardEmail, vcardUrl,
    locationLat, locationLng,
    
    // Design controls
    colorFg, colorBg, qrSize, langBtns, presetBtns,
    gradientDirectionBtns,
    
    // UI elements
    toast, toastMessage
};
```

---

## CSS CLASSES & STYLING

### Layout Classes
```css
.qr-generator-page      /* Main page container */
.qr-container           /* QR app wrapper */
.qr-app-container       /* Content container */
.main-content           /* Grid layout (settings + preview) */
.settings-panel         /* Left column - inputs */
.preview-panel          /* Right column - preview */
```

### Card Styling
```css
.preview-card           /* Preview area styling */
.settings-card          /* Settings form styling */
/* Features: glassmorphism, gradient border, hover effects */
```

### Grid Layouts
```css
.type-tabs              /* 4-column grid for type buttons */
.preset-buttons         /* 4-column grid for preset buttons */
.gradient-buttons       /* 5-column grid for gradient directions */
.color-section          /* 2-column color picker layout */
```

### Interactive Elements
```css
.type-tab              /* QR type button - active state highlights */
.preset-btn            /* Design preset - gradient on active */
.gradient-direction-btn /* Gradient angle selector */
.lang-btn              /* Language switcher - active underline */
```

### Responsive Breakpoints
```css
@media (max-width: 992px) { /* Tablet landscape */ }
@media (max-width: 768px) { /* Tablet portrait */ }
    /* Single column layout, 3-column grids */
@media (max-width: 480px) { /* Mobile */ }
    /* 2-column grids, smaller fonts, touch-friendly sizes */
@media (max-width: 360px) { /* Extra small */ }
    /* Single column grids, minimal padding */
```

---

## TRANSLATIONS OBJECT

### Structure
```javascript
const translations = {
    hu: { /* Hungarian key-value pairs */ },
    en: { /* English key-value pairs */ }
}
```

### Translation Keys (40+ keys)
```
// Core
title, subtitle, preview, download

// QR Types
typeTitle, typeUrl, typeText, typeEmail, typePhone, 
typeSms, typeWifi, typeVcard, typeLocation

// Form Labels & Placeholders
urlLabel, urlPlaceholder,
textLabel, textPlaceholder,
emailAddressLabel, emailAddressPlaceholder,
emailSubjectLabel, emailSubjectPlaceholder,
emailBodyLabel, emailBodyPlaceholder,
phoneLabel, phonePlaceholder,
smsNumberLabel, smsNumberPlaceholder,
smsMessageLabel, smsMessagePlaceholder,
wifiSsidLabel, wifiSsidPlaceholder,
wifiPasswordLabel, wifiPasswordPlaceholder,
wifiEncryptionLabel, wifiHiddenLabel,
vcardNameLabel, vcardNamePlaceholder,
vcardOrgLabel, vcardOrgPlaceholder,
vcardPhoneLabel, vcardPhonePlaceholder,
vcardEmailLabel, vcardEmailPlaceholder,
vcardUrlLabel, vcardUrlPlaceholder,
locationLatLabel, locationLatPlaceholder,
locationLngLabel, locationLngPlaceholder,
locationHint,

// Design
designTitle, designLabel,
presetClassic, presetRounded, presetDots, presetGradient,
colorFg, colorBg, sizeLabel,

// Gradient
gradientDirection, gradientLeftRight, gradientTopBottom,
gradientDiagonal1, gradientDiagonal2, gradientRadial,

// Actions
reset, copy, copied, copyError,
download, downloaded, generating,

// Messages
errorEmpty, validationError, footerText
```

---

## EXTERNAL DEPENDENCIES

### CDN Libraries
```html
<!-- QR Code Styling Library -->
<script src="https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js"></script>
```

### Local Scripts
```html
<script src="qr_app.js"></script>     <!-- Main QR logic -->
<script src="script.js"></script>     <!-- Global site JS -->
<script src="cookie-consent.js"></script> <!-- Cookie management -->
```

### Stylesheets
```html
<link rel="stylesheet" href="styles.css">           <!-- Main site CSS -->
<link rel="stylesheet" href="qr_style.css">         <!-- QR-specific CSS -->
<link rel="stylesheet" href="cookie-consent.css">   <!-- Cookie consent UI -->
```

---

## LOCAL STORAGE

### Stored Data
```javascript
localStorage.setItem('qr-lang', 'en' or 'hu');  // Language preference
localStorage.getItem('qr-lang');                // Retrieve language
```

### Usage
- Persists user's language selection
- Loaded on page initialization
- Falls back to browser language if not set

---

## RESPONSIVE DESIGN SPECIFICATIONS

### Header
- **Desktop (70px margin-top)**: Full navigation visible
- **Tablet/768px (60px)**: Compact navigation
- **Mobile/480px (50px)**: Hamburger menu active
- **Extra Small/360px (45px)**: Minimal header

### Main Content
- **Desktop**: 2-column (settings 1.2fr, preview 1fr)
- **Tablet+**: Single column (preview above/below settings)
- **Mobile**: Full width, single column, stacked buttons

### Grid Columns
- **Desktop**: 4 columns (type tabs, presets)
- **Tablet**: 3 columns
- **Mobile (480px)**: 2 columns
- **Extra Small (360px)**: 1 column

### Touch Targets
- Minimum 44x44px for buttons
- Adequate spacing between interactive elements
- Full-width buttons on mobile for easy tapping

---

## PERFORMANCE OPTIMIZATIONS

1. **Debouncing**: 300ms debounce on input events
2. **LocalStorage**: Caches user preferences
3. **Lazy Loading**: Toast notifications auto-dismiss
4. **Efficient Selectors**: querySelectorAll cached in elements object
5. **CSS Variables**: Centralized color management

---

## ACCESSIBILITY FEATURES

- **ARIA Labels**: Buttons have aria-label attributes
- **Keyboard Navigation**: Full keyboard support
- **Language Support**: Two languages (EN/HU)
- **High Contrast**: Dark theme with bright text
- **Error Messages**: Clear validation feedback
- **Semantic HTML**: Proper heading hierarchy

---

## ERROR HANDLING

### Validation Messages
- Empty fields: "Fill in the fields to generate the QR code"
- Invalid email: Email format error
- Invalid phone: Phone format error
- Copy failure: "Copy failed" notification
- Invalid data: "Invalid data" message

### Toast Notifications
- **Success**: Green toast, 3000ms duration
- **Error**: Red toast, 3000ms duration
- **Warning**: Yellow toast, 3000ms duration

---

## BROWSER COMPATIBILITY

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Android Chrome
- **Minimum Requirements**: ES6 support, Canvas API, Clipboard API
- **Fallback**: Toast notifications if Clipboard API unavailable

---

## FILE STRUCTURE

```
/qr-generator.html          Main HTML page
/qr_app.js                  QR logic & functions (1070 lines)
/qr_style.css               QR-specific styling (1284 lines)
/styles.css                 Global site styling
/script.js                  Global site JavaScript
/cookie-consent.js          Cookie management
/index.html                 Homepage (with Tools section link)
```

---

## NOTES FOR DEVELOPERS

1. **QR Types**: All 8 types fully implemented with validation
2. **Presets**: 4 design presets with unique styling
3. **Gradient Support**: 5 gradient direction options
4. **Bilingual**: English & Hungarian fully supported
5. **Dark Theme**: Optimized for readability
6. **Mobile First**: Responsive design for all devices
7. **Customizable**: Color picker and size slider
8. **Export**: Download PNG or copy to clipboard
9. **Real-time**: Updates QR code as user types
10. **Modern Stack**: Vanilla JS, no frameworks needed
