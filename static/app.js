window.socket = io.connect("http://localhost:8080");
var tx = null;

socket.on("connect", function () {
  console.log('connect');
});

socket.on("update", function (data) {
  if (tx.value !== data.value) {
    tx.value = data.value;
  }
});

window.addEventListener('load', function() {
  tx = document.querySelector('textarea');
  tx.addEventListener('keyup', function () {
    socket.emit('update', {
      timestamp: Date.now(),
      value: tx.value
    });
  });
});
