import React, { useState } from 'react';
import SidePanel from './SidePanel';
import Display from './Display';
import TextToTranslate from './TextToTranslate';

const App = () => {
    const [displayText, setDisplayText] = useState('');
    const [adjustments, setAdjustments] = useState({});

    const updateText = (newText) => {
        setDisplayText(newText);
    };

    const handleAdjustments = (newAdjustments) => {
        setAdjustments(prev => ({ ...prev, ...newAdjustments }));
    };

    return (
        <div className="flex">
            <SidePanel handleAdjustments={handleAdjustments} />
            <TextToTranslate updateText={updateText} />
            <Display text={displayText} adjustments={adjustments} />
        </div>
    );
};

export default App;
