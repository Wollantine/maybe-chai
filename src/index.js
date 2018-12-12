function maybeToString( maybe, isMaybe ) {
    return !isMaybe
        ? '#{this}'
        : maybe.match( {
            Just: x => `Just(${x})`,
            Nothing: () => 'Nothing',
        } )
}

function tryCheckOrFalse( isMaybe, obj ) {
    let isAMaybe
    try {
        isAMaybe = isMaybe( obj )
    } catch (e) {
        isAMaybe = false
    }
    return isAMaybe
}

const trueMythAdapter = {
    match: ( maybe, cases ) => maybe.match( cases ),
    isMaybe: obj => obj && typeof obj.match === 'function',
}

function maybeChai( { match, isMaybe } = trueMythAdapter ) {
    return ( _chai, utils ) => {
        const { Assertion } = _chai

        utils.addMethod( Assertion.prototype, 'nothing', function nothingMethod() {
            const obj = this._obj
            const isAMaybe = tryCheckOrFalse( isMaybe, obj )

            this.assert(
                isAMaybe && match( obj, {
                    Just: () => false,
                    Nothing: () => true,
                } ),
                `expected ${maybeToString( obj, isAMaybe )} to be Nothing`,
                `expected ${maybeToString( obj, isAMaybe )} to not be Nothing`,
                { variant: 'Nothing' },
                obj,
            )
        } )

        utils.addMethod( Assertion.prototype, 'just', function justMethod( value ) {
            const obj = this._obj
            const isAMaybe = tryCheckOrFalse( isMaybe, obj )

            this.assert(
                isAMaybe && match( obj, {
                    Just: content => value === undefined || content === value,
                    Nothing: () => false,
                } ),
                `expected ${maybeToString( obj, isAMaybe )} to be Just(${value})`,
                `expected ${maybeToString( obj, isAMaybe )} to not be Just(${value})`,
                value === undefined
                    ? 'Just()'
                    : { value, variant: 'Just' },
                obj,
            )
        } )
    }
}

export default maybeChai
