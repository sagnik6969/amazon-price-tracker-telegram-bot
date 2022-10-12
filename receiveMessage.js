import amazonPriceTracker from "./amazonPriceTracker.js";

function receiveMessage(telegram, mongodb) {

  return async ({ chatId, text }) => {
    try {

      if (text == "/start") {
        await telegram.sendMessage(chatId, "Hi I am amazon price tracker bot");
        await telegram.sendMessage(chatId, "send me link of the product to track price");
        return;

      }

      if (text == '/stop') {

        await mongodb.deleteUser(chatId);
        await telegram.sendMessage(chatId, "You are successfully unsubscribed")
        return;

      }

      const price = await amazonPriceTracker(text);

      await mongodb.updateUser(chatId, text, price);

      await telegram.sendMessage(
        chatId,
        "The current price of the item is " +
        price +
        " We will inform you once the price drops."
      );
    } catch (error) {
      console.log("Some error occurred while processing incoming message");
      telegram.sendMessage(
        chatId,
        "Something went wrong. Please try again after some time"
      );
    }
  }

}

export default receiveMessage;