import browser from "webextension-polyfill";
import {
  EXTERNAL_SERVICE_TYPES,
  SERVICE_TYPES,
} from "@shared/constants/services";

import { popupMessageListener } from "./messageListener/popupMessageListener";
import { astraxApiMessageListener } from "./messageListener/astraxApiMessageListener";

export const initMessageListener = () => {
  // returning true is very important in these message listeners. It tells the listener that the callback
  // could possibly be async, so keep the channel open til we send a reponse.
  browser.runtime.onMessage.addListener(async (request, sender) => {
    // todo this is kinda ugly

    let res;
    if (Object.values(SERVICE_TYPES).includes(request.type)) {
      res = await popupMessageListener(request);
    }
    if (Object.values(EXTERNAL_SERVICE_TYPES).includes(request.type)) {
      res = await astraxApiMessageListener(request, sender);
    }

    return res;
  });
};
