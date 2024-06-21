import React, { useState } from "react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices: {error.message}</div>;

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setTimeout(() => (document.body.style.pointerEvents = ""), 500);
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
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
      </Tabs>

      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invoice Details</DialogTitle>
            </DialogHeader>
            <Card>
              <CardHeader>
                <CardTitle>Invoice Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {selectedInvoice.id}</p>
                  <p><strong>Created At:</strong> {selectedInvoice.created_at}</p>
                  <p><strong>Eingegangen Am:</strong> {selectedInvoice.eingegangen_am}</p>
                  <p><strong>Konto:</strong> {selectedInvoice.konto}</p>
                  <p><strong>EV VP:</strong> {selectedInvoice.ev_vp}</p>
                  <p><strong>Belegtext:</strong> {selectedInvoice.belegtext}</p>
                  <p><strong>Kommentar:</strong> {selectedInvoice.kommentar}</p>
                  <p><strong>Fällig Am:</strong> {selectedInvoice.fällig_am}</p>
                  <p><strong>Gebucht:</strong> {selectedInvoice.gebucht}</p>
                  <p><strong>Kostenstelle:</strong> {selectedInvoice.kostenstelle}</p>
                  <p><strong>VB:</strong> {selectedInvoice.VB}</p>
                  <p><strong>Wer Geprüft:</strong> {selectedInvoice.wer_geprüft}</p>
                  <p><strong>Wer Bezahlt:</strong> {selectedInvoice.wer_bezahlt}</p>
                  <p><strong>Status:</strong> {selectedInvoice.status}</p>
                  <p><strong>Amount:</strong> {selectedInvoice.amount}</p>
                  <p><strong>Sender:</strong> {selectedInvoice.sender}</p>
                  <p><strong>Email Body:</strong> {selectedInvoice.email_body}</p>
                  <p><strong>Public URL:</strong> {selectedInvoice.public_url}</p>
                  <p><strong>Faellig Am:</strong> {selectedInvoice.faellig_am}</p>
                  <p><strong>Skonto:</strong> {selectedInvoice.skonto}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setSelectedInvoice(null)}>Close</Button>
              </CardFooter>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;