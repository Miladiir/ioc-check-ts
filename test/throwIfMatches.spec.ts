import {expect} from "chai";

import {DependencyInjectionError, throwIfMatches} from "../src";

import {AnAbstractClass} from "./testClasses/AnAbstractClass";
import {ANonAbstractClass} from "./testClasses/ANonAbstractClass";
import {ASubClass} from "./testClasses/ASubClass";

describe(throwIfMatches.name, (): void => {

    it("should throw if value is an instance of the passed abstract class", (): void => {
        // @ts-expect-error abstract class only exist in typescript. They are actually just classes with a typecheck
        expect((): void => throwIfMatches(new AnAbstractClass(), AnAbstractClass))
            .to.throw(DependencyInjectionError, AnAbstractClass.name);
    });

    it("should throw if value is an instance of the passed child class", (): void => {
        expect((): void => throwIfMatches(new ASubClass(), ASubClass))
            .to.throw(DependencyInjectionError, ASubClass.name);
    });

    it("should throw if value is an instance of the passed non-abstract class", (): void => {
        expect((): void => throwIfMatches(new ANonAbstractClass(), ANonAbstractClass))
            .to.throw(DependencyInjectionError, ANonAbstractClass.name);
    });

    it("should not throw if the instance is not a direct instance of the class", (): void => {
        expect(throwIfMatches(new ASubClass(), AnAbstractClass)).to.equal(undefined);
    });

    it("should not throw if the instance type does not match the class type", (): void => {
        // @ts-expect-error No runtime error but ts should complain that the instance and class do not match.
        expect(throwIfMatches(new ANonAbstractClass, AnAbstractClass)).to.equal(undefined);
    });
});
