import React from 'react';
import { FileText, Eye, Trash, Stamp } from "lucide-react";
import Button from '../atoms/Button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const ActionButton = ({ icon: Icon, tooltip, onClick }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm" onClick={onClick}>
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ActionButtons = ({ invoice, onViewDetails, onDelete, onStamp }) => (
  <div className="flex space-x-2">
    <ActionButton
      icon={FileText}
      tooltip="PDF"
      onClick={() => window.open(invoice.public_url, "_blank")}
    />
    <ActionButton
      icon={Eye}
      tooltip="View"
      onClick={() => onViewDetails(invoice)}
    />
    <ActionButton
      icon={Trash}
      tooltip="Delete"
      onClick={() => onDelete(invoice.id)}
    />
    <ActionButton
      icon={Stamp}
      tooltip="Stamp"
      onClick={onStamp}
    />
  </div>
);

export default ActionButtons;