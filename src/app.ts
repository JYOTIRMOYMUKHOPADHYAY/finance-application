import express, { Application } from 'express';
import routes from './routes/routes';
import './config/environment';
import { DBConnection } from './db';

export default class App {
    public app: Application;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
    }

    private async initializeRoutes(): Promise<any> {
        this.app.get('/', async(req, res) => {
            res.json({ message: 'Welcome to Finance Application', health: await DBConnection.query(`SELECT NOW()`) });
        });
        this.app.use('/api', routes);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
