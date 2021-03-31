import {noDirectInstantiation} from "../../src/noDirectInstantiation";

/**
 * A test class that is abstract and should not be instantiated directly.
 * @decorator noDirectInstantiation Do not directly instantiate this class
 */
@noDirectInstantiation
export abstract class AnAbstractClass {

    /**
     * Do something.
     */
    public abstract doSomething(): void;
}