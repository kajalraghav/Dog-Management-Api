const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dogRoutes = require('./routes/dogRoutes');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/public', express.static("uploads"));

//routes
app.use("/api/v1/auth/a",(req,res)=>{
  res.status(200).json({msg:'yeah'})
})
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/dogs', dogRoutes);

// app.use((err, req, res) => {
//   res.status(err.status || 500).json({ message: err.message });
// });

module.exports = app;
