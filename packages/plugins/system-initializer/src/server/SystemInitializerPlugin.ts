import { InstallOptions, Plugin } from '@nocobase/server';

export class SystemInitializerPlugin extends Plugin {
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

    async install(options: InstallOptions) {
        // TODO
    }
}

export default SystemInitializerPlugin;
