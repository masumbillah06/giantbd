"use client";

import { Eye, SquarePen, Trash2, Download, RotateCcw, Printer, Plus, ClipboardList, Package, Truck } from "lucide-react";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";

interface UserRowActionsProps {
  userId: string;
}

export default function UserRowActions({ userId }: UserRowActionsProps) {
  function handleDelete() {
    // e.g. open a confirmation dialog, then call your delete mutation
    console.log("delete", userId);
  }

  function handleReload() {
    console.log("reload", userId);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <main className="flex items-center justify-center gap-2 p-28">
    <ActionButtonGroup aria-label={`Actions for user ${userId}`}>
      <ActionButton label="View User" icon={Eye} href={`/users/${userId}`} />
      <ActionButton label="Edit User" icon={SquarePen} href={`/users/${userId}/edit`} />
      <ActionButton label="Delete User" icon={Trash2} variant="danger" onClick={handleDelete} />
      <ActionButton label="Download" icon={Download} href={`/users/${userId}/download`} />
      <ActionButton label="Reload" icon={RotateCcw} onClick={handleReload} />
      <ActionButton label="Print" icon={Printer} onClick={handlePrint} />
      <ActionButton label="Print" icon={Package} onClick={handlePrint} />
      <ActionButton label="Print" icon={ClipboardList} onClick={handlePrint} />
      <ActionButton label="Print" icon={Truck} onClick={handlePrint} />
      <ActionButton label="Create Variant" icon={Plus} href="/variants/create" />
    </ActionButtonGroup>
    </main>
  );
}
