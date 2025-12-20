import React from 'react';

type Props = React.PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export default function Card({ title, className, children }: Props) {
  return (
    <section
      className={
        'rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 shadow-sm ' +
        'p-4 ' +
        (className ?? '')
      }
    >
      {title ? (
        <h2 className="text-base font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

