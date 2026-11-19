# İLETİŞİM (slug: contact) — Türkçe metin dosyası

**SEO başlığı:** İletişim | Glinker Group | Ankara, Türkiye
**Meta açıklaması:** Online izleme için teknik görüşme planlayın ya da tedarik talebinizi iletin. Sektörünüzü ve ihtiyacınızı yazın. koordinasyon@glinkergroup.com

> NOT: Formun bir sunucu tarafı yoktur. Gönderildiğinde, ziyaretçinin kendi e-posta uygulamasında koordinasyon@glinkergroup.com adresine bir e-posta oluşturur. Aşağıdaki tüm onay metinleri bu davranışa göre yazılmıştır: ziyaretçi e-posta uygulamasında gönder düğmesine basana kadar hiçbir şey "alınmış" değildir. Hiçbir yerde yanıt süresi vaadi yoktur.

---

## 01 — Hero

**Üst etiket (mono):** İLETİŞİM

**H1:** Teknik bir görüşmeyle başlayın.

**Alt metin:** Sektörünüzü, ilgili ekipmanı ya da ihtiyacınızı yazın. Birkaç satır yeterli.

**Doğrudan iletişim bloğu (mono etiketler)**
- `E-POSTA` — koordinasyon@glinkergroup.com
- `KONUM` — Ankara, Türkiye

**Doğrudan iletişim satırı:** Doğrudan yazmayı mı tercih edersiniz? Yukarıdaki adresi kullanın. Form yalnızca aynı e-postayı sizin için hazırlar.

---

## 02 — Form

**Form başlığı:** Talebiniz
**Zorunlu alan açıklaması:** * ile işaretli alanların doldurulması zorunludur.

### Konu (radyo grubu / segmentli seçim)
**Başlık:** Talebiniz ne hakkında? *

| Değer (`?topic=`) | Etiket | Seçildiğinde gösterilen yardım satırı |
|---|---|---|
| `monitoring` | Online izleme | Ekipmanı, gerilim seviyesini ve sizi neyin endişelendirdiğini yazın. |
| `supply` | Tedarik ve projeler | Neye ihtiyacınız olduğunu yazın. Varsa bir malzeme listesi ve şartname işimizi kolaylaştırır. |
| `sourcing` | Türkiye'den tedarik | Ürün grubunu, varış ülkesini ve hedef teslim tarihinizi yazın. |
| `other` | Diğer | Mühendislik ve proje tasarımı, bina sistemleri, yazılım, siber güvenlik ya da başka bir konu. |

### Alanlar

| Alan | Etiket | Yer tutucu | Yardım metni |
|---|---|---|---|
| name | Ad soyad * | — | — |
| email | Kurumsal e-posta * | ad@sirket.com | Yanıtımızı bu adrese göndeririz. |
| organization | Kurum * | — | Şirket ya da kurum adı. |
| sector | Sektör (isteğe bağlı) | ör. veri merkezi, havalimanı, elektrik dağıtım şirketi | Talebinizi doğru kişiye yönlendirmemize yardımcı olur. |
| phone | Telefon (isteğe bağlı) | Ülke koduyla birlikte | Yalnızca telefonla görüşmeyi tercih ederseniz. |
| note | Kısa not (isteğe bağlı) | — | Konuya göre değişir (yukarıdaki yardım satırlarına bakın). Lütfen gerekli olmayan gizli bilgileri veya kişisel verileri eklemeyin. |

> NOT: Prototipteki alanlar Ad soyad, Kurumsal e-posta, Kurum, Telefon (isteğe bağlı), Kısa not (isteğe bağlı) idi. "Sektör", sayfa alt metnindeki "sektörünüzü yazın" ifadesinden önerilen isteğe bağlı bir eklemedir; form beş alanda kalacaksa kaldırılabilir. Yer tutucuda Türkçe karakter kullanılmadı (ad@sirket.com), çünkü e-posta adreslerinde Türkçe karakter pratikte kullanılmaz.

**Karakter sayacı (not alanı):** `{n} / 1000`

### KVKK bilgilendirme satırı (düğmenin hemen üstünde)
Kişisel verileriniz, veri sorumlusu sıfatıyla Glinker Group tarafından yalnızca talebinize yanıt vermek amacıyla işlenir. Ayrıntılar için Aydınlatma Metni'ni (KVKK) inceleyin.
**Bağlantı etiketi:** Aydınlatma Metni (KVKK)

### Düğmeler
**Gönder:** Talebi gönder
**Gönder, e-posta hazırlanırken:** E-postanız hazırlanıyor…
**Temizle (isteğe bağlı):** Formu temizle

---

