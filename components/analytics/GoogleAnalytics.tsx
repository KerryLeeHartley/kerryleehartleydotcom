// ============================================================================
// GOOGLE ANALYTICS 4 - Next.js Integration (UPDATED FOR TELEPROMPTER)
// ============================================================================
// What: GA4 tracking with custom events + teleprompter analytics
// Why: Track user behavior, conversions, and teleprompter usage
// How: Script injection + custom event tracking + timer-based metrics
// ============================================================================

"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// ============================================================================
// CONFIGURATION
// ============================================================================
const GA_MEASUREMENT_ID = "G-LZBLFZJSS4";

// ============================================================================
// PAGE VIEW TRACKING WITH TIMER
// ============================================================================
function GoogleAnalyticsTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);

      // Track time on page
      const startTime = Date.now();

      return () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        if (timeSpent > 5) {
          // Only track if > 5 seconds
          trackTimeOnPage(pathname, timeSpent);
        }
      };
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsTracking />
      </Suspense>
    </>
  );
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// ============================================================================
// TELEPROMPTER-SPECIFIC TRACKING
// ============================================================================

// Track session start
export const trackTeleprompterSessionStart = (
  scriptTitle: string,
  wordCount: number
) => {
  event({
    action: "session_start",
    category: "Teleprompter",
    label: scriptTitle,
    value: wordCount,
  });
};

// Track voice tracking usage
export const trackVoiceTrackingToggle = (
  enabled: boolean,
  duration?: number
) => {
  event({
    action: enabled ? "voice_tracking_start" : "voice_tracking_stop",
    category: "Teleprompter",
    label: enabled ? "Started" : "Stopped",
    value: duration,
  });
};

// Track session completion
export const trackTeleprompterSessionComplete = (
  scriptTitle: string,
  durationSeconds: number,
  wordsCompleted: number,
  completionPercentage: number
) => {
  event({
    action: "session_complete",
    category: "Teleprompter",
    label: scriptTitle,
    value: completionPercentage,
  });

  if (completionPercentage >= 80) {
    event({
      action: "script_completed",
      category: "Conversion",
      label: scriptTitle,
      value: durationSeconds,
    });
  }
};

// Track feature usage
export const trackFeatureUsage = (feature: string, enabled: boolean) => {
  event({
    action: "feature_toggle",
    category: "Teleprompter",
    label: `${feature}: ${enabled ? "ON" : "OFF"}`,
  });
};

// Track time on page
export const trackTimeOnPage = (page: string, seconds: number) => {
  event({
    action: "time_on_page",
    category: "Engagement",
    label: page,
    value: seconds,
  });
};

// Track script actions
export const trackScriptAction = (action: string, scriptTitle?: string) => {
  event({
    action: `script_${action}`,
    category: "Teleprompter",
    label: scriptTitle || "New Script",
  });
};

// ============================================================================
// EXISTING TRACKING (KEPT FOR OTHER PAGES)
// ============================================================================

export const trackVideoPlay = (videoName: string, company: string) => {
  event({
    action: "video_play",
    category: "VSL",
    label: `${company} - ${videoName}`,
  });
};

export const trackCalendlyClick = (company: string, source: string) => {
  event({
    action: "calendly_click",
    category: "Conversion",
    label: `${company} - ${source}`,
  });
};

export const trackDownload = (fileType: string, company: string) => {
  event({
    action: "download",
    category: "Files",
    label: `${fileType} - ${company}`,
  });
};

export const trackProjectClick = (projectName: string) => {
  event({
    action: "project_click",
    category: "Projects",
    label: projectName,
  });
};

export const trackNavClick = (destination: string) => {
  event({
    action: "nav_click",
    category: "Navigation",
    label: destination,
  });
};

export const trackScrollDepth = (depth: number, page: string) => {
  event({
    action: "scroll_depth",
    category: "Engagement",
    label: page,
    value: depth,
  });
};

export const trackContactSubmission = (source: string) => {
  event({
    action: "contact_submit",
    category: "Conversion",
    label: source,
  });
};
