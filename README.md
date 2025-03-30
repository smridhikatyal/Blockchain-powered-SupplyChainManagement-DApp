# Building a Blockchain Supply Chain Management DApp

🚀 Introduction

      Supply chains today suffer from inefficiencies, fraud, and lack of transparency, leading 
      to financial losses and trust issues. Our Blockchain-based Shipment Tracking DApp 
      revolutionizes logistics by ensuring secure, immutable, and transparent tracking of 
      shipments from sender to receiver. This decentralized approach eliminates intermediaries 
      and enhances trust in global trade.

🛠️ Problem Statement

      Traditional supply chains are prone to:
      
      Lack of Transparency: Shipments can be altered or delayed without real-time tracking.
      
      Fraudulent Activities: Intermediaries may tamper with the shipment details.
      
      Payment Disputes: Delays in payment release, leading to inefficiencies.
      
      Centralized Vulnerabilities: Single points of failure can disrupt operations.

🔥 How Our DApp Solves These Issues

      Our Decentralized Shipment Tracking DApp addresses these challenges by utilizing Ethereum 
      blockchain and smart contracts to:
      ✅ Ensure Immutable Tracking: Every shipment record is stored permanently on the 
          blockchain.
      ✅ Enable Trustless Transactions: Payments are locked in a smart contract and 
          automatically released upon delivery confirmation.
      ✅ Prevent Tampering & Fraud: Data cannot be altered, ensuring authenticity.
      ✅ Remove Intermediaries: Eliminates unnecessary third-party involvement, reducing costs.
      ✅ Provide Real-time Status Updates: Track shipments at every stage without relying on 
          centralized databases.

📜 Flow of the DApp

      User Connects Wallet: The sender connects their MetaMask wallet to the DApp.
      
      Create Shipment: Sender enters receiver details, distance, pickup time, and price.
      
      Smart Contract Stores Data: Shipment details are stored on the blockchain.
      
      Shipment Updates: The status updates as the shipment progresses.
      
      Completion & Payment Release: Once delivery is confirmed, payment is automatically released to the receiver.

🏗️ Architecture Overview

Technical Stack

      Frontend: React.js, Web3.js, Ether.js
      
      Backend: Smart Contracts (Solidity)
      
      Blockchain: Ethereum (Hardhat)
      
      Development Tools: Hardhat,Web3Modal, MetaMask
      
      Database: Ethereum Blockchain (Immutable Storage)


🚀 Key Features

      🔹 Secure & Transparent Tracking: Every shipment is verifiable on-chain.
      🔹 Automated Payment System: Payments are released only upon successful delivery.
      🔹 Decentralized & Tamper-proof: Eliminates intermediaries and prevents fraud.
      🔹 Real-time Status Updates: Provides accurate tracking at every stage.
      🔹 Easy-to-Use Interface: Connect with MetaMask and manage shipments seamlessly.

🔧 Smart Contract Functionality

      Our Solidity smart contract, Tracking.sol, includes:
      
      Creating a Shipment: Sender initializes a shipment with required details.
      
      Starting a Shipment: The assigned shipper marks the shipment as "In Transit."
      
      Completing a Shipment: The receiver confirms delivery, triggering automatic payment 
      release.
      
      Event Emission: All major updates trigger blockchain events for easy monitoring.

🏁 Getting Started

    Clone the Repository:

      git clone https://github.com/your-repo/blockchain-supply-chain.git
      cd blockchain-supply-chain
      
      Install Dependencies:
      
      npm install
      
      Compile & Deploy Smart Contract (Hardhat):
      
      npx hardhat compile
      npx hardhat run scripts/deploy.js --network rinkeby
      
      Start Frontend:

      npm start
      
      Connect MetaMask & Test:
      
      Open the app in the browser.
      
      Connect your MetaMask wallet.
      
      Create, track, and complete shipments using the DApp.


🏗️ Flow Overview


![Screenshot 2025-03-30 152330](https://github.com/user-attachments/assets/633bc10a-9f9e-4b7b-a837-849ce7d0bf5d)



🏗️ Project Overview


📜Dashboard


![Screenshot 2025-03-25 005238](https://github.com/user-attachments/assets/8bcbe37e-9af5-4f4c-aa13-b3bd3433e082)



📜Create new Shipment Tracking (Product owner will request tracking process)



![Screenshot 2025-03-25 011619](https://github.com/user-attachments/assets/a589151f-d130-49d4-8142-9af61064c874)




📜Tracking will look like (Shipment details will be stored on blockchain)



![Screenshot 2025-03-25 010819](https://github.com/user-attachments/assets/c62bda22-a6bd-4512-9121-965ce48f6969)





📜Start the Shipping Process(the shipper will ship the product)



![Screenshot 2025-03-25 010907](https://github.com/user-attachments/assets/d9f5d1bb-936b-4cc3-82f8-b1d130552384)



📜Product Status will be updated in blockchain



![Screenshot 2025-03-25 010922](https://github.com/user-attachments/assets/90b79731-a023-4a10-bdaf-078a2f2c2675)




📜Complete the Shipping Process(Delivery Guy will end the shipping process)



![Screenshot 2025-03-25 011027](https://github.com/user-attachments/assets/dba18400-03c1-4002-99ce-defa10fdea6a)




📜Product Status will be updated in blockchain


![Screenshot 2025-03-25 011052](https://github.com/user-attachments/assets/9a48fea6-cd2f-4f5e-a59c-abb21d887ad1)


MetaMask




![Screenshot 2025-03-25 000421](https://github.com/user-attachments/assets/55990f62-8d90-462a-9cab-5e6f1a4d3e3a)

![Screenshot 2025-03-25 000741](https://github.com/user-attachments/assets/d9985233-3994-4f6c-9968-dbf3d68e54ad)




      

