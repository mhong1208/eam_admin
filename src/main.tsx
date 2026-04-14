import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd'; // Để setup theme cho Antd
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
      <App />
    </ConfigProvider>
  </QueryClientProvider>
);