import type { AppProps } from 'next/app'

import { ContactBookProvider, UIProvider } from '../context'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from '../themes/dark-theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContactBookProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </ContactBookProvider>
  )
}

export default MyApp