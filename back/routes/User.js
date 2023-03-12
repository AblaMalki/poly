var Router = require('express')
const User = require('../models/User')
var { validateRequestBody } = require("zod-express-middleware");
var { z } = require("zod");
const router = Router()
var { config } = require("dotenv");

const dev = process.env.NODE_ENV !== "production";
if (dev) {
  config(); 
}

//create user
router.post('/', 
validateRequestBody(
  z.object({
    nom: z.string(),
    prenom: z.string(),
    email: z.string(),
    role: z.string(),
    numeroTel: z.string(),
    password: z.string(),
    secteurId: z.number()

  })
)
, async (req, res) => {
    try {
      await User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        role: req.body.role,
        numeroTel: req.body.numeroTel,
        password: req.body.password,
        secteurId: req.body.secteurId
      }).then((response) => {
          res.status(201).send('User created')
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
      const result = await User.findAll({where: {deleted: false}})
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  })
//get by id 
router.get('/:id', async (req, res) => {
    try {
      const result = await User.findOne({where: {id: req.params.id,deleted: false }})
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  })
//get by role
router.get('/user/:role',async (req, res) => {
    try {
        const result = await User.findAll({where: {role: req.params.role , deleted: false}})
        
        return res.status(200).send(result)
    } catch(err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
        
    }
})
//update
router.put("/:id", async (req, res) => {
        try {
            await User.update(
                {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    role: req.body.role,
                    numeroTel: req.body.numeroTel,
                    password: req.body.password,
                    secteurId: req.body.secteurId

                }, {
                    where: {
                        id: req.params.id,
                        deleted: false
                    }
                }
            ).then((response) => {
                res.status(200).send("User updated");
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
            await User.update(
                {deleted: true }, {
                    where: {
                        id: req.params.id
                    }
                }
            ).then((response) => {
                res.status(200).send("User deleted");
            }).catch(e => {
                res.status(400).send(e);
            })
        } catch (error) {
          res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
});


module.exports = router