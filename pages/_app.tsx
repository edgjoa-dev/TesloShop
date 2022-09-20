import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes/light-theme';
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UiProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <SessionProvider>
    <SWRConfig
      value={{
        refreshInterval: 300000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
    >
      <AuthProvider message={''}>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme} >
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
      </AuthProvider>
    </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
