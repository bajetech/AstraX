import React, { useState } from "react";
import styled from "styled-components";
import { Form, SubmitButton } from "popup/basics/Forms";
import { Formik } from "formik";
import CheckMarkIcon from "popup/assets/check-mark-icon.png";
import { store } from "popup/App";
import { sendTransaction } from "popup/helpers/sendTransaction";

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

const TokenSelect = styled.select`
  grid-column-end: auto;
  max-width: 180px;
  height: 45px;
  border-radius: 25px;
  border: none;
  padding: 0 15px;
  &:focus {
    outline: none;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 10px;
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

interface Props {
  setIsSendTransaction: (arg: boolean) => void;
}

export const SendTransaction = ({ setIsSendTransaction }: Props) => {
  const sourceAccount = store.getState().auth.publicKey;
  const [isSubmited, setIsSubmited] = useState(false);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

  return isSubmited ? (
    <ConfirmationPageWrapper>
      <ConfirmationPageTitle>
        Done! <img src={CheckMarkIcon} alt="check mark" />
      </ConfirmationPageTitle>
      <StyledSubmitButton onClick={() => setIsSendTransaction(false)}>
        Go home
      </StyledSubmitButton>
      <ConfirmationPageLink>View on xdbExplorer</ConfirmationPageLink>
    </ConfirmationPageWrapper>
  ) : (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        sendTransaction(sourceAccount, destination, amount);
        setIsSubmited(true);
      }}
    >
      <Form>
        <InputWrapper>
          <span>To</span>
          <DestinationInput
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter DigitalBits address"
          />
        </InputWrapper>
        <InputWrapper>
          <span>Select token</span>
          <TokenSelect>
            <option value="XDB">XDB</option>
          </TokenSelect>
        </InputWrapper>
        <InputWrapper>
          <span>Amount</span>
          <DestinationInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </InputWrapper>
        <InputWrapper>
          <StyledSubmitButton onClick={() => setIsSendTransaction(false)}>
            Cancel
          </StyledSubmitButton>
          <StyledSubmitButton>Send</StyledSubmitButton>
        </InputWrapper>
      </Form>
    </Formik>
  );
};
