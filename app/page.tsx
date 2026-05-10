"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Star,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  Repeat,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import reviewsData from "../docs/REVIEWS.json";

// --- Types -----------------------------------------------------------------

type Review = {
  rating: number;
  title: string;
  body: string;
  name: string;
  city: string;
  date: string;
};

type Grade = "Pre-Algebra" | "Algebra I" | "Geometry" | "Algebra II";
const GRADES: Grade[] = ["Pre-Algebra", "Algebra I", "Geometry", "Algebra II"];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: Grade | "";
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// --- Static config ---------------------------------------------------------

const FEATURED_REVIEW_INDEXES = [5, 1, 6, 3];

const FAQS = [
  {
    q: "What if my child is really behind?",
    a: "Our teacher assesses your child's level on day one and paces lessons accordingly. The 24/7 AI coach fills in knowledge gaps between classes. Most students see measurable progress within the first month.",
  },
  {
    q: "Can they keep up with the other kids?",
    a: "Yes. Classes are small and paced at a comfortable speed. Every student gets attention. The AI coach lets them practice at their own pace outside class, so they walk in confident, not behind.",
  },
  {
    q: "What happens if they miss a class?",
    a: "Every class is recorded and posted within hours. They can watch it on their schedule and use the AI coach for any sticking points. Travel, sickness, sports. None of it derails their progress.",
  },
  {
    q: "Is this better than private tutoring?",
    a: "For most families, yes. Private tutors charge $600-800+/month, often rotate teachers, and rarely offer recordings or between-session help. We're $149/month with the same teacher every session, plus 24/7 AI coaching.",
  },
];

// --- Validation helpers ----------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.firstName.trim()) errors.firstName = "Required";
  if (!state.lastName.trim()) errors.lastName = "Required";
  if (!state.email.trim()) errors.email = "Required";
  else if (!EMAIL_RE.test(state.email.trim()))
    errors.email = "Enter a valid email";
  const digits = state.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Required";
  if (!state.grade) errors.grade = "Select a grade";
  return errors;
}

// --- Page ------------------------------------------------------------------

