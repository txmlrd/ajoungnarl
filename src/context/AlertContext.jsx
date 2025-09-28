import { createContext, useContext, useState, useRef } from "react";
import { Alert } from "antd";

const AlertContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
    showIcon: true,
    closable: true,
  });
  const [visible, setVisible] = useState(false);

  // simpan timeout biar bisa di-clear
  const timeoutRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutRef.current.forEach((id) => clearTimeout(id));
    timeoutRef.current = [];
  };
  const showAlert = (message, type = "success") => {
    clearAllTimeouts();

    setAlert({ message, type, showIcon: true, closable: true });
    setVisible(false);

    timeoutRef.current.push(setTimeout(() => setVisible(true), 10));

    timeoutRef.current.push(
      setTimeout(() => {
        setVisible(false);
        setAlert((prev) => ({ ...prev, message: "" }));
      }, 5000)
    );
  };
  const handleClose = () => {
    clearAllTimeouts();
    setVisible(false);
    setAlert((prev) => ({ ...prev, message: "" }));
  };

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
