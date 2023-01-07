const { Router } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const {
  Entrenadores,
  Equipos,
  Jugadores,
  Equiposentrenadores,
  Jugadoresequipos,
} = require("../db");

const router = Router();

router.get("/equipos", async (req, res) => {
  try {
    const allEquipos = await Equipos.findAll();
    res.status(200).send(allEquipos);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/crear-equipo", async (req, res) => {
  try {
    if (!req.body.length) {
      const { nombre, ciudad } = req.body;
      const equipo = await Equipos.create({ nombre, ciudad });
      res.status(200).send(equipo);
    } else {
      const equipos = req.body;
      const equiposCreados = await Equipos.bulkCreate(equipos);
      res.status(200).send(equiposCreados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/eliminar-equipo", async (req, res) => {
  try {
    const { nombre, ciudad } = req.body;
    const equipoEliminado = await Equipos.destroy({
      where: {
        nombre,
        ciudad,
      },
    });
    res.status(200).send({ equipoEliminado });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/entrenadores", async (req, res) => {
  try {
    const allEntrenadores = await Entrenadores.findAll();
    res.status(200).send(allEntrenadores);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/crear-entrenador", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const entrenador = await Entrenadores.create({
      nombre,
      email,
    });
    res.status(200).send(entrenador);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/eliminar-entrenador", async (req, res) => {
  try {
    const { email } = req.body;
    const entrenadorEliminado = await Entrenadores.destroy({
      where: {
        email,
      },
    });
    res.status(200).send({ entrenadorEliminado });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/jugadores", async (req, res) => {
  try {
    const allJugadores = await Jugadores.findAll();
    res.status(200).send(allJugadores);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/crear-jugador", async (req, res) => {
  try {
    if (!req.body.length) {
      const { nombre, email } = req.body;
      const jugador = await Jugadores.create({
        nombre,
        email,
      });
      res.status(200).send(jugador);
    } else {
      const jugadores = req.body;
      const jugadoresCreados = await Jugadores.bulkCreate(jugadores);
      res.status(200).send(jugadoresCreados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/eliminar-jugador", async (req, res) => {
  try {
    const { email } = req.body;
    const jugadorEliminado = await Jugadores.destroy({
      where: {
        email,
      },
    });
    res.status(200).send({ jugadorEliminado });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/relacionar-entrenador-equipo", async (req, res) => {
  try {
    const { email, nombre } = req.body;
    const entrenador = await Entrenadores.findOne({ where: { email } });
    const equipo = await Equipos.findOne({ where: { nombre } });
    await entrenador.addEquipo(equipo, {
      through: { entrenadorid: entrenador.id, equipoid: equipo.id },
    });
    res.send({ mensaje: "Entrenador relacionado con equipo exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/entrenadores-equipo", async (req, res) => {
  try {
    const equiposEntrenadores = await Equiposentrenadores.findAll();
    res.send(equiposEntrenadores);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/relacionar-jugador-equipo", async (req, res) => {
  try {
    const { email, nombre } = req.body;
    const equipo = await Equipos.findOne({ where: { nombre } });
    const jugador = await Jugadores.findOne({ where: { email } });
    await jugador.addEquipo(equipo, {
      through: { equipoid: equipo.id, jugadorid: jugador.id },
    });
    res.send({ mensaje: "Jugador relacionado con equipo exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/jugadores-equipos", async (req, res) => {
  try {
    const jugadoresEquipos = await Jugadoresequipos.findAll();
    res.send(jugadoresEquipos);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/noticias-deportivas", (req, res) => {
  axios
    .get("https://www.afe-futbol.com/deportivo/")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const titles = [];
      $(".grid-items .title").each((i, element) => {
        titles.push($(element).text());
      });

      res.send(
        titles.map((title) => {
          return title.replace(/\n|\t|\s{2,}/g, "");
        })
      );
    })
    .catch((error) => {
      console.log("ERROR GET NOTICIAS: ", error);
      res.send(error); // envía el error al cliente
    });
});

module.exports = router;
