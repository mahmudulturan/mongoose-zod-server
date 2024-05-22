import mongoose from 'mongoose';
import app from './app';
import configs from './app/configs';

// main function for run the server
async function main() {
  try {
    await mongoose.connect(configs.db_url as string);
    app.listen(configs.port, () => {
      console.log(`Mongoose Zod Server is running on port ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
