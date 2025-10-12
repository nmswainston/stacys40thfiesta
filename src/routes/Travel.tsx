import React from "react";
import site from "@data/siteData";
import { GlassPanel } from "@components/layout";

export default function Travel(){
  return (
    <section className="bg-transparent py-8 sm:py-12 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <GlassPanel className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl text-ink">{site.travel.heading}</h2>
            <div className="rule-ornate mt-4 sm:mt-6 mx-auto" />
          </div>
          <div className="card-base">
            <ul className="space-y-2.5 sm:space-y-3 list-disc ml-4 sm:ml-5 text-sm sm:text-base leading-relaxed">
              {site.travel.tips.map((t, i)=> <li key={i} className="break-words">{t}</li>)}
            </ul>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
