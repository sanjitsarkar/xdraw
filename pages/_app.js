import { ColorProvider } from '../store/ColorStore'
import { ColorTypeProvider } from '../store/ColorType'
import { DrawTypeProvider } from '../store/DrawTypeStore'
import {  IndexProvider } from '../store/IndexStore'
import { PathsProvider } from '../store/PathsStore'
import { PathProvider } from '../store/PathStore'
import { StrokePropertyProvider } from '../store/StrokePropertyStore'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
  <DrawTypeProvider>
    <ColorProvider>
    <ColorTypeProvider>
  <PathsProvider>
  <PathProvider>
    <IndexProvider>
      <StrokePropertyProvider>
  <Component {...pageProps} />
  </StrokePropertyProvider>
  </IndexProvider>
    </PathProvider>
  </PathsProvider>
  </ColorTypeProvider>
  </ColorProvider>
  </DrawTypeProvider>
  )
}

export default MyApp
