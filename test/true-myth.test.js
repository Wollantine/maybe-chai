import chai from 'chai'
import { Maybe } from 'true-myth'
import maybeChai from '../src/index'


chai.use( maybeChai() )
const { expect } = chai

describe( 'True Myth', () => {
    it( 'should expect Nothing to be Nothing', () => {
        expect( Maybe.nothing() ).to.be.nothing()
    } )

    it( 'should fail if not expected Nothing is Nothing', () => {
        const assertion = () => expect( Maybe.nothing() ).to.not.be.nothing()
        expect( assertion ).to.throw()
    } )

    it( 'should expect a Just to not be Nothing', () => {
        expect( Maybe.just( 0 ) ).to.not.be.nothing()
    } )

    it( 'should fail if expected Nothing is a Just', () => {
        const assertion = () => expect( Maybe.just( 0 ) ).to.be.nothing()
        expect( assertion ).to.throw()
    } )

    it( 'should expect a non Maybe to not be Nothing', () => {
        expect( {} ).to.not.be.nothing()
    } )

    it( 'should fail if expected Nothing is not a Maybe', () => {
        const assertion = () => expect( {} ).to.be.nothing()
        expect( assertion ).to.throw()
    } )

    it( 'should expect Just(5) to be Just', () => {
        expect( Maybe.just( 5 ) ).to.be.just()
    } )

    it( 'should fail if not expected Just is Just(5)', () => {
        const assertion = () => expect( Maybe.just( 5 ) ).to.not.be.just()
        expect( assertion ).to.throw()
    } )

    it( 'should expect Nothing to not be Just', () => {
        expect( Maybe.nothing() ).to.not.be.just()
    } )

    it( 'should fail if expected Just is Nothing', () => {
        const assertion = () => expect( Maybe.nothing() ).to.be.just()
        expect( assertion ).to.throw()
    } )

    it( 'should expect a non Maybe to not be Just', () => {
        expect( {} ).to.not.be.just()
    } )

    it( 'should fail if expected Just is not a Maybe', () => {
        const assertion = () => expect( {} ).to.be.just()
        expect( assertion ).to.throw()
    } )

    it( 'should expect Just(5) to be Just(5)', () => {
        expect( Maybe.just( 5 ) ).to.be.just( 5 )
    } )

    it( 'should fail if not expected Just(5) is Just(5)', () => {
        const assertion = () => expect( Maybe.just( 5 ) ).to.not.be.just( 5 )
        expect( assertion ).to.throw()
    } )

    it( 'should expect Just(6) to not be Just(5)', () => {
        expect( Maybe.just( 6 ) ).to.not.be.just( 5 )
    } )

    it( 'should fail if expected Just(5) is Just(6)', () => {
        const assertion = () => expect( Maybe.just( 6 ) ).to.be.just( 5 )
        expect( assertion ).to.throw()
    } )

    it( 'should expect Nothing to not be Just(5)', () => {
        expect( Maybe.nothing() ).to.not.be.just( 5 )
    } )

    it( 'should fail if expected Just(5) is Nothing', () => {
        const assertion = () => expect( Maybe.nothing() ).to.be.just( 5 )
        expect( assertion ).to.throw()
    } )

    it( 'should expect a non Maybe to not be Just(5)', () => {
        expect( {} ).to.not.be.just( 5 )
    } )

    it( 'should fail if expected Just(5) is not a Maybe', () => {
        const assertion = () => expect( {} ).to.be.just( 5 )
        expect( assertion ).to.throw()
    } )
} )
