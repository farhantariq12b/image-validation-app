import { schema, rules } from '@ioc:Adonis/Core/Validator'

class SchemaMaker {
  public createSchema(requestBody: any) {
    let schemaObject = {}

    Object.keys(requestBody).forEach((key) => {
      if (key === 'password') {
        schemaObject[key] = schema.string([rules.minLength(4)])
        return
      }

      if (key === 'email') {
        schemaObject[key] = schema.string([rules.email()])
        return
      }

      schemaObject[key] = schema.string()
    })

    return schema.create(schemaObject)
  }
}

export default SchemaMaker
