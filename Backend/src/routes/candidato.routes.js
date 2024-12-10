const express = require('express');
const router = express.Router();
const candidatoController = require('../controller/controllerCandidato'); 


router.get('/Candidatos', candidatoController.getCandidatos)
      .post('/saveCandidato', candidatoController.createCandidato) 
      .put('/votar/:id', candidatoController.voteCandidato)
      .get('/resultados', candidatoController.getResultados);  

module.exports = router;
