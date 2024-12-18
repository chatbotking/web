// Function to generate CSS based on current settings
function generateCSS() {
    const rootStyle = getComputedStyle(document.documentElement);
    let css = `:root{
        --primaryColor:${rootStyle.getPropertyValue('--primaryColor').trim()};
        --secondaryColor:${rootStyle.getPropertyValue('--secondaryColor').trim()};
        --fontFamily:${rootStyle.getPropertyValue('--fontFamily').trim()};
        --fontWeight:${rootStyle.getPropertyValue('--fontWeight').trim()};
        --headerTextSize:${rootStyle.getPropertyValue('--headerTextSize').trim()};
        --headerTextColor:${rootStyle.getPropertyValue('--headerTextColor').trim()};
        --headerBackgroundLayers:${rootStyle.getPropertyValue('--headerBackgroundLayers').trim()};
        --headerHeight:${rootStyle.getPropertyValue('--headerHeight').trim()};
        --headerTextAlign:${rootStyle.getPropertyValue('--headerTextAlign').trim()};
        --cornerStyle:${rootStyle.getPropertyValue('--cornerStyle').trim()};
        --headerPaddingLeft:${rootStyle.getPropertyValue('--headerPaddingLeft').trim()};
        --chatAreaBackgroundColor:${rootStyle.getPropertyValue('--chatAreaBackgroundColor').trim()};
        --chatAreaBackgroundImage:${rootStyle.getPropertyValue('--chatAreaBackgroundImage').trim()};
        --chatAreaBackgroundPosition:${rootStyle.getPropertyValue('--chatAreaBackgroundPosition').trim()};
        --chatAreaBackgroundRepeat:${rootStyle.getPropertyValue('--chatAreaBackgroundRepeat').trim()};
        --chatAreaBackgroundSize:${rootStyle.getPropertyValue('--chatAreaBackgroundSize').trim()};
        --messageTextSize:${rootStyle.getPropertyValue('--messageTextSize').trim()};
        --messageCornerStyle:${rootStyle.getPropertyValue('--messageCornerStyle').trim()};
        --botMessageTextColor:${rootStyle.getPropertyValue('--botMessageTextColor').trim()};
        --botMessageBg:${rootStyle.getPropertyValue('--botMessageBg').trim()};
        --userMessageTextColor:${rootStyle.getPropertyValue('--userMessageTextColor').trim()};
        --userMessageBg:${rootStyle.getPropertyValue('--userMessageBg').trim()};
        --chatInputBackground:${rootStyle.getPropertyValue('--chatInputBackground').trim()};
        --chatInputTextFieldBg:${rootStyle.getPropertyValue('--chatInputTextFieldBg').trim()};
        --chatInputTextFieldTextColor:${rootStyle.getPropertyValue('--chatInputTextFieldTextColor').trim()};
        --chatInputBorderRadius:${rootStyle.getPropertyValue('--chatInputBorderRadius').trim()};
        --iconsDisplay:${rootStyle.getPropertyValue('--iconsDisplay').trim()};
        --iconsColor:${rootStyle.getPropertyValue('--iconsColor').trim()};
        --buttonTextSize:${rootStyle.getPropertyValue('--buttonTextSize').trim()};
        --buttonFontWeight:${rootStyle.getPropertyValue('--buttonFontWeight').trim()};
        --buttonPadding:${rootStyle.getPropertyValue('--buttonPadding').trim()};
        --chatInputHeight:${rootStyle.getPropertyValue('--chatInputHeight').trim()};
        --avatarSize:${rootStyle.getPropertyValue('--avatarSize').trim()};
        --avatarBorderColor:${rootStyle.getPropertyValue('--avatarBorderColor').trim()};
        --avatarImageURL:${rootStyle.getPropertyValue('--avatarImageURL').trim()};
        --avatarDisplay:${rootStyle.getPropertyValue('--avatarDisplay').trim()};
        --avatarShape:${rootStyle.getPropertyValue('--avatarShape').trim()};
        --otherMessagePaddingLeft:${rootStyle.getPropertyValue('--otherMessagePaddingLeft').trim()};
    }`;

    // Include Footer Settings if Footer is Enabled
    if (footerSettings && footerSettings.showFooter) {
        css += `
        .chat-input:before {
            content: "${footerSettings.footerText}";
            position: absolute;
            bottom: 1px;
            color: ${footerSettings.footerTextColor};
            font-size: ${footerSettings.footerFontSize}px;
            font-family: ${footerSettings.footerFontFamily};
            font-weight: ${footerSettings.footerFontWeight};
            padding: 1px 5px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
        }
        .d-flex.align-items-center.w-100 {
            padding-bottom: 2vh;
        }`;
    }

    // Additional Styles
    css += `
    pre {
        color: var(--botMessageTextColor);
        line-height: 1.5;
        padding: 10px;
        font-weight: var(--buttonFontWeight);
        font-size: var(--messageTextSize);
        font-family: var(--fontFamily);
    }
    .chat-header {
        font-size: var(--headerTextSize);
        color: var(--headerTextColor);
        background: var(--headerBackgroundLayers);
        height: var(--headerHeight);
        text-align: var(--headerTextAlign);
        display: flex;
        align-items: center;
        justify-content: var(--headerTextAlign);
        font-family: var(--fontFamily);
        border-top-left-radius: var(--cornerStyle);
        border-top-right-radius: var(--cornerStyle);
        padding-left: var(--headerPaddingLeft);
    }
    path {
        fill: var(--iconsColor) !important;
    }
    .chat-area {
        height: calc(92% - var(--headerHeight));
        position: absolute;
        top: var(--headerHeight);
        flex: 1;
        padding: 0px;
        overflow-y: auto;
        line-height: 1.5;
        font-family: var(--fontFamily);
        background-color: var(--chatAreaBackgroundColor);
        background-image: var(--chatAreaBackgroundImage);
        background-position: var(--chatAreaBackgroundPosition);
        background-repeat: var(--chatAreaBackgroundRepeat);
        background-size: var(--chatAreaBackgroundSize);
    }
    .other-message {
        position: relative;
        margin-bottom: 10px;
        padding-left: var(--otherMessagePaddingLeft);
    }
    .other-message:before {
        content: "";
        display: var(--avatarDisplay);
        position: absolute;
        top: 0;
        left: 0;
        width: var(--avatarSize);
        height: var(--avatarSize);
        background-image: var(--avatarImageURL);
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: var(--avatarShape);
        border: 3px solid var(--avatarBorderColor);
    }
    .other-message .message-text {
        background-color: var(--botMessageBg);
        color: var(--botMessageTextColor);
        font-size: var(--messageTextSize);
        border-radius: var(--messageCornerStyle);
        word-wrap: break-word;
        font-family: var(--fontFamily);
        margin-bottom: 5px;
        padding: 0px 2px;
    }
    .other-message .message-text * {
        color: var(--botMessageTextColor);
    }
    .my-message {
        padding-right: 0;
        margin-bottom: 10px;
        position: relative;
    }
    .my-message .message-text {
        background-color: var(--userMessageBg) !important;
        color: var(--userMessageTextColor);
        font-size: var(--messageTextSize);
        border-radius: var(--messageCornerStyle);
        word-wrap: break-word;
        font-family: var(--fontFamily);
        margin-bottom: 5px;
        margin-top: 5vh;
        padding: 0px 3px;
    }
    .my-message .message-text * {
        color: var(--userMessageTextColor) !important;
    }
    .message-text * {
        font-family: inherit;
    }
    .chat-input {
        height: var(--chatInputHeight);
        padding: 20px;
        background: var(--chatInputBackground);
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        border-top: none;
        font-family: var(--fontFamily);
    }
    .chat-input .input-group {
        flex: 1;
        border-radius: var(--chatInputBorderRadius) !important;
        background-color: var(--chatInputTextFieldBg) !important;
        overflow: hidden;
        position: relative;
        display: flex;
    }
    .chat-input input {
        width: 100%;
        padding: 10px;
        border: none;
        background-color: var(--chatInputTextFieldBg);
        color: var(--chatInputTextFieldTextColor);
        font-size: 14px;
        outline: none;
        box-sizing: border-box;
        flex: 1;
    }
    .chat-input .form-control {
        background: var(--chatInputTextFieldBg) !important;
    }
    /* Other existing styles ... */
    `;

    document.getElementById('cssOutput').value = css.trim();
}

