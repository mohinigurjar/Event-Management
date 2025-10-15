
const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./config/db');
eventRouter = require('./routes/eventRoutes');

app.use(express.json());
app.use('/api', eventRouter);


pool.connect()
.then(() => {
    console.log('Connected to the database');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch(err => {
    console.error('Failed to connect to the database', err);
    
});

