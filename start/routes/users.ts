import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/upload-file', 'UserInputController.upload')
Route.post('/users/validate', 'UserInputController.validateInput')
