
import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface CustomSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  markers?: { value: number; label: string }[];
  valueSuffix?: string;
}

export function CustomSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
  markers,
  valueSuffix = ""
}: CustomSliderProps) {
  return (
    <div className={cn("w-full space-y-4", className)}>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([newValue]) => onChange(newValue)}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Range className="absolute h-full bg-eco-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-eco-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-sm border border-eco-primary/20">
            <span className="text-eco-primary font-medium whitespace-nowrap">
              {value}{valueSuffix}
            </span>
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
      
      {markers && (
        <div className="flex justify-between px-2">
          {markers.map((marker, index) => (
            <span key={index} className="text-xs text-gray-500">
              {marker.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
