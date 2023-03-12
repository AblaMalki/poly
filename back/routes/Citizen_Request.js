var Router = require('express')
const Citizen_Request = require('../models/Citizen_Request')
const cloudinary = require('cloudinary').v2
var { config } = require("dotenv");
const Bin = require('../models/Bin');

const router = Router()

const dev = process.env.NODE_ENV !== "production";
if (dev) {
  config();
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}



router.get('/:id', async (req, res) => {
    try {
      const result = await Citizen_Request.findByPk(req.params.id, {include: Bin})
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  })

  router.get('/', async (req, res) => {
    try {
      const result = await Citizen_Request.findAll({include: Bin})
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  })

  router.get('/bin/:id',async (req, res) => {
    try {
        const result = await Citizen_Request.findAll({where: {binId: req.params.id }, include: Bin })
        
        return res.status(200).send(result)
    } catch(err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
        
    }
  })

  router.post('/', async (req, res) => {
    try {
      const photoUrl = await cloudinary.uploader.upload(req.body.image);
      await Citizen_Request.create({
        image: photoUrl.url,
        percentage: req.body.percentage,
        binId: req.body.binId, 
      }).then((response) => {
          res.status(201).send('Request created')
        })
        .catch((err) => {
          res.status(400).send(err)
        })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  })

  module.exports = router