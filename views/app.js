const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const authRoutes = require('../src/routes/authRoutes');
const productsRouter = require('../src/routes/products');
const cartsRouter = require('../src/routes/carts');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configurar express-session y Passport
app.use(session({
    secret: 'tu_clave_secreta',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Configurar Passport para autenticación local
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configurar Passport para autenticación con GitHub
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Configurar middleware y routers
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/auth', authRoutes);

// Configurar WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado a través de WebSocket');

  ws.on('message', (message) => {
    console.log(`Mensaje recibido a través de WebSocket: ${message}`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado de WebSocket');
  });
});

// Iniciar el servidor
const port = 8080;
server.listen(port, () => {
  console.log(`Servidor HTTP y WebSocket está corriendo en el puerto ${port}`);
});
