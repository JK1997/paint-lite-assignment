import React from 'react';

interface ColorTagProps {
  color: string;
}

const ColorTag: React.FC<ColorTagProps> = ({ color }) => {
  return (
    <span
      className="w-4 h-4 inline-block rounded border"
      style={{ backgroundColor: color }}
    ></span>
  );
};

export default ColorTag;