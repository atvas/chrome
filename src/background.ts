import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
});
