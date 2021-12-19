import application from './application';
import './database';
import config from './utils/environment';
import './database';

const serverPort = config.get('SERVER_PORT');

application.listen(serverPort, () => {
  console.log(`> Server running on *:${serverPort}`);
});
