"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./besty.module.css";

const HOST_REPLY =
  "Hi Amanda, you're very welcome! Thank you for letting us know. We completely understand, and we look forward to hosting you!";

const GUEST_OFFER = `Hi Amanda,
We are looking forward to your stay with us! As it is approaching, we see that your current checkout on Thursday, June 20th. We would like to offer you an extended night offer for $254 a night which is a discounted rate from the standard $354.

This price doesn't include taxes and fees, so keep that in mind. If you'd like to go ahead with this, just let me know and I'll send a request through Airbnb to update your reservation.`;

type View = "queue" | "chat";
type ChatPhase = "empty" | "drafting" | "sent";

type QueueRow = {
  id: string;
  initials: string;
  name: string;
  listing: string;
  portfolio: string;
  wait: string;
  waitUrgent?: boolean;
  sentiment: string;
  lastMessage: string;
  status: "claim" | "replying";
  replyingBy?: string;
  claimable?: boolean;
};

const INITIAL_ROWS: QueueRow[] = [
  {
    id: "wendy",
    initials: "WC",
    name: "Wendy Chu",
    listing: "Golden Sands 514",
    portfolio: "Coastal Homes",
    wait: "5h 10m",
    waitUrgent: true,
    sentiment: "😠",
    lastMessage: "We've been locked out for an hour, please respond.",
    status: "replying",
    replyingBy: "Sofia M. is replying",
  },
  {
    id: "maria",
    initials: "MA",
    name: "Maria Alvarez",
    listing: "Bayview Grand 204",
    portfolio: "Ocean City",
    wait: "3h 42m",
    waitUrgent: true,
    sentiment: "😠",
    lastMessage: "This is the third time I've asked about early checkin.",
    status: "replying",
    replyingBy: "Daniel K. is replying",
  },
  {
    id: "amanda",
    initials: "AM",
    name: "Amanda McSherry",
    listing: "9400 Building #1506",
    portfolio: "Ocean City",
    wait: "51m",
    waitUrgent: true,
    sentiment: "😊",
    lastMessage: "Thank you so much for reaching out!",
    status: "claim",
    claimable: true,
  },
  {
    id: "priya",
    initials: "PS",
    name: "Priya Shah",
    listing: "Century One #1008",
    portfolio: "Century Rentals",
    wait: "48m",
    sentiment: "😕",
    lastMessage: "I don't understand the cancellation policy.",
    status: "claim",
  },
  {
    id: "jordan",
    initials: "JL",
    name: "Jordan Lee",
    listing: "Makai 112",
    portfolio: "Ocean City",
    wait: "22m",
    sentiment: "😊",
    lastMessage: "Thanks, just double-checking the gate code.",
    status: "claim",
  },
  {
    id: "sam",
    initials: "SP",
    name: "Sam Patel",
    listing: "Orleans Court 317",
    portfolio: "Century Rentals",
    wait: "15m",
    sentiment: "😰",
    lastMessage: "Is late checkout still available tomorrow?",
    status: "claim",
  },
  {
    id: "tom",
    initials: "TR",
    name: "Tom Reyes",
    listing: "Harbour Club A5",
    portfolio: "Coastal Homes",
    wait: "4m",
    sentiment: "😰",
    lastMessage: "Can someone confirm parking before we arrive?",
    status: "claim",
  },
];

