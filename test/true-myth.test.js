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
        expect( Maybe.just( 5 ) ).to.be.a.just()
    } )

    it( 'should fail if not expected Just is Just(5)', () => {
        const assertion = () => expect( Maybe.just( 5 ) ).to.not.be.a.just()
        expect( assertion ).to.throw()
    } )

    it( 'should expect Nothing to not be Just', () => {
        expect( Maybe.nothing() ).to.not.be.a.just()
    } )

    it( 'should fail if expected Just is Nothing', () => {
        const assertion = () => expect( Maybe.nothing() ).to.be.a.just()
        expect( assertion ).to.throw()
    } )

    it( 'should expect a non Maybe to not be Just', () => {
        expect( {} ).to.not.be.a.just()
    } )

    it( 'should fail if expected Just is not a Maybe', () => {
        const assertion = () => expect( {} ).to.be.a.just()
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

    it( 'should change the target to the just content', () => {
        expect( Maybe.just( { status: 200 } ) ).to.be.a.just().and.to.have.property( 'status', 200 )
    } )

    it( 'should fail when an assertion of just contents fails', () => {
        const assertion = () => expect( Maybe.just( { status: 200 } ) ).to.be.a.just().and.to.have.property( 'status', 400 )
        expect( assertion ).to.throw()
    } )

    it( 'should deep equal the contents of a just for arrays', () => {
        expect(Maybe.just([])).to.be.just([])
    } )

    it( 'should deep equal the contents of a just for objects', () => {
        expect(Maybe.just({a: [1, {x: 2}], b: true})).to.be.just({a: [1, {x: 2}], b: true})
    } )
} )
