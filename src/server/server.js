import dhcp from "dhcp"
import http from "http"
import socketIo from "socket.io"
import app from "./app"
import { watchDHCP } from "./emitters"

const client = dhcp.createClient({ mac: "f0:18:98:87:57:3b" });
client.listen();
client.sendDiscover();

app.set("port", 80)
const server = http.createServer(app)

const io = socketIo(server);
io.on("connection", socket => {
    watchDHCP(socket, client)
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(80)
server.on("error", (e) => console.log(e))
server.on("listening", () => console.log("Listening: 80"))
