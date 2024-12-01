// Utility Functions
const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Settings Manager Class
class SettingsManager {
    static defaultSettings = {
        // Header Settings
        headerTextSize: '18',
        headerTextColor: '#ffffff',
        headerBackgroundType: 'solid',
        headerBgSolid: '#36d6b5',
        headerBgGradientStart: '#36d6b5',
        headerBgGradientEnd: '#1abc9c',
        headerBgGradientDirection: 'to right',
        headerHeight: '60',
        headerTextAlign: 'center',
        headerLogoURL: '',
        headerLogoWidth: '40',
        headerLogoAlignment: 'left',
        headerLogoOffsetX: '0',
        headerLogoOffsetY: '0',

        // Chat Area Settings
        chatAreaBackgroundType: 'solid',
        chatAreaBgSolid: '#f8f9fa',
        chatAreaBgGradientStart: '#f8f9fa',
        chatAreaBgGradientEnd: '#e0e0e0',
        chatAreaBgGradientDirection: 'to right',
        chatAreaBgImageURL: '',
        chatAreaBgRepeat: 'repeat',

        // Message Settings
        messageTextSize: '14',
        messageCornerStyle: '20px',
        botMessageTextColor: '#212529',
        botMessageBg: '#eeeeee',
        userMessageTextColor: '#ffffff',
        userMessageBg: '#36d6b5',

        // Font Settings
        fontFamily: 'Helvetica, Arial, sans-serif',
        cornerStyle: '20',

        // Avatar Settings
        showAvatar: true,
        avatarSize: '50',
        avatarBorderColor: '#36d6b5',
        avatarBorder: 'circle',
        avatarImageURL: 'https://via.placeholder.com/50',

        // Icon Settings
        showIcons: true,

        // Chat Input Settings
        chatInputBackgroundType: 'solid',
        chatInputBgSolid: '#ffffff',
        chatInputBgGradientStart: '#ffffff',
        chatInputBgGradientEnd: '#f1f1f1',
        chatInputTextFieldBg: '#f1f1f1',
        chatInputTextFieldTextColor: '#333333',
        chatInputCornerStyle: '18px',

        // Footer Settings
        showFooter: true,
        footerText: 'Powered by Chatbot Builder AI',
        footerTextColor: '#531ccf',
        footerBackgroundType: 'solid',
        footerBgSolid: '#ffffff',
        footerBgGradientStart: '#ffffff',
        footerBgGradientEnd: '#f1f1f1',
        footerBgGradientDirection: 'to right'
    };

    static saveSettings() {
        try {
            const settings = {};
            document.querySelectorAll('.controls input, .controls select, .controls textarea').forEach(input => {
                if (input.type === 'checkbox') {
                    settings[input.id] = input.checked;
                } else {
                    settings[input.id] = input.value;
                }
            });
            localStorage.setItem('chatCustomizationSettings', JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Failed to save settings:', error);
            return false;
        }
    }

    static loadSettings() {
        try {
            const savedSettings = localStorage.getItem('chatCustomizationSettings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                document.querySelectorAll('.controls input, .controls select, .controls textarea').forEach(input => {
                    if (input.id in settings) {
                        if (input.type === 'checkbox') {
                            input.checked = settings[input.id];
                        } else {
                            input.value = settings[input.id];
                        }
                        input.dispatchEvent(new Event('input'));
                    }
                });
                return true;
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
            this.resetSettings();
            return false;
        }
    }

    static resetSettings() {
        if (confirm('Are you sure you want to reset to default settings?')) {
            try {
                localStorage.removeItem('chatCustomizationSettings');
                Object.entries(this.defaultSettings).forEach(([id, value]) => {
                    const element = document.getElementById(id);
                    if (element) {
                        if (element.type === 'checkbox') {
                            element.checked = value === 'true' || value === true;
                        } else {
                            element.value = value;
                        }
                        element.dispatchEvent(new Event('input'));
                    }
                });
                return true;
            } catch (error) {
                console.error('Failed to reset settings:', error);
                window.location.reload();
                return false;
            }
        }
        return false;
    }
}

