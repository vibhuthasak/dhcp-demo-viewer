import dhcp from "dhcp"
import http from "http"
import socketIo from "socket.io"
import app from "./app"
import { watchDHCP } from "./emitters"

const client = dhcp.createClient({ mac: "20-16-B9-48-C5-01" });
client.listen();
client.sendDiscover();

app.set("port", 80)
const server = http.createServer(app)

const io = socketIo(server);
io.on("connection", socket => {
    // console.log(socket, client)
    watchDHCP(socket, client)
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(80)
server.on("error", (e) => console.log(e))
server.on("listening", () => console.log("Listening: 80"))
