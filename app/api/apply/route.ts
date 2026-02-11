import { handleCareersApplyPost } from "@/app/api/careers/apply/route";

/**
 * Legacy compatibility endpoint.
 * Routes old `/api/apply` submissions through the hardened careers handler.
 */
export async function POST(req: Request) {
  return handleCareersApplyPost(req, { rateLimitEndpoint: "/api/apply" });
}
