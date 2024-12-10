const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const candidatoRoutes = require('./routes/candidato.routes'); 


const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/votacion')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB:', err));

// Usar las rutas de candidatos
app.use('/api/candidatos', candidatoRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
