# Node.js Rest API to receive and send message across WhatsApp

## How to use

1. jalankan api `[baseUrl]/:id/start`. id atur dengan bebas, jangan gunakan id yang sama jika ingin melakukan request lagi
2. di terminal akan muncul qrCode, berfungsi untuk login ke api perangkat Whatsapp kita
3. setelah scan qrCode, tunggu sampai di terminal ada pesan "client ready"
4. jalankan api `[baseUrl]/message` dengan body sebagai berikut:

```bash
{
    "phoneNumber":"628xxxxxxx@c.us",
    "message": "your message",
    "clientId": "513"
}
```

## Installation

Create an Ubuntu EC2 instance and connect with ssh

```bash

$ sudo apt-get update

$ sudo apt-get install -y libxshmfence-dev libgbm-dev wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils

$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

$ . ~/.nvm/nvm.sh

$ nvm install --lts

$ node -e "console.log('Running Node.js ' + process.version)"

$ npm install pm2@latest -g

$ git clone https://github.com/gomeschristopher/whatsapp-multi-client.git

$ cd whatsapp-multi-client

$ npm install

$ npm run build

$ pm2 start dist/main.js --name <application_name>
```

## How to use:

### 1. Run `cp .env.example .env`

### 1. Inside the project run `npm install`

### 2. Start the app with `npm start`

### 3. Authenticate your Whatsapp in terminal with Qr code
