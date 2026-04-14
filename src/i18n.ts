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
      'Master Data': 'Master Data',
      'Asset Type': 'Asset Type',
      'Location': 'Location',
      'Supplier': 'Supplier',
      'Employee': 'Employee',
      'Department': 'Department',
      'Asset Management': 'Asset Management',
      'Transfer/Handover': 'Transfer/Handover',
      'Maintenance/Repair': 'Maintenance/Repair',
      'Inventory/Audit': 'Inventory/Audit',
      'Dashboard': 'Dashboard',
      'Search...': 'Search...',
      'Filter': 'Filter',
      'Reload': 'Reload',
      'Add New': 'Add New',
      'Search': 'Search',
      'Reset': 'Reset',
      'Template': 'Export Template',
      'Import': 'Import Excel',
      'Export': 'Export Excel',
    },
  },
  vi: {
    translation: {
      'Home': 'Trang chủ',
      'Inventory': 'Tồn kho',
      'Settings': 'Cài đặt',
      'Profile': 'Hồ sơ',
      'Logout': 'Đăng xuất',
      'WMS Pro': 'WMS Pro',
      'Vietnam Admin': 'Quản trị viên Việt Nam',
      'Search menu...': 'Tìm kiếm menu...',
      'Crafted by DeepMind': 'Được hoàn thiện bởi DeepMind',
      'Search Results': 'Kết quả tìm kiếm',
      'Master Data': 'Cấu hình dữ liệu',
      'Asset Type': 'Loại tài sản',
      'Location': 'Vị trí',
      'Supplier': 'Nhà cung cấp',
      'Employee': 'Nhân viên',
      'Department': 'Phòng ban',
      'Asset Management': 'Quản lý tài sản',
      'Transfer/Handover': 'Điều chuyển/Bàn giao',
      'Maintenance/Repair': 'Bảo trì/Sửa chữa',
      'Inventory/Audit': 'Kiểm kê đối soát',
      'Dashboard': 'Bảng điều khiển',
      'Search...': 'Tìm kiếm...',
      'Filter': 'Lọc',
      'Reload': 'Tải lại',
      'Add New': 'Thêm mới',
      'Search': 'Tìm kiếm',
      'Reset': 'Đặt lại',
      'Template': 'Xuất template',
      'Import': 'Nhập Excel',
      'Export': 'Xuất Excel',
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
