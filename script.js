// Function to generate CSS based on current settings
function generateCSS() {
    const rootStyle = getComputedStyle(document.documentElement);
    let css = `/* Root Variables */\n:root {\n`;

    // Collect only the variables that are used
    const variableNames = [
        '--primaryColor', '--secondaryColor',
        '--fontFamily',
        '--headerTextSize', '--headerTextColor', '--headerBackgroundLayers', '--headerHeight', '--headerTextAlign', '--cornerStyle',
        '--chatAreaBackgroundColor', '--chatAreaBackgroundImage', '--chatAreaBackgroundPosition', '--chatAreaBackgroundRepeat', '--chatAreaBackgroundSize',
        '--messageTextSize', '--messageCornerStyle', '--botMessageTextColor', '--botMessageBg', '--userMessageTextColor', '--userMessageBg',
        '--chatInputBackground', '--chatInputTextFieldBg', '--chatInputTextFieldTextColor', '--chatInputBorderRadius',
        '--iconsDisplay',
        '--avatarDisplay', '--avatarSize', '--avatarBorderColor', '--avatarShape', '--avatarImageURL', '--otherMessagePaddingLeft',
        '--footerDisplay', '--footerTextColor', '--footerBackground'
    ];

    variableNames.forEach(name => {
        const value = rootStyle.getPropertyValue(name).trim();
        css += `    ${name}: ${value};\n`;
    });
    css += `}\n\n`;

    // Include necessary CSS selectors in the expected format
    css += `pre {\n    font-size: var(--messageTextSize);\n    font-weight: normal;\n    font-family: var(--fontFamily);\n}\n\n`;

    /* Chat Header Styling */
    css += `/* Chat Header Styling */\n.chat-header {\n    font-size: var(--headerTextSize);\n    color: var(--headerTextColor);\n    background: var(--headerBackgroundLayers);\n    height: var(--headerHeight);\n    text-align: var(--headerTextAlign);\n    display: flex;\n    align-items: center;\n    justify-content: var(--headerTextAlign);\n    font-family: var(--fontFamily);\n    border-top-left-radius: var(--cornerStyle);\n    border-top-right-radius: var(--cornerStyle);\n}\n\n`;

    /* Chat Area Styling */
    css += `/* Chat Area Styling */\n.chat-area {\n    background-color: var(--chatAreaBackgroundColor);\n    background-image: var(--chatAreaBackgroundImage);\n    background-position: var(--chatAreaBackgroundPosition);\n    background-repeat: var(--chatAreaBackgroundRepeat);\n    background-size: var(--chatAreaBackgroundSize);\n    font-family: var(--fontFamily);\n}\n\n`;

    /* Bot Message Styling */
    css += `/* Bot Message Styling */\n.other-message {\n    position: relative;\n    margin-bottom: 15px;\n    padding-left: var(--otherMessagePaddingLeft);\n}\n.other-message .message-text {\n    background-color: var(--botMessageBg);\n    color: var(--botMessageTextColor);\n    font-size: var(--messageTextSize);\n    border-radius: var(--messageCornerStyle);\n    padding: 10px 15px;\n    word-wrap: break-word;\n    font-family: var(--fontFamily);\n    margin-bottom: 5px;\n}\n\n`;

    /* User Message Styling */
    css += `/* User Message Styling */\n.my-message {\n    padding-right: 0;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.my-message .message-text {\n    background-color: var(--userMessageBg);\n    color: var(--userMessageTextColor);\n    font-size: var(--messageTextSize);\n    border-radius: var(--messageCornerStyle);\n    padding: 10px 15px;\n    word-wrap: break-word;\n    font-family: var(--fontFamily);\n    margin-bottom: 5px;\n}\n\n`;

    /* Message Text Inheritance */
    css += `/* Message Text Inheritance */\n.message-text * {\n    color: inherit;\n    font-family: inherit;\n}\n\n`;

    /* Chat Input Styling */
    css += `/* Chat Input Styling */\n.chat-input {\n    padding: 20px;\n    background: var(--chatInputBackground);\n    display: flex;\n    align-items: center;\n    width: 100%;\n    box-sizing: border-box;\n    font-family: var(--fontFamily);\n}\n.chat-input .input-group {\n    flex: 1;\n    border-radius: var(--chatInputBorderRadius) !important;\n    background-color: var(--chatInputTextFieldBg) !important;\n    overflow: hidden;\n    position: relative;\n}\n.chat-input input {\n    width: 100%;\n    padding: 15px;\n    border: none;\n    background-color: var(--chatInputTextFieldBg);\n    color: var(--chatInputTextFieldTextColor);\n    font-size: 14px;\n    outline: none;\n    box-sizing: border-box;\n}\n\n`;

    /* Avatar Styling */
    css += `/* Avatar Styling */\n.avatar {\n    display: var(--avatarDisplay);\n    width: var(--avatarSize);\n    height: var(--avatarSize);\n    border: 2px solid var(--avatarBorderColor);\n    border-radius: var(--avatarShape);\n    background-image: url(var(--avatarImageURL));\n    background-size: cover;\n    background-position: center;\n}\n\n`;

    /* Icons Styling */
    css += `/* Icons Styling */\n.icons {\n    display: var(--iconsDisplay);\n}\n\n`;

    /* Footer Styling */
    css += `/* Footer Styling */\n.chat-footer {\n    display: var(--footerDisplay);\n    padding: 10px;\n    background: var(--footerBackground);\n    text-align: center;\n    font-size: 14px;\n    color: var(--footerTextColor);\n    font-family: var(--fontFamily);\n}\n`;

    // Update the generated CSS textarea
    document.getElementById('cssOutput').value = css.trim();
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
    const headerLogoURL = document.getElementById('headerLogoURL').value;
    const headerLogoWidth = document.getElementById('headerLogoWidth').value + 'px';
    const headerLogoAlignment = document.getElementById('headerLogoAlignment').value;
    const headerLogoOffsetX = document.getElementById('headerLogoOffsetX').value + 'px';
    const headerLogoOffsetY = document.getElementById('headerLogoOffsetY').value + 'px';

    root.setProperty('--headerLogoURL', headerLogoURL || 'none');
    root.setProperty('--headerLogoWidth', headerLogoWidth);
    root.setProperty('--headerLogoAlignment', headerLogoAlignment);
    root.setProperty('--headerLogoOffsetX', headerLogoOffsetX);
    root.setProperty('--headerLogoOffsetY', headerLogoOffsetY);

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
        const chatAreaBgImageURL = document.getElementById('chatAreaBgImageURL').value;
        const chatAreaBgSize = document.getElementById('chatAreaBgSize').value;
        const chatAreaBgRepeat = document.getElementById('chatAreaBgRepeat').value;
        root.setProperty('--chatAreaBackgroundColor', 'transparent');
        root.setProperty('--chatAreaBackgroundImage', `url(${chatAreaBgImageURL})`);
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
    root.setProperty('--avatarDisplay', showAvatar ? 'block' : 'none');

    const avatarSize = document.getElementById('avatarSize').value + 'px';
    const avatarBorderColor = document.getElementById('avatarBorderColor').value;
    const avatarShape = document.getElementById('avatarShape').value;
    const avatarImageURL = document.getElementById('avatarImageURL').value || 'none';

    root.setProperty('--avatarSize', avatarSize);
    root.setProperty('--avatarBorderColor', avatarBorderColor);
    root.setProperty('--avatarShape', avatarShape);
    root.setProperty('--avatarImageURL', avatarImageURL);

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

    const footerText = document.getElementById('footerText').value;
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
    document.querySelector('.chat-footer').textContent = footerText;

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

// Event Listeners for all inputs, selects, and textareas
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
    } else if (type === 'gradient') {
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
    } else if (type === 'gradient') {
        document.getElementById('chatInputSolidColorGroup').style.display = 'none';
        document.getElementById('chatInputGradientGroup').style.display = 'block';
    }
    updatePreview();
});

// Toggle Footer Background Options
document.getElementById('footerBackgroundType').addEventListener('change', function() {
    const type = this.value;
    if (type === 'solid') {
        document.getElementById('footerSolidColorGroup').style.display = 'block';
        document.getElementById('footerGradientGroup').style.display = 'none';
    } else if (type === 'gradient') {
        document.getElementById('footerSolidColorGroup').style.display = 'none';
        document.getElementById('footerGradientGroup').style.display = 'block';
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
