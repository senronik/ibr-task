require('dotenv').config();
const express = require('express');
const dbConfig = require('./src/config/Db');
const path=require('path')
const cors = require('cors');
const userRoutes = require('./src/Authentication/routes/Authroutes');
const crudRoutes = require('./src/crud/routes/Crudroutes');
const app = express();
dbConfig.connect();

app.use(express.json());
app.use(cors()); 
app.use(express.json()); 
app.use('/upload', express.static('src/upload/'));

app.use('/api/user', userRoutes);
app.use('/api',crudRoutes);

app.get('/', (req, res) => res.json("hello"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))