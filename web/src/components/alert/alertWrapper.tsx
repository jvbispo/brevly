import { useState, useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface AlertWrapperProps {
  variant: "success" | "error"; // Define as variantes
  title: string;
  description: string;
}

const AlertWrapper = ({ variant, title, description }: AlertWrapperProps) => {
  const [visible, setVisible] = useState(true);

  // Remove o alerta após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, []);

  if (!visible) return null; // Não renderiza nada se o alerta não estiver visível

  // Define as cores com base na variante
  const colors =
    variant === "success"
      ? {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: "#1976D2",
      }
      : {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: "#D32F2F",
      };

  return (
      <Alert className={`absolute bottom-5 right-5 ${colors.bg} p-4 rounded-md shadow-md max-w-80 w-full`}>
        <CircleAlert className={`h-4 w-4 ${colors.icon}`} color={colors.icon}/>
        <AlertTitle className={colors.text}>{title}</AlertTitle>
        <AlertDescription className={colors.text}>{description}</AlertDescription>
      </Alert>
  );
};

export default AlertWrapper;