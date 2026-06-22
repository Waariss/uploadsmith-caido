# UploadSmith

Purpose-built upload request mutations for Caido, right where you test.

UploadSmith helps bug bounty hunters and penetration testers quickly mutate upload requests from Caido. Replace selected text with common `Content-Type` values, filename extension variants, and magic byte prefixes without leaving the request editor.

> UploadSmith is local-only. It does not send requests, run active scans, use telemetry, or call external services.

## Key Features

- Context-menu helpers for upload request testing
- Content-Type presets such as `image/jpeg`, `image/png`, `image/svg+xml`, `application/pdf`, and `application/octet-stream`
- Extension variants such as `.php.jpg`, `.phar.jpg`, `.php%00.jpg`, and `.aspx:.jpg`
- Magic byte presets for JPEG, PNG, GIF, PDF, ZIP, WebP, and SVG
- `Prepend:*` actions for adding magic bytes before selected file content
- Searchable preset library inside the UploadSmith page
- Custom presets for Content-Type, Extension, and Magic Byte values
- Per-preset context-menu checkbox
- Import/export JSON for sharing preset packs
- Reset context-menu selections back to UploadSmith defaults

## Installation

Download the latest `UploadSmith.zip` from the [Releases page](../../releases/latest), then install it in Caido:

1. Open Caido
2. Go to `Plugins`
3. Click `Install Package`
4. Select `UploadSmith.zip`
5. Reload Caido if prompted

## Usage

1. Open a request in Caido Replay, HTTP History, or another request editor
2. Select the text you want to replace, such as a multipart `Content-Type`, filename extension, or file body content
3. Right-click the request editor
4. Choose `Plugins -> UploadSmith -> <preset>`

Example:

```http
Content-Disposition: form-data; name="file"; filename="avatar.jpg"
Content-Type: text/plain
```

Select `text/plain`, then choose:

```text
Content-Type: image/jpeg
```

The selected value becomes:

```http
Content-Type: image/jpeg
```

## Magic Byte Prepend

Use `Prepend:*` when you want to keep the selected file body and add a magic byte prefix before it.

Example flow:

1. Select the file body content
2. Choose `Prepend: JPEG`
3. UploadSmith replaces the selection with:

```text
<JPEG magic bytes><original selected content>
```

`Magic Byte:*` replaces the selection. `Prepend:*` preserves the selection and prefixes it.

## Preset Management

Open the UploadSmith sidebar page to manage presets.

- Use search to find presets that are not in the context-menu shortlist
- Use `Copy` to copy any preset value
- Use `Context menu` checkboxes to choose which presets appear in the right-click menu
- Use `Add Custom Preset` to create your own values
- Use `Reset Context Menu` to restore the default shortlist

Caido does not currently expose runtime unregister/reorder APIs for context-menu commands. After changing context-menu selections, reload Caido so UploadSmith can rebuild the menu in category order.

## Import / Export JSON

Use `Export JSON` to share custom presets and context-menu selections. Use `Import JSON` to load them into another Caido workspace.

Example import file:

```json
{
  "version": 1,
  "exportedAt": "2026-06-23T00:00:00.000Z",
  "customPresets": [
    {
      "id": "custom-team-php16-jpg",
      "category": "Extension",
      "label": ".php16.jpg",
      "value": ".php16.jpg",
      "description": "Team-specific extension variant.",
      "showInMenu": true
    },
    {
      "id": "custom-html-content-type",
      "category": "Content-Type",
      "label": "text/html",
      "value": "text/html",
      "description": "HTML content type for served-content tests.",
      "showInMenu": false
    }
  ],
  "menuPresetIds": [
    "content-type-image-jpeg",
    "content-type-image-png",
    "content-type-svg",
    "content-type-pdf",
    "content-type-octet-stream",
    "extension-php-jpg",
    "extension-phar-jpg",
    "extension-php-null-jpg",
    "extension-aspx-colon-jpg",
    "magic-jpeg",
    "magic-png",
    "magic-gif89a",
    "magic-pdf",
    "magic-zip",
    "magic-svg"
  ]
}
```

Valid custom preset categories:

```text
Content-Type
Extension
Magic Byte
```

## Screenshots

Screenshots can be added here before publishing to the Caido store:

1. Context menu preset selection
2. UploadSmith preset library
3. Custom preset and context-menu checkbox
4. Import/export controls

## Development

Install dependencies:

```bash
pnpm install
```

Build the plugin package:

```bash
pnpm build
```

The installable package is generated at:

```text
dist/UploadSmith.zip
```

## Privacy and Safety

- No telemetry
- No external services
- No internet-loaded assets
- No auto-update mechanism
- No active scanning
- No automatic request sending
- No bundled web shells or exploit payload execution

UploadSmith only edits or copies selected text inside Caido.

## Acknowledgements

Inspired by common upload-testing workflows such as magic byte selection and upload request mutation helpers. UploadSmith does not copy or bundle code from those projects.

## License

MIT
