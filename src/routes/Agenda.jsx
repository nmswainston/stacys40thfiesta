import React from "react";
import site from "../data/siteData";
import GlassPanel from "../components/layout/GlassPanel";

export default function Agenda(){
  return (
    <section className="bg-transparent py-14">
      <div className="max-w-5xl mx-auto px-4">
        <GlassPanel className="p-8">
          <div className="text-center mb-10">
            <h2 className="heading-display text-4xl text-ink">{site.sections.agenda.heading}</h2>
            <div className="rule-ornate mt-3 mx-auto" />
            <p className="opacity-80 mt-6 text-brand-700/80">{site.sections.agenda.subheading}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
        {site.agenda.map((s,i)=> (
          <article key={i} className="card-base">
            <div className="text-2xl" role="img" aria-label={`${s.title} icon`}>{s.icon}</div>
            <h3 className="text-xl font-extrabold mt-2">{s.day}</h3>
            <div className="font-semibold mt-1">{s.title}</div>
            <div className="text-sm opacity-80 mt-1">{s.details}</div>
            {s.link && <a className="link mt-2 inline-block" href={s.link} target="_blank" rel="noreferrer">Learn more</a>}
            <div className="text-sm mt-3">🕐 {s.time}</div>
          </article>
        ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

