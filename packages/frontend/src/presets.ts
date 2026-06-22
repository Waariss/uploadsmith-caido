export type PresetCategory = "Content-Type" | "Extension" | "Magic Byte";

export type UploadPreset = {
  id: string;
  category: PresetCategory;
  label: string;
  value: string;
  description: string;
  showInMenu?: boolean;
};

export const CONTENT_TYPE_PRESETS: UploadPreset[] = [
  {
    id: "content-type-image-jpeg",
    category: "Content-Type",
    label: "image/jpeg",
    value: "image/jpeg",
    description: "Common JPEG upload MIME type.",
  },
  {
    id: "content-type-image-png",
    category: "Content-Type",
    label: "image/png",
    value: "image/png",
    description: "Common PNG upload MIME type.",
  },
  {
    id: "content-type-image-gif",
    category: "Content-Type",
    label: "image/gif",
    value: "image/gif",
    description: "Common GIF upload MIME type.",
  },
  {
    id: "content-type-image-webp",
    category: "Content-Type",
    label: "image/webp",
    value: "image/webp",
    description: "Common WebP upload MIME type.",
  },
  {
    id: "content-type-svg",
    category: "Content-Type",
    label: "image/svg+xml",
    value: "image/svg+xml",
    description: "SVG upload MIME type for inline rendering tests.",
  },
  {
    id: "content-type-pdf",
    category: "Content-Type",
    label: "application/pdf",
    value: "application/pdf",
    description: "PDF upload MIME type.",
  },
  {
    id: "content-type-zip",
    category: "Content-Type",
    label: "application/zip",
    value: "application/zip",
    description: "ZIP archive upload MIME type.",
  },
  {
    id: "content-type-octet-stream",
    category: "Content-Type",
    label: "application/octet-stream",
    value: "application/octet-stream",
    description: "Generic binary stream MIME type.",
  },
  {
    id: "content-type-text-plain",
    category: "Content-Type",
    label: "text/plain",
    value: "text/plain",
    description: "Plain text MIME type.",
  },
  {
    id: "content-type-text-html",
    category: "Content-Type",
    label: "text/html",
    value: "text/html",
    description: "HTML MIME type for served-content handling tests.",
  },
];

