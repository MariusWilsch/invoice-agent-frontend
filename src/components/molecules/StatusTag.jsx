import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "../../hooks/useTranslations";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const StatusTag = ({ status, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tagRef = useRef(null);
  const popoverRef = useRef(null);
  const t = useTranslations();

  const statusOptions = [
    { value: "unkontiert", label: t.unkontiert },
    { value: "kontiert", label: t.kontiert },
    { value: "bezahlt", label: t.bezahlt },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "unkontiert":
      case "empfangen":
        return "bg-yellow-500 text-white";
      case "kontiert":
        return "bg-green-500 text-white";
      case "bezahlt":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tagRef.current &&
        !tagRef.current.contains(event.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <div
        ref={tagRef}
        className={`${getStatusColor(
          status
        )} px-2 py-1 rounded cursor-pointer transition-all duration-200 hover:opacity-80`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {statusOptions.find((option) => option.value === status)?.label || status}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${
                    option.value === status ? "bg-gray-100" : ""
                  } px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between`}
                  onClick={() => {
                    onStatusChange(option.value);
                    setIsOpen(false);
                  }}
                  role="menuitem"
                >
                  {option.label}
                  {option.value === status && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusTag;