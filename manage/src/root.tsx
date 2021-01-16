import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import euiDarkVars from '@elastic/eui/dist/eui_theme_dark.json';
import euiLightVars from '@elastic/eui/dist/eui_theme_light.json';
import Routes from './routes';
import { getTheme } from './lib/theme';
import { Suspense } from 'react';
import { EuiLoadingSpinner } from '@elastic/eui';

const App = React.lazy(() => import('./app'));

export interface IRootProps {}

export default function Root(props: IRootProps) {
  // const [loading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   if (!window['__globalData']) {
  //     window['__globalData'] = new Map();
  //   }

  //   fetch('/cloudbaseenv.json')
  //     .then(res => {
  //       if (res.status >= 400) {
  //         throw new Error('Bad response from server');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       window['__globalData'].cloudbaseenv = data;
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });
  // if (loading) {
  //   return null;
  // }

  return (
    <ThemeProvider
      theme={() => ({
        eui: euiLightVars,
        darkMode: false,
      })}
    >
      <Suspense fallback={<EuiLoadingSpinner />}>
        <App />
      </Suspense>
    </ThemeProvider>
  );
}
