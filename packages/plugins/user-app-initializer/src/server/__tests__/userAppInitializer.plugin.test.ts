import { mockServer, MockServer } from '@nocobase/test';
import UserAppInitializerPlugin from '..';

describe('A.system initializer plugin test', () => {
  let app: MockServer;


  beforeEach(async () => {

    app = mockServer();

  });

  afterEach(async () => {
    // await app.destroy();
  });

  it('A.1.should plugin the user-app-initializer', async () => {

    app.plugin(UserAppInitializerPlugin, {});

    const plugin = app.getPlugin('@nocobase/plugin-user-app-initializer');

    expect(plugin.getName()).toBe('@nocobase/plugin-user-app-initializer');

  });

  it('A.1.should parse the page json.', async () => {
    const pages = require('./page.json');
    pages['x-compontnet'];
  });

});
