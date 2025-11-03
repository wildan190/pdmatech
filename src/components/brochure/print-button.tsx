'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <Button size="lg" className="mt-8 no-print" onClick={() => window.print()}>
      <Download className="mr-2 h-5 w-5" />
      {children}
    </Button>
  );
}
