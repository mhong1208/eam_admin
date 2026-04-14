import React from 'react';
import { Card, List } from 'antd';

const Maintenance: React.FC = () => {
  return (
    <Card bordered={false}>
      <List
        itemLayout="horizontal"
        dataSource={[]}
        renderItem={() => <List.Item />}
        locale={{ emptyText: 'Không có yêu cầu bảo trì hiện tại' }}
      />
    </Card>
  );
};

export default Maintenance;