export const EXTENSION_PRESETS: UploadPreset[] = [
  {
    id: "extension-jpg",
    category: "Extension",
    label: ".jpg",
    value: ".jpg",
    description: "JPEG file extension.",
  },
  {
    id: "extension-png",
    category: "Extension",
    label: ".png",
    value: ".png",
    description: "PNG file extension.",
  },
  {
    id: "extension-gif",
    category: "Extension",
    label: ".gif",
    value: ".gif",
    description: "GIF file extension.",
  },
  {
    id: "extension-svg",
    category: "Extension",
    label: ".svg",
    value: ".svg",
    description: "SVG file extension.",
  },
  {
    id: "extension-pdf",
    category: "Extension",
    label: ".pdf",
    value: ".pdf",
    description: "PDF file extension.",
  },
  {
    id: "extension-zip",
    category: "Extension",
    label: ".zip",
    value: ".zip",
    description: "ZIP file extension.",
  },
  {
    id: "extension-php-jpg",
    category: "Extension",
    label: ".php.jpg",
    value: ".php.jpg",
    description: "Double extension variant.",
  },
  {
    id: "extension-jpg-php",
    category: "Extension",
    label: ".jpg.php",
    value: ".jpg.php",
    description: "Reversed double extension variant.",
  },
  {
    id: "extension-phtml",
    category: "Extension",
    label: ".phtml",
    value: ".phtml",
    description: "PHP-adjacent extension variant.",
  },
  {
    id: "extension-pht",
    category: "Extension",
    label: ".pht",
    value: ".pht",
    description: "PHP handler extension variant.",
  },
  {
    id: "extension-phtm",
    category: "Extension",
    label: ".phtm",
    value: ".phtm",
    description: "PHP handler extension variant.",
  },
  {
    id: "extension-phps",
    category: "Extension",
    label: ".phps",
    value: ".phps",
    description: "PHP source/handler extension variant.",
  },
  {
    id: "extension-phar",
    category: "Extension",
    label: ".phar",
    value: ".phar",
    description: "PHP archive extension variant.",
  },
  {
    id: "extension-php3",
    category: "Extension",
    label: ".php3",
    value: ".php3",
    description: "Legacy PHP extension variant.",
  },
  {
    id: "extension-php4",
    category: "Extension",
    label: ".php4",
    value: ".php4",
    description: "Legacy PHP extension variant.",
  },
  {
    id: "extension-php5",
    category: "Extension",
    label: ".php5",
    value: ".php5",
    description: "Legacy PHP extension variant.",
  },
  {
    id: "extension-php7",
    category: "Extension",
    label: ".php7",
    value: ".php7",
    description: "PHP versioned extension variant.",
  },
  {
    id: "extension-mixed-php",
    category: "Extension",
    label: ".pHp",
    value: ".pHp",
    description: "Mixed-case extension variant.",
  },
  {
    id: "extension-jpg-dot",
    category: "Extension",
    label: ".jpg.",
    value: ".jpg.",
    description: "Trailing-dot extension variant.",
  },
  {
    id: "extension-asp-jpg",
    category: "Extension",
    label: ".asp;.jpg",
    value: ".asp;.jpg",
    description: "Semicolon extension variant.",
  },
  {
    id: "extension-jsp-jpg",
    category: "Extension",
    label: ".jsp;.jpg",
    value: ".jsp;.jpg",
    description: "JSP semicolon extension variant.",
  },
  {
    id: "extension-phar-jpg",
    category: "Extension",
    label: ".phar.jpg",
    value: ".phar.jpg",
    description: "PHP archive plus allowed image extension.",
  },
  {
    id: "extension-phtml-jpg",
    category: "Extension",
    label: ".phtml.jpg",
    value: ".phtml.jpg",
    description: "PHP handler plus allowed image extension.",
  },
  {
    id: "extension-php5-jpg",
    category: "Extension",
    label: ".php5.jpg",
    value: ".php5.jpg",
    description: "Versioned PHP plus allowed image extension.",
  },
  {
    id: "extension-php-null-jpg",
    category: "Extension",
    label: ".php%00.jpg",
    value: ".php%00.jpg",
    description: "Null-byte encoded extension injection pattern.",
  },
  {
    id: "extension-php-space-jpg",
    category: "Extension",
    label: ".php%20.jpg",
    value: ".php%20.jpg",
    description: "Encoded space extension injection pattern.",
  },
  {
    id: "extension-php-lf-jpg",
    category: "Extension",
    label: ".php%0a.jpg",
    value: ".php%0a.jpg",
    description: "Encoded line-feed extension injection pattern.",
  },
  {
    id: "extension-php-crlf-jpg",
    category: "Extension",
    label: ".php%0d%0a.jpg",
    value: ".php%0d%0a.jpg",
    description: "Encoded CRLF extension injection pattern.",
  },
  {
    id: "extension-php-colon-jpg",
    category: "Extension",
    label: ".php:.jpg",
    value: ".php:.jpg",
    description: "Colon extension injection pattern used in Windows-oriented tests.",
  },
  {
    id: "extension-php-slash-jpg",
    category: "Extension",
    label: ".php/.jpg",
    value: ".php/.jpg",
    description: "Slash extension injection pattern.",
  },
  {
    id: "extension-php-dotdot-jpg",
    category: "Extension",
    label: ".php..jpg",
    value: ".php..jpg",
    description: "Extra-dot extension injection pattern.",
  },
  {
    id: "extension-aspx-jpg",
    category: "Extension",
    label: ".aspx.jpg",
    value: ".aspx.jpg",
    description: "ASP.NET plus allowed image extension.",
  },
  {
    id: "extension-ashx-jpg",
    category: "Extension",
    label: ".ashx.jpg",
    value: ".ashx.jpg",
    description: "ASP.NET handler plus allowed image extension.",
  },
  {
    id: "extension-aspx-colon-jpg",
    category: "Extension",
    label: ".aspx:.jpg",
    value: ".aspx:.jpg",
    description: "ASP.NET colon extension injection pattern.",
  },
  {
    id: "extension-jspx-jpg",
    category: "Extension",
    label: ".jspx.jpg",
    value: ".jspx.jpg",
    description: "JSPX plus allowed image extension.",
  },
];

