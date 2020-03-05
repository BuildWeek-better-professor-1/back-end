// tests for professor-router.js

/// <reference types='jest' />

const request = require('supertest')
const server = require('../api/server.js')
const db = require('../database/dbConfig.js')
const Users = require('../users/users-model.js')

const professorUsers = [
    {
        username: 'kingjames',
        password: 'kingjames',
        email: 'lebron@lakers.com',
        firstName: 'Lebron',
        lastName: 'James'
    },
    {
        username: 'blackmamba',
        password: 'mambamentality',
        email: 'mamba@lakers.com',
        firstName: 'Kobe',
        lastName: 'Bryant'
    },
    {
        username: 'thebrow',
        password: 'unibrow23',
        email: 'thebrow@lakers.com',
        firstName: 'Anthony',
        lastName: 'Davis'
    }
]

const user = {
    username: 'dame',
    password: 'damedolla',
    email: 'dame@blazers.com',
    firstName: 'Damian',
    lastName: 'Lillard'
}

describe('professor-router GET / ', () => {
    beforeEach(async () => {
        await db('professorUsers').truncate()
    })

    beforeEach(async () => {
        await professorUsers.forEach(prof => {
            return Users.add(prof)
        })
    })

    it('should return an array of all professors', async () => {
        const expectedLength = 3
        const expectedStatusCode = 200
        const res = await request(server)
                            .get('/api/users/professor/')
        
        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body.data.professors).toHaveLength(expectedLength)
    })
})

describe('professor-router GET /:id', () => {
    let token

    beforeEach(async () => {
        await db('professorUsers').truncate()

        await professorUsers.forEach(prof => {
            return Users.add(prof)
        })
    })

    beforeEach(async () => {
        await request(server)
        .post('/api/auth/register')
        .send(user)
        .then(res => {
            return token = res.body.data.token
        })
    })

    it('should return with status code 400/Invalid User ID error message', async () => {
        const expectedStatusCode = 400
        const expectedResponse = {message: 'Invalid User ID'}

        const res = await request(server)
                            .get('/api/users/professor/10')

        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body).toEqual(expectedResponse)
    })

    it("should return with status code 401/can't touch that error message", async () => {
        const expectedStatusCode = 401
        const expectedResponse = { you: "can't touch that." }

        const res = await request(server)
                            .get('/api/users/professor/2')
        
        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body).toEqual(expectedResponse)
    })

    it('should return with status code 200/professor info', async () => {
        const expectedStatusCode = 200
        const expectedResponse =  {
            id: 2,
            username: 'blackmamba',
            email: 'mamba@lakers.com',
            first_name: 'Kobe',
            last_name: 'Bryant',
            type: "professor"
        }

        const res = await request(server)
                            .get('/api/users/professor/2')
                            .set('authorization', token)

        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body.data.user).toEqual(expectedResponse)
    })
})

// describe('professor-router PUT /:id', () => {
//     beforeEach(async () => {
//         await db('professorUsers').truncate()
//     })
// })