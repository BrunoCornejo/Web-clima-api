const express = require('express');
const router = express.Router();
const Busqueda = require('../models/Busqueda');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&lang=es&q=`;

router.post('/buscar', async (req, res) => {
    const { ciudad } = req.body;

    try {
        if (!ciudad.trim()) throw new Error('El campo ciudad es obligatorio');

        const response = await fetch(API_WEATHER + ciudad);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const nuevaBusqueda = new Busqueda({
            ciudad: data.location.name,
            pais: data.location.country,
            temperatura: data.current.temp_c,
            condicionText: data.current.condition.text,
            icono: data.current.condition.icon
        });

        await nuevaBusqueda.save();

        res.json({
            city: data.location.name,
            pais: data.location.country,
            temperatura: data.current.temp_c,
            condicionText: data.current.condition.text,
            icono: data.current.condition.icon
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
