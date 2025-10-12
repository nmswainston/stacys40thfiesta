import React from "react";
import GlassPanel from "../components/layout/GlassPanel";
import MemoryForm from "../components/memories/MemoryForm";
import MemoryFeed from "../components/memories/MemoryFeed";

export default function Memories() {
  return (
    <section className="bg-transparent py-8 sm:py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left side: Form */}
          <div>
            <GlassPanel className="p-4 sm:p-5 md:p-6">
              <MemoryForm />
            </GlassPanel>
          </div>

          {/* Right side: Feed */}
          <div>
            <GlassPanel className="p-4 sm:p-5 md:p-6">
              <MemoryFeed />
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}