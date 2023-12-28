const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const sha256 = require('crypto-js/sha256');


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

let first = true;
let currentBlock = null;
let genesisBlock = null;
function createBlock() {
	console.log("najs");
	if (first) {
		let index = 0
		let data = "Blok 1"
		let timestamp = Date.now()
		let previousHash = 0;
		let  hash = sha256(index + timestamp + data + previousHash);
		genesisBlock = new Block(index, data, timestamp, hash , previousHash);
		currentBlock = genesisBlock;
		chain.push(genesisBlock)
		first = false;
	}
	else {
		let index = currentBlock.index + 1;
		let data = `Blok ${chain.length+1}`
		let timestamp = Date.now()
		let previousHash = currentBlock.hash;
		let hash = sha256(index + timestamp + data + previousHash);
		let newBlock = new Block(index, data, timestamp, hash , previousHash);
		currentBlock = newBlock;
		chain.push(newBlock)
		
	}
	for (let i = 0; i < chain.length; i++) {
		console.log(chain[i]);
	}
	
}


app.get('/createBlock', (req, res) => {
  const result = createBlock();
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
