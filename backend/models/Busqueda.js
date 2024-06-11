const mongoose = require('mongoose');

const busquedaSchema = new mongoose.Schema({
    ciudad: String,
    pais: String,
    temperatura: Number,
    condicionText: String,
    icono: String,
    fecha: { type: Date, default: Date.now }
});

const Busqueda = mongoose.model('Busqueda', busquedaSchema);

module.exports = Busqueda;
