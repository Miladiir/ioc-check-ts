import {noDirectInstantiation} from "../../src/noDirectInstantiation";

/**
 * A test class that is abstract and should not be instantiated directly.
 * @decorator noDirectInstantiation Do not directly instantiate this class
 */
@noDirectInstantiation
export class ANonAbstractClass {

    /**
     * Do nothing.
     */
    public doNothing():void {
        // What did you expect?
    }
}