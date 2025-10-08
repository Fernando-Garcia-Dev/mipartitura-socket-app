import expres from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 3000;

const app = expres();

const server = createServer(app);

const io = new Server (server,{
    cors: {
        origin: "https://mipartitura.com", // La URL de tu app cliente
        methods: ["GET", "POST"],
        credentials: true
    },
    pingInterval: 10000,
    pingTimeout: 20000
});

io.on('connection', (socket)=>{
    console.log("Un usuario se conecto !!!");

    socket.on('usuario-voto',(data)=>{
        socket.broadcast.emit('server-usuario-voto', data);
    });
  
    socket.on('nueva-partitura-solicitada',(data)=>{
      socket.broadcast.emit('nueva-partitura-solicitada', data);
      
    });
});

server.listen(port, function(){
    console.log(`Servidor corriendo en el puerto: ${port}`);
});