import React, { useState } from 'react';
import { Button } from 'antd';
const CryptoFraudSummary = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <p>According to CipherTrace, rug pulls accounted for 99% of all crypto frauds in 2023, totaling $2.1 billion in losses.</p>
            {isExpanded && (
                <div>
                    <p>Faced with the Damocles sword hanging over everyone's head, who will be there to protect our security?</p>
                    <p>Artela & Goplus provide a new solution: An on-chain risk control module that can identify rug-pull transactions and block them in real time.</p>
                </div>
            )}
            <a type='link' onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Read less...' : 'Read more...'}
            </a>
        </div>
    );
};

export default CryptoFraudSummary;
