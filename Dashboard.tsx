import { useQuery } from "react-query";
import { dashboardAPI } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CreditCard, Activity, Users } from "lucide-react";

const DashboardPage = () => {
  // 1. Dashboard istatistiklerini ve son aktiviteleri çekmek için useQuery kullanımı
  const { 
    data: stats, 
    isLoading: isLoadingStats, 
    isError: isErrorStats 
  } = useQuery("dashboardStats", dashboardAPI.getStats);

  const { 
    data: recentActivity, 
    isLoading: isLoadingActivity, 
    isError: isErrorActivity 
  } = useQuery("recentActivity", () => dashboardAPI.getRecentActivity(5));

  // Hata durumunu yönet
  if (isErrorStats || isErrorActivity) {
    return (
      <Alert variant="destructive" className="m-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Hata!</AlertTitle>
        <AlertDescription>
          Dashboard verileri yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Kredi Kartı */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kredi Bakiyesi</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-2xl font-bold">{stats?.data.credits_balance ?? 0} Kredi</div>
            )}
            <p className="text-xs text-muted-foreground">
              Kullanılabilir toplam bakiye
            </p>
          </CardContent>
        </Card>

        {/* Diğer istatistik kartları da benzer şekilde güncellenir... */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugün Harcanan</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-2xl font-bold">{stats?.data.credits_spent_today ?? 0} Kredi</div>
            )}
            <p className="text-xs text-muted-foreground">
              Son 24 saatteki harcama
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Son Aktiviteler Bölümü */}
      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
          <CardDescription>
            Platformda gerçekleştirdiğiniz son işlemler.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingActivity ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="space-y-8">
              {recentActivity?.data.length > 0 ? (
                recentActivity.data.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.details.summary || activity.service_type}</p>
                      <p className="text-sm text-muted-foreground">{new Date(activity.created_at).toLocaleString()}</p>
                    </div>
                    <div className="ml-auto font-medium text-red-500">-{activity.credits_charged} Kredi</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Henüz bir aktiviteniz bulunmuyor.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;