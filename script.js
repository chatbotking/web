// Function to generate CSS based on current settings
function generateCSS() {
    const rootStyle = getComputedStyle(document.documentElement);
    let css = '';

    // Collect all the root variables
    const cssVariables = [];
    for (let i = 0; i < rootStyle.length; i++) {
        const name = rootStyle[i];
        const value = rootStyle.getPropertyValue(name).trim();
        cssVariables.push(`${name}: ${value};`);
    }
    css += `:root {\n    ${cssVariables.join('\n    ')}\n}\n`;

    // Include necessary CSS selectors
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

.chat-area {
    height: calc(88% - 60px);
    position: absolute;
    top: calc(var(--headerHeight) + var(--headerPaddingTop, 0px));
    flex: 1;
    padding: 20px;
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
    margin-bottom: 15px;
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
    padding: 10px 15px;
    word-wrap: break-word;
    font-family: var(--fontFamily);
    margin-bottom: 5px;
}

.other-message .message-text * {
    color: var(--botMessageTextColor);
}

.my-message {
    padding-right: 0;
    margin-bottom: 15px;
    position: relative;
}

.my-message .message-text {
    background-color: var(--userMessageBg) !important;
    color: var(--userMessageTextColor);
    font-size: var(--messageTextSize);
    border-radius: var(--messageCornerStyle);
    padding: 10px 15px;
    word-wrap: break-word;
    font-family: var(--fontFamily);
    margin-bottom: 5px;
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
    box-sizing: border-box;
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
    padding: 15px;
    border: none;
    background-color: var(--chatInputTextFieldBg);
    color: var(--chatInputTextFieldTextColor);
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
    flex: 1;
}

/* Additional CSS */
.chat-input .form-control {
    border-radius: 0 !important;
    border: none !important;
    background-color: var(--chatInputTextFieldBg) !important;
    color: var(--chatInputTextFieldTextColor) !important;
}

.input-group > .custom-select:not(:last-child),
.input-group > .form-control:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.chat-input .input-group {
    flex: 1;
    border-radius: var(--chatInputBorderRadius) !important;
    background-color: var(--chatInputTextFieldBg) !important;
    overflow: hidden;
    position: relative;
    display: flex;
}

/* Hide icons if not displayed */
.chat-input .uploadBtt {
    display: var(--iconsDisplay);
}

/* Ice Breaker Buttons */
.chat-ice-breaker {
    position: fixed;
    right: 20px;
    bottom: 80px;
}

.chat-ice-breaker button {
    background-color: #FFF7FA;
    color: var(--botMessageTextColor);
    font-weight: var(--buttonFontWeight);
    font-size: var(--buttonTextSize);
    font-family: var(--fontFamily);
    padding: var(--buttonPadding);
    border-radius: 20px;
    transition: transform 0.2s ease, background-color 0.2s ease;
    border: none;
    cursor: pointer;
    margin: 5px 0;
}

.chat-ice-breaker button:hover {
    background-color: #f3e6e6;
    transform: scale(1.05);
}

/* Card Buttons */
.card-button {
    background: #E3F2FD;
    color: var(--botMessageTextColor);
    font-weight: var(--buttonFontWeight);
    font-size: var(--buttonTextSize);
    font-family: var(--fontFamily);
    padding: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
    margin: 5px 0;
}

.card-button:hover {
    background-color: #d0e7f8;
    transform: scale(1.05);
}
`;

    // Update the generated CSS textarea
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
    root.setProperty('--fontWeight', 'bold'); // Assuming bold as per your instruction

    // Avatar Settings
    const showAvatar = document.getElementById('showAvatar').checked;
    root.setProperty('--avatarDisplay', showAvatar ? 'inline-block' : 'none');
    root.setProperty('--avatarSize', document.getElementById('avatarSize').value + 'px');
    root.setProperty('--avatarBorderColor', document.getElementById('avatarBorderColor').value);
    const avatarURL = document.getElementById('avatarImageURL').value;
    root.setProperty('--avatarImageURL', avatarURL ? `url("${avatarURL}")` : 'none');
    root.setProperty('--avatarShape', document.getElementById('avatarShape').value);

    // Adjust other-message padding based on avatar visibility
    if (showAvatar) {
        const avatarSizeValue = document.getElementById('avatarSize').value;
        root.setProperty('--otherMessagePaddingLeft', `calc(${avatarSizeValue}px + 10px)`);
    } else {
        root.setProperty('--otherMessagePaddingLeft', '0px');
    }

    // Icon Settings
    const showIcons = document.getElementById('showIcons').checked;
    root.setProperty('--iconsDisplay', showIcons ? 'inline-block' : 'none');

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
    const cssText = cssOutput.value;

    navigator.clipboard.writeText(cssText).then(function() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        setTimeout(() => { successMessage.style.display = 'none'; }, 2000);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Event Listeners
document.querySelectorAll('input, select, textarea').forEach(input => {
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

// Toggle Section Content Visibility and ensure only one is open at a time
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('click', function() {
        const currentSection = this.parentElement;
        const currentlyOpenSection = document.querySelector('.section.open');
        const toggleIcon = this.querySelector('.toggle-icon');

        if (currentlyOpenSection && currentlyOpenSection !== currentSection) {
            currentlyOpenSection.classList.remove('open');
            currentlyOpenSection.querySelector('.toggle-icon').textContent = '+';
            currentlyOpenSection.querySelector('.section-content').style.display = 'none';
        }

        if (currentSection.classList.contains('open')) {
            currentSection.classList.remove('open');
            toggleIcon.textContent = '+';
            currentSection.querySelector('.section-content').style.display = 'none';
        } else {
            currentSection.classList.add('open');
            toggleIcon.textContent = '-';
            currentSection.querySelector('.section-content').style.display = 'block';
        }
    });
});

// Initialize the preview on page load
window.addEventListener('load', function() {
    loadSettings();
    updatePreview();
});
