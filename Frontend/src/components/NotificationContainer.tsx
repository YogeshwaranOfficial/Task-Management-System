import { useNotification } from "../context/NotificationContext";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-5 right-5 z-50 space-y-4 w-[320px]">
      {notifications.map((n) => {
        const baseStyle =
          "flex items-start gap-3 p-4 rounded-2xl shadow-lg border backdrop-blur-md animate-slide-in";

        const typeStyle = {
          success: "bg-green-100/80 border-green-300 text-green-800",
          error: "bg-red-100/80 border-red-300 text-red-800",
          info: "bg-blue-100/80 border-blue-300 text-blue-800",
          warning: "bg-yellow-100/80 border-yellow-300 text-yellow-800",
        };


        const icon = {
        success: <CheckCircle className="w-5 h-5 text-green-600" />,
        error: <XCircle className="w-5 h-5 text-red-600" />,
        info: <Info className="w-5 h-5 text-blue-600" />,
        warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
        };

        return (
          <div key={n.id} className={`${baseStyle} ${typeStyle[n.type]}`}>
            
            {/* Icon */}
            <div className="text-lg">{icon[n.type]}</div>

            {/* Message */}
            <div className="flex-1 text-sm font-medium">
              {n.message}
            </div>

            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("clicked", n.id);
                removeNotification(n.id);
              }}
              className="text-gray-500 hover:text-black transition text-lg"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default NotificationContainer;