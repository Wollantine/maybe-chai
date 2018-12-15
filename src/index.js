function tryCheckOrFalse( isMaybe, obj ) {
    let isAMaybe
    try {
        isAMaybe = isMaybe( obj )
    } catch (e) {
        isAMaybe = false
    }
    return isAMaybe
}

function tryMatch( match, obj, cases ) {
    try {
        return match( obj, cases )
    } catch ( e ) {
        return cases.Nothing( obj )
    }
}

function maybeToString( maybe, isMaybe, match ) {
    return !isMaybe
        ? '#{this}'
        : tryMatch( match, maybe, {
            Just: x => `Just(${x})`,
            Nothing: () => 'Nothing',
        } )
}

const trueMythAdapter = {
    match: ( maybe, cases ) => maybe.match( cases ),
    isMaybe: obj => obj && typeof obj.match === 'function',
}

function maybeChai( customAdapter ) {
    const { isMaybe, match } = {
        ...trueMythAdapter,
        ...customAdapter,
    }
    return ( _chai, utils ) => {
        const { Assertion } = _chai

        utils.addMethod( Assertion.prototype, 'nothing', function nothingMethod() {
            const obj = this._obj
            const isAMaybe = tryCheckOrFalse( isMaybe, obj )
            const isNothing = tryMatch( match, obj, {
                Just: () => false,
                Nothing: () => true,
            } )

            this.assert(
                isAMaybe && isNothing,
                `expected ${maybeToString( obj, isAMaybe, match )} to be Nothing`,
                `expected ${maybeToString( obj, isAMaybe, match )} to not be Nothing`,
                { variant: 'Nothing' },
                obj,
            )
        } )

        utils.addMethod( Assertion.prototype, 'just', function justMethod( value ) {
            const obj = this._obj
            const isAMaybe = tryCheckOrFalse( isMaybe, obj )

            const assertionResult = isAMaybe && match( obj, {
                Just: content => value === undefined || content === value,
                Nothing: () => false,
            } )

            if (assertionResult) {
                utils.flag(this, 'object', match( obj, {
                    Just: content => content,
                    Nothing: () => undefined,
                } ) )
            }

            this.assert(
                assertionResult,
                `expected ${maybeToString( obj, isAMaybe, match )} to be Just(${value})`,
                `expected ${maybeToString( obj, isAMaybe, match )} to not be Just(${value})`,
                value === undefined
                    ? 'Just()'
                    : { value, variant: 'Just' },
                obj,
            )
        } )
    }
}

export default maybeChai
