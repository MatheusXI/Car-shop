import server from './server';

const PORT = process.env.PORT || 3000;
server.startServer(PORT);