import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationComplete) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, rootMargin, animationComplete]);

  const splitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? to.opacity ?? 1 : from.opacity ?? 0,
            transform: isVisible
              ? `translateY(${to.y ?? 0}px) translateX(${to.x ?? 0}px) scale(${to.scale ?? 1}) rotate(${to.rotation ?? 0}deg)`
              : `translateY(${from.y ?? 0}px) translateX(${from.x ?? 0}px) scale(${from.scale ?? 1}) rotate(${from.rotation ?? 0}deg)`,
            transition: `all ${duration}s ${ease} ${index * (delay / 1000)}s`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
          onTransitionEnd={() => {
            if (index === text.length - 1 && isVisible && !animationComplete) {
              setAnimationComplete(true);
              onLetterAnimationComplete?.();
            }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span
          key={index}
          className="inline-block mr-2"
          style={{
            opacity: isVisible ? to.opacity ?? 1 : from.opacity ?? 0,
            transform: isVisible
              ? `translateY(${to.y ?? 0}px) translateX(${to.x ?? 0}px) scale(${to.scale ?? 1}) rotate(${to.rotation ?? 0}deg)`
              : `translateY(${from.y ?? 0}px) translateX(${from.x ?? 0}px) scale(${from.scale ?? 1}) rotate(${from.rotation ?? 0}deg)`,
            transition: `all ${duration}s ${ease} ${index * (delay / 1000)}s`,
          }}
        >
          {word}
        </span>
      ));
    }
    return text;
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        textAlign,
        display: 'inline-block',
        width: '100%',
      }}
    >
      {splitText()}
    </div>
  );
}
