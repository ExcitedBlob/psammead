import React from 'react';
import styled from '@emotion/styled';
import { shape, string, node, bool, oneOf } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { C_WHITE, C_EBON } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_SEXT,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getPica } from '@bbc/gel-foundations/typography';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { NAV_BAR_TOP_BOTTOM_SPACING } from './DropdownNavigation';

const SPACING_AROUND_NAV_ITEMS = `${NAV_BAR_TOP_BOTTOM_SPACING}rem`; // 12px
const CURRENT_ITEM_HOVER_BORDER = '0.3125rem'; // 5px

/* White with 30% transparency over #B80000 */
const BORDER_COLOR = '#eab3b3';

const NavWrapper = styled.div`
  position: relative;
  max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  margin: 0 auto;
`;

const StyledUnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    overflow: hidden;
  }
`;

const ListItemBorder = `
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledLink = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => getSansRegular(service)};
  ${({ brandForegroundColour }) => `color: ${brandForegroundColour};`}
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  padding: ${SPACING_AROUND_NAV_ITEMS};

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding: ${SPACING_AROUND_NAV_ITEMS} ${GEL_SPACING};
  }

  &:hover::after {
    ${ListItemBorder}
    ${({ brandHighlightColour }) =>
      `border-bottom: ${GEL_SPACING_HLF} solid ${brandHighlightColour};`}
    ${({ currentLink, brandHighlightColour }) =>
      currentLink &&
      `
        border-bottom: ${CURRENT_ITEM_HOVER_BORDER} solid ${brandHighlightColour};
      `}
  }

  &:focus::after {
    ${ListItemBorder}
    ${({ brandHighlightColour }) =>
      `border-bottom: ${GEL_SPACING_HLF} solid ${brandHighlightColour};`}
    top: 0;
    ${({ brandHighlightColour }) =>
      `border: ${GEL_SPACING_HLF} solid ${brandHighlightColour};`}
  }
`;

const StyledListItem = styled.li`
  display: inline-block;
  position: relative;
  z-index: 2;

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    &:last-child {
      ${({ dir }) => `
        margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING_SEXT}; 
      `}
    }
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    /* Trick to display a border between the list items when it breaks into multiple lines, which takes the full width */
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
      border-bottom: 0.0625rem solid ${BORDER_COLOR};
      z-index: -1;
    }
  }
`;

const StyledSpan = styled.span`
  &::after {
    ${ListItemBorder}
    ${({ brandHighlightColour }) =>
      `border-bottom: ${GEL_SPACING_HLF} solid ${brandHighlightColour};`}
  }
`;

const CurrentLink = ({
  children: link,
  script,
  currentPageText,
  brandHighlightColour,
}) => (
  <>
    <StyledSpan
      // eslint-disable-next-line jsx-a11y/aria-role
      role="text"
      script={script}
      brandHighlightColour={brandHighlightColour}
    >
      <VisuallyHiddenText>{currentPageText}, </VisuallyHiddenText>
      {link}
    </StyledSpan>
  </>
);

CurrentLink.propTypes = {
  children: string.isRequired,
  script: shape(scriptPropType).isRequired,
  currentPageText: string,
  brandHighlightColour: string.isRequired,
};

CurrentLink.defaultProps = {
  currentPageText: null,
};

export const NavigationUl = ({ children, ...props }) => (
  <StyledUnorderedList role="list" {...props}>
    {children}
  </StyledUnorderedList>
);

NavigationUl.propTypes = {
  children: node.isRequired,
};

export const NavigationLi = ({
  children: link,
  url,
  script,
  currentPageText,
  active,
  service,
  dir,
  brandForegroundColour,
  brandHighlightColour,
  ...props
}) => {
  return (
    <StyledListItem
      dir={dir}
      role="listitem"
      brandForegroundColour={brandForegroundColour}
      brandHighlightColour={brandHighlightColour}
    >
      {active && currentPageText ? (
        <StyledLink
          href={url}
          script={script}
          service={service}
          currentLink
          brandForegroundColour={brandForegroundColour}
          brandHighlightColour={brandHighlightColour}
          {...props}
        >
          <CurrentLink
            script={script}
            currentPageText={currentPageText}
            brandHighlightColour={brandHighlightColour}
          >
            {link}
          </CurrentLink>
        </StyledLink>
      ) : (
        <StyledLink
          href={url}
          script={script}
          service={service}
          brandForegroundColour={brandForegroundColour}
          brandHighlightColour={brandHighlightColour}
          {...props}
        >
          {link}
        </StyledLink>
      )}
    </StyledListItem>
  );
};

NavigationLi.propTypes = {
  children: node.isRequired,
  url: string.isRequired,
  script: shape(scriptPropType).isRequired,
  active: bool,
  currentPageText: string,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  brandForegroundColour: string.isRequired,
  brandHighlightColour: string.isRequired,
};

NavigationLi.defaultProps = {
  active: false,
  currentPageText: null,
  dir: 'ltr',
};

// ampOpenClass is the class added to the Navigation, and is toggled on tap.
// It indicates whether the menu is open or not. This overrides the background
// color of the Navigation
const StyledNav = styled.nav`
  position: relative;
  ${({ isOpen, brandBackgroundColour }) =>
    `background-color: ${isOpen ? C_EBON : brandBackgroundColour};`}
  ${({ ampOpenClass }) =>
    ampOpenClass &&
    `
      &.${ampOpenClass} {
        @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
          background-color: ${C_EBON};
        }
      }
    `}
  border-top: 0.0625rem solid ${C_WHITE};

  ${StyledListItem} {
    ${({ dir }) => `
      &::after {
        ${dir === 'ltr' ? 'left' : 'right'}: 0;
      }
    `}
  }
`;

const Navigation = ({
  children,
  dir,
  isOpen,
  ampOpenClass,
  brandBackgroundColour,
  brandForegroundColour,
  brandBorderColour,
  brandHighlightColour,
  ...props
}) => {
  return (
    <StyledNav
      role="navigation"
      dir={dir}
      isOpen={isOpen}
      ampOpenClass={ampOpenClass}
      brandBackgroundColour={brandBackgroundColour}
      brandForegroundColour={brandForegroundColour}
      brandBorderColour={brandBorderColour}
      brandHighlightColour={brandHighlightColour}
      {...props}
    >
      <NavWrapper>{children}</NavWrapper>
    </StyledNav>
  );
};

Navigation.propTypes = {
  children: node.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  isOpen: bool,
  ampOpenClass: string,
  brandBackgroundColour: string.isRequired,
  brandForegroundColour: string.isRequired,
  brandBorderColour: string.isRequired,
  brandHighlightColour: string.isRequired,
};

Navigation.defaultProps = {
  dir: 'ltr',
  isOpen: false,
  ampOpenClass: null,
};

export default Navigation;
