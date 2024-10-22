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
const express_1 = __importDefault(require("express"));
const WhatsappClient_1 = require("../services/WhatsappClient");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.post("/message", upload.single("file"), (req, res) => {
    const file = req.file;
    const clientId = req.body.clientId;
    (0, WhatsappClient_1.sendMessage)(req.body.phoneNumber, req.body.message, clientId, file);
    res.status(200).send("Send message complete");
});
router.post("/broadcast", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, recipients, messageTemplate, delay } = req.body;
    try {
        yield (0, WhatsappClient_1.broadcastMessage)(recipients, messageTemplate, clientId, delay || 1000);
        res.status(200).send("Broadcast complete");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Broadcast failed");
    }
}));
router.get("/:id/start", (req, res) => {
    (0, WhatsappClient_1.startClient)(req.params.id);
    res.status(200).send("Server complete");
});
exports.default = router;
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
