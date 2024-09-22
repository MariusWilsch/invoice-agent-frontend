import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "../../hooks/useTranslations";

const FilterButton = ({ onFilter, onClearFilter, isFilterActive, status, onClick, disabled }) => {
  const t = useTranslations();

  const getButtonText = () => {
    if (isFilterActive) {
      return t.clearFilter;
    }
    if (status) {
      return `${t.filter} ${status}`;
    }
    return t.filter;
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (isFilterActive) {
      onClearFilter();
    } else {
      onFilter();
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={isFilterActive ? "default" : "outline"}
      disabled={disabled}
    >
      {getButtonText()}
    </Button>
  );
};

export default FilterButton;
