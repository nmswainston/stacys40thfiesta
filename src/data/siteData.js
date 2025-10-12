const site = {
  meta: {
    date: "Thursday, April 16 - Sunday, April 19, 2026",
    locationCity: "Puerto Peñasco (Rocky Point), Sonora, Mexico"
  },

  hero: {
    oleText: "¡Ole!",
    mainTitle: "Stacy's Rodeo Retreat",
    celebrationText: "Saddle Up for 40!",
    subtitle: "Kick of your boots and make some memories worth yee-hawing about!",
    ctaButton: "Saddle Up!",
    date: "Thursday, April 16 - Sunday, April 19, 2026",
    location: "Puerto Peñasco (Rocky Point), Sonora, Mexico"
  },

  sections: {
    agenda: {
      heading: "Agenda",
      subheading: "Details will be finalized closer to the fiesta."
    },
    rsvp: {
      heading: "Pony Up",
      description: "Join us in celebrating Stacy's milestone birthday! Please RSVP below.",
      ctaButton: "Complete RSVP Form →"
    },
    stay: {
      heading: "Where We'll Hang Our Hats",
      description: "One casa. One crew. Where memories run wild.",
      ctaButton: "View Full Airbnb Details →"
    },
    memories: {
      heading: "Drop A Memory In The Corral",
      description: "Dust off your favorite stacy stories, and show 'em off (Photos wanted!)"
    },
    carpool: {
      heading: "Wagon Train",
      description: "Hitting the dusty trail from Arizona? Let's ride out together!",
      offeringCard: {
        icon: "🚗",
        title: "Offering a Ride?",
        description: "Got extra seats in your stagecoach? Drop your deets below."
      },
      needingCard: {
        icon: "🙋",
        title: "Need a Ride?",
        description: "Need a seat in a wagon? Drop your deets below."
      },
      formHeading: "Sign Up for Carpool"
    }
  },

  rsvp: {
    heading: "Pony Up",
    depositNote: "Final round up rate: $250 - $325 per person (amount depends on how many of us saddle up!)\n\nThe house has been fully paid and booked—this is why payments are requested early.",
    
    howItWorks: {
      heading: "Secure Your Saddle",
      steps: [
        {
          title: "Fill in your deets",
          description: "Holler below if you're ridin' with us."
        },
        {
          title: "Deposit: $200 per person via Zelle",
          description: "Deadline: Sunday, November 2, 2025"
        },
        {
          title: "Final payment",
          description: "Deadline: Sunday, December 7, 2025"
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
      handle: "(Stacy's phone number)",
      memo: "Stacy40 + <Your Name>"
    },

    questions: {
      heading: "Shoot Your Questions?",
      text: "Wrangle Nick if you have questions."
    },

    whatHappensAfter: {
      heading: "What Happens After",
      items: [
        {
          title: "Room round-up time",
          description: "Couples will lasso their own private quarters first."
        },
        {
          title: "We send the full schedule as we lock items",
          description: "You'll get updates as activities and reservations are confirmed."
        }
      ]
    },

    formEndpoint: "/__forms/rsvp"
  },

  agenda: [
    { 
      day: "Friday\nDay", 
      title: "Margs & Milestones", 
      details: "Private chef taco bar + margaritas",
      time: "All day",
      estimatedCost: "$40 - $60",
      icon: "🍹" 
    },
    { 
      day: "Friday\nNight", 
      title: "Denim & Diamonds", 
      details: "Dinner at Mare Blu Ristorante", 
      link: "https://www.marebluristorante.com/",
      linkText: "View Menu",
      time: "7:00 PM", 
      icon: "✨" 
    },
    { 
      day: "Saturday Night", 
      title: "Sunset Booze Cruise", 
      details: "Golden hour on the water",
      link: "https://www.rockypointsunsetcruise.com/",
      linkText: "Cruise Info",
      time: "5:30 PM",
      estimatedCost: "$30", 
      icon: "⛵" 
    },
  ],

  stay: {
    heading: "Stay",
    description: "Our Rocky Point homestead for Stacy's 40th fiesta weekend.",
    airbnbUrl: "https://www.airbnb.com/l/GWid9RDo",
    ctaButton: "View on Airbnb →",
    
    amenities: [
      "5 Bedrooms",
      "Sleeps 16",
      "6.5 Bathrooms",
      "Pool & Hot Tub",
      "Parking On‑site",
      "Full Kitchen",
      "Ocean View",
      "Washer/Dryer"
    ],

    photoGallery: {
      heading: "Casa del Celebration",
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
      "Bring passport and ID.",
      "If flying in, fly into Phoenix Sky Harbor Airport and carpool the 3.5 hour drive to Rocky Point.",
      "Special car insurance is encouraged for driving to Mexico."
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
  },

  navigation: {
    homeScroll: [
      { label: "Home", id: "welcome" },
      { label: "Agenda", id: "agenda" },
      { label: "RSVP", id: "rsvp" },
      { label: "Stay", id: "stay" },
      { label: "Memories", id: "memories" },
      { label: "Carpool", id: "carpool" },
      { label: "Travel", id: "travel" }
    ],
    otherPages: [
      { label: "Home", path: "/" },
      { label: "Agenda", path: "/agenda" },
      { label: "RSVP", path: "/rsvp" },
      { label: "Stay", path: "/stay" },
      { label: "Memories", path: "/memories" },
      { label: "Carpool", path: "/carpool" },
      { label: "Travel", path: "/travel" }
    ]
  }
};

export default site;
