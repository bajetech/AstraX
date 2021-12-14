import React, { useState } from "react";
import styled from "styled-components";
import { Form, SubmitButton } from "popup/basics/Forms";
import { Formik } from "formik";
import CheckMarkIcon from "popup/assets/check-mark-icon.png";
import CloseIcon from "popup/assets/close-icon.png";
import { store } from "popup/App";
import { useSelector } from "react-redux";
import { settingsNetworkDetailsSelector } from "popup/ducks/settings";
import { changeTrust } from "popup/helpers/changeTrust";
import { ROUTES } from "popup/constants/routes";
import { Link } from "react-router-dom";

const DestinationInput = styled.input`
  grid-column-end: auto;
  max-width: 180px;
  height: 45px;
  border-radius: 25px;
  border: none;
  font-size: 11px;
  text-align: left;
  padding-left: 15px;
  &:focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 10px 40px;
  align-items: center;
`;

const StyledSubmitButton = styled(SubmitButton)`
  background: #3803d4;
  width: 120px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  ${({ disabled }) =>
    disabled &&
    `
    background: #808080;
    &:focus {
      box-shadow: none
    }
    &:hover {
      background: #808080;
    }
  `}
`;

const StyledCancelButton = styled(Link)`
  background: #3803d4;
  width: 120px;
  height: 45px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 1.45rem;
  border-radius: 1.25rem;
  color: #fff;
  border: none;
  -webkit-appearance: none;
  transition: all 0.15s ease-in-out;
  white-space: nowrap;
  &:hover {
    background: linear-gradient(180deg, #443bdb 0%, #2521c3 100%);
  }
`;

const ConfirmationPageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  justify-content: center;
`;

const ConfirmationPageTitle = styled.div`
  font-size: 36px;
  margin-bottom: 60px;
  text-align: center;
  img {
    height: 42px;
    width: auto;
  }
`;

const ConfirmationPageLink = styled.a`
  color: #391eda;
`;

const ErrorBox = styled.div`
  color: red;
`;

const LoadingBox = styled.div`
  color: #000000;
  text-align: center;
`;

const CloseButton = styled(Link)`
  img {
    margin-right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const SendTransactionWrapper = styled.div`
  margin: 30px;
`;

export const AddCustomAsset = () => {
  const networkDetails = useSelector(settingsNetworkDetailsSelector);
  const sourceAccount = store.getState().auth.publicKey;
  const currentAccountIndex = store
    .getState()
    .auth.allAccounts.findIndex(
      (i) => i.publicKey === store.getState().auth.publicKey,
    );
  const [isSubmited, setIsSubmited] = useState(false);
  const [issuer, setIssuer] = useState("");
  const [asset, setAsset] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return isSubmited ? (
    <ConfirmationPageWrapper>
      <ConfirmationPageTitle>
        Done! <img src={CheckMarkIcon} alt="check mark" />
      </ConfirmationPageTitle>
      <StyledCancelButton to={ROUTES.account}>Go home</StyledCancelButton>
      <ConfirmationPageLink>View on xdbExplorer</ConfirmationPageLink>
    </ConfirmationPageWrapper>
  ) : (
    <SendTransactionWrapper>
      <CloseButton to={ROUTES.account}>
        <img src={CloseIcon} alt="close button" />
      </CloseButton>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          changeTrust(
            sourceAccount,
            asset,
            issuer,
            setIsSubmited,
            setError,
            networkDetails,
            currentAccountIndex,
            setLoading,
          );
        }}
      >
        <Form>
          <InputWrapper>
            <span>Issuer Account</span>
            <DestinationInput
              value={issuer}
              onChange={(e) => {
                setIssuer(e.target.value);
                setError("");
              }}
              placeholder="Enter Issuer address"
            />
          </InputWrapper>
          <InputWrapper>
            <span>Asset</span>
            <DestinationInput
              value={asset}
              onChange={(e) => {
                setAsset(e.target.value);
                setError("");
              }}
              placeholder="Enter asset code"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledCancelButton to={ROUTES.account}>Cancel</StyledCancelButton>
            <StyledSubmitButton disabled={loading}>Send</StyledSubmitButton>
          </InputWrapper>
          <ErrorBox>{error}</ErrorBox>
          <LoadingBox>{loading ? "Loading..." : ""}</LoadingBox>
        </Form>
      </Formik>
    </SendTransactionWrapper>
  );
};