const REFRESHED_ROWS: QueueRow[] = [
  {
    id: "wendy",
    initials: "WC",
    name: "Wendy Chu",
    listing: "Golden Sands 514",
    portfolio: "Coastal Homes",
    wait: "5h 12m",
    waitUrgent: true,
    sentiment: "😠",
    lastMessage: "We've been locked out for an hour, please respond.",
    status: "replying",
    replyingBy: "Sofia M. is replying",
  },
  {
    id: "maria",
    initials: "MA",
    name: "Maria Alvarez",
    listing: "Bayview Grand 204",
    portfolio: "Ocean City",
    wait: "3h 44m",
    waitUrgent: true,
    sentiment: "😠",
    lastMessage: "This is the third time I've asked about early checkin.",
    status: "replying",
    replyingBy: "Daniel K. is replying",
  },
  {
    id: "priya",
    initials: "PS",
    name: "Priya Shah",
    listing: "Century One #1008",
    portfolio: "Century Rentals",
    wait: "50m",
    waitUrgent: true,
    sentiment: "😕",
    lastMessage: "I don't understand the cancellation policy.",
    status: "claim",
  },
  {
    id: "jordan",
    initials: "JL",
    name: "Jordan Lee",
    listing: "Makai 112",
    portfolio: "Ocean City",
    wait: "24m",
    sentiment: "😊",
    lastMessage: "Thanks, just double-checking the gate code.",
    status: "claim",
  },
  {
    id: "sam",
    initials: "SP",
    name: "Sam Patel",
    listing: "Orleans Court 317",
    portfolio: "Century Rentals",
    wait: "17m",
    sentiment: "😰",
    lastMessage: "Is late checkout still available tomorrow?",
    status: "claim",
  },
  {
    id: "tom",
    initials: "TR",
    name: "Tom Reyes",
    listing: "Harbour Club A5",
    portfolio: "Coastal Homes",
    wait: "6m",
    sentiment: "😰",
    lastMessage: "Can someone confirm parking before we arrive?",
    status: "claim",
  },
  {
    id: "nick",
    initials: "NR",
    name: "Nick Ruthr",
    listing: "Century One #2002",
    portfolio: "Century Rentals",
    wait: "1m",
    sentiment: "😊",
    lastMessage: "We've just left the apartment, thank you!",
    status: "claim",
  },
];

const THREADS = [
  {
    name: "Jacob Powell",
    listing: "Sunset Pointe 105",
    preview: "Hi Jacob, Your check-in date is getting close, an...",
    time: "4 days ago",
    stay: "Upcoming Stay",
  },
  {
    name: "Chris Mckissick",
    listing: "9400 Building #1007",
    preview: "Hi Chris! Check-in is Jun 7th, 2026 from 4:00...",
    time: "4 days ago",
    stay: "Upcoming Stay",
  },
  {
    name: "Shannon Kaiser",
    listing: "Golden Surf 801",
    preview: "Hi Shannon, Your check-in date is getting close...",
    time: "4 days ago",
    stay: "Upcoming Stay",
  },
  {
    name: "Tara Grant",
    listing: "Island Cabana 204",
    preview: "For late check-out, it's $84.80 for 11 AM,...",
    time: "4 days ago",
    stay: "Upcoming Stay",
  },
  {
    name: "Amanda McSherry",
    listing: "9400 Building #1506",
    preview: "Hi Amanda, you're very welcome! Thank you fo...",
    time: "4 days ago",
    stay: "Upcoming Stay",
    active: true,
  },
  {
    name: "Carolyn Muller",
    listing: "Makai 611",
    preview: "Hi Carolyn, just wanted to share some details...",
    time: "4 days ago",
    stay: "Upcoming Stay",
  },
  {
    name: "Kerrian Wanga",
    listing: "765 Deer Point",
    preview: "Hi Kerrian, just wanted to share some details...",
    time: "4 days ago",
    stay: "Upcoming Stay",
  },
];

