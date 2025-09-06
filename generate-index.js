import { readdirSync, writeFileSync, statSync } from "fs";
import { join, basename, extname, relative } from "path";

// Recursively get all .js/.jsx files in a folder
function getFilesRecursive(dir) {
  let results = [];
  const list = readdirSync(dir);
  list.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(fullPath));
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      results.push(fullPath);
    }
  });
  return results;
}

/**
 * Generate src/index.js for easier imports.
 * It will create named exports for files in services and modules,
 * and default exports for files in components and objects.
 * Add more folders as needed.
 */
const folders = [
  { path: join(process.cwd(), "src/components"), type: "default" },
  { path: join(process.cwd(), "src/objects"), type: "default" },
  { path: join(process.cwd(), "src/services"), type: "named" },
  { path: join(process.cwd(), "src/modules"), type: "named" }
];

let exportsArr = [];
/**
 * If you want to include a global CSS file, uncomment the next line and ensure the path is correct.
 * Make sure to have the appropriate loader in your build process to handle CSS imports.
 */
//exportsArr.push('import "./tailwind.css";');
folders.forEach(folder => {
  const files = getFilesRecursive(folder.path);
  files.forEach(file => {
    const name = basename(file, extname(file));
    const importPath = `./${relative(join(process.cwd(), "src"), file).replace(/\\/g, "/")}`;
    if (folder.type === "default") {
      exportsArr.push(`export { default as ${name} } from "${importPath}";`);
    } else if (folder.type === "named") {
      exportsArr.push(`export * from "${importPath}";`);
    }
  });
});

const content = exportsArr.join("\n");
writeFileSync(join(process.cwd(), "src/index.js"), content);
console.log("Generated index.js:\n", content);

/**
 * Generate wiki index.md for components, modules, objects, and services
 */
const wikiBaseDir = join(process.cwd(), "wiki");
const wikiIndexPath = join(wikiBaseDir, "index.md");

/**
 * Just add the folders you want to include in the index here.
 * The script will look for .md files in these folders.
 */
const wikiFolders = ["components", "modules", "objects", "services"];

try {
  let mdContent = "# Wiki Index\n\n";

  for (const folder of wikiFolders) {
    const fullPath = join(wikiBaseDir, folder);
    let mdFiles;
    try {
      mdFiles = readdirSync(fullPath).filter(f => f.endsWith(".md"));
    } catch {
      continue; // Skip if folder doesn't exist
    }

    if (mdFiles.length === 0) continue;

    mdFiles.sort((a, b) => a.localeCompare(b));

    mdContent += `## ${folder.charAt(0).toUpperCase() + folder.slice(1)}\n\n`;

    mdFiles.forEach(file => {
      const name = basename(file, ".md");
      const readableName = name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());

      mdContent += `- [${readableName}](${folder}/${file})\n`;
    });

    mdContent += "\n";
  }

  writeFileSync(wikiIndexPath, mdContent);
  console.log(`Generated wiki index at: ${wikiIndexPath}`);
} catch (err) {
  console.warn("Could not generate wiki index:", err.message);
}
