const request = require('supertest');
const server = require('../server');

describe('Authentication API', () => {
    let token = '';

    // Test case for creating an account
    describe('POST /createAccount', () => {
        it('should create a new user account', async () => {
            const res = await request(server)
                .post('/api/createAccount')
                .send({
                    username: 'testUser',
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.username).toEqual('testUser');
        });

        it('should return 400 for invalid email or password', async () => {
            const res = await request(server)
                .post('/api/createAccount')
                .send({
                    username: 'testUser',
                    email: '', // Invalid email
                    password: '' // Invalid password
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toBeDefined();
        });

        // Add more test cases as needed
    });

    // Test case for user login
    describe('POST /login', () => {
        it('should log in a user and return a token', async () => {
            const res = await request(server)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeDefined();
            token = res.body.token; // Save the token for further tests
        });

        it('should return 400 for missing email or password', async () => {
            const res = await request(server)
                .post('/api/login')
                .send({
                    email: '', // Missing email
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toBeDefined();
        });

        // Add more test cases as needed
    });
});

const Communities = require('../models/Communities');

describe('Community Controller', () => {
  beforeEach(async () => {
    // ลบข้อมูลทั้งหมดใน Collection ก่อนทุกครั้งที่ทดสอบ
    await Communities.deleteMany({});
  });

  describe('POST /api/create', () => {
    it('should create a new community post', async () => {
      const postData = {
        author: 'Test Author',
        content: 'Test Content'
      };

      const res = await request(server)
        .post('/api/create')
        .send(postData)
        .expect(200);

      expect(res.body.author).toBe(postData.author);
      expect(res.body.content).toBe(postData.content);
    });

    it('should return 400 for invalid content', async () => {
      const postData = {
        author: 'Test Author',
        content: ''
      };

      const res = await request(server)
        .post('/api/create')
        .send(postData)
        .expect(400);

      expect(res.body.error).toBe('invalid content');
    });
  });

  describe('GET /api/posts', () => {
    it('should return all community posts', async () => {
      await Communities.create({ author: 'User 1', content: 'Post 1' });
      await Communities.create({ author: 'User 2', content: 'Post 2' });

      const res = await request(server)
        .get('/api/posts')
        .expect(200);

      expect(res.body.length).toBe(2);
    });
  });

  describe('DELETE /api/post/:postId', () => {
    it('should remove a community post', async () => {
      const post = await Communities.create({ author: 'User 1', content: 'Test Post' });

      const res = await request(server)
        .delete(`/api/post/${post._id}`)
        .expect(200);

      expect(res.body.message).toBe('ลบโพสต์สำเร็จ');
    });
  });

  describe('PUT /api/post/:postId', () => {
    it('should update a community post', async () => {
      const post = await Communities.create({ author: 'User 1', content: 'Original Content' });

      const updatedData = {
        author: 'User 2',
        content: 'Updated Content'
      };

      const res = await request(server)
        .put(`/api/post/${post._id}`)
        .send(updatedData)
        .expect(200);

      expect(res.body.message).toBe('อัพเดตโพสต์สำเร็จ');
    });
  });
});

const Comments = require("../models/Comments");

describe('Comment Controller', () => {
  beforeEach(async () => {
    // ลบข้อมูลทั้งหมดใน Collection ก่อนทุกครั้งที่ทดสอบ
    await Comments.deleteMany({});
  });

  describe('POST /api/comment', () => {
    it('should create a new comment', async () => {
      const commentData = {
        postId: "Test Id",
        author: 'Test Author',
        content: 'Test Content'
      };

      const res = await request(server)
        .post('/api/comment')
        .send(commentData)
        .expect(200);

      expect(res.body.postId).toBe(commentData.postId);
      expect(res.body.author).toBe(commentData.author);
      expect(res.body.content).toBe(commentData.content);
    });

    it('should return 400 for invalid content', async () => {
      const commentData = {
        postId: "Test Id",
        author: 'Test Author',
        content: ''
      };

      const res = await request(server)
        .post('/api/comment')
        .send(commentData)
        .expect(400);

      expect(res.body.error).toBe('invalid content');
    });
  });

  describe('DELETE /api/comment/:commentId', () => {
    it('should remove a comment', async () => {
      const comment = await Comments.create({ postId: "03", author: 'User 1', content: 'Test Comment' });

      const res = await request(server)
        .delete(`/api/comment/${comment._id}`)
        .expect(200);

      expect(res.body.message).toBe('ลบสำเร็จ');
    });
  });

  describe('PUT /api/comment/:commentId', () => {
    it('should update a comment', async () => {
      const comment = await Communities.create({ postId: "04", author: 'User 1', content: 'Original Content' });

      const updatedData = {
        author: 'User 2',
        content: 'Updated Content'
      };

      const res = await request(server)
        .put(`/api/comment/${comment._id}`)
        .send(updatedData)
        .expect(200);

      expect(res.body.message).toBe('อัพเดทคอมเมนต์สำเร็จ');
    });
  });
});