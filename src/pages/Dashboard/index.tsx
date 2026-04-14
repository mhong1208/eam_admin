import React from 'react';
import { Typography, Row, Col, Card, Statistic, Table, Calendar, Badge } from 'antd';
import { 
  ArrowUpOutlined, 
  PropertySafetyOutlined, 
  ToolOutlined,
  TeamOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const data = [
    { key: '1', task: 'Kiểm kê kho A', status: 'Đang thực hiện', priority: 'Cao' },
    { key: '2', task: 'Bảo trì máy in P01', status: 'Chờ xử lý', priority: 'Trung bình' },
    { key: '3', task: 'Bàn giao laptop cho NV mới', status: 'Hoàn thành', priority: 'Thấp' },
  ];

  const columns = [
    { title: 'Công việc', dataIndex: 'task', key: 'task' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (s: string) => <Badge status="processing" text={s} /> },
    { title: 'Mức độ', dataIndex: 'priority', key: 'priority' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>{t('Dashboard')}</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Tổng tài sản"
              value={1128}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<PropertySafetyOutlined />}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Cần bảo trì"
              value={12}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ToolOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Nhân viên"
              value={350}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Cảnh báo"
              value={3}
              valueStyle={{ color: '#faad14' }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="Công việc gần đây" bordered={false}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Lịch sự kiện" bordered={false}>
            <Calendar fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
