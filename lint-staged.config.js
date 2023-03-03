const path = require("path");

module.exports = {
  "**/*.(ts|tsx)": () => "npm tsc --noEmit",

  "**/*.(ts|tsx|js)": (filenames) => [
    `npm lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" --file ")}`,
    `npm prettier --write ${filenames.join(" ")}`,
  ],

  "**/*.(md|json)": (filenames) => `npm prettier --write ${filenames.join(" ")}`,
};
