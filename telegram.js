import express from "express";
import bodyParser from "body-parser";
import axios from 'axios'


const app = express()
app.use(bodyParser.json())

var TELEGRAM_API_URL;





function initializeApp(SERVER_URL, TOKEN, PORT) {

    // SERVER_URL is url of the server in which the app is running
    // token is to identify the bot. you will get it after creating the bot using botFather

    return new Promise((resolve, reject) => {

        TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}`;

        app.listen(PORT || process.env.PORT, (err) => {

            if (err) reject(err);

            console.log(`telegram bot app running at port ${PORT}`);

            axios.get(`${TELEGRAM_API_URL}/setWebhook?url=${SERVER_URL}`)
                .then(res => resolve(res))
                .catch(err => reject(err))

        })




    })

}



async function sendMessage(chatId, text) {

    return new Promise((resolve, reject) => {

        axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            "chat_id": chatId,
            "text": text
        })
            .then((res) => resolve(res))
            .catch(err => reject(err))

    });


}


function receiveMessage(callback) {

    app.post('/', (req, res) => {
        res.send()

        let chatId = req.body.message.chat.id;
        let text = req.body.message.text;

        callback({
            "chatId": chatId,
            "text": text
        })

    })


}


const telegram = {

    "initializeApp": initializeApp,
    "sendMessage": sendMessage,
    "receiveMessage": receiveMessage

}

export default telegram;