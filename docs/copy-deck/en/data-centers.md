# DATA CENTERS (slug: data-centers) — English copy deck

**SEO title:** Online Monitoring for Data Centers | Glinker Group
**Meta description:** Condition monitoring for the data center power chain: transformers, standby generators, grid cables and supply quality. Glinker Group, Türkiye.

> NOTE: Sector pages name no products and no specs. Every row links to a technology page.

---

## 01 — Hero

**Breadcrumb:** Online Monitoring / Sectors / Data Centers
**Eyebrow (mono):** SECTOR · DATA CENTERS

**H1:** Online Monitoring for Data Centers

**Sub:** Redundancy hides a slow insulation fault. It does not remove it.

**Intro:**
A data center is designed around redundancy, but every redundant path still starts at the same medium-voltage intake and passes through transformers, switchgear and cables. A slow insulation fault in that chain is not removed by redundancy; it is only hidden by it. Monitoring shows the condition of each link while the load stays online.

**CTA:** Plan a technical meeting
**Text link:** Read the note: Data center reliability — the power chain →

---

## 02 — The power chain in a data center

**Eyebrow:** 01 — THE POWER CHAIN

**Headline:** From the grid connection to the data hall.

**Intro line:** Follow the line. Each station is a link the load depends on, and each one ages out of sight.

**Chain stations (labels + one-liners for the line diagram)**

| # | Station | One-liner |
|---|---|---|
| 01 | Grid connection | Where the site meets the network. Supply quality is set here before anything on site can influence it. |
| 02 | HV grid connection cable | Often a single route. Its joints and terminations are the points to watch. |
| 03 | Main and step-down transformers | Under continuous high load, with little opportunity for an outage to test them. |
| 04 | MV switchgear and main busbars | Where the redundant paths divide. Also where voltage quality for the whole site can be measured. |
| 05 | Standby generators | Idle most of the time, expected to work at once. Insulation ages whether the machine runs or not. |
| 06 | Distribution to the halls | Many smaller transformers and boards, fed from the same upstream chain. |
| 07 | The whole chain, across sites | One operator, several sites, no single view of condition unless someone builds it. |

**Diagram label:** `ILLUSTRATIVE — GENERIC DATA CENTER POWER CHAIN. ACTUAL TOPOLOGIES DIFFER.`

**Pull-quote:**
Redundancy protects the load, not the equipment.

---

## 03 — Assets, risks, technologies

**Eyebrow:** 02 — WHAT TO MONITOR

**Headline:** Five links. What can go unseen in each.

| Asset | Typical risk | Monitoring technology (links) |
|---|---|---|
| Main and step-down transformers | Insulation fault developing unnoticed under continuous high load | Partial Discharge Monitoring · Dissolved Gas Analysis (DGA) Monitoring |
| Incoming supply and main busbars | Voltage dips and harmonics from non-linear load | Distribution Transformer & Power Quality Monitoring |
| Standby generators | Stator insulation deterioration on machines that rarely run | Partial Discharge Monitoring |
| HV grid connection cable | Joint or termination failure on the single supply route | Cable & MV Monitoring |
| Whole power chain | No single view of asset condition across sites | Asset Management |

**Table footer link:** See all assets in the Online Monitoring table →

---

## 04 — Why redundancy is not the answer to this

**Eyebrow:** 03 — THE BLIND SPOT

**Three short blocks**

- **A redundant path is still equipment.** The second transformer is the same age, the same design and under the same conditions as the first. Common conditions produce common ageing.
- **A failover is a stress, not a rest.** When one path is lost, the other takes the full load at once. That is the worst moment to discover its condition.
- **Operation gives no signal.** A transformer with a developing fault delivers the same voltage as a healthy one. The building management system shows green until it does not.

**Caption:** General engineering reasoning. No design or tier claims are implied.

---

## 05 — Questions this sector asks

**Eyebrow:** 04 — QUESTIONS

**Q: We have N+1 or 2N. Why monitor the equipment as well?**
Redundancy covers the loss of one path. Monitoring tells you the condition of the path you would be left with. The two answer different questions.

**Q: Our transformers cannot be taken out for testing. What then?**
That is the case online monitoring is for. Partial discharge and dissolved gas are measured while the transformer carries load.

**Q: Our generators hardly run. Why would their insulation deteriorate?**
Winding insulation ages with time, temperature cycles, moisture and contamination, not only with running hours. On a machine that rarely runs, a problem has few chances to show itself before the day it is needed.

**Q: Our load is mostly power electronics. Does that matter upstream?**
Non-linear loads draw distorted current and raise harmonic levels on the supply. A Class A analyser at the intake and main busbars records harmonics and dips, and helps show whether a disturbance came from the grid or from the site.

**Q: We operate several sites. How do we compare them?**
With a common asset record and common assessment rules. That is the role of asset performance management software.

**Q: What about racks, PDU, UPS and ATS/STS?**
Those are supply items, not monitoring. See Supply & Project Solutions.

---

## 06 — Link logic

**Supply cross-link (block):**
Passive infrastructure and uninterruptible power equipment are covered under Supply & Project Solutions: passive infrastructure, racks, PDU, UPS and ATS/STS, matched with Turkish manufacturers.
**Link label:** Data center power in the supply scope →

**Related links (strip):**
- Partial Discharge Monitoring →
- DGA Monitoring →
- Cable & MV Monitoring →
- Distribution Transformer & Power Quality Monitoring →
- Asset Management →
- Other sectors: Airports → · Distribution Utilities →

---

## 07 — Closing CTA

**Headline:** Discuss your data center.
**Sub:** Tell us the intake voltage, the number of main transformers and generators, and what you can and cannot take out of service.
**CTA:** Plan a technical meeting
