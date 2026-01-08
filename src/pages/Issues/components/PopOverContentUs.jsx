import { db } from "@/lib/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useUnreadNotifications } from "@/hooks/useAdminNotifications"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Inbox } from "lucide-react"
const PopOverContentUs = () => {
    const navigate = useNavigate();
    const { items: notifications } = useUnreadNotifications("contact_us");

    console.log("number_contactus"+notifications.length);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative">
                    <Inbox className="w-5 h-5 cursor-pointer" />

                    {notifications.length > 0 && (
                        <span className="
                    absolute -top-2 -right-3
                    w-4 h-4 flex items-center justify-center
                    text-xs text-white
                    bg-red-500
                    rounded-full
                  " >
                    {}
                  </span>
                    )}
                </button>
            </PopoverTrigger>

            <PopoverContent align="center" className="w-80 p-4">
                <div dir="rtl" className="flex flex-col">
                    <p className="text-sm font-semibold mb-2">إشعار جديد</p>

                    {notifications.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            لا توجد اشعارات جديدة
                        </p>
                    )}

                    <div className="flex flex-col gap-1">
                        {notifications.slice(0, 5).map((notif) => (
                            <button
                                key={notif.id}
                                onClick={async () => {
                                    await updateDoc(doc(db, "contact_us", notif.id), { isRead: true });
                                    navigate(`/issues`);
                                }}
                                className="text-left p-2 rounded-md hover:bg-muted transition"
                            >
                                <p className="text-sm font-medium">رسالة جديدة من {notif.name}</p>
                                <p className="text-xs text-muted-foreground">{notif.message}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => navigate("/issues")}
                    className="
                  mt-2 text-xs text-primary
                  hover:underline w-full text-center
                "
                >
                    عرض جميع الإشعارات
                </button>
            </PopoverContent>
        </Popover>
    )
}

export default PopOverContentUs