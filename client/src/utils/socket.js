import io from 'socket.io-client';

// الإعدادات الافتراضية لـ Socket.IO
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket = null;

// خدمة Socket.IO
const socketService = {
  // تهيئة اتصال Socket.IO
  initSocket: () => {
    if (!socket) {
      socket = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });
      
      // الاستماع لأحداث الاتصال
      socket.on('connect', () => {
        console.log('تم الاتصال بالخادم');
      });
      
      socket.on('disconnect', () => {
        console.log('تم قطع الاتصال بالخادم');
      });
      
      socket.on('connect_error', (error) => {
        console.error('خطأ في الاتصال بالخادم:', error);
      });
    }
    
    return socket;
  },
  
  // إغلاق اتصال Socket.IO
  closeSocket: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
  
  // تسجيل اللاعب
  registerPlayer: (userData, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('player:register', userData, callback);
  },
  
  // جلب قائمة الغرف
  getRooms: (callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('rooms:get', callback);
  },
  
  // إنشاء غرفة جديدة
  createRoom: (roomData, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('room:create', roomData, callback);
  },
  
  // الانضمام إلى غرفة
  joinRoom: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('room:join', data, callback);
  },
  
  // مغادرة الغرفة
  leaveRoom: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('room:leave', data, callback);
  },
  
  // تعيين اللاعبين إلى الفرق
  assignTeams: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('teams:assign', data, callback);
  },
  
  // توزيع اللاعبين على الفرق بشكل عشوائي
  randomTeams: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('teams:random', data, callback);
  },
  
  // بدء اللعبة
  startGame: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('game:start', data, callback);
  },
  
  // إعادة ترتيب الحروف
  shuffleGame: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('game:shuffle', data, callback);
  },
  
  // تغيير ألوان الفرق
  changeColors: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('game:colors', data, callback);
  },
  
  // إعلان الفوز
  announceWin: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('game:win', data, callback);
  },
  
  // الإجابة على سؤال
  answerQuestion: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('game:answer', data, callback);
  },
  
  // طلب تخطي السؤال
  skipQuestion: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('game:skip', data, callback);
  },
  
  // التصويت على تخطي السؤال
  voteSkip: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('game:vote-skip', data, callback);
  },
  
  // إرسال رسالة في المحادثة
  sendChatMessage: (data, callback) => {
    if (!socket) {
      socket = socketService.initSocket();
    }
    
    socket.emit('chat:message', data, callback);
  }
};

export default socketService;
