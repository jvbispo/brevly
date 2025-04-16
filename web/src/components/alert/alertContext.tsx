import type React from "react";
import { useAlert } from "../../store/alert";
import AlertWrapper from "./alertWrapper";

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { alert } = useAlert();

  return (
    <>
      {children}
      {alert && (
        <AlertWrapper
          variant={alert.variant}
          title={alert.title}
          description={alert.description}
        />
      )}
    </>
  );
};