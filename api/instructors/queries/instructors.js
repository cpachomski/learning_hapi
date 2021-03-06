'use strict'

const Wreck = require('wreck')
const Boom = require('boom')

let instructorData = require('../../../instructors')

const verifyUniqueInstructor = (request, reply) => {

	let existingInstructor = instructorData.find(
		instructor => instructor.name == request.payload.name
	)

	if (existingInstructor) {
		return reply(Boom.badRequest('Instructor exists already so bug off!'))
	} else {
		return reply();
	}
}

const createInstructorSlug = (request, reply) => {
	reply(request.payload.name.split(' ').join('-').toLowerCase())
}

const getGithubImage = (request, reply) => {
	const slug = request.params.slug

	const githubUser = instructorData.find(
		instructor => instructor.slug == slug
	).github

	if (!githubUser) {
		reply()
	}

	const options = {
		headers: { 'User-Agent': 'chris-is-learning'  },
		json: true
	}

	Wreck.get(
		`https://api.github.com/users/${githubUser}`,
		options,
		(err, response, payload) => {
			if (err) {
				return reply(Boom.badRequest('Unable to retrieve github avatar.'))
			}
			reply(payload.avatar_url)
		}
	)

}


module.exports = {
	verifyUniqueInstructor,
	createInstructorSlug,
	getGithubImage
}
