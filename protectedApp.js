// Partially from https://github.com/keycloak/keycloak-quickstarts/blob/latest/service-nodejs/app.js

const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const keycloak = new Keycloak({
  store: memoryStore,
});

app.use(keycloak.middleware({
  logout: '/logout',
}));

app.get('/', (req, res) => {
  res.json({ message: 'unprotected public content' });
});

app.get('/protected', keycloak.protect(), (req, res) => {
  res.json({
    message: 'Welcome to protected content!',
    tokens: {
      access_token: req.kauth.grant.access_token.token,
      id_token: req.kauth.grant.id_token.token,
      refresh_token: req.kauth.grant.refresh_token.token,
    },
  });
});

// Uncomment for user api example
// const KcAdminClient = require('@keycloak/keycloak-admin-client');
// const config = require('./keycloak.json');
//
// // eslint-disable-next-line new-cap
// const kcAdminClient = new KcAdminClient.default({
//   baseUrl: config['auth-server-url'],
//   realmName: config.realm,
// });
//
// const credentials = {
//   grantType: 'client_credentials',
//   clientId: config['client-id'],
//   clientSecret: config.credentials.secret,
// };
//
// kcAdminClient.auth(credentials);
// setInterval(() => kcAdminClient.auth(credentials), 58 * 1000); // 58 seconds
//
// app.get('/users', keycloak.protect(), async (req, res) => {
//   console.log(kcAdminClient.accessToken);
//   res.json(await kcAdminClient.users.find());
// });
//
// app.post('/users', keycloak.protect(), async (req, res) => {
//   try {
//     const result = await kcAdminClient.users.create(
//       req.body,
//     );
//     res.status(201).json(result);
//   } catch (e) {
//     console.log(e);
//     res.status(e.response.status).json({ message: e.response.statusText });
//   }
// });

app.listen(3333, () => {
  console.log('Started at port 3333');
});
