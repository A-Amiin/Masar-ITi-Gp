import { db } from "@/lib/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useUnreadNotifications } from "@/hooks/useAdminNotifications"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Briefcase } from "lucide-react"
const PopOverJoinUs = () => {
    const navigate = useNavigate();
    const { items: application } = useUnreadNotifications("join_us");
    console.log("number_joinus" + application.length);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative">
                    <Briefcase className="w-5 h-5 cursor-pointer" />

                    {application.length > 0 && (
                        <span className="
                    absolute -top-2 -right-3
                    w-4 h-4 flex items-center justify-center
                    text-xs text-white
                    bg-red-500
                    rounded-full
                  " >
                            {application.length}
                        </span>
                    )}
                </button>
            </PopoverTrigger>

            <PopoverContent align="center" className="w-80 p-4">
                <div dir="rtl" className="flex flex-col">
                    <p className="text-sm font-semibold mb-2">إشعار جديد</p>

                    {application.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            لا توجد اشعارات جديدة
                        </p>
                    )}

                    <div className="flex flex-col gap-1">
                        {application.slice(0, 5).map((application) => (
                            <button
                                key={application.id}
                                onClick={async () => {
                                    await updateDoc(
                                        doc(db, "join_us", application.id),
                                        { isRead: true }
                                    );
                                    navigate("/join-us");
                                }}
                                className="text-left p-2 rounded-md hover:bg-muted transition"
                            >
                                <p className="text-sm font-medium">رسالة جديدة من {application.name}</p>
                                <p className="text-xs text-muted-foreground">{application.message}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => navigate("/join-us")}
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

export default PopOverJoinUs