export type AnalyticsEvent =
  | "resume_download"
  | "project_repo_click"
  | "dashboard_click"
  | "demo_click"
  | "contact_form_start"
  | "contact_form_submission"
  | "email_click";

export function trackAnalytics(event: AnalyticsEvent | string, properties: Record<string, string> = {}) {
  window.dispatchEvent(new CustomEvent("brooks:analytics", { detail: { event, properties } }));
  const tracker = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof tracker === "function") tracker("event", event, properties);
}
