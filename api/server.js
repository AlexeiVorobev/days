const path = require('path')
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors')

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: 'http://localhost:5173'
  }))

app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//Serve frontend
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "../", 'client', 'dist', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to'))
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
