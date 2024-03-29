import { HEADER_HEIGHT } from "constants/dimensions";
import RockEmoji from "popup/assets/rock-emoji.png";
import Wave from "popup/assets/wave.png";
import { FullscreenStyle } from "popup/components/FullscreenStyle";
import { Header } from "popup/components/Header";
import { ROUTES } from "popup/constants/routes";
import { COLOR_PALETTE } from "popup/constants/styles";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BoxEl = styled.div`
  position: relative;
  width: 22.75rem;
  height: 17.62rem;
  padding: 2.2rem 2.3rem;
  border-radius: 1.875rem;
  color: ${COLOR_PALETTE.white};
`;

const CreateBoxEl = styled(BoxEl)`
  background: ${COLOR_PALETTE.primaryGradient};
  color: ${COLOR_PALETTE.white};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const ImportBoxEl = styled(BoxEl)`
  border: 1px solid ${COLOR_PALETTE.primary};
  color: #000000;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const LargeHeadingEl = styled.div`
  color: ${COLOR_PALETTE.text};
  font-size: 2.4rem;
  font-weight: 200;
  line-height: 1.5;
  margin-bottom: 2.5rem;

  strong {
    color: ${COLOR_PALETTE.primary};
    background: ${COLOR_PALETTE.darkPrimaryTextGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeadingEl = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem;
  margin: 0.75rem 0;
`;

const IlloContainerEl = styled.span`
  img {
    height: 2rem;
    margin-right: 5px;
  }
`;

const LinkButtonWrapperEl = styled.div`
  text-align: center;
`;

const LinkButtonEl = styled(Link)`
  border-radius: 1rem;
  color: ${COLOR_PALETTE.white};
  display: inline-block;
  font-weight: 800;
  margin: 3.4rem auto 0;
  padding: 1.25rem 2rem;
  text-align: center;
  text-decoration: none;
`;

const CreateButtonEl = styled(LinkButtonEl)`
  background: ${COLOR_PALETTE.secondary};
`;

const ImportButtonEl = styled(LinkButtonEl)`
  background: ${COLOR_PALETTE.primaryGradient};
`;

const ColumnScreenEl = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  max-width: 49rem;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  width: 100%;
  margin: auto;
`;

const RowScreenEl = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HalfScreenEl = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
`;

export const Welcome = () => (
  <>
    <FullscreenStyle />
    <Header />
    <ColumnScreenEl>
      <RowScreenEl>
        <LargeHeadingEl>Get Started</LargeHeadingEl>
      </RowScreenEl>
      <RowScreenEl>
        <HalfScreenEl>
          <CreateBoxEl>
            <IlloContainerEl>
              <img src={Wave} alt="Create Wallet Illustration" />
            </IlloContainerEl>
            <HeadingEl>I’m new here</HeadingEl>
            <p>I’m going to need a seed phrase</p>
            <LinkButtonWrapperEl>
              <CreateButtonEl to={ROUTES.accountCreator}>
                Create wallet
              </CreateButtonEl>
            </LinkButtonWrapperEl>
          </CreateBoxEl>
        </HalfScreenEl>
        <HalfScreenEl>
          <ImportBoxEl>
            <IlloContainerEl>
              <img src={RockEmoji} alt="Import Wallet Illustration" />
            </IlloContainerEl>
            <HeadingEl>I’ve done this before</HeadingEl>
            <p>I have my 12 word seed phrase</p>
            <LinkButtonWrapperEl>
              <ImportButtonEl to={ROUTES.recoverAccount}>
                Import wallet
              </ImportButtonEl>
            </LinkButtonWrapperEl>
          </ImportBoxEl>
        </HalfScreenEl>
      </RowScreenEl>
    </ColumnScreenEl>
  </>
);
