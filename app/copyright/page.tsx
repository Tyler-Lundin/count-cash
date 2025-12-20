import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright Notice",
  description: "Ownership, permitted use, and notices for Cash Tools.",
};

export default function CopyrightPage() {
  const year = new Date().getFullYear();
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Copyright Notice</h1>
        <p className="mt-1 text-xs text-neutral-500">© {year}. All rights reserved.</p>
      </header>

      <div className="space-y-6 text-sm leading-6 text-neutral-800 dark:text-neutral-200">
        <section>
          <h2 className="text-lg font-semibold mb-2">Ownership</h2>
          <p>
            The content, design, and code for Cash Tools are protected by copyright and other applicable laws. All rights are reserved by the site owner unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Permitted Use</h2>
          <p>
            You may view and use the tools for personal or internal business purposes. Except as permitted by law, you may not copy, modify, distribute, or republish the content or code without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Trademarks</h2>
          <p>
            Third‑party names, logos, and trademarks used on this site are the property of their respective owners and are used for identification purposes only. No endorsement or affiliation is implied.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">No Warranties</h2>
          <p>
            The tools are provided on an “as is” and “as available” basis, without warranties of any kind, express or implied. Use at your own discretion and risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, the site owner shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising from your use of the site or tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Copyright Concerns</h2>
          <p>
            If you believe any content on this site infringes your rights, please contact the site owner with sufficient detail to identify the material and your rights. We will review and respond appropriately.
          </p>
          <p>
            Contact: <a href="https://tylerweb.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">tylerweb.dev</a>
          </p>
        </section>
      </div>
    </div>
  );
}
