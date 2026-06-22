import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handlePrint}
      className="print-button no-print"
    >
      <Printer className="w-4 h-4" />
      Imprimir
    </Button>
  );
}
