"use client";

import { Button } from "../components/ui/button";
import { useFormStatus } from "react-dom";


export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
