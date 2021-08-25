import { Formik } from "formik";
import { emitMetric } from "helpers/metrics";
import { AppDispatch } from "popup/App";
import IconOrangeLock from "popup/assets/icon-orange-lock.svg";
import { SubviewHeader, SubviewWrapper } from "popup/basics/AccountSubview";
import {
    ApiErrorMessage, CheckboxField, Error,
    Form,
    FormRow, SubmitButton, TextField
} from "popup/basics/Forms";
import { WarningMessage } from "popup/components/WarningMessage";
import { METRIC_NAMES } from "popup/constants/metricsNames";
import { ROUTES } from "popup/constants/routes";
import {
    authErrorSelector, clearApiError,
    importAccount
} from "popup/ducks/accountServices";
import { navigateTo } from "popup/helpers/navigate";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bool as YupBool, object as YupObject, string as YupString } from "yup";






export const ImportAccount = () => {
  interface FormValues {
    password: string;
    privateKey: string;
  }

  const initialValues: FormValues = {
    password: "",
    privateKey: "",
  };

  const ImportAccountSchema = YupObject().shape({
    privateKey: YupString().required(),
    password: YupString().required(),
    authorization: YupBool().required(),
  });

  const dispatch: AppDispatch = useDispatch();
  const authError = useSelector(authErrorSelector);

  const handleSubmit = async (values: FormValues) => {
    const { password, privateKey } = values;

    const res = await dispatch(importAccount({ password, privateKey }));

    if (importAccount.fulfilled.match(res)) {
      emitMetric(METRIC_NAMES.accountScreenImportAccount, {
        number_of_accounts: res.payload.allAccounts.length,
      });
      navigateTo(ROUTES.account);
    }
  };

  const clearImportAccountError = (e: React.ChangeEvent<any>) => {
    if (authError && e.target.value === "") {
      dispatch(clearApiError());
    }
  };

  return (
    <>
      <SubviewWrapper>
        <SubviewHeader headerText="Import Stellar secret key" />
        <WarningMessage
          icon={IconOrangeLock}
          subheader="Read before importing your key"
        >
          <ul>
            <li>
              AstraX <strong>can’t recover</strong> your imported secret key
              using your backup phrase. Storing your secret key is your
              reponsibility
            </li>

            <li>
              AstraX <strong>will never ask</strong> for your secret key
              outside of the extension
            </li>
          </ul>
        </WarningMessage>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ImportAccountSchema}
        >
          {({ dirty, handleChange, isSubmitting, isValid }) => (
            <Form>
              <FormRow>
                <TextField
                  autoComplete="off"
                  name="privateKey"
                  onChange={(e: React.ChangeEvent) => {
                    clearImportAccountError(e);
                    handleChange(e);
                  }}
                  placeholder="Your Stellar secret key"
                  type="password"
                />
                <Error name="privateKey" />
              </FormRow>
              <FormRow>
                <TextField
                  autoComplete="off"
                  name="password"
                  onChange={(e: React.ChangeEvent) => {
                    clearImportAccountError(e);
                    handleChange(e);
                  }}
                  placeholder="Enter password"
                  type="password"
                />
                <Error name="password" />
                <ApiErrorMessage error={authError}></ApiErrorMessage>
              </FormRow>
              <FormRow>
                <CheckboxField
                  label="I’m aware AstraX can’t recover the imported  secret key"
                  name="authorization"
                />
                <Error name="authorization" />
              </FormRow>
              <FormRow>
                <SubmitButton
                  dirty={dirty}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                >
                  Import Secret Key
                </SubmitButton>
              </FormRow>
            </Form>
          )}
        </Formik>
      </SubviewWrapper>
    </>
  );
};
