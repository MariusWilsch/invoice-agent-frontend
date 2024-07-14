import React from 'react';
import FormLabel from '../atoms/FormLabel';
import { Slider } from "@/components/ui/slider";

const SliderField = ({ id, label, defaultValue, max, step }) => (
  <div className="flex flex-col mb-4 min-w-[200px]">
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <div className="flex items-center justify-center space-x-2">
      <span className="text-sm font-medium">%</span>
      <Slider id={id} defaultValue={defaultValue} max={max} step={step} className="w-full" />
    </div>
  </div>
);

export default SliderField;