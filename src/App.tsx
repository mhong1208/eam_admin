import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import viVN from 'antd/locale/vi_VN'; // Ngôn ngữ tiếng Việt cho Antd
import enUS from 'antd/locale/en_US'; // Ngôn ngữ tiếng Anh cho Antd
import router from '@/routes';
import { useThemeStore } from '@/store/useThemeStore';
import { useTranslation } from 'react-i18next';
import './App.css';

// Khởi tạo Query Client cho React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { mode, colorPrimary } = useThemeStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  const getLocale = () => {
    switch (i18n.language) {
      case 'vi':
        return viVN;
      case 'en':
        return enUS;
      default:
        return viVN;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider 
        locale={getLocale()} 
        theme={{ 
          algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: { colorPrimary } 
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
