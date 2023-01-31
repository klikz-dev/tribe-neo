import './preflight.css';
import './storybook.css';
import '../src/styles.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }, 
  backgrounds: {
    default: 'surface',
    values: [
      {
        name: 'main',
        value: '#F0FFFA',
      },
      {
        name: 'surface',
        value: '#F9FAFB',
      },
    ],
  },
}