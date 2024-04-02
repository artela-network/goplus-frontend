import React, { useEffect, useState } from 'react';
import Header from './header/index'
import Activity from './activity/index'
import './styles.css'

const Layout = () => {
    return (
        <>
            {/* <Header/> */}
            <main className='main_box'>
                <Activity />
            </main>
            <div className='footer'>
                
            </div>
        </>

    );

}

export default Layout;
