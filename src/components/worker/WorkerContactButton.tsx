"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";

export function WorkerContactButton({ name }: { name: string }) {
  const [revealed, setRevealed] = useState(false);
  const { toast } = useToast();

  if (revealed) {
    return (
      <a href="tel:+919000000000" className="btn-outline btn-lg w-full">
        <Icon name="phone" size={18} />
        +91 90000 00000
      </a>
    );
  }

  return (
    <button
      onClick={() => {
        setRevealed(true);
        toast(`Contact details for ${name} unlocked`, "info");
      }}
      className="btn-outline btn-lg w-full"
    >
      <Icon name="chat" size={18} />
      Contact
    </button>
  );
}
