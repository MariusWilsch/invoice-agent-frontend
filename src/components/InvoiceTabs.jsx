import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ListFilter, File, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import InvoiceTable from "./InvoiceTable";

const InvoiceTabs = ({
  invoices,
  statuses,
  onViewDetails,
  onStampClick,
  onExportJSON,
}) => {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
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
              <Button variant="outline" size="sm" className="h-8 gap-1">
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
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1"
            onClick={onExportJSON}
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export JSON
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Invoice
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <InvoiceTable
          invoices={invoices}
          onViewDetails={onViewDetails}
          onStampClick={onStampClick}
        />
      </TabsContent>
      {statuses.map((status) => (
        <TabsContent key={status} value={status.toLowerCase()}>
          <InvoiceTable
            invoices={invoices.filter((invoice) => invoice.status === status)}
            onViewDetails={onViewDetails}
            onStampClick={onStampClick}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default InvoiceTabs;