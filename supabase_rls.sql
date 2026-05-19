-- ZexAI Supabase Strict RLS and Table Configuration
-- Bu SQL betiği, projede kullanılan tabloları ve bunlara ait Row Level Security (RLS) politikalarını güvenli hale getirmek için hazırlanmıştır.
-- Supabase SQL Editor paneline yapıştırıp çalıştırabilirsiniz.

-- ==========================================
-- 1. PROCESSED PAYMENTS (IPN Idempotency & Double Spend Koruması)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.processed_payments (
    payment_id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    status TEXT NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS'i Etkinleştir
ALTER TABLE public.processed_payments ENABLE ROW LEVEL SECURITY;

-- Anonim/Authenticated kullanıcılar doğrudan erişemez. Sadece Service Role yetkilidir.
CREATE POLICY "Allow service role full access on processed_payments" 
    ON public.processed_payments 
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- ==========================================
-- 2. PRESALE REFERRALS (Referans Takip Tablosu)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.presale_referrals (
    id BIGSERIAL PRIMARY KEY,
    referrer_wallet TEXT NOT NULL,
    referred_wallet TEXT NOT NULL,
    event_type TEXT NOT NULL,
    zex_amount NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS'i Etkinleştir
ALTER TABLE public.presale_referrals ENABLE ROW LEVEL SECURITY;

-- Politika A: Anonim kullanıcılar veri ekleyebilir (presale katılımı sırasında client-side istekleri için gerekebilir, veya Edge function service key kullanıyorsa bu kapatılabilir)
-- Eğer Edge function 'service_role' key kullanıyorsa bu anonim ekleme izni kaldırılmalıdır (En güvenli yaklaşım).
-- Şimdilik service_role için tam yetki verelim:
CREATE POLICY "Allow service role full access on presale_referrals" 
    ON public.presale_referrals 
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Politika B: Kullanıcılar kendi cüzdan adreslerine ait referans kayıtlarını okuyabilir.
CREATE POLICY "Allow users to read their own referrals" 
    ON public.presale_referrals 
    FOR SELECT 
    TO anon, authenticated
    USING (
        lower(referrer_wallet) = current_setting('request.headers', true)::json->>'x-user-wallet' 
        OR 
        lower(referred_wallet) = current_setting('request.headers', true)::json->>'x-user-wallet'
    );

-- ==========================================
-- 3. USER CREDITS (Varsayılan olarak platformda kullanılan krediler)
-- ==========================================
-- Eğer veritabanınızda 'user_credits' tablosu varsa, kullanıcıların kendi kredilerini değiştirmesini engelleyen RLS politikası:

ALTER TABLE IF EXISTS public.user_credits ENABLE ROW LEVEL SECURITY;

-- Önceki çakışan politikaları sil
DROP POLICY IF EXISTS "Users can only read their own credits" ON public.user_credits;
DROP POLICY IF EXISTS "Users can view own credits" ON public.user_credits;

CREATE POLICY "Users can only read their own credits" 
    ON public.user_credits 
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

-- Güncelleme yetkisini tamamen kapatıyoruz (Sadece backend/service_role güncelleyebilir)
DROP POLICY IF EXISTS "Users can update their own credits" ON public.user_credits;

