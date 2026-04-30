import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { imageAPI } from "@/services/api";
import { useUserStore } from "@/stores/userStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Image as ImageIcon, Terminal } from "lucide-react";

const ImageGenerationPage = () => {
  const [prompt, setPrompt] = useState("");
  const [modelId, setModelId] = useState("");
  
  const setCredits = useUserStore((state) => state.setCredits);
  const queryClient = useQueryClient();

  const { 
    data: modelsData, 
    isLoading: isLoadingModels 
  } = useQuery("imageModels", imageAPI.getModels);

  const { 
    mutate: generateImage, 
    isLoading: isGenerating, 
    isError, 
    error, 
    data: generationResult 
  } = useMutation(imageAPI.generate, {
    onSuccess: (data) => {
      setCredits(data.data.new_credits_balance);
      queryClient.invalidateQueries("dashboardStats");
      queryClient.invalidateQueries("recentActivity");
      queryClient.invalidateQueries("mediaLibrary");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !modelId) {
      alert("Lütfen bir prompt girin ve model seçin.");
      return;
    }
    generateImage({
      prompt,
      model_id: modelId,
      num_images: 1,
      aspect_ratio: "1:1",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Görsel Üretimi</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Hayalinizdeki görseli tanımlayın... (Örn: A futuristic city with flying cars, cinematic lighting)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              disabled={isGenerating}
            />
            {isLoadingModels ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select onValueChange={setModelId} value={modelId} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue placeholder="Bir model seçin" />
                </SelectTrigger>
                <SelectContent>
                  {modelsData?.data.map((model: any) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isGenerating || !prompt || !modelId}>
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isGenerating ? "Üretiliyor..." : "Üret"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isGenerating && (
        <div className="mt-6 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">Görseliniz hazırlanıyor, lütfen bekleyin...</p>
        </div>
      )}

      {isError && (
        <Alert variant="destructive" className="mt-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Üretim Başarısız</AlertTitle>
          <AlertDescription>
            {(error as any)?.response?.data?.detail || "Görsel üretilirken bir hata oluştu. Krediniz yetersiz olabilir veya servis geçici olarak kullanılamıyor olabilir."}
          </AlertDescription>
        </Alert>
      )}

      {generationResult && (
        <Card className="mt-6">
          <CardHeader><CardTitle>Üretilen Görsel</CardTitle></CardHeader>
          <CardContent>
            <img 
              src={generationResult.data.medias[0].file_url} 
              alt={prompt} 
              className="rounded-lg shadow-md w-full max-w-md mx-auto"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageGenerationPage;