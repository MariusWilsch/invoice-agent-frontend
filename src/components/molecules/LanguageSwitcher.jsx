import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from 'lucide-react';

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 px-3 border">
          <span className="mr-1">{currentLanguage === 'de' ? '🇩🇪' : '🇬🇧'}</span>
          {currentLanguage === 'de' ? 'DE' : 'EN'}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => onLanguageChange(lang.code)}
          >
            <span className="mr-2">{lang.code === 'de' ? '🇩🇪' : '🇬🇧'}</span>
            {lang.name}
            {currentLanguage === lang.code && (
              <Check className="ml-2 h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
