import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { projects } from "../src/data/projects.mjs";
import { site } from "../src/data/site.mjs";

test("portfolio routes are unique and every referenced image is available", () => {
  assert.ok(projects.length > 0);
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    assert.ok(project.summary.length > 40);
    assert.ok(["GIS & mapping", "Aerial imagery", "Site documentation"].includes(project.category));
    for (const image of [project.image, ...project.gallery.map((photo) => photo.image)]) {
      for (const suffix of ["", "-small"]) {
        assert.ok(
          existsSync(new URL(`../public/images/work/${image}${suffix}.webp`, import.meta.url)),
          `Missing image: ${image}${suffix}`,
        );
      }
    }
  }
});

test("public contact configuration does not expose an unapproved phone number", () => {
  assert.equal(site.contact.phone.public, false);
  assert.equal(site.contact.phone.display, "");
  assert.equal(site.contact.phone.href, "");
  assert.match(site.contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
