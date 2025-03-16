const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExiste = await Usuario.findOne({ where: { email } });
    if (usuarioExiste) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hashedPassword });

    res.json({ message: "Usuario registrado", usuario });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
// Inicio de sesión
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });
  
      if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });
  
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });
  
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Login exitoso", token });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
  