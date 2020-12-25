import request from 'supertest';
import { app } from '../../app';
import { UserTest } from '../constants/user';
import { CleanUp } from '../utils/cleanUpUser';

beforeEach(async() => {
    await CleanUp.cleanUpUser();
});

it('returns a 201 on successful signup', async () => {
    const { email, password, firstName, lastName } = UserTest;
    await request(app)
        .post('/auth/signup')
        .send({ email, password, firstName, lastName })
        .expect(200);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/auth/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/auth/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    return request(app)
        .post('/auth/signup')
        .send({})
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/auth/signup')
        .send({
            email: UserTest.email,
            password: UserTest.password
        })
        .expect(200)

    await request(app)
        .post('/auth/signup')
        .send({
            email: UserTest.email,
            password: UserTest.password
        })
        .expect(400)
});

it('responds with a cookie when given valid credentials to sign up', async () => {
    const { email, password, firstName, lastName } = UserTest;
    const response = await request(app)
        .post('/auth/signup')
        .send({ email, password, firstName, lastName })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails when an email that does not exist is supplied', async () => {
    await request(app)
        .post('/auth/login')
        .send({
            email: UserTest.email,
            password: UserTest.password
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/auth/signup')
        .send({
            email: UserTest.email,
            password: UserTest.password
        })
        .expect(200);

    await request(app)
        .post('/auth/login')
        .send({
            email: UserTest.email,
            password: 'sgweewewg'
        })
        .expect(400);
});

it('responds with a cookie when given valid credentials to log in', async () => {
    await request(app)
        .post('/auth/signup')
        .send({
            email: UserTest.email,
            password: UserTest.password
        })
        .expect(200);

    const response = await request(app)
        .post('/auth/login')
        .send({
            email: UserTest.email,
            password: UserTest.password
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('responds with details about the current user', async () => {
    const cookie = await global.signin()

    const response = await request(app)
        .get('/auth/current-user')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual(UserTest.email);
});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/auth/current-user')
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});