// Style Update Manager Class
class StyleUpdateManager {
    static updateHeaderStyles(root) {
        const headerTextSize = document.getElementById('headerTextSize').value + 'px';
        const headerTextColor = document.getElementById('headerTextColor').value;
        const headerHeight = document.getElementById('headerHeight').value + 'px';
        const headerTextAlign = document.getElementById('headerTextAlign').value;
        const headerBackgroundType = document.getElementById('headerBackgroundType').value;

        root.setProperty('--headerTextSize', headerTextSize);
        root.setProperty('--headerTextColor', headerTextColor);
        root.setProperty('--headerHeight', headerHeight);
        root.setProperty('--headerTextAlign', headerTextAlign);

        // Handle background
        if (headerBackgroundType === 'solid') {
            const headerBgSolid = document.getElementById('headerBgSolid').value;
            root.setProperty('--headerBackgroundLayers', headerBgSolid);
        } else if (headerBackgroundType === 'gradient') {
            const start = document.getElementById('headerBgGradientStart').value;
            const end = document.getElementById('headerBgGradientEnd').value;
            const direction = document.getElementById('headerBgGradientDirection').value;
            root.setProperty('--headerBackgroundLayers', 
                `linear-gradient(${direction}, ${start}, ${end})`);
        }

        // Handle logo
        const headerLogoURL = document.getElementById('headerLogoURL').value.trim();
        const headerLogoImg = document.getElementById('headerLogoImg');
        
        if (headerLogoURL && headerLogoImg) {
            headerLogoImg.src = headerLogoURL;
            headerLogoImg.style.display = 'block';
            
            const logoWidth = document.getElementById('headerLogoWidth').value + 'px';
            const logoAlignment = document.getElementById('headerLogoAlignment').value;
            const offsetX = document.getElementById('headerLogoOffsetX').value + 'px';
            const offsetY = document.getElementById('headerLogoOffsetY').value + 'px';

            root.setProperty('--headerLogoWidth', logoWidth);
            root.setProperty('--headerLogoOffsetX', offsetX);
            root.setProperty('--headerLogoOffsetY', offsetY);

            // Set margins based on alignment
            if (logoAlignment === 'left') {
                root.setProperty('--headerLogoMarginRight', '10px');
                root.setProperty('--headerLogoMarginLeft', '0px');
            } else if (logoAlignment === 'center') {
                root.setProperty('--headerLogoMarginRight', '10px');
                root.setProperty('--headerLogoMarginLeft', '10px');
            } else {
                root.setProperty('--headerLogoMarginRight', '0px');
                root.setProperty('--headerLogoMarginLeft', '10px');
            }
        } else if (headerLogoImg) {
            headerLogoImg.style.display = 'none';
        }
    }

    static updateChatAreaStyles(root) {
        const chatAreaBackgroundType = document.getElementById('chatAreaBackgroundType').value;
        
        if (chatAreaBackgroundType === 'solid') {
            const bgColor = document.getElementById('chatAreaBgSolid').value;
            root.setProperty('--chatAreaBackgroundColor', bgColor);
            root.setProperty('--chatAreaBackgroundImage', 'none');
            root.setProperty('--chatAreaBackgroundPosition', 'initial');
            root.setProperty('--chatAreaBackgroundRepeat', 'initial');
            root.setProperty('--chatAreaBackgroundSize', 'initial');
        } 
        else if (chatAreaBackgroundType === 'gradient') {
            const start = document.getElementById('chatAreaBgGradientStart').value;
            const end = document.getElementById('chatAreaBgGradientEnd').value;
            const direction = document.getElementById('chatAreaBgGradientDirection').value;
            const gradient = `linear-gradient(${direction}, ${start}, ${end})`;
            
            root.setProperty('--chatAreaBackgroundColor', 'transparent');
            root.setProperty('--chatAreaBackgroundImage', gradient);
            root.setProperty('--chatAreaBackgroundPosition', 'initial');
            root.setProperty('--chatAreaBackgroundRepeat', 'initial');
            root.setProperty('--chatAreaBackgroundSize', 'initial');
        }
        else if (chatAreaBackgroundType === 'image') {
            const imageURL = document.getElementById('chatAreaBgImageURL').value.trim();
            const repeat = document.getElementById('chatAreaBgRepeat').value;
            
            root.setProperty('--chatAreaBackgroundColor', 'transparent');
            root.setProperty('--chatAreaBackgroundImage', 
                imageURL ? `url("${imageURL}")` : 'none');
            root.setProperty('--chatAreaBackgroundPosition', 'center');
            root.setProperty('--chatAreaBackgroundRepeat', repeat);
            root.setProperty('--chatAreaBackgroundSize', 'cover');
        }
    }

