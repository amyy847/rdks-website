"use client";

import { useEffect, useState } from "react";
import { ENQUIRY_NAME_KEY } from "@/components/EnquireSection";

/** "Thank you, Sara." when the form left the visitor's first name, otherwise just "Thank you." */
export default function Greeting({ heading }: { heading: string }) {
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      setName(sessionStorage.getItem(ENQUIRY_NAME_KEY) ?? "");
    } catch {
      // Storage blocked: keep the generic greeting
    }
  }, []);

  return (
    <>
      {heading}
      {name ? `, ${name}` : ""}.
    </>
  );
}
