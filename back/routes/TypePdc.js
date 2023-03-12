var Router = require('express')
const Type_pdc = require('../models/Typepdc')
var { validateRequestBody } = require("zod-express-middleware");
var { z } = require("zod");
const router = Router()
var { config } = require("dotenv");

const dev = process.env.NODE_ENV !== "production";
if (dev) {
  config(); 
}

//create pdc
router.post('/', 
validateRequestBody(
  z.object({
    type: z.string(),
  })
)
, async (req, res) => {
    try {
      await Type_pdc.create({
        type: req.body.type,
      }).then((response) => {
          res.status(201).send('Type pdc created')
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
      const result = await Type_pdc.findAll({where: {deleted: false}})
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})
//get by id 
router.get('/:id', async (req, res) => {
    try {
      const result = await Type_pdc.findOne({where: {id: req.params.id , deleted: false}}) 
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

//update
router.put("/:id", async (req, res) => {
    try {
        await Type_pdc.update(
            {
                type: req.body.type,

            }, {
                where: {
                    id: req.params.id,
                    deleted: false
                }
            }
        ).then((response) => {
            res.status(200).send("Type pdc updated");
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
        await Type_pdc.update(
            {deleted: true }, {
                where: {
                    id: req.params.id
                }
            }
        ).then((response) => {
            res.status(200).send("Type pdc deleted");
        }).catch(e => {
            res.status(400).send(e);
        })
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});


  module.exports = router