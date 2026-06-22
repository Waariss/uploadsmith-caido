<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useSDK } from "@/plugins/sdk";
import {
  DEFAULT_CONTEXT_MENU_PRESET_IDS,
  PRESET_GROUPS,
  isPresetCategory,
  normalizeCustomPresets,
  normalizeMenuPresetIds,
  type PresetCategory,
  type UploadPreset,
} from "@/presets";

const sdk = useSDK();
const query = ref("");
const copiedId = ref<string | undefined>();
const customPresets = ref<UploadPreset[]>([]);
const menuPresetIds = ref<string[]>([]);
const customCategory = ref<PresetCategory>("Extension");
const customLabel = ref("");
const customValue = ref("");
const customDescription = ref("");
const customShowInMenu = ref(false);
const importInput = ref<HTMLInputElement | undefined>();

const toDisplayValue = (value: string) =>
  value
    .replaceAll("\r", "\\r")
    .replaceAll("\n", "\\n")
    .replaceAll("\u0000", "\\0")
    .replaceAll("\u0003", "\\x03")
    .replaceAll("\u0004", "\\x04")
    .replaceAll("\u001a", "\\x1a")
    .replaceAll("\u0089", "\\x89")
    .replaceAll("\u00ff", "\\xff")
    .replaceAll("\u00d8", "\\xd8")
    .replaceAll("\u00e0", "\\xe0");

const presetGroups = computed(() =>
  PRESET_GROUPS.map((group) => {
    const presets = [
      ...group.presets,
      ...customPresets.value.filter((preset) => {
        if (group.title === "Extensions") {
          return preset.category === "Extension";
        }

        if (group.title === "Magic Bytes") {
          return preset.category === "Magic Byte";
        }

        return preset.category === group.title;
      }),
    ];

    return {
      ...group,
      presets,
    };
  }),
);

const filteredGroups = computed(() => {
  const needle = query.value.trim().toLowerCase();

  return presetGroups.value.map((group) => ({
    ...group,
    presets:
      needle.length === 0
        ? group.presets
        : group.presets.filter((preset) =>
            `${preset.label} ${preset.value} ${preset.description}`
              .toLowerCase()
              .includes(needle),
          ),
  })).filter((group) => group.presets.length > 0);
});

const copyPreset = async (preset: UploadPreset) => {
  await navigator.clipboard.writeText(preset.value);
  copiedId.value = preset.id;
};

const savePluginState = async (
  presets = customPresets.value,
  menuIds = menuPresetIds.value,
) => {
  customPresets.value = presets;
  menuPresetIds.value = menuIds;
  await sdk.storage.set({
    customPresets: presets,
    menuPresetIds: menuIds,
  });
};

const exportConfig = () => {
  const config = {
    version: 1,
    exportedAt: new Date().toISOString(),
    customPresets: customPresets.value,
    menuPresetIds: menuPresetIds.value,
  };
  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "uploadsmith-presets.json";
  anchor.click();
  URL.revokeObjectURL(url);
};

const importConfig = async (event: Event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const file = input.files?.[0];
  input.value = "";
  if (file === undefined) {
    return;
  }

  try {
    const parsed = JSON.parse(await file.text()) as unknown;
    const nextCustomPresets = normalizeCustomPresets(parsed);
    const nextMenuPresetIds = normalizeMenuPresetIds(parsed);
    await savePluginState(nextCustomPresets, nextMenuPresetIds);
    sdk.window.showToast("Imported UploadSmith presets. Reload Caido to apply context menu order.", {
      variant: "success",
      duration: 5000,
    });
  } catch {
    sdk.window.showToast("Could not import preset JSON", {
      variant: "error",
    });
  }
};

const resetContextMenu = async () => {
  await savePluginState(customPresets.value, [...DEFAULT_CONTEXT_MENU_PRESET_IDS]);
  sdk.window.showToast("Context menu defaults restored. Reload Caido to apply menu order.", {
    variant: "success",
    duration: 5000,
  });
};

const saveCustomPresets = async (presets: UploadPreset[]) => {
  customPresets.value = presets;
  await savePluginState(presets);
};

const isPresetShownInMenu = (preset: UploadPreset) => {
  if (preset.id.startsWith("custom-")) {
    return preset.showInMenu === true;
  }

  return menuPresetIds.value.includes(preset.id);
};

const togglePresetMenu = async (preset: UploadPreset, checked: boolean) => {
  if (preset.id.startsWith("custom-")) {
    const nextPresets = customPresets.value.map((customPreset) =>
      customPreset.id === preset.id
        ? {
            ...customPreset,
            showInMenu: checked,
          }
        : customPreset,
    );
    await savePluginState(nextPresets);
    sdk.window.showToast("Context menu selection saved. Reload Caido to apply menu order.", {
      variant: "info",
      duration: 5000,
    });
    return;
  }

  const nextMenuIds = checked
    ? [...new Set([...menuPresetIds.value, preset.id])]
    : menuPresetIds.value.filter((id) => id !== preset.id);
  await savePluginState(customPresets.value, nextMenuIds);
  sdk.window.showToast("Context menu selection saved. Reload Caido to apply menu order.", {
    variant: "info",
    duration: 5000,
  });
};

