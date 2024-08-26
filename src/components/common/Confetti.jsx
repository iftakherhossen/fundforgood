import React, { useEffect, useState } from 'react';

const Confetti = () => {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsActive(false), 6000);
    }, []);

    const confettiPieces = Array.from({ length: 1000 });

    return (
        <div className={`confetti-container ${isActive ? '' : 'hidden'}`}>
        {confettiPieces.map((_, i) => (
            <div
                key={i}
                className="confetti"
                style={{
                    left: `${Math.random() * 100}vw`,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                }}
            />
        ))}
        </div>
    );
};

export default Confetti;