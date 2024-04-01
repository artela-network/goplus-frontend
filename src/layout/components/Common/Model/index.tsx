import React from 'react';

// 定义Props的接口
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void; // onClose是一个没有参数且没有返回值的函数
  children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      zIndex: 100,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.7)', // 更深的背景色，适合暗色主题
      display: 'flex', // 用flex布局以便于居中
      justifyContent: 'center', // 水平居中
      alignItems: 'center', // 垂直居中
    }}>
      <div style={{
        backgroundColor: '#333', // 暗色背景
        color: '#fff', // 文字用亮色以便于阅读
        margin: 'auto',
        padding: '20px',
        border: '1px solid #555', // 暗色边框
        width: '50%', // 根据需求调整宽度
        maxWidth: '600px', // 避免在大屏幕上过宽
        borderRadius: '10px', // 可选：添加圆角
      }}>
        <div>
          {children}
        </div>
        <button onClick={onClose} style={{
          backgroundColor: '#555', // 按钮暗色背景
          color: '#fff', // 按钮亮色文字
          padding: '10px 20px', // 按钮内边距
          border: 'none', // 去除边框
          cursor: 'pointer', // 鼠标指针形状
          borderRadius: '5px', // 可选：按钮圆角
        }}>Close</button>
      </div>
    </div>
  );
};

export default CustomModal;
