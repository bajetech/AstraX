import digitalbitsLogo from "popup/assets/digitalbits-logo.png";
import digitalbitsLaboratoryLogo from "popup/assets/digitalbits-laboratory-logo.svg";
import { RetinaImg } from "popup/basics/Images";
import { COLOR_PALETTE, FONT_WEIGHT } from "popup/constants/styles";
import React from "react";
import styled from "styled-components";

const FooterEl = styled.footer`
  box-sizing: border-box;
  background: ${COLOR_PALETTE.white};
  height: 7.75rem;
  padding: 0.9375rem 2rem;
  text-align: center;
`;

const FooterHeaderEl = styled.h1`
  color: ${COLOR_PALETTE.secondaryText};
  font-size: 0.8125rem;
  font-weight: ${FONT_WEIGHT.light};
  margin: 0;
`;

const FooterListEl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 1rem 0;
`;

const FooterListItemEl = styled.li`
  font-size: 0.75rem;
  display: inline-block;
  display: flex;
  align-items: center;
  img {
    width: 150px;
    height: auto;
  }
`;

export const Footer = () => (
  <FooterEl>
    <FooterHeaderEl>Use AstraX with</FooterHeaderEl>
    <FooterListEl>
      <FooterListItemEl>
        <a href="http://xdbexplorer.com/" target="_blank" rel="noreferrer">
          <RetinaImg
            retina={digitalbitsLogo}
            src={digitalbitsLogo}
            alt="Digitalbits Account Viewer logo"
          />
        </a>
      </FooterListItemEl>
      <FooterListItemEl>
        <a
          href="https://laboratory.livenet.digitalbits.io/#?network=test"
          target="_blank"
          rel="noreferrer"
        >
          <RetinaImg
            retina={digitalbitsLaboratoryLogo}
            src={digitalbitsLaboratoryLogo}
            alt="Digitalbits Laboratory logo"
          />
        </a>
      </FooterListItemEl>
      {/* <FooterListItemEl>
        <a href="https://stellarterm.com" target="_blank" rel="noreferrer">
          <RetinaImg
            retina={digitalbitsLogo}
            src={digitalbitsLogo}
            alt="StellarTerm logo"
          />
        </a>
      </FooterListItemEl> */}
    </FooterListEl>
  </FooterEl>
);
