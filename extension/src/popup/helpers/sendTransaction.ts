import { getMnemonicPhrase } from "@shared/api/internal";
import DigitalBitsHDWallet from "@bajetech/digitalbits-hd-wallet";
import DigitalBitsSdk from "xdb-digitalbits-sdk";

export const sendTransaction = async (
  sourceAccount: string,
  destination: string,
  amount: string,
  setIsSubmited: (arg: boolean) => void,
  setError: (arg: string) => void,
  networkDetails: any,
  currentAccountIndex: number,
  setLoading: (arg: boolean) => void,
) => {
  try {
    setLoading(true);
    const server = new DigitalBitsSdk.Server(networkDetails.networkUrl);
    let res = { mnemonicPhrase: "" };
    res = await getMnemonicPhrase();
    const { mnemonicPhrase: fetchedMnemonicPhrase } = res;
    const wallet = DigitalBitsHDWallet.fromMnemonic(fetchedMnemonicPhrase);
    const keyPair = {
      publicKey: wallet.getPublicKey(currentAccountIndex),
      privateKey: wallet.getSecret(currentAccountIndex),
    };
    const account = await server.loadAccount(sourceAccount);
    const fee = await server.fetchBaseFee();

    const transaction = new DigitalBitsSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: networkDetails.networkPassphrase,
    })
      .addOperation(
        // this operation funds the new account with XDB
        DigitalBitsSdk.Operation.payment({
          destination,
          asset: DigitalBitsSdk.Asset.native(),
          amount,
        }),
      )
      .setTimeout(30)
      .build();
    // sign the transaction

    transaction.sign(DigitalBitsSdk.Keypair.fromSecret(keyPair.privateKey));
    const transactionResult = await server.submitTransaction(transaction);
    console.log(transactionResult);
    setIsSubmited(true);
    setLoading(false);
  } catch (err: any) {
    setLoading(false);
    console.error(err);
    setError(
      "An error occurred, try to change transaction or try again later.",
    );
  }
};
