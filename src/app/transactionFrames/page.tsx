// Since the host of redirect link needs to be same as frame, this interim step is needed.
// Workaround is to redirect to your app, then have your app redirect in the Next.js config.
export default function RedirectPage() {
  return <h1>Redirecting...</h1>;
}