    static updateMessageStyles(root) {
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
    }

    static updateAvatarStyles(root) {
        const showAvatar = document.getElementById('showAvatar').checked;
        const avatarSize = document.getElementById('avatarSize').value + 'px';
        const avatarBorderColor = document.getElementById('avatarBorderColor').value;
        const avatarBorder = document.getElementById('avatarBorder').value;
        const avatarImageURL = document.getElementById('avatarImageURL').value.trim();

        root.setProperty('--avatarDisplay', showAvatar ? 'inline-block' : 'none');
        root.setProperty('--avatarSize', avatarSize);
        root.setProperty('--avatarBorderColor', avatarBorderColor);
        root.setProperty('--otherMessagePaddingLeft', 
            showAvatar ? `calc(${avatarSize} + 10px)` : '0');

        if (avatarBorder === 'circle') {
            root.setProperty('--avatarShape', '50%');
            root.setProperty('--avatarBorderWidth', '2px');
        } else if (avatarBorder === 'square') {
            root.setProperty('--avatarShape', '0');
            root.setProperty('--avatarBorderWidth', '2px');
        } else {
            root.setProperty('--avatarShape', '0');
            root.setProperty('--avatarBorderWidth', '0');
        }

        root.setProperty('--avatarImageURL', 
            avatarImageURL ? `url("${avatarImageURL}")` : 'none');

        // Update avatar images in preview
        document.querySelectorAll('.avatar').forEach(avatar => {
            if (showAvatar && avatarImageURL) {
                avatar.src = avatarImageURL;
                avatar.style.display = 'block';
            } else {
                avatar.style.display = 'none';
            }
        });
    }

    static updateInputStyles(root) {
        const chatInputBackgroundType = document.getElementById('chatInputBackgroundType').value;
        
        if (chatInputBackgroundType === 'solid') {
            const bgColor = document.getElementById('chatInputBgSolid').value;
            root.setProperty('--chatInputBackground', bgColor);
        } else if (chatInputBackgroundType === 'gradient') {
            const start = document.getElementById('chatInputBgGradientStart').value;
            const end = document.getElementById('chatInputBgGradientEnd').value;
            const direction = document.getElementById('chatInputBgGradientDirection').value;
            root.setProperty('--chatInputBackground', 
                `linear-gradient(${direction}, ${start}, ${end})`);
        }

        const textFieldBg = document.getElementById('chatInputTextFieldBg').value;
        const textFieldColor = document.getElementById('chatInputTextFieldTextColor').value;
        const cornerStyle = document.getElementById('chatInputCornerStyle').value;

        root.setProperty('--chatInputTextFieldBg', textFieldBg);
        root.setProperty('--chatInputTextFieldTextColor', textFieldColor);
        root.setProperty('--chatInputBorderRadius', cornerStyle);

        // Update icon display
        const showIcons = document.getElementById('showIcons').checked;
        root.setProperty('--iconsDisplay', showIcons ? 'flex' : 'none');
    }

    static updateFooterStyles(root) {
        const showFooter = document.getElementById('showFooter').checked;
        const footerText = document.getElementById('footerText').value.trim();
        const footerTextColor = document.getElementById('footerTextColor').value;
        const footerBackgroundType = document.getElementById('footerBackgroundType').value;

        root.setProperty('--footerDisplay', showFooter ? 'block' : 'none');
        root.setProperty('--footerTextColor', footerTextColor);

        if (footerBackgroundType === 'solid') {
            const bgColor = document.getElementById('footerBgSolid').value;
            root.setProperty('--footerBackground', bgColor);
        } else if (footerBackgroundType === 'gradient') {
            const start = document.getElementById('footerBgGradientStart').value;
            const end = document.getElementById('footerBgGradientEnd').value;
            const direction = document.getElementById('footerBgGradientDirection').value;
            rootroot.setProperty('--footerBackground', 
                `linear-gradient(${direction}, ${start}, ${end})`);
        }

        // Update footer text in preview
        const footerElement = document.querySelector('.chat-footer');
        if (footerElement) {
            footerElement.textContent = footerText;
        }
    }

