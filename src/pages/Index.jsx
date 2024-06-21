import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import {
  File,
  ListFilter,
  MoreVertical,
  PlusCircle,
  FileText,
  Eye,
  Trash,
  Stamp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInvoicesDev } from "@/integrations/supabase/index.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import StampSheet from "@/components/StampSheet";
import InvoiceDrawer from "@/components/InvoiceDrawer";

// Define a function to get the color variant based on the status
const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Draft":
      return "warning";
    case "Archived":
      return "secondary";
    default:
      return "default";
  }
};

const Index = () => {
  const { data: invoices, error, isLoading } = useInvoicesDev();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [isStampSheetOpen, setIsStampSheetOpen] = useState(false);

  useEffect(() => {
    if (invoices) {
      const uniqueStatuses = Array.from(new Set(invoices.map(invoice => invoice.status)));
      setStatuses(uniqueStatuses);
    }
  }, [invoices]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices: {error.message}</div>;

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDrawerOpenChange = (isOpen) => {
    if (!isOpen) {
      document.body.style.pointerEvents = "";
    }
  };

  const handleExportJSON = () => {
    const visibleInvoices = invoices.filter(invoice => statuses.includes(invoice.status));
    const blob = new Blob([JSON.stringify(visibleInvoices, null, 2)], { type: 'application/json' });
    saveAs(blob, 'invoices.json');
  };

  const handleStampClick = () => {
    setIsStampSheetOpen(true);
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {statuses.map(status => (
              <TabsTrigger key={status} value={status.toLowerCase()}>{status}</TabsTrigger>
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
                {statuses.map(status => (
                  <DropdownMenuCheckboxItem key={status}>
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExportJSON}>
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
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                Manage your invoices and view their details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.sender}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(invoice.public_url, '_blank')}>
                              <FileText className="mr-2 h-4 w-4" />
                              PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDetails(invoice)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleStampClick}>
                              <Stamp className="mr-2 h-4 w-4" />
                              Stamp
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{invoices.length}</strong> invoices
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      {statuses.map(status => (
          <TabsContent key={status} value={status.toLowerCase()}>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>{status} Invoices</CardTitle>
                <CardDescription>
                  Manage your {status.toLowerCase()} invoices and view their details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sender</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.filter(invoice => invoice.status === status).map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.sender}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => window.open(invoice.public_url, '_blank')}>
                                <FileText className="mr-2 h-4 w-4" />
                                PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewDetails(invoice)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={handleStampClick}>
                                <Stamp className="mr-2 h-4 w-4" />
                                Stamp
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{invoices.filter(invoice => invoice.status === status).length}</strong> {status.toLowerCase()} invoices
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {selectedInvoice && (
        <InvoiceDrawer selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} />
      )}

      <StampSheet isOpen={isStampSheetOpen} onOpenChange={setIsStampSheetOpen} />
    </div>
  );
};

export default Index;