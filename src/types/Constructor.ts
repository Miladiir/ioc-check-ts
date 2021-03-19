/**
 * The type of a constructor of a class that is possibly abstract.
 */
export type Constructor<Type> = Function & { prototype: Type };

/**
 * The type of a constructor that is definitely instantiable (not abstract).
 */
export type InstantiableConstructor<Type> = new() => Type;