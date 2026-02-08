"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Tag,
  Space,
  Empty,
  Input,
  Modal,
  Form,
  message,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Daily } from "@/common/types/daily";
import { useDailies } from "@/service/useDailies";

export default function DailyList() {
  const {
    dailies,
    createDaily: onCreate,
    deleteDaily: onDelete,
  } = useDailies();
  const router = useRouter();
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredDailies = dailies.filter((daily) =>
    daily.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log("dailies", dailies);

  const handleCreate = async (values: { title: string }) => {
    setLoading(true);
    try {
      await onCreate({
        title: values.title,
        content: "",
      });
      message.success("Tạo daily thành công!");
      setShowCreateModal(false);
      form.resetFields();
    } catch (error) {
      message.error("Lỗi khi tạo daily!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    Modal.confirm({
      title: "Xóa daily?",
      content: `Bạn có chắc muốn xóa "${title}"?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await onDelete(id);
          message.success("Đã xóa!");
        } catch (error) {
          message.error("Lỗi khi xóa!");
        }
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold m-0">📚 Daily Notes</h1>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setShowCreateModal(true)}
          >
            Tạo mới
          </Button>
        </div>

        {/* Search */}
        <Input
          size="large"
          placeholder="Tìm kiếm daily..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </Card>

      {/* Grid Layout */}
      {filteredDailies.length === 0 ? (
        <Card>
          <Empty
            description="Chưa có daily nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setShowCreateModal(true)}
            >
              Tạo daily đầu tiên
            </Button>
          </Empty>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredDailies.map((daily) => (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} key={daily.id}>
              <Card
                hoverable
                actions={[
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => router.push(`/dailies/${daily.id}`)}
                    key="edit"
                  >
                    Sửa
                  </Button>,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(daily.id, daily.title)}
                    key="delete"
                  >
                    Xóa
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={<div className="text-lg font-bold">{daily.title}</div>}
                  description={
                    <Space
                      direction="vertical"
                      size="small"
                      style={{ width: "100%" }}
                    >
                      <div className="text-gray-500 text-sm">
                        {new Date(daily.created_at).toLocaleDateString("vi-VN")}
                      </div>
                      <div>
                        <Tag color="blue">
                          {daily.vocabulary_notes?.length || 0} từ vựng
                        </Tag>
                        <Tag color="green">
                          {daily.content?.length || 0} ký tự
                        </Tag>
                      </div>
                      <div className="line-clamp-3 text-gray-600">
                        {daily.content?.substring(0, 100)}
                        {daily.content?.length > 100 && "..."}
                      </div>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Create Modal */}
      <Modal
        title="Tạo Daily mới"
        open={showCreateModal}
        onCancel={() => {
          setShowCreateModal(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input size="large" placeholder="Nhập tiêu đề..." autoFocus />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setShowCreateModal(false);
                  form.resetFields();
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Tạo
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
