const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('ip', (process.env.IP || '127.0.0.1'));

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
 res.render('index');
});

const port = app.get('port');
const ip = app.get('ip');
app.listen(port, function () {
  console.log(`Server is listening on http://${ip}:${port}`);
});
