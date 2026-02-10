import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { ECategory, ETopic, TOPIC_LABELS, TOPIC_OPTIONS } from "../types";
import { useVocabularies } from "@/service/useVocabularies";

type Props = {
  showCreateModal: boolean;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  category: ECategory;
};
export default function CreateVocaModal({
  showCreateModal,
  setShowCreateModal,
  category,
}: Props) {
  const [form] = Form.useForm();

  const { createVocabulary, isCreating } = useVocabularies({});

  const handleCreate = (values: {
    name_vi: string;
    name_jpn: string;
    phonetic: string;
    topic: ETopic;
  }) => {
    createVocabulary(
      {
        ...values,
        category: category,
      },
      {
        onSuccess: () => {
          setShowCreateModal(false);
          form.resetFields();
        },
      },
    );
  };

  return (
    <Modal
      title="Thêm từ vựng mới"
      open={showCreateModal}
      onCancel={() => {
        setShowCreateModal(false);
        form.resetFields();
      }}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
        initialValues={{
          topic: ETopic.DailyLife,
        }}
      >
        <Form.Item
          name="name_jpn"
          label="Tiếng Nhật (Kanji/Kana)"
          rules={[{ required: true, message: "Vui lòng nhập từ tiếng Nhật!" }]}
        >
          <Input size="large" placeholder="例: ラジオ" autoFocus />
        </Form.Item>

        <Form.Item
          name="phonetic"
          label="Phiên âm (Romaji)"
          rules={[{ required: true, message: "Vui lòng nhập phiên âm!" }]}
        >
          <Input size="large" placeholder="例: rajio" />
        </Form.Item>

        <Form.Item
          name="name_vi"
          label="Nghĩa tiếng Việt"
          rules={[
            { required: true, message: "Vui lòng nhập nghĩa tiếng Việt!" },
          ]}
        >
          <Input size="large" placeholder="例: Radio" />
        </Form.Item>

        <Form.Item
          name="topic"
          label="Chủ đề"
          rules={[{ required: true, message: "Vui lòng chọn chủ đề!" }]}
        >
          <Select
            size="large"
            placeholder="Chọn chủ đề"
            options={TOPIC_OPTIONS}
          ></Select>
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => {
                setShowCreateModal(false);
                form.resetFields();
              }}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={isCreating}>
              Tạo
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
