export {};
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("extension installed");
  }
});
