'use client';

import dayjs from 'dayjs';
import pluralize from 'pluralize';
import { useEffect, useState } from 'react';

pluralize.addPluralRule(/es/i, 'eses');

function calculateDiff() {
  const weddingDate = dayjs('2025-06-17T17:00:00-03:00');
  const now = dayjs();

  return weddingDate.diff(now);
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => calculateDiff());

  useEffect(() => {
    const interval = setInterval(() => {
      if (window) {
        setTimeLeft(calculateDiff());
      }
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const years = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );
  const days = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
  );
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {years > 0 && (
        <div className="flex flex-col items-center divide-y divide-foreground rounded-sm p-4 shadow-lg ring-1 ring-foreground">
          <span>{years}</span>
          <span>{pluralize('ano', years)}</span>
        </div>
      )}
      {months > 0 && (
        <div className="flex flex-col items-center divide-y divide-foreground rounded-sm p-4 shadow-lg ring-1 ring-foreground">
          <span>{months}</span>
          <span>{pluralize('mes', months)}</span>
        </div>
      )}
      {days > 0 && (
        <div className="flex flex-col items-center divide-y divide-foreground rounded-sm p-4 shadow-lg ring-1 ring-foreground">
          <span>
            <span>{days}</span>
          </span>
          <span>{pluralize('dia', days)}</span>
        </div>
      )}
      {hours > 0 && (
        <div className="flex flex-col items-center divide-y divide-foreground rounded-sm p-4 shadow-lg ring-1 ring-foreground">
          <span>{hours}</span>
          <span>{pluralize('hora', hours)}</span>
        </div>
      )}
      {minutes > 0 && (
        <div className="flex flex-col items-center divide-y divide-foreground rounded-sm p-4 shadow-lg ring-1 ring-foreground">
          <span>{minutes}</span>
          <span>{pluralize('minuto', minutes)}</span>
        </div>
      )}
    </section>
  );
}

export default Countdown;
