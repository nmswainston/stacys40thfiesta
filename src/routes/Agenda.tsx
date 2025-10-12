import { GlassPanel } from "@components/layout";
import site from "@data/siteData";

export default function Agenda(){
  return (
    <section className="bg-transparent py-8 sm:py-12 md:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <GlassPanel className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl text-ink">{site.sections.agenda.heading}</h2>
            <div className="rule-ornate mt-3 sm:mt-4 md:mt-5 mx-auto" />
            <p className="opacity-80 mt-4 sm:mt-6 text-brand-700/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">{site.sections.agenda.subheading}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8">
        {site.agenda.map((s,i)=> (
          <article key={i} className="card-base flex flex-col h-full">
            <div className="flex items-start gap-3 mb-3">
              {s.icon.startsWith('/') ? (
                <img src={s.icon} alt={`${s.title} icon`} className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              ) : (
                <div className="text-2xl sm:text-3xl flex-shrink-0" role="img" aria-label={`${s.title} icon`}>{s.icon}</div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-extrabold leading-tight break-words">{s.day}</h3>
                <div className="font-semibold text-sm sm:text-base mt-1 leading-tight">{s.title}</div>
              </div>
            </div>
            <div className="text-xs sm:text-sm opacity-80 mt-2 flex-1 leading-relaxed">{s.details}</div>
            {s.link && <a className="link mt-3 inline-block text-xs sm:text-sm" href={s.link} target="_blank" rel="noreferrer">Learn more →</a>}
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm mt-3 pt-3 border-t border-secondary/20">
              <div className="flex items-center gap-1.5">
                <img src="/assets/stopwatch.svg" alt="time" className="w-4 h-4" />
                <span>{s.time}</span>
              </div>
              {s.estimatedCost && (
                <div className="flex items-center gap-1.5 opacity-70">
                  <img src="/assets/money-bag.svg" alt="money bag" className="w-4 h-4" />
                  <span>{s.estimatedCost}</span>
                </div>
              )}
            </div>
          </article>
        ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

