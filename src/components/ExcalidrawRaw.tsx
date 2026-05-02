import { Excalidraw as Draw } from '@excalidraw/excalidraw'
import type { ComponentProps } from 'react'
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'

export type ExcalidrawProps = ComponentProps<typeof Draw>

export function ExcalidrawRaw(props: ExcalidrawProps) {
  const excalidrawAPI = (api: ExcalidrawImperativeAPI) => {
    const interval = setInterval(() => {
      if (api.getSceneElements().length > 0) {
        api.scrollToContent(undefined, {
          fitToContent: true,
        })
        clearInterval(interval)
      }
    }, 10)
  }

  return <Draw viewModeEnabled excalidrawAPI={excalidrawAPI} {...props} />
}
