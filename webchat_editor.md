\<\!DOCTYPE html\>  
\<html lang="en"\>  
\<head\>  
    \<meta charset="UTF-8"\>  
    \<title\>Custom Chat Interface\</title\>  
    \<style\>  
        :root {  
            /\* Colors (Reverted to Previous Settings) \*/  
            \--primaryColor: \#36d6b5;  
            \--secondaryColor: \#ffffff;

            /\* Font (Restricted to Top 5 Common Fonts) \*/  
            \--fontFamily: Helvetica, Arial, sans-serif;

            /\* Header \*/  
            \--headerTextSize: 18px;  
            \--headerTextColor: \#ffffff;  
            \--headerBgColor: \#36d6b5;  
            \--headerHeight: 60px;  
            \--headerTextAlign: center;  
            \--cornerStyle: 20px; /\* Rounded corners \*/

            /\* Chat Area \*/  
            \--chatAreaColor: \#f8f9fa;  
            \--chatAreaBgImage: none;

            /\* Messages \*/  
            \--messageTextSize: 14px;  
            \--messageCornerStyle: 20px; /\* Rounded corners \*/  
            \--botMessageTextColor: \#212529;  
            \--botMessageBg: \#eeeeee;  
            \--userMessageTextColor: \#ffffff;  
            \--userMessageBg: \#36d6b5;  
            /\* Removed \--messageMaxWidth \*/

            /\* Avatar \*/  
            \--avatarSize: 50px;  
            \--avatarBorderColor: \#36d6b5;  
            \--avatarImageURL: url('https://i.ibb.co/JRM4sx5/IMG-8241.jpg');  
            \--avatarDisplay: inline-block;  
            \--avatarShape: 50%; /\* 50% for circle, 0% for square \*/

            /\* Chat Input \*/  
            \--chatInputBgColor: \#ffffff;  
            /\* Removed \--chatInputBorderRadius \*/

            /\* Icon Settings \*/  
            \--btnDisplay: none; /\* Default to hide icons \*/  
        }

        /\* Ensure full height \*/  
        html, body {  
            height: 100%;  
            margin: 0;  
            padding: 0;  
            box-sizing: border-box;  
        }

        /\* Base Styles \*/  
        \* { margin: 0; padding: 0; box-sizing: border-box; }  
        body {   
            background-color: var(--secondaryColor);   
            font-family: var(--fontFamily);   
            height: 100vh;  
            overflow: hidden;  
        }  
        .container {   
            display: flex;   
            height: 100%;   
        }  
        .controls {   
            width: 300px;   
            background: var(--secondaryColor);   
            padding: 20px;   
            overflow-y: auto;   
            border-right: 1px solid \#e0e0e0;   
            height: 100vh;   
        }  
        .preview {   
            flex: 1;   
            background: var(--secondaryColor);   
            display: flex;   
            flex-direction: column;   
        }

        /\* Sections \*/  
        .section {   
            margin-bottom: 24px;   
            padding: 15px;   
            background: \#f8f9fa;   
            border-radius: 8px;   
            border: 1px solid \#e0e0e0;   
        }  
        .section-title {   
            font-size: 16px;   
            font-weight: 600;   
            margin-bottom: 15px;   
            color: \#2c3e50;   
            padding-bottom: 8px;   
            border-bottom: 2px solid \#e0e0e0;   
        }

        /\* Controls \*/  
        .control-group { margin-bottom: 12px; }  
        label {   
            display: block;   
            margin-bottom: 6px;   
            font-size: 14px;   
            color: \#4a5568;   
        }  
        input, select {   
            width: 100%;   
            padding: 8px;   
            border: 1px solid \#e0e0e0;   
            border-radius: 4px;   
            margin-bottom: 8px;   
            font-size: 14px;  
        }  
        input\[type="color"\] { height: 40px; padding: 0; }  
        input\[type="checkbox"\] {   
            transform: scale(1.2);   
            margin-right: 10px;   
            vertical-align: middle;  
        }  
        .copy-button {   
            width: 100%;   
            padding: 10px;   
            background: var(--primaryColor);   
            color: var(--secondaryColor);   
            border: none;   
            border-radius: 4px;   
            cursor: pointer;   
            font-size: 14px;   
            transition: background 0.3s;   
        }  
        .copy-button:hover { background: \#2ea590; }

        /\* Preview Area \*/  
        .chat-preview-container {   
            flex: 1;   
            display: flex;   
            flex-direction: column;   
            background: var(--chatAreaColor);   
            background-image: var(--chatAreaBgImage);   
            margin: 20px;   
            border-radius: var(--cornerStyle);   
            overflow: hidden;   
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);   
            position: relative;   
        }  
        .chat-header {   
            height: var(--headerHeight);   
            padding: 0 20px;   
            font-size: var(--headerTextSize);   
            font-weight: 600;   
            background-color: var(--headerBgColor);   
            color: var(--headerTextColor);   
            text-align: var(--headerTextAlign);   
            display: flex;   
            align-items: center;   
            justify-content: var(--headerTextAlign);   
            border-top-left-radius: var(--cornerStyle);   
            border-top-right-radius: var(--cornerStyle);   
            font-family: var(--fontFamily);  
        }  
        .chat-area {   
            flex: 1;   
            padding: 20px;   
            overflow-y: auto;   
            line-height: 1.5; /\* Improved line spacing \*/  
            font-family: var(--fontFamily);  
        }  
        .other-message {   
            display: flex;   
            align-items: flex-start; /\* Align the image to the top of the text \*/  
            padding-left: calc(var(--avatarSize) \+ 10px); /\* Provide space for the image on the left \*/  
            position: relative;   
            margin-bottom: 15px;   
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
            /\* Removed max-width: var(--messageMaxWidth); \*/  
            word-wrap: break-word;   
            font-family: var(--fontFamily);   
            margin-bottom: 5px; /\* Added margin for better spacing \*/  
        }

        /\* User Message Styling \*/  
        .my-message {  
            display: flex;  
            justify-content: flex-end; /\* Align messages to the right \*/  
            padding-right: 0; /\* Remove padding for avatar \*/  
            margin-bottom: 15px;   
            position: relative;  
        }

        .my-message .message-text {   
            background-color: var(--userMessageBg);   
            color: var(--userMessageTextColor);   
            font-size: var(--messageTextSize);   
            border-radius: var(--messageCornerStyle);   
            padding: 10px 15px;   
            /\* Removed max-width: var(--messageMaxWidth); \*/  
            word-wrap: break-word;   
            font-family: var(--fontFamily);   
            margin-bottom: 5px;   
        }

        /\* Message Text Inheritance \*/  
        .message-text \* {   
            color: inherit;   
            font-family: inherit;   
        }

        /\* Icon Buttons \*/  
        .btn {   
            display: var(--btnDisplay);   
            font-weight: 400;   
            color: \#212529;   
            text-align: center;   
            vertical-align: middle;   
            \-webkit-user-select: none;   
            \-moz-user-select: none;   
            \-ms-user-select: none;   
            user-select: none;   
            background-color: transparent;   
            border: 1px solid transparent;   
            padding: .375rem .75rem;   
            font-size: 1rem;   
            line-height: 1.5;   
            border-radius: .25rem;   
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;   
        }

        /\* Pre Selector for Message Text Size and Font \*/  
        pre {  
            font-size: var(--messageTextSize);  
            font-weight: normal;  
            font-family: var(--fontFamily);  
        }

        /\* Chat Input Styling \*/  
        .chat-input {   
            padding: 20px 20px; /\* Updated padding \*/  
            background-color: var(--chatInputBgColor);   
            display: flex;   
            gap: 10px;   
            align-items: center;   
            position: absolute;   
            bottom: 0;   
            width: 100%;   
            box-sizing: border-box;   
            font-family: var(--fontFamily);  
        }  
        .chat-input input {   
            flex: 1;   
            padding: 15px;   
            border: none;   
            background-color: \#f1f1f1;   
            /\* Removed border-radius: var(--chatInputBorderRadius); \*/  
            font-size: 14px;   
            outline: none;   
            box-shadow: none;   
        }

        /\* Success Message \*/  
        .success-message {  
            display: none;  
            position: fixed;  
            bottom: 20px;  
            right: 20px;  
            background: \#36d6b5;  
            color: \#fff;  
            padding: 10px 20px;  
            border-radius: 4px;  
            font-size: 14px;  
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);  
            z-index: 1000;  
        }

        /\* Generated CSS Styles \*/  
        textarea\#cssOutput {  
            width: 100%;  
            height: 200px;  
            resize: vertical;  
            font-family: monospace;  
            font-size: 12px;  
            padding: 10px;  
            border: 1px solid \#e0e0e0;  
            border-radius: 4px;  
            box-sizing: border-box;  
            background-color: \#f1f1f1;  
            color: \#333;  
        }

        /\* Prevent unintended styles on typing animation \*/  
        .chat-input input:focus {  
            outline: none;  
            box-shadow: none;  
        }  
    \</style\>  
