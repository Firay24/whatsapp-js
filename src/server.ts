// const express = require("express")
// const messageRouter = require('./routers/messageRouter')
// const whatsappclient = require('./services/WhatsappClient')

// const app = express()
// app.use(express.json())
// app.use(messageRouter)

// app.listen(process.env.PORT, () => console.log(`Server is ready in on port ${process.env.PORT}`))

import express, { Request, Response } from "express";
import messageRouter from "./routers/messageRouter";

const app = express();
app.use(express.json());
app.use(messageRouter);

const PORT = process.env.PORT || 3000; // Set a default port if not provided
app.listen(PORT, () => console.log(`Server is ready on port ${PORT}`));
