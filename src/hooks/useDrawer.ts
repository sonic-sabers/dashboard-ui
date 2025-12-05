"use client";

import { useEffect, useRef } from "react";
import Hammer from "hammerjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import {
  toggleLeftSidebar,
  toggleRightSidebar,
  setLeftSidebarOpen,
  setRightSidebarOpen,
  selectLeftSidebarOpen,
  selectRightSidebarOpen,
} from "@/lib/redux";

export function useDrawer() {
  const dispatch = useAppDispatch();

  // Get state from Redux (persisted automatically)
  const leftOpen = useAppSelector(selectLeftSidebarOpen);
  const rightOpen = useAppSelector(selectRightSidebarOpen);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Wrapper functions to dispatch Redux actions
  const setLeftOpen = (open: boolean) => dispatch(setLeftSidebarOpen(open));
  const setRightOpen = (open: boolean) => dispatch(setRightSidebarOpen(open));

  // MOBILE SWIPE
  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    const leftHammer = new Hammer(leftRef.current);
    const rightHammer = new Hammer(rightRef.current);

    leftHammer.on("swiperight", () => dispatch(setLeftSidebarOpen(true)));
    leftHammer.on("swipeleft", () => dispatch(setLeftSidebarOpen(false)));

    rightHammer.on("swipeleft", () => dispatch(setRightSidebarOpen(true)));
    rightHammer.on("swiperight", () => dispatch(setRightSidebarOpen(false)));

    return () => {
      leftHammer.destroy();
      rightHammer.destroy();
    };
  }, [dispatch]);

  return {
    leftOpen,
    rightOpen,
    setLeftOpen,
    setRightOpen,
    leftRef,
    rightRef,
  };
}
