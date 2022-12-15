import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import {    Server   } from "socket.io"

const app = express();
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter)

//this is for listen the port of deploid or port 8080

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Listen ${PORT}`))

const io = new Server(server);

//Seve the messages in a const, don't save at database 

const messages = []

// on of a connection on of a message and connect

io.on("connection", socket => {
    console.log("socket connected")
    socket.emit("logs", messages)
    socket.on("message", data =>{
        messages.push(data)
        io.emit("logs", messages)
    })
    socket.on("authenticated", data =>{
        socket.broadcast.emit("newUserConected",data)
    })
})