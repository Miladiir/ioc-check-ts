/**
 * The type of a JavaScript class. The class might be abstract in TypeScript.
 * @typeParam Type The actual type (prototype) of the class.
 */
export type Constructable<Type> = Function & { prototype: Type };

/**
 * The type of a JavaScript class. The class is NOT abstract in TypeScript.
 * @typeParam Type The actual type (prototype) of the class.
 */
export type InstantiableConstructable<Type> = new(...args: any[]) => Type;