const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      blogRoutes = require('./routes/blog'),
      authRoutes = require('./routes/auth');

require('dotenv').config();

//app
const app = express();

//db
mongoose
    .connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log(
`  ____  ____     ____ ___  _   _ _   _ _____ ____ _____ _____ ____  
 |  _ \\\| __ )   / ___/ _ \\\| \\\ | | \\\ | | ____/ ___|_   _| ____|  _ \\\ 
 | | | |  _ \\\  | |  | | | |  \\\| |  \\\| |  _|| |     | | |  _| | | | |
 | |_| | |_) | | |__| |_| | |\\\  | |\\\  | |__| |___  | | | |___| |_| |
 |____/|____/   \\\____\\\___/|_| \\\_|_| \\\_|_____\\\____| |_| |_____|____/ `
   ));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if(process.env.NODE_ENV == 'development') {
    app.use(cors({ origin:`${process.env.CLIENT_URL}` }));
}
app.use(cors());

//routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));