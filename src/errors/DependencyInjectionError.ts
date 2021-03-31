import {CustomError} from "./CustomError";
import {Constructable} from "../types/Constructable";

/**
 * Error that is emitted if a dependency injection failed.
 */
export class DependencyInjectionError<Type> extends CustomError {

    /**
     * Create a new dependency injection error.
     * @param constructable The class that is the cause for the error
     * @example
     * class AClass {}
     * throw new DependencyInjectionError(AClass);
     * // => emits like
     * // DependencyInjectionError: AClass
     * // at ...
     */
    public constructor(constructable: Constructable<Type>) {
        super(constructable.name);
    }
}