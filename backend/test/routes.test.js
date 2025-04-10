const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('API routes', () => {
    let taskId;

    describe('create task', () => {
        it('should create a task with valid data', async () => {
            const res = await request(app)
                .post('/')
                .send({
                    title: 'Test task',
                    description: 'Some details',
                    status: 'Not started',
                    due_date: '2025-04-10'
                });

            expect(res.statusCode).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body.title).to.equal('Test task');
        });

        it('should reject a task with missing title', async () => {
            const res = await request(app)
                .post('/')
                .send({
                    description: 'No title',
                    status: 'Not started',
                    due_date: '2025-04-10'
                });

            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('details');
        });
    });

    describe('get task by id', () => {
        it('should return a task by id', async () => {
            const newTask = await request(app)
                .post('/')
                .send({
                    title: 'a task',
                    description: '',
                    status: 'In progress',
                    due_date: '2025-04-10'
                });

            taskId = newTask.body.id;
            const res = await request(app).get(`/tasks/${taskId}`);

            expect(res.statusCode).to.equal(200);
            expect(res.body.id).to.equal(taskId);
        });

        it('should return 404 for missing task', async () => {
            const res = await request(app).get('/tasks/12345');
            expect(res.statusCode).to.equal(404);
        });
    });

    describe('list tasks', () => {
        it('should list tasks', async () => {

            for (let i = 1; i <= 8; i++) {
                await request(app)
                    .post('/')
                    .send({
                        title: `task ${i}`,
                        description: 'Some details',
                        status: 'Not started',
                        due_date: '2025-04-10'
                    });
            };

            const res = await request(app).get('/tasks');
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(10); // 2 from previous tests, 8 from this one
        });
    });

    describe('update task status', () => {
        it('should update status of task', async () => {
            const res = await request(app).put(`/tasks/${taskId}`).send({ "status": "Complete" });
            expect(res.body.status).to.equal('Complete');
        });

        it('should not update status of task when not one of permitted values', async () => {
            const res = await request(app).put(`/tasks/${taskId}`).send({ "status": "Unknown" });
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('details');

            const res2 = await request(app).get(`/tasks/${taskId}`);
            expect(res2.body.status).to.equal('Complete'); // should not have changed
        });
    });

    describe('delete task', () => {
        it('should delete task', async () => {
            const res = await request(app).delete(`/tasks/${taskId}`);
            expect(res.body.id).to.equal(taskId);

            const missing_res = await request(app).get(`/tasks/${taskId}`);
            expect(missing_res.statusCode).to.equal(404);
            expect(missing_res.body.message).to.equal(`cannot find task with id ${taskId}`)
        });

        it('should return 404 when deleting nonexistent task', async () => {
            const res = await request(app).delete(`/tasks/12345`);
            expect(res.statusCode).to.equal(404);
            expect(res.body.message).to.equal(`cannot find task with id 12345`);
        });
    });



});
