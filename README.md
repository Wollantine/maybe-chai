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



Here are the currently tested adapters:

### true-myth
```javascript
chai.use( maybeChai( {
    match: (maybe, cases) => maybe.match( cases ),
    isMaybe: obj => obj && typeof obj.match === 'function',
} ) )
```

## Usage
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

##