# CONTACT (slug: contact) — English copy deck

**SEO title:** Contact Glinker Group | Ankara, Türkiye
**Meta description:** Plan a technical meeting on online monitoring, or send a supply requirement. Tell us your sector and the asset or need. koordinasyon@glinkergroup.com

> NOTE: The form has no backend. On submit it composes an e-mail to koordinasyon@glinkergroup.com in the visitor's own e-mail application. All confirmation copy below is written for that behaviour: nothing is "received" until the visitor presses send in their mail app. No response-time promises anywhere.

---

## 01 — Hero

**Eyebrow (mono):** CONTACT

**H1:** Start with a technical conversation.

**Sub:** Tell us your sector and the asset or need. A few lines are enough.

**Direct contact block (mono labels)**
- `E-MAIL` — koordinasyon@glinkergroup.com
- `LOCATION` — Ankara, Türkiye

**Direct line:** Prefer to write directly? Use the address above. The form only prepares the same e-mail for you.

---

## 02 — Form

**Form heading:** Your request
**Required-field legend:** Fields marked * are required.

### Topic (radio group / segmented control)
**Legend:** What is it about? *

| Value (`?topic=`) | Label | Helper line shown when selected |
|---|---|---|
| `monitoring` | Online monitoring | Tell us the asset, its voltage level and what concerns you about it. |
| `supply` | Supply and projects | Tell us what you need. An item list and a specification help, if you have them. |
| `sourcing` | Sourcing from Türkiye | Tell us the product group, the destination country and your target delivery. |
| `other` | Other | Engineering and project design, building systems, software, cyber security, or anything else. |

### Fields

| Field | Label | Placeholder | Helper text |
|---|---|---|---|
| name | Full name * | — | — |
| email | Work e-mail * | name@company.com | We reply to this address. |
| organization | Organisation * | — | Company or institution. |
| sector | Sector (optional) | e.g. data center, airport, distribution utility | Helps us route your request. |
| phone | Phone (optional) | Include the country code | Only if you prefer a call. |
| note | Short note (optional) | — | Changes with the topic (see helper lines above). Please do not include confidential or personal data that is not needed. |

> NOTE: prototype fields were Full name, Work email, Organization, Phone (optional), Short note (optional). "Sector" is an optional addition suggested by the page sub ("Tell us your sector"); drop it if the form should stay at five fields.

**Character counter (note field):** `{n} / 1000`

### KVKK information line (directly above the button)
Your personal data is processed by Glinker Group as data controller, only to respond to your request. See the Privacy Notice (KVKK).
**Link label:** Privacy Notice (KVKK)

### Buttons
**Submit:** Send request
**Submit, while composing:** Preparing your e-mail…
**Reset (optional):** Clear form

---

## 03 — Validation messages

**Summary (top of form, on error):** Please check the fields below.

| Case | Message |
|---|---|
| Topic not selected | Choose what your request is about. |
| Name empty | Enter your full name. |
| E-mail empty | Enter your work e-mail address. |
| E-mail invalid | Enter a valid e-mail address, for example name@company.com. |
| Organisation empty | Enter your organisation. |
| Phone invalid (if filled) | Enter a phone number with digits only, including the country code, or leave it empty. |
| Note too long | Keep the note under 1000 characters. You can send details by e-mail later. |

**Inline success tick (per field, aria):** Looks good.

---

## 04 — Confirmation states

### State A — e-mail composed (default success)
**Headline:** Your e-mail is ready to send.
**Body:** We have opened your e-mail application with your request filled in. Press send there to deliver it to koordinasyon@glinkergroup.com. We will reply to the e-mail address you provided.
**Secondary action:** Edit the request
**Small line:** Nothing has been stored on this website.

### State B — e-mail application did not open (fallback)
**Headline:** Your e-mail application did not open?
**Body:** Copy the text below and send it to koordinasyon@glinkergroup.com from any e-mail account.
**Buttons:** Copy the text · Copy the address
**After copy (toast):** Copied.

### Legacy success message (only if a backend is added later)
**Headline:** Your request has been received.
**Body:** Thank you. We will reply to the e-mail address you provided.

### Composed e-mail template
**Subject:** `[Glinker Group] {Topic label} — {Organisation}`
**Body:**
```
Topic: {Topic label}
Name: {Full name}
Organisation: {Organisation}
Sector: {Sector}
E-mail: {Work e-mail}
Phone: {Phone}

Note:
{Short note}

—
Sent from the contact form on the Glinker Group website
```

> NOTE: omit empty optional lines.

---

## 05 — What happens next

**Eyebrow:** WHAT HAPPENS NEXT

**Headline:** Three steps.

1. **We read it.** Your request goes to Glinker Group and is routed by topic: monitoring, supply or sourcing.
2. **We come back with questions.** Usually a short list: the asset and its voltage level, or the specification and target delivery. If a call is easier, we agree a time.
3. **You get a clear next step.** For monitoring, a technical meeting on your asset. For supply, the Define step: a clear scope and a short list of open questions.

**Small line:** We reply by e-mail to the address you give.

---

## 06 — Shortcuts (below the form)

| Label | Line | Link |
|---|---|---|
| Not sure which technology? | Start from your asset in the Online Monitoring table. | Online Monitoring → |
| Have a list ready? | See what to send and what you get back. | Supply & Project Solutions → |
| A Turkish manufacturer? | Write to us about international markets. | koordinasyon@glinkergroup.com |

---

## 07 — CTA labels used across the site that land here

| Label | Lands on |
|---|---|
| Plan a technical meeting | `contact?topic=monitoring` |
| Send your requirement | `contact?topic=supply` |
| Source from Türkiye (About, international buyers) | `contact?topic=sourcing` |
| Contact us / Write to us | `contact?topic=other` |
