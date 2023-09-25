// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();

// Use cors and body-parser
app.use(cors());
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create route for GET request
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create route for POST request
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get comments for a post
    const comments = commentsByPostId[req.params.id] || [];

    // Push new comment to comments array
    comments.push({ id: commentId, content });

    // Set comments for a post
    commentsByPostId[req.params.id] = comments;

    // Send response
    res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});    