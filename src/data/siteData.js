const site = {
  meta: {
    date: "April 24–27, 2026",
    locationCity: "Puerto Peñasco (Rocky Point), Sonora, Mexico"
  },

  hero: {
    oleText: "¡Ole!",
    mainTitle: "Stacy's",
    ageNumber: "40",
    ageSuffix: "th",
    celebrationText: "¡Celebremos a Stacy!",
    subtitle: "Celebrating four fabulous decades with denim, diamonds, and desert sunsets",
    ctaButton: "Saddle Up!",
    date: "April 24–27, 2026",
    location: "Puerto Peñasco (Rocky Point), Sonora, Mexico"
  },

  sections: {
    agenda: {
      heading: "Agenda",
      subheading: "Subject to party-girl improvisation. Check back for tweaks."
    },
    rsvp: {
      heading: "RSVP",
      description: "Join us in celebrating Stacy's milestone birthday! Please RSVP below.",
      ctaButton: "Complete RSVP Form →"
    },
    stay: {
      heading: "Where We're Staying",
      description: "Our Rocky Point home base for Stacy's 40th. Sun-soaked, comfy, and close to everything. This is where we'll all be staying!",
      ctaButton: "View Full Airbnb Details →"
    },
    memories: {
      heading: "Share a Memory",
      description: "Share your favorite stories, photos, or messages for Stacy!"
    },
    carpool: {
      heading: "Carpool",
      description: "Driving from Arizona? Let's coordinate rides to maximize fun and minimize parking chaos!",
      offeringCard: {
        icon: "🚗",
        title: "Offering a Ride?",
        description: "Got extra seats? Help fellow guests get to Rocky Point!"
      },
      needingCard: {
        icon: "🙋",
        title: "Need a Ride?",
        description: "Looking for a lift? Connect with drivers below."
      },
      formHeading: "Sign Up for Carpool"
    }
  },

  rsvp: {
    pageHeading: "RSVP & Deposit",
    depositNote: "$200 per person by Nov 9. Fully refundable through April per house policy.",
    
    howItWorks: {
      heading: "How It Works",
      steps: [
        {
          title: "Fill in your details",
          description: "Use the form below to let us know you're coming."
        },
        {
          title: "Send the $200 per person deposit via Zelle",
          description: "Quick and easy, no fees."
        },
        {
          title: "Get a confirmation email with your status",
          description: "We'll follow up within 48 hours."
        }
      ]
    },

    form: {
      labels: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        partySize: "Number of Guests"
      },
      placeholders: {
        name: "Name",
        email: "you@email.com",
        phone: "(555) 123-4567"
      },
      submitButton: "Submit RSVP"
    },

    zelleBlock: {
      heading: "Payment by Zelle",
      name: "Stacy",
      handle: "Stacy's phone number",
      memo: "Stacy40 + <Your Name>",
      refundPolicy: "Fully refundable until April 1, 2026 per house policy.",
      copyButton: "Copy",
      copiedButton: "✓ Copied!",
      confirmationNote: "We'll mark you as confirmed once deposit is received."
    },

    questions: {
      heading: "Questions?",
      text: "Text Nick. If plans change, we'll update this page first."
    },

    whatHappensAfter: {
      heading: "What Happens After",
      items: [
        {
          title: "We group room assignments",
          description: "We'll coordinate housing based on your party size and preferences."
        },
        {
          title: "We send the full schedule as we lock items",
          description: "You'll get updates as activities and reservations are confirmed."
        },
        {
          title: "Refund window: fully refundable until April 1, 2026",
          description: "Plans change, we get it."
        }
      ]
    },

    formEndpoint: "/__forms/rsvp"
  },

  agenda: [
    { 
      day: "Friday Day", 
      title: "Margs and Milestones", 
      details: "Chef brunch + margaritas fiesta.", 
      time: "Late morning–afternoon", 
      icon: "🍹" 
    },
    { 
      day: "Friday Night", 
      title: "Denim & Diamonds", 
      details: "Dress code: denim w/ sparkle. Dinner @ Mare Blu + bar crawl.", 
      link: "https://www.marebluristorante.com/", 
      time: "7:00 PM – late", 
      icon: "✨" 
    },
    { 
      day: "Saturday Night", 
      title: "Sunset Booze Cruise", 
      details: "Golden hour on the water.", 
      time: "5:30 PM – sunset", 
      icon: "⛵" 
    },
  ],

  stay: {
    pageHeading: "Stay",
    pageDescription: "Our Rocky Point home base for Stacy's 40th. Peek the photos, skim the details, then book or view the full listing on Airbnb.",
    airbnbUrl: "https://www.airbnb.com/l/GWid9RDo",
    ctaButton: "View on Airbnb →",
    
    amenities: [
      "Sleeps 8+",
      "3 Bedrooms",
      "2.5 Bathrooms",
      "Pool & Hot Tub",
      "Full Kitchen",
      "Wi‑Fi & Workspace",
      "Parking On‑site",
      "Washer/Dryer"
    ],

    photoGallery: {
      heading: "Photo highlights",
      seeMoreButton: "See more on Airbnb"
    },

    aboutSection: {
      heading: "About the place",
      description: "Sun‑soaked, comfy, and close to everything."
    },

    quickLinks: {
      heading: "Quick links",
      links: [
        { text: "Airbnb listing", url: "https://www.airbnb.com/l/GWid9RDo", external: true },
        { text: "RSVP", url: "/rsvp", external: false },
        { text: "Agenda", url: "/agenda", external: false }
      ]
    },

    ctaSection: {
      heading: "Ready to lock it in?",
      description: "Booking happens on Airbnb. Tap below to view pricing and dates.",
      button: "Open Airbnb"
    }
  },

  faq: {
    heading: "FAQ",
    questions: [
      {
        question: "What's the vibe?",
        answer: "Spanish rodeo chic: denim + gentle gold accents. Shine encouraged."
      },
      {
        question: "Refunds?",
        answer: "$200 pp deposit fully refundable until April due to house policy."
      },
      {
        question: "Plus-ones?",
        answer: "Check with Nick so we can keep headcount accurate."
      }
    ]
  },

  travel: {
    heading: "Travel & Tips",
    tips: [
      "Bring passport or passport card.",
      "Carpool encouraged; parking is limited.",
      "ATMs available; many places accept cards.",
      "Weather can be breezy at night near the water."
    ]
  },

  carpool: {
    form: {
      labels: {
        fullName: "Full Name*",
        email: "Email*",
        phone: "Phone*",
        role: "I am a:",
        availableSeats: "Available Seats",
        location: "Departure Location (City/Area)",
        notes: "Additional Notes (Optional)"
      },
      placeholders: {
        name: "Your full name",
        email: "you@email.com",
        phone: "(555) 123-4567",
        location: "e.g., Phoenix, AZ",
        notes: "Departure time preferences, special requests, etc."
      },
      roleOptions: {
        driver: "Driver (offering rides)",
        rider: "Rider (need a ride)"
      },
      submitButton: "Submit Carpool Info",
      submittingButton: "Submitting..."
    },

    bulletinBoard: {
      heading: "Carpool Board",
      subheading: "Coordinate rides to Rocky Point",
      needRideHeading: "Need a Ride",
      offeringRideHeading: "Offering Rides",
      noRidersText: "No riders yet. Be the first to sign up!",
      noDriversText: "No drivers yet. Got extra seats?",
      loadingText: "Loading bulletin board...",
      errorText: "⚠️ Could not load carpool data",
      errorSubtext: "Please try refreshing the page",
      footerNote: "📝 Updates automatically after form submissions",
      seatLabel: "seat",
      seatsLabel: "seats"
    }
  },

  memories: {
    upload: {
      method: "netlify", // "netlify" | "cloudinary"
      cloudinary: {
        cloudName: "",
        uploadPreset: ""
      },
      netlifyFormName: "memories",
      endpoint: "/__forms/memories"
    }
  },

  api: {
    memoriesFunctionPath: "/.netlify/functions/memories"
  },

  theme: {
    accent: "brand-600",
    denimTexture: "/assets/denim.png"
  }
};

export default site;
