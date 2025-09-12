import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Users, 
  MessageCircle, 
  User,
  Smile,
  Paperclip,
  MoreVertical,
  Wifi,
  WifiOff
} from 'lucide-react';
import io from 'socket.io-client';

const Chatroom = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [room, setRoom] = useState('general');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeout = useRef(null);

  const rooms = [
    { value: 'general', label: 'General Discussion', description: 'Open discussion about microplastics' },
    { value: 'research', label: 'Research & Development', description: 'Share research findings and methodologies' },
    { value: 'technical', label: 'Technical Support', description: 'Get help with technical issues' },
    { value: 'results', label: 'Results Sharing', description: 'Share and discuss test results' }
  ];

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connectToChat = () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    setConnectionStatus('connecting');

    // Connect to socket server
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket'],
      timeout: 5000,
    });

    // Connection successful
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setSocket(newSocket);
      setConnectionStatus('connected');
      setIsConnected(true);

      // Join the selected room
      newSocket.emit('join', { username: username.trim(), room });
    });

    // Connection error - fallback to demo mode
    newSocket.on('connect_error', (error) => {
      console.log('Connection failed, using demo mode:', error);
      setConnectionStatus('demo');
      setIsConnected(true);
      
      // Demo mode setup
      setOnlineUsers([username, 'Dr. Sarah', 'ResearcherJohn', 'TechEnthusiast', 'EcoWarrior']);
      const welcomeMsg = {
        id: Date.now(),
        username: 'System',
        message: `Welcome to ${room} chat room! (Demo Mode - Server not available)`,
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      setMessages([welcomeMsg]);
      newSocket.disconnect();
      setSocket(null);
    });

    // Receive messages
    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // User joined
    newSocket.on('user_joined', (data) => {
      setMessages(prev => [...prev, data]);
    });

    // User left
    newSocket.on('user_left', (data) => {
      setMessages(prev => [...prev, data]);
    });

    // Update users list
    newSocket.on('users_update', (users) => {
      setOnlineUsers(users);
    });

    // Handle typing indicators
    newSocket.on('user_typing', ({ username: typingUser, isTyping }) => {
      setTypingUsers(prev => {
        if (isTyping) {
          return prev.includes(typingUser) ? prev : [...prev, typingUser];
        } else {
          return prev.filter(user => user !== typingUser);
        }
      });
    });

    // Handle disconnection
    newSocket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      setIsConnected(false);
      setOnlineUsers([]);
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    if (socket && connectionStatus === 'connected') {
      // Real socket connection
      socket.emit('send_message', { message: messageText });
    } else {
      // Demo mode
      const message = {
        id: Date.now(),
        username: username,
        message: messageText,
        timestamp: new Date().toISOString(),
        type: 'user'
      };
      setMessages(prev => [...prev, message]);

      // Simulate response
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const responses = [
            "That's a great observation!",
            "I had similar results in my testing.",
            "Have you tried adjusting the UV wavelength?",
            "The ML accuracy can be improved with more training data.",
            "What concentration of Rhodamine B are you using?",
            "Interesting findings! Could you share more details?",
            "We should collaborate on this research.",
            "Have you published these results yet?"
          ];
          const randomUser = ['Dr. Sarah', 'ResearcherJohn', 'TechEnthusiast', 'EcoWarrior'][Math.floor(Math.random() * 4)];
          const autoReply = {
            id: Date.now() + 1,
            username: randomUser,
            message: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date().toISOString(),
            type: 'user'
          };
          setMessages(prev => [...prev, autoReply]);
        }, 1000 + Math.random() * 3000);
      }
    }
  };

  const handleTyping = (value) => {
    setNewMessage(value);
    
    if (socket && connectionStatus === 'connected') {
      socket.emit('typing', { isTyping: true });
      
      // Clear previous timeout
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      
      // Set new timeout to stop typing indicator
      typingTimeout.current = setTimeout(() => {
        socket.emit('typing', { isTyping: false });
      }, 1000);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected': return <Wifi className="w-4 h-4 text-green-500" />;
      case 'demo': return <WifiOff className="w-4 h-4 text-yellow-500" />;
      default: return <WifiOff className="w-4 h-4 text-red-500" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'demo': return 'Demo Mode';
      case 'connecting': return 'Connecting...';
      default: return 'Disconnected';
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Chat Room</h2>
              <p className="text-gray-600">Connect with other researchers and discuss microplastics detection</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && connectToChat()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <select 
                  value={room} 
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {rooms.map(roomOption => (
                    <option key={roomOption.value} value={roomOption.value}>
                      {roomOption.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {rooms.find(r => r.value === room)?.description}
                </p>
              </div>
              
              <button
                onClick={connectToChat}
                disabled={connectionStatus === 'connecting'}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {connectionStatus === 'connecting' ? 'Connecting...' : 'Join Chat'}
              </button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  If server is unavailable, demo mode will be activated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar with online users */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Online Users ({onlineUsers.length})
          </h3>
          <div className="flex items-center mt-2 text-sm">
            {getConnectionIcon()}
            <span className="ml-2 text-gray-600">{getConnectionText()}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {user} {user === username && '(You)'}
                  </p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                #{room} - {rooms.find(r => r.value === room)?.label}
              </h2>
              <p className="text-sm text-gray-500">
                {rooms.find(r => r.value === room)?.description}
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'system' ? 'justify-center' : message.username === username ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'system' ? (
                <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm">
                  {message.message}
                </div>
              ) : (
                <div className={`max-w-xs lg:max-w-md ${message.username === username ? 'order-2' : 'order-1'}`}>
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.username === username 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    {message.username !== username && (
                      <p className="text-xs font-medium text-blue-600 mb-1">{message.username}</p>
                    )}
                    <p className={`text-sm ${message.username === username ? 'text-white' : 'text-gray-800'}`}>
                      {message.message}
                    </p>
                    <p className={`text-xs mt-1 ${
                      message.username === username ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                  <p className="text-sm text-gray-600">
                    {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={sendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Smile className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => handleTyping(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!isConnected}
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim() || !isConnected}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>Connected as {username}</span>
            <span>•</span>
            <span>{onlineUsers.length} users online</span>
            <span>•</span>
            <span className="flex items-center">
              {getConnectionIcon()}
              <span className="ml-1">{getConnectionText()}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;