require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const leadRoutes = require('./routes/leadRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/leads', leadRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
     