    static updateFontStyles(root) {
        const fontFamily = document.getElementById('fontFamily').value;
        const cornerStyle = document.getElementById('cornerStyle').value + 'px';
        
        root.setProperty('--fontFamily', fontFamily);
        root.setProperty('--cornerStyle', cornerStyle);
    }
}

// CSS Generator Class
class CSSGenerator {
    static generateCSS() {
        const root = document.documentElement;
        let css = '/* Root Variables */\n:root {\n';

        // CSS Variables Definition
        const variables = [
            '--primaryColor', '--secondaryColor',
            '--fontFamily', '--fontWeight',
            '--headerTextSize', '--headerTextColor', '--headerBackgroundLayers',
            '--headerHeight', '--headerTextAlign', '--cornerStyle',
            '--headerLogoWidth', '--headerLogoMarginRight', '--headerLogoMarginLeft',
            '--headerLogoOffsetX', '--headerLogoOffsetY',
            '--chatAreaBackgroundColor', '--chatAreaBackgroundImage',
            '--chatAreaBackgroundPosition', '--chatAreaBackgroundRepeat',
            '--chatAreaBackgroundSize', '--messageTextSize', '--messageCornerStyle',
            '--botMessageTextColor', '--botMessageBg', '--userMessageTextColor',
            '--userMessageBg', '--avatarSize', '--avatarBorderColor',
            '--avatarBorderWidth', '--avatarShape', '--avatarImageURL',
            '--avatarDisplay', '--otherMessagePaddingLeft', '--chatInputBackground',
            '--chatInputTextFieldBg', '--chatInputTextFieldTextColor',
            '--chatInputBorderRadius', '--chatInputHeight', '--iconsDisplay',
            '--footerDisplay', '--footerTextColor', '--footerBackground'
        ];

        // Add variables to CSS
        variables.forEach(name => {
            const value = root.style.getPropertyValue(name).trim();
            if (value) {
                css += `    ${name}: ${value};\n`;
            }
        });
        css += '}\n\n';

        // Add component styles
        css += this.generateComponentStyles();

        // Update textarea
        const cssOutput = document.getElementById('cssOutput');
        if (cssOutput) {
            cssOutput.value = css.trim();
        }
    }

    static generateComponentStyles() {
        return `
/* Chat Header */
.chat-header {
    font-size: var(--headerTextSize);
    color: var(--headerTextColor);
    background: var(--headerBackgroundLayers);
    height: var(--headerHeight);
    text-align: var(--headerTextAlign);
}

/* Chat Area */
.chat-area {
    background-color: var(--chatAreaBackgroundColor);
    background-image: var(--chatAreaBackgroundImage);
    background-position: var(--chatAreaBackgroundPosition);
    background-repeat: var(--chatAreaBackgroundRepeat);
    background-size: var(--chatAreaBackgroundSize);
}

/* Messages */
.message-text {
    font-size: var(--messageTextSize);
    border-radius: var(--messageCornerStyle);
    font-family: var(--fontFamily);
}

.other-message {
    padding-left: var(--otherMessagePaddingLeft);
}

.other-message .message-text {
    background-color: var(--botMessageBg);
    color: var(--botMessageTextColor);
}

.my-message .message-text {
    background-color: var(--userMessageBg);
    color: var(--userMessageTextColor);
}

/* Avatar */
.avatar {
    display: var(--avatarDisplay);
    width: var(--avatarSize);
    height: var(--avatarSize);
    border: var(--avatarBorderWidth) solid var(--avatarBorderColor);
    border-radius: var(--avatarShape);
}

/* Chat Input */
.chat-input {
    background: var(--chatInputBackground);
}

.chat-input .input-group {
    background-color: var(--chatInputTextFieldBg);
    border-radius: var(--chatInputBorderRadius);
}

.chat-input input {
    color: var(--chatInputTextFieldTextColor);
}

.chat-input .icons {
    display: var(--iconsDisplay);
}

/* Footer */
.chat-footer {
    display: var(--footerDisplay);
    color: var(--footerTextColor);
    background: var(--footerBackground);
}`;
    }

