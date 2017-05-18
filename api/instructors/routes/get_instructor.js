'use strict'

const Boom = require('boom')
const instructorData = require('../../../instructors')
const query = require('../queries/instructors')
const { paramsValidator } = require('./../validations/get_instructor')


module.exports = {
	method: 'GET',
	path: '/api/instructors/{slug}',
	config: {
		pre: [
			{ method: query.getGithubImage, assign: 'image' }
		],
		validate: {
			params: paramsValidator
		},
		handler: (request, reply) => {
			let instructor = instructorData.find((match) => {
				return match.slug === request.params.slug	
			})

			if (!instructor) {
				return reply(Boom.notFound('Instructor not found :('))
			}

			instructor.avatar = request.pre.image
			reply(instructor)
		}
	}
}
