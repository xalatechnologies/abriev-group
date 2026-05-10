import { Container } from "@/components/ui/Container";

const BRANDS = [
  "Porsche",
  "Ferrari",
  "Aston Martin",
  "Rolls-Royce",
  "Bentley",
  "Mercedes-Benz",
  "BMW",
  "Lamborghini",
  "Maserati",
  "Jaguar",
  "Land Rover",
  "Polestar",
] as const;

export function BrandMarquee() {
  return (
    <section
      aria-label="Brands available on ABRIEV"
      className="relative border-y border-outline-variant bg-surface-container-low py-8"
    >
      <Container>
        <div className="flex items-center gap-6 md:gap-12">
          <span className="font-label-caps text-label-caps uppercase hidden shrink-0 text-on-surface-variant lg:inline-flex">
            Marques on the floor
          </span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="flex min-w-max animate-[marquee_40s_linear_infinite] items-center gap-14 pr-14">
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <li
                  key={`${brand}-${i}`}
                  className="font-headline-md text-headline-md text-on-surface-variant transition-colors duration-300 hover:text-tertiary"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
