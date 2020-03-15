import Control from './Control'
import Preview from './Preview'

if (typeof window !== 'undefined') {
  window.NestedJsonEditorControl = Control
  window.NestedJsonEditorPreview = Preview
}

export { Control as NestedJsonEditorControl, Preview as NestedJsonEditorPreview }