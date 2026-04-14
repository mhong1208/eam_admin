import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Result
            style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            status="404"
            title="404"
            subTitle="Xin lỗi, trang bạn truy cập không tồn tại hoặc đã bị di dời."
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    Về trang chủ
                </Button>
            }
        />
    );
};

export default NotFound;