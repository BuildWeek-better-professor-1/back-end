/// <reference types='jest' /> 

const request = require('supertest')
const server = require('../api/server.js')

describe('server.js', () => {

    it('should return a JSON object from index route', async () => {
        const response = await request(server).get('/')

        expect(response.type).toEqual('application/json')
    })
    
    it('should return status code 200 at index route', async () => {
        const expectedStatusCode = 200
        const response = await request(server).get('/')

        expect(response.status).toEqual(expectedStatusCode)
    })

    it('should return the correct JSON object from index route', async () => {
        const expectedObject = {hello: `Let's get this f*cking party started`}
        const response = await request(server).get('/')

        expect(response.body).toEqual(expectedObject)
    })
})