const NAV = [
  {
    label: "INSIGHTS",
    items: [
      { id: "analytics", label: "Analytics", icon: "analytics.svg" },
      { id: "queue", label: "Message Queue", icon: "queue.svg" },
      { id: "roi", label: "ROI", icon: "roi.svg" },
      { id: "map", label: "Map", icon: "map.svg" },
    ],
  },
  {
    label: "GUEST COMMS",
    items: [
      { id: "messages", label: "Direct Messages", icon: "messages.svg" },
      { id: "phone", label: "Phone", icon: "phone.svg" },
      { id: "journeys", label: "Journeys", icon: "journeys.svg" },
      { id: "broadcast", label: "Broadcast", icon: "broadcast.svg" },
    ],
  },
  {
    label: "TEACH BESTY",
    items: [
      { id: "knowledge", label: "Knowledge Base", icon: "knowledge.svg" },
      { id: "workflows", label: "Workflows", icon: "workflows.svg" },
    ],
  },
  {
    label: "PORTFOLIO",
    items: [
      { id: "listings", label: "Listings", icon: "listings.svg" },
      { id: "locks", label: "Locks", icon: "locks.svg" },
    ],
  },
  {
    items: [
      { id: "review", label: "Review Responder", icon: "review.svg" },
      { id: "operations", label: "Operations", icon: "operations.svg" },
      { id: "settings", label: "Settings", icon: "settings.svg" },
      { id: "refer", label: "Refer a Besty", icon: "refer.svg" },
    ],
  },
] as const;

const TOOLBAR = [
  "call",
  "note",
  "translate",
  "email",
  "archive",
  "flag",
  "person",
  "download",
  "trash",
] as const;

const STAY_FIELDS = [
  { label: "Check-in", value: "Jun 14, 2026", muted: "4:00 PM" },
  { label: "Check-out", value: "Jun 18, 2026", muted: "10:00 AM" },
  { label: "Listing", value: "9400 Building #1506" },
  { label: "Channel", value: "Airbnb" },
  { label: "Total price", value: "$1,413.46" },
  { label: "Guests", value: "3 guests" },
  { label: "Booked", value: "May 3, 2026 10:12 PM" },
  { label: "Phone", value: "+1 864 483 2567" },
  { label: "PMS ID", value: "69f80095ccf4662b98710d9" },
];

function asset(file: string) {
  return `/proto/besty/${file}`;
}

