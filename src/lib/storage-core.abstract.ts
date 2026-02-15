// @typedly
import {
  // Interface.
  StorageAdapter,
  StorageShape
} from "@typedly/storage";
import { AsyncReturn } from "@typedly/data";
// @typescript-package
import { BaseData } from '@typescript-package/data';
/**
 * @description The core storage abstraction
 * @export
 * @abstract
 * @class StorageCore
 * @template [O=Record<string, any>] 
 * @template {keyof O} [K=keyof O] 
 * @template [V=any] 
 * @template {boolean} [R=false] 
 * @template {unknown[]} [G=unknown[]] 
 * @template {{key: K, value?: V}} [P={key: K, value?: V}] 
 * @template {StorageAdapter<O, K, V, R, P>} [A=StorageAdapter<O, K, V, R, P>] 
 * @extends {BaseData<O, G, R, A>}
 * @implements {StorageShape<R, O, K, V, P>}
 */
export abstract class StorageCore<
  O = Record<string, any>,
  K extends keyof O = keyof O,
  V = any,
  R extends boolean = false,
  G extends unknown[] = unknown[],
  P extends {key: K, value?: V} = {key: K, value?: V},
  A extends StorageAdapter<O, K, V, R, P> = StorageAdapter<O, K, V, R, P>,
> extends BaseData<O, G, R, A>
  implements StorageShape<R, O, K, V, P> {
  public abstract get size(): number;

  constructor(
    {async, value}: {
      async: R,
      value: O,
    },
    adapter: {new (value: O, ...args: G): A},
    ...args: G
  ) {
    super(
      async,
      value,
      adapter,
      ...args
    );
  }
  public abstract add(key: K, value: V): AsyncReturn<R, boolean>;
  public abstract delete(key: K): AsyncReturn<R, boolean>;
  public abstract entries(): AsyncReturn<R, [K, V][]>;
  public abstract forEach(callback: (value: V, key: K) => void): AsyncReturn<R, this>;
  public abstract get(key: K): AsyncReturn<R, V | undefined>;
  public abstract has(key: K): AsyncReturn<R, boolean>;
  public abstract keys(): AsyncReturn<R, K[]>;
  public abstract load(): AsyncReturn<R, this>;
  public abstract put(key: K, value: V): AsyncReturn<R, boolean>;
  public abstract save(): AsyncReturn<R, this>;
  public abstract update(key: K, value: V): AsyncReturn<R, boolean>;
  public abstract values(): AsyncReturn<R, V[]>;
}
