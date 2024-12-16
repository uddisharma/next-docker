"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AutoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Our Platform!</DialogTitle>
          <DialogDescription>
            Discover how our powerful tools can transform your data management
            process.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="mb-4">
            Sign up now and get a 30-day free trial of our premium features!
          </p>
          <Button onClick={() => setIsOpen(false)}>Learn More</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
