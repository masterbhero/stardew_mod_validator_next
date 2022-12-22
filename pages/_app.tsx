import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Navigation from '../components/layouts/navigation'
import { wrapper } from '../store/store'
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
// function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <div>
        <Navigation />
        <Component {...props} />
      </div>
    </Provider>
  )
}

// export default wrapper.withRedux(App);