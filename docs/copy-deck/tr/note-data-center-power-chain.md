# NOT 03 — VERİ MERKEZİNDE GÜVENİLİRLİK: GÜÇ ZİNCİRİ (slug: note-data-center-power-chain) — Türkçe metin dosyası

**SEO başlığı:** Veri Merkezinde Güvenilirlik: Güç Zinciri | Glinker
**Meta açıklaması:** Yedeklilik ekipmanı değil, yükü korur. Veri merkezi güç zinciri boyunca bir yolculuk: yavaş gelişen bir arıza yedekli tasarımın neresinde saklanabilir?

---

## Makale üst bölümü

**İçerik yolu:** Bilgi Notları / Glinker notu
**Üst etiket (mono):** GLINKER NOTU 03
**H1:** Veri merkezinde güvenilirlik: güç zinciri
**Spot:** Yedeklilik ekipmanı değil, yükü korur. Bu not, güç zincirini şebeke bağlantısından dağıtım panosuna kadar izliyor ve yavaş gelişen bir arızanın yedekli bir tasarımın arkasında nerede saklanabileceğini işaretliyor.
**Etiketler:** Güç trafosu · Güç kalitesi · Veri merkezleri · Glinker notu
**Yazar:** Glinker Group

**Kısaca (3 madde, kenar sütunu)**
- Yedeklilik "bir yol kaybedilirse ne olur?" sorusunu yanıtlar. "Diğer yol hangi durumda?" sorusunu yanıtlamaz.
- Her yedekli yol yine gözden uzakta yaşlanan trafolardan, şalt tesislerinden ve kablolardan geçer.
- İzleme, yük devrede kalırken zincirin her halkasının durumunu gösterir.

---

## Makale gövdesi

### Yedeklilik ne içindir

Bir veri merkezi yedeklilik esasına göre tasarlanır. İki besleme, iki trafo, iki dağıtım yolu, yedek üretim ve aralarında kesintisiz güç. İlke sağlamdır: bir eleman kaybedilirse yükü bir diğeri taşır.

Yedeklilik, yük hakkında bir ifadedir. Bir bileşen arızalandığında sunucuların çalışmaya devam edeceğini söyler. Bileşenler hakkında bir ifade değildir. Artık her şeyi taşıyan trafonun durumu ya da ilkinin neden arızalandığı hakkında hiçbir şey söylemez.

Bu notun konusu bu boşluktur. Yedeklilik ekipmanı değil, yükü korur. Güç zincirinde yavaş gelişen bir yalıtım arızası da yedeklilikle ortadan kalkmaz; yalnızca gizlenir.

### Bir arıza yedekli tasarımın arkasında nasıl saklanır

Burada üç mekanizma işler.

**Hiçbir şey soruyu zorlamaz.** Tek yollu bir tesiste her zayıflık kendini hızla bir kesinti olarak gösterir. Yedekli bir tesiste ise sistem, kimse rahatsız olmadan pek çok şeyi tolere eder. Bu tolerans tasarımın amacıdır. Ama aynı zamanda bir bileşenin bozulmakta olduğuna dair işletmede hiçbir sinyal olmadığı anlamına gelir.

**Yollar birbirine benzer.** Yedekli trafolar genellikle aynı tasarımdadır ve aynı yaştadır; aynı zamanda, aynı ortamda, benzer yük altında devreye alınmıştır. Birini yaşlandıran her ne ise diğerini de yaşlandırır. Yedeklilik, arızaların birbirinden bağımsız olduğunu varsayar. Ortak koşullar bu bağımsızlığı azaltır.

**Yük aktarımı en zor andır.** Bir yol kaybedildiğinde kalan yol tüm yükü bir anda üstlenir. Kısmi yükte rahat çalışan bir ekipman, artık başka hiçbir yedeğin kalmadığı anda en yüksek zorlanmasıyla karşı karşıyadır. Durumu bilinmiyorsa, ortaya çıkacağı an budur.

Bunların hiçbiri yedekliliğe karşı bir argüman değildir. Yedekliliği oluşturan ekipmanların durumunu bilmenin gerekliliğine dair bir argümandır.

### Zincir boyunca yürümek

Enerjiyi şebeke bağlantısından dağıtım panosuna kadar izleyin. Her halkada, neyin görülmeden gelişebileceğini sorun.

**Şebeke bağlantı kablosu.** Pek çok sahanın şebekeye tek bir yüksek gerilim güzergâhı vardır ya da güzergâhın bir bölümünde aynı kanalı paylaşan iki güzergâhı. Kablonun kendisi fabrikada üretilir; ekleri ve başlıkları ise sahada monte edilir ve olağan zayıf noktalardır. Sorunlu bir ek, bunu arızalanmadan önce genellikle sıcaklıkta ve ekran akımında gösterir. Bunlar ek ve başlıklarda sürekli olarak ölçülebilir.

**Ana ve indirici trafolar.** Bunlar sürekli yüksek yük altında çalışır ve test için devre dışı bırakmaya uygun bir an nadiren bulunur. Çıkış gerilimi değişmediği için bir yalıtım arızası fark edilmeden gelişebilir. İşletmedeyken iki ölçüm yapılır. Kısmi deşarj, yalıtımdaki elektriksel aktiviteyi gösterir. Çözünmüş gaz ve nem, yağda olup biteni gösterir. Yağlı bir güç trafosunda ikisi birlikte okunur. İki gazlı bir online monitör, laboratuvar numuneleri arasında uyarı verir; onların yerini tutmaz.

