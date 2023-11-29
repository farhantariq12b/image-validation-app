import Env from '@ioc:Adonis/Core/Env'
import ThirdPartyService from '../ThirdPartyService'

export default class OpenAIService extends ThirdPartyService {
  constructor() {
    super()
  }

  public async extractContentFromImage(imageContent: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Env.get('OPEN_AI_KEY')}`,
    }

    const payload = {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Give me input field used in this image?' },
            {
              type: 'text',
              text: 'Give me just name of the fields and their types. Response should be only of format FieldName-Type no other text ',
            },
            {
              type: 'text',
              text: 'For radio and select provide options if they are available then the format should be FieldName-Type[Option]',
            },
            {
              type: 'text',
              text: "If image doesn't match the requirement then return null only",
            },
            {
              type: 'image_url',
              image_url: {
                url: imageContent,
                detail: 'low',
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    }

    const data = await OpenAIService.postRquest(headers, payload, Env.get('OPEN_AI_URL'))

    const choice = data.choices.find((choice) => choice)

    if (choice.message.content === 'null') {
      return null
    }

    const content = choice.message.content.split('\n').filter(Boolean)

    return content
  }
}
