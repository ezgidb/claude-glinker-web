# DISTRIBUTION TRANSFORMER & POWER QUALITY MONITORING (slug: distribution-power-quality) — English copy deck

**SEO title:** Distribution Transformer & Power Quality | Glinker
**Meta description:** Oil-condition sensing for distribution transformers with TrafoStick and Class A power quality measurement with PQI-DA smart. Glinker Group, Türkiye.

> NOTE: content.md's meta ended "In partnership with Megger." Removed here because both products on this page are A. Eberle and no Megger–A. Eberle relationship may be implied.

---

## 01 — Hero

**Breadcrumb:** Online Monitoring / Distribution Transformer & Power Quality
**Eyebrow (mono):** TECHNOLOGY T4 · DISTRIBUTION TRANSFORMER · SUPPLY POINT / BUSBAR

**H1:** Distribution Transformer & Power Quality Monitoring

**Sub:** A compact sensor for transformer oil, and a Class A analyser for the quality of supply.

**Intro:**
Distribution networks hold thousands of transformers, each too small to justify a full monitoring system, and they deliver the voltage that customers actually receive. Two measurements cover this level: a compact sensor for the condition of the transformer oil, and a Class A analyser for the quality of the supply.

**In-page nav:** Two measurements · Detects · Reading it · Applies · Products · After an alarm · Standards · FAQ

**Hero viz labels:** `ILLUSTRATIVE — VOLTAGE DIP` · `NOMINAL` · `RESIDUAL VOLTAGE` · `DURATION` · `RMS VOLTAGE` · `TIME`

---

## 02 — Two measurements

**Eyebrow:** 01 — TWO MEASUREMENTS

**Headline:** One looks into the transformer. One looks at the network.

### A — Oil condition in a distribution transformer

**Body:**
The oil in a transformer insulates and cools. Over years it ages and takes up moisture, and both lower its ability to withstand voltage. In a large power transformer this is followed with laboratory samples and dedicated monitors. A distribution network has too many units for that.

The practical answer is one compact sensor per unit, sitting in the oil and reporting its condition continuously. It does not give the depth of a laboratory analysis. It gives a continuous indication for assets that otherwise have none.

### B — Power quality at a supply point

**Body:**
Power quality is not the condition of one asset. It is a property of the network, measured at a connection point: how close the delivered voltage is to a steady sine wave of the right magnitude and frequency.

Disturbances come from both directions. Faults and switching elsewhere on the network cause dips. Non-linear loads such as converters, drives and power supplies draw distorted current and cause harmonics. A fixed analyser at the connection point records what happened, when, and for how long.

**Pull-quote:**
A network property measured at a connection point, not a condition of one asset.

---

## 03 — What it detects

**Eyebrow:** 02 — WHAT IT DETECTS

**In the transformer**
- Falling dielectric strength of the oil
- Rising moisture
- Hydrogen as a sign of a developing fault

> NOTE: these three lines are from content.md's "What it detects" list and describe the method (online oil-condition sensing) in general. Do not move them into the TrafoStick product block; that block stays generic until the A. Eberle TS G2 datasheet is in hand.

**In the network**

| Label | One-line definition |
|---|---|
| Voltage dip | A short reduction in voltage, usually caused by a fault or a large load starting somewhere on the network. |
| Voltage swell | A short increase in voltage above the normal range. |
| Interruption | A loss of voltage, short or long. |
| Harmonics | Distortion of the voltage waveform at multiples of the supply frequency, mainly from non-linear loads. |
| Flicker | Repeated small voltage changes that cause visible variation in lighting. |
| Unbalance | Unequal voltages across the three phases. |
| Frequency deviation | Departure of the supply frequency from its nominal value. |

**Line:** Each event is recorded with its waveform.

---

## 04 — How to read the measurement

**Eyebrow:** 03 — READING IT

**Oil condition**
- **Follow the trend, per unit.** Oil in a healthy transformer changes slowly. A unit whose readings move faster than the rest of the population is the one to visit.
- **Read moisture with temperature.** Water moves between paper and oil as the transformer warms and cools. Compare like with like.
- **Use it to rank, not to diagnose.** The sensor tells you which units need attention. An oil sample or an inspection tells you why.

**Power quality**
- **Depth and duration.** A dip is described by how far the voltage fell and for how long. Whether equipment rides through depends on both.
- **Direction.** Recorded voltage and current together help show whether a disturbance came from the network or from the installation's own load.
- **Statistics and events.** Harmonics, flicker and unbalance are assessed statistically over a period. Dips, swells and interruptions are counted as events. A report needs both.
- **Comparability.** Two instruments only agree if they measure the same way. That is what Class A is for.

**What it can and cannot tell you (honesty block)**

| It can tell you | It cannot tell you |
|---|---|
| Oil sensor: that oil condition in one unit is changing, and how fast | Oil sensor: the type of fault inside the transformer. It is not a DGA laboratory and not a partial discharge measurement |
| Oil sensor: which units in a population to look at first | Oil sensor: the condition of windings or tap changer directly |
| PQ analyser: what the voltage did at this point, with time stamp and waveform | PQ analyser: what happened at points where nothing is installed |
| PQ analyser: whether supply at this point stayed within EN 50160 characteristics | PQ analyser: who is responsible for a disturbance, from one measuring point alone |

