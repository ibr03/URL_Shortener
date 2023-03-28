const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();

// Body-parser
app.use(express.urlencoded({ extended: true}));

// Set view engine
app.set('view engine', 'ejs');

// load assets
app.use('/static', express.static(`${process.cwd()}/static`));

// Define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));