**Giriş beslemesi ve ana baralar.** Burada endişe bir ekipmanın durumu değil, gerilimin kalitesidir. Bir veri merkezinin yükü büyük ölçüde güç elektroniğidir; yani doğrusal değildir: bozulmuş akım çeker ve harmonik seviyelerini yükseltir. Diğer yönden ise şebekenin başka yerlerindeki arızalar gerilim çökmeleri olarak gelir. Girişte ve ana baralarda kurulu A sınıfı bir güç kalitesi analizörü; gerilim çökmelerini, harmonikleri, fliker ve dengesizliği her olayın dalga şekliyle birlikte kaydeder. Bir bozulmanın şebekeden mi yoksa sahadan mı geldiğini gösteren kayıt da budur.

**Yedek jeneratörler.** Nadiren çalışan bir jeneratörün sağlıklı olduğunu varsaymak kolaydır. Ancak stator sargı yalıtımı yalnızca çalışma saatiyle değil; zaman, nem, kirlenme ve sıcaklık döngüleriyle de yaşlanır. Rutin çalıştırma testleri motorun çalıştığını kanıtlar. Sargı yalıtımının durumu hakkında ise pek az şey söyler. Statorda kısmi deşarj ölçümü bunu söyler. Döner makinelerde normal işletmede her zaman bir miktar kısmi deşarj bulunur; bu yüzden önemli olan tek bir okuma değil, eğilimdir.

**Salonlara doğru dağıtım.** Daha aşağıda zincir, çok sayıda küçük trafoya ve panoya ayrılır. Burada mantık derinlikten genişliğe döner: daha fazla ünite, her birinin tek başına önemi daha düşük ve ölçüm de buna göre seçilir.

**Kesintisiz güç ekipmanları** da bu zincirin içindedir. Kesintileri köprüler ve yüke giden beslemeyi düzenler. Kendisinden önceki hiçbir şeyin durumunu değiştirmez ve yaptığı her şey, üst zincirin geri gelmesine bağlıdır.

### Zincirin tamamına bakış

Bu ölçümlerin her biri tek bir halkayı tanımlar. Bir işletmecinin, özellikle de birden fazla sahası olan bir işletmecinin, hepsine birlikte bakabilmesi gerekir: önce hangi trafo, sırada hangi saha, bu yıl bütçe nereye gidecek.

Tipik zorluk, sahalar genelinde ekipman durumunu tek bir yerden gösteren bir görünümün olmamasıdır. Test raporları, yağ analizi sonuçları ve izleme verileri ayrı sistemlerde durur. Varlık performans yönetimi yazılımı bunları her varlık için tek bir kayıtta toplar ve duruma ve öneme göre sıralar. Yeni bir ölçüm eklemez. Mevcut ölçümlerin birlikte kullanılabilmesini sağlar.

### İzlemenin değiştirmedikleri

Bazı sınırların belirtilmesi gerekir.

İzleme bir arızayı imkânsız kılmaz. Bazı arızalar ani olur ve hiçbir yöntem tüm arıza türlerini görmez.

Yedekliliğin yerini tutmaz. İzlenen tek bir yol, yine de tek bir yoldur.

Testlerin yerini tutmaz. Bir alarmın ardından normalde, planlı bir kesintide bir laboratuvar numunesi ya da hedefli bir test gelir.

Değiştirdiği şey, bilgi düzeyidir. İzleme olmadan yedekli bir tasarım, yük konusunda güven verir ama ekipman hakkında hiçbir bilgi vermez. İzlemeyle ise yük devrede kalırken her halkanın durumu takip edilir ve bakım, bir yük aktarımı sırasında değil, işletmecinin seçtiği bir zamanda planlanır.

### Bir tasarım incelemesi için soru

Güvenilirlik incelemeleri genellikle şunu sorar: bu bileşen arızalanırsa ne olur? Gerekli bir sorudur ve yanıtı yedekliliktir.

Buna ikinci bir soru eklemeye değer: bu bileşenin arızaya doğru gittiğini nasıl anlarız? Dürüst yanıtın "anlamayız" olduğu her yerde, arkasındaki yedekliliğe körü körüne güveniliyor demektir.

---

## Makale alt bölümü

**Bu sitede ilgili sayfalar:**
- Veri Merkezleri için Online İzleme →
- Kısmi Deşarj İzleme → · DGA İzleme → · Dağıtım Trafosu ve Güç Kalitesi İzleme →
- Tedarik ve Proje Çözümleri: veri merkezi enerjisi (pasif altyapı, kabinetler, PDU, UPS, ATS/STS) →

**Alt not (küçük):** Bu not genel bir mühendislik açıklamasıdır. Belirli bir tesisi ya da tasarım standardını değil, genel bir güç zincirini anlatır.

**CTA bloğu**
**Başlık:** Veri merkezinizi konuşalım.
**CTA:** Teknik görüşme planlayın
