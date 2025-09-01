import * as auth from './api/auth';
import * as event from './api/event';

const apiManager = {
  ...auth,
  ...event,
};

export default apiManager;
