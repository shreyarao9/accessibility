import React from 'react';
import TTL from './TTL';
import Dyslexia from './Dyslexia';

const SidePanel = ({ handleAdjustments }) => {
    return (
        <div className="bg-gray-200 w-64 p-4">
            <h2 className="font-bold mb-4">Settings</h2>
            <TTL handleAdjustments={handleAdjustments} />
            <Dyslexia handleAdjustments={handleAdjustments} />
        </div>
    );
};

export default SidePanel;
