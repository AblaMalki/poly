var Router = require('express')
const Bin = require('../models/Bin')
var { validateRequestBody } = require("zod-express-middleware");
var { z } = require("zod");
const router = Router()
//const cloudinary = require('cloudinary').v2
var { config } = require("dotenv");
const Secteur = require('../models/Secteur');
const TypePdc = require('../models/Typepdc');
const sequelize = require('../db');

const dev = process.env.NODE_ENV !== "production";
if (dev) {
  config();
}
/*
function generateCode(srb: BinDetails): string {
  const createdAt = new Date(srb.createdAt);
  const day = createdAt.getDate().toString().padStart(2, '0');
  const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
  // const year = createdAt.getFullYear().toString().substr(-2);
  const id = srb.id.toString().padStart(4, '0');
  const zone = srb.zone.toUpperCase();
  return `${day}${month}${zone}${id}`;
  }
  function generateCode(srb: BinDetails): string {
  const createdAt = new Date(srb.createdAt);
  const day = createdAt.getDate().toString().padStart(2, '0');
  const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
  // const year = createdAt.getFullYear().toString().substr(-2);
  const id = srb.id.toString().padStart(4, '0');
  const zone = srb.zone.toUpperCase();
  return `${day}${month}${zone}${id}`;
  }
  */

router.post('/', 
/*validateRequestBody(
  z.object({
    srb: z.string(),
    type_pdc: z.string(),
    nom_pdc: z.string(),
    zone: z.string(),
    secteurId: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    image_Qr: z.string(),
    date_creation: z.date(),
    date_deploiement: z.date(),
    etat: z.string(),

  })
),*/
async (req, res) => {
  const t =await sequelize.transaction()
  
    try {
      console.log(req.body)
      //const photoUrl = await cloudinary.uploader.upload(req.body.image_Qr);
      const response = await Bin.create({
        srb: "srb",
        typePdcId: req.body.type_pdc,
        nom_pdc: req.body.nom_pdc,
        zone: req.body.zone,
        secteurId: req.body.secteur,
        latitude: req.body.latitude,
        longitude: req.body.longitude, 
        //image_Qr: photoUrl.url, 
        date_creation: req.body.date_creation, 
        date_deploiement: req.body.date_deploiement, 
        etat: req.body.etat, 
      },{transaction: t})
      const createdAt = new Date(response.createdAt);
      const day = createdAt.getDate().toString().padStart(2, '0');
      const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
      // const year = createdAt.getFullYear().toString().substr(-2);
      const id = response.id.toString().padStart(4, '0');
      const zone = response.zone.toUpperCase();
      await Bin.update(
        {srb: `${day}${month}${zone}${id}` }, {
            where: {
                id: response.id
            },
            transaction: t
        }
      )
      t.commit()
      res.status(201).send('Bin created')
    } catch (error) {
      t.rollback()
      console.log(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

//get All
router.get('/', async (req, res) => {
  try {
    const result = await Bin.findAll({include: [Secteur , TypePdc] ,  where: {deleted: false}})
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: 'Internal Server Error' })
  }
})

//get by id
router.get('/:id', async (req, res) => {
  try {
    const result = await Bin.findOne({where: {id: req.params.id,deleted: false },include: [Secteur , TypePdc]})
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: 'Internal Server Error' })
  }
})
//get by srb
router.get('/bin/:srb',async (req, res) => {
  try {
      const result = await Bin.findOne({where: {srb: req.params.srb , deleted: false}, include: [Secteur , TypePdc] })
      
      return res.status(200).send(result)
  } catch(err) {
      console.log(err)
      res.status(500).send("Internal Server Error");
      
  }
})
//update
router.put("/:id", async (req, res) => {
  try {
      await Bin.update(
          {
            srb: req.body.srb,
            typePdcId: req.body.type_pdc,
            nom_pdc: req.body.nom_pdc,
            zone: req.body.zone,
            secteurId: req.body.secteurId,
            latitude: req.body.latitude,
            longitude: req.body.longitude, 
            //image_Qr: req.body.image_Qr, 
            date_creation: req.body.date_creation, 
            date_deploiement: req.body.date_deploiement, 
            etat: req.body.etat, 

          }, {
              where: {
                  id: req.params.id,
                  deleted: false
              }
          }
      ).then((response) => {
          res.status(200).send("Bin updated");
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
      await Bin.update(
          {deleted: true }, {
              where: {
                  id: req.params.id
              }
          }
      ).then((response) => {
          res.status(200).send("Bin deleted");
      }).catch(e => {
          res.status(400).send(e);
      })
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = router