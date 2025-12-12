// background.js

// 1. Open Side Panel on Icon Click
chrome.action.onClicked.addListener((tab) => {
  // Toggle the side panel for this specific window
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// 2. Relay Messages: Content Script -> Background -> Side Panel
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "NEW_SUBTITLE") {
    // Send this text to the Side Panel (Runtime)
    chrome.runtime.sendMessage({
      type: "TRANSLATE_COMMAND",
      text: message.text
    }).catch(() => {
      // If Side Panel is closed, ignore error
    });
  }
});