const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));

let port = process.env.PORT || 8000;

app.get('/*', function (req, res) {
    res.sendFile(__dirname+'/build/index.html');
});

const listener = app.listen(port, () => {
    console.log(`server is listening on port => ${listener.address().port}`);
})