// Function to update the preview based on control inputs
function updatePreview() {
    const root = document.documentElement.style;

    // Header Settings
    const headerTextSize = document.getElementById('headerTextSize').value + 'px';
    const headerTextColor = document.getElementById('headerTextColor').value;
    const headerHeightValue = document.getElementById('headerHeight').value;
    const headerHeight = headerHeightValue + 'px';
    const headerTextAlign = document.getElementById('headerTextAlign').value;
    const cornerStyle = document.getElementById('cornerStyle').value;
    let fontFamily = document.getElementById('fontFamily').value;
    const headerBackgroundType = document.getElementById('headerBackgroundType').value;

    root.setProperty('--headerTextSize', headerTextSize);
    root.setProperty('--headerTextColor', headerTextColor);
    root.setProperty('--headerHeight', headerHeight);
    root.setProperty('--headerTextAlign', headerTextAlign);
    root.setProperty('--cornerStyle', cornerStyle);
    root.setProperty('--fontFamily', fontFamily);

    // Update font family and weight in preview elements
    document.querySelectorAll('.preview, .chat-preview-container, .chat-header, .chat-area, .chat-input, .message-text, pre, .card-button').forEach(el => {
        el.style.fontFamily = root.getPropertyValue('--fontFamily').trim();
        el.style.fontWeight = 'bold';
    });

    let headerBackgroundLayer = '';
    if (headerBackgroundType === 'solid') {
        const headerBgSolid = document.getElementById('headerBgSolid').value;
        headerBackgroundLayer = headerBgSolid;
    } else {
        const headerBgGradientStart = document.getElementById('headerBgGradientStart').value;
        const headerBgGradientEnd = document.getElementById('headerBgGradientEnd').value;
        const headerBgGradientDirection = document.getElementById('headerBgGradientDirection').value;
        headerBackgroundLayer = `linear-gradient(${headerBgGradientDirection}, ${headerBgGradientStart}, ${headerBgGradientEnd})`;
    }

    // Header Logo Settings
    const headerLogoURL = document.getElementById('headerLogoURL').value;
    const headerLogoWidth = document.getElementById('headerLogoWidth').value || '40';
    const headerLogoAlignment = document.getElementById('headerLogoAlignment').value || 'left';
    const headerLogoOffsetX = document.getElementById('headerLogoOffsetX').value || '0';
    const headerLogoOffsetY = document.getElementById('headerLogoOffsetY').value || '0';
    let headerBackgroundLayers = '';

    if (headerLogoURL) {
        document.getElementById('headerLogoSizeGroup').style.display = 'block';
        document.getElementById('headerLogoPositionGroup').style.display = 'block';

        let positionX = '';
        if (headerLogoAlignment === 'left') {
            positionX = `calc(${headerLogoOffsetX}px)`;
        } else if (headerLogoAlignment === 'center') {
            positionX = `calc(50% + ${headerLogoOffsetX}px - ${headerLogoWidth / 2}px)`;
        } else if (headerLogoAlignment === 'right') {
            positionX = `calc(100% - ${headerLogoWidth}px - ${headerLogoOffsetX}px)`;
        }

        const positionY = `${headerLogoOffsetY}px`;
        const headerLogoWidthPx = headerLogoWidth + 'px';

        headerBackgroundLayers = `url('${headerLogoURL}') ${positionX} ${positionY} / ${headerLogoWidthPx} no-repeat, ${headerBackgroundLayer}`;
    } else {
        document.getElementById('headerLogoSizeGroup').style.display = 'none';
        document.getElementById('headerLogoPositionGroup').style.display = 'none';
        root.setProperty('--headerPaddingLeft', '20px');
        headerBackgroundLayers = headerBackgroundLayer;
    }
    root.setProperty('--headerBackgroundLayers', headerBackgroundLayers);

    // Chat Area Settings
    const chatAreaBackgroundType = document.getElementById('chatAreaBackgroundType').value;

    if (chatAreaBackgroundType === 'solid') {
        const chatAreaBgSolid = document.getElementById('chatAreaBgSolid').value;
        root.setProperty('--chatAreaBackgroundColor', chatAreaBgSolid);
        root.setProperty('--chatAreaBackgroundImage', 'none');
    } else if (chatAreaBackgroundType === 'gradient') {
        const chatAreaBgGradientStart = document.getElementById('chatAreaBgGradientStart').value;
        const chatAreaBgGradientEnd = document.getElementById('chatAreaBgGradientEnd').value;
        const chatAreaBgGradientDirection = document.getElementById('chatAreaBgGradientDirection').value;
        root.setProperty('--chatAreaBackgroundColor', 'transparent');
        root.setProperty('--chatAreaBackgroundImage', `linear-gradient(${chatAreaBgGradientDirection}, ${chatAreaBgGradientStart}, ${chatAreaBgGradientEnd})`);
        root.setProperty('--chatAreaBackgroundPosition', 'center');
        root.setProperty('--chatAreaBackgroundRepeat', 'no-repeat');
        root.setProperty('--chatAreaBackgroundSize', 'cover');
    } else if (chatAreaBackgroundType === 'image') {
        const chatAreaBgImageURL = document.getElementById('chatAreaBgImageURL').value;
        const chatAreaBgSize = document.getElementById('chatAreaBgSize').value;
        const chatAreaBgRepeat = document.getElementById('chatAreaBgRepeat').value;
        if (chatAreaBgImageURL) {
            root.setProperty('--chatAreaBackgroundColor', 'transparent');
            root.setProperty('--chatAreaBackgroundImage', `url('${chatAreaBgImageURL}')`);
            root.setProperty('--chatAreaBackgroundSize', chatAreaBgSize);
            root.setProperty('--chatAreaBackgroundRepeat', chatAreaBgRepeat);
            root.setProperty('--chatAreaBackgroundPosition', 'center');
        }
    }

    // Message Settings
    const messageTextSizeValue = document.getElementById('messageTextSize').value;
    const messageTextSize = messageTextSizeValue + 'px';
    const messageCornerStyle = document.getElementById('messageCornerStyle').value;
    const botMessageTextColor = document.getElementById('botMessageTextColor').value;
    const botMessageBg = document.getElementById('botMessageBg').value;
    const userMessageTextColor = document.getElementById('userMessageTextColor').value;
    const userMessageBg = document.getElementById('userMessageBg').value;

    root.setProperty('--messageTextSize', messageTextSize);
    root.setProperty('--buttonTextSize', messageTextSize); // Update button text size
    root.setProperty('--messageCornerStyle', messageCornerStyle);
    root.setProperty('--botMessageTextColor', botMessageTextColor);
    root.setProperty('--botMessageBg', botMessageBg);
    root.setProperty('--userMessageTextColor', userMessageTextColor);
    root.setProperty('--userMessageBg', userMessageBg);

    // Font Weight
    root.setProperty('--fontWeight', 'bold');

    // Avatar Settings
    const showAvatar = document.getElementById('showAvatar').checked;
    root.setProperty('--avatarDisplay', showAvatar ? 'inline-block' : 'none');
    root.setProperty('--avatarSize', document.getElementById('avatarSize').value + 'px');
    const avatarBorderColor = document.getElementById('avatarBorderColor').value;
    const avatarBorderTransparent = document.getElementById('avatarBorderTransparent').checked;
    const avatarBorderColorValue = avatarBorderTransparent ? '0px, transparent' : avatarBorderColor;
    root.setProperty('--avatarBorderColor', avatarBorderColorValue);
    const avatarURL = document.getElementById('avatarImageURL').value;
    root.setProperty('--avatarImageURL', avatarURL ? `url("${avatarURL}")` : 'none');
    root.setProperty('--avatarShape', document.getElementById('avatarShape').value);

    // Disable color picker when border is transparent
    document.getElementById('avatarBorderColor').disabled = avatarBorderTransparent;

    // Adjust other-message padding based on avatar visibility
    if (showAvatar) {
        const avatarSizeValue = document.getElementById('avatarSize').value;
        root.setProperty('--otherMessagePaddingLeft', `calc(${avatarSizeValue}px + 10px)`);
    } else {
        root.setProperty('--otherMessagePaddingLeft', '0px');
    }

    // Icon Settings
    const showIcons = document.getElementById('showIcons').checked;
    const iconColor = document.getElementById('icon-color').value;

    root.setProperty('--iconsDisplay', showIcons ? 'inline-block' : 'none');
    root.setProperty('--iconsColor', iconColor);

    // Chat Input Settings
    const chatInputBackgroundType = document.getElementById('chatInputBackgroundType').value;
    const chatInputTextFieldBg = document.getElementById('chatInputTextFieldBg').value;
    const chatInputTextFieldTextColor = document.getElementById('chatInputTextFieldTextColor').value;
    const chatInputCornerStyle = document.getElementById('chatInputCornerStyle').value;

    root.setProperty('--chatInputTextFieldBg', chatInputTextFieldBg);
    root.setProperty('--chatInputTextFieldTextColor', chatInputTextFieldTextColor);
    root.setProperty('--chatInputBorderRadius', chatInputCornerStyle);

    if (chatInputBackgroundType === 'solid') {
        const chatInputBgSolid = document.getElementById('chatInputBgSolid').value;
        root.setProperty('--chatInputBackground', chatInputBgSolid);
    } else {
        const chatInputBgGradientStart = document.getElementById('chatInputBgGradientStart').value;
        const chatInputBgGradientEnd = document.getElementById('chatInputBgGradientEnd').value;
        const chatInputBgGradientDirection = document.getElementById('chatInputBgGradientDirection').value;
        root.setProperty('--chatInputBackground', `linear-gradient(${chatInputBgGradientDirection}, ${chatInputBgGradientStart}, ${chatInputBgGradientEnd})`);
    }

    generateCSS();
    saveSettings(); // Save settings after updating
}

