import express from "express";
import { createServer } from "http";

import controller from "./controller";
import database from "./config/database";

const app = express();

database.sync({
  alter: true,
});

app.use(express.json());
app.use(controller);

const server = createServer(app);
server.listen(process.env.PORT || 5000);
