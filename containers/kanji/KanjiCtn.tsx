"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Card, Space } from "antd";
import { ClearOutlined } from "@ant-design/icons";

export default function KanjiCtn() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas resolution for crisp lines
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#222"; // Dark ink color
        ctx.lineWidth = 12; // Thick brush-like stroke
        setContext(ctx);
      }
    }
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return null;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent scrolling when touching the canvas on mobile
    if ("touches" in e) {
      // We can't preventDefault on touch events directly if they are passive, 
      // but React touch events are generally non-passive unless specified.
    }
    const coords = getCoordinates(e);
    if (!coords || !context) return;
    
    context.beginPath();
    context.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    
    const coords = getCoordinates(e);
    if (!coords) return;
    
    context.lineTo(coords.x, coords.y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      const canvas = canvasRef.current;
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6 w-full">
          <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
            <h1 className="text-3xl font-bold m-0 flex items-center justify-center gap-2 text-gray-800 dark:text-gray-100">
              <span>✍️</span> Luyện Viết Kanji
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sử dụng bảng bên dưới để luyện viết chữ Hán tự do
            </p>
          </Card>
        </div>

        {/* Drawing Area */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center border border-gray-100 dark:border-gray-700">
          {/* Controls */}
          <div className="w-full flex justify-end mb-4">
            <Space>
              <Button
                type="primary"
                danger
                icon={<ClearOutlined />}
                onClick={clearCanvas}
                size="large"
                className="font-semibold shadow-sm hover:shadow-md transition-shadow"
              >
                Xóa bảng
              </Button>
            </Space>
          </div>

          {/* Canvas Wrapper with Grid */}
          <div 
            className="relative bg-white border-4 border-red-500 rounded shadow-inner select-none overflow-hidden"
            style={{ width: "320px", height: "320px", touchAction: "none" }}
          >
            {/* Grid Background (ô ly) */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Vertical Center Line */}
              <div className="absolute inset-0 flex justify-center">
                <div className="w-px h-full border-l-2 border-dashed border-red-300 opacity-60"></div>
              </div>
              {/* Horizontal Center Line */}
              <div className="absolute inset-0 flex flex-col justify-center">
                <div className="h-px w-full border-t-2 border-dashed border-red-300 opacity-60"></div>
              </div>
            </div>

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", cursor: "crosshair" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onTouchCancel={stopDrawing}
            />
          </div>
          
          <div className="mt-6 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm text-center max-w-sm">
            💡 Dùng chuột hoặc chạm vào màn hình để vẽ. Đường kẻ gạch chéo giúp căn chỉnh tỷ lệ các nét chữ tốt hơn.
          </div>
        </div>
      </div>
    </div>
  );
}
