"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isPending?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the selected item and remove it from our servers.",
  isPending = false,
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-background/90 backdrop-blur-2xl border-border rounded-[2rem] shadow-2xl max-w-[400px]">
        <AlertDialogHeader className="items-center text-center space-y-4">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center ring-1 ring-rose-500/20 shadow-inner">
            <Trash2 className="h-8 w-8 text-rose-500" />
          </div>
          <div className="space-y-2">
            <AlertDialogTitle className="text-2xl font-black tracking-tight text-foreground italic">
              {title.toUpperCase()}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground font-medium px-4">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row gap-3 mt-6 w-full">
          <AlertDialogCancel className="flex-1 m-0 sm:m-0 bg-secondary/50 hover:bg-secondary border-border text-foreground font-bold rounded-2xl h-12 transition-all">
            CANCEL
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isPending}
            className="flex-1 m-0 sm:m-0 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl h-12 shadow-[0_0_20px_-5px_rgba(225,29,72,0.5)] transition-all flex items-center justify-center gap-2 group"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
            )}
            {isPending ? "DELETING..." : "CONFIRM DELETE"}
          </AlertDialogAction>
        </AlertDialogFooter>
        <div className="absolute top-4 right-4 text-amber-500 opacity-20 pointer-events-none">
          <AlertTriangle className="h-12 w-12" />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