\</head\>  
\<body\>  
    \<div class="container"\>  
        \<div class="controls"\>  
            \<\!-- Header Settings \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Header Settings\</div\>  
                \<div class="control-group"\>  
                    \<label for="headerText"\>Header Text\</label\>  
                    \<input type="text" id="headerText" value="Chat Interface"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="headerTextSize"\>Header Text Size (px)\</label\>  
                    \<input type="number" id="headerTextSize" value="18" min="12" max="36"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="headerTextColor"\>Header Text Color\</label\>  
                    \<input type="color" id="headerTextColor" value="\#ffffff"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="headerBgColor"\>Header Background Color\</label\>  
                    \<input type="color" id="headerBgColor" value="\#36d6b5"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="headerHeight"\>Header Height (px)\</label\>  
                    \<input type="number" id="headerHeight" value="60" min="40" max="150"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="headerTextAlign"\>Header Text Alignment\</label\>  
                    \<select id="headerTextAlign"\>  
                        \<option value="left"\>Left\</option\>  
                        \<option value="center" selected\>Center\</option\>  
                        \<option value="right"\>Right\</option\>  
                    \</select\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="cornerStyle"\>Header Corner Style\</label\>  
                    \<select id="cornerStyle"\>  
                        \<option value="0px"\>Squared\</option\>  
                        \<option value="20px" selected\>Rounded\</option\>  
                    \</select\>  
                \</div\>  
            \</div\>

            \<\!-- Chat Area Settings \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Chat Area Settings\</div\>  
                \<div class="control-group"\>  
                    \<label for="chatAreaColor"\>Chat Area Background Color\</label\>  
                    \<input type="color" id="chatAreaColor" value="\#f8f9fa"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="chatAreaBgImage"\>Chat Area Background Image URL\</label\>  
                    \<input type="url" id="chatAreaBgImage" placeholder="https://example.com/image.jpg"\>  
                \</div\>  
            \</div\>

            \<\!-- Message Settings \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Message Settings\</div\>  
                \<div class="control-group"\>  
                    \<label for="messageTextSize"\>Message Text Size (px)\</label\>  
                    \<input type="number" id="messageTextSize" value="14" min="12" max="24"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="messageCornerStyle"\>Message Corner Style\</label\>  
                    \<select id="messageCornerStyle"\>  
                        \<option value="0px"\>Squared\</option\>  
                        \<option value="20px" selected\>Rounded\</option\>  
                    \</select\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="botMessageTextColor"\>Bot Message Text Color\</label\>  
                    \<input type="color" id="botMessageTextColor" value="\#212529"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="botMessageBg"\>Bot Message Background\</label\>  
                    \<input type="color" id="botMessageBg" value="\#eeeeee"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="userMessageTextColor"\>User Message Text Color\</label\>  
                    \<input type="color" id="userMessageTextColor" value="\#ffffff"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="userMessageBg"\>User Message Background\</label\>  
                    \<input type="color" id="userMessageBg" value="\#36d6b5"\>  
                \</div\>  
                \<\!-- Removed "Message Max Width (%)" Control Group \--\>  
            \</div\>

            \<\!-- Font Settings \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Font Settings\</div\>  
                \<div class="control-group"\>  
                    \<label for="fontFamily"\>Font Family\</label\>  
                    \<select id="fontFamily"\>  
                        \<option value="Helvetica, Arial, sans-serif" selected\>Helvetica\</option\>  
                        \<option value="Arial, sans-serif"\>Arial\</option\>  
                        \<option value="'Times New Roman', Times, serif"\>Times New Roman\</option\>  
                        \<option value="Georgia, serif"\>Georgia\</option\>  
                        \<option value="'Courier New', Courier, monospace"\>Courier New\</option\>  
                    \</select\>  
                \</div\>  
            \</div\>

            \<\!-- Avatar Settings \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Avatar Settings\</div\>  
                \<div class="control-group"\>  
                    \<label\>  
                        \<input type="checkbox" id="showAvatar" checked\>  
                        Show Avatar  
                    \</label\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="avatarSize"\>Avatar Size (px)\</label\>  
                    \<input type="number" id="avatarSize" value="50" min="20" max="100"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="avatarBorderColor"\>Avatar Border Color\</label\>  
                    \<input type="color" id="avatarBorderColor" value="\#36d6b5"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="avatarImageURL"\>Avatar Image URL\</label\>  
                    \<input type="url" id="avatarImageURL" placeholder="https://example.com/avatar.jpg" value="https://i.ibb.co/JRM4sx5/IMG-8241.jpg"\>  
                \</div\>  
                \<div class="control-group"\>  
                    \<label for="avatarShape"\>Avatar Shape\</label\>  
                    \<select id="avatarShape"\>  
                        \<option value="50%"\>Circle\</option\>  
                        \<option value="0%"\>Square\</option\>  
                    \</select\>  
                \</div\>  
            \</div\>

            \<\!-- Icon Settings \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Icon Settings\</div\>  
                \<div class="control-group"\>  
                    \<label\>  
                        \<input type="checkbox" id="showIcons" checked\>  
                        Show Upload and Mic Icons  
                    \</label\>  
                \</div\>  
            \</div\>

            \<\!-- Chat Input Settings \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Chat Input Settings\</div\>  
                \<div class="control-group"\>  
                    \<label for="chatInputBgColor"\>Chat Input Background Color\</label\>  
                    \<input type="color" id="chatInputBgColor" value="\#ffffff"\>  
                \</div\>  
                \<\!-- Removed Chat Input Shape Control Group \--\>  
            \</div\>

            \<\!-- Generated CSS \--\>  
            \<div class="section"\>  
                \<div class="section-title"\>Generated CSS\</div\>  
                \<textarea id="cssOutput" readonly\>\</textarea\>  
                \<button class="copy-button" onclick="copyCSS()"\>Copy CSS\</button\>  
            \</div\>  
        \</div\>

        \<\!-- Preview Area \--\>  
        \<div class="preview"\>  
            \<div class="chat-preview-container"\>  
                \<div class="chat-header"\>Chat Interface\</div\>  
                \<div class="chat-area"\>  
                    \<div class="other-message"\>  
                        \<div class="message-text"\>Hello\! How can I help you today?\</div\>  
                    \</div\>  
                    \<div class="my-message"\>  
                        \<div class="message-text"\>I have a question about your service.\</div\>  
                    \</div\>  
                    \<div class="other-message"\>  
                        \<div class="message-text"\>I'll be happy to help\! What would you like to know?\</div\>  
                    \</div\>  
                    \<div class="my-message"\>  
                        \<div class="message-text"\>Can you tell me about your pricing plans?\</div\>  
                    \</div\>  
                \</div\>  
                \<div class="chat-input"\>  
                    \<input type="text" placeholder="Type your message..."\>  
                \</div\>  
            \</div\>  
        \</div\>

        \<\!-- Success Message \--\>  
        \<div id="successMessage" class="success-message"\>CSS copied to clipboard\!\</div\>

        \<script\>  
            function updatePreview() {  
                const root \= document.documentElement.style;  
                // Header  
                root.setProperty('--headerTextSize', document.getElementById('headerTextSize').value \+ 'px');  
                root.setProperty('--headerTextColor', document.getElementById('headerTextColor').value);  
                root.setProperty('--headerBgColor', document.getElementById('headerBgColor').value);  
                root.setProperty('--headerHeight', document.getElementById('headerHeight').value \+ 'px');  
                root.setProperty('--headerTextAlign', document.getElementById('headerTextAlign').value);  
                root.setProperty('--cornerStyle', document.getElementById('cornerStyle').value);  
                document.querySelector('.chat-header').textContent \= document.getElementById('headerText').value;

                // Chat Area  
                root.setProperty('--chatAreaColor', document.getElementById('chatAreaColor').value);  
                const bgImage \= document.getElementById('chatAreaBgImage').value;  
                root.setProperty('--chatAreaBgImage', bgImage ? \`url('${bgImage}')\` : 'none');

                // Messages  
                root.setProperty('--messageTextSize', document.getElementById('messageTextSize').value \+ 'px');  
                root.setProperty('--messageCornerStyle', document.getElementById('messageCornerStyle').value);  
                root.setProperty('--botMessageBg', document.getElementById('botMessageBg').value);  
                root.setProperty('--botMessageTextColor', document.getElementById('botMessageTextColor').value);  
                root.setProperty('--userMessageBg', document.getElementById('userMessageBg').value);  
                root.setProperty('--userMessageTextColor', document.getElementById('userMessageTextColor').value);  
                // Removed messageMaxWidth  
                // Removed any related updates

                // Font  
                root.setProperty('--fontFamily', document.getElementById('fontFamily').value);

                // Avatar  
                const showAvatar \= document.getElementById('showAvatar').checked ? 'inline-block' : 'none';  
                root.setProperty('--avatarDisplay', showAvatar);  
                root.setProperty('--avatarSize', document.getElementById('avatarSize').value \+ 'px');  
                root.setProperty('--avatarBorderColor', document.getElementById('avatarBorderColor').value);  
                const avatarURL \= document.getElementById('avatarImageURL').value;  
                root.setProperty('--avatarImageURL', avatarURL ? \`url('${avatarURL}')\` : \`url('https://i.ibb.co/JRM4sx5/IMG-8241.jpg')\`);  
                root.setProperty('--avatarShape', document.getElementById('avatarShape').value);

                // Icon Settings  
                const showIcons \= document.getElementById('showIcons').checked ? 'inline-block' : 'none';  
                root.setProperty('--btnDisplay', showIcons);

                // Chat Input  
                root.setProperty('--chatInputBgColor', document.getElementById('chatInputBgColor').value);  
                // Removed Chat Input Border Radius Update

                generateCSS();  
            }

            function generateCSS() {  
                const cs \= window.getComputedStyle(document.documentElement);  
                let css \= \`  
    /\* Root Variables \*/  
    :root {  
        /\* Colors \*/  
        \--primaryColor: ${cs.getPropertyValue('--primaryColor').trim()};  
        \--secondaryColor: ${cs.getPropertyValue('--secondaryColor').trim()};

        /\* Font \*/  
        \--fontFamily: ${cs.getPropertyValue('--fontFamily').trim()};

        /\* Header \*/  
        \--headerTextSize: ${cs.getPropertyValue('--headerTextSize').trim()};  
        \--headerTextColor: ${cs.getPropertyValue('--headerTextColor').trim()};  
        \--headerBgColor: ${cs.getPropertyValue('--headerBgColor').trim()};  
        \--headerHeight: ${cs.getPropertyValue('--headerHeight').trim()};  
        \--headerTextAlign: ${cs.getPropertyValue('--headerTextAlign').trim()};  
        \--cornerStyle: ${cs.getPropertyValue('--cornerStyle').trim()};

        /\* Chat Area \*/  
        \--chatAreaColor: ${cs.getPropertyValue('--chatAreaColor').trim()};  
        \--chatAreaBgImage: ${cs.getPropertyValue('--chatAreaBgImage').trim()};

        /\* Messages \*/  
        \--messageTextSize: ${cs.getPropertyValue('--messageTextSize').trim()};  
        \--messageCornerStyle: ${cs.getPropertyValue('--messageCornerStyle').trim()};  
        \--botMessageTextColor: ${cs.getPropertyValue('--botMessageTextColor').trim()};  
        \--botMessageBg: ${cs.getPropertyValue('--botMessageBg').trim()};  
        \--userMessageTextColor: ${cs.getPropertyValue('--userMessageTextColor').trim()};  
        \--userMessageBg: ${cs.getPropertyValue('--userMessageBg').trim()};  
        /\* Removed \--messageMaxWidth \*/

        /\* Avatar \*/  
        \--avatarSize: ${cs.getPropertyValue('--avatarSize').trim()};  
        \--avatarBorderColor: ${cs.getPropertyValue('--avatarBorderColor').trim()};  
        \--avatarImageURL: ${cs.getPropertyValue('--avatarImageURL').trim()};  
        \--avatarDisplay: ${cs.getPropertyValue('--avatarDisplay').trim()};  
        \--avatarShape: ${cs.getPropertyValue('--avatarShape').trim()};

        /\* Chat Input \*/  
        \--chatInputBgColor: ${cs.getPropertyValue('--chatInputBgColor').trim()};  
        /\* Removed \--chatInputBorderRadius \*/

        /\* Icon Settings \*/  
        \--btnDisplay: ${cs.getPropertyValue('--btnDisplay').trim()};  
    }

    /\* Chat Header Styling \*/  
    .chat-header {  
        font-size: var(--headerTextSize);  
        color: var(--headerTextColor);  
        background-color: var(--headerBgColor);  
        height: var(--headerHeight);  
        text-align: var(--headerTextAlign);  
        display: flex;  
        align-items: center;  
        justify-content: var(--headerTextAlign);  
        font-family: var(--fontFamily);  
        border-top-left-radius: var(--cornerStyle);  
        border-top-right-radius: var(--cornerStyle);  
    }

    /\* Chat Area Styling \*/  
    .chat-area {  
        background-color: var(--chatAreaColor);  
        background-image: var(--chatAreaBgImage);  
        background-size: cover;  
        background-repeat: no-repeat;  
        font-family: var(--fontFamily);  
    }

    /\* Bot Message Styling \*/  
    .other-message {  
        display: flex;  
        align-items: flex-start;  
        padding-left: calc(var(--avatarSize) \+ 10px);  
        position: relative;  
        margin-bottom: 15px;  
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
        /\* Removed max-width: var(--messageMaxWidth); \*/  
        word-wrap: break-word;  
        font-family: var(--fontFamily);  
        margin-bottom: 5px;  
    }

    /\* User Message Text Color \*/  
    .my-message .message-text \* {  
        color: var(--userMessageTextColor);  
    }

    /\* User Message Text Background \*/  
    .my-message .message-text {  
        background-color: var(--userMessageBg) \!important;  
        font-size: var(--messageTextSize);  
        border-radius: var(--messageCornerStyle);  
        padding: 10px 15px;  
        /\* Removed max-width: var(--messageMaxWidth); \*/  
        word-wrap: break-word;  
        font-family: var(--fontFamily);  
        margin-bottom: 5px;  
    }

    /\* Message Text Inheritance \*/  
    .message-text \* {   
        color: inherit;   
        font-family: inherit;   
    }

    /\* Icon Buttons \*/  
    .btn {   
        display: var(--btnDisplay);   
        font-weight: 400;   
        color: \#212529;   
        text-align: center;   
        vertical-align: middle;   
        \-webkit-user-select: none;   
        \-moz-user-select: none;   
        \-ms-user-select: none;   
        user-select: none;   
        background-color: transparent;   
        border: 1px solid transparent;   
        padding: .375rem .75rem;   
        font-size: 1rem;   
        line-height: 1.5;   
        border-radius: .25rem;   
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;   
    }

    /\* Pre Selector for Message Text Size and Font \*/  
    pre {  
        font-size: ${cs.getPropertyValue('--messageTextSize').trim()};  
        font-weight: normal;  
        font-family: ${cs.getPropertyValue('--fontFamily').trim()};  
    }

    /\* Chat Input Styling \*/  
    .chat-input {   
        padding: 20px 20px; /\* Updated padding \*/  
        background-color: var(--chatInputBgColor);   
        display: flex;   
        gap: 10px;   
        align-items: center;   
        position: absolute;   
        bottom: 0;   
        width: 100%;   
        box-sizing: border-box;   
        font-family: var(--fontFamily);  
    }  
    .chat-input input {   
        flex: 1;   
        padding: 15px;   
        border: none;   
        background-color: \#f1f1f1;   
        /\* Removed border-radius: var(--chatInputBorderRadius); \*/  
        font-size: 14px;   
        outline: none;   
        box-shadow: none;   
    }

    /\* Success Message \*/  
    .success-message {  
        display: none;  
        position: fixed;  
        bottom: 20px;  
        right: 20px;  
        background: \#36d6b5;  
        color: \#fff;  
        padding: 10px 20px;  
        border-radius: 4px;  
        font-size: 14px;  
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);  
        z-index: 1000;  
    }

    /\* Generated CSS Styles \*/  
    textarea\#cssOutput {  
        width: 100%;  
        height: 200px;  
        resize: vertical;  
        font-family: monospace;  
        font-size: 12px;  
        padding: 10px;  
        border: 1px solid \#e0e0e0;  
        border-radius: 4px;  
        box-sizing: border-box;  
        background-color: \#f1f1f1;  
        color: \#333;  
    }

    /\* Prevent unintended styles on typing animation \*/  
    .chat-input input:focus {  
        outline: none;  
        box-shadow: none;  
    }  
                \`;

                // Remove the .my-message block and any 'flex-wrap: wrap;' lines from the generated CSS  
                const cssLines \= css.split('\\n');  
                const filteredCssLines \= \[\];  
                let skipMyMessage \= false;

                for (let line of cssLines) {  
                    // Skip lines within the .my-message block except for the new user message styles  
                    if (line.includes('.my-message {')) {  
                        skipMyMessage \= true;  
                        continue;  
                    }  
                    if (skipMyMessage) {  
                        if (line.includes('}')) {  
                            skipMyMessage \= false;  
                        }  
                        continue;  
                    }

                    // Remove any lines containing 'flex-wrap: wrap;'  
                    if (line.includes('flex-wrap: wrap;')) {  
                        continue;  
                    }

                    filteredCssLines.push(line);  
                }

                // Append the specific rules for user messages using the variables  
                filteredCssLines.push('');  
                filteredCssLines.push('/\* User Message Text Color \*/');  
                filteredCssLines.push('.my-message .message-text \* {');  
                filteredCssLines.push('    color: var(--userMessageTextColor);');  
                filteredCssLines.push('}');  
                filteredCssLines.push('');  
                filteredCssLines.push('/\* User Message Text Background \*/');  
                filteredCssLines.push('.my-message .message-text {');  
                filteredCssLines.push('    background-color: var(--userMessageBg) \!important;');  
                filteredCssLines.push('    font-size: var(--messageTextSize);');  
                filteredCssLines.push('    border-radius: var(--messageCornerStyle);');  
                filteredCssLines.push('    padding: 10px 15px;');  
                filteredCssLines.push('    word-wrap: break-word;');  
                filteredCssLines.push('    font-family: var(--fontFamily);');  
                filteredCssLines.push('    margin-bottom: 5px;');  
                filteredCssLines.push('}');

                // Append the Icon Buttons CSS  
                filteredCssLines.push('');  
                filteredCssLines.push('/\* Icon Buttons \*/');  
                filteredCssLines.push('.btn {');  
                filteredCssLines.push('    display: var(--btnDisplay);');  
                filteredCssLines.push('    font-weight: 400;');  
                filteredCssLines.push('    color: \#212529;');  
                filteredCssLines.push('    text-align: center;');  
                filteredCssLines.push('    vertical-align: middle;');  
                filteredCssLines.push('    \-webkit-user-select: none;');  
                filteredCssLines.push('    \-moz-user-select: none;');  
                filteredCssLines.push('    \-ms-user-select: none;');  
                filteredCssLines.push('    user-select: none;');  
                filteredCssLines.push('    background-color: transparent;');  
                filteredCssLines.push('    border: 1px solid transparent;');  
                filteredCssLines.push('    padding: .375rem .75rem;');  
                filteredCssLines.push('    font-size: 1rem;');  
                filteredCssLines.push('    line-height: 1.5;');  
                filteredCssLines.push('    border-radius: .25rem;');  
                filteredCssLines.push('    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;');  
                filteredCssLines.push('}');

                // Append the Pre Selector for Message Text Size and Font with Actual Values  
                filteredCssLines.push('');  
                filteredCssLines.push('/\* Pre Selector for Message Text Size and Font \*/');  
                filteredCssLines.push('pre {');  
                filteredCssLines.push(\`    font-size: ${cs.getPropertyValue('--messageTextSize').trim()};\`);  
                filteredCssLines.push('    font-weight: normal;');  
                filteredCssLines.push(\`    font-family: ${cs.getPropertyValue('--fontFamily').trim()};\`);  
                filteredCssLines.push('}');

                const filteredCss \= filteredCssLines.join('\\n').trim();

                // Update the generated CSS textarea  
                document.getElementById('cssOutput').value \= filteredCss;  
            }

            function copyCSS() {  
                const cssOutput \= document.getElementById('cssOutput');  
                cssOutput.select();  
                cssOutput.setSelectionRange(0, 99999); // For mobile devices  
                navigator.clipboard.writeText(cssOutput.value).then(() \=\> {  
                    const successMessage \= document.getElementById('successMessage');  
                    successMessage.style.display \= 'block';  
                    setTimeout(() \=\> { successMessage.style.display \= 'none'; }, 2000);  
                }).catch(err \=\> {  
                    alert('Failed to copy CSS: ' \+ err);  
                });  
            }

            // Event Listeners  
            document.querySelectorAll('input, select').forEach(input \=\> {  
                input.addEventListener('input', updatePreview);  
                input.addEventListener('change', updatePreview);  
            });

            window.onload \= updatePreview;  
        \</script\>  
    \</div\>

    \<\!-- Success Message \--\>  
    \<div id="successMessage" class="success-message"\>CSS copied to clipboard\!\</div\>  
\</body\>  
\</html\>  
