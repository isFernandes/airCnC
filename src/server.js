const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');


const app = express();

mongoose.connect('mongodb://semana:semana@cluster0-shard-00-00-lsqcd.mongodb.net:27017,cluster0-shard-00-01-lsqcd.mongodb.net:27017,cluster0-shard-00-02-lsqcd.mongodb.net:27017/semana?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//GET, POST, PUT, DELETE
/**
 * req.query = acessa query params (para filtros, utilizado com get)
 * req.params = acessa route params (utilizado com PUT)
 * req.body = acessa o corpo da requisição(para criação e edição POST e PUT)
 */

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);