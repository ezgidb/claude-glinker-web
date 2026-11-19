# PARTIAL DISCHARGE MONITORING (slug: partial-discharge) — English copy deck

**SEO title:** Partial Discharge Monitoring | ICMobserver | Glinker
**Meta description:** Continuous online partial discharge monitoring for power transformers, generators and motors with ICMobserver. Glinker Group, in partnership with Megger.

---

## 01 — Hero

**Breadcrumb:** Online Monitoring / Partial Discharge Monitoring
**Eyebrow (mono):** TECHNOLOGY T1 · POWER TRANSFORMER · GENERATOR & HV MOTOR · CABLE TERMINATIONS

**H1:** Partial Discharge Monitoring

**Sub:** Shows whether an insulation defect is stable or growing, while the asset stays energised.

**Intro:**
Partial discharge is a small electrical discharge that bridges only part of the insulation. It is both a symptom of an insulation defect and a cause of further damage. Monitoring it continuously, while the asset is energised, shows whether a defect is stable or growing long before the insulation fails.

**In-page nav:** Phenomenon · Detects · Reading it · Applies · Product · After an alarm · Standards · FAQ

**Hero viz labels:** `ILLUSTRATIVE — PD PULSES OVER ONE AC CYCLE` · `0°` `90°` `180°` `270°` `360°` · `PHASE` · `MAGNITUDE`

---

## 02 — How the phenomenon works

**Eyebrow:** 01 — THE PHENOMENON

**Headline:** A small spark in the wrong place, thousands of times.

**Body:**
Insulation is designed to hold the full voltage across its thickness. A defect changes the local picture. A gas-filled void in solid insulation, a sharp edge, a contaminated surface: at such a point the electric field can exceed what the local material withstands, even though the insulation as a whole is far from breakdown.

The result is a discharge that bridges only that small region. It lasts a very short time and carries very little energy. The asset keeps working. But the discharge repeats with the alternating voltage, cycle after cycle, and each event erodes the material around it a little. The defect that causes the discharge is also enlarged by it.

That is why partial discharge is useful to measure. It is one of the few signs of insulation deterioration that can be observed from outside while the asset is in service.

**Three short facts (datasheet rows)**
- **Partial** — the discharge does not bridge the whole insulation. There is no short circuit.
- **Repetitive** — it follows the AC voltage and recurs on each cycle while the conditions hold.
- **Progressive** — in solid insulation the damage is cumulative and does not heal.

**Pull-quote:**
Partial discharge is both the symptom and the cause.

---

## 03 — What it detects

**Eyebrow:** 02 — WHAT IT DETECTS

| Label | Description |
|---|---|
| Voids and cracks | Voids, delamination and cracks inside solid insulation. |
| Surface tracking | Surface discharges and tracking on bushings and terminations. |
| Stator discharges | Slot and end-winding discharges in stator windings. |
| Rising trend | Changes in discharge magnitude and repetition rate over time. |

**Key line:**
A single measurement tells you that partial discharge is present. A trend tells you whether to act.

---

## 04 — How to read the measurement

**Eyebrow:** 03 — READING IT

**Headline:** Three things to look at: how large, how often, where on the cycle.

**Body blocks**

- **Magnitude.** How large the discharge pulses are. A rising level suggests a growing defect, but magnitude alone can mislead: a small, persistent discharge in a critical place can matter more than a large one somewhere harmless.
- **Repetition rate.** How many discharge events occur per second. A defect that discharges more often is usually more active, even if the pulse size has not changed.
- **Phase position.** Where on the AC voltage cycle the pulses occur. Different kinds of defect leave different patterns when pulses are plotted against phase. This is how internal discharges, surface discharges and external interference are told apart.
- **Trend.** How all three change over weeks and months, and how they move with load, temperature and humidity. This is the part only continuous monitoring provides.

**Noise (short block)**
A substation or power plant is an electrically noisy place. Much of the work in online partial discharge measurement is separating real discharges inside the asset from interference outside it. Filtering, gating and pattern analysis exist for this reason, and a sudden "discharge" that does not follow the voltage cycle is usually not a discharge.

**What it can and cannot tell you (honesty block)**

| It can tell you | It cannot tell you |
|---|---|
| That discharge activity is present in the monitored insulation | The remaining life of the asset in months or years |
| Whether that activity is stable, rising or changing in character | The exact location of a defect from a single measuring point |
| From its pattern, what kind of defect is likely | Anything about failure modes that produce no discharge, such as purely thermal ageing |
| When a change is fast enough to need action | Whether a level is "acceptable" without the asset's own history as a reference |

**Glossary one-liners**
- **Apparent charge** — the measured size of a discharge pulse as seen at the terminals, the quantity defined in IEC 60270.
- **Qp** — the peak apparent charge level; the basis of a level alarm.
- **NQS** — a measure of discharge activity per second; the basis of a rate alarm.
- **Phase-resolved pattern** — discharge pulses plotted against the AC voltage cycle.
- **Gating** — suppressing the measurement during known interference.
- **Coupler** — the sensor that picks up the discharge signal from the asset.

