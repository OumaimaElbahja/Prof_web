'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="fixed h-full inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="flex items-center p-8 rounded-lg opacity-100 justify-center gap-2">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="h-3 w-3 rounded-full bg-primary" // Dark dots for contrast
                        initial={{ x: 0, y: 0 }}
                        animate={{
                            x: [0, 10, -10, 0], // Bounce left and right
                            y: [0, -10, 0], // Slight vertical bounce
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}