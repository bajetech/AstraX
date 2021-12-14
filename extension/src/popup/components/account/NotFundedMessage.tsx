import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import styled from "styled-components";

import { SubmitButton } from "popup/basics/Forms";

import { fundAccount } from "popup/ducks/accountServices";

import { COLOR_PALETTE, ROUNDED_CORNERS } from "popup/constants/styles";

import rocketImg from "popup/assets/rocket.svg";

const NotFundedWrapperEl = styled.section`
  background: ${COLOR_PALETTE.white};
  border-radius: ${ROUNDED_CORNERS};
  margin: 0 1rem 1.2rem 1rem;
  padding: 1rem 1.25rem;
`;

const NotFundedCopyEl = styled.span`
  font-size: 0.875rem;
  line-height: 1.375rem;
  margin: 0;
  a {
    display: block;
    margin-top: 0.5rem;
  }
`;

const FriendBotCopyEl = styled(NotFundedCopyEl)`
  margin: 0.5rem 0;
  display: block;
`;

const NotFundedHeaderEl = styled.h3`
  align-items: center;
  color: ${COLOR_PALETTE.primary};
  display: flex;
  font-size: 1rem;
  img {
    width: 2rem;
    height: auto;
  }
`;

export const NotFundedMessage = ({
  isTestnet,
  publicKey,
  setIsAccountFriendbotFunded,
}: {
  isTestnet: boolean;
  publicKey: string;
  setIsAccountFriendbotFunded: (isAccountFriendbotFunded: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const handleFundAccount = async () => {
    await dispatch(fundAccount(publicKey));
    setIsAccountFriendbotFunded(true);
  };

  return (
    <>
      <NotFundedWrapperEl>
        <NotFundedHeaderEl>
          <img src={rocketImg} alt="rocket" />
          Activate your wallet to get started
        </NotFundedHeaderEl>
        <NotFundedCopyEl>
          To start using this account, fund it with at minimum of 20 XDB.{" "}
          <a
            href="https://astraxwallet.com/activate"
            rel="noreferrer"
            target="_blank"
          >
            Learn how to activate your wallet.
          </a>
        </NotFundedCopyEl>
        {isTestnet ? (
          <FriendBotCopyEl>
            You can fund this account on the test network using the Friendbot
            tool. Friendbot is a Frontier API endpoint that will fund an account
            with 10,000 XDB on the test network.
          </FriendBotCopyEl>
        ) : null}

        {/* {isTestnet ? null : (
          <NotFundedCopyEl>
            <a
              href="https://cryptobuyingtips.com/guides/how-to-buy-digitalbits-xdb"
              rel="noreferrer"
              target="_blank"
            >
              See how and where you can buy XDB
            </a>
          </NotFundedCopyEl>
        )} */}
      </NotFundedWrapperEl>
      {isTestnet ? (
        <Formik initialValues={{}} onSubmit={handleFundAccount}>
          {({ isSubmitting }) => (
            <Form>
              <SubmitButton isSubmitting={isSubmitting}>
                Fund with Friendbot
              </SubmitButton>
            </Form>
          )}
        </Formik>
      ) : null}
    </>
  );
};
