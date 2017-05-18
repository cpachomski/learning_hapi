'use strict'

const Boom = require('boom')
const instructorData = require('../../../instructors')
const sortBy = require('lodash').sortBy

module.exports = {
	method: 'GET',
	path: '/api/instructors',
	config: {
		handler: (request, reply) => {

			if (!instructorData.length) {
				return reply(Boom.notFound('No instructors found!'))
			}

			const trimmedData = instructorData.map((instructor) => {
				return {
					id: instructor.id,
					name: instructor.name,
					slug: instructor.slug
				}
			})

			const sortDirection = request.query.sortDirection
			const sortKey = request.query.sortKey

			const sortData = (data, direction, key) => {
				if (direction === 'asc') {
					return sortBy(data, key)
				} else if (direction === 'desc') {
					return sortBy(data, key).reverse()
				} else {
					return data
				}
			}

			reply(sortData(trimmedData, sortDirection, sortKey))
		}
	}
}
