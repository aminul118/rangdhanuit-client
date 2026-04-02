"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash, Eye, LucideIcon } from "lucide-react";
import Link from "next/link";
import useActionHandler from "@/hooks/useActionHandler";
import { DeleteConfirmModal } from "@/components/common/modal/DeleteConfirmModal";
import { ApiResponse } from "@/types";

interface TableActionDropdownProps {
  viewLink?: string;
  editLink?: string;
  deleteAction?: () => Promise<ApiResponse<unknown>>;
  deleteSuccessMessage?: string;
  deleteConfirmMessage?: string;
  deleteTitle?: string;
  dropdownLabel?: string;
  customItems?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon: LucideIcon;
    className?: string;
  }[];
}

export const TableActionDropdown = ({
  viewLink,
  editLink,
  deleteAction,
  deleteSuccessMessage = "Item deleted successfully",
  deleteConfirmMessage = "This action cannot be undone. This will permanently delete the selected item and remove it from our servers.",
  deleteTitle = "Are you absolutely sure?",
  dropdownLabel = "Quick Actions",
  customItems,
}: TableActionDropdownProps) => {
  const { executeDelete, isPending } = useActionHandler();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    const success = await executeDelete({
      action: deleteAction!,
      success: {
        message: deleteSuccessMessage,
      },
    });
    if (success) {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 rounded-lg hover:bg-foreground/5 data-[state=open]:bg-foreground/5 transition-colors"
          >
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 p-2 rounded-2xl bg-background/95 backdrop-blur-xl border-border shadow-2xl"
        >
          {dropdownLabel && (
            <>
              <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {dropdownLabel}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
            </>
          )}

          {viewLink && (
            <DropdownMenuItem asChild>
              <Link
                href={viewLink}
                target="_blank"
                className="rounded-xl px-3 py-2.5 gap-3 focus:text-emerald-500 focus:bg-emerald-500/10 cursor-pointer transition-colors"
              >
                <Eye size={16} />
                <span className="font-medium text-sm">View Public</span>
              </Link>
            </DropdownMenuItem>
          )}

          {editLink && (
            <DropdownMenuItem asChild>
              <Link
                href={editLink}
                className="rounded-xl px-3 py-2.5 gap-3 focus:text-indigo-500 focus:bg-indigo-500/10 cursor-pointer transition-colors"
              >
                <Edit size={16} />
                <span className="font-medium text-sm">Edit Details</span>
              </Link>
            </DropdownMenuItem>
          )}

          {customItems?.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div
                className={`rounded-xl px-3 py-2.5 gap-3 cursor-pointer transition-colors ${item.className || "focus:bg-foreground/10 focus:text-foreground"}`}
              >
                <Icon size={16} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            );

            return (
              <DropdownMenuItem key={index} asChild onClick={item.onClick}>
                {item.href ? <Link href={item.href}>{content}</Link> : content}
              </DropdownMenuItem>
            );
          })}

          {deleteAction && (
            <>
              {(viewLink || editLink || (customItems && customItems.length > 0)) && (
                 <DropdownMenuSeparator className="bg-border/50" />
              )}
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDeleteModalOpen(true);
                }}
                className="rounded-xl px-3 py-2.5 gap-3 text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer transition-colors"
              >
                <Trash size={16} />
                <span className="font-medium text-sm">Delete Item</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {deleteAction && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDelete}
          isPending={isPending}
          title={deleteTitle}
          description={deleteConfirmMessage}
        />
      )}
    </>
  );
};
