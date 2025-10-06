## 🎯 What is FHEGuess?

This repo is a privacy-oriented number guessing game made with Zama FHEVM. Encrypted guesses, random numbers and a simple tour system.




### 🎮️ **Game Mechanics**

Tour System: The game is divided into rounds lasting 5 minutes each (in the original it was clock-based, this was simplified for the demo). In each round, a new random number (Dec. 1-100) is generated.
Encrypted Guesses: Players send their guesses (a number between 1-100) Decryptively. Thanks to FHEVM, estimates and random numbers remain encrypted on the blockchain, so privacy is protected.
Determining the Winner: At the end of the round, the encrypted random number is compared with the encrypted predictions (with FHE). The player who makes the closest guess wins.
Simulation Note: Instead of the real FHEVM, this demo generates a simple random number (with keccak256). In real application, Zama's FHE functions such as randEuint8 are used.

### ⏰ **Gameplay Steps**
The Tour Starts: The contract holder starts a new tour (startNewRound). A random number is determined (cryptically).
Sending a Guess: Players make a guess between 1-100 (submitGuess). Decryption: The player must submit a guess between 1-100 (submitGuess). Forecasts are saved in encrypted form.
Result Description: At the end of the round, the contract holder announces the result (revealResult). The closest guess is determined and the winner is announced.
Privacy: All transactions (predictions, comparisons) are encrypted so that no one can see the predictions of other players.


## 🛠️ Technology Stack

### **Smart Contracts**
- **Solidity ^0.8.24**: Smart contract development
- **Zama FHEVM**: Fully Homomorphic Encryption library
- **Hardhat**: Development environment and testing framework
- **Sepolia Testnet**: Ethereum test network deployment

### **Frontend**
- **React 19**: User interface framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Ethers.js 6**: Blockchain interaction library
- **Custom CSS**: Terminal-style UI design

### **Infrastructure**
- **Nginx**: Reverse proxy and web server
- **Certbot**: SSL certificate management
- **Domain**: Custom domain with HTTPS support

## 📦 Project Structure

```
zamaFHE-gues/
├── contracts/
│   └── FHEGuessGame.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── FHEGuessGame.test.js
├── frontend/
│   ├── src/
│   │   └── App.js
│   ├── package.json
│   └── vite.config.js
├── hardhat.config.js
├── package.json
├── README.md
└── LICENSE
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **MetaMask** browser extension
- **Sepolia ETH** for gas fees

### 1. Clone Repository
```bash
git clone  `git clone https://github.com/sinirlibiber/zamaFHE-gues.git `
cd zamaFHE-gues
```

### 2. Smart Contract Setup
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Sepolia (optional)
npx hardhat run scripts/deploy-fheguess.js --network sepolia
```

### 3. Frontend Setup
```bash
# Navigate to frontend
cd frontend/

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 4. Environment Configuration
Create `.env` file in project root:
```env
MNEMONIC="your twelve word seed phrase here"
INFURA_API_KEY="your_infura_project_id"
```

## 🔐 FHE Operations Deep Dive

### Core FHEVM Functions Used

#### **Random Number Generation**
```solidity
euint8 randomNumber = FHE.randEuint8(); // Generates encrypted random 0-255
```

#### **Encrypted Input Processing**
```solidity
euint8 encryptedGuess = FHE.asEuint8(_guess); // Convert plaintext to encrypted
```

#### **Access Control Management**
```solidity
FHE.allowThis(randomNumber);           // Grant contract access
FHE.allow(encryptedGuess, msg.sender); // Grant user access
```

#### **Async Decryption Oracle**
```solidity
bytes32[] memory cts = new bytes32[](1);
cts[0] = FHE.toBytes32(round.secretNumber);
FHE.requestDecryption(cts, this.processReveal.selector);
```

#### **Signature Verification**
```solidity
FHE.checkSignatures(requestId, signatures); // Verify KMS signatures
```

## 📋 Smart Contract API

### Main Functions

#### `startNewRound()`
- **Access**: Public (only during odd hours)
- **Function**: Generates encrypted random number and initiates new round
- **Gas**: ~166,427

#### `submitGuess(uint8 _guess)`
- **Access**: Public (only during guess time)
- **Parameters**: `_guess` - Number between 0-100
- **Function**: Encrypts and stores player guess
- **Gas**: ~212,252

#### `revealResult()`
- **Access**: Public (only during even hours)
- **Function**: Triggers decryption oracle to reveal results
- **Requirements**: Active round with players

#### `getCurrentRoundInfo()`
- **Access**: View function
- **Returns**: `(uint8 round, bool numberGenerated, bool roundEnded, uint256 startTime, uint256 playerCount)`

#### `getPlayerGuessStatus(address player)`
- **Access**: View function
- **Returns**: `(bool hasGuessed, uint256 timestamp)`

### Time Helper Functions

#### `getCurrentHourUTC3()`
- **Returns**: Current hour in UTC+3 timezone

#### `isOddHour()` / `isEvenHour()`
- **Returns**: Boolean indicating current hour type

#### `isGuessTimeActive()` / `isRevealTimeActive()`
- **Returns**: Boolean indicating current game phase

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/FHEGuessTimed.test.js

# Run tests with gas reporting
npx hardhat test --network hardhat
```

### Test Coverage
- ✅ **Time Functions**: UTC+3 calculations, odd/even hour detection
- ✅ **Game Logic**: Round initialization, guess submission, duplicate prevention
- ✅ **Validation**: Input range checking, access control
- ✅ **View Functions**: Status queries, round history

### Sample Test Output
```
  FHEGuess Timed
    ⏰ Time Functions
      ✓ Should correctly calculate UTC+3 time
      ✓ Should correctly identify odd/even hours
    🎮 Game Logic  
      ✓ Should initialize with correct default values
      ✓ Should start new round during odd hours
      ✓ Should submit guess during guess time
      ✓ Should prevent duplicate guesses
      ✓ Should validate guess range
    📊 View Functions
      ✓ Should return correct round history
      ✓ Should return game status correctly

  9 passing (57ms)
```


## 🔒 Security Considerations

### **FHE Security Features**
- **Confidential Computation**: All sensitive operations performed on encrypted data
- **Access Control Lists**: Granular permissions for ciphertext access
- **Oracle Verification**: KMS signature validation for decryption results
- **Replay Protection**: Transaction-bound encryption prevents reuse attacks

### **Smart Contract Security**
- **Input Validation**: Range checking for all user inputs
- **Time-based Access Control**: Function restrictions based on hour type
- **Duplicate Prevention**: Single guess per player per round
- **Safe Math**: Overflow protection in calculations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the **MIT License** 


### **Technology Documentation**
- **Zama FHEVM**: [docs.zama.ai](https://docs.zama.ai)
- **Hardhat**: [hardhat.org](https://hardhat.org)
- **React**: [reactjs.org](https://reactjs.org)
- **Vite**: [vitejs.dev](https://vitejs.dev)

### **Blockchain Resources**
- **Sepolia Testnet**: [sepoliafaucet.com](https://sepoliafaucet.com)
- **MetaMask**: [metamask.io](https://metamask.io)
- **Etherscan**: [sepolia.etherscan.io](https://sepolia.etherscan.io)


**Using Zama's FHEVM technology**

