'use strict'

const Hapi = require('hapi')
const instructorData = require('./instructors')
const sortBy = require('lodash').sortBy
const PORT = process.env.PORT

const server = new Hapi.Server()

server.connection({ port: PORT })

server.route(require('./api/instructors/routes/get_instructor'))
server.route(require('./api/instructors/routes/get_instructors'))

server.route(require('./api/instructors/routes/post_instructor'))

server.start(err => {
	if (err) throw err;
	console.log('Server listening on port '+ PORT + '...')
});	
