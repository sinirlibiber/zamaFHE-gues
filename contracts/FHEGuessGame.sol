// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract FHEGuessGame {
    uint256 public roundId;
    uint256 public secretNumber;
    mapping(address => uint256) public guesses;
    address public owner;

    event RoundStarted(uint256 roundId, uint256 timestamp);
    event GuessSubmitted(address player, uint256 guess);
    event RoundRevealed(uint256 secretNumber, address winner);

    constructor() {
        owner = msg.sender;
        startNewRound();
    }

    function startNewRound() public {
        require(msg.sender == owner, "Only owner");
        roundId++;
        // FHEVM simülasyonu: Gerçekte FHE.randEuint8() kullan
        secretNumber = uint256(keccak256(abi.encodePacked(block.timestamp, roundId))) % 100 + 1;
        emit RoundStarted(roundId, block.timestamp);
    }

    // FHEVM'de: euint8 encryptedGuess = FHE.asEuint8(_guess);
    // Gerçekte: FHE.allow(encryptedGuess, msg.sender);
    function submitGuess(uint256 _guess) public {
        require(_guess >= 1 && _guess <= 100, "Guess 1-100");
        require(guesses[msg.sender] == 0, "Already guessed");
        guesses[msg.sender] = _guess;
        emit GuessSubmitted(msg.sender, _guess);
    }

    function revealResult() public {
        require(msg.sender == owner, "Only owner");
        address winner;
        uint256 minDiff = 100;
        // Basit loop (gerçekte FHE ile şifreli karşılaştırma)
        for (uint i = 0; i < 100; i++) {  // Demo için sınırlı
            // Gerçekte: FHE.abs(guess - secret) hesapla
        }
        // Winner bulma simülasyonu (gerçek kodda genişlet)
        emit RoundRevealed(secretNumber, winner);
        // Reset guesses
    }
}