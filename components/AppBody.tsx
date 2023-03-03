import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/AppBody.module.css";

const AppBody: FC = () => {
  const { connection } = useConnection();

  const { publicKey, sendTransaction, connected } = useWallet();
  const [toaddress, setToaddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [sol, setSol] = useState("");
  const [signature, setSignature] = useState("");

  useEffect(() => {
    if (!connection || !publicKey) return;
    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info ? info.lamports : 0);
    });
  }, [connection, publicKey, signature]);

  const onClick = () => {
    if (!connection || !publicKey) {
      return;
    }

    const transaction = new web3.Transaction();
    const toPublicKey = new web3.PublicKey(toaddress);
    const amount = parseInt(sol) * web3.LAMPORTS_PER_SOL;

    const instruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: toPublicKey,
      lamports: amount,
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(sig);
      setSignature(sig);
    });
  };

  return (
    <div className={styles.AppBody}>
      <h1>Balace: {balance / web3.LAMPORTS_PER_SOL} sol</h1>
      <h1>Account to Send Sol</h1>
      <input
        type="text"
        onChange={(e) => setToaddress(e.target.value)}
        placeholder="Enter Address to send Sol"
      />
      <h1>Amount of Sol to send to above Account</h1>
      <input
        type="text"
        onChange={(e) => setSol(e.target.value)}
        placeholder="Enter amount of Sol you are willing to send"
      />
      <div className={styles.buttonContainer} onClick={onClick}>
        {connected ? (
          <button className={styles.button}>Send</button>
        ) : (
          <h1>Please Connection to the Wallet to Enable the Send Button</h1>
        )}
      </div>
    </div>
  );
};
export default AppBody;