export default function HomePage() {
  const [heroGrade, setHeroGrade] = useState<Grade | "">("");

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    grade: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const reviews = reviewsData as Review[];
  const featuredReviews = FEATURED_REVIEW_INDEXES.map((i) => reviews[i]);

  const scrollToForm = () => {
    document
      .getElementById("signup")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleHeroGradeChange = (grade: Grade) => {
    setHeroGrade(grade);
    setForm((f) => ({ ...f, grade }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      grade: true,
    });
    if (!isValid) return;
    setSubmitted(true);
  };

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <main className="font-sans text-brand-dark bg-white overflow-x-hidden">
      {/* ============================================================
          STICKY HEADER
          ============================================================ */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-blue flex items-center justify-center">
              <span className="text-white font-black text-lg leading-none">
                M
              </span>
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight">
              MyEdSpace
            </span>
          </div>
          <button
            onClick={scrollToForm}
            className="bg-brand-green hover:brightness-95 text-brand-dark font-bold px-3 sm:px-5 py-2.5 text-sm sm:text-base transition flex items-center gap-1.5"
          >
            Start Your $7 Trial
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      </header>

      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section className="relative bg-white border-b-2 border-brand-dark overflow-hidden">
        <div
          className="hidden lg:block absolute -top-10 -right-10 w-72 h-72 bg-brand-blue z-0"
          aria-hidden
        />
        <div
          className="hidden lg:block absolute top-40 right-[28rem] w-32 h-32 bg-brand-green z-0"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 lg:pt-20 pb-14 lg:pb-24 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* LEFT: Copy + offer + entry point */}
          <div className="lg:col-span-7 z-10">
            <span className="inline-flex items-center gap-2 bg-brand-dark text-white text-xs font-bold uppercase tracking-[0.18em] px-3 py-1.5">
              <span className="w-1.5 h-1.5 bg-brand-green" />
              Not 1:1 Tutoring
            </span>

            <h1 className="mt-6 text-[2rem] sm:text-5xl lg:text-7xl font-black leading-[0.98] tracking-tight">
              Your child&apos;s confidence in math{" "}
              <span className="relative inline-block">
                <span className="relative z-10">starts here.</span>
                <span
                  className="absolute left-0 right-0 bottom-1 h-3 sm:h-4 lg:h-5 bg-brand-green -z-0"
                  aria-hidden
                />
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-brand-dark/80 max-w-2xl leading-relaxed">
              Live math classes twice a week, in your timezone.
              <br />
              <strong className="text-brand-dark">
                Same teacher every session.
              </strong>
            </p>

            <p className="mt-3 text-sm sm:text-base font-semibold text-brand-dark/60 max-w-2xl leading-relaxed">
              For students ages 11-17. Designed for American curriculum standards and every student&apos;s pace.
            </p>

            {/* GIANT $7 CALLOUT */}
            <div className="mt-8 inline-flex items-stretch border-2 border-brand-dark">
              <div className="bg-brand-green px-5 sm:px-7 py-4 sm:py-5 flex items-baseline gap-2 sm:gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-brand-dark">
                  $7
                </span>
                <span className="text-base sm:text-xl font-bold text-brand-dark whitespace-nowrap">
                  for 7 days
                </span>
              </div>
              <div className="bg-brand-dark text-white px-4 sm:px-5 flex flex-col justify-center">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 font-bold">
                  Then
                </span>
                <span className="text-sm sm:text-base font-bold whitespace-nowrap">
                  $149/mo
                </span>
              </div>
            </div>

            {/* Grade selector + CTA */}
            <div className="mt-7 max-w-xl">
              <label
                htmlFor="hero-grade"
                className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2.5"
              >
                Select your child&apos;s grade to get started (ages 11-17)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <select
                    id="hero-grade"
                    value={heroGrade}
                    onChange={(e) =>
                      handleHeroGradeChange(e.target.value as Grade)
                    }
                    className="w-full appearance-none bg-white border-2 border-brand-dark px-4 py-3.5 pr-10 text-base font-semibold text-brand-dark focus:outline-none focus:border-brand-blue"
                  >
                    <option value="">Choose a grade...</option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  />
                </div>
                <button
                  onClick={scrollToForm}
                  className="bg-brand-green hover:brightness-95 text-brand-dark font-bold px-6 py-3.5 transition whitespace-nowrap inline-flex items-center justify-center gap-2"
                >
                  Start Your $7 Trial
                  <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
              <p className="mt-3 text-xs text-brand-dark/60">
                Cancel anytime. First class this week.
              </p>
            </div>

            {/* Trust strip */}
            <div className="mt-9 pt-6 border-t-2 border-brand-dark/10">
              <div className="flex flex-wrap items-end gap-x-8 sm:gap-x-10 gap-y-5">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-brand-blue text-brand-blue"
                      />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                      4.8
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-dark/60">
                      Trustpilot
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                    21,000+
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-dark/60">
                    Students
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                    1,700+
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-dark/60">
                    Reviews
                  </div>
                </div>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 bg-brand-dark text-white px-3.5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Check
                  className="w-4 h-4 text-brand-green"
                  strokeWidth={3}
                />
                Aligned with US Curriculum Standards
              </div>
            </div>
          </div>

          {/* RIGHT: Layered visual stack */}
          <div className="lg:col-span-5 relative z-10 lg:pt-2">
            <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {/* Top stat card */}
              <div className="bg-brand-green border-2 border-brand-dark p-6 sm:p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-dark/70">
                  Real result
                </div>
                <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight leading-snug text-brand-dark">
                  &ldquo;She failed her last geometry test. Three weeks in with Eddie and she got a B+.&rdquo;
                </p>
                <div className="mt-3 text-xs font-semibold text-brand-dark/60">
                  Aisha B. · Atlanta, GA
                </div>
              </div>

              {/* Middle testimonial card */}
              <div className="relative -mt-2 ml-6 sm:ml-10 bg-white border-2 border-brand-dark p-5 sm:p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-brand-blue text-brand-blue"
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base font-semibold text-brand-dark leading-snug">
                  &ldquo;My daughter went from dreading homework to asking for extra problems.&rdquo;
                </p>
                <div className="mt-3 text-xs text-brand-dark/60 font-medium">
                  Jennifer M. · San Diego, CA
                </div>
              </div>

              {/* Bottom: Eddie credential badge */}
              <div className="relative -mt-2 mr-4 sm:mr-10 bg-brand-dark text-white border-2 border-brand-dark p-4 sm:p-5 flex items-center gap-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 border-2 border-brand-green overflow-hidden">
                  <Image
                    src="/assets/img/eddie_1.webp"
                    alt="Eddie Kang"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-brand-green font-bold">
                    Taught by
                  </div>
                  <div className="text-sm sm:text-base font-bold leading-tight">
                    Eddie Kang
                  </div>
                  <div className="mt-0.5 text-xs text-white/70 leading-snug">
                    UCLA Math · 800 SAT · 9+ yrs US schools
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. RESULTS BAND
          ============================================================ */}
      <section className="bg-brand-dark text-white border-b-2 border-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              <span className="w-1.5 h-1.5 bg-brand-green" />
              The shift parents see
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Real changes. Real people.
            </h2>
          </div>

          <div className="mt-12 sm:mt-16 grid md:grid-cols-3 border-2 border-white">
            <ResultCell
              icon={<Zap className="w-7 h-7" strokeWidth={2.5} />}
              stat="30 days"
              title="From behind to caught up."
              body="Students go from behind to grade level, without homework battles or rotating tutors."
            />
            <ResultCell
              icon={<Repeat className="w-7 h-7" strokeWidth={2.5} />}
              stat="1 teacher"
              title="The same face. Every class."
              body="No more rotating tutors. Trust compounds. Confidence builds. Math finally clicks."
              accent
            />
            <ResultCell
              icon={<Sparkles className="w-7 h-7" strokeWidth={2.5} />}
              stat="24/7"
              title="An AI coach between classes."
              body="Stuck on homework at 9pm? Our AI tutor walks them through it, step by step."
              last
            />
          </div>

          <div className="mt-12 max-w-3xl">
            <div className="border-l-4 border-brand-green pl-5 sm:pl-7">
              <p className="text-xl sm:text-2xl font-semibold leading-snug">
                &ldquo;She used to drag her feet about Wednesday tutoring.
                Now she&apos;s setting up her laptop fifteen minutes early.&rdquo;
              </p>
              <div className="mt-3 text-sm text-white/60 font-medium">
                Rachel D. · Denver, CO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. TEACHER CREDIBILITY. Eddie. Photo + credentials.
          ============================================================ */}
      <section className="bg-white border-b-2 border-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Photo column */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute -top-3 -left-3 right-6 bottom-6 bg-brand-blue z-0" aria-hidden />
                <div className="relative z-10 aspect-[4/5] border-2 border-brand-dark overflow-hidden bg-white">
                  <Image
                    src="/assets/img/eddie_4.webp"
                    alt="Eddie Kang, MyEdSpace lead math teacher"
                    fill
                    sizes="(min-width: 1024px) 32vw, 80vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-brand-green text-brand-dark border-2 border-brand-dark px-4 py-3 z-20">
                  <div className="text-[10px] uppercase tracking-wider font-bold">
                    Lead teacher
                  </div>
                  <a
                    href="https://www.instagram.com/eddiedoes.math/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold hover:underline"
                  >
                    @EddieDoesMath
                  </a>
                </div>
              </div>
            </div>

            {/* Copy column */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
                <span className="w-1.5 h-1.5 bg-brand-blue" />
                Real teacher, not an algorithm
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                Taught by Eddie Kang.
              </h2>
              <p className="mt-5 text-lg text-brand-dark/80 max-w-xl leading-relaxed">
                Nine years teaching American high schools and colleges.
                UCLA-trained. Knows every US curriculum standard and the exact
                place students tend to struggle. Has explained math to thousands
                of American teenagers.
              </p>

              <ul className="mt-8 grid sm:grid-cols-3 gap-3 sm:gap-4">
                <CredCell
                  big="UCLA"
                  small="Pure Math degree"
                />
                <CredCell
                  big="800/800"
                  small="Perfect SAT Math"
                />
                <CredCell
                  big="9+ yrs"
                  small="Teaching American high schools & colleges"
                />
              </ul>

              <blockquote className="mt-9 border-l-4 border-brand-green pl-5 sm:pl-7 text-lg sm:text-xl text-brand-dark/90 leading-relaxed">
                &ldquo;I&apos;ve taught thousands of students. The ones who fall
                behind aren&apos;t bad at math. They&apos;re missing one or two
                building blocks. Find those, fill them in, and everything
                changes.&rdquo;
                <footer className="mt-3 not-italic text-sm font-bold text-brand-dark/60">
                  Eddie Kang, Lead Teacher
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. COMPARISON. Bold blue background. Strong visual anchor.
          ============================================================ */}
      <section className="bg-brand-blue text-white border-b-2 border-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              <span className="w-1.5 h-1.5 bg-brand-green" />
              The difference
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Consistency compounds.
            </h2>
            <p className="mt-5 text-lg text-white/80 max-w-2xl">
              At school, your child may be a number. Tutors charge hundreds and
              often aren&apos;t consistent. We focus on tangible, real
              improvement in grades. Consistent teaching, every week, at a price
              that won&apos;t break the bank.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-3 border-2 border-white">
            {/* School */}
            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-white p-6 sm:p-8 bg-white text-brand-dark">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-dark/50">
                School
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-black tracking-tight">
                One size, no fit.
              </div>
              <ul className="mt-6 space-y-3 text-brand-dark/70">
                {[
                  "30 kids per class",
                  "Fixed pace, no exceptions",
                  "No recordings",
                  "No homework help",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm sm:text-base">
                    <X
                      className="w-5 h-5 text-brand-dark/30 mt-0.5 shrink-0"
                      strokeWidth={3}
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-5 border-t-2 border-brand-dark/10 text-sm font-bold text-brand-dark/60">
                Free
              </div>
            </div>

            {/* Private tutors */}
            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-white p-6 sm:p-8 bg-white text-brand-dark">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-dark/50">
                Private tutors
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-black tracking-tight">
                Pricey, inconsistent.
              </div>
              <ul className="mt-6 space-y-3 text-brand-dark/70">
                {[
                  "Different person each cancellation",
                  "Hourly fees stack fast",
                  "No structured curriculum",
                  "No coverage between sessions",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm sm:text-base">
                    <X
                      className="w-5 h-5 text-brand-dark/30 mt-0.5 shrink-0"
                      strokeWidth={3}
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-5 border-t-2 border-brand-dark/10 text-sm font-bold text-brand-dark/60">
                $600-800+/month
              </div>
            </div>

            {/* MyEdSpace */}
            <div className="bg-brand-green text-brand-dark p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                MyEdSpace
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-black tracking-tight">
                Real teaching. Real results.
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Same teacher, every session",
                  "Live twice weekly, your timezone",
                  "24/7 AI coach + full recordings",
                  "Pace matched to your child",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm sm:text-base font-semibold">
                    <Check
                      className="w-5 h-5 text-brand-dark mt-0.5 shrink-0"
                      strokeWidth={3}
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-5 border-t-2 border-brand-dark/20 text-sm font-bold text-brand-dark">
                $7 to start · $149/month
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3.5. VIDEO — See Eddie in action
          ============================================================ */}
      <section className="bg-brand-dark text-white border-b-2 border-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              <span className="w-1.5 h-1.5 bg-brand-green" />
              See it for yourself
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Real classes. Real students. See how Eddie makes math click, one building block at a time.
            </h2>
          </div>

          <div className="border-2 border-white/20 overflow-hidden">
            <video
              controls
              poster="/assets/img/eddie_3.webp"
              className="w-full"
              preload="metadata"
            >
              <source src="/assets/video/MES_intro.mp4" type="video/mp4" />
              Your browser doesn&apos;t support video.
            </video>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. SOCIAL PROOF
          ============================================================ */}
      <section className="bg-white border-b-2 border-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
                <span className="w-1.5 h-1.5 bg-brand-blue" />
                21,000+ families
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                Parents report
                <br />
                <span className="text-brand-blue">on what they see.</span>
              </h2>
              <p className="mt-5 text-lg text-brand-dark/80 max-w-md">
                Pulled straight from our 1,700+ Trustpilot reviews. No edits,
                no cherry-picks beyond honesty.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-4">
              <BigStat number="21K+" label="Students" />
              <BigStat number="1,700+" label="Reviews" />
              <BigStat number="4.8★" label="Rating" accent />
            </div>
          </div>

          <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredReviews.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. PRICING
          ============================================================ */}
      <section className="bg-brand-dark text-white border-b-2 border-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              <span className="w-1.5 h-1.5 bg-brand-green" />
              Pricing
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Start small. Scale up.
            </h2>
            <p className="mt-5 text-lg text-white/75 max-w-xl">
              Private tutors often charge <strong className="text-white">$600-800+/month</strong>.
              We&apos;re a fraction of that, with more structure and zero
              rotating teachers.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-12 gap-5">
            {/* Trial card */}
            <div className="lg:col-span-7 bg-white text-brand-dark border-2 border-brand-dark p-6 sm:p-10 flex flex-col">
              <div className="flex items-center gap-2">
                <span className="bg-brand-green text-brand-dark px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold">
                  Start here
                </span>
                <span className="text-xs uppercase tracking-wider font-bold text-brand-dark/60">
                  7-day trial
                </span>
              </div>

              <div className="mt-5 flex items-end gap-4">
                <span className="text-7xl sm:text-9xl font-black tracking-tighter leading-none">
                  $7
                </span>
                <div className="pb-2 sm:pb-3">
                  <div className="text-xl sm:text-2xl font-bold leading-tight">
                    for 7 days
                  </div>
                  <div className="text-sm text-brand-dark/60 font-semibold mt-1">
                    Then $149/mo. Cancel anytime.
                  </div>
                </div>
              </div>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  "Real teacher. Same one every class",
                  "Live twice weekly",
                  "24/7 AI homework coach",
                  "Full class recordings",
                  "Pace matched to your child",
                  "First class this week",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
                    <Check
                      className="w-5 h-5 text-brand-blue mt-0.5 shrink-0"
                      strokeWidth={3}
                    />
                    <span className="font-semibold">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3 bg-brand-green/10 border-2 border-brand-green px-4 py-3">
                <Check className="w-5 h-5 text-brand-blue shrink-0" strokeWidth={3} />
                <span className="font-bold text-sm sm:text-base">
                  30-Day Money-Back Guarantee — not satisfied? Full refund, no questions asked.
                </span>
              </div>

              <button
                onClick={scrollToForm}
                className="mt-6 bg-brand-green hover:brightness-95 text-brand-dark font-bold px-6 py-4 text-lg transition w-full sm:w-auto sm:self-start inline-flex items-center justify-center gap-2"
              >
                Start Your $7 Trial
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>

            {/* Anchor card */}
            <div className="lg:col-span-5 bg-brand-blue text-white p-6 sm:p-10 border-2 border-brand-dark flex flex-col">
              <div className="text-xs uppercase tracking-wider font-bold text-white/70">
                Compare to
              </div>
              <div className="mt-5">
                <div className="text-5xl sm:text-7xl font-black tracking-tighter line-through decoration-brand-green decoration-[6px]">
                  $640+
                </div>
                <div className="mt-2 text-white/80 font-semibold">
                  per month, private tutor
                </div>
              </div>
              <ul className="mt-7 space-y-2 text-white/85 text-sm">
                <li>· Different tutor every cancellation</li>
                <li>· No recordings if you miss</li>
                <li>· No support between sessions</li>
                <li>· No structured curriculum</li>
              </ul>
              <div className="mt-auto pt-8">
                <div className="bg-brand-green text-brand-dark px-4 py-3 font-bold text-center">
                  Up to 5x cheaper, more support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. FAQ
          ============================================================ */}
      <section className="bg-white border-b-2 border-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
              <span className="w-1.5 h-1.5 bg-brand-blue" />
              Questions
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Every question, answered.
            </h2>
          </div>

          <div className="mt-12 border-2 border-brand-dark">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className={
                    i === FAQS.length - 1
                      ? ""
                      : "border-b-2 border-brand-dark"
                  }
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className={`w-full flex items-center justify-between gap-4 text-left px-5 sm:px-7 py-5 sm:py-6 transition ${
                      open
                        ? "bg-brand-dark text-white"
                        : "hover:bg-brand-dark/5"
                    }`}
                  >
                    <span className="font-bold text-base sm:text-lg">
                      {item.q}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        open ? "rotate-90" : ""
                      }`}
                      strokeWidth={3}
                    />
                  </button>
                  {open && (
                    <div className="px-5 sm:px-7 pb-6 pt-2 text-brand-dark/80 text-base sm:text-lg leading-relaxed bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          8. SIGNUP FORM
          ============================================================ */}
      <section
        id="signup"
        className="bg-brand-blue text-white border-b-2 border-brand-dark relative overflow-hidden"
      >
        <div
          className="hidden lg:block absolute -bottom-20 -left-20 w-72 h-72 bg-brand-green/20"
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              <span className="w-1.5 h-1.5 bg-brand-green" />
              Last step
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Secure your $7 trial.
            </h2>
            <p className="mt-5 text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
              Your first live class is this week. Cancel before day 7. No
              questions, no fees.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 bg-white text-brand-dark p-5 sm:p-9 border-2 border-brand-dark">
            {submitted ? (
              <SuccessState firstName={form.firstName} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="First name"
                    id="firstName"
                    value={form.firstName}
                    onChange={(v) => setField("firstName", v)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, firstName: true }))
                    }
                    error={touched.firstName ? errors.firstName : undefined}
                    autoComplete="given-name"
                  />
                  <Field
                    label="Last name"
                    id="lastName"
                    value={form.lastName}
                    onChange={(v) => setField("lastName", v)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, lastName: true }))
                    }
                    error={touched.lastName ? errors.lastName : undefined}
                    autoComplete="family-name"
                  />
                </div>

                <div className="mt-4">
                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setField("email", v)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    error={touched.email ? errors.email : undefined}
                    autoComplete="email"
                    placeholder="parent@example.com"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold uppercase tracking-wider mb-2"
                  >
                    Phone
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border-2 border-r-0 border-brand-dark bg-brand-dark text-white font-bold">
                      +1
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, phone: true }))
                      }
                      placeholder="(555) 555-5555"
                      autoComplete="tel"
                      className="flex-1 border-2 border-brand-dark px-3 py-3 text-base focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-sm" style={{ color: "#ff0000" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="grade"
                    className="block text-xs font-bold uppercase tracking-wider mb-2"
                  >
                    Grade
                  </label>
                  <div className="relative">
                    <select
                      id="grade"
                      value={form.grade}
                      onChange={(e) =>
                        setField("grade", e.target.value as Grade)
                      }
                      onBlur={() =>
                        setTouched((t) => ({ ...t, grade: true }))
                      }
                      className="w-full appearance-none border-2 border-brand-dark px-3 py-3 pr-10 bg-white text-base font-semibold focus:outline-none focus:border-brand-blue"
                    >
                      <option value="">Choose a grade...</option>
                      {GRADES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden
                    />
                  </div>
                  {touched.grade && errors.grade && (
                    <p className="mt-1 text-sm" style={{ color: "#ff0000" }}>
                      {errors.grade}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="mt-7 w-full bg-brand-green hover:brightness-95 text-brand-dark font-bold px-6 py-4 text-lg transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  Start Your $7 Trial
                  <ArrowRight className="w-5 h-5" strokeWidth={3} />
                </button>

                <p className="mt-4 text-xs text-brand-dark/60 text-center leading-relaxed">
                  By clicking, you agree to receive communications from
                  MyEdSpace. You can unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-green" strokeWidth={3} />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-green" strokeWidth={3} />
              No long-term contracts
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-green" strokeWidth={3} />
              First class this week
            </span>
            <span className="flex items-center gap-2 font-bold text-white">
              <Check className="w-4 h-4 text-brand-green" strokeWidth={3} />
              30-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="bg-brand-dark text-white/70 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-brand-blue flex items-center justify-center">
              <span className="text-white font-black text-sm leading-none">
                M
              </span>
            </div>
            <span className="font-bold text-white">MyEdSpace</span>
            <span className="text-white/40">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// --- Subcomponents ---------------------------------------------------------

function ResultCell({
  icon,
  stat,
  title,
  body,
  accent,
  last,
}: {
  icon: React.ReactNode;
  stat: string;
  title: string;
  body: string;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`p-7 sm:p-9 ${
        accent ? "bg-brand-blue" : "bg-brand-dark"
      } ${
        last
          ? "md:border-l-2 border-white"
          : "border-b-2 md:border-b-0 md:border-r-2 border-white"
      }`}
    >
      <div className="text-brand-green">{icon}</div>
      <div className="mt-5 text-4xl sm:text-5xl font-black tracking-tighter leading-none">
        {stat}
      </div>
      <div className="mt-3 text-lg sm:text-xl font-bold leading-snug">
        {title}
      </div>
      <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
        {body}
      </p>
    </div>
  );
}

function BigStat({
  number,
  label,
  accent,
}: {
  number: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border-2 border-brand-dark p-3 sm:p-5 lg:p-7 ${
        accent ? "bg-brand-blue text-white" : "bg-white text-brand-dark"
      }`}
    >
      <div className="text-xl sm:text-3xl lg:text-5xl font-black tracking-tighter leading-none">
        {number}
      </div>
      <div
        className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
          accent ? "text-white/80" : "text-brand-dark/60"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

