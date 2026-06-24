const fs = require("fs");
const path = require("path");

const kitsDir = path.join(__dirname, "src/components/rich-text/kits");
const files = fs
  .readdirSync(kitsDir)
  .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));

for (const file of files) {
  const content = fs.readFileSync(path.join(kitsDir, file), "utf8");
  const matches = [
    ...content.matchAll(/([A-Za-z0-9_]+Plugin)\.withComponent/g),
  ];
  if (matches.length > 0) {
    console.log(`\n--- ${file} ---`);
    matches.forEach((m) => console.log(m[1]));
  }
}
