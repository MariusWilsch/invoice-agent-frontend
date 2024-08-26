import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { toast } from "sonner";
import { LanguageProvider } from "../contexts/LanguageContext";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSwitcher from "./molecules/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SharedLayout = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('de');
  const { signOut, user } = useAuth();
  const [isImapModalOpen, setIsImapModalOpen] = useState(false);
  const [imapCredentials, setImapCredentials] = useState({
    email: "",
    password: "",
    server: "",
  });

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const handleImapCredentialsChange = (e) => {
    const { name, value } = e.target;
    setImapCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleImapCredentialsSubmit = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { imapCredentials: imapCredentials }
      });

      if (error) throw error;

      console.log("IMAP Credentials saved to user metadata:", data);
      toast.success("IMAP Credentials saved successfully");
      setIsImapModalOpen(false);
    } catch (error) {
      console.error("Error saving IMAP credentials:", error.message);
      toast.error(`Failed to save IMAP credentials: ${error.message}`);
    }
  };

  return (
    <LanguageProvider initialLanguage={currentLanguage}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="flex items-center gap-4">
              <LanguageSwitcher
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => toast("Inquires to: [Ticket#18801]")}>
                    Show Ticket Number
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsImapModalOpen(true)}>
                    IMAP Credentials
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>

      <Dialog open={isImapModalOpen} onOpenChange={setIsImapModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>IMAP Credentials</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="font-bold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={imapCredentials.email}
                onChange={handleImapCredentialsChange}
                className="w-full border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="font-bold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={imapCredentials.password}
                onChange={handleImapCredentialsChange}
                className="w-full border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="server" className="font-bold">
                Imap server address
              </Label>
              <Input
                id="server"
                name="server"
                value={imapCredentials.server}
                onChange={handleImapCredentialsChange}
                className="w-full border-gray-300"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleImapCredentialsSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LanguageProvider>
  );
};

export default SharedLayout;
