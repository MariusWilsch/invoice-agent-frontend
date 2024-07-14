import React from 'react';
import FormLabel from '../atoms/FormLabel';
import { Slider } from "@/components/ui/slider";

const SliderField = ({ id, label, defaultValue, max, step }) => (
  <div className="flex flex-col mb-4 min-w-[200px]">
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Slider id={id} defaultValue={defaultValue} max={max} step={step} className="mb-4 w-full" />
  </div>
);

export default SliderField;