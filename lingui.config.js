/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "hi", "mr", "ta", "ml", "te", "gu"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
      exclude: ["**/node_modules/**"]
    }
  ],
  format: "minimal",
  formatOptions: {
    lineNumbers: false
  },
  orderBy: "messageId",
  pseudoLocale: "pseudo",
  fallbackLocales: {
    default: "en"
  }
};