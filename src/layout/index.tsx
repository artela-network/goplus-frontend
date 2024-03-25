import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AccountWallet from '../components/AccountWallet';
import Activity from './activity'
import './styles.css'
import { FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <div className='header'>
                <div style={{ fontSize: '35px', margin: '0 0 0 380px' }}>GoPlus</div>
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
                {/* <Header /> */}
                {/* <AccountWallet /> */}
            </div>
            <main className='main_box'>
                <Activity children={children} />
            </main>
            <div className='footer'></div>
        </>

    );

}

export default Layout;
