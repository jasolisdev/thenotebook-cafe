/**
 * @fileoverview Sanity CMS Studio page
 * @module pages/studio
 *
 * @description
 * Embedded Sanity CMS Studio for content management.
 * Provides full CMS interface for managing blog posts, menu items,
 * settings, subscribers, and all content types.
 *
 * Key features:
 * - Embedded Sanity Studio interface
 * - Authenticated access (requires Sanity credentials)
 * - Full content management capabilities
 * - Force-static rendering for optimal performance
 *
 * @route /studio
 * @access protected (Sanity authentication required)
 *
 * @example
 * Route: /studio
 * Displays: Sanity CMS Studio interface
 *
 * @see {@link sanity/sanity.config.ts} for Studio configuration
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
