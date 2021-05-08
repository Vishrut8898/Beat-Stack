const express = require('express');
const ensureAuthenticated = require('../config/auth');
const router = express.Router();
const Artist = require('../models/Artist');
const Song = require('../models/Song');
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const artists = await Artist.find()
        res.render('artists/artists', { artists: artists })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', ensureAuthenticated, async (req, res) => {
    res.render('artists/new', { artist: new Artist() })
})

// Create Artist Route
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name,
        description: req.body.description
    })
    saveCover(artist, req.body.cover)

    try {
        const newArtist = await artist.save()
        res.redirect(`/artists`)
    } catch {
        res.render('artists/new', {
        artist: artist,
        errorMessage: 'Error creating Artist'
        })
    }
})

router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    const songs = await Song.find({ artist: artist.id });
    res.render('artists/show', {
      artist: artist,
      songsByArtist: songs
    })
  } catch (err){
      console.log(err)
    res.render('artists/show')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
    res.render('artists/edit', { artist: artist })
  } catch {
    res.redirect('/artists')
  }
})

// Update song Route
router.put('/:id', async (req, res) => {
  let artist

  try {
    artist = await Artist.findById(req.params.id)
    artist.name = req.body.name,
    artist.description = req.body.description
    if (req.body.cover != null && req.body.cover !== '') {
      saveCover(artist, req.body.cover)
    }
    await artist.save()
    res.redirect(`/artists`)
  } catch (err){
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  let artist
  try {
    artist = await Artist.findById(req.params.id)
    await artist.remove()
    res.redirect('/artists')
  } catch {
    if (artist == null) {
      res.redirect('/')
    } else {
      res.redirect(`/artist/${artist.id}`)
    }
  }
})

function saveCover(artist, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
      artist.artistImage = new Buffer.from(cover.data, 'base64')
      artist.artistCoverImageType = cover.type
    }
  }

module.exports = router;