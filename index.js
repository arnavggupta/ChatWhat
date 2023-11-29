    const path=require("path");
    const http= require("http");
    const express=require("express");
    const app=express();
    const server=http.createServer(app);
    const socketio= require("socket.io");
    const io=socketio(server);
    const port=process.env.PORT||3000;
    const staticpath=path.join(__dirname,"/public");
    app.use(express.static(staticpath));
    const moment=require("moment");

    const {createuser,getuser}= require("./users");

    io.on("connection",socket=>{

    console.log(`New user connected at ${socket.id}`);

    socket.on("joinroom",({username,room})=>{
        
        const user=createuser(socket.id,username,room);
        
        socket.join(user.room);


        socket.emit("message",formatmessage("ChatWhat","Welcome to this ChatWhat!"));

        //  broadcast.emit se jo client connect hua hai isko nhi bhjega server 
        socket.broadcast.to(user.room).emit("message",formatmessage(user.username,`  ${user.username} is Joined the Chat`));

    })

    socket.on("disconnect",()=>{
        const currentuser1= getuser(socket.id);
        console.log(currentuser1)
        if (currentuser1) {
            io.to(currentuser1.room).emit("message", formatmessage("ChatWhat", `${currentuser1.username} has left the chat`));
        }
    })
    //  and io.emit se sabko dikhta hai boss

    socket.on("chatmessage",msg=>{
        const currentuser= getuser(socket.id);
    

    io.to(currentuser.room).emit("message",formatmessage(currentuser.username,msg));  
    })

    })

    function formatmessage(username,text){

        return {
            username,
            text,
            time: moment().utcOffset("+00:00").format('h:mm a')
        }
    }

    server.listen(port,()=>{
        console.log(`Server is started at ${port} sucessfully `);
    })