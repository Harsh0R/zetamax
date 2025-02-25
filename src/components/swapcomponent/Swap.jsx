import { useContext, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { SwapContext } from "../../context/context";
import { usdt, zetamax1 } from "../../assets/imgs";

const Swap = () => {
  const { swapFunction } = useContext(SwapContext);
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const exchangeRate = 5;

  const swapFunc = () => {
    swapFunction(address , amount , exchangeRate);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">

      <div className="bg-gray-800 p-2 rounded-2xl shadow-lg w-96 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={usdt} alt="Dorsen" className="w-15 h-15" />
            <span className="text-lg font-semibold">USDT</span>
          </div>
          <div className="weight-bold text-lg" > → </div>
          <div className="flex items-center gap-2">
            <img src={zetamax1} alt="Dorsen" className="w-15 h-15" />
            <span className="text-lg font-semibold">Zetamax</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400 text-sm">Send</label>
          <input
            type="number"
            placeholder="0.0"
            className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="text-gray-400 text-sm">USDT</span>
        </div>

        <div className="mb-4">
          <label className="text-gray-400 text-sm">Receive</label>
          <input
            type="text"
            value={amount ? (amount / exchangeRate).toFixed(5) : "0.00000"}
            disabled
            className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
          />
          <span className="text-gray-400 text-sm">Zetamax</span>
        </div>

        <p className="text-gray-400 text-sm text-center mb-4">1 zetamax = {exchangeRate} USDT</p>

        <button className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-semibold" onClick={swapFunc}>
          Buy
        </button>

        <div className="mt-4 bg-gray-700 p-3 rounded-lg flex items-center justify-center text-gray-400">
          {isConnected ? (
            <>
              <span>{address.slice(0, 6) + "..." + address.slice(-4)}</span>
            </>
          ) : (
            <div className="flex items-center gap-2">connect wallet first</div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Swap;
