// src/context/NotificationContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

type NotificationType = "success" | "error" | "info" | "warning";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (msg: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: NotificationType) => {
    const id = uuidv4();

    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto remove after 5 sec (optional)
    setTimeout(() => removeNotification(id), 3000);
  };

  const removeNotification = (id:string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside provider");
  return ctx;
};