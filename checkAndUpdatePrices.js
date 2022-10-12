import calculatePrice from "./calculatePrice.js";

function checkAndUpdatePrices(telegram, mongodb, amazonPriceTracker) {

  setTimeout(async () => {
    try {
      let userList = await mongodb.getUsers();

      userList.forEach(async (user, idx) => {
        try {

          console.log(
            `Updating user no ${idx} at time ${new Date().getSeconds()} sec`
          );

          let prevPrice = user.prevPrice;

          let newPrice = await amazonPriceTracker(user.url);

          if (calculatePrice(prevPrice, newPrice) >= 5) {

            let message = `Price dropped. New price is ${newPrice}`;

            await telegram.sendMessage(user.chatId, message);
            await telegram.sendMessage(chatId, "To stop receiving update send /stop")

            await mongodb.updateUser(user.chatId, user.url, newPrice);
          }
        } catch (error) {
          console.log("some Error occurred");
        }
      });
    } catch (error) {
      console.log("some error occurred");
    }
    checkAndUpdatePrices(telegram, mongodb, amazonPriceTracker);
  }, 1000 * 15);
}

export default checkAndUpdatePrices;
