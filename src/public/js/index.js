const socket = io({
    autoConnect: false
})

let user;

const chatBox = document.getElementById("chatBox")
const logsPanel = document.getElementById("logsPanel")

// alert to set a username
Swal.fire({
    title: "Plase enter yout username",
    input: "text",
    inputValidator: (value) => {
        return !value && "Username is required"
    },
    allowOutsideClick: false

}).then(result => {
    user = result.value;
    socket.connect()
    socket.emit("authenticated",user)
})


chatBox.addEventListener("keyup", evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", {
                    user,
                    message: chatBox.value.trim()
                },
                chatBox.value = ""
            )
        }

    }
})


socket.on("logs", data => {
    let message = "";
    data.forEach(msg => {
        message += `${msg.user} says: ${msg.message} <br/>`
    });
    logsPanel.innerHTML = message;
})

socket.on("newUserConected", data =>{
    if(!user) return;
    Swal.fire({
        toast:true,
        position:"top-end",
        showConfirmButton:false,
        title:`${data} joined`,
        icon:"succes"
    })
})