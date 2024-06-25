const express = require('express');
const mongoose = require('mongoose');
const climaRoutes = require('./routes/ClimaRoutes');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura CORS
app.use(cors());

app.use('/api/clima', climaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
