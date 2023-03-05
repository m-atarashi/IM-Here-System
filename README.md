# 研究室メンバー用位置共有システム

大学の所属研究室で利用している位置共有システムです。Ubuntu をインストールした Raspberry Pi 上で稼働しています。

開発期間：2022/5/1~2022/5/16
<br>
言語：JavaScript (Node.js)
<br>
フレームワーク：React / Next.js

<br>

# Node.js & Next.js implementation

## Usage

```
yarn start
```

or use [PM2](https://pm2.keymetrics.io/).

```
npm install -g pm2
pm2 start server.js
```

Then available at http://192.168.1.94:3000.

## Environments

- [Raspberry Pi 3 Model B+](https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/)
- microSD 16GB
- Ubuntu Server 22.04 LTS
- Node.js v16.15.0
- Yarn v1.22.18

## Dependencies

### [Ubuntu Server](https://ubuntu.com/server/docs)

Download and install [Raspberry Pi Imager](https://www.raspberrypi.com/software/) to a computer with an SD card reader, and install Ubuntu Server to your microSD card following instructions.

### [Node Version Manager](https://github.com/nvm-sh/nvm)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

### [Node.js](https://github.com/nvm-sh/nvm#long-term-support)

```
nvm install --lts
```

### [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

```
npm install -g yarn
```

### Node.js modules

- [@slack/webhook](https://www.npmjs.com/package/@slack/webhook)
- [js-yaml](https://www.npmjs.com/package/js-yaml)
- [next](https://www.npmjs.com/package/next)
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)

```
yarn install
```

## SSH to Raspberry Pi

```
ssh pi@192.168.1.94
```

or

```
ssh pi@ubuntu
```

After you connected successfully, let's start server in a [tmux](https://github.com/tmux/tmux) session.

```
sudo apt install tmux

tmux
pm2 start server.js
// or yarn start
```

Then press `<Ctrl>b, d` to detach a client so that you can disconnect SSH even while the server is still running.
