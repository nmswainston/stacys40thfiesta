import { ROUTES } from "@/constants";
import { GlassPanel } from "@components/layout";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-transparent py-14">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <GlassPanel className="p-12">
          <div className="text-6xl mb-6" role="img" aria-label="cowboy hat">🤠</div>
          <h1 className="heading-display text-5xl text-ink mb-4">404</h1>
          <h2 className="text-2xl font-bold text-brand-700 mb-4">Well, This Ain't Right</h2>
          <p className="text-lg opacity-80 mb-8">
            Looks like this page rode off into the sunset. Let's get you back to the fiesta!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={ROUTES.HOME} className="btn">
              Back to Home
            </Link>
            <Link to={ROUTES.AGENDA} className="btn">
              View Agenda
            </Link>
            <Link to={ROUTES.RSVP} className="btn">
              RSVP
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-brand-200">
            <p className="text-sm text-muted">
              If you think this page should exist, let Nick know!
            </p>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

