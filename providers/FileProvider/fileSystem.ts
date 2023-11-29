import fs from 'fs'

export default class FileService {
  public convertFileToBlob(
    filePath: string,
    type: string | undefined = 'image',
    subtype: string | undefined = 'png'
  ) {
    const fileBuffer = fs.readFileSync(filePath)

    const base64Image = Buffer.from(fileBuffer).toString('base64')

    return `data:${type}/${subtype};base64,${base64Image}`
  }

  public removeFile(filePath) {
    if (!fs.existsSync(filePath)) {
      console.log(`File doesn't exist on path: ${filePath}`)
      return
    }

    return fs.rmSync(filePath)
  }
}
