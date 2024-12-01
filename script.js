// Function to generate base CSS (called only once on load)
function generateCSS() {
    let css = `:root {
        --primaryColor: #36d6b5;
        --secondaryColor: #ffffff;
        --fontFamily: Helvetica, Arial, sans-serif;
        --fontWeight: bold;
        --cornerStyle: 20px;
        --headerHeight: 60px;
        --chatInputHeight: 80px;
        --messageTextSize: 14px;
        --messageCornerStyle: 20px;
        --botMessageTextColor: #212529;
        --botMessageBg: #eeeeee;
        --userMessageTextColor: #ffffff;
        --userMessageBg: #36d6b5;
        --chatInputBackground: #ffffff;
        --chatInputTextFieldBg: #f1f1f1;
        --chatInputTextFieldTextColor: #333333;
        --chatInputBorderRadius: 18px;
        --avatarSize: 50px;
        --avatarBorderColor: #36d6b5;
        --avatarShape: 50%;
        --otherMessagePaddingLeft: calc(50px + 10px);
        --footerShow: block;
        --footerText: "Powered by Chatbot Builder AI";
        --footerTextColor: #000;
        --footerFontSize: 9px;
        --footerFontFamily: sans-serif;
        --footerFontWeight: normal;
    }`;

    document.getElementById('cssOutput').value = css;
}

// Function to update the preview based on control inputs
function updatePreview() {
    const root = document.documentElement.style;

    // Update styles directly on elements (more reliable than regenerating CSS)
    root.setProperty('--headerTextSize', document.getElementById('headerTextSize').value + 'px');
    root.setProperty('--headerTextColor', document.getElementById('headerTextColor').value);
    root.setProperty('--headerHeight', document.getElementById('headerHeight').value + 'px');
    root.setProperty('--headerTextAlign', document.getElementById('headerTextAlign').value);
    root.setProperty('--cornerStyle', document.getElementById('cornerStyle').value);
    root.setProperty('--fontFamily', document.getElementById('fontFamily').value);
    root.setProperty('--chatAreaBackgroundColor', document.getElementById('chatAreaBgSolid').value);
    root.setProperty('--messageTextSize', document.getElementById('messageTextSize').value + 'px');
    root.setProperty('--messageCornerStyle', document.getElementById('messageCornerStyle').value);
    root.setProperty('--botMessageTextColor', document.getElementById('botMessageTextColor').value);
    root.setProperty('--botMessageBg', document.getElementById('botMessageBg').value);
    root.setProperty('--userMessageTextColor', document.getElementById('userMessageTextColor').value);
    root.setProperty('--userMessageBg', document.getElementById('userMessageBg').value);
    root.setProperty('--chatInputBackground', document.getElementById('chatInputBgSolid').value);
    root.setProperty('--chatInputTextFieldBg', document.getElementById('chatInputTextFieldBg').value);
    root.setProperty('--chatInputTextFieldTextColor', document.getElementById('chatInputTextFieldTextColor').value);
    root.setProperty('--chatInputBorderRadius', document.getElementById('chatInputCornerStyle').value);
    root.setProperty('--avatarSize', document.getElementById('avatarSize').value + 'px');
    root.setProperty('--avatarBorderColor', document.getElementById('avatarBorderColor').value);
    root.setProperty('--avatarShape', document.getElementById('avatarShape').value);
    root.setProperty('--otherMessagePaddingLeft', `calc(${document.getElementById('avatarSize').value}px + 10px)`);
    root.setProperty('--footerShow', document.getElementById('footer-show').checked ? 'block' : 'none');
    root.setProperty('--footerText', `"${document.getElementById('footer-text').value}"`);
    root.setProperty('--footerTextColor', document.getElementById('footer-text-color').value);
    root.setProperty('--footerFontSize', document.getElementById('footer-font-size').value + 'px');
    root.setProperty('--footerFontFamily', document.getElementById('footer-font-family').value);
    root.setProperty('--footerFontWeight', document.getElementById('footer-font-weight').value);
    root.setProperty('--chatInputHeight', document.getElementById('chatInputHeight').value + 'px');

    // Update chat area background (handles solid, gradient, and image)
    const chatArea = document.querySelector('.chat-area');
    const chatAreaBgType = document.getElementById('chatAreaBackgroundType').value;
    if (chatAreaBgType === 'solid') {
        chatArea.style.backgroundImage = 'none';
        chatArea.style.backgroundColor = document.getElementById('chatAreaBgSolid').value;
    } else if (chatAreaBgType === 'gradient') {
        const gradientStart = document.getElementById('chatAreaBgGradientStart').value;
        const gradientEnd = document.getElementById('chatAreaBgGradientEnd').value;
        const direction = document.getElementById('chatAreaBgGradientDirection').value;
        chatArea.style.backgroundImage = `linear-gradient(${direction}, ${gradientStart}, ${gradientEnd})`;
        chatArea.style.backgroundColor = 'transparent';
    } else if (chatAreaBgType === 'image') {
        const imageUrl = document.getElementById('chatAreaBgImageURL').value;
        const bgSize = document.getElementById('chatAreaBgSize').value;
        const bgRepeat = document.getElementById('chatAreaBgRepeat').value;
        chatArea.style.backgroundImage = `url("${imageUrl}")`;
        chatArea.style.backgroundSize = bgSize;
        chatArea.style.backgroundRepeat = bgRepeat;
        chatArea.style.backgroundColor = 'transparent';
    }


    // --- Add/Update Chat Elements to Preview ---
    const chatAreaMessages = document.querySelector('.chat-area');
    chatAreaMessages.innerHTML = ''; // Clear existing messages

    // Add sample messages (these are placeholders, replace with your actual message handling logic)
    const botMessage = document.createElement('div');
    botMessage.classList.add('other-message');
    botMessage.innerHTML = `<div class="message-text">Hello! How can I help you today?</div>`;
    chatAreaMessages.appendChild(botMessage);

    const userMessage = document.createElement('div');
    userMessage.classList.add('my-message');
    userMessage.innerHTML = `<div class="message-text">I have a question about your service.</div>`;
    chatAreaMessages.appendChild(userMessage);


    // Add chat input
    const chatInputContainer = document.querySelector('.chat-input-container');
    chatInputContainer.innerHTML = `
        <div class="chat-input">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Type your message...">
            </div>
        </div>
    `;

    // Add/Update Footer (if shown)
    const footerShow = document.getElementById('footer-show').checked;
    const footerContainer = document.querySelector('.chat-input-container'); // Correct container
    const footer = footerContainer.querySelector('div'); // Get existing footer or create one
    if (footerShow) {
        if (!footer) {
            const newFooter = document.createElement('div');
            newFooter.style.fontFamily = root.getPropertyValue('--footerFontFamily');
            newFooter.style.fontWeight = root.getPropertyValue('--footerFontWeight');
            newFooter.style.fontSize = root.getPropertyValue('--footerFontSize');
            newFooter.style.color = root.getPropertyValue('--footerTextColor');
            newFooter.textContent = document.getElementById('footer-text').value;
            footerContainer.appendChild(newFooter);
        } else {
            footer.style.fontFamily = root.getPropertyValue('--footerFontFamily');
            footer.style.fontWeight = root.getPropertyValue('--footerFontWeight');
            footer.style.fontSize = root.getPropertyValue('--footerFontSize');
            footer.style.color = root.getPropertyValue('--footerTextColor');
            footer.textContent = document.getElementById('footer-text').value;
        }

    } else {
        // Remove footer if not shown
        if (footer) {
            footerContainer.removeChild(footer);
        }
    }

    saveSettings();
}

