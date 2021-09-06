import DigitalBitsSdk from "xdb-digitalbits-sdk";
import { NETWORKS, NETWORK_NAMES } from "../constants/digitalbits";

export interface NetworkDetails {
  isTestnet: boolean;
  network: string;
  networkName: string;
  otherNetworkName: string;
  networkUrl: string;
  networkPassphrase:
    | typeof DigitalBitsSdk.Networks.TESTNET
    | typeof DigitalBitsSdk.Networks.PUBLIC;
}

export const MAINNET_NETWORK_DETAILS = {
  isTestnet: false,
  network: NETWORKS.PUBLIC,
  networkName: NETWORK_NAMES.PUBNET,
  otherNetworkName: NETWORK_NAMES.TESTNET,
  networkUrl: "https://frontier.livenet.digitalbits.io",
  networkPassphrase: DigitalBitsSdk.Networks.PUBLIC,
} as NetworkDetails;

export const TESTNET_NETWORK_DETAILS = {
  isTestnet: true,
  network: NETWORKS.TESTNET,
  networkName: NETWORK_NAMES.TESTNET,
  otherNetworkName: NETWORK_NAMES.PUBNET,
  networkUrl: "https://frontier.testnet.digitalbits.io",
  networkPassphrase: DigitalBitsSdk.Networks.TESTNET,
} as NetworkDetails;

export const getNetworkDetails = (isTestnet: boolean) =>
  isTestnet ? { ...TESTNET_NETWORK_DETAILS } : { ...MAINNET_NETWORK_DETAILS };
