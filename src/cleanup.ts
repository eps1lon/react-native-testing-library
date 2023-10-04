import * as React from 'react';
import { clearRenderResult } from './screen';

declare const UNDEFINED_VOID_ONLY: unique symbol;
// typesafe void if used as a return type in parameters
// source: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/51081
type VoidOrUndefinedOnly = void | { [UNDEFINED_VOID_ONLY]: never };

type CleanUpFunction = (
  nextElement?: React.ReactElement<any>
) => Promise<VoidOrUndefinedOnly>;
let cleanupQueue = new Set<CleanUpFunction>();

export default async function cleanup() {
  clearRenderResult();
  for (const fn of cleanupQueue) {
    await fn();
  }
  cleanupQueue.clear();
}

export function addToCleanupQueue(fn: CleanUpFunction) {
  cleanupQueue.add(fn);
}
