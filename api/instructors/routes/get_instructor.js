'use strict'

const instructorData = require('../../../instructors')
const query = require('../queries/instructors')

module.exports = {
	method: 'GET',
	path: '/api/instructors/{slug}',
	config: {
		pre: [
			{ method: query.getGithubImage, assign: 'image' }
		],
		handler: (request, reply) => {
			let instructor = instructorData.find((match) => {
				return match.slug === request.params.slug	
			})

			instructor.avatar = request.pre.image
			reply(instructor)
		}
	}
}
