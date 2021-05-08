const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  artistImage: {
    type: Buffer,
    required: true
  },
  artistCoverImageType: {
    type: String,
    required: true
  },
})

artistSchema.virtual('artistCoverImagePath').get(function() {
  if (this.artistImage != null && this.artistCoverImageType != null) {
    return `data:${this.artistCoverImageType};charset=utf-8;base64,${this.artistImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Artist', artistSchema)