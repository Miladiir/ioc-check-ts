import {DependencyInjectionError} from "./errors/DependencyInjectionError";

/**
 * Modifies classes that should not be instantiated directly to throw an error when this error
 * case happens.
 *
 * For example, to use this decorator. Prepend a class declaration with the decorator before it.
 * It needs to be the last decorator in your list.
 *
 * ```javascript
 * @Singleton // Or any other decorator that is not included in this project
 * @noDirectInstantiation
 * class AClass{}
 *
 * class BClass extends AClass{
 *
 * new BClass(); // ok
 * new AClass(); // will throw DependencyInjectionError: AClass ...
 * ```
 * @param constructable The class that should not be instantiated directly
 */
function noDirectInstantiation(constructable: any): any {
    abstract class NotDirectlyInstantiable extends constructable {
        protected constructor(...args: any[]) {
            super(...args);
            if (new.target === NotDirectlyInstantiable) {
                throw new DependencyInjectionError(constructable);
            }
        }
    }

    Object.defineProperty(NotDirectlyInstantiable, "name", {value: constructable.name});

    return NotDirectlyInstantiable;
}

export {DependencyInjectionError, noDirectInstantiation};