// Element References
const footerShowCheckbox = document.getElementById('footer-show');
const footerTextInput = document.getElementById('footer-text');
const footerTextColorInput = document.getElementById('footer-text-color');
const footerFontSizeInput = document.getElementById('footer-font-size');
const footerFontFamilyInput = document.getElementById('footer-font-family');
const footerFontWeightInput = document.getElementById('footer-font-weight');

// Footer Settings (Initialize with default values)
const footerSettings = {
    showFooter: false,
    footerText: 'Sample Footer Text',
    footerTextColor: '#000000',
    footerFontSize: 14,
    footerFontFamily: 'Arial, sans-serif',
    footerFontWeight: 'normal',
};

// Update CSS and Preview
function updateFooterSettings() {
    // Update Footer settings object
    footerSettings.showFooter = footerShowCheckbox.checked;
    footerSettings.footerText = footerTextInput.value;
    footerSettings.footerTextColor = footerTextColorInput.value;
    footerSettings.footerFontSize = footerFontSizeInput.value;
    footerSettings.footerFontFamily = footerFontFamilyInput.value;
    footerSettings.footerFontWeight = footerFontWeightInput.value;

    // Generate Footer CSS
    let footerCSS = '';
    if (footerSettings.showFooter) {
        footerCSS = `
        .chat-input:before {
            content: "${footerSettings.footerText}";
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            color: ${footerSettings.footerTextColor};
            font-size: ${footerSettings.footerFontSize}px;
            font-family: ${footerSettings.footerFontFamily};
            font-weight: ${footerSettings.footerFontWeight};
            text-align: center;
            white-space: nowrap;
        }
        .d-flex.align-items-center.w-100 {
            padding-bottom: 2vh;
        }
        `;
    }

    // Apply the CSS to the preview
    const styleTag = document.getElementById('footerStyles');
    if (styleTag) {
        styleTag.innerHTML = footerCSS.trim();
    } else {
        const newStyleTag = document.createElement('style');
        newStyleTag.id = 'footerStyles';
        newStyleTag.innerHTML = footerCSS.trim();
        document.head.appendChild(newStyleTag);
    }

    generateCSS();
}

