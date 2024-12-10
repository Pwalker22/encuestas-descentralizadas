const Candidato = require('../models/candidatos');

const getCandidatos = async (req, res) => {
  try {
    const candidatos = await Candidato.find();
    res.json(candidatos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCandidato = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const nuevoCandidato = new Candidato({ nombre, descripcion });
    await nuevoCandidato.save();
    res.status(201).json(nuevoCandidato);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const voteCandidato = async (req, res) => {
  try {
    const candidato = await Candidato.findById(req.params.id);

    if (!candidato) {
      return res.status(404).json({ message: 'Candidato no encontrado' });
    }

    candidato.votos += 1;
    await candidato.save();
    res.json(candidato);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//* controllers/candidatoController.js
const getResultados = async (req, res) => {
    try {

      const candidatos = await Candidato.find();  
  

      const resultados = candidatos.map(candidato => ({
        nombre: candidato.nombre,
        votos: candidato.votos,
      }));
  
      // Enviar los resultados como respuesta
      res.status(200).json(resultados);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

module.exports = { 
    getCandidatos, 
    createCandidato, 
    voteCandidato,
    getResultados,
  };
