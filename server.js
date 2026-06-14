const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app.js");
const connectDB = require("./src/config/connectDB.js");

const PORT = process.env.PORT || 8777;

async function serverInit() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("SERVER STARTED...ON PORT ", PORT);
    });
  } catch (error) {
    console.log(error, "<- ERROR");
    process.exit(1);
  }
}

serverInit();
