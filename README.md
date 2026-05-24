# ⚔️ COPS-2 TAC-COM // Tactical AI Advisor & Wargame Command Suite

**COPS-2 TAC-COM (Command Ops 2 Tactical Command & Advisory Suite)**, Panther Games tarafından geliştirilen gerçekçi operasyonel savaş oyunu **Command Ops 2** için tasarlanmış askeri karargah temalı bir yardımcı komuta konsolu, taktiksel hesaplama motoru ve yerel yapay zeka entegrasyonuna sahip kurmay danışmanıdır.

Uygulama, oyunun resmi kullanım kılavuzundan (**CO2 Game Manual v1.2.pdf**) doğrudan taranan mekanik kuralları, formülleri ve taktik parametreleri bünyesinde barındırarak, oyunculara savaş alanında rehberlik etmek üzere tasarlanmıştır. **%100 yerel (client-side)** olarak çalışır; internet veya harici sunucu kurulumu gerektirmez, doğrudan çift tıklanarak çalıştırılabilir ve **GitHub Pages** üzerinde kolayca yayınlanabilir.

---

## 🖥️ Temel Özellikler & Arayüz Yapısı

Uygulama 5 ana taktik ekrandan oluşmaktadır:

### 1️⃣ Taktik Danışman & Savaş Odası (Advisor Room)
*   **Akıllı Chat Terminali:** Command Ops 2 mekanikleri üzerine soru sorabileceğiniz, oyun içi terimleri ve taktikleri tartışabileceğiniz terminal tarzı arayüz.
*   **Üç Farklı Kurmay Karakteri (Personas):**
    *   **Kurmay Binbaşı (Staff Officer):** Resmi ve disiplinli bir dille askeri doktrin ve operasyonel planlama tavsiyeleri verir.
    *   **Gazi Çavuş (Combat Veteran):** Cephenin tozunu yutmuş, öyküsel anlatımla muharebe tecrübelerini paylaşan gazi üslubu.
    *   **Teknik Analist (Technical Advisor):** Doğrudan oyun motorunun arka plandaki matematiksel çarpanlarına ve katsayılarına odaklanır.
*   **Yerel RAG (Bilgi Besleme) Entegrasyonu:** Sorduğunuz soru ("gecikme", "ikmal", "topçu", "yorgunluk" vb.) arayüz tarafından yakalanır ve kılavuzun ilgili sayfalarındaki ham İngilizce PDF paragrafları yerel yapay zekanıza (Ollama) bağlam olarak fısıldanarak **hallüsinasyon (uydurma) üretmesi kesin olarak engellenir**.

### 2️⃣ Muharebe Hesaplayıcıları (Tactical Calculators)
*   **HQ Emir Gecikmesi Hesaplayıcı (Page 120 Formülü):**
    *   Oyunun kendi iç formülüne göre; **Toplam Gecikme = (Gönderen HQ × 2/3) + (Alıcı Birim / 3)** şeklinde hesaplama yapar.
    *   Tümen (60 dk), Tugay (40 dk), Tabur (30 dk) ve Bölük (20 dk) komuta katmanlarını simüle eder.
    *   Komutan & Kurmay heyeti kalitesine bağlı olarak gecikmeyi **+/- %25** oranında esnetir.
    *   Fatigue (yorgunluk), suppression (baskılanma), telsiz haberleşme durumu (runners/ulaklar) ve emir karmaşıklığı çarpanlarını tam zamanlı olarak hesaplar.
*   **Birim Verimliliği & Koruma Hesaplayıcı (Page 147 Formülü):**
    *   Kılavuzdaki **6 resmi Deployment (Mevzilenme)** durumunu (Undeployed, Taking Cover, Deployed, Dug-In, Entrenched, Fortified) simüle eder.
    *   Birimlerin hareket halindeki atış cezalarını (Undeployed: %55 isabet penaltısı) ve müstahkem sığınaklardaki hasar emilim oranlarını (Fortified + Urban arazide %97.5 hasar azaltma) birebir hesaplar.
    *   Lojistik ikmal seviyesi, fatigue (yorgunluk) ve cohesion (takım uyumu) değerlerinin birleşimiyle **Etkin Taarruz Gücünü** hesaplar.

