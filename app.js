import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import path from "node:path";
import url from 'node:url';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"src", "index.html"));
});

io.on("connection", socket => {
    console.log("a user connected");
    socket.on("disconnect", () => console.log(" user disconnect"));
});

server.listen(2468, () => console.log("Connected to server"));