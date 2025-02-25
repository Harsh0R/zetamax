import React, { useContext, useState } from "react";
import { SwapContext } from "../../context/context";

const Admin = () => {
  const [exchangeRate, setExchangeRate] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [depositPrivetKey, setDepositPrivetKey] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawPrivetKey, setWithdrawPrivetKey] = useState("");
  const { setDepositAddressAdmin, setDepositPrivetKeyAdmin, setWithdrawAddressAdmin, setWithdrawPrivetKeyAdmin, setExchangeRateAdmin } = useContext(SwapContext);

  const handleSave = () => {

    setDepositAddressAdmin(depositAddress);
    setDepositPrivetKeyAdmin(depositPrivetKey);
    setWithdrawAddressAdmin(withdrawAddress);
    setWithdrawPrivetKeyAdmin(withdrawPrivetKey);
    setExchangeRateAdmin(exchangeRate);

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Admin Panel</h2>

        <label className="block mb-2 text-sm">Exchange Rate (USDT → Token) :</label>
        <input
          type="number"
          value={exchangeRate}
          onChange={(e) => setExchangeRate(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded bg-gray-700 border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="e.g. 1 USDT = 8 Tokens"
        />

        <label className="block mb-2 text-sm">Admin deposit Address :</label>
        <input
          type="text"
          value={depositAddress}
          onChange={(e) => setDepositAddress(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded bg-gray-700 border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter BSC deposit Address"
        />

        <label className="block mb-2 text-sm">Admin deposit Private Key :</label>
        <input
          type="text"
          value={depositPrivetKey}
          onChange={(e) => setDepositPrivetKey(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded bg-gray-700 border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter BSC deposit Private Key"
        />

        <label className="block mb-2 text-sm">Admin Withdraw Address :</label>
        <input
          type="text"
          value={withdrawAddress}
          onChange={(e) => setWithdrawAddress(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded bg-gray-700 border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter BSC deposit Address"
        />

        <label className="block mb-2 text-sm">Admin deposit Private Key :</label>
        <input
          type="text"
          value={withdrawPrivetKey}
          onChange={(e) => setWithdrawPrivetKey(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded bg-gray-700 border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter BSC deposit Private Key"
        />

        <button
          onClick={handleSave}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition duration-200"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Admin;
