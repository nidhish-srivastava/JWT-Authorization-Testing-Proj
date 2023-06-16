require('dotenv').config();
require('express-async-errors');  // so that we dont need to setup our async middleware,we use this package
const cors = require('cors')

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const mainRouter = require('./routes/main')

// middleware
// app.use(express.static('./public'));
app.use(cors())
app.use(express.json())

app.use('/api/v1',mainRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
