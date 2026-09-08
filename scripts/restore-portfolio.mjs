import { execFileSync } from "node:child_process";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import sharp from "sharp";
import { feature } from "topojson-client";

// Recover only imagery that appeared on the pre-AI public website.
const sourceCommit = "0a898a5";
const assets = {
  "country-club-aerial": "DroneStills/FAVCC_2026_Full-4.jpg",
  "country-club-green": "DroneStills/FAVCC_2026_Full-14.jpg",
  "country-club-courts": "DroneStills/FAVCC_2026_Full-3.jpg",
  "country-club-ground": "GroundStills/FAVCC_2026_Full-17.jpg",
  "country-club-detail": "GroundStills/FAVCC_2026_Full-39.jpg",
  "country-club-interior": "GroundStills/FAVCC_2026_Full-60.jpg",
  "property-boundaries": "realproject4.jpg",
  "rural-property": "realproject5.JPG",
  "land-overview": "realproject6.jpg",
  "opportunity-map": "mapproject1.jpeg",
  "market-area-map": "mapproject2.jpeg",
  "household-map": "mapproject3.jpeg",
  "parcel-map": "service-gis.jpg",
  "aerial-land": "service-aerial.jpg",
  "utility-imagery": "service-utility.jpg",
};
await mkdir("public/images/work", { recursive: true });
for (const [name, path] of Object.entries(assets)) {
  const source = execFileSync("git", ["show", `${sourceCommit}:public/${path}`], {
    maxBuffer: 40 * 1024 * 1024,
  });
  await sharp(source)
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(`public/images/work/${name}.webp`);
  await sharp(source)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`public/images/work/${name}-small.webp`);
}
await sharp("public/headshot.jpg")
  .rotate()
  .resize({ width: 900, withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile("public/images/mac-brooks.webp");
const topology = JSON.parse(await readFile("node_modules/world-atlas/land-110m.json", "utf8"));
await mkdir("public/data", { recursive: true });
await writeFile("public/data/land.json", JSON.stringify(feature(topology, topology.objects.land)));
console.log(
  `Restored ${Object.keys(assets).length} source photos and maps, optimized portrait, and globe geography.`,
);
