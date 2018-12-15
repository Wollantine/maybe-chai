# Adapters

This is the list of currently tested adapters for popular monad libraries that define a Maybe type:

## true-myth (default)
```javascript
chai.use( maybeChai( {
    match: ( maybe, cases ) => maybe.match( cases ),
    isMaybe: obj => obj && typeof obj.match === 'function',
} ) )
```

## Sanctuary
```javascript
chai.use( maybeChai( {
    match: (maybe, cases) => S.maybe_ (cases.Nothing) (cases.Just) (maybe),
    isMaybe: obj => type.parse( type( obj ) ).name === 'Maybe',
} ) )
```
