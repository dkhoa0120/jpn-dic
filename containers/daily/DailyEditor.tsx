"use client";

import { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
  Modal,
  Card,
  Space,
  Tag,
  message,
  Form,
  Row,
  Col,
} from "antd";
import type { TextAreaRef } from "antd/es/input/TextArea";
import {
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  BookOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Daily, VocabularyNote } from "@/common/types/daily";
import { useDailies } from "@/service/useDailies";

const { TextArea } = Input;

interface Props {
  daily: Daily;
}

interface Selection {
  text: string;
  position: number;
  length: number;
}

interface TooltipPosition {
  top: number;
  left: number;
}

export default function DailyEditor({ daily }: Props) {
  const { updateDaily } = useDailies();
  const [form] = Form.useForm();
  const [title, setTitle] = useState(daily.title);
  const [content, setContent] = useState(daily.content);
  const [vocabularyNotes, setVocabularyNotes] = useState<VocabularyNote[]>(
    daily.vocabulary_notes || [],
  );
  const [selectedText, setSelectedText] = useState<Selection | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showVocabDetailModal, setShowVocabDetailModal] = useState(false);
  const [activeNote, setActiveNote] = useState<{
    note: VocabularyNote;
    index: number;
    position: TooltipPosition;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<TextAreaRef>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle text selection - FIXED for mobile
  const handleTextSelection = () => {
    if (!contentRef.current?.resizableTextArea?.textArea) return;

    const textarea = contentRef.current.resizableTextArea.textArea;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      setSelectedText(null);
      return;
    }

    const text = content.substring(start, end).trim();
    if (!text) return;

    setSelectedText({
      text,
      position: start,
      length: text.length,
    });

    // On mobile, auto open add note modal
    if (isMobile && selectedText !== null) {
      // Small delay to ensure selection is complete
      setTimeout(() => {
        setShowNoteModal(true);
      }, 100);
    }
  };

  // NEW: Handle touch end for mobile
  const handleTouchEnd = () => {
    // Use setTimeout to allow selection to complete
    setTimeout(() => {
      handleTextSelection();
    }, 100);
  };

  // Add vocabulary note
  const handleAddNote = (values: { reading: string; meaning: string }) => {
    if (!selectedText) return;

    const newNote: VocabularyNote = {
      word: selectedText.text,
      reading: values.reading,
      meaning: values.meaning,
      position: selectedText.position,
      length: selectedText.length,
    };

    setVocabularyNotes(
      [...vocabularyNotes, newNote].sort((a, b) => a.position - b.position),
    );
    message.success("Đã thêm note cho từ vựng!");
    setShowNoteModal(false);
    form.resetFields();
    setSelectedText(null);
  };

  // Remove vocabulary note
  const handleRemoveNote = (index: number) => {
    Modal.confirm({
      title: "Xóa note từ vựng?",
      content: `Bạn có chắc muốn xóa note cho từ "${vocabularyNotes[index].word}"?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: () => {
        setVocabularyNotes(vocabularyNotes.filter((_, i) => i !== index));
        setActiveNote(null);
        setShowVocabDetailModal(false);
        message.success("Đã xóa note!");
      },
    });
  };

  // Handle click on vocabulary highlight
  const handleVocabClick = (
    e: React.MouseEvent | React.TouchEvent,
    index: number,
  ) => {
    const note = vocabularyNotes[index];

    if (isMobile) {
      // Mobile: Show modal
      setActiveNote({
        note,
        index,
        position: { top: 0, left: 0 },
      });
      setShowVocabDetailModal(true);
    } else {
      // Desktop: Show tooltip
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const previewRect = previewRef.current?.getBoundingClientRect();

      if (!previewRect) return;

      const top = rect.top - previewRect.top - 10;
      const left = rect.left - previewRect.left + rect.width / 2;

      // Toggle: if clicking the same word, close tooltip
      if (activeNote?.index === index) {
        setActiveNote(null);
      } else {
        setActiveNote({
          note,
          index,
          position: { top, left },
        });
      }
    }
  };

  // Render content with highlights
  const renderContentWithHighlights = () => {
    // Sort DESC để replace từ cuối lên đầu (tránh position shift)
    const sortedNotes = [...vocabularyNotes].sort(
      (a, b) => b.position - a.position,
    );

    // Create index map to track original position
    const indexMap = new Map();
    vocabularyNotes.forEach((note, idx) => {
      indexMap.set(note, idx);
    });

    console.log("vocabularyNotes", vocabularyNotes);
    console.log("map", indexMap);

    let result = content;

    sortedNotes.forEach((note) => {
      const originalIndex = indexMap.get(note); // Get correct index

      const before = result.substring(0, note.position);
      const word = result.substring(note.position, note.position + note.length);
      const after = result.substring(note.position + note.length);

      result = `${before}<span 
      class="vocab-highlight" 
      data-index="${originalIndex}"
    >${word}</span>${after}`;
    });

    return result;
  };
  // Save daily
  const handleSave = async () => {
    if (!title.trim()) {
      message.error("Vui lòng nhập tiêu đề!");
      return;
    }

    if (!content.trim()) {
      message.error("Vui lòng nhập nội dung!");
      return;
    }

    setLoading(true);
    try {
      await updateDaily(daily.id, {
        title,
        content,
        vocabulary_notes: vocabularyNotes,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAddNote = () => {
    setShowNoteModal(false);
    form.resetFields();
    setSelectedText(null);

    // Clear textarea selection
    if (contentRef.current?.resizableTextArea?.textArea) {
      const textarea = contentRef.current.resizableTextArea.textArea;
      textarea.blur();
      textarea.setSelectionRange(0, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <Space>
            <BookOutlined className="text-2xl text-blue-600" />
            <h1 className="text-3xl font-bold m-0">Daily Editor</h1>
          </Space>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={loading}
          >
            Lưu
          </Button>
        </div>
      </Card>

      {/* Title Input */}
      <Card className="mb-6">
        <Space direction="vertical" style={{ width: "100%" }}>
          <label className="font-semibold">Tiêu đề</label>
          <Input
            size="large"
            placeholder="Nhập tiêu đề..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Space>
      </Card>

      {/* Content Editor */}
      <Row gutter={16}>
        {/* Editor */}
        <Col xs={24} lg={12}>
          <Card
            title="Nội dung (chọn từ để thêm note)"
            extra={<Tag color="blue">{vocabularyNotes.length} từ vựng</Tag>}
          >
            <TextArea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onMouseUp={handleTextSelection}
              onTouchEnd={handleTouchEnd} // FIXED: Added touch support
              placeholder="Nhập nội dung..."
              rows={25}
              style={{ fontFamily: "monospace" }}
            />

            {/* Selection Actions - Always visible on mobile */}
            {selectedText && !isMobile && (
              <Card
                size="small"
                className="mt-4"
                style={{
                  backgroundColor: "#e6f4ff",
                  borderColor: "#1677ff",
                }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    Đã chọn:{" "}
                    <Tag color="blue" className="font-bold">
                      {selectedText.text}
                    </Tag>
                  </div>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowNoteModal(true)}
                    block
                  >
                    Thêm note cho từ này
                  </Button>
                </Space>
              </Card>
            )}
          </Card>
        </Col>

        {/* Preview */}
        <Col xs={24} lg={12}>
          <Card title="Preview (click vào từ để xem note)">
            <div
              ref={previewRef}
              className="preview-content"
              style={{
                height: "600px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                lineHeight: "1.8",
                fontSize: "16px",
                position: "relative",
              }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains("vocab-highlight")) {
                  const index = parseInt(target.dataset.index || "0");
                  handleVocabClick(e, index);
                } else {
                  // Click outside vocabulary word, close tooltip (desktop only)
                  if (!isMobile) {
                    setActiveNote(null);
                  }
                }
              }}
              onTouchEnd={(e) => {
                // FIXED: Added touch support for preview
                const target = e.target as HTMLElement;
                if (target.classList.contains("vocab-highlight")) {
                  const index = parseInt(target.dataset.index || "0");
                  handleVocabClick(e, index);
                }
              }}
              dangerouslySetInnerHTML={{
                __html: renderContentWithHighlights(),
              }}
            />

            {/* Desktop Tooltip */}
            {!isMobile && activeNote && (
              <div
                className="vocab-tooltip"
                style={{
                  position: "absolute",
                  top: `${activeNote.position.top}px`,
                  left: `${activeNote.position.left}px`,
                  transform: "translate(-50%, -100%)",
                  zIndex: 1000,
                }}
              >
                <div className="vocab-tooltip-content">
                  <div className="vocab-tooltip-header">
                    <h3 className="vocab-tooltip-word">
                      {activeNote.note.word}
                    </h3>
                    <Button
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveNote(null);
                      }}
                      className="vocab-tooltip-close"
                    />
                  </div>
                  <p className="vocab-tooltip-reading">
                    {activeNote.note.reading}
                  </p>
                  <p className="vocab-tooltip-meaning">
                    {activeNote.note.meaning}
                  </p>
                  <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNote(activeNote.index);
                    }}
                    block
                  >
                    Xóa note
                  </Button>
                </div>
                <div className="vocab-tooltip-arrow"></div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Mobile: Add Note Modal (auto-open on selection) */}
      <Modal
        title={`Thêm note cho: ${selectedText?.text || ""}`}
        open={showNoteModal}
        onCancel={() => {
          setShowNoteModal(false);
          form.resetFields();
          setSelectedText(null);
        }}
        footer={null}
        width={isMobile ? "95%" : 500}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddNote}>
          <Form.Item
            name="reading"
            label="Cách đọc / ngữ pháp"
            rules={[{ required: true, message: "Vui lòng nhập cách đọc!" }]}
          >
            <Input
              size="large"
              placeholder="Nhập cách đọc / ngữ pháp..."
              autoFocus={!isMobile} // Disable autofocus on mobile to prevent keyboard issues
            />
          </Form.Item>

          <Form.Item
            name="meaning"
            label="Nghĩa"
            rules={[{ required: true, message: "Vui lòng nhập nghĩa!" }]}
          >
            <Input size="large" placeholder="Nhập nghĩa..." />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleCancelAddNote}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Mobile: Vocabulary Detail Modal (instead of tooltip) */}
      <Modal
        title="Chi tiết từ vựng"
        open={isMobile && showVocabDetailModal}
        onCancel={() => {
          setShowVocabDetailModal(false);
          setActiveNote(null);
        }}
        footer={null}
        width="95%"
        destroyOnClose
      >
        {activeNote && (
          <div className="vocab-detail-mobile">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-blue-600 m-0 mb-2">
                {activeNote.note.word}
              </h2>
              <p className="text-xl text-gray-700 mb-2">
                {activeNote.note.reading}
              </p>
              <p className="text-base text-gray-600 mb-4">
                {activeNote.note.meaning}
              </p>
            </div>
            <Button
              danger
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveNote(activeNote.index)}
              block
            >
              Xóa note này
            </Button>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        .vocab-highlight {
          background-color: #fef3c7;
          border-bottom: 2px solid #f59e0b;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          padding: 2px 4px;
          border-radius: 4px;
          user-select: none;
          -webkit-user-select: none; /* Safari */
          -webkit-tap-highlight-color: transparent; /* Remove tap highlight on iOS */
        }

        .vocab-highlight:hover {
          background-color: #fde68a;
          transform: scale(1.02);
        }

        .vocab-highlight.active {
          background-color: #fed7aa;
          border-bottom: 3px solid #f59e0b;
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
        }

        /* Modern Tooltip Styles (Desktop only) */
        .vocab-tooltip {
          animation: tooltipFadeIn 0.2s ease-out;
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15));
        }

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, calc(-100% - 10px));
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%);
          }
        }

        .vocab-tooltip-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 16px;
          min-width: 280px;
          max-width: 360px;
          color: white;
          margin-bottom: 8px;
          backdrop-filter: blur(10px);
        }

        .vocab-tooltip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .vocab-tooltip-word {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          color: white;
          line-height: 1.2;
          flex: 1;
        }

        .vocab-tooltip-close {
          color: white !important;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .vocab-tooltip-close:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1) !important;
        }

        .vocab-tooltip-reading {
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 8px 0;
          color: rgba(255, 255, 255, 0.95);
        }

        .vocab-tooltip-meaning {
          font-size: 15px;
          margin: 0 0 16px 0;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
        }

        .vocab-tooltip button.ant-btn-dangerous {
          background: rgba(255, 77, 79, 0.9);
          border: none;
          color: white;
          font-weight: 600;
          transition: all 0.2s;
        }

        .vocab-tooltip button.ant-btn-dangerous:hover {
          background: rgba(255, 77, 79, 1);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 77, 79, 0.4);
        }

        .vocab-tooltip-arrow {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #667eea;
          position: absolute;
          left: 50%;
          bottom: -2px;
          transform: translateX(-50%);
        }

        /* Mobile Styles */
        .vocab-detail-mobile {
          padding: 8px;
        }

        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .preview-content {
            -webkit-overflow-scrolling: touch;
          }

          textarea {
            font-size: 16px; /* Prevent zoom on focus in iOS */
          }
        }

        /* Dark mode support */
        .dark .vocab-highlight {
          background-color: #78350f;
          border-bottom-color: #fbbf24;
          color: #fef3c7;
        }

        .dark .vocab-highlight:hover {
          background-color: #92400e;
        }

        .dark .vocab-highlight.active {
          background-color: #a16207;
          border-bottom-color: #fbbf24;
        }

        .dark .vocab-tooltip-content {
          background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%);
        }

        .dark .vocab-tooltip-arrow {
          border-top-color: #4c1d95;
        }
      `}</style>
    </div>
  );
}
