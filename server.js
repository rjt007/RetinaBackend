require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const usersRoute = require('./routes/users');

//CORS Setting
const CorsOptions = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH'
    ],
    allowedHeaders: [
      'Content-Type', 'Authorization'
    ],
};
  
app.use(cors(CorsOptions));
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({request: 'success'});
});

app.use('/api/user', usersRoute);

//Database Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log(`Server is listening on PORT ${PORT}`));


