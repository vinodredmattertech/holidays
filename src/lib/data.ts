export const destinations = [
  {
    id: "bali",
    name: "Bali",
    num: "01",
    title: "Slow down.",
    tagline: "For the ones who want to slow down.",
    copy: "Hidden beaches, jungle escapes, beautiful sunsets and experiences built around your pace.",
    cta: "Plan My Bali",
    className: "dest--bali",
    image:
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1600&auto=format&fit=crop",
    alt: "A hidden cove beach in Bali, framed by towering limestone cliffs and turquoise water",
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    num: "02",
    title: "A bit of everything.",
    tagline: "",
    copy: "Wildlife, waves, tea country, culture and coastlines — brought together around what you love.",
    cta: "Plan My Sri Lanka",
    className: "dest--srilanka reveal-delay-1",
    image:
      "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop",
    alt: "A palm-lined pool overlooking the coast in Sri Lanka",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    num: "03",
    title: "For the curious.",
    tagline: "",
    copy: "Street food, ancient towns, dramatic landscapes and experiences beyond the usual checklist.",
    cta: "Plan My Vietnam",
    className: "dest--vietnam",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1800&auto=format&fit=crop",
    alt: "Limestone karsts rising through morning mist in Ha Long Bay, Vietnam",
  },
  {
    id: "japan",
    name: "Japan",
    num: "04",
    title: "Go deeper.",
    tagline: "",
    copy: "Neon cities, quiet temples, incredible food and centuries of culture — at your pace.",
    cta: "Plan My Japan",
    className: "dest--japan reveal-delay-2",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1200&auto=format&fit=crop",
    alt: "A glowing red paper lantern in a narrow neon-lit alleyway in Tokyo at night",
  },
] as const;

export const reasons = [
  "To switch off.",
  "To reconnect.",
  "To celebrate.",
  "To explore.",
  "To spend time together.",
  "To simply get away.",
] as const;

export const stories = [
  {
    num: "01",
    title: "Holiday planning became too fragmented.",
    copy: "A dream trip shouldn't mean hopping across a dozen websites, comparing hotels, stitching together flights, transfers and experiences, and hoping everything works together.",
  },
  {
    num: "02",
    title: "We've seen the problem from every angle.",
    copy: "Our experience spans travel, hospitality and technology. We've spent years understanding where travel planning breaks down — and what makes a great trip actually work.",
  },
  {
    num: "03",
    title: "You deserve more than a package.",
    copy: "We bring intelligent personalisation and real human travel expertise together to create trips that feel effortless, considered and uniquely yours.",
  },
] as const;

export const steps = [
  {
    num: "01",
    title: "Tell us what you're looking for",
    copy: "Fill out the enquiry form and tell us where you want to go, who you're travelling with and what you want from the trip.",
    icon: "compass" as const,
  },
  {
    num: "02",
    title: "Talk to your travel expert",
    copy: "Our travel expert gets in touch to understand your requirements, preferences, travel style and expectations.",
    icon: "chat" as const,
  },
  {
    num: "03",
    title: "Get your personalised itinerary",
    copy: "We create a customised itinerary with experiences, stays and recommendations designed around you.",
    icon: "map" as const,
  },
  {
    num: "04",
    title: "Fine-tune your trip",
    copy: "We'll discuss the plan with you and make any changes until everything feels right.",
    icon: "spark" as const,
  },
  {
    num: "05",
    title: "Leave the rest to us",
    copy: "Once confirmed, we'll take care of the details so you can focus on enjoying the experience.",
    icon: "send" as const,
  },
] as const;

export const stats = [
  {
    value: "20+",
    label: "Years spent inside travel, hospitality and technology",
    icon: "star" as const,
  },
  {
    value: "6,500+",
    label: "Hotels connected through the team's earlier travel-tech work",
    icon: "home" as const,
  },
  {
    value: "20+",
    label: "Countries reached through systems our founders helped build",
    icon: "globe" as const,
  },
  {
    value: "AI + Human",
    label: "Personalisation shaped with real travel expertise",
    icon: "heart" as const,
  },
] as const;
