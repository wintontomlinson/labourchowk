"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

/** Contact form — posts to /api/contact which persists the message to the DB. */
export function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function send() {
    if (name.trim().length < 2 || message.trim().length < 3) {
      toast("Please enter your name and a message", "error");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      if (!res.ok) throw new Error();
      toast("Thanks! We'll get back to you soon.", "success");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      toast("Couldn't send message. Please try again.", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-card border border-ink/[0.07] bg-white p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Your name" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" placeholder="Your mobile number" />
        </div>
      </div>
      <div className="mt-4">
        <label className="label">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="input h-auto py-3"
          placeholder="How can we help?"
        />
      </div>
      <button onClick={send} disabled={sending} className="btn-primary btn-md mt-4">
        {sending ? "Sending…" : "Send message"}
      </button>
    </div>
  );
}
