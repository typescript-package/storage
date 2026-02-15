// @typedly
import { AsyncReturn } from "@typedly/data";
import { StorageAdapter } from "@typedly/storage";
// Abstract.
import { StorageCore } from "./storage-core.abstract";
/**
 * @description The storage base abstraction with implement adapter functionality.
 * @export
 * @abstract
 * @class StorageBase
 * @template [O=Record<string, any>] 
 * @template {keyof O} [K=keyof O] 
 * @template [V=any] 
 * @template {boolean} [R=false] 
 * @template {unknown[]} [G=unknown[]] 
 * @template {{key: K, value?: V}} [P={key: K, value?: V}] 
 * @template {StorageAdapter<O, K, V, R, P>} [A=StorageAdapter<O, K, V, R, P>] 
 * @extends {StorageCore<O, K, V, R, G, P, A>}
 */
export abstract class StorageBase<
  O = Record<string, any>,
  K extends keyof O = keyof O,
  V = any,
  R extends boolean = false,
  G extends unknown[] = unknown[],
  P extends {key: K, value?: V} = {key: K, value?: V},
  A extends StorageAdapter<O, K, V, R, P> = StorageAdapter<O, K, V, R, P>,
> extends StorageCore<O, K, V, R, G, P, A> {
  /**
   * @description Returns the number of elements in the storage.
   * @public
   * @readonly
   * @type {number}
   */
  public get size(): number {
    return super.adapter?.size ?? 0;
  }

  constructor(
    {async = false as R, value = {} as O}: {
      async?: R,
      value?: O,
    },
    adapter: {new (value: O, ...args: G): A},
    ...args: G
  ) {
    super(
      { async, value },
      adapter,
      ...args
    );
  }

  /**
   * @description Adds a value to the storage under the specified key.
   * @public
   * @param {K} key The key under which the value should be stored.
   * @param {V} value The value to be stored under the given key.
   * @returns {*} The result of the add operation.
   */
  public add(key: K, value: V) {
    return super.adapter!.add(key, value);
  }

  /**
   * @description Deletes a value from the storage under the specified key.
   * @public
   * @param {K} key The key whose value should be deleted.
   * @returns {*} The result of the delete operation.
   */
  public delete(key: K) {
    return super.adapter!.delete(key);
  }

  /**
   * @description Returns an array of key-value pairs from the storage.
   * @public
   * @returns {*} An array of key-value pairs from the storage.
   */
  public entries() {
    return super.adapter!.entries();
  }

  /**
   * @description Executes a provided function once for each key-value pair in the storage.
   * @public
   * @param {(value: V, key: K) => void} callback The function to execute for each key-value pair.
   * @returns {void) => AsyncReturn<R, this>} 
   */
  public forEach(callback: (value: V, key: K) => void) {
    return this.returnThis(super.adapter!.forEach(callback));
  }

  /**
   * @description Retrieves the value associated with the specified key from the storage.
   * @public
   * @param {K} key The key whose associated value is to be returned.
   * @returns {*} The value associated with the specified key, or undefined if the key does not exist.
   */
  public get(key: K) {
    return super.adapter!.get(key);
  }

  /**
   * @description Checks if the storage contains a value associated with the specified key.
   * @public
   * @param {K} key 
   * @returns {*} 
   */
  public has(key: K) {
    return super.adapter!.has(key);
  }

  /**
   * @description Returns an array of keys from the storage.
   * @public
   * @returns {*} 
   */
  public keys() {
    return super.adapter!.keys();
  }

  /**
   * @description Loads the storage data.
   * @public
   * @returns {*} 
   */
  public load() {
    return this.returnThis(super.adapter!.load());
  }

  /**
   * @description Adds or updates a value in the storage under the specified key.
   * @public
   * @param {K} key 
   * @param {V} value 
   * @returns {*} 
   */
  public put(key: K, value: V) {
    return super.adapter!.put(key, value);
  }

  /**
   * @description Saves the current state of the storage.
   * @public
   * @returns {AsyncReturn<R, this>} 
   */
  public save() {
    return this.returnThis(super.adapter!.save());
  }

  /**
   * @description Updates the value in the storage under the specified key.
   * @public
   * @param {K} key 
   * @param {V} value 
   * @returns {*} 
   */
  public update(key: K, value: V) {
    return super.adapter!.update(key, value);
  }

  /**
   * @description Returns an array of values from the storage.
   * @public
   * @returns {*} 
   */
  public values() {
    return super.adapter!.values();
  }

  /**
   * @description Returns the current instance, optionally after a promise resolves.
   * @protected
   * @param {*} result The result to evaluate.
   * @returns {AsyncReturn<R, this>} The current instance, possibly wrapped in a promise.
   */
  protected returnThis(result: any): AsyncReturn<R, this> {
    return (result && typeof result.then === 'function'
        ? result.then(() => this)
        : this) as AsyncReturn<R, this>;
  }
}
