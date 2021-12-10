import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { COLOR_PALETTE, FONT_WEIGHT } from "popup/constants/styles";

import { BasicButton } from "popup/basics/Buttons";
import { ScrollingView } from "popup/basics/AccountSubview";

import { publicKeySelector } from "popup/ducks/accountServices";
import { settingsNetworkDetailsSelector } from "popup/ducks/settings";
import {
  getAccountDetails,
  getAssetIcons,
  retryAssetIcon,
} from "@shared/api/internal";

import {
  AccountDetailsInterface,
  AssetIcons,
  NFTInfo,
} from "@shared/api/types";

import nftexample from "popup/assets/nftexample.png";

import { AccountAssets } from "./AccountAssets";
import { AccountHistory } from "./AccountHistory";
import { AccountNfts } from "./AccountNfts";
import { NotFundedMessage } from "./NotFundedMessage";

const AccountHeaderEl = styled.section`
  align-items: center;
  border-bottom: 1px solid ${COLOR_PALETTE.greyFaded};
  display: flex;
`;

const AccountBodyEl = styled.section`
  ${ScrollingView}
`;

interface AccountToggleBtnElProps {
  isActive: boolean;
}

const AccountToggleBtnEl = styled(BasicButton)`
  border-bottom: 2px solid
    ${({ isActive }: AccountToggleBtnElProps) =>
      isActive ? COLOR_PALETTE.primary : COLOR_PALETTE.background};
  color: ${({ isActive }: AccountToggleBtnElProps) =>
    isActive ? COLOR_PALETTE.primary : COLOR_PALETTE.lightText};
  font-size: 1rem;
  font-weight: ${({ isActive }: AccountToggleBtnElProps) =>
    isActive ? FONT_WEIGHT.bold : FONT_WEIGHT.normal};
  margin: 0;
  padding: 0 0.9rem 1.25rem 0.9rem;
  width: 50%;

  &:hover {
    color: ${COLOR_PALETTE.primary};
  }
`;

enum accountDetailsTabsEnum {
  accountAssets = "ACCOUNT_ASSETS",
  history = "HISTORY",
  nfts = "NFTS",
}

const defaultAccountDetails = {
  balances: null,
  isFunded: null,
  operations: [],
} as AccountDetailsInterface;

export const AccountDetails = () => {
  const [accountDetailsTab, setAccountDetailsTab] = useState<
    accountDetailsTabsEnum
  >(accountDetailsTabsEnum.accountAssets);
  const [accountDetails, setAccountDetails] = useState(defaultAccountDetails);
  const [sortedBalances, setSortedBalances] = useState([] as Array<any>);
  const [sortedNFTs, setSortedNFTs] = useState<NFTInfo[]>([]);
  const [hasIconFetchRetried, setHasIconFetchRetried] = useState(false);
  const [assetIcons, setAssetIcons] = useState({} as AssetIcons);
  const [isAccountFriendbotFunded, setIsAccountFriendbotFunded] = useState(
    false,
  );
  const publicKey = useSelector(publicKeySelector);
  const networkDetails = useSelector(settingsNetworkDetailsSelector);

  const returnAccountDetailsBodyView = () => {
    if (accountDetailsTab === accountDetailsTabsEnum.accountAssets) {
      return (
        <AccountAssets
          sortedBalances={sortedBalances}
          assetIcons={assetIcons}
          retryAssetIconFetch={retryAssetIconFetch}
        />
      );
    }
    if (accountDetailsTab === accountDetailsTabsEnum.history) {
      return <AccountHistory publicKey={publicKey} operations={operations} />;
    }
    if (accountDetailsTab === accountDetailsTabsEnum.nfts) {
      return <AccountNfts nfts={sortedNFTs} />;
    }
    return null;
  };

  const { isFunded, balances, operations } = accountDetails;

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        console.log("Network details are: ", networkDetails);
        const res = await getAccountDetails({ publicKey, networkDetails });
        setAccountDetails(res);
      } catch (e) {
        console.error(e);
      }
    };

    if (networkDetails && networkDetails.networkName !== undefined) {
      fetchAccountDetails();
    }
  }, [publicKey, networkDetails, isAccountFriendbotFunded]);

  useEffect(() => {
    const collectionBalances = [] as Array<any>;
    const collectionNFTs: NFTInfo[] = [];
    if (!balances) return;

    // put XDB at the top of the balance list
    Object.entries(balances).forEach(([k, v], i) => {
      // Add uniq key for passing as a key prop for react performance
      const balanceWithKey = { uniqKey: k + i, ...v };
      if (k === "native") {
        collectionBalances.unshift(balanceWithKey);
      } else if (+v.total.toString() === 0.0000001) {
        collectionNFTs.push({
          uniqKey: k + i,
          nftTitle: v.token.code,
          nftIcon: nftexample,
        });
      } else {
        collectionBalances.push(balanceWithKey);
      }
    });
    setSortedBalances(collectionBalances);
    setSortedNFTs(collectionNFTs);

    // get each asset's icon
    const fetchAssetIcons = async () => {
      try {
        const res = await getAssetIcons({ balances, networkDetails });
        setAssetIcons(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAssetIcons();
  }, [balances, networkDetails]);

  const handleDetailToggle = (detailsTab: accountDetailsTabsEnum) => {
    setAccountDetailsTab(detailsTab);
  };

  /* if an image url 404's, this will try exactly once to rescrape the toml for a new url to cache */
  const retryAssetIconFetch = async ({
    key,
    code,
  }: {
    key: string;
    code: string;
  }) => {
    /* if we retried the toml and their link is still bad, just give up here */
    if (hasIconFetchRetried) return;
    try {
      const res = await retryAssetIcon({
        key,
        code,
        assetIcons,
        networkDetails,
      });
      setAssetIcons(res);
      setHasIconFetchRetried(true);
    } catch (e) {
      console.error(e);
    }
  };

  if (isFunded === null) {
    return null;
  }
  return isFunded ? (
    <>
      <AccountHeaderEl>
        <AccountToggleBtnEl
          isActive={accountDetailsTab === accountDetailsTabsEnum.accountAssets}
          onClick={() =>
            handleDetailToggle(accountDetailsTabsEnum.accountAssets)
          }
        >
          Account assets
        </AccountToggleBtnEl>
        <AccountToggleBtnEl
          isActive={accountDetailsTab === accountDetailsTabsEnum.nfts}
          onClick={() => handleDetailToggle(accountDetailsTabsEnum.nfts)}
        >
          NFTs
        </AccountToggleBtnEl>
        <AccountToggleBtnEl
          isActive={accountDetailsTab === accountDetailsTabsEnum.history}
          onClick={() => handleDetailToggle(accountDetailsTabsEnum.history)}
        >
          History
        </AccountToggleBtnEl>
      </AccountHeaderEl>
      <AccountBodyEl>{returnAccountDetailsBodyView()}</AccountBodyEl>
    </>
  ) : (
    <NotFundedMessage
      isTestnet={networkDetails.isTestnet}
      setIsAccountFriendbotFunded={setIsAccountFriendbotFunded}
      publicKey={publicKey}
    />
  );
};
