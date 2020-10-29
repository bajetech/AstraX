import {
  DEVELOPMENT,
  EXTERNAL_MSG_RESPONSE,
  EXTERNAL_MSG_REQUEST,
} from "../constants/services";
import { Response } from "./types";
import { NoExtensionInstalledError } from "../constants/errors";

declare global {
  interface Window {
    freighter: boolean;
  }
}

export const sendMessageToContentScript = (msg: {}): Promise<Response> => {
  const MESSAGE_ID = Date.now();

  window.postMessage(
    { source: EXTERNAL_MSG_REQUEST, messageId: MESSAGE_ID, ...msg },
    window.location.origin,
  );
  return new Promise((resolve, reject) => {
    if (!window.freighter) {
      reject(new NoExtensionInstalledError());
    }

    const messageListener = (event: { source: any; data: Response }) => {
      // We only accept messages from ourselves
      if (event.source !== window) return;
      // Only respond to messages tagged as being from our content script
      if (event?.data?.source !== EXTERNAL_MSG_RESPONSE) return;
      // Only respond to messages that this instance of sendMessageToContentScript sent
      if (event?.data?.messagedId !== MESSAGE_ID) return;

      resolve(event.data);
      window.removeEventListener("message", messageListener);
    };
    window.addEventListener("message", messageListener, false);
  });
};

export const sendMessageToBackground = (msg: {}): Promise<Response> => {
  if (DEVELOPMENT) {
    // treat this as an external call because we're making the call from the browser, not the popup
    return sendMessageToContentScript(msg);
  }

  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, (res: Response) => resolve(res));
  });
};
