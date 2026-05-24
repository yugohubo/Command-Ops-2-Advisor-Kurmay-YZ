// Command Ops 2 NATO Military Symbology Database
window.natoSymbols = [
  {
    id: 'hq',
    name: 'HQ (Karargah)',
    role: 'Komuta & Kontrol (C2) Merkezi',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="10" y1="10" x2="90" y2="90" stroke="var(--color-phosphor)" stroke-width="2"/>
      <line x1="90" y1="10" x2="10" y2="90" stroke="var(--color-phosphor)" stroke-width="2"/>
      <rect x="35" y="35" width="30" height="30" fill="var(--bg-accent)" stroke="var(--color-phosphor)" stroke-width="3"/>
      <text x="50" y="55" font-family="monospace" font-size="16" fill="var(--color-phosphor)" text-anchor="middle" font-weight="bold">HQ</text>
    </svg>`,
    description: 'Komuta zincirinin temel taşıdır. Alt birimlere emirlerin iletilmesini, ikmal organizasyonunu ve topçu koordinasyonunu yönetir.',
    strengths: 'Geniş haberleşme menzili, yüksek kurmay kapasitesi, topçu desteği talep etme yeteneği.',
    weaknesses: 'Zayıf zırh, düşük ateş gücü. Doğrudan hedef alındığında tüm bağlı alt birimlerin emir gecikmesini (order delay) devasa ölçüde artırır.',
    advice: 'Karargahları her zaman doğrudan çatışma hattından uzak, ormanlık veya meskun mahaller gibi iyi gizlenmiş ve korunaklı bölgelerde tutun. Asla korumasız bırakmayın.'
  },
  {
    id: 'infantry',
    name: 'Piyade (Infantry)',
    role: 'Temel Muharip & Bölge Tutma Gücü',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="10" y1="10" x2="90" y2="90" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="90" y1="10" x2="10" y2="90" stroke="var(--color-phosphor)" stroke-width="4"/>
    </svg>`,
    description: 'Arazide mevzilenme, kasaba ve ormanlık alanları savunma ve zorlu koşullarda çatışma kapasitesi en yüksek temel muharip birimdir.',
    strengths: 'Orman, şehir ve engebeli arazide yüksek savunma bonusu, düşük yakıt ihtiyacı, yüksek gizlenme.',
    weaknesses: 'Açık arazide zırhlı birliklere karşı son derece savunmasızdır, yavaş hareket hızı.',
    advice: 'Piyadelerinizi açık arazide yürütmek yerine, ormanlık ve engebeli koridorları kullanarak gizlice ilerletin. Savunma pozisyonlarında "Defend" emri vererek mevzi kazmalarını (entrenchment) sağlayın.'
  },
  {
    id: 'armor',
    name: 'Zırhlı Birlikler (Armor / Tank)',
    role: 'Yarma & Şok Taarruz Gücü',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
    </svg>`,
    description: 'Yüksek ateş gücü, güçlü zırh koruması ve yüksek mobilite ile düşman hatlarını yarmak ve kuşatmak için tasarlanmış şok birlikleridir.',
    strengths: 'Açık arazide ezici ateş gücü ve hız, düşmanda moral bozukluğu (supression) yaratma kapasitesi.',
    weaknesses: 'Şehir içi çatışmalarda ve sık ormanlarda pusuya aşırı açıktır. Yüksek yakıt ve mühimmat (ikmal) tüketimi.',
    advice: 'Tanklarınızı asla doğrudan şehir merkezlerine veya sık ormanlara saldırtmayın. Buralarda piyade desteği olmadan kolayca yok olurlar. Açık ova veya yollarda manevra yaparak düşmanı kanatlarından vurun.'
  },
  {
    id: 'mech_inf',
    name: 'Mekanize Piyade (Mech Infantry)',
    role: 'Hızlı Muharip & Takviye Gücü',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="var(--color-phosphor)" stroke-width="2"/>
      <line x1="10" y1="10" x2="90" y2="90" stroke="var(--color-phosphor)" stroke-width="3"/>
      <line x1="90" y1="10" x2="10" y2="90" stroke="var(--color-phosphor)" stroke-width="3"/>
    </svg>`,
    description: 'Zırhlı personel taşıyıcılar veya zırhlı muharebe araçları ile donatılmış, tank birliklerine ayak uydurabilen hızlı piyadelerdir.',
    strengths: 'Hem yüksek hıza hem de piyade savunma esnekliğine sahiptir. Açık ve yarı-açık arazide etkilidir.',
    weaknesses: 'Araçlar için yakıt ihtiyacı yüksektir, araç kaybı durumunda birim gücü hızla düşer.',
    advice: 'Zırhlı taarruzlarınızda tankların arkasından gelerek kazanılan mevzileri hızla tutmalarını sağlayın. Çatışma arazisine göre gerekirse araçlardan inerek piyade gibi savaşabilirler.'
  },
  {
    id: 'recon',
    name: 'Keşif (Reconnaissance)',
    role: 'İstihbarat & Düşman Tespiti',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="10" y1="90" x2="90" y2="10" stroke="var(--color-phosphor)" stroke-width="4"/>
    </svg>`,
    description: 'Ön hatların ilerisinde hareket ederek düşman konumlarını, sayılarını ve hareket yönlerini tespit eden gözcü birimleridir.',
    strengths: 'Çok yüksek hareket hızı, mükemmel gizlenme (stealth) ve düşmanı uzaktan fark etme (spotting) yeteneği.',
    weaknesses: 'Çok zayıf ateş gücü ve zırh. Doğrudan çatışmalarda hızla erirler.',
    advice: 'Keşif birimlerine asla "Attack" emri vermeyin. Bunları "Probe" veya pasif "Move" emirleriyle düşman hatlarının yanlarına veya gerisine sızdırarak istihbarat sağlayın.'
  },
  {
    id: 'artillery',
    name: 'Topçu Birlikleri (Artillery)',
    role: 'Uzun Menzilli Ateş Desteği',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <circle cx="50" cy="50" r="8" fill="var(--color-phosphor)"/>
    </svg>`,
    description: 'Doğrudan görmediği hedefleri vurabilen obüs ve kundağı motorlu topçu bataryalarıdır. Düşmanı yumuşatmak ve durdurmak için kritiktir.',
    strengths: 'Muazzam menzil, yüksek baskılama (suppression) ve yıkım gücü, korumalı arazideki düşmanı yıpratma yeteneği.',
    weaknesses: 'Yakın çatışmada tamamen çaresizdir. Aşırı yüksek mühimmat tüketimi, yavaş yer değiştirme süresi.',
    advice: 'Taarruz başlatmadan 30-60 dakika önce hedef bölgeye "Bombard" emri verin. Bu, düşmanı baskılayacak (suppress) ve savunma hatlarını felç edecektir. Mühimmat durumlarını sık sık kontrol edin.'
  },
  {
    id: 'mortar',
    name: 'Havan Birlikleri (Mortar)',
    role: 'Taktik / Yakın Ateş Desteği',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="50" y1="75" x2="50" y2="35" stroke="var(--color-phosphor)" stroke-width="4"/>
      <polygon points="50,25 42,40 58,40" fill="var(--color-phosphor)"/>
      <circle cx="50" cy="55" r="4" fill="var(--color-phosphor)"/>
    </svg>`,
    description: 'Piyade taburlarına doğrudan bağlı olan, hızlı kurulan ve yakın mesafe dolaylı ateş desteği sağlayan hafif havan takımlarıdır.',
    strengths: 'Çok hızlı tepki ve atış süresi, engellerin (tepe, bina) arkasındaki hedefleri vurabilme yeteneği.',
    weaknesses: 'Kısa menzil, ağır obüslere göre daha düşük yıkım gücü.',
    advice: 'Havanları piyade taarruz hattının hemen 500-1000 metre arkasında konumlandırın. Düşman makineli tüfek yuvalarını susturmak için anında yerel atış desteği sağlarlar.'
  },
  {
    id: 'anti_tank',
    name: 'Tank Savar (Anti-Tank)',
    role: 'Zırhlı Düşman Önleme Birimi',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="50" y1="25" x2="15" y2="75" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="50" y1="25" x2="85" y2="75" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="15" y1="75" x2="85" y2="75" stroke="var(--color-phosphor)" stroke-width="4"/>
    </svg>`,
    description: 'Çekili veya kundağı motorlu tank savar topları ve füze bataryalarıdır. Temel hedefleri düşman zırhlı araçlarını imha etmektir.',
    strengths: 'Zırh delme gücü çok yüksektir. Savunma yaparken açık araziden gelen tankları kolayca durdurur.',
    weaknesses: 'Piyadelere karşı etkisizdir. Çekili olanlar çok yavaş hareket eder ve kurulmaları uzun sürer.',
    advice: 'Bunları ana yolların ve açık geçiş koridorlarının kenarındaki orman kenarlarına pusu kuracak şekilde yerleştirin. Tank savarları taarruzda değil, savunma hatlarında kilit bölgelerde kullanın.'
  },
  {
    id: 'engineer',
    name: 'İstihkam (Engineers)',
    role: 'Engel Aşma & İstihkam Desteği',
    svg: `<svg viewBox="0 0 100 100" class="nato-svg">
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="20" y1="35" x2="80" y2="35" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="20" y1="65" x2="80" y2="65" stroke="var(--color-phosphor)" stroke-width="4"/>
      <line x1="30" y1="35" x2="30" y2="65" stroke="var(--color-phosphor)" stroke-width="2"/>
      <line x1="50" y1="35" x2="50" y2="65" stroke="var(--color-phosphor)" stroke-width="2"/>
      <line x1="70" y1="35" x2="70" y2="65" stroke="var(--color-phosphor)" stroke-width="2"/>
    </svg>`,
    description: 'Mayın temizleme, köprü inşa etme veya havaya uçurma, sığınak yapma gibi savaş alanı mühendislik görevlerini yürüten birimlerdir.',
    strengths: 'Nehir geçişlerinde hızlı köprü kurma, engel temizleme, kentsel savunmada aşırı yüksek mukavemet.',
    weaknesses: 'Düşük uzun menzilli ateş gücü, yavaş operasyonel hız.',
    advice: 'Köprülerin düşman tarafından havaya uçurulma ihtimaline karşı taarruz grubunuzda mutlaka istihkam birimi bulundurun. Ayrıca nehir geçişlerinde alternatif geçitler (fords) oluşturabilirler.'
  }
];
