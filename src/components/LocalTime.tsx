"use client";

import { useEffect, useState } from "react";

type LocalTimeProps = {
  /** IANA zone (e.g. America/New_York). Omit to use the visitor’s local timezone. */
  timezone?: string;
  /** Override the detected place label. */
  label?: string;
};

function formatTime(timezone?: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };
  if (timezone) {
    options.timeZone = timezone;
  }
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

function cityFromTimezone(timezone: string) {
  const segment = timezone.split("/").pop();
  if (!segment) return null;
  return segment.replace(/_/g, " ");
}

export function LocalTime({ timezone, label }: LocalTimeProps) {
  const [time, setTime] = useState("");
  const [place, setPlace] = useState(label ?? "");

  useEffect(() => {
    if (label) return;

    let cancelled = false;

    const detectCity = async () => {
      try {
        const response = await fetch("https://ipwho.is/");
        if (response.ok) {
          const data = (await response.json()) as {
            success?: boolean;
            city?: string;
          };
          if (!cancelled && data.success && data.city) {
            setPlace(data.city);
            return;
          }
        }
      } catch {
        // Fall back to timezone-based place name.
      }

      if (!cancelled) {
        const zone = timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
        setPlace(cityFromTimezone(zone) ?? "Your local time");
      }
    };

    void detectCity();

    return () => {
      cancelled = true;
    };
  }, [label, timezone]);

  useEffect(() => {
    const tick = () => setTime(formatTime(timezone));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [timezone]);

  const displayPlace = label ?? (place || "Your local time");

  return (
    <span>
      {displayPlace} · {time || "—"}
    </span>
  );
}
