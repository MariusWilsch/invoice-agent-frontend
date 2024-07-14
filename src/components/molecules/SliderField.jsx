import React, { useState } from 'react';
import FormLabel from '../atoms/FormLabel';
import { Slider } from "@/components/ui/slider";

const SliderField = ({ id, label }) => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col mb-4 min-w-[200px]">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <div className="flex items-center justify-center space-x-4">
        <Slider
          id={id}
          min={0}
          max={40}
          step={5}
          value={[value]}
          onValueChange={(newValue) => setValue(newValue[0])}
          className="w-full"
        />
        <span className="text-sm font-medium w-12 text-right">{value}%</span>
      </div>
    </div>
  );
};

export default SliderField;