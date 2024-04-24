import { config } from 'dotenv'
config()
import server from '../src/config/http.js'
import bdconn from '../src/config/db.js'
const appBoot = async () => {
  try {
    await bdconn()
    server.listen(process.env.PORT, () => console.log('server listening at port ', process.env.PORT))
  } catch (error) {
    console.log(error)
  }
}
appBoot()
