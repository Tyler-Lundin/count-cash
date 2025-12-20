"use client";
import React from 'react';
import Card from './Card';

type Props = {
  confirmed: boolean;
  onConfirm: () => void;
  onEdit: () => void;
  onReset: () => void;
  onCopy?: () => void;
};

export default function ActionsBar({ confirmed, onConfirm, onEdit, onReset, onCopy }: Props) {
  return (
    <Card>
      <div className="flex justify-end gap-2">
        {!confirmed ? (
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 h-10 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black"
          >
            Confirm Count
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onEdit}
              className="px-4 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700"
            >
              Edit
            </button>
            {onCopy && (
              <button
                type="button"
                onClick={onCopy}
                className="px-4 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700"
              >
                Copy total
              </button>
            )}
            <button
              type="button"
              onClick={onReset}
              className="px-4 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </Card>
  );
}
