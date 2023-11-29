declare module '@ioc:Utils/OpenAiProvider' {
  import openAI from 'providers/OpenAIProvider/OpenAIService'
  const OpenAIService: openAI
  export default OpenAIService
}
