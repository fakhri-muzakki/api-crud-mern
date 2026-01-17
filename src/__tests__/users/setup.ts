import { userTestHelpers } from './helpers';

beforeAll(async () => {
  await userTestHelpers.connect();
});

beforeEach(async () => {
  await userTestHelpers.truncateDatabase();
});

afterAll(async () => {
  await userTestHelpers.disconnect();
});
