import React, { useState } from "react";
import styled from "styled-components";

import nftitemarrow from "popup/assets/nft-group-arrow.png";

import nftexample from "popup/assets/nftexample.png";

const NftsWrapper = styled.div`
  padding-left: 0.75rem;
`;

const NftsListWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  width: 380px;
`;

const NftIcon = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
`;

const NftItemArrow = styled.img`
  heigth: 6px;
  width: 10px;
  margin-left: 70px;
`;

const NftItem = styled.li`
  display: flex;
  align-items: center;
`;

const SendButton = styled.button`
  background: #000000;
  border-radius: 10px;
  color: #ffffff;
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  border: none;
  width: 168px;
  padding: 5px 0;
  margin-bottom: 20px;
`;

const NftPreview = styled.img`
  margin-bottom: 10px;
`;

const NftTitle = styled.p`
  margin-left: 15px;
`;

const NftItemWrapper = styled.div`
  border-bottom: 1px solid #d3d5da;
`;

interface NftDetailsProps {
  isDropdownOpen: boolean;
}

const NftDetails = styled.div`
  flex-direction: column;
  align-items: center;
  max-height: ${({ isDropdownOpen }: NftDetailsProps) =>
    isDropdownOpen ? `500px` : "0"};
  display: ${({ isDropdownOpen }: NftDetailsProps) =>
    isDropdownOpen ? `flex` : "none"};
  transition: max-height 0.3s ease-out;
`;

const NftItemView = ({ item }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <NftItemWrapper>
      <NftItem onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <NftIcon src={item.nftIcon} alt="Collection img" />
        <NftTitle>{item.nftTitle}</NftTitle>
        <NftItemArrow src={nftitemarrow} alt="Collection img" />
      </NftItem>
      <NftDetails isDropdownOpen={isDropdownOpen}>
        <NftPreview src={item.nftIcon} alt="nft" />
        <SendButton>Send</SendButton>
      </NftDetails>
    </NftItemWrapper>
  );
};

export const AccountNfts = () => {
  const nfts = [
    {
      nftTitle: "Bubble Blobby by Jason Ting",
      nftIcon: nftexample,
    },
    {
      nftTitle: "Bubble Blobby by Jason Ting",
      nftIcon: nftexample,
    },
  ];
  return (
    <NftsWrapper>
      <NftsListWrapper>
        {nfts.map((item) => (
          <NftItemView item={item} />
        ))}
      </NftsListWrapper>
    </NftsWrapper>
  );
};
