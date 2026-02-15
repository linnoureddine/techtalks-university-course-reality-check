const express = require('express');
const app = express();
const reviewsRouter = require('./review'); // make sure path is correct

app.use(express.json()); // parse JSON request bodies

// Mount the review routes
app.use('/api/reviews', reviewsRouter);

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));

