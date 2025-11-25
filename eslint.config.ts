import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: globals.node,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx", ".js", ".jsx"],
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",
                },
            },
        },
        rules: {
            "no-unused-vars": "off",
            "no-console": "off",
            "no-duplicate-imports": "error"
        },
    },
    globalIgnores(["node_modules", "dist", ".env", ".env.*"])
]);
