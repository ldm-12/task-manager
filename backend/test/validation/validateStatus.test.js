const { expect } = require('chai');
const { validateStatus } = require('../../validation');
const createMockRes = require('./createMockRes')

describe('validateStatus', () => {
    it('should accept a valid status', () => {
        const permitted = ['Not started', 'In progress', 'Complete', 'Blocked'];

        permitted.forEach(status => {
            const req = { body: { status } };
            const res = createMockRes();
            const result = validateStatus(req, res);
            expect(result).to.equal(status);
        });

    });

    it('should reject an invalid status', () => {
        const req = { body: { status: 'Almost done' } };
        const res = createMockRes();
        const result = validateStatus(req, res);
        expect(result).to.be.undefined;
        expect(res.statusCode).to.equal(400);
    });

    it('should reject missing status', () => {
        const req = { body: {} };
        const res = createMockRes();
        const result = validateStatus(req, res);
        expect(result).to.be.undefined;
        expect(res.statusCode).to.equal(400);
    });
});
