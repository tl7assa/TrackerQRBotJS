const { Telegraf } = require('telegraf');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chillqrbot-default-rtdb.firebaseio.com"
});
const db = admin.firestore();
const bot = new Telegraf('7945922794:AAHPNB58m3qnpN1kKfrMAmQj8HH_krQ_b9w');
bot.start((ctx) => {
    const user = {
        id: ctx.from.id,
        name: ctx.from.first_name,
        username: ctx.from.username || "Без юзернейма",
        time: new Date().toLocaleString(),
    };
    db.collection("visitors").add(user)
    .then(() => {
        ctx.reply(`Привет, ${ctx.from.first_name}! Ты зашел в трекер посещаемости.`);
        console.log(`${ctx.from.username || "Без юзернейма"} (${ctx.from.id}) пришел в ${new Date().toLocaleString()}`);
    })
    .catch((error) => {
        console.error("Ошибка записи в Firestore: ", error);
    });
});
bot.launch();
console.log("Бот запущен!");