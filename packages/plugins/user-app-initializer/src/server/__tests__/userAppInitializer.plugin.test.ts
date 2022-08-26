import { mockServer, MockServer } from '@nocobase/test';
import UserAppInitializerPlugin from '..';
import { default as PluginUiSchema, UiSchemaRepository } from '@nocobase/plugin-ui-schema-storage';
import Aclplugin from '@nocobase/plugin-acl';
import Userplugin from '@nocobase/plugin-users';

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
    const page = require('./page.json');
    const page1 = require('./page1.json');

    app.plugin(Userplugin, {});//插入用户
    app.plugin(Aclplugin, {});//插入角色
    app.plugin(PluginUiSchema, {});//插入schema
    app.plugin(UserAppInitializerPlugin, {});//插入本插件

    await app.load();
    await app.db.sync({
      force: false,
      alter: {
        drop: false,
      },
    });

    
    const repository: UiSchemaRepository = app.db.getCollection('uiSchemas').repository as UiSchemaRepository;
    // const schema = await repository.getJsonSchema('aaomndhyl4k',{});

    // const nodes = UiSchemaRepository.schemaToSingleNodes(pages);
    const result = await repository.insert(page);
    const result2 = await repository.insert(page1);

    const plugin = app.getPlugin('@nocobase/plugin-ui-schema-storage');
    expect(plugin.getName()).toBe('@nocobase/plugin-ui-schema-storage');
  });

});
