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

    /* Footer Styling */
    css += `/* Footer Styling */\n.chat-footer {\n    display: var(--footerDisplay);\n    padding: 10px;\n    background: var(--footerBackground);\n    text-align: center;\n    font-size: 14px;\n    color: var(--footerTextColor);\n    font-family: var(--fontFamily);\n}\n`;

    // Update the generated CSS textarea
    document.getElementById('cssOutput').value = css.trim();
}

// Function to update the preview based on control inputs
function updatePreview() {
    const root = document.documentElement.style;

    // Existing code for header, chat area, messages, avatar, icons, chat input

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
    } else {
        const footerBgGradientStart = document.getElementById('footerBgGradientStart').value;
        const footerBgGradientEnd = document.getElementById('footerBgGradientEnd').value;
        const footerBgGradientDirection = document.getElementById('footerBgGradientDirection').value;
        footerBackground = `linear-gradient(${footerBgGradientDirection}, ${footerBgGradientStart}, ${footerBgGradientEnd})`;
    }
    root.setProperty('--footerBackground', footerBackground);

    // Update footer text in preview
    document.querySelector('.chat-footer').textContent = footerText;

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
