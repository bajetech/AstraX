import { submitTransaction } from "./utils/api/external";

export const signTransaction = (
  transactionXdr: string,
  network?: "PUBLIC" | "TESTNET",
) => submitTransaction(transactionXdr, network);