function CredCell({ big, small }: { big: string; small: string }) {
  return (
    <li className="border-2 border-brand-dark p-4 sm:p-5">
      <div className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue leading-none">
        {big}
      </div>
      <div className="mt-2 text-xs sm:text-sm font-semibold text-brand-dark/70 leading-snug">
        {small}
      </div>
    </li>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const truncated =
    review.body.length > 140
      ? review.body.slice(0, 137).trimEnd() + "..."
      : review.body;

  return (
    <article className="border-2 border-brand-dark p-5 sm:p-6 bg-white flex flex-col h-full">
      <div
        className="flex items-center gap-1"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-brand-blue text-brand-blue"
          />
        ))}
      </div>
      <h3 className="mt-3 font-bold text-base sm:text-lg leading-snug">
        {review.title}
      </h3>
      <p className="mt-3 text-brand-dark/75 text-sm leading-relaxed flex-1">
        &ldquo;{truncated}&rdquo;
      </p>
      <div className="mt-4 pt-3 border-t-2 border-brand-dark/10 text-xs text-brand-dark/60">
        <span className="font-bold text-brand-dark">{review.name}</span> ·{" "}
        {review.city}
      </div>
    </article>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-wider mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`w-full border-2 px-3 py-3 text-base focus:outline-none focus:border-brand-blue ${
          error ? "border-[#ff0000]" : "border-brand-dark"
        }`}
      />
      {error && (
        <p className="mt-1 text-sm" style={{ color: "#ff0000" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessState({ firstName }: { firstName: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-brand-green mx-auto flex items-center justify-center border-2 border-brand-dark">
        <Check className="w-9 h-9 text-brand-dark" strokeWidth={3} />
      </div>
      <h3 className="mt-6 text-3xl sm:text-4xl font-black tracking-tight">
        Thank you{firstName ? `, ${firstName}` : ""}!
      </h3>
      <p className="mt-4 text-brand-dark/80 max-w-md mx-auto text-lg leading-relaxed">
        Check your email to confirm. Your first class is this week — we&apos;ll text you the link an hour before.
      </p>
    </div>
  );
}