// Function to save settings to LocalStorage
function saveSettings() {
    const settings = {};
    document.querySelectorAll('.controls input, .controls select').forEach(input => {
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
        document.querySelectorAll('.controls input, .controls select').forEach(input => {
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
        document.getElementById('footer-show').dispatchEvent(new Event('change'));
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
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);
}

// Event Listeners for All Inputs to Update Preview and Save Settings
document.querySelectorAll('.controls input, .controls select').forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
});

// Toggle Header Background Options
document.getElementById('headerBackgroundType').addEventListener('change', updatePreview);

// Toggle Chat Area Background Options
document.getElementById('chatAreaBackgroundType').addEventListener('change', updatePreview);

// Toggle Chat Input Background Options
document.getElementById('chatInputBackgroundType').addEventListener('change', updatePreview);

// Toggle Section Content Visibility
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('click', function () {
        const sectionContent = this.nextElementSibling;
        const toggleIcon = this.querySelector('.toggle-icon');

        sectionContent.style.display = sectionContent.style.display === 'none' ? 'block' : 'none';
        toggleIcon.textContent = sectionContent.style.display === 'block' ? '-' : '+';
    });
});

//Avatar Border Transparency
document.getElementById('avatarBorderTransparent').addEventListener('change', function () {
    const avatarBorderColor = document.getElementById('avatarBorderColor');
    if (this.checked) {
        document.documentElement.style.setProperty('--avatarBorderColor', 'transparent');
        avatarBorderColor.disabled = true;
    } else {
        document.documentElement.style.setProperty('--avatarBorderColor', avatarBorderColor.value);
        avatarBorderColor.disabled = false;
    }
    updatePreview();
    saveSettings();
});

window.onload = function () {
    generateCSS();
    loadSettings();
    updatePreview();
};
