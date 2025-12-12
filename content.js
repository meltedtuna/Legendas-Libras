// 1. Create the VLibras Iframe (Same as before)
const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('widget.html');
iframe.id = 'vlibras-iframe';
iframe.style.position = 'fixed';
iframe.style.top = '0';
iframe.style.right = '0';
iframe.style.width = '400px'; 
iframe.style.height = '600px'; 
iframe.style.border = 'none';
iframe.style.zIndex = '2147483647';
document.body.appendChild(iframe);

// 2. The Caption Observer Function
function startCaptionObserver() {
    const captionContainer = document.querySelector('.ytp-caption-window-container');
    
    if (!captionContainer) {
        // Captions might not be on yet, retry in 1 second
        setTimeout(startCaptionObserver, 1000);
        return;
    }

    console.log("VLibras Extension: Caption container found! Starting observer...");

    let lastText = "";

    const observer = new MutationObserver(() => {
        // Get all current caption segments
        const segments = document.querySelectorAll('.ytp-caption-segment');
        if (segments.length === 0) return;

        // Combine segments into one sentence
        let currentText = Array.from(segments).map(s => s.textContent).join(' ');

        // Only send if the text has changed significantly
        if (currentText && currentText !== lastText) {
            lastText = currentText;
            console.log("VLibras sending text:", currentText);
            
            // Send the text to our widget.html
            iframe.contentWindow.postMessage({
                action: 'TRANSLATE_TEXT',
                text: currentText
            }, '*');
        }
    });

    observer.observe(captionContainer, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// Start watching for captions
startCaptionObserver();