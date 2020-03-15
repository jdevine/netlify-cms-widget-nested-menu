import NestedJsonEditorControl from "./NestedJsonEditorControl";
import NestedJsonEditorPreview from "./NestedJsonEditorPreview";

if (typeof window !== "undefined") {
  window.NestedJsonEditorControl = NestedJsonEditorControl;
  window.NestedJsonEditorPreview = NestedJsonEditorPreview;
}

export { NestedJsonEditorControl, NestedJsonEditorPreview };
