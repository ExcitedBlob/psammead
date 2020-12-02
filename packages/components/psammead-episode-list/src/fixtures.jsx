/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/prop-types */
// This provides fixture data and helper functions that are useful to both storybook and unit tests
import React from 'react';
import styled from '@emotion/styled';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { formatDuration } from '@bbc/psammead-timestamp-container/utilities';
import SectionLabel from '@bbc/psammead-section-label';
import { C_WHITE, C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import EpisodeList from '.';

export const exampleEpisodes = [
  {
    id: '1',
    url: 'https://www.bbc.com/blahasda',
    brandTitle: 'Magazine de la Culture',
    date: '4 Avril 2020',
    duration: 'PT3M',
    durationLabel: 'Durée',
    time: '14:00',
    locale: 'fr',
  },
  {
    id: '2',
    url: 'https://www.bbc.com/1',
    brandTitle: 'Le Journal',
    episodeTitle: "Le premier rendez-vous d'information de la soirée.",
    date: '20 octobre 2020',
    duration: 'PT1H30M',
    durationLabel: 'Durée',
    time: '14:00',
    locale: 'fr',
  },
  {
    id: '3',
    url: 'https://www.bbc.com/2',
    brandTitle: 'Afrique Avenir',
    episodeTitle: 'Tout savoir sur les jeunes entrepreneurs africains.',
    date: '21 octobre 2020',
    duration: 'PT59M',
    durationLabel: 'Durée',
    time: '14:00',
    locale: 'fr',
  },
];

const rtlEpisode = {
  brandTitle: 'یونیورسٹی کی اندھیری',
  date: 'بی بی سی اردو ڈاٹ کام، کرا',
  durationLabel: 'المدة',
  time: 'ریشان',
  locale: 'ar',
};

export const rtlEpisodes = [
  {
    id: '1',
    url: 'https://www.bbc.com',
    duration: 'PT3M',
    episodeTitle: 'بی بی سی ا یونیورسٹی ردو',
    ...rtlEpisode,
  },
  {
    id: '2',
    url: 'https://www.bbc.com/a',
    duration: 'PT1H30M',
    ...rtlEpisode,
  },
  {
    id: '3',
    url: 'https://www.bbc.com/b',
    duration: 'PT59M',
    ...rtlEpisode,
  },
];

export const exampleVideoEpisodes = exampleEpisodes.map(episode => ({
  ...episode,
  image: 'https://ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
  altText: 'BBC News Afrique',
}));

export const exampleRtlVideoEpisodes = rtlEpisodes.map(episode => ({
  ...episode,
  image: 'https://ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
  altText: 'BBC News Afrique',
}));

const StyledSpan = styled.span`
  padding-left: 8px;
  padding-right: 8px;
`;

const Spacer = styled.aside`
  background: ${({ darkMode }) => (darkMode ? C_MIDNIGHT_BLACK : 'unset')};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;
const StyledSectionLabel = styled(SectionLabel)`
  margin-bottom: 0;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
  ${({ darkMode }) => darkMode && `color: ${C_WHITE}`}
`;

const SurroundingComponents = ({
  children,
  script,
  service,
  dir,
  darkMode,
}) => (
  // eslint-disable-next-line jsx-a11y/aria-role
  <Spacer darkMode={darkMode} role="complimentary">
    <StyledSectionLabel
      script={script}
      service={service}
      dir={dir}
      darkMode={darkMode}
      {...(darkMode ? { backgroundColor: C_MIDNIGHT_BLACK } : {})}
    >
      Recent Episodes
    </StyledSectionLabel>
    {children}
  </Spacer>
);

export const renderEpisodes = ({
  episodes,
  script,
  service,
  dir,
  withSurroundingComponents,
  darkMode,
}) => {
  const Wrapper = withSurroundingComponents
    ? SurroundingComponents
    : React.Fragment;
  return (
    <Wrapper
      {...(withSurroundingComponents ? { script, service, dir, darkMode } : {})}
    >
      <EpisodeList script={script} service={service} dir={dir}>
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id}>
            <EpisodeList.Link href={episode.url}>
              <VisuallyHiddenText>Audio, </VisuallyHiddenText>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle || `${episode.date}, ${episode.time}`}
              </EpisodeList.Description>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <VisuallyHiddenText>
                {` ${episode.durationLabel} ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: episode.locale,
                })} `}
              </VisuallyHiddenText>
              <EpisodeList.Metadata>
                <span aria-hidden="true">
                  {` ${episode.durationLabel} ${formatDuration({
                    duration: episode.duration,
                    locale: episode.locale,
                  })}`}
                </span>
              </EpisodeList.Metadata>
            </EpisodeList.Link>
            <EpisodeList.Metadata>
              {episode.episodeTitle && (
                <>
                  {' '}
                  <StyledSpan aria-hidden>|</StyledSpan> {episode.date}
                </>
              )}
            </EpisodeList.Metadata>
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </Wrapper>
  );
};

export const renderVideoEpisodes = ({
  episodes,
  script,
  service,
  dir,
  withSurroundingComponents,
  darkMode,
}) => {
  const Wrapper = withSurroundingComponents
    ? SurroundingComponents
    : React.Fragment;
  return (
    <Wrapper
      {...(withSurroundingComponents ? { script, service, dir, darkMode } : {})}
    >
      <EpisodeList
        script={script}
        service={service}
        dir={dir}
        darkMode={darkMode}
      >
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id}>
            <EpisodeList.Image
              src={episode.image}
              alt={episode.altText}
              duration={formatDuration({
                duration: episode.duration,
                locale: episode.locale,
              })}
            />
            <VisuallyHiddenText>Video, </VisuallyHiddenText>
            <EpisodeList.Link href={episode.url}>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle || episode.date}
              </EpisodeList.Description>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <VisuallyHiddenText>
                {` ${episode.durationLabel} ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: episode.locale,
                })} `}
              </VisuallyHiddenText>
            </EpisodeList.Link>
            {episode.episodeTitle && (
              <span role="text">
                <EpisodeList.Metadata as="time">
                  {episode.date}
                </EpisodeList.Metadata>
              </span>
            )}
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </Wrapper>
  );
};