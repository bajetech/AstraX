import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { object as YupObject } from "yup";

import { HEADER_HEIGHT } from "constants/dimensions";

import { ROUTES } from "popup/constants/routes";

import { navigateTo } from "popup/helpers/navigate";
import {
  password as passwordValidator,
  confirmPassword as confirmPasswordValidator,
  termsOfUse as termsofUseValidator,
  mnemonicPhrase as mnemonicPhraseValidator,
} from "popup/helpers/validators";
import {
  clearApiError,
  authErrorSelector,
  publicKeySelector,
  recoverAccount,
} from "popup/ducks/accountServices";

import {
  ApiErrorMessage,
  Error,
  FormRow,
  CheckboxField,
  TextField,
  SubmitButton,
  Form,
} from "popup/basics/Forms";

import { Header } from "popup/components/Header";
import { Onboarding, HalfScreen } from "popup/components/Onboarding";
import { PasswordRequirements } from "popup/components/PasswordRequirements";

import LockAndKeyIcon from "popup/assets/lock-and-key.png";
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from "constants/misc";

const HalfScreenEl = styled(HalfScreen)`
  height: 33rem;
`;
const FullHeightFormEl = styled(Form)`
  height: calc(100vh - ${HEADER_HEIGHT}px);

  section {
    & > * {
      flex: 0 1 6.25rem;
    }
  }
`;

const IconImgEl = styled.img`
  height: 7.5rem;
`;

const IconEl = () => <IconImgEl src={LockAndKeyIcon} alt="Import wallet" />;

export const RecoverAccount = () => {
  const publicKey = useSelector(publicKeySelector);
  const authError = useSelector(authErrorSelector);

  interface FormValues {
    password: string;
    confirmPassword: string;
    mnemonicPhrase: string;
    termsOfUse: boolean;
  }

  const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
    mnemonicPhrase: "",
    termsOfUse: false,
  };

  const RecoverAccountSchema = YupObject().shape({
    mnemonicPhrase: mnemonicPhraseValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
    termsOfUse: termsofUseValidator,
  });

  const dispatch = useDispatch();

  const handleSubmit = async (values: FormValues) => {
    const { password, mnemonicPhrase } = values;

    await dispatch(
      recoverAccount({
        password,
        mnemonicPhrase: mnemonicPhrase.trim(),
      }),
    );
  };

  useEffect(() => {
    if (publicKey) {
      navigateTo(ROUTES.recoverAccountSuccess);
      window.close();
    }
  }, [publicKey]);

  const clearMnemonicPhraseError = (e: React.ChangeEvent<any>) => {
    // TODO: This pattern could be reused if we run into more instances of needing to clear an API error

    if (authError && e.target.value === "") {
      dispatch(clearApiError());
    }
  };

  return (
    <>
      <Header />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RecoverAccountSchema}
      >
        {({ dirty, handleChange, isSubmitting, isValid }) => (
          <FullHeightFormEl>
            <Onboarding
              header="Import wallet from backup phrase"
              icon={<IconEl />}
              isMaxHeaderLength
              goBack={() => navigateTo(ROUTES.welcome)}
            >
              <>
                <FormRow>
                  <TextField
                    component="textarea"
                    name="mnemonicPhrase"
                    onChange={(e: React.ChangeEvent) => {
                      clearMnemonicPhraseError(e);
                      handleChange(e);
                    }}
                    placeholder="Enter your 12 word phrase to restore your wallet"
                  />
                  <Error name="mnemonicPhrase" />
                  <ApiErrorMessage error={authError}></ApiErrorMessage>
                </FormRow>
                <HalfScreenEl>
                  <FormRow>
                    <TextField
                      autoComplete="off"
                      name="password"
                      placeholder="Set new password"
                      type="password"
                    />
                    <Error name="password" />
                  </FormRow>
                  <FormRow>
                    <TextField
                      autoComplete="off"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      type="password"
                    />
                    <Error name="confirmPassword" />
                  </FormRow>
                  <PasswordRequirements />
                  <FormRow>
                    <CheckboxField
                      label={
                        <span>
                          I have read and agree to the{" "}
                          <a
                            href={TERMS_OF_USE_URL}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Terms of Use
                          </a>{" "}
                          and{" "}
                          <a
                            href={PRIVACY_POLICY_URL}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      }
                      name="termsOfUse"
                    />
                    <Error name="termsOfUse" />
                  </FormRow>
                  <FormRow>
                    <SubmitButton
                      dirty={dirty}
                      isSubmitting={isSubmitting}
                      isValid={isValid}
                    >
                      Import
                    </SubmitButton>
                  </FormRow>
                </HalfScreenEl>
              </>
            </Onboarding>
          </FullHeightFormEl>
        )}
      </Formik>
    </>
  );
};
