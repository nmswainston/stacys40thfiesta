import React from "react";
import GlassPanel from "../components/layout/GlassPanel";
import CarpoolForm from "../features/carpool/CarpoolForm";

export default function Carpool() {
  return (
    <section className="bg-transparent py-14">
      <div className="max-w-4xl mx-auto px-4">
        <GlassPanel className="p-8">
          <div className="text-center mb-10">
            <h1 className="heading-display text-4xl text-ink">Carpool Coordination</h1>
            <div className="rule-ornate mt-6 mx-auto" />
            <p className="opacity-80 mt-6 text-brand-700/80">
              Driving from Arizona? Let's coordinate rides to maximize fun and minimize parking chaos!
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="card-base">
              <h3 className="text-xl font-bold text-brand-700">
                <span role="img" aria-label="car">🚗</span> Offering a Ride?
              </h3>
              <p className="text-sm opacity-80 mt-2">
                Got extra seats? Help fellow guests and share gas costs. We'll connect you with riders heading your way.
              </p>
            </div>

            <div className="card-base">
              <h3 className="text-xl font-bold text-brand-700">
                <span role="img" aria-label="raising hand">🙋</span> Need a Ride?
              </h3>
              <p className="text-sm opacity-80 mt-2">
                Looking for a lift? Submit your info and we'll match you with drivers from your area.
              </p>
            </div>
          </div>

          <div className="card-base mt-8">
            <h3 className="text-2xl font-extrabold mb-4">Sign Up</h3>
            <CarpoolForm />
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