// Function to save settings to LocalStorage
function saveSettings() {
    const settings = {};
    document.querySelectorAll('.controls input, .controls select, .controls textarea').forEach(input => {
        if (input.type === 'checkbox') {
            settings[input.id] = input.checked;
        } else {
            settings[input.id] = input.value;
        }
    });
    localStorage.setItem('chatCustomizationSettings', JSON.stringify(settings));
}

// Function to load settings from LocalStorage
function loadSettings() {
    const settings = localStorage.getItem('chatCustomizationSettings');
    if (settings) {
        const parsedSettings = JSON.parse(settings);
        document.querySelectorAll('.controls input, .controls select, .controls textarea').forEach(input => {
            if (input.id in parsedSettings) {
                if (input.type === 'checkbox') {
                    input.checked = parsedSettings[input.id];
                } else {
                    input.value = parsedSettings[input.id];
                }
            }
        });

        // After setting values, trigger change events where necessary
        document.getElementById('headerBackgroundType').dispatchEvent(new Event('change'));
        document.getElementById('chatAreaBackgroundType').dispatchEvent(new Event('change'));
        document.getElementById('chatInputBackgroundType').dispatchEvent(new Event('change'));
        document.getElementById('headerLogoURL').dispatchEvent(new Event('input'));

        // Update footer settings
        updateFooterSettings();

        // Trigger the avatar border transparency update
        updatePreview();
    }
}

