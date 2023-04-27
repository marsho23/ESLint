const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  colour: String,
  evil: Boolean,
});

const catModel = mongoose.model('cat', catSchema);

mongoose
  .connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log('yay');
  })
  .catch(() => {
    console.log('boo');
  });

module.exports = { catModel };
