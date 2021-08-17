/* eslint-disable @typescript-eslint/no-namespace */
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { CleanUp } from './cleanUpUser';
import { UserTest } from '../constants/user';

declare global {
    namespace NodeJS {
        interface Global {
            signin(userUUID?: string): string[];
        }
    }
}

beforeAll(async() => {
    process.env.JWT_KEY = 'efewfw';
    await CleanUp.cleanUpUser();
});

afterAll(async() => {
    await CleanUp.cleanUpUser();
});

global.signin = (userUUID?: string) => {
    const id = userUUID || uuid();
    const payload = {
        uuid: id,
        email: UserTest.email
    }

    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY || 'iejoifw');

    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token }

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
}