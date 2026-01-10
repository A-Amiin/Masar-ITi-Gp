import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, Shield, IdCard } from "lucide-react";

export default function UserAvatarDialog({ user }) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Avatar clickable */}
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>

        <div className="leading-tight text-right">
          <p className="text-sm font-medium">
            {user.nameAr || user.nameEn}
          </p>
          <p className="text-xs text-muted-foreground">
            {user.role}
          </p>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            max-w-sm
            text-right
            [&>button]:left-4
            [&>button]:right-auto
          "
        >
          <DialogHeader dir="rtl">
            <DialogTitle>معلومات المستخدم</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 text-sm w-full">
              <p className="flex items-center gap-2 justify-center">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>

              <p className="flex items-center gap-2 justify-center">
                <Phone className="w-4 h-4" />
                {user.phone}
              </p>

              <p className="flex items-center gap-2 justify-center">
                <IdCard className="w-4 h-4" />
                {user.user_Id}
              </p>

              <p className="flex items-center gap-2 justify-center">
                <Shield className="w-4 h-4" />
                {user.role}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}