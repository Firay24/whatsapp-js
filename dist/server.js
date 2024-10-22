"use strict";
// const express = require("express")
// const messageRouter = require('./routers/messageRouter')
// const whatsappclient = require('./services/WhatsappClient')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express()
// app.use(express.json())
// app.use(messageRouter)
// app.listen(process.env.PORT, () => console.log(`Server is ready in on port ${process.env.PORT}`))
const express_1 = __importDefault(require("express"));
const messageRouter_1 = __importDefault(require("./routers/messageRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(messageRouter_1.default);
const PORT = process.env.PORT || 3000; // Set a default port if not provided
app.listen(PORT, () => console.log(`Server is ready on port ${PORT}`));