const onPresetMenuChange = (preset: UploadPreset, event: Event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  void togglePresetMenu(preset, input.checked);
};

const addCustomPreset = async () => {
  const label = customLabel.value.trim();
  const value = customValue.value;
  const description = customDescription.value.trim();

  if (label.length === 0 || value.length === 0) {
    sdk.window.showToast("Label and value are required", {
      variant: "warning",
    });
    return;
  }

  if (!isPresetCategory(customCategory.value)) {
    sdk.window.showToast("Invalid preset category", {
      variant: "error",
    });
    return;
  }

  const preset: UploadPreset = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    category: customCategory.value,
    label,
    value,
    description:
      description.length === 0 ? `Custom ${customCategory.value} preset.` : description,
    showInMenu: customShowInMenu.value,
  };

  const nextPresets = [...customPresets.value, preset];
  await savePluginState(nextPresets);

  customLabel.value = "";
  customValue.value = "";
  customDescription.value = "";
  customShowInMenu.value = false;
  sdk.window.showToast(
    preset.showInMenu === true
      ? `Added ${preset.label}. Reload Caido to apply context menu order.`
      : `Added ${preset.label}`,
    {
      variant: "success",
      duration: 5000,
    },
  );
};

const removeCustomPreset = async (presetId: string) => {
  await saveCustomPresets(
    customPresets.value.filter((preset) => preset.id !== presetId),
  );
  sdk.window.showToast("Custom preset removed from the page. Reload Caido to refresh context menu entries.", {
    variant: "info",
    duration: 5000,
  });
};

onMounted(() => {
  const storage = sdk.storage.get();
  customPresets.value = normalizeCustomPresets(storage);
  menuPresetIds.value = normalizeMenuPresetIds(storage);
  sdk.storage.onChange((value) => {
    customPresets.value = normalizeCustomPresets(value);
    menuPresetIds.value = normalizeMenuPresetIds(value);
  });
});
</script>

<template>
  <main class="uploadsmith">
    <section class="hero">
      <div>
        <p class="eyebrow">File Upload Helper</p>
        <h1>UploadSmith</h1>
        <p class="summary">
          Replace selected request text from the Caido context menu, or copy upload
          testing presets from this page.
        </p>
      </div>
      <input
        v-model="query"
        class="search"
        placeholder="Search content types, extensions, magic bytes"
        type="search"
      />
    </section>

    <section class="custom-panel">
      <div class="group-heading">
        <h2>Manage Presets</h2>
        <span>Saved locally in this Caido plugin</span>
      </div>

      <div class="preset-actions">
        <button type="button" @click="exportConfig">Export JSON</button>
        <button type="button" @click="importInput?.click()">Import JSON</button>
        <button type="button" @click="resetContextMenu">
          Reset Context Menu
        </button>
        <input
          ref="importInput"
          accept="application/json,.json"
          class="hidden-file"
          type="file"
          @change="importConfig"
        />
      </div>

      <h3>Add Custom Preset</h3>
      <form class="custom-form" @submit.prevent="addCustomPreset">
        <label>
          Category
          <select v-model="customCategory">
            <option value="Content-Type">Content-Type</option>
            <option value="Extension">Extension</option>
            <option value="Magic Byte">Magic Byte</option>
          </select>
        </label>
        <label>
          Label
          <input v-model="customLabel" placeholder=".php16.jpg" />
        </label>
        <label class="wide">
          Value
          <textarea
            v-model="customValue"
            placeholder="Value to insert, replace, copy, or prepend"
            rows="3"
          />
        </label>
        <label class="wide">
          Description
          <input
            v-model="customDescription"
            placeholder="Optional note shown on the preset card"
          />
        </label>
        <label class="checkbox-row">
          <input v-model="customShowInMenu" type="checkbox" />
          Show in context menu
        </label>
        <button type="submit">Add Preset</button>
      </form>
    </section>

    <section v-for="group in filteredGroups" :key="group.title" class="group">
      <div class="group-heading">
        <h2>{{ group.title }}</h2>
        <span>{{ group.presets.length }} presets</span>
      </div>

      <div class="preset-grid">
        <article v-for="preset in group.presets" :key="preset.id" class="preset">
          <div class="preset-main">
            <strong>{{ preset.label }}</strong>
            <code>{{ toDisplayValue(preset.value) }}</code>
            <p>{{ preset.description }}</p>
            <label class="card-checkbox">
              <input
                :checked="isPresetShownInMenu(preset)"
                type="checkbox"
                @change="onPresetMenuChange(preset, $event)"
              />
              Context menu
            </label>
          </div>
          <button type="button" @click="copyPreset(preset)">
            {{ copiedId === preset.id ? "Copied" : "Copy" }}
          </button>
          <button
            v-if="preset.id.startsWith('custom-')"
            class="danger"
            type="button"
            @click="removeCustomPreset(preset.id)"
          >
            Remove
          </button>
        </article>
      </div>
    </section>

    <div v-if="filteredGroups.length === 0" class="empty">
      No presets match the current search.
    </div>
  </main>
</template>
