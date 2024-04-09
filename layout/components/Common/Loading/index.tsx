import React from 'react';
import { Spin } from 'antd';
const Loading = () => {
    return (
        <div style={{fontSize:'24px'}}>
            <Spin/> queuing...
        </div>
    );
};
export default Loading;
