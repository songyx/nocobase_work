import { mockServer, MockServer } from '@nocobase/test';
import PlugSystemInitializer from '..';

describe('A.system initializer plugin test', () => {
  let app: MockServer;


  beforeEach(async () => {

    app = mockServer();

  });

  afterEach(async () => {
    // await app.destroy();
  });

  it('A.1.should plugin the system-initializer', async () => {

    app.plugin(PlugSystemInitializer, {});

    const plugin = app.getPlugin('@nocobase/plugin-system-initializer');

    expect(plugin.getName()).toBe('@nocobase/plugin-system-initializer');

  });


});
