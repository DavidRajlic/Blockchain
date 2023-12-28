const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


class Block {
	constructor(index, data, timestamp, hash, previousHash) {
		this.index = index;
		this.data = data;
		this.timestamp = timestamp;
		this.hash = hash;
		this.previous = previousHash;
	}
}

let chain = [];


function najs() {
	console.log("najs");
}

app.get('/najs', (req, res) => {
  const result = najs();
  res.json({ result });
});

// Nastavi osnovno pot do tvojega GUI (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Poslušanje na določenem portu
app.listen(PORT, () => {
  console.log(`Na portu:${PORT}`);
});
