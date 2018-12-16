import chai from 'chai'
import maybeChai from '../src'

chai.use( maybeChai( {
    match: ( maybe, cases ) => maybe.match( cases ), // throws if maybe has no match method
    isMaybe: maybe => maybe.isMaybe(), // throws if maybe has no isMaybe method
} ) )

const { expect } = chai

describe( 'Custom Adapter', () => {
    describe( 'When isMaybe throws', () => {
        const nonMaybe = { match: () => false }

        it( 'should expect nonMaybe to not be nothing if isMaybe throws', () => {
            expect( nonMaybe ).to.not.be.nothing()
        } )

        it( 'should expect nonMaybe to not be just if isMaybe throws', () => {
            expect( nonMaybe ).to.not.be.just()
        } )

        it( 'should fail when expecting nonMaybe to be nothing and isMaybe throws', () => {
            const assertion = () => expect( nonMaybe ).to.be.nothing()
            expect( assertion ).to.throw()
        } )

        it( 'should fail when expecting nonMaybe to be just and isMaybe throws', () => {
            const assertion = () => expect( nonMaybe ).to.be.just()
            expect( assertion ).to.throw()
        } )
    } )

    describe( 'When match throws', () => {
        const nonMaybe = { isMaybe: maybe => maybe.isMaybe && maybe.isMaybe() }

        it( 'should expect nonMaybe to not be nothing if match throws', () => {
            expect( nonMaybe ).to.not.be.nothing()
        } )

        it( 'should expect nonMaybe to not be just if match throws', () => {
            expect( nonMaybe ).to.not.be.just()
        } )

        it( 'should fail when expecting nonMaybe to be nothing and match throws', () => {
            const assertion = () => expect( nonMaybe ).to.be.nothing()
            expect( assertion ).to.throw()
        } )

        it( 'should fail when expecting nonMaybe to be just and match throws', () => {
            const assertion = () => expect( nonMaybe ).to.be.just()
            expect( assertion ).to.throw()
        } )
    } )
} )