**Glossary one-liners**
- **Dielectric strength** — the voltage the oil can withstand before it breaks down.
- **Point of common coupling** — the point where a customer's installation connects to the public network.
- **Class A** — the measurement class in IEC 61000-4-30 for results that must be comparable between instruments.
- **Fault recorder** — a function that captures waveforms before, during and after an event.
- **Non-linear load** — a load that draws current which is not proportional to the voltage waveform.

---

## 05 — Where it applies

**Eyebrow:** 04 — WHERE IT APPLIES

- Distribution transformers in utility, industrial and campus networks
- Points of common coupling between a utility and a large customer
- Substation busbars and supplies to sensitive loads such as data halls

---

## 06 — Products

**Eyebrow:** 05 — PRODUCTS

### Product A — TrafoStick (A. Eberle)

**For:** Distribution transformers
**One line:** TrafoStick is an in-oil sensor from A. Eberle for continuous monitoring of transformer oil condition.

**Spec rows**

| Label | Value |
|---|---|
| Type | In-oil sensor |
| Purpose | Continuous monitoring of transformer oil condition |
| Fit | One sensor per transformer |
| Details | Measured quantities and ranges: on request, from the manufacturer's current datasheet |

> NOTE: HOLD. No measured-quantity list, no ranges, no "TS G2" claims until A. Eberle's own datasheet is checked. "One sensor per transformer" restates the master table's "one sensor per unit".

### Product B — PQI-DA smart (A. Eberle)

**For:** Supply points and busbars
**One line:** PQI-DA smart is a fixed-installed power quality analyser and fault recorder from A. Eberle for low-, medium- and high-voltage networks.

**Spec rows — PER MANUFACTURER DATA**

| Label | Value |
|---|---|
| Type | Fixed-installed power quality analyser and fault recorder |
| Networks | Low, medium and high voltage |
| Measurement class | Class A to IEC 61000-4-30 Edition 3 |
| Classification | PQI-A-FI-H under IEC 62586 |
| Fault recorder | Sampling at 40.96 kHz |

**Why "fixed-installed" matters (short explainer):**
A portable analyser answers a question after a problem has been noticed. A fixed analyser has already recorded the event when the question is asked.

---

## 07 — What happens after an alarm

**Eyebrow:** 06 — AFTER AN ALARM

**Oil condition**
1. **Indication.** One unit's oil condition moves away from its own baseline.
2. **Compare.** Check against load and temperature, and against similar units.
3. **Sample or inspect.** Take an oil sample or inspect the unit at the next opportunity.
4. **Decide.** Treat the oil, repair, replace or continue to watch.

**Power quality**
1. **Event.** A dip, swell or interruption is recorded with its waveform.
2. **Correlate.** Match the time stamp with trips, process stops or equipment faults on site.
3. **Locate the source.** Network side or load side.
4. **Act.** Raise it with the network operator, or address the load, with a record that both sides can read.

**Caption:** General sequences. Procedures and limits belong to the operator.

---

## 08 — Relevant standards

**Eyebrow:** 07 — STANDARDS

| Standard | What it covers |
|---|---|
| EN 50160 | The voltage characteristics of public electricity networks. |
| IEC 61000-4-30 | How power quality parameters are measured. Class A is the class used when results must be comparable and contractually reliable. |
| IEC 62586 | Product standard for power quality measuring instruments; the source of the PQI-A-FI-H classification. |

---

## 09 — How it combines with other methods

**Eyebrow:** 08 — RELATED TECHNOLOGY

**Body:**
For dissolved gas and moisture monitoring on power transformers, see Dissolved Gas Analysis (DGA) Monitoring. To bring these readings into fleet-level planning, see Asset Management.

**Links:** DGA Monitoring → · Asset Management → · Cable & MV Monitoring →

---

## 10 — FAQ

**Q: Why not fit a full monitoring system to every distribution transformer?**
Because there are too many units and each is of modest value. The practical approach is one compact sensor per unit, used to rank the population.

**Q: Is an in-oil sensor the same as DGA?**
No. It is online oil-condition sensing. It indicates that the oil in a unit is changing. Laboratory analysis is still what explains why.

**Q: What does Class A mean in practice?**
That the instrument measures each parameter by the method defined in IEC 61000-4-30, so results from different Class A instruments can be compared and used in a contractual discussion.

**Q: What is the difference between a power quality analyser and a fault recorder?**
The analyser evaluates quality parameters over time. The fault recorder captures the waveform around an event. PQI-DA smart is described by its manufacturer as both.

**Q: Where should a power quality analyser be installed?**
Typically at the point of common coupling, on main busbars and on supplies to sensitive loads. The measuring points are defined for each installation.

---

## 11 — Closing CTA

**Headline:** Ask about distribution and power quality monitoring.
**Sub:** Tell us how many transformers you operate, or the supply point you want to measure.
**CTA:** Plan a technical meeting
**Secondary link:** Back to all assets →
