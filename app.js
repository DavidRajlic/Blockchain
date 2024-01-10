const express = require('express');
const path = require('path');
const app = express();
const sha256 = require('crypto-js/sha256');
const net = require('net');

const clients = [];
const client = new net.Socket();
let blockchain = [];
let first = true;
let mining = false;

let currentBlock = null;
let previousBlock = null;
let genesisBlock = null;
const blockGenerationInterval = 2;
const diffAdjustInterval = 2;
let difficulty = null;

class Block {
	constructor(index, data, timestamp, hash, previousHash, difficulty, nonce) {
		this.index = index;
		this.data = data;
		this.timestamp = timestamp;
		this.hash = hash;
		this.previousHash = previousHash;
		this.difficulty = difficulty;
		this.nonce = nonce;
	}
}


function proofOfWork(block) {
	const hashDiff = '0'.repeat(block.difficulty);
	let run = true;
	let nonce = 0;
	while(run) {
		let hash = sha256(block.index + block.timestamp + block.data + block.previousHash + block.difficulty + nonce);
		let stringHash = String(hash);
		if (stringHash.substring(0,block.difficulty) == hashDiff) {
			return nonce 
		}
		else {
			nonce++;
		}
	}
}

function createGenesisBlock() {
	
}

function validate(currentBlock, previousBlock) {
	if (currentBlock.previousHash == previousBlock.hash)
	 {
		return true;
	 }
	 else {
		return false;
	 }
	}

function upgradedValidation(block, previosuBlock) {
	let diffrence = block.timestamp - Date.now();
	let otherDiffrence = previosuBlock.timestamp - block.timestamp

if (diffrence < 60000 && otherDiffrence < 60000) {
	return true;
}
else return false;
}
let a = 0;
let createdBlocks = 0;
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
		difficulty = 0;

		
		genesisBlock = new Block(index, data, timestamp, hash , previousHash, difficulty);
	
		currentBlock = genesisBlock;
		blockchain.push(genesisBlock)
		
		clients.forEach((client) => {
			client.write(String(genesisBlock));
		
		});
		
		first = false;
		mining = true;
	}
	else if(!first && mining) {
		let index = currentBlock.index + 1;
		let data = `Blok ${blockchain.length+1}`
		let timestamp = Date.now()
		let previousHash = currentBlock.hash;
		let hash = sha256(index + timestamp + data + previousHash);
		
		createdBlocks++;
		
		if (createdBlocks == diffAdjustInterval)  {
			let previousAdjustmentBlock = blockchain[blockchain.length - diffAdjustInterval]
			
			let timeExpected = blockGenerationInterval * diffAdjustInterval
			let timeTaken = currentBlock.timestamp - previousAdjustmentBlock.timestamp
			if ( timeTaken < (timeExpected / 2) ) {
				console.log("enka")
				difficulty = previousAdjustmentBlock.difficulty + 1;
			}
			else if ( timeTaken > (timeExpected * 2) ) {
				console.log("dvojka")
				if (difficulty != 0) {
					difficulty = previousAdjustmentBlock.difficulty - 1;
				}
				
			}
			else {
				console.log("trojka")
				difficulty = previousAdjustmentBlock.difficulty 
			}
			createdBlocks = 0;
			console.log(difficulty);
			let newBlock = new Block(index, data, timestamp, hash, previousHash, difficulty);
		
		let validation = validate(newBlock, currentBlock);
		if (validation) {
			let nonce = proofOfWork(newBlock);
			newBlock.nonce = nonce 

		previousBlock = currentBlock;
		currentBlock = newBlock;
		if (upgradedValidation(currentBlock, previousBlock)) {
			blockchain.push(newBlock)
			clients.forEach((client) => {
				client.write(JSON.stringify(newBlock));
			
			});
		}
		
		
		}
		
		}
		else {
			let newBlock = new Block(index, data, timestamp, hash, previousHash, difficulty);
		
		let validation = validate(newBlock, currentBlock); 
		if (validation) {
			let nonce = proofOfWork(newBlock);
		newBlock.nonce = nonce 
		previousBlock = currentBlock;
		currentBlock = newBlock;
		if (upgradedValidation(currentBlock, previousBlock)) {
			blockchain.push(newBlock)
			clients.forEach((client) => {
				client.write(JSON.stringify(newBlock));
			
			});
		}
	}
		}
	
		
		
	}
	
	
	/*
	for (let i = 0; i < chain.length; i++) {
		console.log(chain[i]);
	}
	*/
	a++;
	
	while (mining) {
		createBlock();
		
	}
	
	
}




app.get('/createBlock', (req, res) => {
	const result = createBlock();
	res.json({ result });
  });

	app.get('/connect', (req, res) => {
		const result = connect();
		res.json({ result });
		});

	function stopServer() {
		server.close(() => {
			process.exit();
		});
	}
	
	app.get('/stop', (req, res) => {
		res.json({ message: 'Stopping the server...' });
		stopServer();
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

server.listen(3001, "127.0.0.2", () => {
	console.log("opened server on", server.address());
  });

// Poslušanje na določenem portu
app.listen(PORT, () => {
	console.log(`Na portu:${PORT}`);
  });