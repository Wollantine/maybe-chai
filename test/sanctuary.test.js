/* eslint-disable */
import chai from 'chai'
import S from 'sanctuary'
import type from 'sanctuary-type-identifiers'
import maybeChai from '../src/index'

chai.use( maybeChai( {
    match: (maybe, cases) => S.maybe_ (cases.Nothing) (cases.Just) (maybe),
    isMaybe: obj => type.parse( type( obj ) ).name === 'Maybe',
} ) )

const { expect } = chai

describe( 'Sanctuary', () => {
    it( 'should expect Nothing to be Nothing', () => {
        expect(S.Nothing).to.be.nothing()
    } )

    it( 'should fail if not expected Nothing is Nothing', () => {
        const assertion = () => expect(S.Nothing).to.not.be.nothing()
        expect(assertion).to.throw()
    } )

    it( 'should expect a Just to not be Nothing', () => {
        expect(S.Just (0)).to.not.be.nothing()
    } )

    it( 'should fail if expected Nothing is a Just', () => {
        const assertion = () => expect(S.Just (0)).to.be.nothing()
        expect(assertion).to.throw()
    } )

    it( 'should expect a non Maybe to not be Nothing', () => {
        expect({}).to.not.be.nothing()
    } )

    it( 'should fail if expected Nothing is not a Maybe', () => {
        const assertion = () => expect({}).to.be.nothing()
        expect(assertion).to.throw()
    } )

    it( 'should expect Just(5) to be Just', () => {
        expect(S.Just (5)).to.be.just()
    } )

    it( 'should fail if not expected Just is Just(5)', () => {
        const assertion = () => expect(S.Just (5)).to.not.be.just()
        expect(assertion).to.throw()
    } )

    it( 'should expect Nothing to not be Just', () => {
        expect(S.Nothing).to.not.be.just()
    } )

    it( 'should fail if expected Just is Nothing', () => {
        const assertion = () => expect(S.Nothing).to.be.just()
        expect(assertion).to.throw()
    } )

    it( 'should expect a non Maybe to not be Just', () => {
        expect({}).to.not.be.just()
    } )

    it( 'should fail if expected Just is not a Maybe', () => {
        const assertion = () => expect({}).to.be.just()
        expect(assertion).to.throw()
    } )

    it( 'should expect Just(5) to be Just(5)', () => {
        expect(S.Just (5)).to.be.just(5)
    } )

    it( 'should fail if not expected Just(5) is Just(5)', () => {
        const assertion = () => expect(S.Just (5)).to.not.be.just(5)
        expect(assertion).to.throw()
    } )

    it( 'should expect Just(6) to not be Just(5)', () => {
        expect(S.Just (6)).to.not.be.just(5)
    } )

    it( 'should fail if expected Just(5) is Just(6)', () => {
        const assertion = () => expect(S.Just (6)).to.be.just(5)
        expect(assertion).to.throw()
    } )

    it( 'should expect Nothing to not be Just(5)', () => {
        expect(S.Nothing).to.not.be.just(5)
    } )

    it( 'should fail if expected Just(5) is Nothing', () => {
        const assertion = () => expect(S.Nothing).to.be.just(5)
        expect(assertion).to.throw()
    } )

    it( 'should expect a non Maybe to not be Just(5)', () => {
        expect({}).to.not.be.just(5)
    } )

    it( 'should fail if expected Just(5) is not a Maybe', () => {
        const assertion = () => expect({}).to.be.just(5)
        expect(assertion).to.throw()
    } )

    it( 'should change the target to the just content', () => {
        expect(S.Just ({status: 200})).to.be.a.just().and.to.have.property('status', 200)
    } )

    it( 'should fail when an assertion of just contents fails', () => {
        const assertion = () => expect(S.Just ({status: 200})).to.be.a.just().and.to.have.property('status', 400)
        expect(assertion).to.throw()
    } )

    it( 'should deep equal the contents of a just for arrays', () => {
        expect(S.Just ([])).to.be.just([])
    } )

    it( 'should deep equal the contents of a just for objects', () => {
        expect(S.Just ({a: [1, {x: 2}], b: true})).to.be.just({a: [1, {x: 2}], b: true})
    } )
} )
/* eslint-enable */
