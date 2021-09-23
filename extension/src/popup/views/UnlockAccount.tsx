import React from "react";
import get from "lodash/get";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";

import { ROUTES } from "popup/constants/routes";
import { COLOR_PALETTE, FONT_WEIGHT } from "popup/constants/styles";

import { navigateTo, openTab } from "popup/helpers/navigate";
import { newTabHref } from "helpers/urls";

import { BasicButton } from "popup/basics/Buttons";
import {
  Form,
  SubmitButton,
  FormRow,
  ApiErrorMessage,
  TextField,
} from "popup/basics/Forms";
import { SubviewWrapper } from "popup/basics/AccountSubview";

import { Header } from "popup/components/Header";

import {
  confirmPassword,
  authErrorSelector,
} from "popup/ducks/accountServices";

import Wave from "popup/assets/wave.png";

const HeaderContainerEl = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 0 0.25rem 3rem;
  line-height: 1;
`;
const HeaderEl = styled.h1`
  display: inline-block;
  font-weight: ${FONT_WEIGHT.light};
  margin: 0;
`;

const HeaderTextContainerEl = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;

const ImportButtonEl = styled(BasicButton)`
  color: ${COLOR_PALETTE.primary};
`;
const UnorderedListEl = styled.ul`
  list-style-type: none;
  font-size: 0.8rem;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  padding-top: 0.25rem;
`;
const CustomFormTextFieldEl = styled(TextField)`
  padding-right: ${(props) => (props.error ? "6rem" : "2.2rem")};
`;
const ListItemEl = styled.li`
  color: ${COLOR_PALETTE.secondaryText};
  padding: 0.5rem 0;
  line-height: 1;
`;
const ButtonRowEl = styled.div`
  padding: 3.25rem 0 1.5rem;
`;
const WaveImgContainerEl = styled.div`
  position: relative;
  max-width: max-content;
  img {
    height: 4.0625rem;
  }
`;

export const UnlockAccount = () => {
  const location = useLocation();
  const from = get(location, "state.from.pathname", "") as ROUTES;
  const queryParams = get(location, "search", "");
  const destination = from || ROUTES.account;

  const dispatch = useDispatch();
  const authError = useSelector(authErrorSelector);

  interface FormValues {
    password: string;
  }
  const initialValues: FormValues = {
    password: "",
  };

  const handleSubmit = async (values: FormValues) => {
    const { password } = values;
    await dispatch(confirmPassword(password));
    navigateTo(destination, queryParams);
  };

  return (
    <>
      <Header />
      <SubviewWrapper>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ dirty, isSubmitting, isValid }) => (
            <Form>
              <HeaderContainerEl>
                <WaveImgContainerEl>
                  <img src={Wave} alt="Wave Illustration" />
                </WaveImgContainerEl>
                <HeaderTextContainerEl>
                  <HeaderEl>Welcome back!</HeaderEl>
                  <p>Log in to access your account</p>
                </HeaderTextContainerEl>
              </HeaderContainerEl>
              <FormRow>
                <CustomFormTextFieldEl
                  autoComplete="off"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  error={authError}
                />
              </FormRow>
              <ApiErrorMessage error={authError} />
              <ButtonRowEl>
                <SubmitButton
                  dirty={dirty}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                >
                  Log In
                </SubmitButton>
              </ButtonRowEl>
            </Form>
          )}
        </Formik>
        <UnorderedListEl>
          <ListItemEl>Want to use a different account?</ListItemEl>
          <ListItemEl>
            <ImportButtonEl
              onClick={() => {
                openTab(newTabHref(ROUTES.recoverAccount));
              }}
            >
              Import using backup phrase
            </ImportButtonEl>
          </ListItemEl>
        </UnorderedListEl>
      </SubviewWrapper>
    </>
  );
};
