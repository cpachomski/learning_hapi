'use strict'

const Joi = require('joi')

const payloadValidator = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	github: Joi.string(),
	courses: Joi.array().items(Joi.string())
})

module.exports = { payloadValidator }
