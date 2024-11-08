import { useState } from 'react';
import { Tooltip } from './Tooltip';

interface TruncatedFieldProps {
  text: string;
  type: 'name' | 'position' | 'email' | 'phone' | 'address';
  maxWidth?: number;
}

export function TruncatedField({ text, type, maxWidth }: TruncatedFieldProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getMaxWidth = () => {
    switch (type) {
      case 'name':
        return maxWidth || 120;
      case 'position':
        return maxWidth || 150;
      case 'email':
        return maxWidth || 200;
      case 'phone':
        return maxWidth || 120;
      case 'address':
        return maxWidth || 200;
      default:
        return maxWidth || 150;
    }
  };

  return (
    <span className="relative inline-block">
      <span
        className="truncate inline-block align-bottom cursor-pointer"
        style={{ maxWidth: `${getMaxWidth()}px` }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {text}
      </span>
      {showTooltip && (
        <Tooltip text={text} />
      )}
    </span>
  );
}