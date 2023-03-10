import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import WalletContextProvider from "@/components/WalletContextProvider";
import AppBar from "@/components/AppBar";
import PingButton from "@/components/PingButton";
import AppBody from "@/components/AppBody";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Wallet Adapter Example</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.App}>
          <AppBody />
        </div>
      </WalletContextProvider>
    </>
  );
}
