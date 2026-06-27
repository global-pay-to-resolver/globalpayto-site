import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const siteSpec = readFileSync(resolve("public/openapi.yaml"), "utf8");
const sdkSpec = readFileSync(resolve("../mypaytag-sdk/openapi/openapi.yaml"), "utf8");

if (siteSpec !== sdkSpec) {
  throw new Error(
    "public/openapi.yaml is out of sync with ../mypaytag-sdk/openapi/openapi.yaml",
  );
}

console.log("openapi_sync_ok");