### 3️⃣ NATO Sembolleri Ansiklopedisi (NATO Symbology Guide)
*   Command Ops 2 haritasında yer alan askeri counters sembollerinin (HQ, Piyade, Zırhlı Birlikler, Keşif, Topçu, Havan, Tank Savar ve İstihkam) yüksek sadakatli SVG çizimleri.
*   Counters üzerine tıklandığında birimin savaş alanı rolü, güçlü yönleri, zayıf yönleri ve operasyonel kullanım tavsiyelerini içeren askeri bilgi kartları açılır.

### 4️⃣ Senaryo Planlayıcı & Kontrol Listesi (Checklist)
*   *Return to St. Vith (Tutorial)*, *Arnhem Bridge* ve *Bastogne* senaryoları için kurmay hazırlık brifingleri ve arazide dikkat edilmesi gereken taktik kilit noktaları.
*   **Pre-Engagement Checklist:** Oyunu durdurulmuş halden çıkarmadan (Unpause) önce oyuncunun yapması gereken 6 adımlık askeri durum kontrol listesi. Kontrol listesi tamamlandıkça HUD üzerindeki hazırlık durum telemetrisi dinamik olarak güncellenir.

### 5️⃣ Resmi Kılavuz Veri Bankası (Official Manual DB)
*   Docs klasöründeki resmi **`CO2 Game Manual v1.2.pdf`** kılavuzundan otomatik taranmış olan ham kural blokları.
*   Konulara göre ayrılmış, sayfa numarası referanslı orijinal PDF paragrafları ve bunların **Kurmay Taktik Özetleri**.

---

## 🔊 Telsiz Ses Sentezleyici (Atmospheric Audio)
Arayüzün askeri bir sahra bilgisayarı atmosferi sunması için bir telsiz hum/static cızırtısı entegre edilmiştir. Bu ses, **herhangi bir MP3/WAV dosyası indirilmeden**, tarayıcının kendi **Web Audio API** ses sentezleme motoru aracılığıyla yerel olarak üretilir. Sol menüdeki düğmeden açılıp kapatılabilir. Düğmelere tıklandığında askeri sahra telsizi onay bip (click) sesleri duyulur.

---

## 🔌 Yerel Yapay Zeka (Ollama) Bağlantı Kılavuzu

Uygulama, yerel bilgisayarınızda çalışan **Ollama** sunucusuyla doğrudan haberleşebilir.

### 1. Önerilen Yapay Zeka Modelleri:
*   **gpt-oss-120 / gpt-oss-120:latest** (Kullanıcı tarafından yapılandırılan birincil model)
*   **llama3** / **llama3.1**
*   **mistral**
*   **gemma2** / **gemma2:9b**

### 2. Windows'ta CORS (Erişim Engeli) Sorununun Kesin Çözümü:
Tarayıcılar güvenlik nedeniyle yerel `file://` dosyalarından Ollama'ya (`http://localhost:11434`) fetch istekleri gönderilmesini varsayılan olarak bloke eder. Bunu çözmek için Ollama'ya tarayıcı erişim yetkisi vermelisiniz:

1.  **Sistem Ortam Değişkenleri'ni Açın:**
    *   Klavyenizden **Windows Tuşuna** basın ve arama çubuğuna **"ortam değişkenleri"** yazıp *Sistem ortam değişkenlerini düzenleyin* ekranını açın.
2.  **Değişkeni Ekleyin:**
    *   Alt kısımdaki **Ortam Değişkenleri...** butonuna tıklayın.
    *   *Kullanıcı değişkenleri* (üstteki alan) altındaki **Yeni...** butonuna basın.
    *   **Değişken adı:** `OLLAMA_ORIGINS`
   *   **Değişken değeri:** `*`
    *   Kaydedip tüm pencereleri **Tamam** tuşuna basarak kapatın.
3.  **Ollama'yı Yeniden Başlatın:**
    *   Görev çubuğunun sağ altındaki (saatin yanındaki simgeler arasında) küçük **Ollama ikonuna sağ tıklayın** ve **Quit** (Çıkış) seçin.
    *   Ollama uygulamasını masaüstünden veya Başlat menüsünden **tekrar sıfırdan başlatın**.
4.  Arayüze dönüp sayfayı yenileyin (**F5**) ve **Ollama Hattını Bağla** anahtarını açın. Sistem kurulu olan tüm modellerinizi otomatik algılayıp listeleyecektir!

---

## 🛠️ Yerel Kurulum & Çalıştırma

