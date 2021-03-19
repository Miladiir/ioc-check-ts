import {CustomError} from "./";
import {Constructor} from "../types";

/**
 * Error that is emitted if a dependency injection failed.
 */
export class DependencyInjectionError<Type> extends CustomError {

    constructor(constructor: Constructor<Type>) {
        super(constructor.name);
    }
}