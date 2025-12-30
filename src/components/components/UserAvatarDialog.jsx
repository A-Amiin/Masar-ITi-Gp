import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function UserAvatarDialog({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Avatar كليكابل */}
      <div onClick={() => setOpen(true)} className="flex items-center gap-3 cursor-pointer">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>

        <div className="leading-tight text-right">
          <p className="text-sm font-medium text-foreground">{user?.name}</p>
          <p className="text-xs text-muted-foreground">Admin</p>
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
        ">
          <DialogHeader dir="rtl" className="flex flex-col items-start gap-2">
            <DialogTitle>معلومات المستخدم</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium text-lg">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground">User_ID : {user?.uid}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}