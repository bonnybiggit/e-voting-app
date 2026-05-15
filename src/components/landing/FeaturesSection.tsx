import { Shield, Smartphone, BarChart3, Clock, Lock, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Verified",
    description:
      "Every vote is cryptographically secured. Matric number verification ensures only eligible students participate.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Vote from anywhere — phone, tablet, or desktop. Our responsive design makes voting easy on any device.",
    color: "text-brand bg-brand/10",
  },
  {
    icon: BarChart3,
    title: "Real-Time Results",
    description:
      "Watch live vote tallies and visual charts update in real-time as results come in after the election closes.",
    color: "text-success bg-success/10",
  },
  {
    icon: Clock,
    title: "Time-Bound Voting",
    description:
      "Elections have clearly defined start and end times, ensuring fair and transparent participation windows.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Lock,
    title: "OTP Authentication",
    description:
      "Two-factor authentication via OTP ensures that only the registered student can cast their vote.",
    color: "text-brand bg-brand/10",
  },
  {
    icon: Users,
    title: "Admin Control Panel",
    description:
      "Administrators can manage elections, candidates, and monitor turnout from a powerful dashboard.",
    color: "text-success bg-success/10",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="page-container">
        <div className="mb-12 text-center">
          <p className="text-label text-primary mb-2">Why UniVote</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Built for Nigerian Universities
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Designed with the unique needs of Nigerian academic institutions in
            mind — robust, accessible, and transparent.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/60 bg-card p-6 card-hover"
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}
              >
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div id="how-it-works" className="mt-20">
          <div className="mb-12 text-center">
            <p className="text-label text-primary mb-2">Process</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Login", desc: "Enter your matric number and password to access the voting portal." },
              { step: "02", title: "Verify", desc: "Confirm your identity with a one-time password (OTP) sent to your registered email." },
              { step: "03", title: "Vote", desc: "Browse candidates, read their manifestos, and cast your vote securely." },
              { step: "04", title: "Confirm", desc: "Review and confirm your selection. Your vote is recorded and encrypted." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                  <span className="text-sm font-extrabold text-primary">{step}</span>
                </div>
                <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
