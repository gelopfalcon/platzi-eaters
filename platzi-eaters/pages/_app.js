import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { ethers } from "ethers";


function MyApp({ Component, pageProps }) {
  const [walletAccount, setWalletAccount] = useState("");
  const [isConnectedToRinbeky, setConnectedToRinbeky] = useState(true);

  const checkIfMetaMaskIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Check if Metamask is installed.");
      } else {
        console.log("Connected ", ethereum);

        ethereum.on("chainChanged", function(networkId) {
          if(parseInt(networkId) !== 4) {
            setConnectedToRinbeky(false);
          } else {
            setConnectedToRinbeky(true);
          }
        });
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      //2
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      if (accounts.length != 0) {
        setWalletAccount(accounts[0]);
      } else {
        console.log("No authorized account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfMetaMaskIsConnected();
  }, []);

  const connectMetamask = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setWalletAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      
      {
        !isConnectedToRinbeky && (
          <div className={styles.container}> 
            <div className={styles.wrongNetwork}> 
              <h1>Red Equivocada</h1>
              <p> Por favor conectarse a la red Rinkeby en su MetaMask. Gracias :D </p> 
            </div>
          </div>
        )
      }

      {(!walletAccount && isConnectedToRinbeky) && (
        <div className={styles.container}>
          <button
            className={styles.eth_connect_wallet_button}
            onClick={connectMetamask}
          >
            Log in
          </button>
        </div>
      )}

      {(walletAccount && isConnectedToRinbeky) && (
        <div>
          <main>
            <nav className="border-b p-6">
              <p className="text-4xl font-bold">Platzi Eaters</p>
              <div className="flex mt-4">
                <Link href="/">
                  <a className="mr-4 text-green-500">Inicio</a>
                </Link>
                <Link href="/add-dish">
                  <a className="mr-6 text-green-500">Agregar platillos</a>
                </Link>
                <Link href="/my-dishes">
                  <a className="mr-6 text-green-500">Mis platillos</a>
                </Link>
              </div>
            </nav>
          </main>
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

export default MyApp;
