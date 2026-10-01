"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Users,
  Trophy,
  TrendingUp,
  LogOut,
  Trash2,
  RefreshCw,
  Eye,
} from "lucide-react";
import { PROGRAM_WEEKS } from "@/lib/exercises";

// ═══════════════════════════════════════════════
// 🔑 MOT DE PASSE ADMIN — À CHANGER
// ═══════════════════════════════════════════════
const ADMIN_PASSWORD = "RDSG2026";

interface UserStats {
  name: string;
  slug: string;
  completedCount: number;
  totalExercises: number;
  percent: number;
  weeksCompleted: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<UserStats[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserStats | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("rdsg_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadUsers();
  }, [isAuthenticated]);

  const loadUsers = () => {
    const totalExercises = PROGRAM_WEEKS.flatMap((w) =>
      w.sessions.flatMap((s) => s.exercises)
    ).length;

    const allKeys = Object.keys(localStorage);
    const userKeys = allKeys.filter((k) =>
      k.startsWith("rope_jump_completed_")
    );

    const usersList: UserStats[] = [];

    userKeys.forEach((key) => {
      const slug = key.replace("rope_jump_completed_", "");
      try {
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        const completedCount = Array.isArray(data) ? data.length : 0;

        // Calculer les semaines complétées
        let weeksCompleted = 0;
        PROGRAM_WEEKS.forEach((w) => {
          const weekExos = w.sessions.flatMap((s) => s.exercises);
          const completed = weekExos.filter((e) =>
            data.includes(e.id)
          ).length;
          if (weekExos.length > 0 && completed === weekExos.length) {
            weeksCompleted++;
          }
        });

        usersList.push({
          name: slug
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          slug,
          completedCount,
          totalExercises,
          percent:
            totalExercises > 0
              ? (completedCount / totalExercises) * 100
              : 0,
          weeksCompleted,
        });
      } catch (e) {
        console.error("Error parsing", key, e);
      }
    });

    usersList.sort((a, b) => b.completedCount - a.completedCount);
    setUsers(usersList);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("rdsg_admin_auth", "true");
      setError("");
      setPassword("");
    } else {
      setError("Mot de passe incorrect");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("rdsg_admin_auth");
    setPassword("");
    setSelectedUser(null);
  };

  const handleDeleteUser = (slug: string) => {
    if (
      confirm(
        `Supprimer définitivement les données de "${slug}" ? Cette action est irréversible.`
      )
    ) {
      localStorage.removeItem(`rope_jump_completed_${slug}`);
      loadUsers();
      if (selectedUser?.slug === slug) setSelectedUser(null);
    }
  };

  // ═══════════════════════════════════════════════
  // ÉCRAN DE CONNEXION
  // ═══════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

        <Card className="w-full max-w-md border-primary/30 glow-mauve relative">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-mauve glow-mauve flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black">Accès Admin</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Zone réservée
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe administrateur"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-center"
              />
              {error && (
                <p className="text-sm text-destructive text-center font-semibold">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-mauve font-bold py-6"
              >
                Se connecter
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              Ousseynou Boubacar Cissé — Admin
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ═══════════════════════════════════════════════
  // DASHBOARD ADMIN
  // ═══════════════════════════════════════════════
  const totalCompletedAll = users.reduce(
    (sum, u) => sum + u.completedCount,
    0
  );
  const avgPercent =
    users.length > 0
      ? Math.round(users.reduce((sum, u) => sum + u.percent, 0) / users.length)
      : 0;

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-mauve glow-mauve-sm flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={loadUsers}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 pt-8 space-y-6">
        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black">{users.length}</div>
                <div className="text-xs text-muted-foreground">
                  Utilisateur{users.length > 1 ? "s" : ""}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black">{totalCompletedAll}</div>
                <div className="text-xs text-muted-foreground">
                  Exercices complétés
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black">{avgPercent}%</div>
                <div className="text-xs text-muted-foreground">
                  Progression moyenne
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des utilisateurs */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Utilisateurs</h2>
              <Badge variant="secondary">{users.length} total</Badge>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="font-semibold">Aucun utilisateur sur cet appareil</p>
                <p className="text-xs mt-2 max-w-sm mx-auto">
                  Les utilisateurs apparaîtront ici après s'être connectés
                  depuis <strong>ce navigateur</strong>.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((u, idx) => (
                  <div
                    key={u.slug}
                    className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/40 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-mauve flex items-center justify-center text-white font-bold text-lg">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        {idx === 0 && users.length > 1 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs">
                            👑
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold truncate">{u.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {u.completedCount} / {u.totalExercises} exercices
                          {u.weeksCompleted > 0 && (
                            <span className="ml-2 text-primary font-semibold">
                              • {u.weeksCompleted} semaine
                              {u.weeksCompleted > 1 ? "s" : ""} terminée
                              {u.weeksCompleted > 1 ? "s" : ""}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        className={
                          u.percent >= 75
                            ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                            : u.percent >= 50
                            ? "bg-primary/15 text-primary border-primary/30"
                            : u.percent >= 25
                            ? "bg-amber-500/15 text-amber-500 border-amber-500/30"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {Math.round(u.percent)}%
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(u)}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(u.slug)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Détail utilisateur sélectionné */}
        {selectedUser && (
          <Card className="border-primary/30">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  Détail : {selectedUser.name}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedUser(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-black text-primary">
                    {selectedUser.completedCount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Exercices complétés
                  </div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-black text-primary">
                    {Math.round(selectedUser.percent)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Progression globale
                  </div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-black text-primary">
                    {selectedUser.weeksCompleted} / 8
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Semaines terminées
                  </div>
                </div>
              </div>

              {/* Progression par semaine */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold">Progression par semaine</h3>
                <div className="space-y-2">
                  {PROGRAM_WEEKS.map((week) => {
                    const weekExos = week.sessions.flatMap((s) => s.exercises);
                    const data = JSON.parse(
                      localStorage.getItem(
                        `rope_jump_completed_${selectedUser.slug}`
                      ) || "[]"
                    );
                    const completed = weekExos.filter((e) =>
                      data.includes(e.id)
                    ).length;
                    const percent =
                      weekExos.length > 0
                        ? (completed / weekExos.length) * 100
                        : 0;

                    return (
                      <div
                        key={week.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="w-20 text-muted-foreground">
                          Semaine {week.id}
                        </span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-mauve transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-12 text-right font-semibold text-xs">
                          {Math.round(percent)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info limitation */}
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4 text-sm text-amber-600 dark:text-amber-400 space-y-2">
            <p>
              ⚠️ <strong>Limitation :</strong> Cette vue ne montre que les
              utilisateurs connectés sur <strong>ce navigateur</strong>.
            </p>
            <p className="text-xs">
              💡 Pour voir les utilisateurs sur tous les appareils, il faudra
              ajouter Supabase (base de données cloud gratuite).
            </p>
          </CardContent>
        </Card>

        {/* Signature */}
        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-sm font-bold text-foreground">Boubacar Cissé</p>
          <p className="text-xs text-primary font-semibold">
            Dev Fullstack — #77 315 04 50
          </p>
        </div>
      </main>
    </div>
  );
}