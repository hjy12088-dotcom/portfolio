import React from 'react';
import { motion } from 'framer-motion';

const Block = ({ x, y, width, height, color, children, className, style, onClick, id }) => {
    return (
        <motion.div
            id={id}
            className={`pop-block ${className || ''}`}
            onClick={onClick}
            initial={{ rotate: 0, scale: 1 }}
            whileHover={{
                y: -5, // Slight elevation
                rotate: 1.5, // Subtle rotation
                zIndex: 10,
                boxShadow: '12px 12px 0px rgba(0,0,0,1)', // Deeper shadow
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: color,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundSize: '8px 8px',
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                boxShadow: '8px 8px 0px rgba(0,0,0,1)',
                border: '3px solid black',
                ...style
            }}
        >
            {children}
        </motion.div>
    );
};

export default Block;
