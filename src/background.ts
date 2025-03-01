export {}
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: `chrome-extension://${chrome.runtime.id}/tabs/welcome.html`,
      active: true,
    })
  }
})
