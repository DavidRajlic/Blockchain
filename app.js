const express = require('express');
const path = require('path');
const app = express();
const sha256 = require('crypto-js/sha256');
const net = require('net');

const clients = [];
const client = new net.Socket();
let chain = [];
let first = true;
let currentBlock = null;
let previousBlock = null;
let genesisBlock = null;
const timePerBlock = 10;
const numOfBlocks = 10;
const timeExpected = timePerBlock * numOfBlocks;

class Block {
	constructor(index, data, timestamp, hash, previousHash) {
		this.index = index;
		this.data = data;
		this.timestamp = timestamp;
		this.hash = hash;
		this.previousHash = previousHash;
	}
}

function createBlock() {
	
	/*client.connect(4000, '127.0.0.1', () => {
		console.log('Povezan s strežnikom');
		
		
	  });
	  client.on('data', (data) => {
		console.log('Prejeto od strežnika:');
		console.log(data.toString());
		client.end();
	  });
	  */
	 
	  clients.forEach((client) => {
		client.write("ful fajnjjj");
	
	});
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
		previousBlock = currentBlock;
		currentBlock = newBlock;
		chain.push(newBlock)
		

		console.log(validation(currentBlock, previousBlock));
		
	}
	
	console.log("najs");
	/*
	for (let i = 0; i < chain.length; i++) {
		console.log(chain[i]);
	}
	*/
	
}

function validation(currentBlock, previousBlock) {
if (currentBlock.previousHash == previousBlock.hash)
 {
	return true;
 }
 else {
	return false;
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
  


  

  
  client.on('close', () => {
	console.log('Povezava s strežnikom zaprta');
  });
  

const server = net.createServer((socket) => {
	clients.push(socket);
  socket.on('end', () => {
    console.log('Odjemalec je prekinil povezavo.');
  });
});

const PORT = 3000;

server.listen(3000, "127.0.0.1", () => {
	console.log("opened server on", server.address());
  });

// Poslušanje na določenem portu
app.listen(PORT, () => {
	console.log(`Na portu:${PORT}`);
  });