## 03 — Doğrulama mesajları

**Özet (hata durumunda formun üstünde):** Lütfen aşağıdaki alanları kontrol edin.

| Durum | Mesaj |
|---|---|
| Konu seçilmedi | Talebinizin konusunu seçin. |
| Ad boş | Adınızı ve soyadınızı girin. |
| E-posta boş | Kurumsal e-posta adresinizi girin. |
| E-posta geçersiz | Geçerli bir e-posta adresi girin, örneğin ad@sirket.com. |
| Kurum boş | Kurumunuzun adını girin. |
| Telefon geçersiz (doldurulduysa) | Ülke koduyla birlikte yalnızca rakamlardan oluşan bir telefon numarası girin ya da alanı boş bırakın. |
| Not çok uzun | Notunuz 1000 karakteri geçmesin. Ayrıntıları daha sonra e-postayla gönderebilirsiniz. |

**Satır içi onay işareti (alan bazında, aria):** Uygun.

---

## 04 — Onay durumları

### Durum A — e-posta oluşturuldu (varsayılan başarı)
**Başlık:** E-postanız gönderilmeye hazır.
**Gövde:** E-posta uygulamanızı, talebiniz doldurulmuş olarak açtık. Talebinizin koordinasyon@glinkergroup.com adresine ulaşması için orada gönder düğmesine basın. Yanıtımızı belirttiğiniz e-posta adresine göndereceğiz.
**İkincil eylem:** Talebi düzenle
**Küçük satır:** Bu web sitesinde hiçbir veri saklanmadı.

### Durum B — e-posta uygulaması açılmadı (yedek)
**Başlık:** E-posta uygulamanız açılmadı mı?
**Gövde:** Aşağıdaki metni kopyalayın ve herhangi bir e-posta hesabından koordinasyon@glinkergroup.com adresine gönderin.
**Düğmeler:** Metni kopyala · Adresi kopyala
**Kopyalamadan sonra (bildirim):** Kopyalandı.

### Eski başarı mesajı (yalnızca ileride bir sunucu tarafı eklenirse)
**Başlık:** Talebiniz alındı.
**Gövde:** Teşekkür ederiz. Yanıtımızı belirttiğiniz e-posta adresine göndereceğiz.

### Oluşturulan e-posta şablonu
**Konu:** `[Glinker Group] {Konu etiketi} — {Kurum}`
**Gövde:**
```
Konu: {Konu etiketi}
Ad soyad: {Ad soyad}
Kurum: {Kurum}
Sektör: {Sektör}
E-posta: {Kurumsal e-posta}
Telefon: {Telefon}

Not:
{Kısa not}

—
Glinker Group web sitesindeki iletişim formundan gönderilmiştir
```

> NOT: Boş kalan isteğe bağlı satırlar çıkarılır.

---

## 05 — Sonra ne olur

**Üst etiket:** SONRA NE OLUR

**Başlık:** Üç adım.

1. **Okuruz.** Talebiniz Glinker Group'a ulaşır ve konusuna göre yönlendirilir: izleme, tedarik ya da Türkiye'den tedarik.
2. **Sorularla geri döneriz.** Genellikle kısa bir liste: ekipman ve gerilim seviyesi ya da şartname ve hedef teslim tarihi. Telefonla görüşmek daha kolaysa bir zaman belirleriz.
3. **Net bir sonraki adım alırsınız.** İzleme için, ekipmanınız üzerine bir teknik görüşme. Tedarik için Tanımla adımı: net bir kapsam ve açık soruların kısa bir listesi.

**Küçük satır:** Yanıtımızı, belirttiğiniz adrese e-postayla göndeririz.

---

## 06 — Kısayollar (formun altında)

| Etiket | Satır | Bağlantı |
|---|---|---|
| Hangi teknoloji olduğundan emin değil misiniz? | Online İzleme tablosunda ekipmanınızdan başlayın. | Online İzleme → |
| Listeniz hazır mı? | Ne göndermeniz gerektiğini ve karşılığında ne alacağınızı görün. | Tedarik ve Proje Çözümleri → |
| Türk üretici misiniz? | Uluslararası pazarlar hakkında bize yazın. | koordinasyon@glinkergroup.com |

---

## 07 — Sitede bu sayfaya yönlendiren CTA etiketleri

| Etiket | Hedef |
|---|---|
| Teknik görüşme planlayın | `contact?topic=monitoring` |
| Talebinizi iletin | `contact?topic=supply` |
| Türkiye'den tedarik edin (Hakkımızda, uluslararası alıcılar) | `contact?topic=sourcing` |
| Bize ulaşın / Bize yazın | `contact?topic=other` |
