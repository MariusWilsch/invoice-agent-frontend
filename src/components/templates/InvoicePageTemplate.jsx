import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Button from '../atoms/Button';
import { ListFilter } from "lucide-react";
import InvoiceCard from '../organisms/InvoiceCard';

const InvoicePageTemplate = ({ invoices, statuses, onViewDetails, onDelete, onStamp }) => (
  <div className="p-4">
    <Tabs defaultValue="all">
      <div className="flex items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {statuses.map((status) => (
            <TabsTrigger key={status} value={status.toLowerCase()}>
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 gap-1 opacity-50 cursor-not-allowed" 
                disabled={true}
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statuses.map((status) => (
                <DropdownMenuCheckboxItem key={status}>
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent value="all">
        <InvoiceCard
          title="Invoices"
          description="Manage your invoices and view their details."
          invoices={invoices}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
          onStamp={onStamp}
        />
      </TabsContent>
      {statuses.map((status) => (
        <TabsContent key={status} value={status.toLowerCase()}>
          <InvoiceCard
            title={`${status} Invoices`}
            description={`Manage your ${status.toLowerCase()} invoices and view their details.`}
            invoices={invoices.filter((invoice) => invoice.status === status)}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onStamp={onStamp}
          />
        </TabsContent>
      ))}
    </Tabs>
  </div>
);

export default InvoicePageTemplate;