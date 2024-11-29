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
        '--avatarDisplay', '--otherMessagePaddingLeft',
        '--footerDisplay', '--footerText', '--footerTextColor', '--footerBackground'
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

    /* Footer Styling */
    css += `/* Footer Styling */\n.chat-footer {\n    display: var(--footerDisplay);\n    padding: 10px;\n    background: var(--footerBackground);\n    text-align: center;\n    font-size: 14px;\n    color: var(--footerTextColor);\n    font-family: var(--fontFamily);\n}\n.chat-footer:before {\n    content: var(--footerText);\n}\n`;

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

    // Footer Settings
    const showFooter = document.getElementById('showFooter').checked;
    root.setProperty('--footerDisplay', showFooter ? 'block' : 'none');

    const footerText = document.getElementById('footerText').value;
    const footerTextColor = document.getElementById('footerTextColor').value;
    const footerBackgroundType = document.getElementById('footerBackgroundType').value;

    root.setProperty('--footerText', `"${footerText}"`);
    root.setProperty('--footerTextColor', footerTextColor);

    let footerBackground = '';
    if (footerBackgroundType === 'solid') {
        const footerBgSolid = document.getElementById('footerBgSolid').value;
        footerBackground = footerBgSolid;
    } else {
        const footerBgGradientStart = document.getElementById('footerBgGradientStart').value;
        const footerBgGradientEnd = document.getElementById('footerBgGradientEnd').value;
        const footerBgGradientDirection = document.getElementById('footerBgGradientDirection').value;
        footerBackground = `linear-gradient(${footerBgGradientDirection}, ${footerBgGradientStart}, ${footerBgGradientEnd})`;
    }
    root.setProperty('--footerBackground', footerBackground);

    // Update footer text in preview
    // Since we are using CSS ::before pseudo-element, no need to set text content
    // document.querySelector('.chat-footer').textContent = footerText;

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

// Toggle Footer Background Options
document.getElementById('footerBackgroundType').addEventListener('change', function() {
    const type = this.value;
    if (type === 'solid') {
        document.getElementById('footerSolidColorGroup').style.display = 'block';
        document.getElementById('footerGradientGroup').style.display = 'none';
    } else {
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
