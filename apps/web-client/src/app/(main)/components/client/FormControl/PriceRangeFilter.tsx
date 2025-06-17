'use client';
import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  fromPrice: number;
  toPrice: number;
  onChange: (fromPrice: number, toPrice: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function PriceRangeFilter({
  fromPrice,
  toPrice,
  onChange,
  min = 0,
  max = 10,
  step = 0.1,
}: PriceRangeFilterProps) {
  // Local state for immediate visual updates
  const [localFromPrice, setLocalFromPrice] = useState(fromPrice);
  const [localToPrice, setLocalToPrice] = useState(toPrice);

  // Update local state when props change
  useEffect(() => {
    setLocalFromPrice(fromPrice);
    setLocalToPrice(toPrice);
  }, [fromPrice, toPrice]);

  const handleFromPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const newFromPrice = Math.min(value, localToPrice);
    setLocalFromPrice(newFromPrice);
  };

  const handleToPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const newToPrice = Math.max(value, localFromPrice);
    setLocalToPrice(newToPrice);
  };

  const handleFromPriceEnd = () => {
    onChange(localFromPrice, localToPrice);
  };

  const handleToPriceEnd = () => {
    onChange(localFromPrice, localToPrice);
  };

  // Calculate percentages for positioning
  const fromPercent = ((localFromPrice - min) / (max - min)) * 100;
  const toPercent = ((localToPrice - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">Price Range</h3>
      <div className="relative">
        {/* Track background */}
        <div className="relative h-2 bg-gray-500 rounded-lg">
          {/* Active range highlight */}
          <div
            className="absolute h-2 bg-input rounded-lg"
            style={{
              left: `${fromPercent}%`,
              width: `${toPercent - fromPercent}%`,
            }}
          />
        </div>
        {/* From Price Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localFromPrice}
          onChange={handleFromPriceChange}
          onMouseUp={handleFromPriceEnd}
          onTouchEnd={handleFromPriceEnd}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
        />
        {/* To Price Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localToPrice}
          onChange={handleToPriceChange}
          onMouseUp={handleToPriceEnd}
          onTouchEnd={handleToPriceEnd}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-3">
        <span>{localFromPrice} ETH</span>
        <span>{localToPrice} ETH</span>
      </div>
    </div>
  );
}
