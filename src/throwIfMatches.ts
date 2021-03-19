import {DependencyInjectionError} from "./errors";
import {Constructor} from "./types";

/**
 * Throws an error if the instance is an instance of the class and not of a subclass.
 * @param instance The instance to check.
 * @param constructor The (abstract) constructor of the class.
 */
function throwIfMatches<Type>(instance: Type, constructor: Constructor<Type>): void {
    if (Object.getPrototypeOf(instance) === constructor.prototype) {
        throw new DependencyInjectionError(constructor);
    }
}

export {throwIfMatches};
