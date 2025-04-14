import axios from 'axios';

// تكوين الإعدادات الافتراضية لـ axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// إنشاء نسخة من axios مع الإعدادات الافتراضية
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// إضافة معترض للطلبات لإضافة التوكن إلى الرأس
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// واجهة برمجة التطبيق للمصادقة
export const authAPI = {
  // تسجيل مستخدم جديد
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء تسجيل المستخدم' };
    }
  },
  
  // تسجيل الدخول
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء تسجيل الدخول' };
    }
  },
  
  // الحصول على بيانات المستخدم الحالي
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء جلب بيانات المستخدم' };
    }
  },
  
  // تحديث بيانات المستخدم
  updateUser: async (userData) => {
    try {
      const response = await api.put('/auth/update', userData);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء تحديث بيانات المستخدم' };
    }
  },
  
  // استعادة كلمة المرور
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء طلب استعادة كلمة المرور' };
    }
  },
  
  // إعادة تعيين كلمة المرور
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء إعادة تعيين كلمة المرور' };
    }
  }
};

// واجهة برمجة التطبيق للغرف
export const roomAPI = {
  // الحصول على قائمة الغرف
  getRooms: async () => {
    try {
      const response = await api.get('/rooms');
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء جلب قائمة الغرف' };
    }
  },
  
  // الحصول على غرفة محددة
  getRoom: async (roomId) => {
    try {
      const response = await api.get(`/rooms/${roomId}`);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء جلب بيانات الغرفة' };
    }
  },
  
  // إنشاء غرفة جديدة
  createRoom: async (roomData) => {
    try {
      const response = await api.post('/rooms', roomData);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء إنشاء الغرفة' };
    }
  },
  
  // الانضمام إلى غرفة
  joinRoom: async (roomId) => {
    try {
      const response = await api.post(`/rooms/${roomId}/join`);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء الانضمام إلى الغرفة' };
    }
  },
  
  // مغادرة الغرفة
  leaveRoom: async (roomId) => {
    try {
      const response = await api.post(`/rooms/${roomId}/leave`);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء مغادرة الغرفة' };
    }
  }
};

// واجهة برمجة التطبيق للعبة
export const gameAPI = {
  // إنشاء شبكة سداسية جديدة
  generateHexGrid: async (rows, cols) => {
    try {
      const response = await api.post('/hexgrid/generate', { rows, cols });
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء إنشاء شبكة سداسية' };
    }
  },
  
  // إعادة ترتيب الحروف في الشبكة السداسية
  shuffleHexGrid: async (grid) => {
    try {
      const response = await api.post('/hexgrid/shuffle', { grid });
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء إعادة ترتيب الحروف' };
    }
  },
  
  // التحقق من صحة الإجابة
  validateAnswer: async (answer, letter) => {
    try {
      const response = await api.post('/game/validate-answer', { answer, letter });
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || 'حدث خطأ أثناء التحقق من صحة الإجابة' };
    }
  }
};

export default {
  authAPI,
  roomAPI,
  gameAPI
};
