import BigNumber from "bignumber.js";
import { AssetType, Frontier } from "xdb-digitalbits-sdk";
import { SERVICE_TYPES, EXTERNAL_SERVICE_TYPES } from "../constants/services";
import { APPLICATION_STATE } from "../constants/applicationState";
import { NetworkDetails } from "../helpers/digitalbits";

/*
 * Let's copy over types we need from '@bajetech/digitalbits-wallet-sdk' instead
 * of importing the package itself. This let's us easily avoid a circular
 * dependency since @bajetech/digitalbits-wallet-sdk needs to import
 * @bajetech/astrax-api.
 */
interface Issuer {
  key: string;
  name?: string;
  url?: string;
  hostName?: string;
}

interface NativeToken {
  type: AssetType;
  code: string;
}

interface AssetToken {
  type: AssetType;
  code: string;
  issuer: Issuer;
  anchorAsset?: string;
  numAccounts?: BigNumber;
  amount?: BigNumber;
  bidCount?: BigNumber;
  askCount?: BigNumber;
  spread?: BigNumber;
}

type Token = NativeToken | AssetToken;

interface Balance {
  token: Token;

  // for non-native tokens, this should be total - sellingLiabilities
  // for native, it should also subtract the minimumBalance
  available: BigNumber;
  total: BigNumber;
  buyingLiabilities: BigNumber;
  sellingLiabilities: BigNumber;
}

interface AssetBalance extends Balance {
  token: AssetToken;
  sponsor?: string;
}

interface NativeBalance extends Balance {
  token: NativeToken;
  minimumBalance: BigNumber;
}

interface BalanceMap {
  [key: string]: AssetBalance | NativeBalance;
  native: NativeBalance;
}

export interface Response {
  error: string;
  messagedId: number;
  applicationState: APPLICATION_STATE;
  publicKey: string;
  privateKey: string;
  hasPrivateKey: boolean;
  mnemonicPhrase: string;
  isCorrectPhrase: boolean;
  confirmedPassword: boolean;
  password: string;
  mnemonicPhraseToConfirm: string;
  recoverMnemonic: string;
  transaction: {
    sign: (sourceKeys: {}) => void;
  };
  signedTransaction: string;
  source: string;
  type: SERVICE_TYPES;
  url: string;
  isDataSharingAllowed: boolean;
  isTestnet: boolean;
  isMemoValidationEnabled: boolean;
  isSafetyValidationEnabled: boolean;
  networkDetails: NetworkDetails;
  allAccounts: Array<Account>;
  accountName: string;
  assetCode: string;
  iconUrl: string;
  network: string;
}

export interface ExternalRequest {
  transactionXdr: string;
  network: string;
  type: EXTERNAL_SERVICE_TYPES;
}

export interface Account {
  publicKey: string;
  name: string;
  imported: boolean;
}

export interface Settings {
  isDataSharingAllowed: boolean;
  networkDetails: NetworkDetails;
  isMemoValidationEnabled: boolean;
  isSafetyValidationEnabled: boolean;
}

export interface AssetIcons {
  [code: string]: string;
}

export type Balances = BalanceMap | null;

/* eslint-disable camelcase */
export type FrontierOperation = Frontier.PaymentOperationResponse & {
  transaction_attr: Frontier.TransactionResponse;
};
/* eslint-enable camelcase */

export interface AccountDetailsInterface {
  balances: Balances;
  isFunded: boolean | null;
  operations: Array<FrontierOperation> | [];
}

declare global {
  interface Window {
    astrax: boolean;
    astraxApi: { [key: string]: any };
  }
}
