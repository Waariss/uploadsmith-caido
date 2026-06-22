import type { DefineAPI, SDK } from "caido:plugin";

export type API = DefineAPI<Record<string, never>>;

export function init(sdk: SDK<API>) {
  sdk.console.log("UploadSmith backend initialized");
}
