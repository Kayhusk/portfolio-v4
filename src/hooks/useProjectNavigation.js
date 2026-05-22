"use client";
import { useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";
import { projects, getProjectIndexBySlug } from "@/data/projects";

/**
 * Hook for handling project navigation in the works carousel
 * Reads URL query parameters to determine initial project
 *
 * @returns {{
 *   initialProjectIndex: number,
 *   initialProject: object|null,
 *   getProjectUrl: (slug: string) => string,
 *   getExternalUrl: (slug: string) => string|null
 * }}
 */
export function useProjectNavigation() {
  const searchParams = useSearchParams();

  // Get the project slug from URL query params
  const projectSlug = searchParams.get("project");

  // Find the initial project index based on URL param
  const initialProjectIndex = useMemo(() => {
    if (!projectSlug) return 0;
    const index = getProjectIndexBySlug(projectSlug);
    return index >= 0 ? index : 0;
  }, [projectSlug]);

  // Get the initial project object
  const initialProject = useMemo(() => {
    return projects[initialProjectIndex] || null;
  }, [initialProjectIndex]);

  // Helper to generate internal project URL
  const getProjectUrl = useCallback((slug) => {
    return `/work?project=${slug}`;
  }, []);

  // Helper to get external URL for a project
  const getExternalUrl = useCallback((slug) => {
    const project = projects.find((p) => p.slug === slug);
    return project?.externalUrl || null;
  }, []);

  return {
    initialProjectIndex,
    initialProject,
    projectSlug,
    getProjectUrl,
    getExternalUrl,
  };
}

export default useProjectNavigation;
