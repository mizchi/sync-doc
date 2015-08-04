var Hapi = require("hapi");
var app = Hapi.createServer(8080);
var io = require("socket.io")(app.listener)

io.on("connection", function (socket) {
  socket.emit("welcome", {
    message: "Hello from Hapi!",
    version: Hapi.version
  });
  socket.on("update", function(data) {
    console.log('update:server');
    io.sockets.emit('update',{
      timestamp: data.timestamp,
      value: data.value
    });
  });
});

app.route({
  path: "/{static*}",
  method: "GET",
  handler: {
    directory: {
      path: "./static"
    }
  }
});

app.start(function () {
    console.log("socket.io example @", app.info.uri)
})
