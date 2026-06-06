import { Briefcase, Crown, UserCog, Users } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { getTeamGroups, type AgentRole } from "@/lib/office";

const roleIcon: Record<AgentRole, typeof Users> = {
  broker: Crown,
  "ofis-gelisim": UserCog,
  danisman: Briefcase,
  destek: Users,
};

/**
 * RE/MAX BOSS gerçek ekibi — 4 grup, isim + unvan.
 * Foto YOK (kaynak verilmedi) → UYDURMA foto eklenmedi.
 * Tasarım: monogram inisyal + isim + unvan rozet.
 */
export default function TeamSection() {
  const groups = getTeamGroups();
  const total = groups.reduce((acc, g) => acc + g.members.length, 0);

  return (
    <Section tone="light" density="normal">
      <div className="max-w-2xl">
        <Eyebrow tone="red">Ekibimiz</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
          <span className="accent-mark">{total} kişilik</span> uzman kadromuz.
        </h2>
        <p className="mt-4 text-navy/65 leading-relaxed">
          Brokerlardan danışmanlara, ofis gelişiminden destek ekibine kadar
          her birimimiz tek bir hedef için çalışır: müşterimizin doğru kararı
          doğru zamanda alması.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {groups
          .filter((g) => g.members.length > 0)
          .map((g) => {
            const Icon = roleIcon[g.key];
            return (
              <div key={g.key}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display font-extrabold text-navy text-xl">
                    {g.label}
                    <span className="ms-2 text-sm font-semibold text-navy/40">
                      ({g.members.length})
                    </span>
                  </h3>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {g.members.map((m) => {
                    const initials = m.name
                      .split(" ")
                      .filter(Boolean)
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();
                    return (
                      <li
                        key={m.name}
                        className="rounded-2xl border border-line bg-mist/40 p-4 flex items-center gap-3 hover:bg-white hover:border-remax-red/30 transition-colors"
                      >
                        <div
                          aria-hidden
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 font-display font-extrabold text-sm tracking-tight ${
                            g.key === "broker"
                              ? "bg-remax-red text-white"
                              : "bg-navy text-white"
                          }`}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-display font-bold text-navy leading-tight truncate">
                            {m.name}
                          </div>
                          <div className="text-xs text-navy/55 mt-0.5">
                            {m.title}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </Section>
  );
}
