import { ALL_PRESETS, MAGIC_BYTE_PRESETS, type UploadPreset } from "./presets";
import type { FrontendSDK } from "./types";

const COMMAND_GROUP_PREFIX = "UploadSmith";
const registeredCommandIds = new Set<string>();

const copyToClipboard = (text: string) => {
  void navigator.clipboard.writeText(text);
};

const groupForPreset = (preset: UploadPreset) => {
  if (preset.category === "Extension") {
    return `${COMMAND_GROUP_PREFIX}: Extensions`;
  }

  if (preset.category === "Magic Byte") {
    return `${COMMAND_GROUP_PREFIX}: Magic Bytes`;
  }

  return `${COMMAND_GROUP_PREFIX}: Content-Type`;
};

const insertPreset = (
  sdk: FrontendSDK,
  contextType: string,
  preset: UploadPreset,
  mode: "replace" | "prepend",
) => {
  const editor = sdk.window.getActiveEditor();

  if (
    editor === undefined ||
    editor.isReadOnly() ||
    contextType !== "RequestContext"
  ) {
    copyToClipboard(preset.value);
    sdk.window.showToast(`Copied ${preset.label}`, {
      variant: "info",
    });
    return;
  }

  const selectedText = editor.getSelectedText();
  const nextText =
    mode === "prepend" ? `${preset.value}${selectedText}` : preset.value;

  editor.replaceSelectedText(nextText);
  editor.focus();
  sdk.window.showToast(
    `${mode === "prepend" ? "Prepended" : "Inserted"} ${preset.label}`,
    {
      variant: "success",
    },
  );
};

const registerCommand = (
  sdk: FrontendSDK,
  commandId: string,
  name: string,
  group: string,
  preset: UploadPreset,
  mode: "replace" | "prepend",
) => {
  if (registeredCommandIds.has(commandId)) {
    return;
  }

  sdk.commands.register(commandId, {
    name,
    group,
    run: (context) => {
      insertPreset(sdk, context.type, preset, mode);
    },
    when: (context) => context.type === "RequestContext",
  });

  sdk.menu.registerItem({
    type: "Request",
    commandId,
    leadingIcon: mode === "prepend" ? "fas fa-plus" : "fas fa-file-arrow-up",
  });

  registeredCommandIds.add(commandId);
};

export const registerUploadSmithCommands = (
  sdk: FrontendSDK,
  customPresets: UploadPreset[] = [],
  menuPresetIds: string[] = [],
) => {
  const menuPresetIdSet = new Set(menuPresetIds);
  const customMenuPresets = customPresets.filter(
    (preset) => preset.showInMenu === true,
  );
  const builtInMenuPresets = ALL_PRESETS.filter((preset) =>
    menuPresetIdSet.has(preset.id),
  );
  const menuPresets = [
    ...builtInMenuPresets.filter(
      (preset) => preset.category === "Content-Type",
    ),
    ...customMenuPresets.filter((preset) => preset.category === "Content-Type"),
    ...builtInMenuPresets.filter((preset) => preset.category === "Extension"),
    ...customMenuPresets.filter((preset) => preset.category === "Extension"),
    ...builtInMenuPresets.filter((preset) => preset.category === "Magic Byte"),
    ...customMenuPresets.filter((preset) => preset.category === "Magic Byte"),
  ];

  for (const preset of menuPresets) {
    registerCommand(
      sdk,
      `uploadsmith.${preset.id}`,
      `${preset.category}: ${preset.label}`,
      groupForPreset(preset),
      preset,
      "replace",
    );
  }

  for (const preset of [
    ...MAGIC_BYTE_PRESETS.filter((preset) => menuPresetIdSet.has(preset.id)),
    ...customMenuPresets.filter((preset) => preset.category === "Magic Byte"),
  ].filter((preset) => preset.category === "Magic Byte")) {
    registerCommand(
      sdk,
      `uploadsmith.prepend.${preset.id}`,
      `Prepend: ${preset.label}`,
      `${COMMAND_GROUP_PREFIX}: Prepend Magic Bytes`,
      preset,
      "prepend",
    );
  }
};
