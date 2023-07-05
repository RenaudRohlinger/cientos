import { onUnmounted, onMounted } from 'vue'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { useRenderLoop } from '@tresjs/core'

type TweakPane = Pane & { addBlade(blade: any): void }
let pane: TweakPane
let fpsGraph: any

export /**
 * Creates a TweakPane instance and returns it.
 *
 * @param {string} [selector='body']
 * @return {*}
 */
const useTweakPane = (selector = 'body') => {
  if (!pane) {
    pane = new Pane() as TweakPane
    pane.registerPlugin(EssentialsPlugin)

    fpsGraph = pane.addBlade({
      view: 'fpsgraph',
      label: 'fpsgraph',
    })
  }

  /**
   * Disposes the TweakPane instance.
   *
   */
  function disposeTweakPane() {
    if (pane) {
      pane.dispose()
    }
  }

  onMounted(() => {
    const { onBeforeLoop, onAfterLoop, resume } = useRenderLoop()
    resume()
    onBeforeLoop(() => fpsGraph.begin())
    onAfterLoop(() => fpsGraph.end())
  })
  onUnmounted(() => {
    disposeTweakPane()
  })

  return { pane, fpsGraph, disposeTweakPane }
}