function Icon({
  file,
  size,
  className,
}: {
  file: string;
  size: number;
  className?: string;
}) {
  return (
    <img
      src={asset(file)}
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
}

function JuneCalendar() {
  const cells = [
    "",
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  return (
    <div className={styles.cal}>
      <p className={styles.calTitle}>June 2026</p>
      <div className={styles.calGrid}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={`${d}-${i}`} className={styles.calDow}>
            {d}
          </span>
        ))}
        {cells.map((d, i) => {
          const n = typeof d === "number" ? d : 0;
          const stay = n >= 14 && n <= 18;
          const selected = n === 17;
          return (
            <span
              key={i}
              className={`${styles.calDay} ${stay ? styles.calStay : ""} ${
                selected ? styles.calSelected : ""
              }`}
            >
              {d || ""}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function WindowChrome({
  notify = false,
  onClose,
}: {
  notify?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className={`${styles.chrome} ${notify ? styles.chromeChat : ""}`}>
      {onClose ? (
        <button
          type="button"
          className={`${styles.dot} ${styles.dotClose}`}
          onClick={onClose}
          aria-label="Close"
        />
      ) : (
        <span className={styles.dot} />
      )}
      <span className={styles.dot} />
      <span className={styles.dot} />
      {notify ? (
        <p className={styles.notify}>
          To enable notifications <button type="button">click here</button>
        </p>
      ) : null}
    </div>
  );
}

function Sidebar({
  activeNav,
  onNav,
}: {
  activeNav: string;
  onNav: (id: string) => void;
}) {
  return (
    <aside className={styles.aside}>
      <div className={styles.brand}>
        <Icon file="logo.svg" size={40} className={styles.logo} />
        <span className={styles.brandName}>Besty AI</span>
      </div>

      <div className={styles.navScroll}>
        {NAV.map((group, gi) => (
          <div
            key={"label" in group ? group.label : `group-${gi}`}
            className={styles.navGroup}
          >
            {"label" in group ? (
              <p className={styles.navLabel}>{group.label}</p>
            ) : (
              <div className={styles.navRule} />
            )}
            {group.items.map((item) => {
              const active = item.id === activeNav;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.navItem} ${
                    active ? styles.navItemActive : ""
                  }`}
                  onClick={() => onNav(item.id)}
                >
                  <Icon file={item.icon} size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.asideFoot}>
        <p className={styles.callUs}>CALL US</p>
        <Icon file="collapse.svg" size={22} />
      </div>
    </aside>
  );
}

export function BestyPrototype() {
  const [view, setView] = useState<View>("queue");
  const [chatPhase, setChatPhase] = useState<ChatPhase>("empty");
  const [answeredAmanda, setAnsweredAmanda] = useState(false);
  const [draft, setDraft] = useState("");
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLastRefreshedAt(new Date());
  }, []);

  const stampRefresh = () => {
    setLastRefreshedAt(new Date());
  };

  const refreshed = answeredAmanda;
  const rows = refreshed ? REFRESHED_ROWS : INITIAL_ROWS;
  const overlayOpen = view === "chat";

  const goQueue = () => {
    setView("queue");
  };

  const claimAmanda = () => {
    setChatPhase("empty");
    setDraft("");
    setView("chat");
  };

  const openComposer = () => {
    if (chatPhase === "empty") {
      setDraft(HOST_REPLY);
      setChatPhase("drafting");
    }
  };

  const sendReply = () => {
    if (!draft.trim()) return;
    setChatPhase("sent");
    setAnsweredAmanda(true);
    stampRefresh();
    setDraft("");
  };

  useLayoutEffect(() => {
    if (!overlayOpen) return;
    const list = messagesRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [overlayOpen, chatPhase]);

  const onNav = (id: string) => {
    if (id === "queue") goQueue();
  };

  const charCount = draft.length;
  const refreshedLabel = lastRefreshedAt
    ? `Refreshed ${formatClock(lastRefreshedAt)}`
    : "Refreshed";

  const longestWait = refreshed ? "5h 12m" : "5h 10m";
  const avgWait = "1h 12m";

  return (
    <div className={styles.shell}>
      <div className={styles.app}>
        <WindowChrome />
        <div className={styles.body}>
          <Sidebar activeNav="queue" onNav={onNav} />
          <main className={styles.queue}>
            <div className={styles.filters}>
              <div className={styles.filterCard}>
                <button type="button" className={styles.chip}>
                  Last 7 days
                </button>
                <button type="button" className={styles.chip}>
                  Last 30 days
                </button>
                <button type="button" className={styles.chip}>
                  Last 90 days
                </button>
                <button type="button" className={`${styles.chip} ${styles.chipOn}`}>
                  All time
                </button>
                <button type="button" className={`${styles.chip} ${styles.chipWide}`}>
                  Custom range
                </button>
              </div>
              <button type="button" className={styles.exportBtn}>
                ↓  Export CSV
              </button>
              <div className={styles.kpi}>
                <p className={styles.kpiLabel}>Needs Reply</p>
                <p className={styles.kpiValue}>6</p>
              </div>
              <div className={styles.kpi}>
                <p className={styles.kpiLabel}>Avg Wait</p>
                <p className={styles.kpiValue}>{avgWait}</p>
              </div>
              <div className={styles.kpi}>
                <p className={styles.kpiLabel}>Longest Wait</p>
                <p className={styles.kpiValue}>{longestWait}</p>
              </div>
              <div className={styles.kpi}>
                <p className={styles.kpiLabel}>Portfolios</p>
                <p className={styles.kpiValue}>3</p>
              </div>
            </div>

            <section className={styles.tableCard}>
              <div className={styles.tableHead}>
                <h1>Message Queue</h1>
                <div className={styles.tabs}>
                  <button type="button" className={styles.tabOn}>
                    Needs Reply <span className={styles.badge}>6</span>
                  </button>
                  <span className={styles.tab}>
                    In Progress <span className={styles.badge}>3</span>
                  </span>
                  <span className={styles.tab}>
                    Resolved Today <span className={styles.badge}>12</span>
                  </span>
                  <button type="button" className={styles.portfolioSelect}>
                    All Portfolios ▾
                  </button>
                </div>
              </div>

              <div className={styles.cols}>
                <span>GUEST ↕</span>
                <span>LISTING / PORTFOLIO ↕</span>
                <span>WAITING ↕</span>
                <span className={styles.colSentiment}>SENTIMENT ↕</span>
                <span>LAST MESSAGE ↕</span>
                <span />
              </div>

              <ul className={styles.rows}>
                {rows.map((row) => (
                  <li key={row.id} className={styles.row}>
                    <div className={styles.guest}>
                      <span className={styles.avatar}>{row.initials}</span>
                      {row.claimable ? (
                        <button
                          type="button"
                          className={styles.guestNameBtn}
                          onClick={claimAmanda}
                        >
                          {row.name}
                        </button>
                      ) : (
                        <span className={styles.guestName}>{row.name}</span>
                      )}
                    </div>
                    <div className={styles.listing}>
                      <span>{row.listing}</span>
                      <small>{row.portfolio}</small>
                    </div>
                    <span
                      className={
                        row.waitUrgent ? styles.waitHot : styles.wait
                      }
                    >
                      {row.wait}
                    </span>
                    <span className={styles.sentiment}>{row.sentiment}</span>
                    <p className={styles.last}>{row.lastMessage}</p>
                    {row.status === "replying" ? (
                      <span className={styles.replying}>
                        <i />
                        {row.replyingBy}
                      </span>
                    ) : row.claimable ? (
                      <button
                        type="button"
                        className={styles.claim}
                        onClick={claimAmanda}
                      >
                        Claim
                      </button>
                    ) : (
                      <button type="button" className={styles.claim}>
                        Claim
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <div className={styles.tableFoot}>
                <button
                  type="button"
                  className={styles.refresh}
                  onClick={() => {
                    stampRefresh();
                    setAnsweredAmanda(true);
                  }}
                >
                  <Icon file="refresh.svg" size={16} className={styles.refreshIcon} />
                  {refreshedLabel}
                </button>
                <div className={styles.pager}>
                  <div className={styles.pagerLeft}>
                    <span>Rows per page:</span>
                    <span className={styles.pageSelect}>20 ▾</span>
                  </div>
                  <div className={styles.pagerRight}>
                    <span>Page 1 of 7</span>
                    <span className={styles.pageArrows}>‹  ›</span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {overlayOpen ? (
        <div
          className={styles.overlay}
          data-click-out=""
          onClick={goQueue}
        >
          <p className={styles.overlayHint}>
            Click outside the window to return to Message Queue
          </p>
          <div
            className={styles.overlayWindow}
            onClick={(e) => e.stopPropagation()}
          >
            <WindowChrome notify onClose={goQueue} />
            <div className={styles.body}>
              <Sidebar activeNav="messages" onNav={onNav} />
              <main className={styles.chat}>
            <div className={styles.threadList}>
              <div className={styles.searchRow}>
                <input
                  className={styles.search}
                  placeholder="Search conversations..."
                  readOnly
                />
                <button type="button" className={styles.iconBtn}>
                  +
                </button>
                <span className={styles.countBadge}>273</span>
              </div>
              <p className={styles.listHint}>
                Hi Kevin! Check-in is Jun 7th, 2026 from 4:00...
              </p>
              {THREADS.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  className={`${styles.thread} ${
                    t.active ? styles.threadOn : ""
                  }`}
                >
                  <div className={styles.threadTop}>
                    <strong>{t.name}</strong>
                    <span>{t.time}</span>
                  </div>
                  <div className={styles.threadMeta}>
                    <Icon file="listing.svg" size={14} />
                    <span>{t.listing}</span>
                    <em>{t.stay}</em>
                  </div>
                  <p>{t.preview}</p>
                </button>
              ))}
            </div>

            <section className={styles.conversation}>
              <header className={styles.convoHead}>
                <div>
                  <h1>Amanda McSherry</h1>
                  <p>
                    <Icon file="listing.svg" size={16} />
                    9400 Building #1506
                    <Icon file="copy.svg" size={14} />
                  </p>
                </div>
                <div className={styles.toolbar}>
                  {TOOLBAR.map((name) => (
                    <span key={name} className={styles.tool}>
                      <Icon file={`${name}.svg`} size={22} />
                    </span>
                  ))}
                </div>
              </header>

              <div className={styles.messages} ref={messagesRef}>
                <div className={styles.bubbleGuest}>
                  {GUEST_OFFER.split("\n").map((line, i) => (
                    <p key={i}>{line || "\u00a0"}</p>
                  ))}
                  <time>Sun, May 31 at 8:02 am</time>
                </div>
                <div className={styles.delivered}>
                  <Icon file="check.svg" size={16} />
                  3
                </div>
                <div className={styles.bubbleGuestNeutral}>
                  <p>
                    Thank you so much for reaching out! We&apos;ve got a event
                    the next day so we won&apos;t be able to extend our trip.
                    Looking forward to our stay, thanks!
                  </p>
                  <time>Sun, May 31 at 10:53 am</time>
                </div>
                <p className={styles.via}>
                  <Icon file="pms.svg" size={16} className={styles.pms} />
                  via PMS
                </p>
                {chatPhase === "sent" ? (
                  <div className={styles.bubbleHost}>
                    <p>{HOST_REPLY}</p>
                    <time>Host via PMS • Sun, May 31 at 11:04 am</time>
                  </div>
                ) : null}
              </div>

              <div className={styles.composer}>
                <textarea
                  className={styles.textarea}
                  placeholder="Type your message..."
                  value={draft}
                  onFocus={openComposer}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    if (chatPhase === "empty") setChatPhase("drafting");
                    if (chatPhase === "sent") setChatPhase("drafting");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendReply();
                    }
                  }}
                />
                <div className={styles.composerBar}>
                  <button type="button" className={styles.chevron}>
                    ⌄
                  </button>
                  <div className={styles.sendMeta}>
                    <span>Send to:</span>
                    <span className={styles.pmsChip}>
                      <Icon file="pms.svg" size={16} className={styles.pms} />
                      via PMS
                    </span>
                    <span className={styles.counter}>{charCount}/1600</span>
                    <button
                      type="button"
                      className={styles.send}
                      onClick={sendReply}
                      aria-label="Send"
                    >
                      <Icon file="send.svg" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <aside className={styles.rail}>
              <div className={styles.card}>
                <h2>
                  Amanda McSherry <span>😄</span>
                </h2>
                <p className={styles.link}>
                  <Icon file="pms.svg" size={16} className={styles.pms} />
                  View Airbnb profile
                  <Icon file="external.svg" size={14} />
                </p>
                <p className={styles.note}>This is their first stay with you.</p>
              </div>
              <div className={styles.card}>
                <span className={styles.pill}>Upcoming Stay</span>
                {STAY_FIELDS.map((field) => (
                  <div key={field.label} className={styles.field}>
                    <span>{field.label}</span>
                    <strong>
                      {field.value}
                      {field.muted ? <em> {field.muted}</em> : null}
                    </strong>
                  </div>
                ))}
                <div className={styles.field}>
                  <span>Reservation Tags</span>
                  <button type="button" className={styles.addTag}>
                    + Add Tags
                  </button>
                </div>
                <button type="button" className={styles.customFields}>
                  Guesty Custom Fields
                </button>
                <div className={styles.field}>
                  <span>Rental Agreement</span>
                  <strong className={styles.ok}>○ Completed</strong>
                </div>
                <p className={styles.link}>
                  View in Guesty
                  <Icon file="external.svg" size={14} />
                </p>
              </div>
              <div className={styles.toggles}>
                <span>○ Journeys</span>
                <span>○ Autopilot</span>
                <span>○ Upsells</span>
              </div>
              <JuneCalendar />
            </aside>
          </main>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
