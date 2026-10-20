import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface FlyItemData {
  id: string;
  image: string;
  startX: number;
  startY: number;
}

interface FlyToCartAnimationProps {
  items: FlyItemData[];
  onAnimationEnd: (id: string) => void;
}

export const FlyToCartAnimation: React.FC<FlyToCartAnimationProps> = ({
  items,
  onAnimationEnd,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              x: item.startX - 28,
              y: item.startY - 28,
              scale: 1,
              opacity: 1,
              rotate: 0
            }}
            animate={{
              x: window.innerWidth - 65,
              y: 28,
              scale: 0.25,
              opacity: 0.1,
              rotate: 25
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1]
            }}
            onAnimationComplete={() => onAnimationEnd(item.id)}
            className="absolute w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 shadow-2xl bg-white"
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
