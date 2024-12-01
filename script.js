// Debounce function to limit the rate at which a function can fire.
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// Function to generate CSS based on current settings
function generateCSS() {
    const root = document.documentElement;
    let css = `/* Root Variables */\n:root {\n`;

    // List of CSS variables to include
    const variableNames = [
        '--primaryColor', '--secondaryColor',
        '--fontFamily', '--fontWeight',
        '--headerTextSize', '--headerTextColor', '--headerBackgroundLayers', '--headerHeight', '--headerTextAlign', '--cornerStyle',
        '--headerLogoWidth', '--headerLogoMarginRight', '--headerLogoMarginLeft', '--headerLogoOffsetX', '--headerLogoOffsetY',
        '--chatAreaBackgroundColor', '--chatAreaBackgroundImage', '--chatAreaBackgroundPosition', '--chatAreaBackgroundRepeat', '--chatAreaBackgroundSize',
        '--messageTextSize', '--messageCornerStyle', '--botMessageTextColor', '--botMessageBg', '--userMessageTextColor', '--userMessageBg',
        '--avatarSize', '--avatarBorderColor', '--avatarBorderWidth', '--avatarShape', '--avatarImageURL', '--avatarDisplay', '--otherMessagePaddingLeft',
        '--chatInputBackground', '--chatInputTextFieldBg', '--chatInputTextFieldTextColor', '--chatInputBorderRadius', '--chatInputHeight',
        '--iconsDisplay',
        '--footerDisplay', '--footerTextColor', '--footerBackground'
    ];

    // Append each variable and its value
    variableNames.forEach(name => {
        const value = root.style.getPropertyValue(name).trim();
        css += `    ${name}: ${value};\n`;
    });
    css += `}\n\n`;

    // Include necessary CSS selectors in the expected format
    css += `/* Message Text Styling */\npre {\n    font-size: var(--messageTextSize);\n    font-weight: normal;\n    font-family: var(--fontFamily);\n}\n\n`;

    /* Chat Header Styling */
    css += `/* Chat Header Styling */\n.chat-header {\n    font-size: var(--headerTextSize);\n    color: var(--headerTextColor);\n    background: var(--headerBackgroundLayers);\n    height: var(--headerHeight);\n    text-align: var(--headerTextAlign);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    font-family: var(--fontFamily);\n    border-top-left-radius: var(--cornerStyle);\n    border-top-right-radius: var(--cornerStyle);\n}\n\n`;

    /* Header Logo Styling */
    css += `/* Header Logo Styling */\n.chat-header img#headerLogoImg {\n    width: var(--headerLogoWidth);\n    height: auto;\n    margin-right: var(--headerLogoMarginRight);\n    margin-left: var(--headerLogoMarginLeft);\n    max-height: calc(var(--headerHeight) - 20px);\n    position: relative;\n    transform: translate(var(--headerLogoOffsetX), var(--headerLogoOffsetY));\n}\n\n`;

    /* Chat Area Styling */
    css += `/* Chat Area Styling */\n.chat-area {\n    background-color: var(--chatAreaBackgroundColor);\n    background-image: var(--chatAreaBackgroundImage);\n    background-position: var(--chatAreaBackgroundPosition);\n    background-repeat: var(--chatAreaBackgroundRepeat);\n    background-size: var(--chatAreaBackgroundSize);\n    font-family: var(--fontFamily);\n    padding: 20px;\n    overflow-y: auto;\n    flex: 1;\n}\n\n`;

    /* Bot Message Styling */
    css += `/* Bot Message Styling */\n.other-message {\n    position: relative;\n    margin-bottom: 15px;\n    padding-left: var(--otherMessagePaddingLeft);\n}\n.other-message .message-text {\n    background-color: var(--botMessageBg);\n    color: var(--botMessageTextColor);\n    font-size: var(--messageTextSize);\n    border-radius: var(--messageCornerStyle);\n    padding: 10px 15px;\n    word-wrap: break-word;\n    font-family: var(--fontFamily);\n    margin-bottom: 5px;\n}\n\n`;

    /* User Message Styling */
    css += `/* User Message Styling */\n.my-message {\n    padding-right: 0;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.my-message .message-text {\n    background-color: var(--userMessageBg) !important;\n    color: var(--userMessageTextColor);\n    font-size: var(--messageTextSize);\n    border-radius: var(--messageCornerStyle);\n    padding: 10px 15px;\n    word-wrap: break-word;\n    font-family: var(--fontFamily);\n    margin-bottom: 5px;\n    margin-top: 5vh;\n}\n\n`;

    /* Message Text Inheritance */
    css += `/* Message Text Inheritance */\n.message-text * {\n    color: inherit;\n    font-family: inherit;\n}\n\n`;

    /* Chat Input Styling */
    css += `/* Chat Input Styling */\n.chat-input {\n    padding: 20px;\n    background: var(--chatInputBackground);\n    display: flex;\n    align-items: center;\n    width: 100%;\n    box-sizing: border-box;\n    border-top: 1px solid #e0e0e0;\n    font-family: var(--fontFamily);\n    position: relative;\n}\n.chat-input .input-group {\n    flex: 1;\n    border-radius: var(--chatInputBorderRadius) !important;\n    background-color: var(--chatInputTextFieldBg) !important;\n    overflow: hidden;\n    position: relative;\n    display: flex;\n}\n.chat-input input {\n    width: 100%;\n    padding: 15px;\n    border: none;\n    background-color: var(--chatInputTextFieldBg);\n    color: var(--chatInputTextFieldTextColor);\n    font-size: 14px;\n    outline: none;\n    box-sizing: border-box;\n    flex: 1;\n}\n\n`;

    /* Avatar Styling */
    css += `/* Avatar Styling */\n.avatar {\n    display: var(--avatarDisplay);\n    width: var(--avatarSize);\n    height: var(--avatarSize);\n    border: var(--avatarBorderWidth) solid var(--avatarBorderColor);\n    border-radius: var(--avatarShape);\n    background-image: var(--avatarImageURL);\n    background-size: cover;\n    background-position: center;\n    margin-right: 10px;\n}\n\n`;

    /* Icons Styling */
    css += `/* Icons Styling */\n.icons {\n    display: var(--iconsDisplay);\n    align-items: center;\n    margin-left: 10px;\n}\n\n.icons .icon {\n    margin-left: 10px;\n    cursor: pointer;\n    font-size: 20px;\n    color: var(--primaryColor);\n    transition: color 0.3s;\n}\n\n.icons .icon:hover {\n    color: var(--botMessageTextColor);\n}\n\n`;

    /* Footer Styling */
    css += `/* Footer Styling */\n.chat-footer {\n    display: var(--footerDisplay);\n    padding: 10px;\n    background: var(--footerBackground);\n    text-align: center;\n    font-size: 14px;\n    color: var(--footerTextColor);\n    font-family: var(--fontFamily);\n}\n`;

    // Update the generated CSS textarea
    const cssOutput = document.getElementById('cssOutput');
    if (cssOutput) {
        cssOutput.value = css.trim();
    } else {
        console.error('cssOutput textarea not found.');
    }
}

