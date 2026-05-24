// Command Ops 2 Tactical AI Advisor & Narrator Engine

// Offline Knowledge Base for Offline Mode
const offlineDatabase = [
  {
    keywords: ['gecikme', 'delay', 'order delay', 'emir gecikmesi', 'bekleme'],
    topic: 'Emir Gecikmesi (Order Delay)',
    responses: {
      staff: `[Kurmay Binbaşı]: Emir gecikmesi (Order Delay), Command Ops 2'nin en temel gerçekçilik mekanizmasıdır. Karargahınızın (HQ) altındaki birimlerin emrinizi alması, planlaması ve harekete geçmesi için geçen süreyi temsil eder. 
Bu süre; Karargah Liderinin Yeteneğine, Personel Kapasitesine (Staff Capacity), Karargahın Yorgunluğuna, Baskılanma (Suppression) seviyesine ve telsiz haberleşme durumuna bağlıdır. 
*Tavsiye:* Asla anlık emirler vermeyin. Taarruzu veya çekilmeyi en az 1 saat önceden planlayın. Karargahları güvende tutarak personel baskılanmasını önleyin.`,
      veteran: `[Kıdemli Çavuş]: Evlat, cephede işler 'hemen yap' demekle yürümez! Sen karargahtan haritayı çizip telsizciye verirsin, telsizci hattaki cızırtıyı aşar da ön cepheye ulaştırabilirse, oradaki teğmen planı ancak okur. O sırada Alman topçusu tepemize inerse o emir çöpe gider.
Eğer askerlerini ateşe süreceksen, en az bir saat önceden emrini yazıp yola çıkaracaksın. Yoksa tanklar yolun ortasında hedef tahtası gibi bekler!`,
      technical: `[Teknik Analiz]: **Mekanik Detayı - Order Delay Formülasyonu:**
*   **Base Delay:** Karargahın Eğitim Seviyesi (Elite: ~12dk, Veteran: ~22dk, Line: ~35dk, Green: ~55dk, Untrained: ~90dk).
*   **Fatigue Multiplier:** Karargah yorgunluğu (Fresh: x1.0, Tired: x1.25, Fatigued: x1.6, Exhausted: x2.2).
*   **Suppression Multiplier:** Çatışma baskısı (None: x1.0, Light: x1.35, Heavy: x1.9, Pinned: x2.8).
*   **Comms Penalty:** Haberleşme kalitesi (Mükemmel: +0dk, Bozuk: +18dk, Kopuk/Ulakla: +50dk).
*   **Complexity Penalty:** Emir tipi (Simple Move: +0dk, Coordinated Attack: +30dk).`
    }
  },
  {
    keywords: ['ikmal', 'supply', 'mühimmat', 'ammo', 'los', 'benzin', 'yakıt'],
    topic: 'İkmal Hatları (Line of Supply - LOS)',
    responses: {
      staff: `[Kurmay Binbaşı]: Lojistik, harekatın can damarıdır. Her birim, bağlı olduğu Karargah (HQ) üzerinden harita kenarındaki İkmal Noktalarına (Supply Entry Point) bağlı olmak zorundadır.
Birimlerin altındaki 'Sup' çizgilerinin kırmızıya dönmesi, lojistik hattının koptuğunu gösterir. İkmalsiz kalan birliklerin moral ve kondisyonu hızla çöker, cephane ve yakıtları bittiğinde savunmasız kalırlar.
*Tavsiye:* İkmal yollarını korumak için öncü keşif gruplarını yolların kesişim noktalarına yerleştirin. Düşmanın sızma girişimlerini engelleyin.`,
      veteran: `[Kıdemli Çavuş]: Merminiz yoksa süngünüz de bir işe yaramaz evlat. Tanklar karlı Arden dağlarında benzinsiz kaldığında, onları terk edip yürümek zorunda kalırsın.
Haritada gözün hep lojistik yollarında olsun. Düşman arkaya sızıp o yolları tutarsa, cephedeki tüm çocukları aç ve cephanesiz ölüme terk etmiş olursun. Lojistik hattını kesen o Alman devriyelerini derhal temizle!`,
      technical: `[Teknik Analiz]: **Mekanik Detayı - Supply Distribution:**
İkmal dağıtımı her gün belirli aralıklarla (lojistik fazı) gerçekleşir. İkmal akışı yollar (Roads) üzerinden en yüksek hızla, ormanlık ve engebeli araziler üzerinden ise çok yavaş akar.
Birimlerin lojistik durumunu etkileyen değişkenler:
1. **Supply Path Distance:** HQ'ya olan lojistik koridoru uzunluğu.
2. **Enemy Zone of Control (ZOC):** Düşman kontrol alanları ikmal hatlarını bloke eder.
3. **Supply Depots Status:** Depoların doluluk ve hasar oranı.`
    }
  },
  {
    keywords: ['topçu', 'artillery', 'havan', 'bombard', 'bombardıman', 'destek'],
    topic: 'Topçu Desteği ve Koordinasyon',
    responses: {
      staff: `[Kurmay Binbaşı]: Topçu, muharebe meydanlarının hükümdarıdır. Savunmadaki düşman siperlerini yumuşatmadan veya ilerleyen düşman kolonlarını baskılamadan taarruz başlatmak büyük bir hatadır.
Topçu bataryalarınızı (Artillery / Mortar) kendi komuta ağınıza bağlı tutun. Saldırı başlatmadan önce en az 30-45 dakika hazırlık bombardımanı (Bombard) emri verin.
*Tavsiye:* Topçu ateşini düşman karargahlarının üzerine yoğunlaştırarak onların emir zincirini (C2) felç edebilirsiniz.`,
      veteran: `[Kıdemli Çavuş]: Çocuklar taarruza kalkmadan önce o tepenin Almanların tepesine yıkılması gerekir. Eğer topçu desteği almadan açık arazide koşmaya kalkarsanız, makineli tüfekler sizi biçer.
Telsizden koordinatları gir, obüsleri kükret! Düşman kafasını siperden kaldıramaz hale geldiğinde, işte o an piyadelerine 'Hücum' emrini vereceksin!`,
      technical: `[Teknik Analiz]: **Mekanik Detayı - Artillery Math:**
*   **Accuracy (İsabet):** Hedef arazinin türü (Meskun mahal: yüksek koruma sağlar, Açık arazi: yüksek zayiat), hedefin görünürlüğü (Keşif birimlerince spotlanmış olması isabet oranını artırır).
*   **Suppression vs Casualty:** Topçu ateşi genellikle düşmanı öldürmekten çok baskılamayı (Suppression) amaçlar. Baskılanan birimlerin atış isabeti ve moral değeri 0'a yaklaşır.
*   **Ammo Constraints:** Topçunun mühimmat tüketimi muazzamdır. İkmal durumları kırmızıya dönmeden bombardımanı sonlandırıp dinlendirin.`
    }
  },
  {
    keywords: ['yorgunluk', 'fatigue', 'kondisyon', 'dinlenme', 'rest', 'uyku'],
    topic: 'Yorgunluk ve Kondisyon Yönetimi',
    responses: {
      staff: `[Kurmay Binbaşı]: Sürekli hareket halinde olan veya aralıksız çatışan birimler hızla yorulur. Yorgunluk (Fatigue) seviyesi yükselen birliklerin savaşma azmi düşer, emir gecikmesi artar ve geri çekilme eğilimi gösterirler.
Birimlerinizi düzenli olarak geride, korunaklı arazilerde dinlendirmek (Rest / Defend in-situ) muharebe etkinliğini korumak için elzemdir.
*Tavsiye:* Özellikle soğuk kış senaryolarında (Ardenler) açık arazide dinlenen birlikler donma ve aşırı yorgunluk tehlikesi yaşar. Birlikleri ormanlık veya kentsel binalarda dinlendirin.`,
      veteran: `[Kıdemli Çavuş]: Gece gündüz çamurda, karda koşturduğun o çocuklar nihayetinde insan evlat! Göz kapakları ağırlaşmış, parmakları soğuktan donmuş bir askerin nişan almasını bekleyemezsin.
Eğer askerlerini 24 saat boyunca dinlendirmeden savaştırırsan, ilk çatışmada panik yapıp silahlarını bırakıp kaçarlar. Onları siperlere çek, sıcak çorba ve birkaç saat uyku ver!`,
      technical: `[Teknik Analiz]: **Mekanik Detayı - Fatigue Recovery:**
Yorgunluk artışı hareket hızına (Maneuver, Fast, Road) ve çatışma yoğunluğuna bağlıdır. 
Yorulma katsayıları:
*   **Resting State:** "Defend" veya "Rest" modunda yorgunluk düşüşü başlar. Meskun mahalde (Urban) dinlenme hızı, açık araziden 3 kat daha hızlıdır.
*   **Weather Effects:** Kar, yağmur and dondurucu soğuklar yorgunluk artışını %50 oranında hızlandırır.`
    }
  },
  {
    keywords: ['taarruz', 'saldırı', 'attack', 'hucum', 'assault'],
    topic: 'Taarruz Planlama ve Doktrin',
    responses: {
      staff: `[Kurmay Binbaşı]: Planlanmamış bir taarruz, felakete davetiyedir. Bir taarruz tasarlarken şu üç unsuru birleştirin: 
1) Keşif (Düşman kanatlarını tespit edin), 
2) Hazırlık Ateşi (Topçu bombardımanı), 
3) Koordineli İlerleme (HQs yardımıyla eş zamanlı hareket).
Asla birimlerinizi tek tek saldırtmayın, tabur seviyesinde toplu taarruzlar planlayın ve kanat güvenliklerinizi (Flank Security) koruyun.`,
      veteran: `[Kıdemli Çavuş]: Tankları öne sürüp arkasından piyadeleri koşturmak kolay sanırsın. Ama o tepedeki görünmez Alman 88'lik topları tankları teker teker avladığında geriye kalan piyade açıkta kalır.
Saldıracaksan önce keşifçileri gönder, düşman nerede gör. Sonra topçuya koordinatı ver, orayı cehenneme çevirsin. Tanklar ve mekanize piyade yan yana, birbirini koruyarak tepeye girmeli!`,
      technical: `[Teknik Analiz]: **Mekanik Detayı - Attack Orders:**
Command Ops 2'de "Attack" emri verdiğinizde alt parametreleri ayarlayabilirsiniz:
*   **FUP (Forming Up Point):** Birimlerin taarruza kalkmadan önce toplanacağı güvenli bölge.
*   **Route:** En hızlı (Fastest), en güvenli (Covert) veya en kısa (Shortest).
*   **Rate of Fire & Bystep:** Atış sıklığı ve kayıplara dayanıklılık toleransı. Saldırıyı yöneten HQ'nun yeteneği, alt birimlerin koordinasyonunu doğrudan etkiler.`
    }
  }
];

