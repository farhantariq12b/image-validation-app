import Application from '@ioc:Adonis/Core/Application'
import FileService from '@ioc:Utils/FileProvider'
import OpenAIService from '@ioc:Utils/OpenAiProvider'
import SchemaProvider from '@ioc:Utils/SchemaProvider'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserInputController {
  public async upload({ response, request }: HttpContextContract) {
    const imageFile = request.file('file', {
      size: '10mb',
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
    })

    if (!imageFile) {
      return response
        .status(400)
        .send({ message: 'Image file is not provided kindly provide a file.' })
    }

    if (!imageFile.isValid) {
      const error = imageFile.errors.find((error) => error)

      return response.status(400).send(error)
    }

    const fileName = `${imageFile.fileName || ''}${cuid()}.${imageFile.subtype}`

    try {
      await imageFile.move(Application.tmpPath('uploads'), {
        name: fileName,
        overwrite: true,
      })

      const filePath = Application.tmpPath(`uploads/${fileName}`)

      const imageContent = FileService.convertFileToBlob(
        filePath,
        imageFile.type,
        imageFile.subtype
      )

      const parsedContent = await OpenAIService.extractContentFromImage(imageContent)

      FileService.removeFile(filePath)

      return { content: parsedContent }
    } catch (error) {
      return response.status(500).send(error?.response?.data || { message: error.message })
    }
  }

  public async validateInput({ request, response }: HttpContextContract) {
    const requestBody = request.body()

    const schema = SchemaProvider.createSchema(requestBody)

    try {
      const payload = await request.validate({ schema: schema })

      return payload
    } catch (error) {
      if (error.messages) {
        return response.status(400).send(error.messages)
      }

      return response.status(500).send(error)
    }
  }
}
