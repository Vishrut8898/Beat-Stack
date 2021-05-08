const { query } = require('express');
const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const ensureAuthenticated = require('../config/auth');
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif', 'images/jpg'];
const audioMimeTypes = ['audio/mp3g', 'audio/mp3', 'audio/wav'];

router.get('/', ensureAuthenticated, async (req, res) => {
    try{
        const songs = await Song.find();
        res.render('songs/songs', { songs: songs })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', ensureAuthenticated, async (req, res) => {
    try {
        const artists = await Artist.find()
        res.render('songs/new', { artists: artists })
    } catch {
        res.redirect('/songs')
    }
})

router.post('/', async (req, res) => {
    const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        songMusic: req.body.audio
    })
    saveSongCover(song, req.body.songCover)

    try {
        const newSong = await song.save()
        res.redirect(`/songs`)
    } catch (error) {
        console.log(error)
    }
})

function saveSongCover(song, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        song.songCoverImage = new Buffer.from(cover.data, 'base64')
        song.songCoverImageType = cover.type
    }
}

// function saveMusic(song, coverEncoded) {
//     if (coverEncoded == null) return
//     const cover = JSON.parse(coverEncoded);
//     if (cover != null && audioMimeTypes.includes(cover.type)) {
//         song.songMusic= new Buffer.from(cover.data, 'base64')
//         song.songMusicType = cover.type
//     }
// }

module.exports = router;