window.askAdvisor = async function({
  question,
  persona,
  ollamaUrl = 'http://localhost:11434',
  ollamaModel = 'gpt-oss-120',
  useLocalOllama = false,
  manualContext = ''
}) {
  const normalizedQuestion = question.toLowerCase();

  // 1. Try Local Ollama if selected
  if (useLocalOllama) {
    try {
      // Define system prompt based on selected persona
      let personaPrompt = '';
      if (persona === 'staff') {
        personaPrompt = 'Sen son derece profesyonel, resmi, disiplinli, askeri doktrin ve kurmay planlamaya odaklanan kıdemli bir İkinci Dünya Savaşı (WWII) Kurmay Binbaşısın (Staff Officer). Konuşma tarzın resmi, ciddi ve öğreticidir.';
      } else if (persona === 'veteran') {
        personaPrompt = 'Sen cephede çarpışmış, siperlerin tozunu yutmuş, askeri jargon kullanan, biraz sert ama babacan, öyküsel anlatımla konuşan Kıdemli bir Savaş Gazisi Çavuşsun (Combat Veteran).';
      } else {
        personaPrompt = 'Sen Command Ops 2 oyun motorunun matematiksel modellerine, arka plan formüllerine, arazi katsayılarına ve teknik mekaniklerine odaklanan bir Teknik Analistsin (Technical Advisor).';
      }

      const systemMessage = `Sen Command Ops 2 (Panther Games firmasının geliştirdiği karlı Ardenler, Hollanda ve Yunanistan cephelerini konu alan son derece gerçekçi İkinci Dünya Savaşı operasyonel savaş oyunu) konusunda uzman bir yapay zeka danışmanı ve anlatıcısısın. 

${personaPrompt}

DİKKAT (HALLÜSİNASYON ENGELİ): 
- Command Ops 2 bir İkinci Dünya Savaşı (WWII) simülasyonudur. Kesinlikle modern ağ mühendisliği terimleri (SNR, low-delay, queue state, pre-load, synchronise clocks vb.) veya bilim kurgu unsurları (Satürn relay, laser, robot vb.) KULLANMA.
- Savaş alanındaki tüm iletişim telsiz telsiz (radio static), kablolu hatlar (wire) veya fiziki askeri ulaklar (runners) ile yapılır. İkmal ise İkmal Giriş Noktalarından (SEP) üslere (Base) ve oradan HQ aracılığıyla yollar üzerinden kamyon/at arabalarıyla taşınır.
- Yanıtlarında her zaman gerçek askeri terminolojiye ve oyun kılavuzundaki sayfa referanslarına (Page 121, Page 116 vb.) sadık kal. Kısa, vurucu, okunaklı markdown formatında Türkçe yanıt ver.`;

      // Structure messages list
      const messages = [
        { role: 'system', content: systemMessage }
      ];

      // If RAG context is available, inject it to ground the LLM
      if (manualContext) {
        messages.push({ 
          role: 'system', 
          content: `BAĞLAM (RESMİ OYUN KILAVUZU DETAYLARI):\nBunu temel gerçek kural kaynağı olarak al ve dışına çıkma:\n${manualContext}` 
        });
      }

      messages.push({ role: 'user', content: question });

      const response = await fetch(`${ollamaUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: ollamaModel,
          messages: messages,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.message && data.message.content) {
        return data.message.content;
      } else if (data && data.response) {
        // Fallback for non-chat generate API structure
        return data.response;
      }
      throw new Error('Yanıt gövdesi çözümlenemedi.');
    } catch (error) {
      console.error('Ollama connection failed, falling back to offline database:', error);
      return `⚠️ **[BAĞLANTI HATASI (CORS / ERİŞİM ENGELİ)]** 
Yerel Ollama sunucunuza (${ollamaUrl}) tarayıcının güvenlik duvarı (CORS politikası) nedeniyle bağlanılamıyor. 

Windows'ta Ollama'nın tarayıcı bağlantılarına izin vermesini sağlamak için şu adımları takip edin:
1. **Sistem Ortam Değişkenleri'ni Açın:** Başlat menüsüne "Ortam Değişkenleri" yazın ve *Sistem Ortam Değişkenlerini Düzenleyin* seçeneğini açın.
2. **Değişkeni Ekleyin:** Alt kısımdaki **Ortam Değişkenleri...** butonuna basın. *Kullanıcı Değişkenleri* alanında **Yeni...** butonuna tıklayın.
   * **Değişken Adı:** \`OLLAMA_ORIGINS\`
   * **Değişken Değeri:** \`*\`
   * Kaydedip tüm pencereleri kapatın (Tamam'a basarak).
3. **Ollama'yı Yeniden Başlatın:** Görev çubuğunun sağ altında bulunan küçük Ollama simgesine sağ tıklayarak **Quit** (Çıkış) seçin. Ardından Ollama uygulamasını tekrar sıfırdan çalıştırın.
4. **Tarayıcıyı Yenileyin:** Bu sayfayı yenileyip bağlantıyı tekrar aktif edin!

---

💡 **[Çevrimdışı Taktik Veritabanı Aktif Edildi]** - *Aşağıda sorunuzun çevrimdışı rehber yanıtı yer almaktadır:*

` + lookupOfflineDb(normalizedQuestion, persona);
    }
  }

  // 2. Offline Mode Fallback / Default
  return lookupOfflineDb(normalizedQuestion, persona);
};

function lookupOfflineDb(question, persona) {
  // Try to find matching database entry
  for (const entry of offlineDatabase) {
    if (entry.keywords.some(kw => question.includes(kw))) {
      return entry.responses[persona] || entry.responses.staff;
    }
  }

  // Default fallback if no keywords matched
  const defaultResponses = {
    staff: `[Kurmay Binbaşı]: Sorduğunuz soru taktik veri tabanımızda doğrudan bulunamadı. Lütfen Command Ops 2'nin şu temel kavramları hakkında soru sorun:
*   **Emir Gecikmesi (Order Delay)** - Karargah yeteneği ve haberleşme.
*   **İkmal Hatları (Supply Lines)** - Lojistik ve mühimmat yolları.
*   **Topçu Desteği (Artillery)** - Hazırlık bombardımanı ve koordinasyon.
*   **Yorgunluk (Fatigue)** - Birimlerin dinlendirilmesi ve kondisyon.
*   **Taarruz Doktrini (Attack)** - Muharebe taktikleri ve güvenli ilerleme.

*(İpucu: Yerel Ollama sunucunuzu açarak serbest sohbet modunda oyun hakkında her şeyi sorabilirsiniz!)*`,
    veteran: `[Kıdemli Çavuş]: Evlat, cephede kafa karıştırıcı konuşma. Bana anlaşılır şeyler sor! Mermimiz mi bitti (İkmal), askerler yorgunluktan bayılıyor mu (Yorgunluk), topçular nerede kaldı (Topçu) yoksa emirler neden ulaşmıyor (Gecikme) onu söyle.
Yerel Ollama sunucunu bağlarsan, seninle her konuda derinlemesine çene çalabilirim!`,
    technical: `[Teknik Analiz]: Sistem sorgusu tanımsız. Lütfen oyun mekaniklerinden birini sorunuz:
1. **Emir Gecikmesi (Order Delay)**
2. **Lojistik / İkmal (Supply & LOS)**
3. **Topçu / Baskılama (Artillery & Suppression)**
4. **Kondisyon / Dinlenme (Fatigue & Recovery)**
5. **Taarruz / Harekat Tipleri (Attack & Formations)**`
  };

  return defaultResponses[persona] || defaultResponses.staff;
}
