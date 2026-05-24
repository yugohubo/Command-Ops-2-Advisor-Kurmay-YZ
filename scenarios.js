// Command Ops 2 Scenarios Database & Operational Checklists
window.scenarios = [
  {
    id: 'st_vith',
    name: 'Return to St. Vith (Eğitim Senaryosu)',
    difficulty: 'Kolay / Başlangıç',
    forces: {
      allied: '7th Armored Division, 106th Infantry Division (ABD)',
      axis: '18th Volksgrenadier Division, 62nd Volksgrenadier Division (Almanya)'
    },
    duration: '2 Gün (48 Saat)',
    mapArea: 'Belçika - St. Vith Sektörü (Karlı / Engebeli Arazi)',
    briefing: 'Aralık 1944. Ardenler Taarruzu (Battle of the Bulge) başladı. Alman 5. Panzer Ordusu, hayati bir yol kavşağı olan St. Vith kasabasını ele geçirmek için ileriyor. ABD savunucuları, takviye kuvvetler gelene kadar Alman taarruzunu yavaşlatmak ve kavşağı korumak zorunda. Bu eğitim senaryosu, Command Ops 2 mekaniklerini (emir gecikmesi, mevzi savunması, topçu desteği ve intikal yolları) öğrenmek için en uygun haritadır.',
    tacticalTips: [
      '**Yol Kavşaklarını Tutun:** Düşmanın tekerlekli ve zırhlı araçları karlı ve engebeli arazide yollar dışında çok yavaş hareket eder. Kasabaya giden ana kavşakları piyadelerle tıkayın.',
      '**Karargahları Derinde Tutun:** ABD 106. Piyade Bölüğü karargahını St. Vith kasabasının hemen batısındaki ormanlık alanda konumlandırın. Düşman sızmalarına karşı güvende olmasını sağlayın.',
      '**Önceden Planlayın (Emir Gecikmesi):** Eğitim senaryosunda emir gecikmesi yaklaşık 30 ila 50 dakikadır. Eğer düşman kanadınızdan sızıyorsa, geri çekilme emrini düşman menzile girmeden en az 1 saat önce vermelisiniz.',
      '**Topçu Koordinasyonu:** Alman piyade taarruzlarını St. Vith doğusundaki ormanlık yollarda "Bombard" emirleriyle yıpratın. Topçularınızın mühimmatını idareli kullanın.'
    ]
  },
  {
    id: 'arnhem',
    name: 'Arnhem Bridge - Highway to the Reich',
    difficulty: 'Orta / Uzman',
    forces: {
      allied: '1st Airborne Division (İngiltere), Polish 1st Independent Parachute Brigade',
      axis: '9th SS Panzer Division, 10th SS Panzer Division, Yerel Savunma Güçleri'
    },
    duration: '4 Gün (96 Saat)',
    mapArea: 'Hollanda - Arnhem ve Ren Nehri Çevresi',
    briefing: 'Eylül 1944. Market Garden Operasyonu. İngiliz Paraşütçüleri ("Red Devils"), Arnhem Köprüsü\'nü ele geçirip zırhlı birliklerin (XXX. Kolordu) güneyden gelmesini beklemek üzere nehrin gerisine bırakıldı. Ancak Alman SS Panzer Tümenleri beklenenden çok daha yakın ve güçlü. Havadan indirilen birliklerin ikmali kısıtlı ve ağır silahları yok.',
    tacticalTips: [
      '**Süreyi İyi Kullanın:** İlk saatlerde köprüye giden yolları hızla kontrol altına edin. Alman savunması ilk başta dağınık, ancak 6 saat içinde SS birlikleri organize taarruzlara başlayacak.',
      '**Paraşütçü İkmal Hatları:** Havadan bırakılan ikmal bölgelerini (LZ/DZ) güvende tutun. Düşman bu bölgeleri ele geçirirse cephaneniz saatler içinde tükenecektir.',
      '**Dar Boğazları Savunun:** Köprü başındaki binaları piyadelerle tahkim edin. Şehir arazisi piyadelerinize tanklara karşı mükemmel koruma sağlar.'
    ]
  },
  {
    id: 'bastogne',
    name: 'Bastogne - Ride of the Valkyries',
    difficulty: 'Zor / İleri Seviye',
    forces: {
      allied: '101st Airborne Division, CCB 10th Armored Division (ABD)',
      axis: '2nd Panzer Division, 26th Volksgrenadier Division, Panzer Lehr Division'
    },
    duration: '6 Gün (144 Saat)',
    mapArea: 'Belçika - Bastogne Ormanları ve Çevresi',
    briefing: '101. Hava İndirme Tümeni, Bastogne kasabasındaki stratejik yol ağını savunmak için kuşatma altında. Alman zırhlı birlikleri kasabayı tamamen sarmış durumda ve her yönden saldırıyor. Müttefik kuvvetler, Patton\'ın 3. Ordusu kuşatmayı yarana kadar tamamen izole edilmiş bir şekilde direnmek zorunda. Çetin kış şartları, düşük görüş mesafesi ve hava desteğinin yokluğu işleri zorlaştırıyor.',
    tacticalTips: [
      '**Dairesel Savunma Çemberi (Perimeter):** Kuvvetlerinizi dışa dönük bir çember halinde yerleştirin. Her bir sektörü birbirini destekleyecek şekilde taburlara bölün.',
      '**Yedek Birlikler Tutun:** Merkeze yakın hızlı hareket edebilen zırhlı veya mekanize bir yedek birim (Reserve) koyun. Almanların yarmayı başardığı zayıf noktalara anında takviye gönderin.',
      '**Kar Karşısında Lojistik:** İkmal seviyeleriniz kritik seviyede olacaktır. Gereksiz taarruzlardan kaçının, sadece defansif kalın ve mühimmatı boşa harcamayın.'
    ]
  }
];

