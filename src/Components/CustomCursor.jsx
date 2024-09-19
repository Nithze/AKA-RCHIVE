
import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);  // Ref untuk elemen kursor
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        // Menggunakan requestAnimationFrame untuk menggerakkan kursor
        requestAnimationFrame(() => {
          cursor.style.top = `${e.pageY - 10}px`;
          cursor.style.left = `${e.pageX - 10}px`;
        });
      }
    };

    const handleClick = () => {
      setExpand(true);
      setTimeout(() => setExpand(false), 500);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${expand ? 'expand' : ''}`}
      ></div>
    </>
  );
};

export default CustomCursor;

