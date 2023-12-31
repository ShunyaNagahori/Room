const dotenv = require('dotenv');
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const PORT = parseInt(process.env.PORT) || 8000;


if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
}

const app = express();
const server = createServer(app);
const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
  origin: [CLIENT_URL],
  credentials: true
};
const io = new Server(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  console.log('サーバーに接続されました');

  // ユーザーが特定のルームに入室する処理
  socket.on('joinRoom', ({ roomName, userName }) => {
    socket.join(roomName);
    io.to(roomName).emit('recivedMessage', { message: `${userName} さんが「${roomName}」に入室しました` });
  });

  // ユーザーが特定のルームに退出する処理
  socket.on('exitRoom', ({ roomName, userName }) => {
    socket.leave(roomName);
    io.to(roomName).emit('recivedMessage', { message: `${userName} さんが「${roomName}」から退出しました` });
  });

  // ユーザーからメッセージを受けた時の受信
  socket.on('sendMessage', ({ roomName, userName, message }) => {
    // 受信したものを、クライアントへ返す
    io.to(roomName).emit('recivedMessage', { message: `${userName}: ${message}` });
  });

  // ユーザーが切断したときの処理
  socket.on('disconnect', () => {
    console.log('サーバーの接続が切れました');
  });
});

server.listen(PORT, () => {
  console.log('server running');
})
