import {DependencyInjectionError} from "./errors/DependencyInjectionError";
import {Constructable} from "./types/Constructable";

/**
 * Throws an error if the instance is an instance of the class and not of a subclass.
 * Will not produce runtime errors for instances and classes that do not match.
 * @param instance The instance to check.
 * @param constructor The class to match.
 * @example Will not throw:
 * class A {}
 * throwIfMatches(new A(), Object);
 * @example Will throw:
 * class A{}
 * throwIfMatches(new A(), A);
 * @typeParam Type The actual type (prototype) of the class and class instance.
 */
function throwIfMatches<Type>(instance: Type, constructor: Constructable<Type>): void {
    if (Object.getPrototypeOf(instance) === constructor.prototype) {
        throw new DependencyInjectionError(constructor);
    }
}

export {throwIfMatches, DependencyInjectionError};
export type {Constructable};
