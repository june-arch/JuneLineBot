import express from 'express'
import line from '@line/bot-sdk'

const config = {
    channelAccessToken : process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret : process.env.CHANNEL_SECRET,
};

// const config = {
//         channelAccessToken : 'O2Ry4YHdHDB95EFZDeE+cdWG+YMgNasSwat9ocTX+O5FlS9hU8CtWSWhLJqiyL87QCsO9snio8godsT5lWVDbCUtD2RRc5GhJVNwYYcBy4a5dGnwzVTFiizxv64yt91/fl33MOPiY4MXpiQvTqtWOAdB04t89/1O/w1cDnyilFU=',
//         channelSecret : 'd8e10722521c8b7cfd17795df393d712',
// }

const port = 3000;

const clientBot = new line.Client(config);
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('this is your line bot');
})

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(mainProgram))
    .then(result => res.json(result))
    .catch(error => console.error(`Promise error ${error}`))
})

function mainProgram(event){
    if(event.type !== 'message' || event.message.type !== 'text') { //jika user tidak mengirimkan pesan berupa teks (bukan gambar, lokasi, atau sejenisnya)
      return Promise.resolve(null); //abaikan pesan
    }
    return client.replyMessage(event.replyToken, {type:'text', text: 'Hello, world'}); //balas dengan pesan "Hello, world"
}

app.listen(port, () => { });