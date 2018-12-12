# maybe-chai
Chai plugin for Maybe monads

Currently only compatible with True Myth.

NOT YET PUBLISHED to NPM

## Installation

```javascript
// Before all the tests
import chai from 'chai'
import maybeChai from 'maybe-chai'

chai.use( maybeChai() )
```

## Adapting it to your Maybe library
Maybe-chai works out of the box for `true-myth` library because reasons.
If you want to use another library, you will need to pass it an adapter.

You can configure an adapter by passing an object to `maybeChai()` that follows this signature:
```javascript
maybeChai( {
    match: (maybe: Maybe<T>, cases: MatchCases<T, U>) => U,
    isMaybe: (maybe: Maybe<T>) => Boolean,
} )

type MatchCases<T, U> = {
    Just: (value: T) => U,
    Nothing: () => U,
}
```
Types will not be strictly enforced, but you should check your tests work properly.

However, the aim of this library is to provide an adapter for each of the most popular Monad libraries out there.

You can [check the list of adapters here](./adapters.md).


## Usage
Example (with true-myth):

```javascript
expect( Maybe.just(5) ).to.be.just()        // OK!
expect( Maybe.just(5) ).to.be.just(5)       // OK!
expect( Maybe.nothing() ).to.be.just(5)     // fails
expect( Maybe.nothing() ).to.not.be.just(5) // OK!
expect( 'string' ).to.be.just(5)            // fails
expect( 'string' ).to.not.be.just(5)        // OK!

expect( Maybe.nothing() ).to.be.nothing()   // OK!
expect( Maybe.just(5) ).to.be.nothing()     // fails
expect( Maybe.just(5) ).to.not.be.nothing() // OK!
expect( 'string' ).to.be.nothing()          // fails
expect( 'string' ).to.not.be.nothing()      // OK!
```

## Supported libs
Although the library allows you to provide an adapter to any library,
the aim of the library is to provide a recipe here for each of the
most popular monad libraries in Javascript:

- [x] True Myth
- [ ] TSMonad
- [ ] Folktale
- [ ] Sanctuary
- [ ] Monet
- [ ] Crocks
- [ ] KudoJS
- [ ] Purify
