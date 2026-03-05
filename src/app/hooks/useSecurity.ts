import { useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useSecurity = (isActive: boolean) => {
  const handleContextMenu = useCallback((e: MouseEvent) => {
    if (isActive) {
      e.preventDefault();
      toast.error("Güvenlik nedeniyle sağ tık engellenmiştir.");
    }
  }, [isActive]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive) return;

    // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (Inspect elements)
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "u")
    ) {
      e.preventDefault();
      toast.error("İnceleme araçları devre dışı bırakılmıştır.");
    }

    // Prevent Copy/Paste/Cut
    if (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "x")) {
      e.preventDefault();
      toast.error("Kopyalama ve yapıştırma eylemleri yasaktır.");
    }

    // Prevent Save
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      toast.error("Sayfayı kaydetmek yasaktır.");
    }

    // Prevent Print
    if (e.ctrlKey && e.key === "p") {
      e.preventDefault();
      toast.error("Yazdırma işlemi yasaktır.");
    }
  }, [isActive]);

  const handleVisibilityChange = useCallback(() => {
    if (isActive && document.visibilityState === "hidden") {
      toast.warning("Ekran odağı değişti! Gözetmen bilgilendirildi.", {
        duration: 5000,
      });
      // Logic to report back to proctor can be added here
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      
      // Prevent screen capture/printscreen via generic alert 
      // (actual PrintScreen button is hard to capture in browser, 
      // but we can detect focus loss)
    }

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, handleContextMenu, handleKeyDown, handleVisibilityChange]);
};
