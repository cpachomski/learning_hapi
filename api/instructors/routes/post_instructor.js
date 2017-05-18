'use strict'

const instructorData = require('../../../instructors')
const query = require('../queries/instructors')
const { payloadValidator } = require('../validations/post_instructor')

module.exports = {
	method: 'POST',
	path: '/api/instructors',
	config: {
		pre: [
			{ method: query.verifyUniqueInstructor },
			{ method: query.createInstructorSlug, assign: 'slug' }
		],
		validate: {
			payload: payloadValidator
		},
		handler: (request, reply) => {
			let submittedData = request.payload
			submittedData.id = instructorData.length + 1
			submittedData.slug = request.pre.slug
			instructorData.push(submittedData)

			reply(instructorData.find(instructor => instructor.id === submittedData.id))
		}
	}
}
