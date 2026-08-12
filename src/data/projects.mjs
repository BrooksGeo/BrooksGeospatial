/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} title
 * @property {"in-progress" | "published"} status
 * @property {string} summary
 * @property {string[]} focus
 * @property {string[]} deliverables
 * @property {string} description
 * @property {string} [repositoryUrl]
 * @property {string} [dashboardUrl]
 * @property {{ src: string, alt: string, width: number, height: number }} [dashboardThumbnail]
 */

/** @type {readonly Project[]} */
export const projects = Object.freeze([
  {
    slug: "spatial-data-qa-toolkit",
    title: "Spatial Data QA Toolkit",
    status: "in-progress",
    summary:
      "A reusable quality-assurance toolkit for checking the spatial and tabular conditions that make GIS outputs defensible.",
    focus: [
      "CRS, units, extent, and spatial-tolerance checks",
      "Geometry, topology, schema, null, duplicate, and orphan-record review",
      "Documented workflow checks that can be rerun as data changes",
    ],
    deliverables: [
      "Documented QA task set",
      "Expected checks and review criteria",
      "Python-assisted checks where appropriate",
      "Workflow and exception documentation",
    ],
    description:
      "This project is being developed as a structured approach to GIS and spatial-data QA. Its scope is focused on the checks that prevent plausible-looking outputs from passing when coordinate systems, geometry, joins, or records are wrong.",
    dashboardUrl: "https://www.arcgis.com/apps/dashboards/28b04393774f4925b7f613c5cd7c3a70",
    dashboardThumbnail: {
      src: "/images/geoqa-spatial-data-evaluation-dashboard.webp",
      alt: "Brooks GeoQA Spatial Data Evaluation dashboard showing a map with QA findings and a validation-check chart.",
      width: 960,
      height: 473,
    },
  },
  {
    slug: "geoeval-benchmark",
    title: "GeoEval Benchmark",
    status: "in-progress",
    summary:
      "A benchmark design for testing whether AI systems can execute realistic GIS tasks with reproducible, reviewable results.",
    focus: [
      "Realistic ArcGIS and QGIS task design",
      "Expert reference outputs and objective scoring rubrics",
      "Failure reports and regression cases for repeatable evaluation",
    ],
    deliverables: [
      "Task library",
      "Inputs and reference outputs",
      "Scoring rubric",
      "Failure taxonomy and regression pack",
    ],
    description:
      "GeoEval is an in-progress benchmark concept for evaluating geospatial AI against real GIS work. Public project material will exclude confidential client data, proprietary datasets, and unsupported performance claims.",
  },
  {
    slug: "texas-geocoder-evaluation",
    title: "Texas Geocoder Evaluation",
    status: "in-progress",
    summary:
      "An in-progress evaluation design for reviewing geocoder and location-search outputs against transparent spatial criteria.",
    focus: [
      "Address and location-query task design",
      "Coordinate, match-quality, and spatial-tolerance review",
      "Documented failures for retesting after system changes",
    ],
    deliverables: [
      "Evaluation task set",
      "Reference locations and review notes",
      "Objective scoring criteria",
      "Failure report and regression cases",
    ],
    description:
      "This project is being developed to show how geocoding and location-search systems can be evaluated beyond whether a returned point merely looks plausible on a map.",
  },
]);
