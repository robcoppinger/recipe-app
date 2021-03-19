import { createServer } from './App'

createServer()
  .then(() => console.log('Application is now running.'))
  .catch((error) => console.error('Application is crashed', error))
