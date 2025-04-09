const Joi = require('joi');

const status_schema = Joi.string().valid(
    'Not started',
    'In progress',
    'Complete',
    'Blocked'
).required();

const id_schema = Joi.number().integer().required();

const create_task_schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    status: status_schema,
    due_date: Joi.date().required()
});

const validate = (req, res, schema) => {
    const { value, error } = schema.validate(req);

    if (error) {
        res.status(400).json({ message: 'invalid request', details: error.details });
        return;
    };

    return value;
};

const validateCreateRequest = (req, res) => validate(req.body, res, create_task_schema);
const validateId = (req, res) => validate(req.params.id, res, id_schema);
const validateStatus = (req, res) => validate(req.body.status, res, status_schema);

module.exports = { validateCreateRequest, validateId, validateStatus };