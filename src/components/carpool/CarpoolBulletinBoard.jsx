import React, { useState, useEffect } from "react";
import site from "../../data/siteData";

export default function CarpoolBulletinBoard() {
  const [riders, setRiders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch carpool data from Netlify Function
    const fetchCarpoolData = async () => {
      try {
        const response = await fetch('/.netlify/functions/carpool-list');
        
        if (!response.ok) {
          throw new Error('Failed to fetch carpool data');
        }
        
        const data = await response.json();
        setDrivers(data.drivers || []);
        setRiders(data.riders || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching carpool data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCarpoolData();
  }, []);

  const b = site.carpool.bulletinBoard;

  if (loading) {
    return (
      <div className="card-base text-center">
        <p className="text-text-dark font-body">{b.loadingText}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-base text-center">
        <p className="text-red-600 font-body mb-2">{b.errorText}</p>
        <p className="text-sm text-text-dark/70 font-body">{b.errorSubtext}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel overflow-hidden p-0">
      {/* Bulletin Board Header */}
      <div className="bg-primary px-6 py-4 text-center border-b-2 text-text-light border-secondary">
        <h3 className="font-display text-2xl font-bold flex items-center justify-center gap-3">
          <span className="text-gold">📌</span>
          <span>{b.heading}</span>
          <span className="text-gold">📌</span>
        </h3>
        <p className="text-sm mt-1 font-body opacity-80">{b.subheading}</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Need a Ride Section */}
        <div className="frost-layer">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-secondary/30">
            <span className="text-2xl" role="img" aria-label="Need a ride">🙋</span>
            <h4 className="font-display text-xl font-bold text-primary">
              {b.needRideHeading}
            </h4>
          </div>
          
          {riders.length === 0 ? (
            <p className="text-sm text-text-dark/70 italic text-center py-4 font-body">
              {b.noRidersText}
            </p>
          ) : (
            <ul className="space-y-3">
              {riders.map((rider, index) => (
                <li
                  key={index}
                  className="frost-layer-light flex items-center gap-3"
                >
                  <span className="text-primary text-lg font-bold">▸</span>
                  <span className="font-body font-semibold text-text-dark text-base">
                    {rider.firstName} {rider.lastInitial}.
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Offering a Ride Section */}
        <div className="frost-layer">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-secondary/30">
            <span className="text-2xl" role="img" aria-label="Offering rides">🚗</span>
            <h4 className="font-display text-xl font-bold text-primary">
              {b.offeringRideHeading}
            </h4>
          </div>
          
          {drivers.length === 0 ? (
            <p className="text-sm text-text-dark/70 italic text-center py-4 font-body">
              {b.noDriversText}
            </p>
          ) : (
            <ul className="space-y-3">
              {drivers.map((driver, index) => (
                <li
                  key={index}
                  className="frost-layer-light flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-lg font-bold">▸</span>
                    <span className="font-body font-semibold text-text-dark text-base">
                      {driver.firstName} {driver.lastInitial}.
                    </span>
                  </div>
                  <span className="text-xs text-text-dark px-3 py-1.5 rounded-full font-bold border border-secondary/20 bg-gold/40 font-body">
                    {driver.seats} {driver.seats !== 1 ? b.seatsLabel : b.seatLabel}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-text-dark/70 font-body pt-3 border-t border-secondary/30">
          <p>{b.footerNote}</p>
        </div>
      </div>
    </div>
  );
}

