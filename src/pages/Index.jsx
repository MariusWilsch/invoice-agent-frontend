import React, { useState, useEffect } from "react";
import {
  File,
  ListFilter,
  MoreVertical,
  PlusCircle,
  FileText,
  Eye,
  Trash,
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
import { useSupabase } from "@/integrations/supabase/index.js";
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
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
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
        <Drawer open={!!selectedInvoice} onOpenChange={(isOpen) => { if (!isOpen) setSelectedInvoice(null); }}>
          <DrawerContent side="right">
            <div className="p-4">
              <div className="font-semibold text-lg mb-4">Invoice Information</div>
              <div className="grid gap-3">
                <div className="font-semibold">Invoice Details</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Eingegangen_am</dt>
                    <dd>{selectedInvoice.eingegangen_am || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Konto</dt>
                    <dd>{selectedInvoice.konto || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Ev/Vp</dt>
                    <dd>{selectedInvoice.ev_vp || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Belegtext</dt>
                    <dd>{selectedInvoice.belegtext || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Kommentar</dt>
                    <dd>{selectedInvoice.kommentar || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Fällig_am</dt>
                    <dd>{selectedInvoice.fällig_am || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Gebucht</dt>
                    <dd>{selectedInvoice.gebucht || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Skonto</dt>
                    <dd>{selectedInvoice.skonto || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Kostenstelle</dt>
                    <dd>{selectedInvoice.kostenstelle || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">VB</dt>
                    <dd>{selectedInvoice.vb || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">wer_geprüft</dt>
                    <dd>{selectedInvoice.wer_geprüft || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">wer_bezahlt</dt>
                    <dd>{selectedInvoice.wer_bezahlt || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Status</dt>
                    <dd>{selectedInvoice.status || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Amount</dt>
                    <dd>{selectedInvoice.amount || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Sender</dt>
                    <dd>{selectedInvoice.sender || "None"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email_body</dt>
                    <dd>{selectedInvoice.email_body || "None"}</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={() => setSelectedInvoice(null)}>Close</Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Index;