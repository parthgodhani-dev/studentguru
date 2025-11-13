import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");

function checkCssImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      checkCssImports(fullPath);
    } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const matches = content.match(/import\s+['"].*\.css['"]/g) || [];

      matches.forEach((line) => {
        const cssPath = line.match(/['"](.*\.css)['"]/)[1];
        const resolvedPath = path.resolve(dir, cssPath);
        if (!fs.existsSync(resolvedPath)) {
          console.log(`❌ Missing: ${cssPath} (imported in ${fullPath})`);
        } else {
          console.log(`✅ Found: ${cssPath}`);
        }
      });
    }
  }
}

console.log("🔍 Scanning for CSS imports...\n");
checkCssImports(SRC_DIR);
console.log("\n✅ Scan complete!");
