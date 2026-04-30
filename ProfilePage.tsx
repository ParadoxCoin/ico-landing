import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { userAPI, apiKeyAPI } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Trash2, KeyRound, Terminal } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  // const { toast } = useToast();

  const [newApiKeyName, setNewApiKeyName] = useState("");

  const { data: profileData, isLoading: isLoadingProfile } = useQuery('userProfile', userAPI.getProfile);
  const { data: apiKeysData, isLoading: isLoadingApiKeys } = useQuery('apiKeys', apiKeyAPI.list);

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation(userAPI.updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('userProfile');
      alert("Profil başarıyla güncellendi.");
      // toast({ title: "Başarılı", description: "Profiliniz güncellendi." });
    },
    onError: () => {
      alert("Profil güncellenirken bir hata oluştu.");
      // toast({ variant: "destructive", title: "Hata", description: "Profil güncellenemedi." });
    }
  });

  const { mutate: createApiKey, isLoading: isCreatingKey } = useMutation(apiKeyAPI.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('apiKeys');
      alert(`Yeni API Anahtarınız: ${data.data.api_key}\n\nBu anahtarı güvenli bir yere kaydedin. Tekrar gösterilmeyecektir.`);
      setNewApiKeyName("");
    },
  });

  const { mutate: deleteApiKey, isLoading: isDeletingKey } = useMutation(apiKeyAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('apiKeys');
      alert("API anahtarı silindi.");
      // toast({ title: "Başarılı", description: "API anahtarı silindi." });
    },
  });

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    updateProfile({ full_name: fullName });
  };

  const handleCreateKey = () => {
    if (!newApiKeyName) return;
    createApiKey({ name: newApiKeyName });
  };

  if (isLoadingProfile || isLoadingApiKeys) {
    return <div className="container mx-auto p-4 space-y-8"><Skeleton className="h-96 w-full" /></div>;
  }

  if (!profileData) {
    return (
      <Alert variant="destructive" className="m-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Hata!</AlertTitle>
        <AlertDescription>Kullanıcı profili yüklenemedi.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Profil Ayarları</h1>

      <Card>
        <CardHeader>
          <CardTitle>Kişisel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" value={profileData.data.email} disabled />
            </div>
            <div>
              <label htmlFor="fullName" className="text-sm font-medium">Tam Ad</label>
              <Input id="fullName" name="fullName" type="text" defaultValue={profileData.data.full_name} />
            </div>
            <Button type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Güncelle
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Anahtarları</CardTitle>
          <CardDescription>
            Platformu harici uygulamalardan kullanmak için API anahtarları oluşturun.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Yeni anahtar için bir isim girin..." 
              value={newApiKeyName}
              onChange={(e) => setNewApiKeyName(e.target.value)}
            />
            <Button onClick={handleCreateKey} disabled={isCreatingKey || !newApiKeyName}>
              {isCreatingKey ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
              Oluştur
            </Button>
          </div>
          <div className="space-y-2">
            {apiKeysData?.data.map((key: any) => (
              <div key={key.id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-semibold">{key.name}</p>
                  <p className="text-sm text-muted-foreground">Prefix: {key.key_prefix}...</p>
                  <p className="text-xs text-muted-foreground">Oluşturulma: {new Date(key.created_at).toLocaleDateString()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteApiKey(key.id)} disabled={isDeletingKey}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;