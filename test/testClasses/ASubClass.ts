import {AnAbstractClass} from "./AnAbstractClass";

/**
 * A sub class that extends an abstract class.
 */
export class ASubClass extends AnAbstractClass {

    /**
     * @inheritDoc
     */
    public do() {
        console.log("Did it! 🚀");
    }
}