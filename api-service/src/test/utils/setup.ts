import request from 'supertest';
import { app } from '../../app';
import jwt from 'jsonwebtoken';

const OLD_ENV = process.env;

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules()
    process.env = { ...OLD_ENV }; // Make a copy
});

afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
});
