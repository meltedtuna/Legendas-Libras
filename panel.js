// panel.js
const statusDiv = document.getElementById('status');
const iframe = document.getElementById('widget-frame');

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TRANSLATE_COMMAND") {
    // 1. Update Status Bar
    statusDiv.textContent = message.text;
    statusDiv.style.background = "#007bff"; // Blue flash

    // 2. Pass to the Sandbox Iframe
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: "TRANSLATE",
        text: message.text
      }, "*");
    }
  }
});
