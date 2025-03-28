"use client";
import React from 'react';
import { BoxState } from '@/types';

interface BoxProps {
  state: BoxState;
  onClick: () => void;
  disabled: boolean;
}

const Box: React.FC<BoxProps> = ({ state, onClick, disabled }) => {
  const getColorClass = () => {
    switch (state) {
      case BoxState.RED:
        return 'bg-red-400';
      case BoxState.BLUE:
        return 'bg-blue-400';
      default:
        return 'bg-gray-200 hover:bg-gray-300';
    }
  };
  
  return (
    <button
      className={`w-full h-16 md:h-20 ${getColorClass()} rounded-md transition-colors duration-200`}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Box;