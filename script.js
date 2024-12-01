// Utility Functions
const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Settings Management
class SettingsManager {
    static defaultSettings = {
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
        chatAreaBackgroundType: 'solid',
        chatAreaBgSolid: '#f8f9fa',
        chatAreaBgGradientStart: '#f8f9fa',
        chatAreaBgGradientEnd: '#e0e0e0',
        chatAreaBgGradientDirection: 'to right',
        chatAreaBgImageURL: '',
        chatAreaBgRepeat: 'repeat',
        messageTextSize: '14',
        messageCornerStyle: '20px',
        botMessageTextColor: '#212529',
        botMessageBg: '#eeeeee',
        userMessageTextColor: '#ffffff',
        userMessageBg: '#36d6b5',
        fontFamily: 'Helvetica, Arial, sans-serif',
        cornerStyle: '20',
        showAvatar: true,
        avatarSize: '50',
        avatarBorderColor: '#36d6b5',
        avatarBorder: 'circle',
        avatarImageURL: 'https://via.placeholder.com/50',
        showIcons: true,
        chatInputBackgroundType: 'solid',
        chatInputBgSolid: '#ffffff',
        chatInputBgGradientStart: '#ffffff',
        chatInputBgGradientEnd: '#f1f1f1',
        chatInputTextFieldBg: '#f1f1f1',
        chatInputTextFieldTextColor: '#333333',
        chatInputCornerStyle: '18px',
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
        const settings = {};
        document.querySelectorAll('.controls input, .controls select, .controls textarea').forEach(input => {
            if (input.type === 'checkbox') {
                settings[input.id] = input.checked;
            } else {
                settings[input.id] = input.value;
            }
        });
        try {
            localStorage.setItem('chatCustomizationSettings', JSON.stringify(settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
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
                        // Trigger change event
                        input.dispatchEvent(new Event('input'));
                    }
                });
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
            this.resetSettings();
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
                            element.checked = value;
                        } else {
                            element.value = value;
                        }
                        element.dispatchEvent(new Event('input'));
                    }
                });
            } catch (error) {
                console.error('Failed to reset settings:', error);
                window.location.reload();
            }
        }
    }
}

// CSS Generator
class CSSGenerator {
    static generateCSS() {
        const root = document.documentElement;
        let css = '/* Root Variables */\n:root {\n';

        // CSS Variables
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

        variables.forEach(name => {
            const value = root.style.getPropertyValue(name).trim();
            css += `    ${name}: ${value};\n`;
        });
        css += '}\n\n';

        // Add CSS Sections
        css += this.generateStyleSections();

        const cssOutput = document.getElementById('cssOutput');
        if (cssOutput) {
            cssOutput.value = css.trim();
        }
    }

    static generateStyleSections() {
        return `
/* Message Styling */
.message-text {
    font-size: var(--messageTextSize);
    font-family: var(--fontFamily);
}

/* Chat Header */
.chat-header {
    font-size: var(--headerTextSize);
    color: var(--headerTextColor);
    background: var(--headerBackgroundLayers);
    height: var(--headerHeight);
    text-align: var(--headerTextAlign);
    border-radius: var(--cornerStyle) var(--cornerStyle) 0 0;
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
.other-message .message-text {
    background-color: var(--botMessageBg);
    color: var(--botMessageTextColor);
    border-radius: var(--messageCornerStyle);
}

.my-message .message-text {
    background-color: var(--userMessageBg);
    color: var(--userMessageTextColor);
    border-radius: var(--messageCornerStyle);
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
                    setTimeout(() => successMessage.style.display = 'none', 2000);
                }
            })
            .catch(err => console.error('Failed to copy CSS:', err));
    }
}

// UI Controller
class UIController {
    static initializeEventListeners() {
        const debouncedUpdate = debounce(() => {
            this.updatePreview();
            SettingsManager.saveSettings();
        });

        // Input event listeners
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', debouncedUpdate);
            input.addEventListener('change', debouncedUpdate);
        });

        // Background type toggles
        this.initializeBackgroundToggles();
        
        // Section toggles
        this.initializeSectionToggles();
        
        // Logo settings
        this.initializeLogoSettings();
        
        // Avatar settings
        this.initializeAvatarSettings();
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
                        group.style.display = select.value === type.toLowerCase() ? 'block' : 'none';
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

    static initializeLogoSettings() {
        const logoURL = document.getElementById('headerLogoURL');
        if (!logoURL) return;

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

    static initializeAvatarSettings() {
        const showAvatar = document.getElementById('showAvatar');
        if (!showAvatar) return;

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

    static updatePreview() {
        const root = document.documentElement.style;

        // Update all preview elements based on current settings
        this.updateHeaderStyles(root);
        this.updateChatAreaStyles(root);
        this.updateMessageStyles(root);
        this.updateAvatarStyles(root);
        this.updateInputStyles(root);
        this.updateFooterStyles(root);

        // Generate updated CSS
        CSSGenerator.generateCSS();
    }

    // Style update helper methods
    static updateHeaderStyles(root) {
        // Implementation of header style updates
    }

    static updateChatAreaStyles(root) {
        // Implementation of chat area style updates
    }

    static updateMessageStyles(root) {
        // Implementation of message style updates
    }

    static updateAvatarStyles(root) {
        // Implementation of avatar style updates
    }

    static updateInputStyles(root) {
        // Implementation of input style updates
    }

    static updateFooterStyles(root) {
        // Implementation of footer style updates
    }
}

// Initialize the application
window.addEventListener('load', () => {
    UIController.initializeEventListeners();
    SettingsManager.loadSettings();
    UIController.updatePreview();
});

// Global function bindings
window.copyCSS = CSSGenerator.copyCSS;
window.resetSettings = () => SettingsManager.resetSettings();
