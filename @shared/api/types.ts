import { Frontier } from "xdb-digitalbits-sdk";
import { Types } from "@stellar/wallet-sdk";

import { SERVICE_TYPES, EXTERNAL_SERVICE_TYPES } from "../constants/services";
import { APPLICATION_STATE } from "../constants/applicationState";
import { NetworkDetails } from "../helpers/digitalbits";

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

export type Balances = Types.BalanceMap | null;

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