1.  **Doğrudan Çift Tıklama (Sıfır Kurulum):**
    *   [index.html](file:///c:/Users/yaucu/Desktop/DEVAM%20EDEN%20TASARILAR/Command%20ops%202%20program/index.html) dosyasına çift tıklayarak tarayıcınızda (Chrome, Edge, Firefox vb.) anında çalıştırabilirsiniz.
2.  **Yerel Sunucu Kurma (Alternatif):**
    *   Eğer yerel bir HTTP sunucusunda çalıştırmak isterseniz, klasörün içinde terminal açarak şu komutları kullanabilirsiniz:
        *   **Python ile:** `python -m http.server 8000`
        *   **Node.js ile:** `npx serve`
    *   Ardından tarayıcınızdan `http://localhost:8000` veya `http://localhost:3000` adresine gidebilirsiniz.

---

## 🌐 GitHub Pages Üzerinde Yayınlama Rehberi

Bu projeyi GitHub üzerinde barındırıp **GitHub Pages** ile canlıya almak, arkadaşlarınızla paylaşmak veya bir tarayıcı linki üzerinden doğrudan kullanmak için aşağıdaki adımları sırasıyla uygulayın.

### Adım 1: GitHub Üzerinde Yeni Bir Depo (Repository) Oluşturun
1.  [github.com](https://github.com) adresine gidin ve hesabınıza giriş yapın.
2.  Sağ üstteki **"+"** ikonuna tıklayıp **"New repository"** seçeneğini seçin.
3.  Depo adını girin (Örn: `cops2-tac-com`).
4.  Depoyu **Public (Açık)** olarak ayarlayın (GitHub Pages ücretsiz sürümde sadece Public depolarda çalışır).
5.  *Initialize this repository with* kısmındaki seçeneklerin hiçbirini işaretlemeyin (boş bir repo oluşturun).
6.  **Create repository** butonuna tıklayın.

### Adım 2: Çalışma Alanınızda Git'i Yapılandırın ve Dosyaları Gönderin
Kendi bilgisayarınızda, projenin kurulu olduğu klasörde (`Command ops 2 program`) terminal/PowerShell ekranını açın ve şu komutları sırasıyla çalıştırın:

```bash
# 1. Git deposunu başlatın
git init

# 2. Tüm dosyaları (HTML, CSS, JS ve Docs klasörünü) ekleyin
git add .

# 3. İlk yükleme commit'inizi oluşturun
git commit -m "feat: Command Ops 2 Tactical HUD & Manual RAG console completed"

# 4. Ana dalı 'main' olarak ayarlayın
git branch -M main

# 5. GitHub deponuzu yerel Git deposuna bağlayın 
# (NOT: Aşağıdaki URL'yi kendi oluşturduğunuz GitHub repo URL'si ile değiştirin!)
git remote add origin https://github.com/KULLANICI_ADINIZ/cops2-tac-com.git

# 6. Dosyaları GitHub'a yükleyin
git push -u origin main
```

### Adım 3: GitHub Pages Servisini Aktif Edin
1.  GitHub üzerindeki proje sayfanıza gidin.
2.  Üst menüdeki çark simgeli **"Settings"** (Ayarlar) sekmesine tıklayın.
3.  Sol menüdeki *Code and automation* başlığı altından **"Pages"** seçeneğine tıklayın.
4.  *Build and deployment* -> *Source* kısmının **"Deploy from a branch"** olduğunu doğrulayın.
5.  *Branch* kısmındaki dropdown menüsünden **`main`** dalını (ve yanındaki `/root` klasörünü) seçin.
6.  **Save** (Kaydet) butonuna tıklayın.

Aktivasyon tamamlandığında, sayfanın üst kısmında yeşil bir şerit belirecektir:
> 🔗 **Your site is live at:** `https://KULLANICI_ADINIZ.github.io/cops2-tac-com/`

*Bu linki kopyalayıp projenizin `README.md` dosyasındaki ilgili alana yapıştırabilirsiniz!*

---

## 📝 Katkıda Bulunma
Herhangi bir taktiksel hata tespit ederseniz veya NATO sembolleri tablosuna yeni askeri birimler eklemek isterseniz, lütfen bir Pull Request (PR) açın veya bir Issue oluşturun.

*Zafer lojistik yollarını koruyan, emir gecikmesini hesaba katan komutanındır!*
