import { app } from './app';
const PORT = process.env.PORT || 80;

const start = async () => {
    app.listen(PORT, () => {
        console.log(`listening to Port ${PORT}`);
    });
};

start();