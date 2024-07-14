import React, { useState } from 'react';
import FormLabel from '../atoms/FormLabel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SelectField = ({ id, label, options, onCreateOption }) => {
  const [inputValue, setInputValue] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCreateOption = () => {
    if (inputValue.trim()) {
      onCreateOption(inputValue.trim());
      setInputValue('');
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col mb-4 min-w-[200px]">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select onOpenChange={(open) => !open && setIsCreating(false)}>
        <SelectTrigger id={id} className="mb-4 w-full">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
          ))}
          {!isCreating && (
            <SelectItem value="__create__" onSelect={() => setIsCreating(true)}>
              Create new option...
            </SelectItem>
          )}
          {isCreating && (
            <div className="p-2">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type new option..."
                className="mb-2"
              />
              <Button onClick={handleCreateOption} className="w-full">
                Create "{inputValue}"
              </Button>
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;