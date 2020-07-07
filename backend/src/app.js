const path      = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const express   = require('express');
const mongoose  = require('mongoose');

const app       = express();
const http      = require('http').Server(app);
const io        = require('socket.io')(http);

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_DATABASE_NAME, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(express.json());
 
// cria uma rota para fornecer o arquivo index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3333, () => {
    console.log("Server started");
});