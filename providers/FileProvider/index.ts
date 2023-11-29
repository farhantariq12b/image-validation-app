import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class FileProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.bind('Utils/FileProvider', () => {
      const FileService = require('./fileSystem').default

      return new FileService()
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
