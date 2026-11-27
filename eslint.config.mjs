import next from "eslint-config-next/core-web-vitals";
import ts from "eslint-config-next/typescript";

const config = [
  ...next,
  ...ts,
  // Export static: imaginile sunt deja optimizate (WebP + srcset) în components/Photo.tsx.
  { rules: { "@next/next/no-img-element": "off" } },
  { ignores: [".next/**", "out/**", "next-env.d.ts"] },
];
export default config;
