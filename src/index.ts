import App from './app';

const app = new App(Number(process.env.SERVER_PORT));

app.listen();
