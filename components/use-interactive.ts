"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

/** Keep controls disabled until React has attached their event handlers. */
export function useInteractive() {
  return useSyncExternalStore(subscribe, clientReady, serverReady);
}
