import { PanelShell } from "@/components/admin/panel-shell";
import { ADMIN_NAV } from "../nav";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Upload, Film, Image as ImageIcon, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Media & Asset Studio — Super Admin" };

const SYSTEM_ASSETS = [
  {
    name: "Algeria Video Loop",
    path: "/video/algeria.mp4",
    type: "video",
    section: "Homepage Heritage",
    size: "52.8 MB",
  },
  {
    name: "Zimbabwe Video Loop",
    path: "/video/zimbabwe.mp4",
    type: "video",
    section: "Homepage Heritage",
    size: "10.6 MB",
  },
  {
    name: "Carnival & Traditional Dance",
    path: "/images/traditional-dance.jpg",
    type: "image",
    section: "Student Life Gallery",
    size: "306 KB",
  },
  {
    name: "Flying The Flag Parade",
    path: "/images/azsa-parade.jpg",
    type: "image",
    section: "Student Life Gallery",
    size: "340 KB",
  },
  {
    name: "Arnold BTech Convocation",
    path: "/images/graduate-btech.jpg",
    type: "image",
    section: "Student Life Gallery",
    size: "186 KB",
  },
  {
    name: "Student Baking & Enterprise",
    path: "/images/student-baking.jpg",
    type: "image",
    section: "Student Life Gallery",
    size: "475 KB",
  },
  {
    name: "Weekend League Football",
    path: "/images/football-team.jpg",
    type: "image",
    section: "Student Life Gallery",
    size: "299 KB",
  },
  {
    name: "Independence Day Gala",
    path: "/images/cultural-celebration.jpg",
    type: "image",
    section: "Student Life Gallery",
    size: "287 KB",
  },
  {
    name: "Embassy Convocation Algiers",
    path: "/images/embassy-graduation.jpg",
    type: "image",
    section: "Consular Archives",
    size: "266 KB",
  },
];

export default async function AdminMediaPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    redirect("/admin");
  }

  return (
    <PanelShell
      eyebrow="Super Admin Studio"
      title="Media, Videos & Backgrounds"
      navItems={ADMIN_NAV}
      activeHref="/admin/media"
    >
      <div className="flex flex-col gap-8">
        {/* Upload & Manager Header Banner */}
        <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/10 via-ink-900 to-emerald-500/10 p-6 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/20 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Super Admin Privileges</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Live Asset & Background Management
              </h3>
              <p className="text-sm text-white/70 mt-1 max-w-xl">
                Upload new high-resolution photos, replace background looping videos, and configure media placements across the platform.
              </p>
            </div>
            <Button variant="secondary" size="md" className="shrink-0 shadow-[0_0_25px_rgba(255,215,0,0.3)]">
              <Upload className="h-4 w-4 mr-2" /> Upload New Asset
            </Button>
          </div>
        </div>

        {/* Media Assets Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display text-lg font-bold text-white">Active System Assets</h4>
            <span className="font-mono text-xs text-white/50">{SYSTEM_ASSETS.length} files deployed</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEM_ASSETS.map((asset) => (
              <Card key={asset.path} className="p-4 border-white/10 bg-white/[0.02]">
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-black mb-3 border border-white/10">
                  {asset.type === "image" ? (
                    <Image
                      src={asset.path}
                      alt={asset.name}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-ink-950 text-gold-400">
                      <Film className="h-10 w-10 mb-2 opacity-80" />
                      <span className="font-mono text-xs uppercase tracking-wider">MP4 Video Stream</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge tone={asset.type === "video" ? "gold-glow" : "emerald-glow"}>
                      {asset.type}
                    </Badge>
                  </div>
                </div>

                <h5 className="font-display text-sm font-bold text-white truncate">{asset.name}</h5>
                <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-white/50 border-t border-white/10 pt-2">
                  <span>{asset.section}</span>
                  <span>{asset.size}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
