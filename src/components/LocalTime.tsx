"use client";

import { useEffect, useState } from "react";

type LocalTimeProps = {
  /** IANA zone (e.g. America/New_York). Omit to use the visitor’s local timezone. */
  timezone?: string;
  label?: string;
};

export function LocalTime({ timezone, label = "Your local time" }: LocalTimeProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      };
      if (timezone) {
        options.timeZone = timezone;
      }
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    format();
    const id = window.setInterval(format, 30_000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return (
    <span>
      {label} · {time || "—"}
    </span>
  );
}
