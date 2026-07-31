export const siteConfig = {
  name: "CBF Dwarka",
  fullName: "Christian Believers Fellowship Dwarka",
  url: "https://www.cbfdwarka.org",
  description:
    "A Gospel-centered church in Dwarka, New Delhi, gathering for worship, biblical teaching, discipleship, and community.",
  email: "cbfdwarka2021@gmail.com",
  phone: "+91 99108 00733",
  phoneHref: "tel:+919910800733",
  address: {
    name: "Mount Carmel School",
    streetAddress: "Taekwondo Room (Room 316), Mount Carmel School, Sector 22, Dwarka",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110077",
    addressCountry: "IN",
  },
  geo: {
    latitude: 28.5606083,
    longitude: 77.0589403,
  },
  directionsUrl: "https://maps.app.goo.gl/JpFGJdPFxPP77a5u7?g_st=ic",
  instagramUrl: "https://www.instagram.com/cbfdwarka/",
  youtubeUrl: "https://www.youtube.com/@cbfdwarka",
  foundingDate: "2007-07",
} as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
