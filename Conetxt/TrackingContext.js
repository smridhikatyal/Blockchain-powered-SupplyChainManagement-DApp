import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import tracking from "../artifacts/contracts/Tracking.sol/Tracking.json";

const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;
const NETWORK_RPC_URL = process.env.NEXT_PUBLIC_NETWORK_RPC_URL;
const ContractABI = tracking.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

//NETWORK----
const networks = {
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [NETWORK_RPC_URL],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: [NETWORK_RPC_URL],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  localhost: {
    chainId: `0x${Number(1337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = NETWORK;
  await changeNetwork({ networkName });
};
//END  OF NETWORK-------

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  //STATE VARIABLE
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");
  const [balance, setBalance] = useState();

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await createItem.wait();
      console.log(createItem);
      location.reload();
    } catch (error) {
      console.log("Some want wrong", error);
    }
  };

  const getAllShipment = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);

        const shipments = await contract.getAllTransactions();
        const allShipments = shipments.map((shipment) => ({
          sender: shipment.sender,
          receiver: shipment.receiver,
          price: ethers.utils.formatEther(shipment.price.toString()),
          pickupTime: shipment.pickupTime.toNumber(),
          deliveryTime: shipment.deliveryTime.toNumber(),
          distance: shipment.distance.toNumber(),
          isPaid: shipment.isPaid,
          status: shipment.status,
        }));

        return allShipments;
      }
    } catch (error) {
      console.log("error want, getting shipment");
    }
  };

  const getShipmentsCount = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider);
        console.log(contract);
        const shipmentsCount = await contract.getShipmentsCount(address);
        console.log(shipmentsCount);
        return shipmentsCount.toNumber();
      }
    } catch (error) {
      console.log("error want, getting shipment");
    }
  };

  const completeShipment = async (completeShip) => {
    const { recevier, index } = completeShip;
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const transaction = await contract.completeShipment(
          address,
          recevier,
          index,
          {
            gasLimit: 300000,
          }
        );

        await transaction.wait();
        console.log(transaction);
        location.reload();
      }
    } catch (error) {
      console.log("wrong completeShipment", error);
    }
  };

  const getShipment = async (index) => {
    try {
      const address = await checkIfWalletConnected();

      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider);
        const shipment = await contract.getShipment(address, index * 1);

        console.log(shipment);

        const SingleShiplent = {
          sender: shipment[0],
          receiver: shipment[1],
          pickupTime: shipment[2].toNumber(),
          deliveryTime: shipment[3].toNumber(),
          distance: shipment[4].toNumber(),
          price: ethers.utils.formatEther(shipment[5].toString()),
          status: shipment[6],
          isPaid: shipment[7],
        };

        return SingleShiplent;
      }
    } catch (error) {
      console.log("Sorry no chipment");
    }
  };

  const startShipment = async (getProduct) => {
    const { reveiver, index } = getProduct;

    try {
      const address = await checkIfWalletConnected();

      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const shipment = await contract.startShipment(
          address,
          reveiver,
          index * 1,
          {
            gasLimit: 300000,
          }
        );

        await shipment.wait();
        console.log(shipment);
        location.reload();
      }
    } catch (error) {
      console.log("Sorry no chipment", error);
    }
  };
  //---CHECK WALLET CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const network = await handleNetworkSwitch();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
        // Get balance
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const formattedBalance = ethers.utils.formatEther(balance);

        setBalance(formattedBalance);
        return accounts[0];
      } else {
        return "No account";
      }
    } catch (error) {
      return "not connected";
    }
  };

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const network = await handleNetworkSwitch();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something want wrong";
    }
  };

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
        balance,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
