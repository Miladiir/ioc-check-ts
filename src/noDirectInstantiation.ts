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

    const name = constructable.name;
    const map: Record<string, any> = {};
    // Trick to de-anonymize an anonymous class. We reuse the targets class name.
    map[name] = class extends constructable {

        /**
         * Instantiate a new proxy class. This will be done automatically when a class
         * object is proxied and a new instance of the class or a subclass is instantiated.
         * @param args The original constructor arguments
         */
        protected constructor(...args: any[]) {
            super(...args);
            // Compare the constructor functions of the new() Target and this anonymous class.
            // If they match exactly, this anonymous class was instantiated directly.
            // Since it proxies the original class, the latter was tried to be instantiated directly.
            if (new.target === map[name]) {
                throw new DependencyInjectionError(constructable);
            }
        }
    }

    return map[name];
}

export {DependencyInjectionError, noDirectInstantiation};
