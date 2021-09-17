const express = require('express');
const cors = require('cors');
const connection = require('./config');
const { userRoutes, postRoutes } = require('./routes');
const { userValidation, validate } = require('./validation')


const app = express();

app.use(express.json());
app.use(cors());


app.post('/', (req, res) => {
    res.send('welcome')
});

app.use('/user', userRoutes);
app.use('/post', postRoutes);

connection.once('open', () => {
    console.log('Database Connected...')
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running on ${PORT}`));