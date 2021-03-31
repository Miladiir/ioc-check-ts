import {noDirectInstantiation, DependencyInjectionError} from "../../src/noDirectInstantiation";
import {AnAbstractClass} from "./AnAbstractClass";
import {expect} from "chai";
import {ANonAbstractClass} from "./ANonAbstractClass";
import {ASubClass} from "./ASubClass";

describe(noDirectInstantiation.name, (): void => {

    it("should prevent direct instantiation of decorated classes", (): void => {

        // @ts-expect-error TS prevents new() on abstract classes but during runtime this would work.
        expect(() => new AnAbstractClass()).to.throw(DependencyInjectionError, AnAbstractClass.name);

        expect(() => new ANonAbstractClass()).to.throw(DependencyInjectionError, ANonAbstractClass.name);
    });

    it("should allow indirect instantiation through a subclass", (): void => {

        const aSubClassInstance = new ASubClass();
        expect(aSubClassInstance).to.be.an.instanceOf(ASubClass);
        expect(aSubClassInstance).to.be.an.instanceOf(AnAbstractClass);
    })
});