const { expect } = require('chai');
const { validateCreateRequest } = require('../../validation');
const createMockRes = require('./createMockRes')

describe('validateCreateRequest', () => {
    it('should accept valid request with description', () => {
        const req = {
            body: {
                title: 'My Task',
                description: 'Details here',
                status: 'Complete',
                due_date: '2025-04-30T00:00:00Z'
            }
        };
        const res = createMockRes();
        const result = validateCreateRequest(req, res);
        expect(result).to.deep.equal({
            ...req.body,
            due_date: new Date('2025-04-30T00:00:00Z')
        });
        expect(res.statusCode).to.be.null;
    });

    it('should accept valid request without description', () => {
        const req = {
            body: {
                title: 'Another Task',
                description: '',
                status: 'Blocked',
                due_date: '2025-05-01'
            }
        };
        const res = createMockRes();
        const result = validateCreateRequest(req, res);
        expect(result).to.deep.equal({
            ...req.body,
            due_date: new Date('2025-05-01')
        });
    });

    it('should reject missing title', () => {
        const req = {
            body: {
                description: 'Missing title',
                status: 'Not started',
                due_date: '2025-05-01'
            }
        };
        const res = createMockRes();
        const result = validateCreateRequest(req, res);
        expect(result).to.be.undefined;
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('invalid request');
    });

    it('should reject invalid status', () => {
        const req = {
            body: {
                title: 'Invalid status test',
                description: '',
                status: 'Unknown status',
                due_date: '2025-05-01'
            }
        };
        const res = createMockRes();
        const result = validateCreateRequest(req, res);
        expect(result).to.be.undefined;
        expect(res.statusCode).to.equal(400);
    });

    it('should reject missing due_date', () => {
        const req = {
            body: {
                title: 'No date',
                description: '',
                status: 'Not started'
            }
        };
        const res = createMockRes();
        const result = validateCreateRequest(req, res);
        expect(result).to.be.undefined;
        expect(res.statusCode).to.equal(400);
    });
});
