// archivo para la lógica de ruteo de la página princial del servidor '/', /nosotros, /contacto
const express = require('express');
const router = express.Router();
const { dataJson } = require('../controllers/controladorProductos')


// Ruta y manejador para la página de inicio
router.get('/', (req, res) => {
  res.send(dataJson);
});

// Ruta y manejador para la página de contacto
router.post('/contacto', (req, res) => {
  res.send('ruta post formulario de contacto');
});



module.exports = router;