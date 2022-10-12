import axios from "axios";
import cheerio from "cheerio";

function amazonPriceTracker(itemUrl) {
  return new Promise((resolve, reject) => {
    axios
      .get(itemUrl)
      .then((res) => {
        try {
          let $ = cheerio.load(res.data);

          let prices = $(".a-price-whole");

          let price = cheerio(prices[0]).text();

          resolve(price);
        } catch (error) {
          reject(error);
        }
      })
      .catch((err) => reject(err));
  });
}

export default amazonPriceTracker;

