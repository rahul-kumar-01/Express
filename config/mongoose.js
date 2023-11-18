const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/SocialBlaze');
  console.log("Mongoose Connectin is Succesfull");
}