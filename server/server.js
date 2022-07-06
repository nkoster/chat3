require('dotenv').config()

if (process.env.REFRESH_TOKEN_SECRET) {
  console.log('Private key loaded.')
}

const API_PORT = process.env.API_PORT || 3011
const LOGIN_ERROR = 'User and/or password is wrong'

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }})
const cors = require('cors')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let channels = []
let users = require('./db.json')
let refreshTokens = []

app.use(cors())

io.on('connection', socket => {

  console.log('new websocket connection', socket.handshake.auth)
  socket.handshake.auth.forEach(room => socket.join(room))

  socket.on('join', channel => {
    let data = ''
    try {
      jwt.verify(channel.token.accessToken, process.env.ACCESS_TOKEN_SECRET, {}, response => {
        if (response != null) {
          console.log('TOKEN EXPIRED')
          socket.emit('expired')
          channels = channels.filter(chan => {
            return !(chan.name === channel && chan.user === socket.username)
          })
          io.emit('newlist', channels.filter(chan => chan.name === channel) )
        }
        const jwtData = jwt.decode(channel.token.accessToken, {})
        socket.username = jwtData.username
        socket.channel = channel.channel
        // Next will prevent duplicates in the channel list
        channels = channels.filter(chan => {
          return JSON.stringify({ name: channel.channel, user: socket.username} ) !==
            JSON.stringify(chan)
        })
        channels.push({
          name: channel.channel,
          user: socket.username,
          // socketId: socket.id
        })
        io.emit('newlist', channels.filter(chan => chan.name === channel.channel))
      })
    } catch {
      console.log('ERROR')
    }
    console.log('join', channel.channel, data)
  })

  socket.on('message', msg => {
    if (msg.data) {
      console.log(socket.username, msg, socket.rooms.has(msg.channel))
      if (socket.rooms.has(msg.channel)) {
        io.to(msg.channel).emit('broadcast', {...msg, user: socket.username})
      }
    }
  })

  socket.on('logout', data => {
    console.log('LOGOUT', data)
    console.log('CHANNELS', channels)
    channels = channels.filter(chan => {
      return !(chan.name === data.channel && chan.user === data.username)
    })
    io.emit('newlist', channels.filter(chan => chan.name === data.channel))
  })
})

setInterval(() => {
  const aap = Array.from(io.sockets.sockets).map(socket => {
    return {
      name: socket[1].channel,
      user: socket[1].username
    }
  })
  .filter(item => {
    return item.name && item.user
  })
  channels = [...aap]
  // console.log(aap)
}, 3000)

app.use(express.json())

app.get('/userlist', (req, res) => {
  console.log(channels)
  res.status(200).send(channels)
})

app.post('/logout', (req, res) => {
  console.log(`Logout ${req.body.username}.`)
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.redirect('/')
})

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (!refreshToken) {
    return res.status(401).send()
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send()
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send()
    }
    const accessToken = generateAccessToken({ username: user.username })
    res.json({ accessToken })
  })
})

app.post('/users', (req, res) => {
  res.send(users.map(u => u.username))
})

const updateUsers = () => {
  fs.writeFile('./db.json', JSON.stringify(users), err => {
    if (err) throw err
  })
}

app.post('/adduser', async (req, res) => {
  const exists = users.find(u => u.username === req.body.username)
  if (!exists) {
    try {
      const hashed = await bcrypt.hash(req.body.password, 10)
      const user = {
        username: req.body.username,
        password: hashed,
        group: req.body.group
      }
      users.push(user)
      updateUsers()
      console.log(`User ${user.username} added.`)
      res.status(201).send()
    } catch(err) {
      console.log(err)
      res.status(500).send()
    }
  } else {
    console.log(`${exists.username} already exists.`)
    res.status(200).send({ error: 'User already exists' })
  }
})

app.use('/verify', (req, res) => {
  const token = req.body.token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {},err => {
    if (err) {
      return res.status(200).send({ result: false })
    }
    return res.status(200).send({ result: true })
  })
})

const doLogin = async (req, res) => {
  const user = users.find(user => user.username === req.body.username)
  if (!user) {
    return res.status(404).send({ error: LOGIN_ERROR })
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(`User ${user.username}@${req.body.channel} logged in`)
      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {}, null)
      refreshTokens.push(refreshToken)
      req.body.token = refreshToken
      res.json({ accessToken, refreshToken, group: user.group, channel: req.body.channel })
    } else {
      res.status(404).send({ error: LOGIN_ERROR })
    }
  } catch(err) {
    console.log(err)
    res.status(500).send()
  }
}

app.post('/login', doLogin)

app.post('/deleteuser', (req, res) => {
  const user = users.find(user => user.username === req.body.username)
  if (user) {
    users = users.filter(u => u.username !== req.body.username)
    updateUsers()
    console.log(`User ${user.username} deleted.`)
    res.send({ message: 'User deleted'})
  }
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '120m'
  })
}

process.on('uncaughtException', err => {
  console.log('Caught exception: ' + err)
})

server.listen(API_PORT, () => console.log(`authServer running at port ${API_PORT}`))
