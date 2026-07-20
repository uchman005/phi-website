// ---------------------------------------------------------------------------
// Single seam for ops alerts (failed payments, cancelled subscriptions,
// webhook signature failures). Today this only writes a structured log line
// — visible in your hosting provider's function logs — so nothing here
// depends on credentials this codebase doesn't have.
//
// To get real alerts (email/Slack), extend the body of `notifyOps` to POST
// to your provider of choice, e.g.:
//   - Slack incoming webhook: fetch(process.env.SLACK_WEBHOOK_URL, {...})
//   - Resend/SendGrid email API
// Every call site in this codebase already goes through this one function,
// so wiring up a real channel later is a one-file change.
// ---------------------------------------------------------------------------

export async function notifyOps(
  subject: string,
  details: Record<string, unknown>
): Promise<void> {
  console.error(`[ops-alert] ${subject}`, JSON.stringify(details));
}