    static copyCSS() {
        const cssOutput = document.getElementById('cssOutput');
        if (!cssOutput) return;

        navigator.clipboard.writeText(cssOutput.value)
            .then(() => {
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 2000);
                }
            })
            .catch(err => {
                console.error('Failed to copy CSS:', err);
                alert('Failed to copy CSS to clipboard');
            });
    }
}

// UI Controller Class
class UIController {
    static initializeEventListeners() {
        // Debounced update function
        const debouncedUpdate = debounce(() => {
            this.updatePreview();
            SettingsManager.saveSettings();
        });

        // Add event listeners to all inputs
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', debouncedUpdate);
            input.addEventListener('change', debouncedUpdate);
        });

        // Initialize background type toggles
        this.initializeBackgroundToggles();
        
        // Initialize section toggles
        this.initializeSectionToggles();
        
        // Initialize special controls
        this.initializeSpecialControls();
    }

    static initializeBackgroundToggles() {
        const backgroundTypes = {
            header: ['Solid', 'Gradient'],
            chatArea: ['Solid', 'Gradient', 'Image'],
            chatInput: ['Solid', 'Gradient'],
            footer: ['Solid', 'Gradient']
        };

        Object.entries(backgroundTypes).forEach(([area, types]) => {
            const select = document.getElementById(`${area}BackgroundType`);
            if (!select) return;

            select.addEventListener('change', () => {
                types.forEach(type => {
                    const group = document.getElementById(`${area}${type}Group`);
                    if (group) {
                        group.style.display = 
                            select.value === type.toLowerCase() ? 'block' : 'none';
                    }
                });
                this.updatePreview();
            });
        });
    }

    static initializeSectionToggles() {
        document.querySelectorAll('.section-title').forEach(title => {
            title.addEventListener('click', () => {
                const section = title.parentElement;
                const content = section.querySelector('.section-content');
                const toggleIcon = title.querySelector('.toggle-icon');
                const isOpen = section.classList.contains('open');

                // Close other sections
                document.querySelectorAll('.section.open').forEach(openSection => {
                    if (openSection !== section) {
                        openSection.classList.remove('open');
                        openSection.querySelector('.toggle-icon').textContent = '+';
                        openSection.querySelector('.section-content').style.display = 'none';
                    }
                });

                // Toggle current section
                section.classList.toggle('open');
                toggleIcon.textContent = isOpen ? '+' : '-';
                content.style.display = isOpen ? 'none' : 'block';
            });
        });
    }

    static initializeSpecialControls() {
        // Logo URL handling
        const logoURL = document.getElementById('headerLogoURL');
        if (logoURL) {
            logoURL.addEventListener('input', () => {
                const hasURL = logoURL.value.trim() !== '';
                ['headerLogoSizeGroup', 'headerLogoPositionGroup'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.style.display = hasURL ? 'block' : 'none';
                    }
                });
                this.updatePreview();
            });
        }

        // Avatar settings handling
        const showAvatar = document.getElementById('showAvatar');
        if (showAvatar) {
            showAvatar.addEventListener('change', () => {
                const show = showAvatar.checked;
                ['avatarSize', 'avatarBorderColor', 'avatarBorder', 'avatarImageURL'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.parentElement.style.display = show ? 'block' : 'none';
                    }
                });
                this.updatePreview();
            });
        }
    }

    static updatePreview() {
        const root = document.documentElement.style;

        // Update all styles
        StyleUpdateManager.updateHeaderStyles(root);
        StyleUpdateManager.updateChatAreaStyles(root);
        StyleUpdateManager.updateMessageStyles(root);
        StyleUpdateManager.updateAvatarStyles(root);
        StyleUpdateManager.updateInputStyles(root);
        StyleUpdateManager.updateFooterStyles(root);
        StyleUpdateManager.updateFontStyles(root);

        // Generate updated CSS
        CSSGenerator.generateCSS();
    }
}

// Initialize application
window.addEventListener('load', () => {
    UIController.initializeEventListeners();
    SettingsManager.loadSettings();
    UIController.updatePreview();
});

// Global function bindings
window.copyCSS = () => CSSGenerator.copyCSS();
window.resetSettings = () => SettingsManager.resetSettings();
