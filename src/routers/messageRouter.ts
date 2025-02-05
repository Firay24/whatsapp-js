import express, { Request, Response } from "express";
import {
  startClient,
  sendMessage,
  broadcastMessage,
} from "../services/WhatsappClient";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post(
  "/message",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;
    const clientId = req.body.clientId;
    sendMessage(req.body.phoneNumber, req.body.message, clientId, file);
    res.status(200).send("Send message complete");
  }
);

router.post(
  "/broadcast",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { clientId, recipients, messageTemplate, delay } = req.body;
    try {
      await broadcastMessage(
        recipients,
        messageTemplate,
        clientId,
        delay || 1000
      );
      res.status(200).send("Broadcast complete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Broadcast failed");
    }
  }
);

router.get("/:id/start", (req: Request, res: Response) => {
  startClient(req.params.id);
  res.status(200).send("Server complete");
});

export default router;

// const express = require("express");
// const router = new express.Router();
// const {
//   startClient,
//   sendMessage,
//   broadcastMessage,
// } = require("../services/WhatsappClient");
// const multer = require("multer");
// const upload = multer();

// router.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// router.post("/message", upload.single("file"), (req, res) => {
//   const file = req.file;
//   const clientId = req.body.clientId;
//   sendMessage(req.body.phoneNumber, req.body.message, clientId, file);
//   res.status(200).send("Send message complete");
// });

// router.post("/broadcast", upload.single("file"), async (req, res) => {
//   const { clientId, recipients, messageTemplate, delay } = req.body;
//   try {
//     await broadcastMessage(
//       recipients,
//       messageTemplate,
//       clientId,
//       delay || 1000
//     );
//     res.status(200).send("Broadcast complete");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Broadcast failed");
//   }
// });

// router.get("/:id/start", (req, res) => {
//   startClient(req.params.id);
//   res.status(200).send("Server complete");
// });

// module.exports = router;
