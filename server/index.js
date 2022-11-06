const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = [
  { id: 1, name: 'yuri' },
  { id: 2, name: 'dongho' },
]
app.get("/", (req, res) => {
  res.send("율2ㅎㅇ")
})

app.get('/api/users', (req, res) => {
  res.json({ok: true, users: users})
})

//query
app.get('/api/users/user', (req, res) => {
  const user_id = req.query.user_id
  const user = users.filter(data => data.id==user_id)
  res.json({ok:false, user: user})
})
//param
app.get(`/api/users/{user_id}`, (req, res) => {
  const user_id = req.params.user_id
  const user = users.filter(data => data.id==user_id)
  res.json({ok:false, user: user})
})
//body
app.get(`/api/users/userBody`, (req, res) => {
  const user_id = req.body.user_id
  const user = users.filter(data => data.id == user_id)
  res.json({ok:false, user:user})
  
})

app.listen(3000, () => console.log('율2ㅎㅎㅎㅎㅎㅎㅎ'))