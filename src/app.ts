import express, { Application } from 'express';
import routes from './routes/routes';

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

    private initializeRoutes(): void {
        this.app.get('/', (req, res) => {
            res.json({ message: 'Welcome to Finance Application' });
        });
        this.app.use('/api', routes);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
