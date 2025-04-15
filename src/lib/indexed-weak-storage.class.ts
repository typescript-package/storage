// Class.
import { WeakStorage } from "./weak-storage.class";

export class IndexedWeakStorage<
  Obj extends object = object,
  Key extends keyof Obj = keyof Obj,
  Name extends string = 'default'
> extends WeakStorage<Obj, Name> {
  /**
   * @description
   * @public
   * @static
   * @template {object} [Obj=object] 
   * @param {number} index 
   * @param {string} [name="default"] 
   * @returns {(Obj | undefined)} 
   */
  public static getByIndex<Obj extends object = object>(index: number, name = "default"): Obj | undefined {
    return IndexedWeakStorage.#registry.get(name)?.get(index)?.deref()?.value
  }

  /**
   * @description
   * @static
   * @type {Map}
   */
  static #registry = new Map<string, Map<number, WeakRef<IndexedWeakStorage<any, any, any>>>>();

  /**
   * @description
   * @static
   * @type {FinalizationRegistry}
   */
  static #finalizationRegistry = new FinalizationRegistry(([index, name]: [number, string]) => {
    const namedRegistry = IndexedWeakStorage.#registry.get(name);
    if (namedRegistry) {
      namedRegistry.delete(index);
      if (namedRegistry.size === 0) {
        // IndexedNamedWeakData.#registry.delete(index);
      }
    }
  });

  /**
   * @description
   * @public
   * @readonly
   * @type {(number | undefined)}
   */
  public get index(): number | undefined {
    return Object.hasOwn(super.value, this.#key) ? super.value[this.#key] as number : undefined;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Key}
   */
  public get key() {
    return this.#key;
  }

  /**
   * @description
   * @type {!Key}
   */
  #key!: Key;

  /**
   * Creates an instance of `IndexedWeakData`.
   * @constructor
   * @param {Obj} object 
   * @param {Key} key 
   * @param {Name} [name='default' as Name] 
   */
  constructor(object: Obj, key: Key, name: Name = 'default' as Name) {
    super(object, name);

    // Crate the registry under the specified name.
    IndexedWeakStorage.#registry.has(name) === false &&
      IndexedWeakStorage.#registry.set(name, new Map<number, WeakRef<IndexedWeakStorage<any, any, any>>>());

    if (typeof object[key] === 'number') {
      this.#key = key;
      if (this.index) {
        IndexedWeakStorage.#registry.get(name)?.set(this.index, new WeakRef(this));
        IndexedWeakStorage.#finalizationRegistry.register(this, [this.index, name]);
      }
    }
  }

  /**
   * @inheritdoc
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public override destroy(): this {
    this.index && IndexedWeakStorage.#registry.get(super.name)?.delete(this.index);
    return super.destroy();
  }

  /**
   * @description
   * @public
   * @param {number} index 
   * @returns {(Obj | undefined)} 
   */
  public getByIndex(index: number): Obj | undefined {
    return IndexedWeakStorage.getByIndex<Obj>(index);
  }

  /**
   * @description
   * @public
   * @param {number} index 
   * @param {Obj} object 
   * @returns {this} Returns `this` current instance.
   */
  public update(index: number, object: Obj): this {
    super.set({...this.getByIndex(index) || {}, ...object});
    return this;
  }
}
