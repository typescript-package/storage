// Abstract.
import { DataCore } from '@typescript-package/data';
/**
 * @description The `WeakStorage` class is a concrete class that manages `WeakStorage` instance in a static `Map` where data is associated with a specified name in the `WeakMap`.
 * @export
 * @class WeakStorage
 * @template [Type=any] 
 * @template {string} [Name='default'] 
 * @extends {DataCore<Type>}
 */
export class WeakStorage<
  Type = any,
  Name extends string = 'default'
> extends DataCore<Type> {
  public static clear(): typeof WeakStorage {
    WeakStorage.#map.clear();
    return this;
  }

  public static create<Type = any, Name extends string = string>(name: Name, value: Type) {
    return new WeakStorage(value, name);
  }

  /**
   * @description Gets the value from another instance.
   * @public
   * @static
   * @template Type 
   * @template {string} [Name='default'] 
   * @param {Name} name The name from which get the `WeakMap` storage.
   * @param {WeakStorage<Type, Name>} instance Another instance from which to get the value.
   * @returns {(Type | undefined)} The value of the given instance.
   */
  public static get<Type, Name extends string = 'default'>(name: Name, instance: WeakStorage<Type, Name>): Type | undefined {
    return WeakStorage.map<Type, Name>(name).get(name)?.get(instance);
  }

  public static keys(): IterableIterator<string> {
    return WeakStorage.#map.keys();
  }

  public static set<Type, Name extends string = 'default'>(name: Name, instance: WeakStorage<Type, Name>, value: Type): typeof WeakStorage {
    WeakStorage.map<Type, Name>(name).get(name)?.set(instance, value);
    return this;
  }

  private static map<Type, Name extends string = 'default'>(name: Name) {
    WeakStorage.#map.has(name) || WeakStorage.#map.set(name, new WeakMap());
    return WeakStorage.#map as Map<Name, WeakMap<WeakStorage<Type, Name>, Type>>;
  }

  /**
   * @description Returns the `string` tag representation of the `WeakStorage` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return WeakStorage.name;
  }

  /**
   * @description A private static `Map` stores under specified `string` type name the data value instance in `WeakMap`.
   * @static
   * @readonly
   * @type {Map<string, WeakMap<any, any>>}
   */
  static readonly #map: Map<string, WeakMap<any, any>> = new Map();

  /**
   * @description
   * @public
   * @readonly
   * @type {Name}
   */
  public get name(): Name {
    return this.#name;
  }

  /**
   * @description Returns the privately stored data value from the specified name of static `Map`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get value(): Type {
    return this.#storage?.get(this) as Type;
  }

  /**
   * @description
   * @type {Name}
   */
  #name: Name;

  /**
   * Creates an instance of `WeakStorage`.
   * @constructor
   * @param {Type} value Initial value of `Type`.
   * @param {string} [name='default'] The name under which the value is stored, defaults to `default`.
   */  
  constructor(value: Type, name: Name = 'default' as Name) {
    super();
    this.#name = name;
    WeakStorage.#map.has(name) || WeakStorage.#map.set(name, new WeakMap());
    this.#storage?.set(this, value);
  }

  /**
   * @description Clears the value to `null`.
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public clear(): this {
    this.#storage?.set(this, null as unknown as Type);
    return this;
  }

  /**
   * @description 
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public delete(): this {
    this.#storage?.delete(this);
    return this;
  }

  /**
   * @description 
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public destroy(): this {
    this.clear().delete();
    return this;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {Type} value The data of `Type` to set.
   * @returns {this} Returns `this` current instance.
   */
  public set(value: Type): this {
    super.validate();
    this.#storage?.set(this, value);
    return this;
  }

  /**
   * @description
   * @readonly
   * @type {WeakMap<WeakStorage<Type, Name>, Type> | undefined}
   */
  get #storage() {
    return (WeakStorage.#map as Map<Name, WeakMap<WeakStorage<Type, Name>, Type>>).get(this.name);
  }
}
