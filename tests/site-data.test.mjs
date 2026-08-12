import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/data/projects.mjs";
import { site } from "../src/data/site.mjs";

test("projects have unique slugs and a transparent publication status", () => {
  assert.equal(projects.length, 3);
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    assert.ok(project.summary.length > 40);
    assert.ok(["in-progress", "published"].includes(project.status));
    if (project.dashboardUrl) {
      assert.match(project.dashboardUrl, /^https:\/\/www\.arcgis\.com\/apps\/dashboards\//);
      assert.ok(project.dashboardThumbnail, "dashboard links need a corresponding thumbnail");
    }
  }
});

test("public contact configuration does not expose an unapproved phone number", () => {
  assert.equal(site.contact.phone.public, false);
  assert.equal(site.contact.phone.display, "");
  assert.equal(site.contact.phone.href, "");
  assert.match(site.contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
