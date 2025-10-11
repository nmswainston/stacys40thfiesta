import React from "react";
import site from "../data/siteData";
import GlassPanel from "../components/layout/GlassPanel";

export default function Faq(){
  return (
    <section className="bg-transparent py-14">
      <div className="max-w-4xl mx-auto px-4">
        <GlassPanel>
          <div className="text-center mb-10">
            <h2 className="heading-display text-4xl text-ink">{site.faq.heading}</h2>
            <div className="rule-ornate mt-6 mx-auto" />
          </div>
          <div className="mt-6 grid gap-4">
        {site.faq.questions.map((f,i)=> (
          <details key={i} className="card-base">
            <summary className="font-extrabold cursor-pointer">{f.question}</summary>
            <p className="mt-2 opacity-80">{f.answer}</p>
          </details>
        ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}