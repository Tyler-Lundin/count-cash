import React from 'react';

type Props = React.PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export default function Card({ title, className, children }: Props) {
  return (
    <section
      className={
        'rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-[var(--background)] text-[var(--foreground)] shadow-sm ' +
        'p-3 sm:p-4 ' +
        (className ?? '')
      }
    >
      {title ? (
        <h2 className="text-base font-semibold mb-2 text-[var(--foreground)]">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
