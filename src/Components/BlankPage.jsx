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
        <div className={`blank-page ${isVisible ? 'active' : ''}`}>
            <i className='bx bx-cog icon blank-gear' style={{ color: "#ff0000" }}></i>

             This view is optimized for larger screens. Please try on a desktop!
        </div>
    );
};

export default BlankPage;

