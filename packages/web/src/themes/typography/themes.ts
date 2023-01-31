import { TypographyOptions } from 'typography'
import altonTheme from 'typography-theme-alton'
import bootstrapTheme from 'typography-theme-bootstrap'
// import deYoungTheme from 'typography-theme-de-young'
import doelgerTheme from 'typography-theme-doelger'
// import elkGlenTheme from 'typography-theme-elk-glen'
// import fairyGatesTheme from 'typography-theme-fairy-gates'
// import funstonTheme from 'typography-theme-funston'
// import githubTheme from 'typography-theme-github'
// import grandViewTheme from 'typography-theme-grand-view'
// import irvingTheme from 'typography-theme-irving'
import judahTheme from 'typography-theme-judah'
// import kirkhamTheme from 'typography-theme-kirkham'
// import lawtonTheme from 'typography-theme-lawton'
// import lincolnTheme from 'typography-theme-lincoln'
// import moragaTheme from 'typography-theme-moraga'
// import noriegaTheme from 'typography-theme-noriega'
import oceanBeachTheme from 'typography-theme-ocean-beach'
// import parnassusTheme from 'typography-theme-parnassus'
// import stAnnesTheme from 'typography-theme-st-annes'
// import sternGroveTheme from 'typography-theme-stern-grove'
// import stowLakeTheme from 'typography-theme-stow-lake'
// import sutroTheme from 'typography-theme-sutro'
// import twinPeaksTheme from 'typography-theme-twin-peaks'
import wordpressKubrickTheme from 'typography-theme-wordpress-kubrick'

export enum TypographyTheme {
  alton = 'alton',
  // bootstrap = 'bootstrap',
  // deYoung = 'deYoung',
  doelger = 'doelger',
  // elkGlen = 'elkGlen',
  // fairyGates = 'fairyGates',
  // funston = 'funston',
  system = 'system',
  // grandView = 'grandView',
  // irving = 'irving',
  judah = 'judah',
  // kirkham = 'kirkham',
  // lawton = 'lawton',
  // lincoln = 'lincoln',
  // moraga = 'moraga',
  // noriega = 'noriega',
  oceanBeach = 'oceanBeach',
  // parnassus = 'parnassus',
  // stAnnes = 'stAnnes',
  // sternGrove = 'sternGrove',
  // stowLake = 'stowLake',
  // sutro = 'sutro',
  // twinPeaks = 'twinPeaks',
  wordpressKubrick = 'wordpressKubrick',
}

export const typographyThemes: Record<
  TypographyTheme,
  TypographyOptions & { title: string }
> = {
  [TypographyTheme.system]: {
    ...bootstrapTheme,
    title: 'System',
    baseFontSize: '16px',
  },
  [TypographyTheme.alton]: { ...altonTheme, baseFontSize: '16px' },
  // [TypographyTheme.bootstrap]: { ...bootstrapTheme, baseFontSize: '16px' },
  // [TypographyTheme.deYoung]: { ...deYoungTheme, baseFontSize: '16px' },
  [TypographyTheme.doelger]: { ...doelgerTheme, baseFontSize: '16px' },
  // [TypographyTheme.elkGlen]: { ...elkGlenTheme, baseFontSize: '16px' },
  // [TypographyTheme.fairyGates]: { ...fairyGatesTheme, baseFontSize: '16px' },
  // [TypographyTheme.funston]: { ...funstonTheme, baseFontSize: '16px' },
  // [TypographyTheme.grandView]: { ...grandViewTheme, baseFontSize: '16px' },
  // [TypographyTheme.irving]: { ...irvingTheme, baseFontSize: '16px' },
  [TypographyTheme.judah]: { ...judahTheme, baseFontSize: '16px' },
  // [TypographyTheme.kirkham]: { ...kirkhamTheme, baseFontSize: '16px' },
  // [TypographyTheme.lawton]: { ...lawtonTheme, baseFontSize: '16px' },
  // [TypographyTheme.lincoln]: { ...lincolnTheme, baseFontSize: '16px' },
  // [TypographyTheme.moraga]: { ...moragaTheme, baseFontSize: '16px' },
  // [TypographyTheme.noriega]: { ...noriegaTheme, baseFontSize: '16px' },
  [TypographyTheme.oceanBeach]: { ...oceanBeachTheme, baseFontSize: '16px' },
  // [TypographyTheme.parnassus]: { ...parnassusTheme, baseFontSize: '16px' },
  // [TypographyTheme.stAnnes]: { ...stAnnesTheme, baseFontSize: '16px' },
  // [TypographyTheme.sternGrove]: { ...sternGroveTheme, baseFontSize: '16px' },
  // [TypographyTheme.stowLake]: { ...stowLakeTheme, baseFontSize: '16px' },
  // [TypographyTheme.sutro]: { ...sutroTheme, baseFontSize: '16px' },
  // [TypographyTheme.twinPeaks]: { ...twinPeaksTheme, baseFontSize: '16px' },
  [TypographyTheme.wordpressKubrick]: {
    ...wordpressKubrickTheme,
    baseFontSize: '16px',
  },
}
