import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers';
import usdtAbi from '../../usdtABI';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import tokenAbi from '../../tokenAbi';
export const SwapContext = createContext();

const ContextProvider = ({ children }) => {


  const { address, isConnected } = useAccount();
  const [exchangeRateAdmin, setExchangeRateAdmin] = useState(0);
  const [depositAddressAdmin, setDepositAddressAdmin] = useState("0xee8570552f80C8Df99480911a09505128f990fCc");
  const [depositPrivetKeyAdmin, setDepositPrivetKeyAdmin] = useState("c80027e8ca3865116cf5741f59d148345adc980bcc92ac9e08e9e8477bdaf0f1");
  const [withdrawAddressAdmin, setWithdrawAddressAdmin] = useState("0xee8570552f80C8Df99480911a09505128f990fCc");
  const [withdrawPrivetKeyAdmin, setWithdrawPrivetKeyAdmin] = useState("c80027e8ca3865116cf5741f59d148345adc980bcc92ac9e08e9e8477bdaf0f1");

  const USDT_ADDRESS = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
  const CUSTOM_TOKEN_ADDRESS = "0xB951e00C66215188001711b452A34ef204D135Ed";


  // useEffect(() => {

  //   setDepositAddressAdmin("0xee8570552f80C8Df99480911a09505128f990fCc");
  //   setDepositPrivetKeyAdmin("c80027e8ca3865116cf5741f59d148345adc980bcc92ac9e08e9e8477bdaf0f1");
  //   setWithdrawAddressAdmin("0xee8570552f80C8Df99480911a09505128f990fCc");
  //   setWithdrawPrivetKeyAdmin("c80027e8ca3865116cf5741f59d148345adc980bcc92ac9e08e9e8477bdaf0f1");

  // }, [])





  const getAdminWallet = () => {
    const adminProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    return new ethers.Wallet(depositPrivetKeyAdmin, adminProvider);
  };
  const toWei = async (amount) => {
    const toWie = ethers.utils.parseUnits(amount.toString());
    return toWie.toString();
  }

  const transferUSDTToAdmin = async (amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(USDT_ADDRESS, usdtAbi, signer);
      console.log("usdt contract => ", usdtContract);
      console.log("deposit address => ", depositAddressAdmin);

      const tx = await usdtContract.transfer("0xC2b99faD0413E1C5EA4bcB3Af8757f9B37234EDF", toWei(amount))
      await tx.wait();

      console.log("USDT transferred successfully! ==> ", tx);
      return tx.hash;
    } catch (error) {
      console.error("USDT Transfer Error:", error);
      toast.error("Failed to transfer USDT!");
    }
  };

  const sendCustomTokenToUser = async (userAddress, amount, exchangeRate) => {
    try {
      const adminWallet = await getAdminWallet();

      const tokenContract = new ethers.Contract(CUSTOM_TOKEN_ADDRESS, tokenAbi, adminWallet);
      console.log("token contract => ", tokenContract);

      const tokenAmount = parseFloat(parseFloat(amount) / parseFloat(exchangeRate))

      // const data = await tokenContract.approve(
      //   "0x217ED96849216Db023113E6c643f467d13e8fB80",
      //   toWei(amount)
      // );
      // console.log("data => ", data);
      const dorsenBalance = await tokenContract.balanceOf("0xee8570552f80C8Df99480911a09505128f990fCc");
      console.log("dorsen balance => ", BigInt(dorsenBalance).toString());
      
      // const tx = await tokenContract.transfer(userAddress, toWei(tokenAmount), {
      //   gasLimit: 100000
      // });
      // await tx.wait();

      toast.success("Custom Token transferred successfully!");
      return tx.hash;
    } catch (error) {
      console.error("Custom Token Transfer Error:", error);
      toast.error("Failed to transfer custom token!");
    }
  }
  const swapFunction = async (userAddress, usdtAmount, exchangeRate) => {
    try {
      // const usdtTx = await transferUSDTToAdmin(usdtAmount);
      // if (!usdtTx) throw new Error("USDT Transfer Failed");
      console.log("usdt amount => ", usdtAmount);
      console.log("exchange rate => ", exchangeRate);
      console.log("User address => ", userAddress);

      const tokenTx = await sendCustomTokenToUser(userAddress, usdtAmount, exchangeRate);
      if (!tokenTx) throw new Error("Custom Token Transfer Failed");

      toast.success("Swap completed successfully!");
    } catch (error) {
      console.error("Swap Error:", error);
      toast.error("Swap failed!");
    }
  }

  return (
    <SwapContext.Provider value={{ swapFunction, setExchangeRateAdmin, setDepositAddressAdmin, setDepositPrivetKeyAdmin, setWithdrawAddressAdmin, setWithdrawPrivetKeyAdmin, exchangeRateAdmin }}>
      {children}

    </SwapContext.Provider>
  )
}

export default ContextProvider