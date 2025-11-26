// require('dotenv').config({path: '../../.env'});
// const express = require('express');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');
// const {connectDB, closeDB} = require('../../db/db.js');
// const mongoose = require('mongoose');
// const Message = require('../../db/messages.model.js');

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// app.get('/', (req,res) => {
//     res.sendFile(join(__dirname, '../../public/index.html'));
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('chat message', async (msg) => {
//         console.log('msg:', msg);
//         try {
//             const newMessage = new Message({
//                 content: msg,
//                 createdAt: new Date()
//             });
            
//             const result = await newMessage.save();
//             console.log('message saved', result);

//             io.emit('chat message', msg);
//         } catch(e) {
//             console.error('failed to save message', e);
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// async function start() {
//     try {
//         //connect to DB
//         await connectDB(process.env.MONGO_URI);
//         console.log('MongoDB connected');

//         //connect to SERVER
//         const PORT = process.env.PORT || 3000;
//         server.listen(PORT, () => {
//             console.log('server running at http://localhost:3000');
//         });
//     } catch (err) {
//       console.error('Startup failed', err);
//       process.exit(1);  
//     }
// }
// start();

// //when the user press ctrl + C in the terminal
// process.on('SIGINT', async () => {
//     console.log('SIGINT received - closing server and DB');
//     try {
//         await closeDB();
//         server.close(() => {
//             console.log('HTTP server closed');
//             process.exit(0);
//         });
//     } catch (err) {
//       console.error('Error during shutdown', err);
//       process.exit(1);  
//     }
// });
