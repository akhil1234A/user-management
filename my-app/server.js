const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json()) //to parse json data from requests

app.get('/api',(req,res)=>{
  res.send('API is running');
});


app.use('/api/users',userRoutes);


mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

const PORT = process.env.PORT || 3000; 

app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
})

