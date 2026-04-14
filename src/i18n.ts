import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'Home': 'Home',
      'Inventory': 'Inventory',
      'Settings': 'Settings',
      'Profile': 'Profile',
      'Logout': 'Logout',
      'WMS Pro': 'WMS Pro',
      'Vietnam Admin': 'Vietnam Admin',
      'Search menu...': 'Search menu...',
      'Crafted by DeepMind': 'Crafted by DeepMind',
      'Search Results': 'Search Results',
    },
  },
  vi: {
    translation: {
      'Home': 'Trang chủ',
      'Inventory': 'Tồn kho',
      'Settings': 'Cấu hình dữ liệu',
      'Profile': 'Hồ sơ',
      'Logout': 'Đăng xuất',
      'WMS Pro': 'WMS Pro',
      'Vietnam Admin': 'Quản trị viên Việt Nam',
      'Search menu...': 'Tìm kiếm menu...',
      'Crafted by DeepMind': 'Được hoàn thiện bởi DeepMind',
      'Search Results': 'Kết quả tìm kiếm',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
