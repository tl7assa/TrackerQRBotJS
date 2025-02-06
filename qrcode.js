const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const qrFolderPath = path.join(require('os').homedir(), 'Desktop', 'QR_Code');
if (!fs.existsSync(qrFolderPath)) {
    fs.mkdirSync(qrFolderPath);
}
const qrFilePath = path.join(qrFolderPath, 'qrcode.png');
const botLink = "https://t.me/chillqrbot_bot";
QRCode.toFile(qrFilePath, botLink, function (err) {
    if (err) {
        console.error("Ошибка при создании QR-кода:", err);
    } else {
        console.log("QR-код успешно создан в папке QR_Code на рабочем столе!");
    }
});