// Function to reset settings to default
function resetSettings() {
    if (confirm('Are you sure you want to reset to default settings?')) {
        localStorage.removeItem('chatCustomizationSettings');
        window.location.reload();
    }
}

// Function to copy CSS to clipboard
function copyCSS() {
    const cssOutput = document.getElementById('cssOutput');
    cssOutput.select();
    cssOutput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');

    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    setTimeout(() => { successMessage.style.display = 'none'; }, 2000);
}

// Event Listeners for Footer Inputs
footerShowCheckbox.addEventListener('change', (e) => {
    footerSettings.showFooter = e.target.checked;
    updateFooterSettings();
    generateCSS();
    saveSettings();
});

footerTextInput.addEventListener('input', (e) => {
    footerSettings.footerText = e.target.value;
    updateFooterSettings();
    generateCSS();
    saveSettings();
});

footerTextColorInput.addEventListener('input', (e) => {
    footerSettings.footerTextColor = e.target.value;
    updateFooterSettings();
    generateCSS();
    saveSettings();
});

footerFontSizeInput.addEventListener('input', (e) => {
    footerSettings.footerFontSize = e.target.value;
    updateFooterSettings();
    generateCSS();
    saveSettings();
});

footerFontFamilyInput.addEventListener('change', (e) => {
    footerSettings.footerFontFamily = e.target.value;
    updateFooterSettings();
    generateCSS();
    saveSettings();
});

