const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Poveži se na prvo vozlišče

socket.on('connect', () => {
  console.log('Povezan na prvo vozlišče');
  
  socket.emit('message', 'Pozdrav iz drugega vozlišča');
});
