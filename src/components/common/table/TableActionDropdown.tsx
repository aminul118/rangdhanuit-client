"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  customItems?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon: LucideIcon;
    className?: string;
  }[];
}

export function TableActionDropdown({
  viewLink,
  editLink,
  deleteAction,
  deleteSuccessMessage = "Item deleted successfully",
  deleteConfirmMessage = "This action cannot be undone. This will permanently delete the selected item and remove it from our servers.",
  deleteTitle = "Are you absolutely sure?",
  customItems,
}: TableActionDropdownProps) {
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
            className="h-8 w-8 hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 p-2 rounded-2xl border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl"
        >
          {viewLink && (
            <DropdownMenuItem asChild>
              <Link
                href={viewLink}
                target="_blank"
                className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>View Public</span>
              </Link>
            </DropdownMenuItem>
          )}

          {editLink && (
            <DropdownMenuItem asChild>
              <Link
                href={editLink}
                className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Details</span>
              </Link>
            </DropdownMenuItem>
          )}

          {customItems?.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div
                className={`flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl transition-colors ${item.className || "hover:bg-zinc-500/10 hover:text-zinc-300"}`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            );

            return (
              <DropdownMenuItem key={index} asChild onClick={item.onClick}>
                {item.href ? <Link href={item.href}>{content}</Link> : content}
              </DropdownMenuItem>
            );
          })}

          {deleteAction && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(true);
              }}
              className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl text-rose-500 font-bold hover:bg-rose-500/10 hover:text-rose-600 transition-colors"
            >
              <Trash className="h-4 w-4" />
              <span>Delete Item</span>
            </DropdownMenuItem>
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
}
