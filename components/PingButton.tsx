import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/PingButton.module.css";

const PingButton: FC = () => {
  const { connection } = useConnection();

  const { publicKey, sendTransaction, connected } = useWallet();
  const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
  const DATA_ACCOUNT_PUBKEY = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

  const onClick = () => {
    if (!connection || !publicKey) {
      return;
    }

    const programId = new web3.PublicKey(PROGRAM_ID);
    const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY);
    const transaction = new web3.Transaction();

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: programDataAccount,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId,
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(sig);
    });
  };

  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      {connected ? (
        <button className={styles.button}>Ping Message!</button>
      ) : (
        <h1>Please Connection to the Wallet to Enable the Ping Button</h1>
      )}
    </div>
  );
};
export default PingButton;
