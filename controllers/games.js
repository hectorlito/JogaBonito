const express = require('express');
const router = express.Router();
const Game = require('../models/games.js');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDrvfTS9oaWArL-k-KQA9PYATajpZVSpLc',
  Promise: Promise
});

router.get('/', async (req, res) => {
  const game = await Game.find();
  res.status(200).json(game);
});

router.post('/create', async (req, res) => {
      console.log("REQUEST", req.body);
      try {
        let formattedAddress;
        let latlng;
        await googleMapsClient.geocode({
            address: req.body.game.location
            // '1600 Amphitheatre Parkway, Mountain View, CA'
          }).asPromise()
          .then(async (response) => {
              formattedAddress = response.json.results[0].formatted_address;
              latlng = [response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng];
              const game = await Game.create(Object.assign(req.body.game, {
                location: formattedAddress,
                latlong: latlng
              })); res.status(201).json(game);
          })
          .catch((err) => {
            res.status(400).json({
              err: err.message
            });
          });
        }
        catch (e) {
          res.status(400).json({
            err: err.message
          });
        }
      });
    router.put('/:id', async (req, res) => {
      try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          set: true
        });
        res.status(200).json(updatedGame);
      } catch (e) {
        console.log(e);
        res.status(400).json({
          err: e.message
        });
      }
    });


    module.exports = router;