export const MAGIC_BYTE_PRESETS: UploadPreset[] = [
  {
    id: "magic-jpeg",
    category: "Magic Byte",
    label: "JPEG",
    value: "\u00ff\u00d8\u00ff\u00e0",
    description: "JPEG SOI/JFIF-style leading bytes.",
  },
  {
    id: "magic-png",
    category: "Magic Byte",
    label: "PNG",
    value: "\u0089PNG\r\n\u001a\n",
    description: "PNG signature bytes.",
  },
  {
    id: "magic-gif87a",
    category: "Magic Byte",
    label: "GIF87a",
    value: "GIF87a",
    description: "GIF87a header.",
  },
  {
    id: "magic-gif89a",
    category: "Magic Byte",
    label: "GIF89a",
    value: "GIF89a",
    description: "GIF89a header.",
  },
  {
    id: "magic-pdf",
    category: "Magic Byte",
    label: "PDF",
    value: "%PDF-1.3\n",
    description: "PDF header.",
  },
  {
    id: "magic-zip",
    category: "Magic Byte",
    label: "ZIP",
    value: "PK\u0003\u0004",
    description: "ZIP local file header signature.",
  },
  {
    id: "magic-webp",
    category: "Magic Byte",
    label: "WebP",
    value: "RIFF\u0000\u0000\u0000\u0000WEBP",
    description: "RIFF/WebP leading bytes with placeholder size bytes.",
  },
  {
    id: "magic-svg",
    category: "Magic Byte",
    label: "SVG",
    value: '<svg xmlns="http://www.w3.org/2000/svg">',
    description: "Minimal SVG opening tag.",
  },
];

export const PRESET_GROUPS = [
  {
    title: "Content-Type",
    presets: CONTENT_TYPE_PRESETS,
  },
  {
    title: "Extensions",
    presets: EXTENSION_PRESETS,
  },
  {
    title: "Magic Bytes",
    presets: MAGIC_BYTE_PRESETS,
  },
] as const;

export const ALL_PRESETS = [
  ...CONTENT_TYPE_PRESETS,
  ...EXTENSION_PRESETS,
  ...MAGIC_BYTE_PRESETS,
];

export const DEFAULT_CONTEXT_MENU_PRESET_IDS = [
  "content-type-image-jpeg",
  "content-type-image-png",
  "content-type-image-gif",
  "content-type-svg",
  "content-type-pdf",
  "content-type-octet-stream",
  "extension-jpg",
  "extension-png",
  "extension-gif",
  "extension-svg",
  "extension-php-jpg",
  "extension-jpg-php",
  "extension-phtml",
  "extension-phar",
  "extension-phar-jpg",
  "extension-phtml-jpg",
  "extension-php5-jpg",
  "extension-php-null-jpg",
  "extension-php-colon-jpg",
  "extension-aspx-colon-jpg",
  "magic-jpeg",
  "magic-png",
  "magic-gif89a",
  "magic-pdf",
  "magic-zip",
  "magic-svg",
] as const;

export const DEFAULT_CONTEXT_MENU_PRESET_ID_SET = new Set<string>(
  DEFAULT_CONTEXT_MENU_PRESET_IDS,
);

export const isPresetCategory = (value: string): value is PresetCategory =>
  value === "Content-Type" || value === "Extension" || value === "Magic Byte";

export const normalizeMenuPresetIds = (value: unknown): string[] => {
  if (
    value === null ||
    typeof value !== "object" ||
    !("menuPresetIds" in value)
  ) {
    return [...DEFAULT_CONTEXT_MENU_PRESET_IDS];
  }

  const menuPresetIds = (value as { menuPresetIds?: unknown }).menuPresetIds;
  if (!Array.isArray(menuPresetIds)) {
    return [...DEFAULT_CONTEXT_MENU_PRESET_IDS];
  }

  return menuPresetIds.filter((id): id is string => typeof id === "string");
};

export const normalizeCustomPresets = (value: unknown): UploadPreset[] => {
  if (
    value === null ||
    typeof value !== "object" ||
    !("customPresets" in value)
  ) {
    return [];
  }

  const customPresets = (value as { customPresets?: unknown }).customPresets;
  if (!Array.isArray(customPresets)) {
    return [];
  }

  return customPresets.filter((preset): preset is UploadPreset => {
    if (preset === null || typeof preset !== "object") {
      return false;
    }

    const candidate = preset as Partial<UploadPreset>;
    return (
      typeof candidate.id === "string" &&
      typeof candidate.label === "string" &&
      typeof candidate.value === "string" &&
      typeof candidate.description === "string" &&
      typeof candidate.category === "string" &&
      isPresetCategory(candidate.category) &&
      (typeof candidate.showInMenu === "boolean" ||
        candidate.showInMenu === undefined)
    );
  });
};
