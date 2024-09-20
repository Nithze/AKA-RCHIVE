import React, { useEffect, useState } from 'react';
import './BlankPage.scss';

const BlankPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth < 1024);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`blank-page ${isVisible ? 'active' : ''}`}></div>
    );
};

export default BlankPage;