window.operationalChecklist = [
  {
    step: 1,
    title: 'İstihbarat ve Durum Değerlendirmesi (Intel & Situation)',
    description: 'Oyunu durdurun (Pause). Haritadaki bilinen düşman konumlarını inceleyin. Unutmayın, gördüğünüz düşman simgeleri güncel olmayan eski istihbarat raporları olabilir! Düşman öncü birliklerinin son görüldüğü zamanları (Intel Age) kontrol edin.'
  },
  {
    step: 2,
    title: 'Komuta Zinciri ve C2 Kontrolü (Chain of Command)',
    description: 'Birimlerinizin hiyerarşik bağlarını inceleyin. Hangi tabur hangi alay karargahına (HQ) bağlı? Karargahlar alt birimlerinin telsiz/haberleşme menzilinde mi? Telsiz menzilinden çıkan birimlerin emir gecikmesi katlanarak artar.'
  },
  {
    step: 3,
    title: 'İkmal Hattı Güvenliği (Line of Supply - LOS)',
    description: 'Harita altındaki "Sup" (İkmal) butonuna basarak ikmal hatlarını görselleştirin. Kırmızı çizgiler ikmal ağından kopmuş birimleri gösterir. Düşman sızma birliklerinin ikmal koridorlarınızı kesmediğinden emin olun. Lojistik yoksa zafer de yoktur!'
  },
  {
    step: 4,
    title: 'Emir Gecikmesi Hesaplaması (Order Delay Planning)',
    description: 'Bir taarruz veya geri çekilme planlarken karargahınızın "Order Delay" süresine bakın. 45 dakikalık bir gecikme varsa, vereceğiniz "Taarruz" emrinin 45 dakika boyunca birlikler tarafından uygulanmayacağını hesaba katarak zamanlama planı yapın.'
  },
  {
    step: 5,
    title: 'Topçu Koordinasyonu ve Hazırlık Ateşi (Artillery)',
    description: 'Doğrudan hücuma geçmek intihardır. Topçu birliklerinizi taarruz hedefine önceden atış yapacak şekilde ("Bombard" emriyle) ayarlayın. Hazırlık bombardımanı düşman piyadesini siperlere gömecek ve tahkimatları zayıflatacaktır.'
  },
  {
    step: 6,
    title: 'Planı Uygulama ve Güvenli İlerleme Yolları (Execution)',
    description: 'Birliklerinize hareket emirleri verirken izleyecekleri yolları "Maneuver", "Fastest" veya "Shortest" olarak seçin. Zırhlı birliklerin yolları kullanmasını, piyadelerin ise orman ve nehir kenarı gibi korumalı örtü arazilerini tercih etmesini sağlayın.'
  }
];
