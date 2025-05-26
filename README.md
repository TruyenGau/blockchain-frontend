# 🛒 Blockchain Frontend – Laptop E-commerce

This is the **frontend** of a blockchain-integrated e-commerce platform for selling laptops, built with **React.js** and integrated with **Ethereum smart contracts**.

---

## 🧱 Technology Stack & Tools

- **Solidity** – Writing Smart Contracts & Tests  
- **JavaScript** – React and blockchain interaction  
- **React.js** – Frontend framework  
- **Hardhat** – Blockchain development environment  
- **Ethers.js** – Communicating with smart contracts  

---

## ⚙️ Requirements for Setup

- Node.js (LTS version recommended)
- Git
- Metamask extension (for interacting with blockchain)

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/TruyenGau/blockchain-frontend.git


```
### 2. Install Dependencies
```bash
npm install
```

### 3. Run Local Blockchain with Hardhat
```bash
# Move into the blockchain folder
cd blockchain

# Start Hardhat local blockchain
npx hardhat node
```
### 4. Deploy Smart Contracts
```bash
In a new terminal, run:
npx hardhat run ./scripts/deploy.js --network localhost
```
### 5. Start the Frontend App
```bash
After deploying, go back to the frontend root:
cd ..
npm run start

🔐 Notes
Make sure Metamask is installed and connected to localhost:8545 (Hardhat Network)
```

Contracts are deployed locally and frontend interacts via Ethers.js

Update contract addresses in config.js if necessary

👨‍💻 Author
Lê Văn Truyền – GitHub
