import React, { useState, useEffect } from 'react';
import { FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';
import Progress from './progress'
import './header.css'
const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        // 监听滚动事件
        window.addEventListener('scroll', handleScroll);

        // 清理函数
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className={`header ${scrolled ? 'scrolled' : ''}`}>
                <Progress />
                <div className='nav'>
                    <div className='icon'>GoPlus</div>
                    <div style={{ marginLeft: '47%', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <a href="" className='link-disabled'>
                            <FaTelegram className='link-icon' style={{ fontSize: '30px', lineHeight: '32px' }} />
                        </a>
                        <a href="" className='link-style'>
                            <FaDiscord className='link-icon' style={{ fontSize: '30px', lineHeight: '32px' }} />
                        </a>
                        <a href="https://twitter.com/Art_inscription" className='link-style'>
                            <FaTwitter className='link-icon' style={{ fontSize: '30px', lineHeight: '32px' }} />
                        </a>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Header;