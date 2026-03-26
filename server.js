const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve frontend files

// MongoDB connection
mongoose.connect(
  "mongodb://nabeel:Burhans%40866@ac-nmdfujz-shard-00-00.dog8l6z.mongodb.net:27017,ac-nmdfujz-shard-00-01.dog8l6z.mongodb.net:27017,ac-nmdfujz-shard-00-02.dog8l6z.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-ibar7w-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Schema for contact form
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email) return res.status(400).send("Name and Email are required");

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).send("Message saved successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving message");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));