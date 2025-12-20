import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy practices for Cash Tools by Tyler.",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-6 text-sm leading-6 text-neutral-800 dark:text-neutral-200">
        <section>
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p>
            Cash Tools is a set of simple utilities designed to run locally in your browser. We do not
            operate a backend for these tools. No accounts are required, and we do not sell or share your
            information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">No personal data is collected.</span> The app does not send any data to a server and does not use third‑party analytics or ad trackers.
            </li>
            <li>
              <span className="font-medium">Optional local storage.</span> If you enable persistence, recent inputs (like counts and target float) are saved only in your device’s browser storage so you can resume later.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Cookies & Local Storage</h2>
          <p>
            We do not use cookies. When enabled, the app may use <span className="font-medium">localStorage</span> to store your last settings or inputs. This data stays on your device and can be cleared at any time via your browser settings or the app’s reset controls.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">PWA & Offline Use</h2>
          <p>
            If installed as a Progressive Web App (PWA), select assets may be cached on your device to support offline use. Cached content is controlled by your browser and can be cleared via browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Children’s Privacy</h2>
          <p>
            The app is intended for general use and does not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Security</h2>
          <p>
            Because data is kept on your device, protecting your information primarily depends on your device’s security. We recommend keeping your operating system and browser up to date and using device protections.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be reflected on this page with an updated “Last updated” date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p>
            For questions about this policy, please contact the site owner via <a href="https://tylerweb.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">tylerweb.dev</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
