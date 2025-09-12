const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store connected users and rooms
const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', ({ username, room }) => {
    socket.username = username;
    socket.room = room;
    
    // Add user to users map
    users.set(socket.id, { username, room, socketId: socket.id });
    
    // Join the room
    socket.join(room);
    
    // Add user to room
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(socket.id);
    
    // Notify room about new user
    socket.to(room).emit('user_joined', {
      username,
      message: `${username} joined the chat`,
      timestamp: new Date().toISOString(),
      type: 'system'
    });
    
    // Send current room users to the new user
    const roomUsers = Array.from(rooms.get(room) || [])
      .map(id => users.get(id)?.username)
      .filter(Boolean);
    
    socket.emit('room_users', roomUsers);
    
    // Broadcast updated user list to all users in room
    io.to(room).emit('users_update', roomUsers);
  });

  // Handle sending messages
  socket.on('send_message', (data) => {
    const user = users.get(socket.id);
    if (user) {
      const messageData = {
        id: Date.now(),
        username: user.username,
        message: data.message,
        timestamp: new Date().toISOString(),
        type: 'user'
      };
      
      // Broadcast message to all users in the room
      io.to(user.room).emit('receive_message', messageData);
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(user.room).emit('user_typing', {
        username: user.username,
        isTyping: data.isTyping
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      // Remove user from room
      const room = rooms.get(user.room);
      if (room) {
        room.delete(socket.id);
        if (room.size === 0) {
          rooms.delete(user.room);
        } else {
          // Update user list for remaining users
          const roomUsers = Array.from(room)
            .map(id => users.get(id)?.username)
            .filter(Boolean);
          io.to(user.room).emit('users_update', roomUsers);
        }
      }
      
      // Notify room about user leaving
      socket.to(user.room).emit('user_left', {
        username: user.username,
        message: `${user.username} left the chat`,
        timestamp: new Date().toISOString(),
        type: 'system'
      });
      
      // Remove user from users map
      users.delete(socket.id);
    }
    
    console.log('User disconnected:', socket.id);
  });
});

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Socket.io server is running' });
});

app.get('/api/rooms', (req, res) => {
  const roomsList = Array.from(rooms.keys()).map(room => ({
    name: room,
    users: rooms.get(room).size
  }));
  res.json(roomsList);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});

module.exports = { app, server, io };