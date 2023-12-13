// getting-started.js
const mongoose = require('mongoose');

const { DB_URL = 'mongodb://127.0.0.1:27017/next_shop' } = process.env;

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log('DB connected');
  } catch (err) {
    console.error(err);
  }
}
