document.getElementById('toggle-dark-mode').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: toggleDarkMode
    });
  });
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
