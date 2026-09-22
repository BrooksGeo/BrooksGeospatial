/**
 * Selected work restored from the pre-AI Brooks Geospatial site (0a898a5).
 * See CONTENT-SOURCES.md for image provenance and attribution.
 */
export const projects = Object.freeze([
  {
    slug: "property-intelligence",
    title: "Property Intelligence",
    headline: "Turning scattered property data into one clear report.",
    category: "Property intelligence",
    location: "Georgetown, Texas",
    image: "property-intelligence-report-cover",
    imageExt: "png",
    alt: "Property Intelligence Report showing parcel and FEMA flood screening for a Georgetown property",
    summary:
      "Parcel information, aerial imagery, mapped FEMA conditions, measured spatial analysis, and source documentation assembled into a concise property-specific research package.",
    description:
      "The sample report brings relevant public GIS research into a clear, property-specific deliverable. It combines a property snapshot, aerial and parcel mapping, measured FEMA conditions, source documentation, and practical limitations for preliminary land research.",
    deliverables: ["Property snapshot", "Aerial & parcel mapping", "FEMA flood analysis", "Source documentation"],
    gallery: [
      { image: "property-intelligence-report-aerial", imageExt: "png", alt: "Aerial and parcel map from the current Property Intelligence sample report" },
      { image: "property-intelligence-report-fema", imageExt: "png", alt: "FEMA analysis map from the current Property Intelligence sample report" },
    ],
    sampleReport: "/downloads/Brooks_Geospatial_Property_Intelligence_Sample.pdf",
  },
  {
    slug: "country-club-media",
    title: "A fresh perspective on the club",
    category: "Aerial imagery",
    location: "Fayette County, Texas",
    image: "country-club-aerial",
    alt: "Aerial view of a country club golf course, lake, and tree-lined fairways",
    summary:
      "A coordinated collection of aerial imagery, ground photography, and marketing media for a local country club.",
    description:
      "Wide aerial views show the course in its surroundings, while ground photography brings the spaces and details closer. This country club media package was created for use across the website, social media, member communications, and promotions.",
    deliverables: ["Aerial photography", "Ground photography", "Marketing media"],
    gallery: [
      { image: "country-club-green", alt: "Golf green surrounded by water at the country club" },
      {
        image: "country-club-courts",
        alt: "Country club tennis and pickleball courts photographed from above",
      },
      { image: "country-club-ground", alt: "Shaded grounds looking out toward the golf course" },
      {
        image: "country-club-interior",
        alt: "Dining and event details photographed inside the country club",
      },
    ],
  },
  {
    slug: "land-and-property",
    title: "Land, seen in context",
    category: "Aerial imagery",
    location: "Central Texas",
    image: "rural-property",
    alt: "Drone view of rural land, mature trees, open spaces, and surrounding properties",
    summary:
      "Aerial property imagery that puts the landscape, access, and surrounding land into one clear view.",
    description:
      "Aerial photography helps communicate the character of a property beyond what can be seen from the road. These images show the relationship between open land, tree cover, neighboring properties, and access routes.",
    deliverables: ["Property photography", "Wide aerial views", "Real estate imagery"],
    gallery: [
      { image: "aerial-land", alt: "Aerial view of a rural property with open fields and a pond" },
      { image: "land-overview", alt: "Property overview with an illustrative boundary overlay" },
    ],
    note: "Boundary overlays are illustrative and do not establish legal property boundaries.",
  },
  {
    slug: "parcel-mapping",
    title: "Making parcel data readable",
    category: "GIS & mapping",
    location: "La Grange, Texas",
    image: "parcel-map",
    alt: "Thematic parcel map of La Grange, Texas, with a legend and north arrow",
    summary:
      "A thematic map that turns parcel-level information into an organized view of the local landscape.",
    description:
      "GIS connects individual records to real locations. This La Grange parcel map uses a clear classification scheme, a legend, and geographic context to help readers see patterns across the town.",
    deliverables: ["Parcel mapping", "Data visualization", "Map production"],
    gallery: [],
  },
  {
    slug: "market-area-mapping",
    title: "The geography behind the market",
    category: "GIS & mapping",
    location: "Central Texas",
    image: "opportunity-map",
    alt: "Market study map showing development opportunities around a station area",
    summary: "Market-area, demographic, and development maps supporting real estate research.",
    description:
      "These maps bring together market boundaries, demographic geography, and development opportunity data. They reflect Mac’s experience translating spatial and market research into maps that communicate the study area and its underlying patterns.",
    attribution:
      "GIS work by Davis “Mac” Brooks at Capitol Market Research. Original map attribution is retained.",
    deliverables: ["Market-area mapping", "Demographic visualization", "Development research maps"],
    gallery: [
      { image: "market-area-map", alt: "Market study map with census block group boundaries" },
      { image: "household-map", alt: "Choropleth map showing projected households by geographic area" },
    ],
  },
  {
    slug: "property-visualization",
    title: "A clearer view of the site",
    category: "Site documentation",
    location: "Central Texas",
    image: "property-boundaries",
    alt: "Aerial property photograph with illustrative parcel outlines",
    summary:
      "Site imagery with visual overlays to help explain the land and communicate a property’s layout.",
    description:
      "Aerial views provide a useful foundation for conversations about a property. Visual overlays help orient the viewer and place individual areas in the context of the larger site.",
    deliverables: ["Site imagery", "Illustrative overlays", "Property documentation"],
    gallery: [
      {
        image: "land-overview",
        alt: "Aerial photograph showing a property within its surrounding landscape",
      },
    ],
    note: "Boundary overlays are illustrative and do not establish legal property boundaries.",
  },
  {
    slug: "utility-documentation",
    title: "Infrastructure in view",
    category: "Site documentation",
    location: "Central Texas",
    image: "utility-imagery",
    alt: "Utility poles and equipment photographed by drone in a rural landscape",
    summary: "Drone imagery for documenting utility infrastructure and its surroundings.",
    description:
      "An aerial perspective makes it easier to see infrastructure in relation to the surrounding site. Drone imagery supports visual review and provides a record that teams can reference as work progresses.",
    deliverables: ["Infrastructure imagery", "Visual documentation", "Site context"],
    gallery: [],
  },
]);
