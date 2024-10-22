import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const clients: { [key: string]: Client } = {};

function startClient(id: string): void {
  clients[id] = new Client({
    authStrategy: new LocalAuth({
      clientId: id,
    }),
  });

  clients[id].initialize().catch((err) => console.error(err));

  clients[id].on("qr", (qr: string) => {
    console.log(qr);
    qrcode.generate(qr, { small: true });
  });

  clients[id].on("ready", () => console.log("Client is ready!"));

  clients[id].on("message", async (msg) => {
    try {
      if (
        process.env.PROCCESS_MESSAGE_FROM_CLIENT &&
        msg.from !== "status@broadcast"
      ) {
        const contact = await msg.getContact();
        console.log(contact, msg.from);
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function sendMessage(
  phoneNumber: string,
  message: string,
  clientId: string,
  file?: Express.Multer.File
): void {
  if (file) {
    const messageFile = new MessageMedia(
      file.mimetype,
      file.buffer.toString("base64")
    );
    clients[clientId].sendMessage(phoneNumber, messageFile);
  } else {
    clients[clientId].sendMessage(phoneNumber, message);
  }
}

async function broadcastMessage(
  recipients: Array<{ phone: string; name: string }>,
  messageTemplate: string,
  clientId: string,
  delay: number = 1000
): Promise<void> {
  for (const recipient of recipients) {
    const phoneNumber = `${recipient.phone}@c.us`;
    const message = messageTemplate.replace("[nama]", recipient.name);
    console.log(`Sending message to ${recipient.name} at ${recipient.phone}`);
    await sendMessage(phoneNumber, message, clientId);

    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
}

export { startClient, sendMessage, broadcastMessage };

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
