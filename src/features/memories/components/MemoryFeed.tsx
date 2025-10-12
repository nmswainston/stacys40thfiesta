import React, { useEffect, useState } from "react";
import type { Memory } from "@features/memories/types";

export default function MemoryFeed() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch('/.netlify/functions/memories-list');
        if (!response.ok) {
          throw new Error('Failed to load memories');
        }
        const data = await response.json();
        setMemories(data.memories || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-text-dark/70 font-body text-sm sm:text-base">Loading memories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-red-600 font-body text-sm sm:text-base">Error: {error}</p>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-text-dark/70 font-body text-sm sm:text-base leading-relaxed">No memories yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="font-display text-xl sm:text-2xl text-primary text-center mb-4 sm:mb-6 leading-tight">
        Memory Wall
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {memories.map((memory) => (
          <div 
            key={memory.id} 
            className="frost-layer-light space-y-2.5 sm:space-y-3"
          >
            {memory.photoUrl && (
              <img 
                src={memory.photoUrl} 
                alt={`Memory from ${memory.name}`}
                className="w-full rounded-lg object-cover max-h-48 sm:max-h-64"
              />
            )}
            
            <div>
              <h4 className="font-semibold text-text-dark text-base sm:text-lg font-body leading-tight">
                {memory.name}
              </h4>
              <p className="text-xs sm:text-sm text-text-dark/60 font-body mt-0.5">
                {new Date(memory.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <p className="text-sm sm:text-base text-text-dark leading-relaxed font-body break-words">
              {memory.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

