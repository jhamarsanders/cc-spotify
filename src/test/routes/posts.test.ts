import request from 'supertest';
import { app } from '../../app';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CleanUp } from '../utils/cleanUpUser';
import { CreateMock } from '../utils/createMock';

let mockUser: User;

beforeEach(async() => {
    mockUser = await CreateMock.createMockUser();
});

afterEach(async() => {
    await CleanUp.cleanUpUser();
});

it('creates a post', async () => {
    const cookie = await global.signin(mockUser.uuid)

    const postData = {
        body: 'Blah blah blah blah'
    };


    const response = await request(app)
        .post('/posts')
        .set('Cookie', cookie)
        .send(postData)
        .expect(200);

    await Post.query().delete().where({ uuid: response.body.uuid });
});