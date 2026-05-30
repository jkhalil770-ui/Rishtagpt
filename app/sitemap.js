export default async function sitemap() {
  const baseUrl = "https://rishtagpt.online";

  const staticPages = [
    "",
    "/form",
    "/privacy",
    "/terms",
    "/rules",
  ];

  const programmaticProfiles = [
    "/doctor-rishta-profile",
    "/engineer-rishta-profile",
    "/teacher-rishta-profile",
    "/businessman-rishta-profile",
    "/overseas-rishta-profile",
    "/software-engineer-rishta-profile",
  ];

  const allPages = [...staticPages, ...programmaticProfiles];

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.includes("-rishta-profile") ? 0.8 : 0.5,
  }));
}
