import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import {    Server   } from "socket.io"
import database from "./db/knex.js"


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

const user_name = [
    {user_name:"Mauricio", age:21},
    {user_name:"Santino", age:12},
    {user_name:"Mariano", age:45},
    {user_name:"Nicolas", age:39}
]

app.get("/insert",async(req,res)=>{
    let result = await database("usernames").insert(user_name);
    res.send({result})
})

app.get("/users", async (req,res)=>{
    let result = await database("usernames").select("*")
    console.log(result)
    res.send({result})
})

app.get("/usernames", async(req,res) => {
    let result = await database("usernames").select("user_name");
    res.send(result)
})

app.get("/updateuser", async(req,res)=>{
    const newAge = {user_name:"Luca"};
    let result = await database("usernames").where("user_name", "Santino").update(newAge)
    res.send(result)
    //actualiza los datos en el sql, pero rompe el servidor
})
//1:10



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


// min 52