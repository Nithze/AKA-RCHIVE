import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        gsap.to(cursor, {
          duration: 0.1,
          x: e.pageX - 10,
          y: e.pageY - 10,
        });
      }
    };

    const handleClick = () => {
      setExpand(true);
      gsap.to(cursorRef.current, {
        duration: 0.2,
        scale: 3,
        borderColor: 'red',
        onComplete: () => {
          setExpand(false);
          gsap.to(cursorRef.current, {
            duration: 0.2,
            scale: 1,
            borderColor: 'white',
          });
        },
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor`}
    ></div>
  );
};

export default CustomCursor;

