import axios from 'axios';

// Khởi tạo một instance của axios với các cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Thay đổi domain tương ứng với API backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: chạy trước khi gửi request đi
axiosInstance.interceptors.request.use(
  (config) => {
    // Đọc token từ localStorage nếu có rắc vào Authorization Header
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: xử lý data trả về từ server
axiosInstance.interceptors.response.use(
  (response) => {
    // Tùy theo cấu trúc respone của hệ thống, có thể return response.data ngay tại đây
    return response;
  },
  (error) => {
    // Xử lý các mã lỗi global (ví dụ 401 thì văng ra trang login)
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
