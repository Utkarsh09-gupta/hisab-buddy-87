import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHisab } from "@/lib/hisab/store";
import { ModalShell } from "./ModalShell";

export function AddFriendModal({ onClose }: { onClose: () => void }) {
  const { addFriend } = useHisab();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const save = () => {
    if (!name.trim()) return;
    addFriend({ name: name.trim(), phone: phone.trim() || undefined });
    toast.success(`${name.trim()} added to your friends`);
    onClose();
  };

  return (
    <ModalShell
      title="Add Friend"
      description="Add someone you share expenses with."
      onClose={onClose}
      footer={
        <Button className="h-12 w-full rounded-2xl text-base" disabled={!name.trim()} onClick={save}>
          Add Friend
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="af-name">Name</Label>
          <Input
            id="af-name"
            placeholder="Rahul"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-2xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="af-phone">Phone number (optional)</Label>
          <Input
            id="af-phone"
            inputMode="tel"
            placeholder="98XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="num h-12 rounded-2xl"
          />
        </div>
      </div>
    </ModalShell>
  );
}
