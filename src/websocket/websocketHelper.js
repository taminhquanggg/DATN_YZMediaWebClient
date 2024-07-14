import { w3cwebsocket as W3CWebSocket } from "websocket";

import { processMsgHelper } from "./processMsgHelper";
import { triggerEvent } from "../utils/constData";

export const wsMsgType = {
  Res_CurrentTime: 1,
};

export const wsMsgSeparatorChar = {
  DataSeparatorChar: "*",
  PropSeparatorChar: "|",
  ObjectSeparatorChar: "$",
};

const wsReadyState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

let wsClient = null;

const connectWS = () => {
  if (wsClient === null || wsClient.readyState === wsReadyState.CLOSED) {
    wsClient = new W3CWebSocket(
      import.meta.env.VITE_WSHOSTADDRESS +
      "?username=" +
      import.meta.env.VITE_WS_USERNAME
    );

    wsClient.onopen = () => {
      // console.log("WS Connected-", new Date());
      sendMessage(`${wsMsgType.Req_Header}*${wsMsgType.Req_FuncMenu}`);
    };
    wsClient.onmessage = (evt) => {
      // console.log(evt.data);
      // OnReceiveMessage(evt.data);

      triggerEvent({
        name: "socket-message",
        data: JSON.parse(evt.data),
      })
    };
    wsClient.onerror = (evt) => {
      console.log(evt);
    };
    wsClient.onclose = (message) => {
      console.log("WS Disconnected-", new Date());
      connectWS();
    };
  }
};

connectWS();

export const sendMessage = (message) => {
  if (wsClient && wsClient.readyState === wsReadyState.OPEN) {
    wsClient.send(message);
    // console.log("send ", message);
  } else {
    console.log("WS not opened");
  }
};

// Xu ly msg nhan dc
const OnReceiveMessage = (rawMessage) => {
  var message = JSON.parse(rawMessage);

  try {
    if (message.message_type == 0) {
      //reset server
      location.reload();
    } else if (message.message_type == 1) {
      processMsgHelper(message.data);
    }
  } catch (error) {
    console.log(error);
  }
};
