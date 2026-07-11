import Image from "next/image";

const slides = [
  {
    src: "/assets/about-carousel-1.jpg",
    alt: "CBF Dwarka church family gathered outside a church building",
  },
  {
    src: "/assets/about-carousel-2.jpg",
    alt: "CBF Dwarka church family gathered outdoors",
  },
];

export function AboutCarousel() {
  return (
    <div className="about-carousel" aria-label="CBF Dwarka photo carousel">
      {slides.map((slide, index) => (
        <input
          key={`${slide.src}-control`}
          type="radio"
          id={`about-carousel-${index + 1}`}
          name="about-carousel"
          aria-label={`Show photo ${index + 1}`}
          defaultChecked={index === 0}
        />
      ))}
      <div className="about-carousel-frame">
        {slides.map((slide, index) => (
          <div className="about-carousel-slide" key={slide.src}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 900px) 100vw, 646px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="about-carousel-controls" aria-label="Choose photo">
        {slides.map((slide, index) => (
          <label
            key={slide.src}
            htmlFor={`about-carousel-${index + 1}`}
            aria-label={`Show photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
