import React from "react";
import site from "../data/siteData";
import GlassPanel from "../components/layout/GlassPanel";

export default function Travel(){
  return (
    <section className="bg-transparent py-14">
      <div className="max-w-4xl mx-auto px-4">
        <GlassPanel>
          <div className="text-center mb-10">
            <h2 className="heading-display text-4xl text-ink">{site.travel.heading}</h2>
            <div className="rule-ornate mt-6 mx-auto" />
          </div>
          <div className="card-base">
            <ul className="space-y-3 list-disc ml-5">
              {site.travel.tips.map((t, i)=> <li key={i}>{t}</li>)}
            </ul>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}