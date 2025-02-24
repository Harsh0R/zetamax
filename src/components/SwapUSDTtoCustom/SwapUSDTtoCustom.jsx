"use client";

import { useEffect, useState } from "react";
import Web3 from "web3";

const ownerWallet = "0xee8570552f80C8Df99480911a09505128f990fCc"; // Your wallet that receives USDT and sends custom tokens

const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC Mainnet
const customTokenAddress = "0x424fbEAAb23303561b96872eE46863e68264054c"; // Replace with your token address

const usdtAbi = [
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

const customTokenAbi = [
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
];

export default function SwapUSDTtoCustom() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [customBalance, setCustomBalance] = useState("0");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (!web3) return alert("Web3 not initialized!");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      fetchBalances(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const fetchBalances = async (userAccount) => {
    if (!web3) return;

    const usdtContract = new web3.eth.Contract(usdtAbi, usdtContractAddress);
    const customTokenContract = new web3.eth.Contract(customTokenAbi, customTokenAddress);

    const usdtBal = await usdtContract.methods.balanceOf(userAccount).call();
    const customBal = await customTokenContract.methods.balanceOf(userAccount).call();
    console.log("Custom bal => " , customBal);
    
    setUsdtBalance((usdtBal / 10 ** 18).toFixed(4));
    setCustomBalance((customBal / 10 ** 18).toFixed(4));
  };

  const approveUSDT = async () => {
    if (!web3 || !account) return alert("Connect wallet first!");

    const usdtContract = new web3.eth.Contract(usdtAbi, usdtContractAddress);
    const amountWei = web3.utils.toWei(amount, "ether");

    try {
      await usdtContract.methods
        .approve(ownerWallet, amountWei)
        .send({ from: account });

      alert("USDT Approved!");
    } catch (error) {
      console.error("Approval Error:", error);
    }
  };

  const sendUSDT = async () => {
    if (!web3 || !account) return alert("Connect wallet first!");

    const usdtContract = new web3.eth.Contract(usdtAbi, usdtContractAddress);
    const amountWei = web3.utils.toWei(amount, "ether");

    try {
      await usdtContract.methods
        .transferFrom(account, ownerWallet, amountWei)
        .send({ from: account });

      alert("USDT Sent! Wait for custom token transfer.");
    } catch (error) {
      console.error("Transfer Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Swap USDT to Custom Token</h2>

      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
      </button>

      <p>USDT Balance: {usdtBalance}</p>
      <p>Custom Token Balance: {customBalance}</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 w-full my-2"
      />

      <button
        onClick={approveUSDT}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
      >
        Approve USDT
      </button>

      <button
        onClick={sendUSDT}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Send USDT
      </button>
    </div>
  );
}
