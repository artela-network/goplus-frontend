export const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '20px',
    color: '#ffffff',
    background: '#2172E5',
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
    height: '50px',
    width: '245px',
};
export const buttonDisabledStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '20px', // 稍微减小字体大小，使按钮看起来更加“静态”
    color: '#dddddd', // 改为灰色，表示不可用
    background: '#8fa2bf', // 使用更暗或更灰的背景色来表示按钮不可点击
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
    height: '50px',
    width: '245px',
    cursor: 'not-allowed', // 显示一个不允许的光标，进一步指示按钮不可用
    opacity: '0.6', // 降低透明度，增加不可用的视觉效果
    pointerEvents: 'none', // 确保用户不能点击或以其他方式与按钮交互
};
