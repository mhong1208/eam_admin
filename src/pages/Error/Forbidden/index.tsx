import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react'; // Dùng icon từ lucide cho hiện đại

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="Bạn không có quyền truy cập vào khu vực này."
            icon={<LockKeyhole size={64} style={{ color: '#ff4d4f', marginBottom: 20 }} />}
            extra={
                <Button type="primary" onClick={() => navigate(-1)}>
                    Quay lại trang trước
                </Button>
            }
        />
    );
};

export default Forbidden;