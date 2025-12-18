import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BLOCK_COLORS = [
    'var(--color-accent-1)', // Red
    'var(--color-accent-2)', // Blue
    'var(--color-accent-3)', // Yellow
    '#000000',               // Black
    'transparent'            // Outlined only
];

const FallingBlock = ({ id }) => {
    // Random properties
    const size = Math.random() * 60 + 20; // 20px - 80px
    const startX = Math.random() * 100; // 0% - 100%
    const duration = Math.random() * 10 + 10; // 10s - 20s (Slow fall)
    const delay = Math.random() * 10;
    const isOutlined = Math.random() > 0.6;
    const color = BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
    const rotateEnd = Math.random() * 360;

    return (
        <motion.div
            initial={{ y: -100, x: `${startX}vw`, rotate: 0, opacity: 0 }}
            animate={{
                y: '110vh',
                rotate: rotateEnd,
                opacity: [0, 1, 1, 0] // Fade in -> Fall -> Fade out
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "linear",
                repeat: Infinity
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: size,
                height: size,
                backgroundColor: isOutlined ? 'transparent' : color,
                border: `2px solid ${isOutlined ? 'var(--color-text-muted)' : 'black'}`,
                zIndex: -1, // Behind content
                pointerEvents: 'none'
            }}
        />
    );
};

const FallingBlocksBackground = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        // Generate initial set of blocks
        const blockCount = 15;
        const newBlocks = Array.from({ length: blockCount }).map((_, i) => i);
        setBlocks(newBlocks);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {blocks.map(id => <FallingBlock key={id} id={id} />)}
        </div>
    );
};

export default FallingBlocksBackground;