// Function to update the preview based on control inputs
function updatePreview() {
    const root = document.documentElement.style;

    // Header Settings
    const headerTextSize = document.getElementById('headerTextSize').value + 'px';
    const headerTextColor = document.getElementById('headerTextColor').value;
    const headerBackgroundType = document.getElementById('headerBackgroundType').value;
    const headerHeight = document.getElementById('headerHeight').value + 'px';
    const headerTextAlign = document.getElementById('headerTextAlign').value;
    const cornerStyle = document.getElementById('cornerStyle').value;

    root.setProperty('--headerTextSize', headerTextSize);
    root.setProperty('--headerTextColor', headerTextColor);
    root.setProperty('--headerHeight', headerHeight);
    root.setProperty('--headerTextAlign', headerTextAlign);
    root.setProperty('--cornerStyle', cornerStyle);

    // Header Background
    let headerBackground = '';
    if (headerBackgroundType === 'solid') {
        const headerBgSolid = document.getElementById('headerBgSolid').value;
        headerBackground = headerBgSolid;
    } else if (headerBackgroundType === 'gradient') {
        const headerBgGradientStart = document.getElementById('headerBgGradientStart').value;
        const headerBgGradientEnd = document.getElementById('headerBgGradientEnd').value;
        const headerBgGradientDirection = document.getElementById('headerBgGradientDirection').value;
        headerBackground = `linear-gradient(${headerBgGradientDirection}, ${headerBgGradientStart}, ${headerBgGradientEnd})`;
    }
    root.setProperty('--headerBackgroundLayers', headerBackground);

    // Header Logo
    const headerLogoURL = document.getElementById('headerLogoURL').value.trim();
    const headerLogoWidth = document.getElementById('headerLogoWidth').value + 'px';
    const headerLogoAlignment = document.getElementById('headerLogoAlignment').value;
    const headerLogoOffsetX = document.getElementById('headerLogoOffsetX').value + 'px';
    const headerLogoOffsetY = document.getElementById('headerLogoOffsetY').value + 'px';

    root.setProperty('--headerLogoWidth', headerLogoWidth);
    root.setProperty('--headerLogoOffsetX', headerLogoOffsetX);
    root.setProperty('--headerLogoOffsetY', headerLogoOffsetY);

    // Move Header Logo to the appropriate container based on alignment
    const headerLogoImg = document.getElementById('headerLogoImg');
    const headerLeft = document.querySelector('.header-left');
    const headerCenter = document.querySelector('.header-center');
    const headerRight = document.querySelector('.header-right');

    if (headerLogoAlignment === 'left') {
        headerLeft.appendChild(headerLogoImg);
        root.setProperty('--headerLogoMarginRight', '10px');
        root.setProperty('--headerLogoMarginLeft', '0px');
    } else if (headerLogoAlignment === 'center') {
        headerCenter.insertBefore(headerLogoImg, headerCenter.firstChild);
        root.setProperty('--headerLogoMarginRight', '10px');
        root.setProperty('--headerLogoMarginLeft', '10px');
    } else if (headerLogoAlignment === 'right') {
        headerRight.appendChild(headerLogoImg);
        root.setProperty('--headerLogoMarginRight', '0px');
        root.setProperty('--headerLogoMarginLeft', '10px');
    }

    // Update Header Logo Image Element
    if (headerLogoImg) {
        if (headerLogoURL) {
            headerLogoImg.src = headerLogoURL;
            headerLogoImg.style.display = 'block';
            headerLogoImg.style.width = headerLogoWidth;
            // Alignment adjustments are handled via CSS variables
        } else {
            headerLogoImg.style.display = 'none';
        }
    } else {
        console.error('headerLogoImg element not found.');
    }

    // Chat Area Settings
    const chatAreaBackgroundType = document.getElementById('chatAreaBackgroundType').value;
    if (chatAreaBackgroundType === 'solid') {
        const chatAreaBgSolid = document.getElementById('chatAreaBgSolid').value;
        root.setProperty('--chatAreaBackgroundColor', chatAreaBgSolid);
        root.setProperty('--chatAreaBackgroundImage', 'none');
        root.setProperty('--chatAreaBackgroundPosition', 'initial');
        root.setProperty('--chatAreaBackgroundRepeat', 'initial');
        root.setProperty('--chatAreaBackgroundSize', 'initial');
    } else if (chatAreaBackgroundType === 'gradient') {
        const chatAreaBgGradientStart = document.getElementById('chatAreaBgGradientStart').value;
        const chatAreaBgGradientEnd = document.getElementById('chatAreaBgGradientEnd').value;
        const chatAreaBgGradientDirection = document.getElementById('chatAreaBgGradientDirection').value;
        const gradient = `linear-gradient(${chatAreaBgGradientDirection}, ${chatAreaBgGradientStart}, ${chatAreaBgGradientEnd})`;
        root.setProperty('--chatAreaBackgroundColor', 'transparent');
        root.setProperty('--chatAreaBackgroundImage', gradient);
        root.setProperty('--chatAreaBackgroundPosition', 'initial');
        root.setProperty('--chatAreaBackgroundRepeat', 'initial');
        root.setProperty('--chatAreaBackgroundSize', 'initial');
    } else if (chatAreaBackgroundType === 'image') {
        const chatAreaBgImageURL = document.getElementById('chatAreaBgImageURL').value.trim();
        const chatAreaBgSize = document.getElementById('chatAreaBgSize').value;
        const chatAreaBgRepeat = document.getElementById('chatAreaBgRepeat').value;
        root.setProperty('--chatAreaBackgroundColor', 'transparent');
        root.setProperty('--chatAreaBackgroundImage', chatAreaBgImageURL ? `url("${chatAreaBgImageURL}")` : 'none');
        root.setProperty('--chatAreaBackgroundPosition', 'center');
        root.setProperty('--chatAreaBackgroundRepeat', chatAreaBgRepeat);
        root.setProperty('--chatAreaBackgroundSize', chatAreaBgSize);
    }

    // Message Settings
    const messageTextSize = document.getElementById('messageTextSize').value + 'px';
    const messageCornerStyle = document.getElementById('messageCornerStyle').value;
    const botMessageTextColor = document.getElementById('botMessageTextColor').value;
    const botMessageBg = document.getElementById('botMessageBg').value;
    const userMessageTextColor = document.getElementById('userMessageTextColor').value;
    const userMessageBg = document.getElementById('userMessageBg').value;

    root.setProperty('--messageTextSize', messageTextSize);
    root.setProperty('--messageCornerStyle', messageCornerStyle);
    root.setProperty('--botMessageTextColor', botMessageTextColor);
    root.setProperty('--botMessageBg', botMessageBg);
    root.setProperty('--userMessageTextColor', userMessageTextColor);
    root.setProperty('--userMessageBg', userMessageBg);

    // Font Settings
    const fontFamily = document.getElementById('fontFamily').value;
    root.setProperty('--fontFamily', fontFamily);

    // Avatar Settings
    const showAvatar = document.getElementById('showAvatar').checked;
    root.setProperty('--avatarDisplay', showAvatar ? 'inline-block' : 'none');

    const avatarSize = document.getElementById('avatarSize').value + 'px';
    const avatarBorderColor = document.getElementById('avatarBorderColor').value;
    const avatarBorder = document.getElementById('avatarBorder').value;
    const avatarImageURL = document.getElementById('avatarImageURL').value.trim();

    root.setProperty('--avatarSize', avatarSize);
    root.setProperty('--avatarBorderColor', avatarBorderColor);

    // Handle avatar border options
    if (avatarBorder === 'circle') {
        root.setProperty('--avatarShape', '50%');
        root.setProperty('--avatarBorderWidth', '2px');
    } else if (avatarBorder === 'square') {
        root.setProperty('--avatarShape', '0%');
        root.setProperty('--avatarBorderWidth', '2px');
    } else if (avatarBorder === 'none') {
        root.setProperty('--avatarShape', '0%');
        root.setProperty('--avatarBorderWidth', '0px');
    }

    root.setProperty('--avatarImageURL', avatarImageURL ? `url("${avatarImageURL}")` : 'none');

    // Update Avatar Image Elements
    const avatarImages = document.querySelectorAll('.chat-area .avatar');
    avatarImages.forEach(avatarImg => {
        if (showAvatar && avatarImageURL) {
            avatarImg.src = avatarImageURL;
            avatarImg.style.display = 'block';
            avatarImg.style.width = avatarSize;
            avatarImg.style.height = avatarSize;
        } else {
            avatarImg.style.display = 'none';
        }
    });

    // Icon Settings
    const showIcons = document.getElementById('showIcons').checked;
    root.setProperty('--iconsDisplay', showIcons ? 'flex' : 'none');

    // Chat Input Settings
    const chatInputBackgroundType = document.getElementById('chatInputBackgroundType').value;
    if (chatInputBackgroundType === 'solid') {
        const chatInputBgSolid = document.getElementById('chatInputBgSolid').value;
        root.setProperty('--chatInputBackground', chatInputBgSolid);
    } else if (chatInputBackgroundType === 'gradient') {
        const chatInputBgGradientStart = document.getElementById('chatInputBgGradientStart').value;
        const chatInputBgGradientEnd = document.getElementById('chatInputBgGradientEnd').value;
        const chatInputBgGradientDirection = document.getElementById('chatInputBgGradientDirection').value;
        const gradient = `linear-gradient(${chatInputBgGradientDirection}, ${chatInputBgGradientStart}, ${chatInputBgGradientEnd})`;
        root.setProperty('--chatInputBackground', gradient);
    }

    const chatInputTextFieldBg = document.getElementById('chatInputTextFieldBg').value;
    const chatInputTextFieldTextColor = document.getElementById('chatInputTextFieldTextColor').value;
    const chatInputCornerStyle = document.getElementById('chatInputCornerStyle').value;

    root.setProperty('--chatInputTextFieldBg', chatInputTextFieldBg);
    root.setProperty('--chatInputTextFieldTextColor', chatInputTextFieldTextColor);
    root.setProperty('--chatInputBorderRadius', chatInputCornerStyle);

    // Footer Settings
    const showFooter = document.getElementById('showFooter').checked;
    root.setProperty('--footerDisplay', showFooter ? 'block' : 'none');

    const footerText = document.getElementById('footerText').value.trim();
    const footerTextColor = document.getElementById('footerTextColor').value;
    const footerBackgroundType = document.getElementById('footerBackgroundType').value;

    root.setProperty('--footerTextColor', footerTextColor);

    let footerBackground = '';
    if (footerBackgroundType === 'solid') {
        const footerBgSolid = document.getElementById('footerBgSolid').value;
        footerBackground = footerBgSolid;
    } else if (footerBackgroundType === 'gradient') {
        const footerBgGradientStart = document.getElementById('footerBgGradientStart').value;
        const footerBgGradientEnd = document.getElementById('footerBgGradientEnd').value;
        const footerBgGradientDirection = document.getElementById('footerBgGradientDirection').value;
        footerBackground = `linear-gradient(${footerBgGradientDirection}, ${footerBgGradientStart}, ${footerBgGradientEnd})`;
    }
    root.setProperty('--footerBackground', footerBackground);

    // Update footer text in preview
    const chatFooter = document.querySelector('.chat-footer');
    if (chatFooter) {
        chatFooter.textContent = footerText;
    } else {
        console.error('.chat-footer element not found.');
    }

    // Generate CSS
    generateCSS();

    // Save settings after updating
    saveSettings();
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
        document.getElementById('footerBackgroundType').dispatchEvent(new Event('change'));
        document.getElementById('headerLogoURL').dispatchEvent(new Event('input'));
        document.getElementById('headerLogoAlignment').dispatchEvent(new Event('change'));
        document.getElementById('avatarImageURL').dispatchEvent(new Event('input'));
        document.getElementById('showAvatar').dispatchEvent(new Event('change'));
        document.getElementById('avatarBorder').dispatchEvent(new Event('change'));
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
    if (!cssOutput) {
        console.error('cssOutput textarea not found.');
        return;
    }
    const cssText = cssOutput.value;

    navigator.clipboard.writeText(cssText).then(function() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            setTimeout(() => { successMessage.style.display = 'none'; }, 2000);
        } else {
            console.warn('successMessage element not found.');
        }
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Event Listeners for all inputs, selects, and textareas with debounce
document.querySelectorAll('input, select, textarea').forEach(input => {
    const debouncedUpdate = debounce(updatePreview, 300);
    input.addEventListener('input', debouncedUpdate);
    input.addEventListener('change', debouncedUpdate);
});

// Toggle Header Background Options
document.getElementById('headerBackgroundType').addEventListener('change', function() {
    const type = this.value;
    const solidGroup = document.getElementById('headerSolidColorGroup');
    const gradientGroup = document.getElementById('headerGradientGroup');

    if (type === 'solid') {
        solidGroup.style.display = 'block';
        gradientGroup.style.display = 'none';
    } else if (type === 'gradient') {
        solidGroup.style.display = 'none';
        gradientGroup.style.display = 'block';
    }
    updatePreview();
});

// Toggle Chat Area Background Options
document.getElementById('chatAreaBackgroundType').addEventListener('change', function() {
    const type = this.value;
    const solidGroup = document.getElementById('chatAreaSolidColorGroup');
    const gradientGroup = document.getElementById('chatAreaGradientGroup');
    const imageGroup = document.getElementById('chatAreaImageGroup');

    if (type === 'solid') {
        solidGroup.style.display = 'block';
        gradientGroup.style.display = 'none';
        imageGroup.style.display = 'none';
    } else if (type === 'gradient') {
        solidGroup.style.display = 'none';
        gradientGroup.style.display = 'block';
        imageGroup.style.display = 'none';
    } else if (type === 'image') {
        solidGroup.style.display = 'none';
        gradientGroup.style.display = 'none';
        imageGroup.style.display = 'block';
    }
    updatePreview();
});

// Toggle Chat Input Background Options
document.getElementById('chatInputBackgroundType').addEventListener('change', function() {
    const type = this.value;
    const solidGroup = document.getElementById('chatInputSolidColorGroup');
    const gradientGroup = document.getElementById('chatInputGradientGroup');

    if (type === 'solid') {
        solidGroup.style.display = 'block';
        gradientGroup.style.display = 'none';
    } else if (type === 'gradient') {
        solidGroup.style.display = 'none';
        gradientGroup.style.display = 'block';
    }
    updatePreview();
});

// Toggle Footer Background Options
document.getElementById('footerBackgroundType').addEventListener('change', function() {
    const type = this.value;
    const solidGroup = document.getElementById('footerSolidColorGroup');
    const gradientGroup = document.getElementById('footerGradientGroup');

    if (type === 'solid') {
        solidGroup.style.display = 'block';
        gradientGroup.style.display = 'none';
    } else if (type === 'gradient') {
        solidGroup.style.display = 'none';
        gradientGroup.style.display = 'block';
    }
    updatePreview();
});

// Toggle Logo Size and Position Groups
document.getElementById('headerLogoURL').addEventListener('input', function() {
    const logoURL = this.value.trim();
    const logoSizeGroup = document.getElementById('headerLogoSizeGroup');
    const logoPositionGroup = document.getElementById('headerLogoPositionGroup');

    if (logoURL) {
        logoSizeGroup.style.display = 'block';
        logoPositionGroup.style.display = 'block';
    } else {
        logoSizeGroup.style.display = 'none';
        logoPositionGroup.style.display = 'none';
    }
    updatePreview();
});

// Toggle Avatar Size and Border Color Groups
document.getElementById('showAvatar').addEventListener('change', function() {
    const show = this.checked;
    const avatarSettings = document.querySelectorAll('#avatarSize, #avatarBorderColor, #avatarBorder, #avatarImageURL');
    avatarSettings.forEach(setting => {
        setting.parentElement.style.display = show ? 'block' : 'none';
    });
    updatePreview();
});

// Toggle Avatar Border Options
document.getElementById('avatarBorder').addEventListener('change', function() {
    updatePreview();
});

// Toggle Avatar Image URL Group
document.getElementById('avatarImageURL').addEventListener('input', function() {
    const avatarURL = this.value.trim();
    // If there are specific groups to toggle based on avatar URL, handle them here
    // For now, we assume all avatar settings are visible when avatar is shown
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
