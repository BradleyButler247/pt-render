const express = require('express');
const cors = require('cors');
const corsOptions = {
  'Access-Control-Allow-Origin': process.env.VITE_CLIENT_ADDRESS,
  methods: ['GET', 'POST', 'PATCH']
}
const morgan = require('morgan');
const { NotFoundError } = require('./expressError');

const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const { PORT } = require('./config');
const { SERVER_PORT } = require('./config');
const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const cryptoRoutes = require('./routes/crypto');

const app = express();

app.use(cors());
// app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/crypto', cryptoRoutes);

/** Handle 404 errors -- this matches everything */
// app.use((req, res, next) => {
//   return next(new NotFoundError());
// });

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

const server = app.listen(SERVER_PORT, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${ port }`);
});