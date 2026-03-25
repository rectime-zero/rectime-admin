type Metric = {
  label: string;
  value: string;
  meta: string;
};

type Activity = {
  name: string;
  meta: string;
  tone: "green" | "blue" | "orange" | "red";
  status: string;
};

type AdminScreenPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: Metric[];
  activityTitle: string;
  activityHint: string;
  activities: Activity[];
  panelTitle: string;
  panelHint: string;
  checklist: Activity[];
};

export function AdminScreenPage({
  eyebrow,
  title,
  description,
  metrics,
  activityTitle,
  activityHint,
  activities,
  panelTitle,
  panelHint,
  checklist,
}: AdminScreenPageProps) {
  return (
    <div className="screen">
      <section className="screen__hero">
        <div className="screen-card screen-card--hero">
          <div className="screen__eyebrow">{eyebrow}</div>
          <h1 className="screen__title">{title}</h1>
          <p className="screen__description">{description}</p>
        </div>
        <div className="screen-card screen-card--panel list-panel">
          <div className="list-panel__header">
            <div className="list-panel__title">{panelTitle}</div>
            <div className="list-panel__hint">{panelHint}</div>
          </div>
          {checklist.map((item) => (
            <div key={`${item.name}-${item.status}`} className="list-row">
              <div>
                <div className="list-row__name">{item.name}</div>
                <div className="list-row__meta">{item.meta}</div>
              </div>
              <span className={`pill pill--${item.tone}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="screen__grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="screen-card metric">
            <div className="metric__label">{metric.label}</div>
            <div className="metric__value">{metric.value}</div>
            <div className="metric__meta">{metric.meta}</div>
          </article>
        ))}
      </section>

      <section className="screen-card screen-card--panel list-panel">
        <div className="list-panel__header">
          <div className="list-panel__title">{activityTitle}</div>
          <div className="list-panel__hint">{activityHint}</div>
        </div>
        {activities.map((activity) => (
          <div key={`${activity.name}-${activity.meta}`} className="list-row">
            <div>
              <div className="list-row__name">{activity.name}</div>
              <div className="list-row__meta">{activity.meta}</div>
            </div>
            <span className={`pill pill--${activity.tone}`}>
              {activity.status}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
