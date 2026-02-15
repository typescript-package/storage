// Interface.
import { StorageAdapter } from "@typedly/storage";
// Abstract.
import { StorageBase } from "./storage-base.abstract";
/**
 * @description The concrete storage class that can be instantiated and used directly.
 * @export
 * @class Storage
 * @template [O=object] 
 * @template {keyof O} [K=keyof O] 
 * @template [V=any] 
 * @template {boolean} [R=false] 
 * @template {unknown[]} [G=unknown[]]
 * @template {{key: K, value?: V}} [P={key: K, value?: V}] 
 * @template {StorageAdapter<O, K, V, R, P>} [A=StorageAdapter<O, K, V, R, P>] 
 * @extends {StorageBase<O, K, V, R, any[], P, A>}
 */
export class Storage<
  O = object,
  K extends keyof O = keyof O,
  V = any,
  R extends boolean = false,
  G extends unknown[] = unknown[],
  P extends {key: K, value?: V} = {key: K, value?: V},
  A extends StorageAdapter<O, K, V, R, P> = StorageAdapter<O, K, V, R, P>,
> extends StorageBase<O, K, V, R, G, P, A> {}
