import { Modal } from "@components/ui";
import type { Memory } from "@features/memories/types";
import { useEffect, useState } from "react";

interface MemoryFeedProps {
  showViewAllButton?: boolean;
}

export default function MemoryFeed({ showViewAllButton = true }: MemoryFeedProps) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch('/.netlify/functions/memories-list');
        if (!response.ok) {
          const statusText = response.status === 500 
            ? 'Server error - please try again later' 
            : `Unable to load memories (${response.status})`;
          throw new Error(statusText);
        }
        const data = await response.json();
        const memoriesData = data.memories || [];
        console.log('Loaded memories:', memoriesData);
        memoriesData.forEach((m: Memory) => {
          console.log(`Memory ${m.id}: photoUrl =`, m.photoUrl);
        });
        setMemories(memoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to connect - please check your internet connection');
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
      <div className="text-center py-6 sm:py-8 frost-layer-light max-w-md mx-auto">
        <p className="text-red-700 font-body text-sm sm:text-base mb-3">
          😔 Oops! We couldn't load the memories right now.
        </p>
        <p className="text-text-dark/70 font-body text-xs sm:text-sm">
          {error}
        </p>
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
    <>
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
            {memory.photoUrl ? (
              <div>
                <p className="text-xs text-blue-600 mb-1 break-all">Photo data type: {typeof memory.photoUrl}</p>
                <p className="text-xs text-blue-600 mb-1 break-all">Photo data: {JSON.stringify(memory.photoUrl)}</p>
                {typeof memory.photoUrl === 'string' ? (
                  <img 
                    src={memory.photoUrl} 
                    alt={`Memory from ${memory.name}`}
                    className="w-full rounded-lg object-cover max-h-48 sm:max-h-64"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Hide the image if it fails to load
                      e.currentTarget.style.display = 'none';
                      console.error('Failed to load image:', memory.photoUrl);
                    }}
                  />
                ) : (
                  <p className="text-xs text-red-600">Photo is not a string URL - it's an object!</p>
                )}
              </div>
            ) : (
              <p className="text-xs text-orange-600">No photo attached to this memory</p>
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

        {/* View All Button */}
        {showViewAllButton && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn w-full text-sm sm:text-base"
            >
              📸 View All Memories
            </button>
          </div>
        )}
      </div>

      {/* Memory Wall Modal */}
      {showViewAllButton && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Memory Wall"
        >
          <MemoryFeed showViewAllButton={false} />
        </Modal>
      )}
    </>
  );
}

