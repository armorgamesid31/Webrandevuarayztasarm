# SalonAsistan - Production Frontend

> Mobil-öncelikli güzellik salonu randevu sistemi UI bileşenleri

## 📋 Proje Yapısı

```
src/
├── components/          # Presentational Components
│   ├── Header.tsx       # Logo + Cinsiyet göstergesi
│   ├── SearchBar.tsx    # Arama input'u
│   ├── QuickActionCards.tsx  # Hızlı eylem kartları
│   ├── ReferralBanner.tsx    # Kampanya kartı (growth hack)
│   ├── PriceFooter.tsx       # Sticky fiyat çubuğu
│   └── WelcomeModal.tsx      # Cinsiyet seçim modalı
├── pages/
│   └── Home.tsx         # Ana sayfa (state yönetimi)
└── App.tsx              # Root component

components/              # Legacy/Complex Components
├── ServiceList.tsx      # Hizmet listesi (kategorizasyon)
├── DateTimePicker.tsx   # Tarih/saat seçici
├── BookingModal.tsx     # Randevu onay modalı
└── PriceBreakdownModal.tsx  # Fiyat detay modalı

data/
└── services.ts          # Hizmet verileri
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary Gold:** `#D4AF37`
- **Dark:** `#2D2D2D`
- **Background:** `#FAFAFA`
- **Success:** `#10B981`

### Stil Kuralları
- **Kartlar:** `rounded-2xl` + `shadow-sm`
- **Butonlar:** `rounded-full`
- **Sticky Footer:** `shadow-lg`
- **Mobile-first:** 390px temel genişlik

## 🛠️ Teknoloji Stack

- **React 19** - Function components
- **TypeScript** - Tip güvenliği
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon set
- **Motion (Framer Motion)** - Animasyonlar
- **Vite** - Build tool

## 📦 Bileşen Özellikleri

### ✅ Presentational Components (Yeni)

Tüm bileşenler:
- ✅ Props-driven (state yok)
- ✅ Tek sorumluluk prensibi
- ✅ TypeScript interface'leri
- ✅ Accessibility (aria-label)
- ✅ Tailwind CSS only

#### Header
```tsx
<Header 
  customerName="Ayşe"
  selectedGender="woman"
  onGenderClick={() => {}}
/>
```

#### SearchBar
```tsx
<SearchBar 
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Hizmet ara..."
/>
```

#### ReferralBanner
```tsx
<ReferralBanner
  isActive={true}
  phoneValue="5551234567"
  onToggle={() => {}}
  onPhoneChange={(phone) => {}}
/>
```

#### PriceFooter
```tsx
<PriceFooter
  originalPrice={500}
  finalPrice={400}
  showDiscount={true}
  isEnabled={true}
  onConfirm={() => {}}
  onShowBreakdown={() => {}}
/>
```

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Production build
npm run build
```

## 📱 Mobil UX Akışı

1. **Karşılama Modalı** → Cinsiyet seçimi (👩/👨)
2. Modal kapanır → **Header'da emoji** gösterilir
3. **Hizmet seçimi** → Gender-based fiyatlandırma
4. **"Bana/Misafir"** toggle → Inline konfigürasyon
5. **Tarih/Saat** seçimi → Dinamik slot'lar
6. **Sticky Footer** → Canlı fiyat güncellemesi

## 🎯 Özellikler

### ✨ Growth Hack - Referral Card
- Toggle switch animasyonu
- 10 haneli telefon validasyonu
- 100 TL otomatik indirim
- Gerçek zamanlı feedback

### 💰 Smart Pricing
- Cinsiyet bazlı fiyatlar
- İndirimli fiyat gösterimi (strikethrough)
- Paket kullanımı desteği
- Referral indirimi

### 🎨 UI/UX İyileştirmeleri
- Glassmorphism modal
- Spring animasyonlar
- Gradient butonlar
- Responsive tasarım

## 📝 Kodlama Standartları

### ❌ YAPILMAMASI GEREKENLER
- Inline styles kullanma
- CSS dosyaları oluşturma (globals.css hariç)
- Mock API çağrıları
- Rastgele animasyonlar
- Lorem ipsum placeholder'lar

### ✅ YAPILMASI GEREKENLER
- TypeScript kullan
- Props tiplerini tanımla
- Accessibility ekle (aria-label)
- Tailwind arbitrary values: `bg-[#D4AF37]`
- Component başına tek sorumluluk

## 🔐 Güvenlik

> ⚠️ **Not:** Bu UI-only bir frontend'dir. 
> - API çağrıları YOK
> - Backend logic YOK  
> - Gerçek veri saklama YOK

Production'da backend entegrasyonu gereklidir.

## 📄 Lisans

Özel proje - SalonAsistan © 2026
