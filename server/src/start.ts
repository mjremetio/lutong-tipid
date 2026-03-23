import app from './index';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`Lutong Tipid API server running on port ${env.PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
  console.log(`CORS origin: ${env.CLIENT_URL}`);
});