---

## 05 — Where it applies

**Eyebrow:** 04 — WHERE IT APPLIES

| Asset | What is monitored | What is different |
|---|---|---|
| Power transformer | Windings and bushings | Long replacement lead time: early warning has the highest value here. |
| Generator and HV motor | Stator winding insulation | A base level of partial discharge is normal in operation. The change over time is the useful signal, not the single reading. |
| Cable terminations | The termination insulation and its interfaces | The weak point of a cable circuit is often where it ends. |

**Note on GIS (small):**
Gas-insulated switchgear is monitored in the UHF range from inside the enclosure, with different equipment. On this site that row reads "On request". Contact us if GIS is your asset.

---

## 06 — Product: ICMobserver

**Eyebrow:** 05 — PRODUCT

**Product name:** ICMobserver
**One line:** A permanently installed partial discharge monitoring system from Megger's Power Diagnostix product line.

**Spec rows — PER MANUFACTURER DATA**

| Label | Value |
|---|---|
| Type | Permanently installed system for continuous online partial discharge monitoring |
| In one unit | Spectrum analyser, time-domain oscilloscope, voltage measurement, partial discharge monitor |
| Alarms | Two types: Qp alarm on discharge level; NQS alarm on the number of discharge events per second |
| Signal processing | Digital signal processing with noise gating for sites with strong interference |
| Operation | Through a web browser |
| Existing sensors | Partial discharge sensors already installed on an asset, including those from other suppliers, can typically be integrated |
| Sensors | Bushing couplers, coupling capacitors or UHF sensors, depending on the asset; defined with the manufacturer for each installation |
| Assets | Power transformers; rotating machines (generators, motors); cable terminations |

**Body under the table:**
Sensor choice depends on the asset and is defined with the manufacturer for each installation. Ask us for the current datasheet for any value not listed here.

**Why two alarms (short explainer):**
A level alarm catches a defect whose discharges are getting larger. A rate alarm catches one whose discharges are getting more frequent. Defects do not always do both.

---

## 07 — What happens after an alarm

**Eyebrow:** 06 — AFTER AN ALARM

**Headline:** An alarm starts a check, not a shutdown.

1. **Check that it is real.** Compare with the phase pattern, the other channels and what was happening on site. Interference is ruled out first.
2. **Look at the trend.** Is the change a step or a slope? Does it follow load, temperature or humidity?
3. **Cross-check.** On a transformer, look at dissolved gas and moisture. On a machine, look at operating data and the last offline results.
4. **Decide the next measurement.** A targeted offline test or inspection at the next opportunity, or sooner if the trend is steep.
5. **Plan.** Set the intervention at a time you choose.

**Caption:** General sequence. The operating procedure belongs to the asset owner.

---

## 08 — How it combines with other methods

**Eyebrow:** 07 — RELATED TECHNOLOGY

**Headline:** One insulation system, seen from two sides.

**Body:**
Partial discharge shows the electrical condition of the insulation; dissolved gas monitoring shows what is happening in the oil. On power transformers the two are read together. A rise in both is a stronger finding than a rise in either. A rise in one without the other is also information: it narrows down what kind of process is at work.

**Links:**
- Dissolved Gas Analysis (DGA) Monitoring →
- Note: Reading partial discharge and DGA together →
- Asset Management — bring the trend into the asset record →

---

## 09 — Relevant standards

**Eyebrow:** 08 — STANDARDS

| Standard | What it covers |
|---|---|
| IEC 60270 | The reference standard for partial discharge measurement. |
| IEC TS 62478 | Electromagnetic (including UHF) and acoustic measurement methods. |
| IEC TS 60034-27-2 | Online partial discharge measurement on stator windings of rotating machines. |

**Small print:** Standards are named for orientation. They describe measurement methods, not acceptance limits for a specific asset.

---

## 10 — FAQ

**Q: Is any partial discharge a problem?**
Not necessarily. In rotating machines a base level is normal in operation. In all assets, the level is judged against the asset's own history. What matters most is a change.

**Q: Why monitor continuously if we already test periodically?**
A periodic test records one moment. Discharge activity varies with load, temperature and humidity, and a defect can start after the test. Continuous monitoring records the trend between tests.

**Q: Can monitoring tell us when the insulation will fail?**
No. It shows that a defect is active and whether it is growing. It does not give a failure date. It gives time to investigate and plan.

**Q: We already have couplers fitted on our generator. Can they be used?**
Per manufacturer data, sensors already installed on an asset, including those from other suppliers, can typically be integrated with ICMobserver. This is confirmed for each installation.

**Q: Is ICMobserver used for gas-insulated switchgear?**
No. GIS is a separate case and is listed on this site as "On request".

---

## 11 — Closing CTA

**Headline:** Ask about partial discharge monitoring.
**Sub:** Tell us the asset, its voltage level and whether sensors are already fitted.
**CTA:** Plan a technical meeting
**Secondary link:** Back to all assets →
