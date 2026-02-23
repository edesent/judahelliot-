"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// Lightbox component
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: { src: string; alt?: string; caption?: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 lightbox-enter flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
        aria-label="Close"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
          aria-label="Previous"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
          aria-label="Next"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] lightbox-image-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt || ""}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto object-contain rounded-lg"
          priority
        />
        {current.caption && (
          <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-3 px-4 rounded-b-lg">
            {current.caption}
          </p>
        )}
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

// Navigation component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-cream/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-normal text-foreground tracking-wide">
          Judah Elliot
        </a>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex gap-8">
          <a href="#photos" className="text-text-muted hover:text-foreground transition-colors">Photos</a>
          <a href="#videos" className="text-text-muted hover:text-foreground transition-colors">Videos</a>
          <a href="#cards" className="text-text-muted hover:text-foreground transition-colors">Cards</a>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-sm border-b border-border">
          <div className="flex flex-col px-4 py-2">
            <a href="#photos" className="py-3 text-text-muted hover:text-foreground" onClick={() => setIsOpen(false)}>Photos</a>
            <a href="#videos" className="py-3 text-text-muted hover:text-foreground" onClick={() => setIsOpen(false)}>Videos</a>
            <a href="#cards" className="py-3 text-text-muted hover:text-foreground" onClick={() => setIsOpen(false)}>Cards</a>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero section
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 relative z-10">
      <div className="text-center max-w-2xl relative z-10">
        {/* Main photo */}
        <div className="w-52 h-52 md:w-72 md:h-72 mx-auto mb-10 rounded-full bg-warm border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative">
          <Image src="/images/baby-judah.png" alt="Judah Elliot" fill className="object-cover object-[center_1%]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-normal text-foreground mb-3 tracking-wide">
          Judah Elliot
        </h1>

        <p className="text-lg text-text-muted mb-2">
          March 18th, 2025 - May 26th, 2025
        </p>

        <p className="text-base text-text-muted mb-8 italic">
          Only 70 days in our hands but forever in our hearts
        </p>

        <div className="w-24 h-px bg-accent/50 mx-auto mb-8"></div>

        <h2 className="text-3xl font-normal text-foreground tracking-wide mb-3">
          In Loving Memory
        </h2>

        <p className="text-foreground leading-relaxed text-lg italic">
          Though your time with us was brief, your impact will last forever.
        </p>
      </div>
    </section>
  );
}

// About Judah Section
function AboutSection() {
  return (
    <section className="pt-6 pb-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6 text-foreground leading-relaxed text-center">
          <p>
            Judah Elliot Desent unexpectedly went from the arms of his parents to the arms of Jesus on May 26th, 2025 at Beaumont Royal Oak Hospital.
          </p>

          <p>
            Judah was born on March 18, 2025 and was taken far too soon for us. Judah's family loved his long dark hair, chunky rolls and warm snuggles.
          </p>

          <p>
            Judah was welcomed into his large family, with many siblings who were eager to meet and hold their new brother. Each day they would come home from school and ask to hold him. In the van they would argue over who would sit next to Judah and Lyla always won.
          </p>

          <p>
            Though his time on earth was brief, Judah's presence changed the life of each one who held him. His name meaning "Praise" reminds us to choose to praise God for the gift of his life and every moment we had with him.
          </p>

          <p>
            In remembrance of Judah's life and to keep his memory alive in his siblings' lives, we are building a treehouse in our backyard that will be named the 'House of Judah'.
          </p>
        </div>
      </div>
    </section>
  );
}

