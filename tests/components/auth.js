// testing user authorization 

/// <reference types='jest' />
require('dotenv')

const request = require('supertest')
const server = require('../../api/server.js')
const db = require('../../database/dbConfig.js')
const Users = require('../../users/users-model.js')

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

describe('auth-router POST to /register', () => {

    beforeEach(async () => {
        await db('professorUsers').truncate()
    })

    it('should return with status code 400', async () => {
        const expectedStatusCode = 400
        const res = await request(server)
                        .post('/api/auth/register')
                        .send({expect: "to fail"})
        
        expect(res.status).toEqual(expectedStatusCode)
    })

    it('should return with JSON object', async () => {
        const expectedResponse = {message: 'First Name, Username, Email, Password fields all required'}
        const res = await request(server)
                        .post('/api/auth/register')
                        .send({expect: "to fail"})

        expect(res.type).toEqual('application/json')
        expect(res.body).toEqual(expectedResponse)
    })

    it('should return with status code 201 and add new user', async () => {
        const expectedStatusCode = 201
        const res = await request(server)
                        .post('/api/auth/register')
                        .send(professorUsers[1])

        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body.data.user).toEqual({
            id: 1,
            username: 'blackmamba',
            email: 'mamba@lakers.com',
            first_name: 'Kobe',
            last_name: 'Bryant',
            type: "professor"
        })
    })

    it('should add new users to the database', async () => {
        const expectedLength = 3
        await professorUsers.forEach(user => {
            return Users.add(user)
        })

        const users = await db('professorUsers')

        expect(users).toHaveLength(expectedLength)

    })
})

describe('auth-router POST to /login (professor)', () => {
    beforeEach(async () => {
        await db('professorUsers').truncate()
    })

    beforeEach(async () => {
        await request(server)
                .post('/api/auth/register')
                .send(professorUsers[0])
    })

    it('should return status code 400', async () =>{
        const expectedStatusCode = 400
        const expectedResponse = {errorMessage: `Username and password required`}
        const res = await request(server)
                            .post('/api/auth/login?type=p')
                            .send({expect: "to fail"})
        
        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body).toEqual(expectedResponse)
    })

    it('should return status code 401', async () => {
        const expectedStatusCode = 401
        const expectedResponse = {message: `Invalid credentials`}
        const res = await request(server)
                            .post('/api/auth/login?type=p')
                            .send({
                                username: professorUsers[1].username,
                                password: professorUsers[1].password
                            })

        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body).toEqual(expectedResponse)
    })

    it('should return status code 200', async () => {
        const expectedStatusCode = 200
        const expectedResponse = {
            id: 1,
            username: 'kingjames',
            email: 'lebron@lakers.com',
            first_name: 'Lebron',
            last_name: 'James',
            type: "professor"
        }
        const res = await request(server)
                        .post('/api/auth/login?type=p')
                        .send({
                            username: professorUsers[0].username,
                            password: professorUsers[0].password
                        })
        
        expect(res.status).toEqual(expectedStatusCode)
        expect(res.body.data.user).toEqual(expectedResponse)
    })
})