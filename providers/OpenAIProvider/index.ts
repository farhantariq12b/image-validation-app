import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class OpenAiProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.bind('Utils/OpenAiProvider', () => {
      const OpenAIService = require('./OpenAIService').default

      return new OpenAIService()
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
