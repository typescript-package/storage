// Abstract.
import { StorageBase } from "../../../lib";
// @typescript-package
import { NamedEventEmitter } from "@typescript-package/event-emitter";
// @typedly.
import { StorageAdapter, StorageListener, StorageMethodName } from '@typedly/storage';
/**
 * @description The reactive concrete implementation to emit the events of the storage.
 * @export
 * @class Storage
 * @template [O=object] 
 * @template {keyof O} [K=keyof O] 
 * @template [V=any] 
 * @template {boolean} [R=false] 
 * @template {unknown[]} [G=unknown[]] 
 * @template {{key: K, value?: V}} [P={key: K, value?: V}]
 * @template {StorageAdapter<O, K, V, R, P>} [A=StorageAdapter<O, K, V, R, P>] 
 * @extends {StorageBase<O, K, V, R, G, P, A>}
 */
export class ReactiveStorage<
  O = object,
  K extends keyof O = keyof O,
  V = any,
  R extends boolean = false,
  G extends unknown[] = unknown[],
  P extends {key: K, value?: V} = {key: K, value?: V},
  A extends StorageAdapter<O, K, V, R, P> = StorageAdapter<O, K, V, R, P>,
> extends StorageBase<O, K, V, R, G, P, A> {
  /**
   * @description The event emitter used for reactive storage events.
   * @type {*}
   */
  #emitter?: NamedEventEmitter<Record<StorageMethodName, StorageListener<K, V, P>>>;

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
   * @description Sets the event emitter for the reactive storage.
   * @public
   * @param {new (...args: any[]) => NamedEventEmitter<Record<StorageMethodName, StorageListener<K, V, P>>>} emitter The event emitter class to use.
   * @param {...any[]} args Arguments to pass to the event emitter constructor.

   * @returns {NamedEventEmitter<Record<StorageMethodName, StorageListener<K, V, P>>>, ...args: {}) => this} 
   */
  public setEmitter(
    emitter: new (...args: any[]) => NamedEventEmitter<Record<StorageMethodName, StorageListener<K, V, P>>>,
    ...args: any[]
  ) {
    return this.#emitter = new emitter(...args  ), this;
  }

  public override add(key: K, value: V) {
    return this.#emitter?.emit('add', {key, value} as P),
      super.add(key, value);
  }

  public override delete(key: K) {
    return this.#emitter?.emit('delete', {key} as P),
      super.delete(key);
  }

  public off(method: StorageMethodName, listener?: StorageListener<K, V, P>) {
    return listener
      ? (this.#emitter?.off(method, listener), this.returnThis(super.adapter!.off?.(method, listener)))
      : (this.#emitter?.off(method, null as any), this.returnThis(super.adapter!.off?.(method)));
  }

  public on(method: StorageMethodName, listener: StorageListener<K, V, P>) {
    return this.#emitter?.on(method, listener), this.returnThis(super.adapter!.on?.(method, listener));
  }

  public override put(key: K, value: V) {
    return this.#emitter?.emit('put', {key, value} as P),
      super.adapter!.put(key, value);
  }

  public override save() {
    return this.#emitter?.emit('save', {} as P),
      this.returnThis(super.adapter!.save());
  }

  public override update(key: K, value: V) {
    return this.#emitter?.emit('update', {key, value} as P),
      super.update(key, value);
  }

  public override values() {
    return super.adapter!.values();
  }
}
