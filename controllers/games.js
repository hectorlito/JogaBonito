const express = require('express');
const router  = express.Router();
const Game = require('../models/games.js');

router.get('/', async (req, res) => {
  const game = await Game.find();
  res.status(200).json(game);
});

router.post('/create', async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (e) {
    console.log(e);
    res.status(400).json({err: err.message + 'cheeese stand out '
  });
}
});

router.put('/:id', async (req, res) => {
  try{
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {new: true,set:true});
    res.status(200).json(updatedGame);
  } catch (e){
    console.log(e);
    res.status(400).json({err: e.message});
  }
});


module.exports = router;
