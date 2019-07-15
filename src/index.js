import deepEql from 'deep-eql'

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
            Just: x => `Just(${JSON.stringify(x)})`,
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
            const sut = this._obj
            const isSutAMaybe = tryCheckOrFalse( isMaybe, sut )

            const assertionResult = isSutAMaybe && match( sut, {
                Just: content => value === undefined || deepEql(content, value),
                Nothing: () => false,
            } )

            if (assertionResult) {
                utils.flag(this, 'object', match( sut, {
                    Just: content => content,
                    Nothing: () => undefined,
                } ) )
            }

            const assertingOnlyVariant = value === undefined
            const expected = assertingOnlyVariant ? 'a Just' : `Just(${JSON.stringify(value)})`
            const actual = maybeToString( sut, isSutAMaybe, match )
            const actualContent = tryMatch( match, sut, {
                Just: content => ({ value: content, variant: 'Just' }),
                Nothing: () => ({ variant: 'Nothing' })
            } )

            this.assert(
                assertionResult,
                `expected ${actual} to be ${expected}`,
                `expected ${actual} to not be ${expected}`,
                assertingOnlyVariant
                    ? { variant: 'Just' }
                    : { value, variant: 'Just' },
                isSutAMaybe
                    ? assertingOnlyVariant ? { variant: 'Nothing' } : actualContent
                    : sut,
            )
        } )
    }
}

export default maybeChai
