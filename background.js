chrome.action.onClicked.addListener((tab) => {
    // Check if the URL starts with "http" or "https"
    if (tab.url.startsWith("http://") || tab.url.startsWith("https://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: toggleDarkMode
        });
    } else {
        console.warn('Darkify Web cannot be used on this URL:', tab.url);
    }
});

function toggleDarkMode() {
    const styleId = 'darkify-web-style';
    let darkStyle = document.getElementById(styleId);

    if (darkStyle) {
        darkStyle.remove();
    } else {
        darkStyle = document.createElement('style');
        darkStyle.id = styleId;
        darkStyle.textContent = `
        html {
          filter: invert(1) hue-rotate(180deg);
        }
        img, video {
          filter: invert(1) hue-rotate(180deg);
        }
      `;
        document.head.appendChild(darkStyle);
    }
}
