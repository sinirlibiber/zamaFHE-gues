This repo is a privacy-oriented number guessing game made with Zama FHEVM. Encrypted guesses, random numbers and a simple tour system.


## Features
- Cryptic predictions (with FHEVM euint8).
- a game between 1-100. Dec.
- Hardhat deploy and test.
- Simple React frontend.

## Installation

1. Clone it: git clone  `git clone https://github.com/sinirlibiber/zamaFHE-gues.git `
2. Contracts: `cd zamaFHE-gues && npm install`
3. Compile: `npx hardhat compile`
4. Test: `npx hardhat test`
5. Deploy: `npx hardhat run scripts/deploy.js --network sepolia` (Add API key)
6. Frontend: `cd frontend && npm install && npm run dev`

7. ##FHEVM Note
Integrate Zama SDK for real FHE. Simple rand was used in the demo

## Lisans
MIT
