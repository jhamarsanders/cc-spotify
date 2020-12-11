import { app } from './app';

const start = async () => {
    app.listen(3000, () => {
        console.log('listening to Port 3000');
    });
};

start();