footerFontWeightInput.addEventListener('change', (e) => {
    footerSettings.footerFontWeight = e.target.value;
    updateFooterSettings();
    generateCSS();
    saveSettings();
});

// Event Listeners for All Inputs to Update Preview and Save Settings
document.querySelectorAll('.controls input, .controls select, .controls textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
});

// Toggle Header Background Options
document.getElementById('headerBackgroundType').addEventListener('change', function() {
    const type = this.value;
    if (type === 'solid') {
        document.getElementById('headerSolidColorGroup').style.display = 'block';
        document.getElementById('headerGradientGroup').style.display = 'none';
    } else {
        document.getElementById('headerSolidColorGroup').style.display = 'none';
        document.getElementById('headerGradientGroup').style.display = 'block';
    }
    updatePreview();
});

// Toggle Chat Area Background Options
document.getElementById('chatAreaBackgroundType').addEventListener('change', function() {
    const type = this.value;
    if (type === 'solid') {
        document.getElementById('chatAreaSolidColorGroup').style.display = 'block';
        document.getElementById('chatAreaGradientGroup').style.display = 'none';
        document.getElementById('chatAreaImageGroup').style.display = 'none';
    } else if (type === 'gradient') {
        document.getElementById('chatAreaSolidColorGroup').style.display = 'none';
        document.getElementById('chatAreaGradientGroup').style.display = 'block';
        document.getElementById('chatAreaImageGroup').style.display = 'none';
    } else if (type === 'image') {
        document.getElementById('chatAreaSolidColorGroup').style.display = 'none';
        document.getElementById('chatAreaGradientGroup').style.display = 'none';
        document.getElementById('chatAreaImageGroup').style.display = 'block';
    }
    updatePreview();
});

