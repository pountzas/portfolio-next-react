import type { NextApiRequest, NextApiResponse } from "next";
import { getCachedProjectStats } from "../../lib/githubProjectCache";
import type { ProjectStatsById } from "../../lib/githubReleaseStats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ byId: ProjectStatsById } | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const byId = await getCachedProjectStats();
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120"
    );
    return res.status(200).json({ byId });
  } catch (error) {
    console.error("[api/project-stats]", error);
    return res.status(500).json({ message: "Failed to load project stats" });
  }
}
