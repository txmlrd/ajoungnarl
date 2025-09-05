import { createContext, useContext, useState } from "react";
import { Alert } from "antd";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "success", showIcon: true, closable: true });
  const [visible, setVisible] = useState(false);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type, showIcon: true, closable: true });
    setVisible(false); // reset dulu
    setTimeout(() => setVisible(true), 10); // trigger fade in
    setTimeout(() => setVisible(false), 5000); // auto-hide
  };

  const handleClose = () => setVisible(false);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert.message && (
        <div className={`fixed bottom-5 right-5 z-[100] min-w-[300px] transition-all duration-300 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Alert message={alert.message} type={alert.type} showIcon={alert.showIcon} closable={alert.closable} onClose={handleClose} className="bg-white shadow-lg rounded-md" />
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};
