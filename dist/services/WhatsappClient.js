"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startClient = startClient;
exports.sendMessage = sendMessage;
exports.broadcastMessage = broadcastMessage;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const clients = {};
function startClient(id) {
    clients[id] = new whatsapp_web_js_1.Client({
        authStrategy: new whatsapp_web_js_1.LocalAuth({
            clientId: id,
        }),
    });
    clients[id].initialize().catch((err) => console.error(err));
    clients[id].on("qr", (qr) => {
        console.log(qr);
        qrcode_terminal_1.default.generate(qr, { small: true });
    });
    clients[id].on("ready", () => console.log("Client is ready!"));
    clients[id].on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.PROCCESS_MESSAGE_FROM_CLIENT &&
                msg.from !== "status@broadcast") {
                const contact = yield msg.getContact();
                console.log(contact, msg.from);
            }
        }
        catch (error) {
            console.error(error);
        }
    }));
}
function sendMessage(phoneNumber, message, clientId, file) {
    if (file) {
        const messageFile = new whatsapp_web_js_1.MessageMedia(file.mimetype, file.buffer.toString("base64"));
        clients[clientId].sendMessage(phoneNumber, messageFile);
    }
    else {
        clients[clientId].sendMessage(phoneNumber, message);
    }
}
function broadcastMessage(recipients_1, messageTemplate_1, clientId_1) {
    return __awaiter(this, arguments, void 0, function* (recipients, messageTemplate, clientId, delay = 1000) {
        for (const recipient of recipients) {
            const phoneNumber = `${recipient.phone}@c.us`;
            const message = messageTemplate.replace("[nama]", recipient.name);
            console.log(`Sending message to ${recipient.name} at ${recipient.phone}`);
            yield sendMessage(phoneNumber, message, clientId);
            yield new Promise((resolve) => {
                setTimeout(resolve, delay);
            });
        }
    });
}
// const { Client, LocalAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const { MessageMedia } = require("whatsapp-web.js");
// const clients = {};
// function startClient(id) {
//   clients[id] = new Client({
//     authStrategy: new LocalAuth({
//       clientId: id,
//     }),
//     // webVersionCache: {
//     //     type: 'remote',
//     //     remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html`
//     // }
//   });
//   clients[id].initialize().catch((err) => console.log(err));
//   clients[id].on("qr", (qr) => {
//     console.log(qr);
//     qrcode.generate(qr, { small: true });
//   });
//   clients[id].on("ready", () => console.log("Client is ready!"));
//   clients[id].on("message", async (msg) => {
//     try {
//       if (
//         process.env.PROCCESS_MESSAGE_FROM_CLIENT &&
//         msg.from != "status@broadcast"
//       ) {
//         const contact = await msg.getContact();
//         console.log(contact, msg.from);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }
// function sendMessage(phoneNumber, message, clientId, file) {
//   if (file) {
//     const messageFile = new MessageMedia(
//       file.mimetype,
//       file.buffer.toString("base64")
//     );
//     clients[Number(clientId)].sendMessage(phoneNumber, messageFile);
//   } else {
//     clients[clientId].sendMessage(phoneNumber, message);
//   }
// }
// async function broadcastMessage(
//   recipients,
//   messageTemplate,
//   clientId,
//   delay = 1000
// ) {
//   for (const recipient of recipients) {
//     const phoneNumber = `${recipient.phone}@c.us`;
//     const message = messageTemplate.replace("[nama]", recipient.name);
//     console.log(`sending message to ${recipient.name} at ${recipient.phone}`);
//     await sendMessage(phoneNumber, message, clientId);
//     await new Promise((resolve) => {
//       setTimeout(resolve, delay);
//     });
//   }
// }
// module.exports = { startClient, sendMessage, broadcastMessage };
