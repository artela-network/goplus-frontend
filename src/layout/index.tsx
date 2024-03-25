import React, { useEffect, useState } from 'react';
import Header from './header'
import AccountWallet from '../components/AccountWallet';
import Activity from './activity'
import './styles.css'

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <Header/>
            <main className='main_box'>
                <Activity children={children} />
            </main>
            <div className='footer'></div>
        </>

    );

}

export default Layout;
