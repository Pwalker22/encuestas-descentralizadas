const mongoose = require('mongoose');

//*modelo candidatos
const candidatoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  votos: {
    type: Number,
    default: 0
  }
});

const Candidato = mongoose.model('Candidato', candidatoSchema);

module.exports = Candidato;
