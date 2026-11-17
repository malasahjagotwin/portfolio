"use client";

import { useEffect, type RefObject } from "react";

/*
 * Shared by every popover in the app. Escape is the part that matters: without
 * it the only way out is pressing the trigger again, which a keyboard user has
 * no reason to discover. Focus goes back to the trigger so the tab position is
 * not lost.
 */
export function useDismissable(
  open: boolean,
  setOpen: (value: boolean) => void,
  containerRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen, containerRef, triggerRef]);
}
