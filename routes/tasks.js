const express = require("express");
const { Tarea } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, estado, fechaLimite, userId } = req.body;

    const tarea = await Tarea.create({ titulo, descripcion, estado, fechaLimite, userId });
    res.json({ message: "Tarea creada exitosamente", tarea });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
