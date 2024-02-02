import { config } from 'dotenv'
config()
import server from 'config/http.js'
import bdconn from 'config/db.js'
const init = async () => {
  await bdconn()
  server.listen(process.env.PORT, () => console.log('server listening at port ', process.env.PORT))
}
init()
