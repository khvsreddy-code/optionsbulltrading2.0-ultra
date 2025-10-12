import React, { useEffect, useRef } from 'react';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;

interface ConfettiProps {
  trigger: number;
}

const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger > 0 && containerRef.current) {
      const container = containerRef.current;
      container.innerHTML = ''; // Clear previous confetti
      const confettiCount = 100;
      const colors = ['#53AC53', '#F59E0B', '#3B82F6', '#EC4899']; // Primary, Yellow, Blue, Pink

      const pieces = [];
      for (let i = 0; i < confettiCount; i++) {
        const piece = document.createElement('div');
        piece.style.position = 'absolute';
        piece.style.width = `${anime.random(5, 15)}px`;
        piece.style.height = `${anime.random(8, 20)}px`;
        piece.style.backgroundColor = colors[anime.random(0, colors.length - 1)];
        piece.style.left = '50%';
        piece.style.top = '50%';
        container.appendChild(piece);
        pieces.push(piece);
      }

      anime({
        targets: pieces,
        translateX: () => anime.random(-window.innerWidth / 2.5, window.innerWidth / 2.5),
        translateY: () => anime.random(-window.innerHeight / 2, window.innerHeight / 2),
        rotate: () => anime.random(0, 360),
        scale: [
            { value: 0, duration: 0 },
            { value: 1.2, duration: 200, easing: 'easeOutQuad' },
            { value: 1, duration: 800 }
        ],
        opacity: [
            { value: 1, duration: 200 },
            { value: 0, duration: 1000, delay: 1500, easing: 'easeInExpo' }
        ],
        delay: anime.stagger(5),
        complete: () => {
          container.innerHTML = ''; // Clean up DOM after animation
        }
      });
    }
  }, [trigger]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

export default Confetti;