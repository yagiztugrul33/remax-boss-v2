import Image from "next/image";
import { Briefcase, Crown, UserCog, Users } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { getTeamGroups, type AgentRole } from "@/lib/office";

const roleIcon: Record<AgentRole, typeof Users> = {
  broker: Crown,
  "ofis-gelisim": UserCog,
  "danisman-maxx": Briefcase,
  "danisman-rapp": Briefcase,
  danisman: Briefcase,
  destek: Users,
};

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * RE/MAX BOSS gerçek ekibi — gruplu dikey kartlar.
 * Fotoğrafı OLAN kişi → gerçek portre (3:4, object-cover, ezilmez).
 * Fotoğrafı OLMAYAN → monogram (inisyal) fallback. UYDURMA foto YOK.
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

      <div className="mt-10 space-y-12">
        {groups
          .filter((g) => g.members.length > 0)
          .map((g) => {
            const Icon = roleIcon[g.key];
            return (
              <div key={g.key}>
                <div className="flex items-center gap-3 mb-5">
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

                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {g.members.map((m, i) => (
                    <Reveal key={m.name} delay={(i % 4) * 80}>
                      <li className="card-depth group h-full overflow-hidden rounded-2xl border border-line bg-white">
                        {/* Üst: foto (varsa) veya monogram — 3:4, ezilmez */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                          {m.photo ? (
                            <Image
                              src={m.photo}
                              alt={`${m.name} — ${m.title}`}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          ) : (
                            <div
                              aria-hidden
                              className={`absolute inset-0 flex items-center justify-center font-display font-extrabold text-4xl tracking-tight ${
                                g.key === "broker"
                                  ? "bg-gradient-to-br from-remax-red to-remax-red-dark text-white"
                                  : "bg-gradient-to-br from-navy-700 to-navy-900 text-white/90"
                              }`}
                            >
                              {initialsOf(m.name)}
                            </div>
                          )}
                        </div>

                        {/* Alt: isim + unvan */}
                        <div className="p-3.5">
                          <div className="font-display font-bold text-navy leading-tight text-balance">
                            {m.name}
                          </div>
                          <div className="text-xs text-navy/55 mt-1 leading-snug">
                            {m.title}
                          </div>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </Section>
  );
}
