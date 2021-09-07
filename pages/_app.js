import { ColorProvider } from '../store/ColorStore'
import { ColorTypeProvider } from '../store/ColorTypeStore'
import { ShapeTypeProvider } from '../store/ShapeTypeStore'
import { HistoryProvider } from '../store/HistoryStore'
import {  IndexProvider } from '../store/IndexStore'
import { PathsProvider } from '../store/PathsStore'
import { PathProvider } from '../store/PathStore'
import { ItemPropertyProvider } from '../store/ItemPropertyStore'
import { ToolTypeProvider } from '../store/ToolTypeStore'
import '../styles/globals.css'
import { ShowColorPickerProvider, ShowColorProvider } from '../store/ShowColorPickerStore'
import { IsSelectedProvider } from '../store/IsSelectedStore'
function MyApp({ Component, pageProps }) {
  return (
  <ShapeTypeProvider>
    <ShowColorPickerProvider>
    <ColorProvider>
    <ColorTypeProvider>
  <PathsProvider>
  <PathProvider>
    <IndexProvider>
      <ItemPropertyProvider>
        <HistoryProvider>
          <ToolTypeProvider>
            <IsSelectedProvider>
  <Component {...pageProps} />
  </IsSelectedProvider>
  </ToolTypeProvider>
  </HistoryProvider>
  </ItemPropertyProvider>
  </IndexProvider>
    </PathProvider>
  </PathsProvider>
  </ColorTypeProvider>
  </ColorProvider>
  </ShowColorPickerProvider>
  </ShapeTypeProvider>
  )
}

export default MyApp
