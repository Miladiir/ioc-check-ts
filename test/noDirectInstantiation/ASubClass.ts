import {AnAbstractClass} from "./AnAbstractClass";

/**
 * Another test class. This one should be instantiable though.
 */
export class ASubClass extends AnAbstractClass {

    /** @inheritDoc */
    public doSomething(): void {
        // I mean, we dont have to do anything really.
    }
}