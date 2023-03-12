var Router = require('express')
const Secteur = require('../models/Secteur')
var { validateRequestBody } = require("zod-express-middleware");
var { z } = require("zod");
const router = Router()
var { config } = require("dotenv");

const dev = process.env.NODE_ENV !== "production";
if (dev) {
  config(); 
}

//create secteur
router.post('/', 
validateRequestBody(
  z.object({
    ville: z.string(),
    secteur: z.string(),
  })
)
, async (req, res) => {
    try {
      await Secteur.create({
        ville: req.body.ville,
        secteur: req.body.secteur,
      }).then((response) => {
          res.status(201).send('secteur created')
        })
        .catch((err) => {
          res.status(400).send(err)
        })
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

//get all
router.get('/', async (req, res) => {
    try {
      const result = await Secteur.findAll({where: {deleted: false}})
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})
//get by id 
router.get('/:id', async (req, res) => {
    try {
      const result = await Secteur.findOne({where: {id: req.params.id , deleted: false}}) 
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

//update
router.put("/:id", async (req, res) => {
    try {
        await Secteur.update(
            {
                ville: req.body.ville,
                secteur: req.body.secteur,

            }, {
                where: {
                    id: req.params.id,
                    deleted: false
                }
            }
        ).then((response) => {
            res.status(200).send("Secteur updated");
        }).catch(e => {
            res.status(400).send(e);
        })
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
//delete
router.delete("/:id",async (req, res) => {
    try {
        await Secteur.update(
            {deleted: true }, {
                where: {
                    id: req.params.id
                }
            }
        ).then((response) => {
            res.status(200).send("Secteur deleted");
        }).catch(e => {
            res.status(400).send(e);
        })
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});


  module.exports = router