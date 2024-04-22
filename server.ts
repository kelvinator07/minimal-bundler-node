import express, { Application } from 'express';
import Server from './src/index';
import { PORT } from './src/utils/constants';
import logger from './src/utils/logger';

const app: Application = express();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = new Server(app);

app.listen(PORT, 'localhost', async () => {
    logger.info(`Server is running on port ${PORT}.`);
}).on('error', (err: Error) => {
    if (err.name === 'EADDRINUSE') {
        logger.info('Error: address already in use');
    } else {
        logger.error(err);
    }
});
