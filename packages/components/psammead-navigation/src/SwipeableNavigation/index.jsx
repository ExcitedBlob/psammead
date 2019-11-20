import React from 'react';
import styled, { css } from 'styled-components';
import { node, oneOf } from 'prop-types';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import useMediaQuery from '../../hooks/useMediaQuery';

/* Convert C_POSTBOX to rgba as IE doesn't like 8 digit hex */
const C_POSTBOX_TRANSPARENT = `rgba(184, 0, 0, 0)`;
const C_POSTBOX_OPAQUE = `rgba(184, 0, 0, 1)`;

const StyledSwipeableNav = styled.div`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    white-space: nowrap;
    overflow-x: scroll;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    &:after {
      content: ' ';
      height: 100%;
      width: 3rem;
      position: absolute;
      ${({ dir }) => css`
        ${dir === 'ltr' ? 'right' : 'left'}: 0;
      `}
      bottom: 0;
      z-index: 3;
      overflow: hidden;
      pointer-events: none;
      background: linear-gradient(
        ${({ dir }) => (dir === 'ltr' ? 'to right' : 'to left')},
        ${C_POSTBOX_TRANSPARENT} 0%,
        ${C_POSTBOX_OPAQUE} 100%
      );
    }
  }
`;

export const CanonicalSwipeableNavigation = ({ children, dir }) => {
  const isSwipeable = useMediaQuery('(max-width: 600px)');
  const ariaHidden = isSwipeable && { 'aria-hidden': true };

  return (
    <StyledSwipeableNav dir={dir} {...ariaHidden}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { isSwipeable }),
      )}
    </StyledSwipeableNav>
  );
};

CanonicalSwipeableNavigation.propTypes = {
  children: node.isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

CanonicalSwipeableNavigation.defaultProps = { dir: 'ltr' };

export const AmpSwipeableNavigation = ({ children, dir }) => (
  <StyledSwipeableNav dir={dir}>{children}</StyledSwipeableNav>
);

AmpSwipeableNavigation.propTypes = {
  children: node.isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

AmpSwipeableNavigation.defaultProps = { dir: 'ltr' };
