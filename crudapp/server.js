const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9595;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.o8jt1mz.mongodb.net/Television', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User Schema
const tvSchema = new mongoose.Schema({
    modelName: String,
    Brand: String,
    Price: String,
    Size: String,
});

const tv = mongoose.model('televisions', tvSchema);

// Routes
app.post('/televisions/add', async (req, res) => {
    const tv1 = new tv(req.body);
    try {
        await tv1.save();
        res.send(tv1);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/televisions/all', async (req, res) => {
    try {
        const tv1 = await tv.find();
        res.send(tv1);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/televisions/update/:id', async (req, res) => {
    try {
        const tv1 = await tv.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(tv1);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/televisions/delete/:id', async (req, res) => {
    try {
        const tv1 = await tv.findByIdAndDelete(req.params.id);
        res.send(tv1);
    } catch (error) {
        res.status(500).send(error);
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
