import React, { useEffect, useState, useCallback } from "react";
import type { Memory } from "@features/memories/types";

export default function Slideshow() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);

  // Fetch memories
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch('/.netlify/functions/memories-list');
        if (response.ok) {
          const data = await response.json();
          setMemories(data.memories || []);
        }
      } catch (err) {
        console.error('Failed to load memories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  // Navigate to next slide
  const goToNext = useCallback(() => {
    if (memories.length === 0) return;
    
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
      setFadeIn(true);
    }, 300);
  }, [memories.length]);

  // Navigate to previous slide
  const goToPrevious = useCallback(() => {
    if (memories.length === 0) return;
    
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
      setFadeIn(true);
    }, 300);
  }, [memories.length]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Auto-advance timer (5-7 seconds, using 6 seconds)
  useEffect(() => {
    if (!isPlaying || memories.length === 0) return;

    const timer = setInterval(() => {
      goToNext();
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, [isPlaying, memories.length, goToNext]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, togglePlayPause]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p className="text-white text-2xl">Loading memories...</p>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">No memories to display yet</p>
          <p className="text-lg opacity-70">Share some memories to see them here!</p>
        </div>
      </div>
    );
  }

  const currentMemory = memories[currentIndex];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Main slideshow content */}
      <div 
        className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl w-full">
          {/* Photo */}
          {currentMemory.photoUrl && (
            <div className="mb-8 flex justify-center">
              <img 
                src={currentMemory.photoUrl} 
                alt={`Memory from ${currentMemory.name}`}
                className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          )}

          {/* Message */}
          <div className="text-center text-white space-y-4">
            <p className="text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap">
              {currentMemory.message}
            </p>
            
            <div className="pt-4">
              <p className="text-xl md:text-2xl font-semibold opacity-90">
                — {currentMemory.name}
              </p>
              <p className="text-sm opacity-60 mt-2">
                {new Date(currentMemory.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-6 text-white">
        <button
          onClick={goToPrevious}
          className="hover:opacity-100 opacity-60 transition-opacity p-2"
          aria-label="Previous memory"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={togglePlayPause}
          className="hover:opacity-100 opacity-60 transition-opacity p-2"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        <button
          onClick={goToNext}
          className="hover:opacity-100 opacity-60 transition-opacity p-2"
          aria-label="Next memory"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="ml-4 text-sm opacity-60">
          {currentIndex + 1} / {memories.length}
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="absolute top-8 right-8 text-white text-sm opacity-40">
        <p>← → to navigate | Space to pause/play</p>
      </div>
    </div>
  );
}