// Toggle Chat Input Background Options
document.getElementById('chatInputBackgroundType').addEventListener('change', function() {
    const type = this.value;
    if (type === 'solid') {
        document.getElementById('chatInputSolidColorGroup').style.display = 'block';
        document.getElementById('chatInputGradientGroup').style.display = 'none';
    } else {
        document.getElementById('chatInputSolidColorGroup').style.display = 'none';
        document.getElementById('chatInputGradientGroup').style.display = 'block';
    }
    updatePreview();
});

// Toggle 'avatarBorderTransparent' Event Handler
document.getElementById('avatarBorderTransparent').addEventListener('change', function() {
    const avatarBorderColorInput = document.getElementById('avatarBorderColor');
    if (this.checked) {
        document.documentElement.style.setProperty('--avatarBorderColor', 'transparent');
        avatarBorderColorInput.disabled = true; // Disable color picker when transparent
    } else {
        const avatarBorderColor = avatarBorderColorInput.value;
        document.documentElement.style.setProperty('--avatarBorderColor', avatarBorderColor);
        avatarBorderColorInput.disabled = false; // Enable color picker when not transparent
    }
    generateCSS();
    saveSettings();
});

// Toggle 'showAvatar' Event Handler
document.getElementById('showAvatar').addEventListener('change', function() {
    updatePreview();
});

// Toggle 'showIcons' Event Handler
document.getElementById('showIcons').addEventListener('change', function() {
    updatePreview();
});

// Toggle Section Content Visibility and ensure only one is open at a time
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('click', function() {
        const currentlyOpen = document.querySelector('.section-content:not([style*="display: none"])');
        const sectionContent = this.nextElementSibling;
        const toggleIcon = this.querySelector('.toggle-icon');

        if (sectionContent.style.display === 'none' || sectionContent.style.display === '') {
            // Close the currently open section
            if (currentlyOpen && currentlyOpen !== sectionContent) {
                currentlyOpen.style.display = 'none';
                currentlyOpen.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
            }
            // Open the clicked section
            sectionContent.style.display = 'block';
            toggleIcon.textContent = '-';
        } else {
            sectionContent.style.display = 'none';
            toggleIcon.textContent = '+';
        }
    });
});

window.onload = function() {
    loadSettings();
    updatePreview();
};
