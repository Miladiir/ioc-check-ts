# IOC-Check

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/miladiir/ioc-check-ts/Node.js%20CI)](https://github.com/Miladiir/ioc-check-ts/actions/workflows/node.js.yml?query=branch%3Amainn) [![npm](https://img.shields.io/npm/v/ioc-check)](https://www.npmjs.com/package/ioc-check)

Runtime checks to catch dependency injection configuration errors.

## Motivation

Dependency injection or inversion of control frameworks are awesome 99% of the time.
They are not so awesome when your tests fail in unexpected ways, or when your production build contains a class that belongs to a unit test.

My workmates and I therefore consider it a best practice to check the injected values during runtime.
If they match an abstract class, which we often use as our implementation interfaces, we let the app crash.
This has allowed us to catch bugs in the past and will make developing unit tests and predict their failures easier in the future.

Writing these runtime checks is however laborsome, error prone and repetitive.
I therefore generalized the problem and here we are.

## Usage

Currently there is only one flavour of injection checks.
`throwIfMatches` will throw an error if an instance of a class matches a class that is known to be incorrect one.

The general usage is as follows:

```javascript
class A {}

class B extends A {}

const {throwIfMatches} = require("ioc-check");

const instance1 = new B(); // or create an instance any other way
const instance2 = new A(); // e.g. ioc and dep-inj

throwIfMatches(instance1, A); // ok
throwIfMatches(instance2, A); // throws DependencyInjectionError
```

Create instances of objects however you like, in this case by calling the constructor directly. In practice, you would
probably want to use a inversion of control framework or implement dependency injection yourself. <br>
Then, compare the instance of your object against a class that you know your instance should not be an instance of. In
this specific example the comparison of the instance of B against A will pass the check, since the classes do not match
exactly. However, the comparison of the instance of A against A will not pass the check, since A -and only A- matches A
exactly. Thus, a `DependencyInjectionError` will be thrown.

An example that is perhaps more realistic is as follows:

```typescript
import {throwIfMatches} from "ioc-check";
import {Inject, Container} from "typescript-ioc";

abstract class Fruit {
    abstract takeABite();
}

class Apple extends Fruit {
    takeABite() {
        console.log("yummy 👌 nomnom 😊");
    }
}

class Human {
    private readonly food: Fruit;

    constructor(@Inject somethingToEat: Fruit) {
        throwIfMatches(somethingToEat, Fruit);
        this.food = somethingToEat;
    }
}
```

In this example we use `ioc-check` to check if the dependency injection by the popular `typescript-ioc` worked as
expected. Depending on how our ioc is configured, we could bind `Apple` to `Fruit` or let `Fruit` unbound. The latter
could for example be the case in unit tests, or when developing new components for the existing application. Explicit
checks for the correct configuration are oftentimes required to catch oversights. In our example above, we would not
want to let `Fruit` be unbound, since we apparently need instances of the class to do something in `Human`. Thus the
check is introduced, if `Fruit` is bound to a subclass, or a different class that is similar enough for typescript type
checks to pass.

Depending on how `Fruit` is bound, we can now observe different behaviours during runtime.

```typescript
Container.bind(Fruit).to(Apple);
const steve = Container.get(Human);
```

In this case `steve` will be successfully instantiated as the ioc runtime check has passed. His `food` property will be
populated with a new `Apple` object.

```typescript
Container.bind(Fruit).to(Fruit); // or simply omit this line
const steve = Container.get(Human); // throws DependencyInjectionError reason Fruit
```

In this case `steve` will not be instantiated and a `DependencyInjectionError` will be thrown. His `food` property would
have been populated with a new `Fruit` object. In this example an instantiation with a `Fruit` would have been
nonsensical, since `Fruit` should only be instantiated through subclasses. Thankfully, our manual check
with `throwIfMatches` caught this potential bug.

## Installation

`npm i --save ioc-check`

The [npm package](https://www.npmjs.com/package/ioc-check) contains the transpiled code and typescript typings.
Both are generated from the typescript source code.

## Updates

**ioc-check** follows [Semantic Versioning 2.0.0](https://semver.org/#semantic-versioning-200).
This means that you can decide based on the version number of the package if manual update intervention is required.
Head over to [Github Releases](https://github.com/Miladiir/ioc-check-ts/releases) or check the CHANGELOG file for changes between versions.
In most cases *npm* will take care of updates for you automatically with `npm update` or an alternative of your choice.

(Not Recommended)
`npm i --save ioc-check@latest` will force the package to the latest version in any case.