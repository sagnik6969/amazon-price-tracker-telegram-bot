import Dotenv from "dotenv";
import telegram from "./telegram.js";
import amazonPriceTracker from "./amazonPriceTracker.js";
import mongodb from "./mongodb.js";
import checkAndUpdatePrices from './checkAndUpdatePrices.js'
import receiveMessage from './receiveMessage.js'

Dotenv.config();

const { TOKEN, SERVER_URL } = process.env;

try {
  await mongodb.initializeApp();

  await telegram.initializeApp(SERVER_URL, TOKEN, 3000);

} catch (error) {
  console.log("Some error occured");
}

const receiveMessageFunction = receiveMessage(telegram, mongodb);

telegram.receiveMessage(receiveMessageFunction);

checkAndUpdatePrices(telegram, mongodb, amazonPriceTracker);
