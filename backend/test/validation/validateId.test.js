const { expect } = require('chai');
const { validateId } = require('../../validation');
const createMockRes = require('./createMockRes')


describe('validateId', () => {
    it('should accept valid integer id', () => {
        const req = { params: { id: 123 } };
        const res = createMockRes();
        const result = validateId(req, res);
        expect(result).to.equal(123);
    });

    it('should accept valid integer id as string', () => {
        const req = { params: { id: '123' } };
        const res = createMockRes();
        const result = validateId(req, res);
        expect(result).to.equal(123);
    });

    it('should reject string id', () => {
        const req = { params: { id: 'abc' } };
        const res = createMockRes();
        const result = validateId(req, res);
        expect(result).to.be.undefined;
        expect(res.statusCode).to.equal(400);
    });

    it('should reject missing id', () => {
        const req = { params: {} };
        const res = createMockRes();
        const result = validateId(req, res);
        expect(result).to.be.undefined;
        expect(res.statusCode).to.equal(400);
    });
});