import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MobilityLeadForm } from "@/components/MobilityLeadForm";

export const metadata: Metadata = {
  title: "Mobility with Pilates",
  description:
    "A sixty-minute mobility and Pilates hybrid session in Santa Barbara, open to everyone — The Base members save $10 per session. Core and glute work, Reformer lengthening, and mobility, yoga and stretching finished with Thera Gun treatment.",
};

// Campaign page — styled to match The Base's "Mobility With Pilates" flyer:
// black panels, cream type, bright green accents, circular photos. The green
// is deliberately local to this page (flyer accent), not a site-wide token.
const GREEN = "#8BBE4B";

const SESSION = [
  {
    line: "20 minutes of core, hips & glute work",
    detail: "Focused strength to wake the center of the body.",
  },
  {
    line: "20 minutes on the Reformer to lengthen",
    detail: "Time on the apparatus to open what the day has shortened.",
  },
  {
    line: "20 minutes of mobility, yoga & stretching",
    detail: "Then relax with Thera Gun treatment.",
  },
];

export default function MobilityPage() {
  return (
    <article>
      <header className="bg-[#141414] pt-16 pb-14 lg:pt-20 lg:pb-16">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#F5F0E8]/70">
                The Base &times; Santa Barbara Pilates
              </p>
              <h1 className="mt-5 font-sans text-6xl font-extrabold leading-[0.95] tracking-tight text-[#F5F0E8] md:text-8xl">
                Mobility
                <span className="mt-2 block text-4xl font-bold md:text-6xl">
                  With Pilates
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-[#F5F0E8]/85 md:text-lg">
                Strengthen your core, improve flexibility, and move with
                confidence this season — a Mobility and Pilates hybrid
                session designed for all ages and levels.
              </p>
            </div>
            <div className="relative hidden h-72 w-72 md:block">
              <img
                src="/mobility-tree.png"
                alt="Standing balance work outdoors at The Base"
                className="absolute left-0 top-0 h-44 w-44 rounded-full border-4 border-white object-cover"
              />
              <img
                src="/mobility-downdog.png"
                alt="Deep stretch outdoors at The Base"
                className="absolute bottom-0 right-0 h-52 w-52 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
        </Container>
      </header>

      <Container className="pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-sans text-2xl font-extrabold uppercase tracking-wide text-text">
              Each session:
            </h2>
            <ul className="mt-7 space-y-6">
              {SESSION.map((item) => (
                <li key={item.line} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-base font-bold text-white"
                    style={{ backgroundColor: GREEN }}
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <div>
                    <p className="text-lg font-semibold leading-snug text-text">
                      {item.line}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-2">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-9 text-lg font-bold text-text">
              The perfect addition to any fitness routine.
            </p>
            <div className="mt-4 flex flex-col items-start gap-2">
              <p
                className="rounded-md px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: GREEN }}
              >
                The Base members save $10 per session
              </p>
              <p
                className="rounded-md px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: GREEN }}
              >
                Split the session with a partner — no additional cost
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <img
              src="/mobility-reformer.png"
              alt="Legs in straps on the Reformer at Santa Barbara Pilates"
              className="absolute bottom-0 right-0 h-[78%] w-[78%] rounded-full border-8 object-cover"
              style={{ borderColor: GREEN }}
            />
            <img
              src="/pricing-mirrors.png"
              alt="Reformers and Cadillac in the mirrored Santa Barbara Pilates studio"
              className="absolute left-0 top-0 h-[52%] w-[52%] rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="prose-editorial mt-14">
          <p>
            Mobility with Pilates is open to everyone — and made with members
            of The Base in mind: the length, mobility, and recovery work that
            hard training asks for, taught in the Pilates studio just past
            the gym floor. Sessions are by appointment. Ask at the front desk
            at The Base, or leave your details below.
          </p>
        </div>
      </Container>

      <section id="book" className="bg-[#141414] py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: GREEN }}
            >
              Book your session
            </p>
            <h2 className="mt-3 font-sans text-3xl font-extrabold leading-tight text-[#F5F0E8] md:text-4xl">
              Ready to move better?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#F5F0E8]/80">
              Leave your details and we will call or email you within one
              business day to set up your first session.
            </p>
            <div className="mt-8 bg-bg p-6 md:p-8">
              <MobilityLeadForm />
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
