import React from "react";
import { Link } from "react-router-dom";
import GlassPanel from "../components/layout/GlassPanel";

export default function CarpoolThanks() {
  return (
    <section className="bg-transparent py-14">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <GlassPanel>
          <div className="p-10">
            <div className="text-6xl mb-4" role="img" aria-label="party popper">🎉</div>
            <h1 className="heading-display text-4xl text-ink">Thanks for Signing Up!</h1>
            <p className="opacity-80 mt-3 text-lg">
              We've received your carpool info. We'll be in touch soon to coordinate rides!
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <Link to="/" className="btn">
                Back to Home
              </Link>
              <Link to="/agenda" className="btn">
                View Agenda
              </Link>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

