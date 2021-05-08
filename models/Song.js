const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  songCoverImage: {
    type: Buffer,
    required: true
  },
  songCoverImageType: {
    type: String,
    required: true
  },
  songMusic: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'Artist'
  }
})

songSchema.virtual('coverImagePath').get(function() {
  if (this.songCoverImage != null && this.songCoverImageType != null) {
    return `data:${this.songCoverImageType};charset=utf-8;base64,${this.songCoverImage.toString('base64')}`
  }
})

// songSchema.virtual('coverAudioPath').get(function() {
//   if (this.songMusic != null && this.songMusicType != null) {
//     return `data:${this.songMusicType};charset=utf-8;base64,${this.songMusic.toString('base64')}`
//   }
// })


module.exports = mongoose.model('Song', songSchema)