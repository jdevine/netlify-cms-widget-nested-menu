# netlify-cms-widget-nested-json

### A custom Netlify CMS widget for editing nested JSON data.

[Check out a demo!](https://netlify-cms-widget-nested-json.netlify.com/demo)


Similar standalone version [here](https://nested-json-editor.netlify.com/).


## Installation

### As an npm package:

```shell
yarn add netlify-cms-widget-nested-json
```

```js
import NestedJsonEditor from 'netlify-cms-widget-nested-json'

CMS.registerWidget('NestedJsonEditor', NestedJsonEditorControl, NestedJsonEditorPreview)
```

### Via `script` tag:

```html
<script src="https://unpkg.com/netlify-cms-widget-nested-json@^1.0.0"></script>

<script>
  CMS.registerWidget('NestedJsonEditor', NestedJsonEditorControl, NestedJsonEditorPreview)
</script>
```

## Usage

Add to your Netlify CMS configuration:

```yaml
    fields:
      - { name: <fieldname>, label: <fieldlabel>, widget: NestedJsonEditor }
```


## Support

For help with this widget, open an [issue](https://github.com/<user>/<repo>) or [message me](https://twitter.com/messages/compose?recipient_id=102070492).