// Photo Gallery - Picture Wall with editing mode
function PhotoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode] = useState(false);

  // Photos of Judah - sorted by date (oldest to newest), with ID for easy reference
  const initialPhotos: { id: number; src: string; alt: string }[] = [
    { id: 1, src: "/images/IMG_4926.jpg", alt: "Nov 5, 2024" },
    { id: 2, src: "/images/IMG_8261.jpg", alt: "Feb 3, 2025" },
    { id: 3, src: "/images/IMG_2077.jpg", alt: "Mar 8, 2025" },
    { id: 4, src: "/images/IMG_6759.jpg", alt: "Mar 8, 2025" },
    { id: 5, src: "/images/IMG_6769.jpg", alt: "Mar 8, 2025" },
    { id: 6, src: "/images/IMG_6778.jpg", alt: "Mar 8, 2025" },
    { id: 7, src: "/images/IMG_8885.jpg", alt: "Mar 17, 2025" },
    { id: 8, src: "/images/IMG_8888.jpg", alt: "Mar 17, 2025" },
    { id: 9, src: "/images/IMG_4914.jpg", alt: "Mar 18, 2025" },
    { id: 10, src: "/images/5297AA7C-76B9-4B7C-8B5F-45AF8372C2CF.jpg", alt: "Mar 18, 2025" },
    { id: 11, src: "/images/IMG_8891.jpg", alt: "Mar 18, 2025" },
    { id: 12, src: "/images/IMG_8892.jpg", alt: "Mar 18, 2025" },
    { id: 13, src: "/images/IMG_8897.jpg", alt: "Mar 18, 2025" },
    { id: 14, src: "/images/IMG_8899.jpg", alt: "Mar 18, 2025" },
    { id: 15, src: "/images/IMG_6917.jpg", alt: "Mar 19, 2025" },
    { id: 16, src: "/images/IMG_6918.jpg", alt: "Mar 19, 2025" },
    { id: 17, src: "/images/IMG_8901.jpg", alt: "Mar 19, 2025" },
    { id: 18, src: "/images/IMG_8902.jpg", alt: "Mar 19, 2025" },
    { id: 19, src: "/images/IMG_8903.jpg", alt: "Mar 19, 2025" },
    { id: 20, src: "/images/IMG_8905.jpg", alt: "Mar 19, 2025" },
    { id: 21, src: "/images/IMG_6951.jpg", alt: "Mar 19, 2025" },
    { id: 22, src: "/images/IMG_6961.jpg", alt: "Mar 19, 2025" },
    { id: 23, src: "/images/IMG_8909.jpg", alt: "Mar 19, 2025" },
    { id: 24, src: "/images/IMG_8911.jpg", alt: "Mar 19, 2025" },
    { id: 25, src: "/images/IMG_8912.jpg", alt: "Mar 19, 2025" },
    { id: 26, src: "/images/IMG_8913.jpg", alt: "Mar 19, 2025" },
    { id: 27, src: "/images/IMG_8914.jpg", alt: "Mar 19, 2025" },
    { id: 28, src: "/images/IMG_8914_1.jpg", alt: "Mar 19, 2025" },
    { id: 29, src: "/images/IMG_8915.jpg", alt: "Mar 19, 2025" },
    { id: 30, src: "/images/IMG_8915_1.jpg", alt: "Mar 19, 2025" },
    { id: 33, src: "/images/IMG_8917.jpg", alt: "Mar 19, 2025" },
    { id: 34, src: "/images/IMG_4939.jpg", alt: "Mar 19, 2025" },
    { id: 35, src: "/images/IMG_8923.jpg", alt: "Mar 19, 2025" },
    { id: 36, src: "/images/IMG_8925.jpg", alt: "Mar 19, 2025" },
    { id: 37, src: "/images/IMG_4947.jpg", alt: "Mar 19, 2025" },
    { id: 38, src: "/images/IMG_8936.jpg", alt: "Mar 19, 2025" },
    { id: 39, src: "/images/IMG_8943.jpg", alt: "Mar 20, 2025" },
    { id: 40, src: "/images/IMG_8950.jpg", alt: "Mar 20, 2025" },
    { id: 41, src: "/images/IMG_8976.jpg", alt: "Mar 22, 2025" },
    { id: 42, src: "/images/IMG_8981.jpg", alt: "Mar 23, 2025" },
    { id: 43, src: "/images/IMG_8983.jpg", alt: "Mar 23, 2025" },
    { id: 44, src: "/images/IMG_8987.jpg", alt: "Mar 23, 2025" },
    { id: 45, src: "/images/IMG_8992.jpg", alt: "Mar 23, 2025" },
    { id: 46, src: "/images/IMG_9011.jpg", alt: "Mar 25, 2025" },
    { id: 47, src: "/images/IMG_9049.jpg", alt: "Mar 27, 2025" },
    { id: 48, src: "/images/IMG_9050.jpg", alt: "Mar 27, 2025" },
    { id: 49, src: "/images/IMG_5114.jpg", alt: "Mar 27, 2025" },
    { id: 50, src: "/images/IMG_5115.jpg", alt: "Mar 27, 2025" },
    { id: 51, src: "/images/IMG_5117.jpg", alt: "Mar 28, 2025" },
    { id: 52, src: "/images/IMG_9081.jpg", alt: "Mar 30, 2025" },
    { id: 54, src: "/images/IMG_9139.jpg", alt: "Apr 2, 2025" },
    { id: 55, src: "/images/IMG_9188.jpg", alt: "Apr 3, 2025" },
    { id: 56, src: "/images/IMG_9189.jpg", alt: "Apr 3, 2025" },
    { id: 57, src: "/images/IMG_9191.jpg", alt: "Apr 3, 2025" },
    { id: 58, src: "/images/IMG_9192.jpg", alt: "Apr 3, 2025" },
    { id: 59, src: "/images/IMG_9615.jpg", alt: "Apr 3, 2025" },
    { id: 60, src: "/images/IMG_5145.jpg", alt: "Apr 6, 2025" },
    { id: 61, src: "/images/IMG_9218.jpg", alt: "Apr 9, 2025" },
    { id: 62, src: "/images/IMG_5158.jpg", alt: "Apr 9, 2025" },
    { id: 63, src: "/images/IMG_5159.jpg", alt: "Apr 9, 2025" },
    { id: 64, src: "/images/IMG_9223.jpg", alt: "Apr 9, 2025" },
    { id: 65, src: "/images/IMG_9314.jpg", alt: "Apr 10, 2025" },
    { id: 66, src: "/images/IMG_9315.jpg", alt: "Apr 10, 2025" },
    { id: 67, src: "/images/IMG_9318.jpg", alt: "Apr 11, 2025" },
    { id: 68, src: "/images/IMG_9319.jpg", alt: "Apr 11, 2025" },
    { id: 69, src: "/images/IMG_9330.jpg", alt: "Apr 12, 2025" },
    { id: 70, src: "/images/IMG_9331.jpg", alt: "Apr 12, 2025" },
    { id: 71, src: "/images/IMG_9332.jpg", alt: "Apr 12, 2025" },
    { id: 72, src: "/images/IMG_9333.jpg", alt: "Apr 12, 2025" },
    { id: 73, src: "/images/IMG_9334.jpg", alt: "Apr 12, 2025" },
    { id: 74, src: "/images/IMG_9335.jpg", alt: "Apr 12, 2025" },
    { id: 75, src: "/images/IMG_9336.jpg", alt: "Apr 12, 2025" },
    { id: 76, src: "/images/IMG_9354.jpg", alt: "Apr 15, 2025" },
    { id: 77, src: "/images/IMG_9376.jpg", alt: "Apr 17, 2025" },
    { id: 78, src: "/images/IMG_9378.jpg", alt: "Apr 17, 2025" },
    { id: 79, src: "/images/IMG_9425.jpg", alt: "Apr 20, 2025" },
    { id: 80, src: "/images/IMG_9426.jpg", alt: "Apr 20, 2025" },
    { id: 81, src: "/images/IMG_9427.jpg", alt: "Apr 20, 2025" },
    { id: 82, src: "/images/IMG_9432.jpg", alt: "Apr 20, 2025" },
    { id: 83, src: "/images/IMG_9433.jpg", alt: "Apr 20, 2025" },
    { id: 84, src: "/images/IMG_9434.jpg", alt: "Apr 20, 2025" },
    { id: 85, src: "/images/IMG_9435.jpg", alt: "Apr 20, 2025" },
    { id: 86, src: "/images/IMG_9436.jpg", alt: "Apr 20, 2025" },
    { id: 87, src: "/images/IMG_9437.jpg", alt: "Apr 20, 2025" },
    { id: 88, src: "/images/IMG_9438.jpg", alt: "Apr 20, 2025" },
    { id: 89, src: "/images/IMG_9439.jpg", alt: "Apr 20, 2025" },
    { id: 90, src: "/images/IMG_9440.jpg", alt: "Apr 20, 2025" },
    { id: 91, src: "/images/IMG_9441.jpg", alt: "Apr 20, 2025" },
    { id: 92, src: "/images/IMG_9442.jpg", alt: "Apr 20, 2025" },
    { id: 93, src: "/images/IMG_9443.jpg", alt: "Apr 20, 2025" },
    { id: 94, src: "/images/IMG_9444.jpg", alt: "Apr 20, 2025" },
    { id: 95, src: "/images/IMG_9445.jpg", alt: "Apr 20, 2025" },
    { id: 96, src: "/images/IMG_9446.jpg", alt: "Apr 20, 2025" },
    { id: 97, src: "/images/IMG_9447.jpg", alt: "Apr 20, 2025" },
    { id: 98, src: "/images/IMG_9448.jpg", alt: "Apr 20, 2025" },
    { id: 99, src: "/images/IMG_9449.jpg", alt: "Apr 20, 2025" },
    { id: 100, src: "/images/IMG_9450.jpg", alt: "Apr 20, 2025" },
    { id: 101, src: "/images/IMG_9451.jpg", alt: "Apr 20, 2025" },
    { id: 102, src: "/images/IMG_9452.jpg", alt: "Apr 20, 2025" },
    { id: 103, src: "/images/IMG_9453.jpg", alt: "Apr 20, 2025" },
    { id: 104, src: "/images/IMG_9454.jpg", alt: "Apr 20, 2025" },
    { id: 105, src: "/images/IMG_9456.jpg", alt: "Apr 20, 2025" },
    { id: 106, src: "/images/IMG_9459.jpg", alt: "Apr 20, 2025" },
    { id: 107, src: "/images/IMG_9460.jpg", alt: "Apr 20, 2025" },
    { id: 108, src: "/images/IMG_9462.jpg", alt: "Apr 21, 2025" },
    { id: 109, src: "/images/IMG_9601.jpg", alt: "Apr 29, 2025" },
    { id: 110, src: "/images/IMG_9606.jpg", alt: "Apr 29, 2025" },
    { id: 111, src: "/images/IMG_9607.jpg", alt: "Apr 29, 2025" },
    { id: 112, src: "/images/IMG_9608.jpg", alt: "Apr 29, 2025" },
    { id: 113, src: "/images/IMG_9611.jpg", alt: "Apr 29, 2025" },
    { id: 114, src: "/images/IMG_9613.jpg", alt: "Apr 29, 2025" },
    { id: 115, src: "/images/IMG_9614.jpg", alt: "Apr 29, 2025" },
    { id: 116, src: "/images/IMG_9615_1.jpg", alt: "Apr 29, 2025" },
    { id: 117, src: "/images/IMG_9634.jpg", alt: "May 1, 2025" },
    { id: 118, src: "/images/IMG_9743.jpg", alt: "May 7, 2025" },
    { id: 119, src: "/images/IMG_9748.jpg", alt: "May 7, 2025" },
    { id: 120, src: "/images/IMG_9749.jpg", alt: "May 7, 2025" },
    { id: 121, src: "/images/IMG_9777.jpg", alt: "May 9, 2025" },
    { id: 123, src: "/images/IMG_9806.jpg", alt: "May 11, 2025" },
    { id: 124, src: "/images/IMG_9810.jpg", alt: "May 12, 2025" },
    { id: 125, src: "/images/IMG_9844.jpg", alt: "May 17, 2025" },
    { id: 126, src: "/images/IMG_9871.jpg", alt: "May 18, 2025" },
    { id: 127, src: "/images/IMG_9878.jpg", alt: "May 18, 2025" },
    { id: 128, src: "/images/IMG_9884.jpg", alt: "May 19, 2025" },
    { id: 129, src: "/images/IMG_9884_1.jpg", alt: "May 19, 2025" },
    { id: 130, src: "/images/IMG_9930.jpg", alt: "May 22, 2025" },
    { id: 131, src: "/images/IMG_9932.jpg", alt: "May 22, 2025" },
    { id: 132, src: "/images/IMG_9934.jpg", alt: "May 22, 2025" },
    { id: 133, src: "/images/IMG_9956.jpg", alt: "May 22, 2025" },
    { id: 134, src: "/images/IMG_9956_1.jpg", alt: "May 22, 2025" },
    { id: 135, src: "/images/IMG_9960.jpg", alt: "May 23, 2025" },
    // Images without original dates
    { id: 160, src: "/images/IMG_2247.jpg", alt: "" },
    { id: 161, src: "/images/IMG_2251.jpg", alt: "" },
    { id: 162, src: "/images/IMG_2252.jpg", alt: "" },
    { id: 163, src: "/images/IMG_2258.jpg", alt: "" },
    { id: 164, src: "/images/IMG_2261.jpg", alt: "" },
    { id: 165, src: "/images/1ac5c438-3d6e-488c-ae62-8cbaf03cfb36.jpg", alt: "" },
    { id: 166, src: "/images/IMG_2262.jpg", alt: "" },
    { id: 167, src: "/images/IMG_2262_1.jpg", alt: "" },
    { id: 168, src: "/images/IMG_4947_1.jpg", alt: "" },
    { id: 169, src: "/images/IMG_5115_1.jpg", alt: "" },
    { id: 170, src: "/images/IMG_6980.jpg", alt: "" },
    { id: 171, src: "/images/f1112e8d-63a9-47e4-a6c0-bdadf44837d9.jpg", alt: "" },
    { id: 172, src: "/images/IMG_4940.jpg", alt: "" },
    { id: 173, src: "/images/IMG_4941.jpg", alt: "" },
    { id: 174, src: "/images/2A539FD7-9D0C-47A3-B486-8D98A9377DA5.jpg", alt: "" },
    { id: 175, src: "/images/IMG_5018.jpg", alt: "" },
    { id: 176, src: "/images/IMG_6950.jpg", alt: "" },
    { id: 177, src: "/images/IMG_6958.jpg", alt: "" },
    // Hospital photos (May 25-27, 2025) - moved to end
    { id: 136, src: "/images/IMG_5325.jpg", alt: "May 25, 2025" },
    { id: 137, src: "/images/IMG_5326.jpg", alt: "May 25, 2025" },
    { id: 138, src: "/images/IMG_0040.jpg", alt: "May 25, 2025" },
    { id: 139, src: "/images/IMG_0040_1.jpg", alt: "May 25, 2025" },
    { id: 140, src: "/images/IMG_0041.jpg", alt: "May 25, 2025" },
    { id: 141, src: "/images/IMG_0042.jpg", alt: "May 25, 2025" },
    { id: 142, src: "/images/IMG_0043.jpg", alt: "May 25, 2025" },
    { id: 143, src: "/images/IMG_0044.jpg", alt: "May 25, 2025" },
    { id: 144, src: "/images/IMG_0044_1.jpg", alt: "May 25, 2025" },
    { id: 145, src: "/images/IMG_0046.jpg", alt: "May 25, 2025" },
    { id: 146, src: "/images/IMG_0059.jpg", alt: "May 26, 2025" },
    { id: 147, src: "/images/IMG_0060.jpg", alt: "May 26, 2025" },
    { id: 148, src: "/images/IMG_0061.jpg", alt: "May 26, 2025" },
    { id: 149, src: "/images/IMG_0062.jpg", alt: "May 26, 2025" },
    { id: 150, src: "/images/IMG_0063.jpg", alt: "May 26, 2025" },
    { id: 151, src: "/images/IMG_0066.jpg", alt: "May 26, 2025" },
    { id: 152, src: "/images/IMG_0067.jpg", alt: "May 26, 2025" },
    { id: 153, src: "/images/IMG_0069.jpg", alt: "May 26, 2025" },
    { id: 154, src: "/images/IMG_0070.jpg", alt: "May 26, 2025" },
    { id: 155, src: "/images/IMG_0071.jpg", alt: "May 26, 2025" },
    { id: 156, src: "/images/IMG_0072.jpg", alt: "May 26, 2025" },
    { id: 157, src: "/images/IMG_5344.jpg", alt: "May 26, 2025" },
    { id: 158, src: "/images/IMG_0073.jpg", alt: "May 26, 2025" },
  ];

  const [photos, setPhotos] = useState(initialPhotos);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const removePhoto = useCallback((id: number) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  }, []);

  const moveToPosition = useCallback((id: number, newPosition: number) => {
    setPhotos(prev => {
      const currentIndex = prev.findIndex(p => p.id === id);
      if (currentIndex === -1) return prev;

      // Clamp position to valid range (1 to length)
      const targetIndex = Math.max(0, Math.min(prev.length - 1, newPosition - 1));
      if (currentIndex === targetIndex) return prev;

      const newPhotos = [...prev];
      const [photo] = newPhotos.splice(currentIndex, 1);
      newPhotos.splice(targetIndex, 0, photo);
      return newPhotos;
    });
  }, []);

  const logCurrentOrder = () => {
    console.log('Current photo order (IDs):', photos.map(p => p.id).join(', '));
    console.log('Removed photos:', initialPhotos.filter(p => !photos.find(cp => cp.id === p.id)).map(p => p.id).join(', '));
  };

  return (
    <section id="photos" className="py-20 px-4 md:px-8 bg-cream">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-3xl font-normal text-center mb-3 tracking-wide">Precious Moments</h2>
        <div className="w-24 h-px bg-accent/50 mx-auto mb-12"></div>

        {editMode && (
          <div className="mb-8 p-4 bg-warm rounded-lg text-center">
            <p className="text-foreground mb-2">Edit Mode: Type a position number to move photo, click X to remove</p>
            <button
              onClick={logCurrentOrder}
              className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80 transition-colors"
            >
              Log Current Order to Console
            </button>
            <p className="text-sm text-text-muted mt-2">{photos.length} photos remaining</p>
          </div>
        )}

        {photos.length > 0 ? (
          <>
            <div className="picture-wall">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="picture-wall-item cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-lg photo-shadow bg-white p-1 transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={600}
                      height={450}
                      className="w-full h-auto rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
            {lightboxOpen && (
              <Lightbox
                images={photos.map(p => ({ src: p.src, alt: p.alt, caption: `#${p.id} - ${p.alt}` }))}
                currentIndex={currentIndex}
                onClose={closeLightbox}
                onNext={nextImage}
                onPrev={prevImage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="picture-wall max-w-3xl mx-auto mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="picture-wall-item">
                  <div
                    className="rounded-lg bg-warm/50 border-2 border-dashed border-warm-dark flex items-center justify-center p-1"
                    style={{ height: `${120 + (i % 3) * 40}px` }}
                  >
                    <span className="text-accent text-sm">Photo {i}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-text-muted">
              Add photos to <code className="bg-warm px-2 py-1 rounded text-sm">/public/images/</code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Featured Video section
function FeaturedVideoSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-normal text-center mb-3 tracking-wide">A Gift Not Forgotten</h2>
        <div className="w-24 h-px bg-accent/50 mx-auto mb-12"></div>

        <div className="rounded-2xl overflow-hidden photo-shadow bg-white p-2 md:p-3">
          <video
            controls
            preload="metadata"
            className="w-full aspect-video object-cover rounded-lg"
          >
            <source src="https://fgummchcbkqegf1t.public.blob.vercel-storage.com/Judah%20Elliott%20%281%29.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

// Video section
function VideoSection() {
  const videos: { type: "local" | "youtube"; src?: string; id?: string; title: string }[] = [
    { type: "local", src: "/videos/IMG_4923.mp4", title: "" },
    { type: "local", src: "/videos/IMG_4925.mp4", title: "" },
    { type: "local", src: "/videos/IMG_4927.mp4", title: "" },
    { type: "local", src: "/videos/IMG_5157.mp4", title: "" },
    { type: "local", src: "/videos/IMG_6941.mp4", title: "" },
    { type: "local", src: "/videos/IMG_6976.mp4", title: "" },
    { type: "local", src: "/videos/IMG_6977.mp4", title: "" },
    { type: "local", src: "/videos/IMG_8939.mp4", title: "" },
    { type: "local", src: "/videos/IMG_9935.mp4", title: "" },
    { type: "local", src: "/videos/A4DF850B-8888-4CFD-9F1C-A683F69422A1.mp4", title: "" },
    { type: "local", src: "/videos/BBE7ED21-5ADE-424B-95D1-312338CDA3E0.mp4", title: "" },
    { type: "local", src: "/videos/E614FC04-C0E7-4E2F-A8CD-4D999BE35B45.mp4", title: "" },
  ];

  return (
    <section id="videos" className="py-20 px-4 md:px-8 bg-gradient-to-b from-cream to-warm/30">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-3xl font-normal text-center mb-3 tracking-wide">Cherished Memories</h2>
        <div className="w-24 h-px bg-accent/50 mx-auto mb-12"></div>

        {videos.length > 0 ? (
          <div className="picture-wall">
            {videos.map((video, index) => (
              <div key={index} className="picture-wall-item">
                <div className="relative overflow-hidden rounded-lg photo-shadow bg-white p-1 transition-transform duration-300 hover:scale-[1.02]">
                  {video.type === "local" && video.src ? (
                    <video
                      controls
                      preload="metadata"
                      className="w-full rounded"
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  ) : video.id ? (
                    <iframe
                      className="w-full aspect-video rounded"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto mb-8">
              <div className="aspect-video rounded-xl bg-warm/50 border-2 border-dashed border-warm-dark flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto text-accent mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-accent text-sm">Add Video</span>
                </div>
              </div>
            </div>
            <p className="text-text-muted">
              Add videos to <code className="bg-warm px-2 py-1 rounded text-sm">/public/videos/</code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Cards Gallery - Picture Wall
function CardsGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Add card photos here
  const cards: { src: string; from?: string }[] = [
    // { src: "/cards/card1.jpg", from: "From Grandma" },
    // { src: "/cards/card2.jpg", from: "From the Smith Family" },
  ];

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  return (
    <section id="cards" className="py-20 px-4 bg-warm/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-normal text-center mb-3 tracking-wide">Cards & Messages of Love</h2>
        <div className="w-24 h-px bg-accent/50 mx-auto mb-4"></div>
        <p className="text-center text-text-muted mb-12 italic">
          Thank you to everyone who sent their love and support
        </p>

        {cards.length > 0 ? (
          <>
            <div className="picture-wall">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="picture-wall-item cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-lg photo-shadow bg-white p-1 transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      src={card.src}
                      alt={card.from || `Card ${index + 1}`}
                      width={400}
                      height={500}
                      className="w-full h-auto rounded"
                    />
                    {card.from && (
                      <div className="absolute bottom-1 left-1 right-1 bg-white/90 backdrop-blur-sm rounded-b px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-foreground text-sm truncate">{card.from}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {lightboxOpen && (
              <Lightbox
                images={cards.map(c => ({ src: c.src, caption: c.from }))}
                currentIndex={currentIndex}
                onClose={closeLightbox}
                onNext={nextImage}
                onPrev={prevImage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="picture-wall max-w-3xl mx-auto mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="picture-wall-item">
                  <div
                    className="rounded-lg bg-cream border-2 border-dashed border-warm-dark flex items-center justify-center"
                    style={{ height: `${140 + (i % 4) * 30}px` }}
                  >
                    <span className="text-accent text-xs">Card {i}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-text-muted">
              Add card photos to <code className="bg-warm px-2 py-1 rounded text-sm">/public/cards/</code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 px-4 bg-warm/50 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl font-normal text-foreground mb-6 tracking-wide">
          Forever Loved, Forever Remembered
        </p>
        <div className="w-24 h-px bg-accent/50 mx-auto mb-6"></div>
        <p className="text-text-muted italic">
          Judah Elliot
        </p>
      </div>
    </footer>
  );
}

// Main page
export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <div className="relative overflow-hidden">
        {/* Background image spanning hero + about sections */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/judah-background.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm/40 via-cream/60 to-cream/95" />
        </div>
        <HeroSection />
        <AboutSection />
      </div>
      <FeaturedVideoSection />
      <PhotoGallery />
      <VideoSection />
      <CardsGallery />
      <Footer />
    </main>
  );
}
