import React from "react";
import GlassPanel from "../components/layout/GlassPanel";
import MemoryForm from "../components/memories/MemoryForm";
import MemoryFeed from "../components/memories/MemoryFeed";

export default function Memories() {
  return (
    <section className="bg-transparent py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Form */}
          <div>
            <GlassPanel>
              <MemoryForm />
            </GlassPanel>
          </div>

          {/* Right side: Feed */}
          <div>
            <GlassPanel>
              <MemoryFeed />
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}