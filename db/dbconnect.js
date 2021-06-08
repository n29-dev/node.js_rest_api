const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

async function db(){
 await mongoose.connect(`"mongodb://localhost:27017/notes_app`)
 .then(() => {
     console.log('Database Succesfully Connected')
 })
}
module.exports = db 