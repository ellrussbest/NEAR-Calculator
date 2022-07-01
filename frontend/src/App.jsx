import "./App.css";
import Calculator from "./Calculator";
import Cover from "./Cover";
import { login, logout as destroy, accountBalance } from "./utils/near";
import coverImg from "./assets/img/main.png";
import Navbar from "./Navbar";
import { useState, useEffect, useCallback } from "react";

function App() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      {account.accountId ? <>
        <Navbar 
          address={account.accountId}
          amount={balance}
          symbol="NEAR"
          destroy={destroy}
        />
        <Calculator />
        </> : (
        <Cover 
          name="NEAR-Calculator Using Bodmas"
          login={login}
          coverImg={coverImg}
        />
      )}
    </>
  );
}

export default App;