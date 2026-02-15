// @typedly
import type { StorageAdapter } from '@typedly/storage';
/**
 * @description The web storage adapter implementation for localStorage and sessionStorage.
 * @export
 * @class WebStorageAdapter
 * @template {Record<string, any>} O 
 * @template {keyof O} [K=keyof O] 
 * @template [V=O[K]] 
 * @implements {StorageAdapter<O, K, V, false>}
 */
export class WebStorageAdapter<
  O extends Record<string, any>,
  K extends keyof O = keyof O,
  V = O[K],
> implements StorageAdapter<O, K, V, false> {
  public get size(): number {
    return Object.keys(this.value).length;
  }

  public readonly version = 'web-storage@1.0.0';

  public value: O;

  #locked = false;

  constructor(
    value: O,
    private readonly area: globalThis.Storage,
    private readonly namespace: string,
    private readonly serialize: (o: O) => string = JSON.stringify,
    private readonly deserialize: (s: string) => O = JSON.parse
  ) {
    this.value = value;
    this.load();
  }

  public lock(): this {
    return (this.#locked = true),
      this;
  }

  public unlock(): this {
    return (this.#locked = false),
      this;
  }

  public clear(): this {
    return this.#locked === false &&
      ((this.value = {} as O), this.area.removeItem(this.namespace)),
      this;
  }

  public destroy(): this {
    return this.clear(),
      this;
  }

  public set(value: O): this {
    return this.#locked === false &&
      ((this.value = value), this.save()),
      this;
  }

  public load(): this {
    const raw = this.area.getItem(this.namespace);
    if (raw) {
      try {
        this.value = this.deserialize(raw);
      } catch {
        // corrupted data -> reset
        this.value = {} as O;
      }
    }
    return this;
  }

  public save(): this {
    return this.area.setItem(this.namespace, this.serialize(this.value)),
      this;
  }

  public has(key: K): boolean {
    return Object.prototype.hasOwnProperty.call(this.value, key);
  }

  public get(key: K): V | undefined {
    return this.value[key] as V | undefined;
  }

  public keys(): K[] {
    return Object.keys(this.value) as unknown as K[];
  }

  public values(): V[] {
    return Object.values(this.value) as V[];
  }

  public entries(): [K, V][] {
    return Object.entries(this.value) as unknown as [K, V][];
  }

  public forEach(callback: (value: V, key: K) => void): this {
    for (const [k, v] of this.entries()) callback(v, k);
    return this;
  }

  public add(key: K, value: V): boolean {
    if (this.#locked) return false;
    if (this.has(key)) return false;
    return ((this.value as any)[key] = value),
      this.save(),
      true;
  }

  public put(key: K, value: V): boolean {
    if (this.#locked) return false;
    const existed = this.has(key);
    return ((this.value as any)[key] = value),
      this.save(),
      true;
  }

  public update(key: K, value: V): boolean {
    if (this.#locked) return false;
    if (!this.has(key)) return false;
    return ((this.value as any)[key] = value),
      this.save(),
      true;
  }

  public delete(key: K): boolean {
    if (this.#locked) return false;
    if (!this.has(key)) return false;
    return delete (this.value as any)[key],
      this.save(),
      true;
  }

  [Symbol.toStringTag]?: string;
}