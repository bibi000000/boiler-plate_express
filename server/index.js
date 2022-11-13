const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { sequelize } = require('./api/models')
const v1Router = require('./api/v1/routes')
const app = express()


app.set('port', process.env.PROT || 3002);

sequelize.sync({ force: false })
  .then(() => {
      console.log(`데이터베이스 연결 성공`);
  })
  .catch((err) => {
    console.log(`err: ${err}`);
  })

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true
}))

app.use('/api/v1', v1Router)



// app.use((req, res, next) => {
//   const error = new ErrorEvent(`${req.method} ${req.url} 라우터가 없습니다.`)
//   error.status = 404;
//   next(error)
// })

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//   res.status(err.status || 500)
// })

app.listen(app.get('port'), () => console.log(`Listening on ${app.get('port')} port ! ~`))