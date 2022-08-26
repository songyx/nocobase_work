import { InstallOptions, Plugin } from '@nocobase/server';


import { default as PluginUiSchema, UiSchemaRepository } from '@nocobase/plugin-ui-schema-storage';
import Aclplugin from '@nocobase/plugin-acl';
import Userplugin from '@nocobase/plugin-users';

export class UserAppInitializerPlugin extends Plugin {
    getName(): string {
        return this.getPackageName(__dirname);
    }

    beforeLoad() {
        // TODO
    }

    async load() {
        // TODO
        // Visit: http://localhost:13000/api/testSystemInitializer:getInfo
        this.app.resource({
            name: 'testSystemInitializer',
            actions: {
                async getInfo(ctx, next) {
                    ctx.body = `Hello system-initializer!`;
                    next();
                },
            },
        });
        this.app.acl.allow('testSystemInitializer', 'getInfo');
    }

    /**
     * this is the install method
     * which will create init data at starting
     * 
     */
    async install(options: InstallOptions) {
        //confirm the uischema,acl,user plugin was installed.
        if (
            this.app.getPlugin('@nocobase/plugin-ui-schema-storage') instanceof PluginUiSchema
            && this.app.getPlugin('@nocobase/plugin-acl') instanceof Aclplugin
            && this.app.getPlugin('@nocobase/plugin-users') instanceof Userplugin
            && this.app.getPlugin('@nocobase/plugin-user-app-initializer') instanceof UserAppInitializerPlugin
        ) {
            // await this.app.load();
            await this.app.db.sync({
                force: false,
                alter: {
                    drop: false,
                },
            });

            const repository: UiSchemaRepository = this.app.db.getCollection('uiSchemas').repository as UiSchemaRepository;

            //load one page data
            const page = require('./pages/page.json');
            const page1 = require('./pages/page1.json');
            //insert one page
            // const result = await repository.insert(page);
            // const result1 = await repository.insert(page1);
        }else{
            const rsult =  false;
        }
    }
}

export default UserAppInitializerPlugin;
