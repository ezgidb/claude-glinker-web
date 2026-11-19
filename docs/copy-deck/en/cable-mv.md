# CABLE & MV MONITORING (slug: cable-mv) — English copy deck

**SEO title:** Cable and MV Network Monitoring | Glinker Group
**Meta description:** Online monitoring of HV cable joints and terminations with Synaptec Greenlight, and MV feeder fault sensing with MS5200. In partnership with Megger.

---

## 01 — Hero

**Breadcrumb:** Online Monitoring / Cable & MV Monitoring
**Eyebrow (mono):** TECHNOLOGY T3 · HV CABLE CIRCUIT · MV OVERHEAD FEEDER

**H1:** Cable & MV Monitoring

**Sub:** The asset is a route, not a single item. Watch the known weak points. Locate faults fast.

**Intro:**
Cables and feeders differ from transformers and machines in one respect: the asset is a route, not a single item. The weak points are spread along kilometres of circuit. Monitoring therefore has two tasks: watching known weak points on high-voltage cables, and locating faults quickly on medium-voltage feeders.

**Clarifier (keep visible — two different things on one page):**
This page covers two separate solutions. One is for high-voltage cable circuits. The other is for medium-voltage overhead lines. They share a page because both deal with a route. They do not share a product.

**In-page nav:** Two tasks · Detects · Reading it · Applies · Products · After an alarm · FAQ

**Hero viz labels:** `ILLUSTRATIVE — ONE ROUTE, MANY POINTS` · `TERMINATION` · `JOINT` · `JOINT` · `TERMINATION` · `SENSOR` · `FAULTED SECTION`

---

## 02 — Two tasks

**Eyebrow:** 01 — TWO TASKS

**Headline:** On a cable, watch the points. On a line, find the section.

### Task A — HV cable: watch the weak points

**Body:**
A high-voltage cable is manufactured and tested in a factory. Its joints and terminations are assembled on site, by hand, in a trench or on a structure. That is where most of the risk sits. They are also spread along the route, often in places that are hard to reach.

Three quantities say a lot about them. Phase current shows the load each cable carries. Screen current shows whether the metallic screen and its bonding are behaving as designed. Temperature shows whether a joint or termination is running hotter than its neighbours.

### Task B — MV overhead feeder: find the fault

**Body:**
On a medium-voltage overhead feeder the question is rarely the condition of insulation. It is location. A feeder may run for many kilometres with branches. When protection trips, someone has to find where. Some faults do not trip protection at all: a broken conductor or a high-impedance fault may draw too little current to be seen from the substation.

Sensors mounted on the line measure current and voltage at points along it. Software compares what the sensors saw and narrows the fault down to a section.

**Pull-quote:**
The task is locating a fault on a long line, not assessing insulation.

---

## 03 — What it detects

**Eyebrow:** 02 — WHAT IT DETECTS

| Where | Label | Description |
|---|---|---|
| HV cable | Screen current | Abnormal screen (sheath) currents at joints and terminations. |
| HV cable | Overheating | Temperature at joints and terminations. |
| HV cable | Load imbalance | Unequal phase currents along the circuit. |
| MV overhead feeder | Fault passage | Which sensors saw the fault current, so the faulted section is identified. |
| MV overhead feeder | Broken conductor | An open conductor, with the section identified. |
| MV overhead feeder | High-impedance fault | A fault that draws too little current for conventional detection. |

---

## 04 — How to read the measurement

**Eyebrow:** 03 — READING IT

**Body blocks — HV cable**

- **Screen current against design.** The screen bonding of a cable circuit is designed so that screen currents stay within an expected pattern. A change in that pattern points to the bonding system, the links or the outer sheath, usually at or near a joint.
- **Temperature against neighbours.** Joints on the same circuit carry the same load. One that runs warmer than the others, at the same current, is the one to look at.
- **Everything against load.** Temperature and screen current rise and fall with load. Reading them together with phase current separates a normal busy day from an abnormal condition.

**Body blocks — MV overhead feeder**

- **Between which sensors.** A fault is located between the last sensor that saw it and the first that did not. More sensors mean shorter sections.
- **Voltage and current together.** A broken conductor may show as a loss of current or an abnormal voltage downstream, not as a fault current. Measuring both is what makes it visible.
- **Patterns over time.** Repeated short events on the same section can point to a developing problem before a permanent fault.

**What it can and cannot tell you (honesty block)**

| It can tell you | It cannot tell you |
|---|---|
| HV cable: that a joint or termination is behaving differently in current, screen current or temperature | HV cable: the partial discharge level or insulation condition. Greenlight is not a partial discharge system |
| HV cable: which monitored point along the route is affected | HV cable: the state of unmonitored points between sensors |
| MV feeder: which section a fault is in | MV feeder: the condition of underground cable. MS5200 is an overhead-line sensor |
| MV feeder: that a broken conductor or high-impedance fault has occurred | MV feeder: the exact pole or span; a section still has to be patrolled |

**Glossary one-liners**
- **Joint** — the connection between two lengths of cable.
- **Termination** — the end of a cable where it connects to other equipment.
- **Screen (sheath)** — the metallic layer around the cable insulation, bonded to earth.
- **Screen current** — current flowing in that metallic layer.
- **Passive sensor** — a sensor that needs no power supply at the measuring point.
- **High-impedance fault** — a fault with too little current to operate conventional protection.
- **Fault passage** — an indication that fault current flowed past a given point.

---

## 05 — Where it applies

**Eyebrow:** 04 — WHERE IT APPLIES

- High-voltage land cable circuits and their joint bays and terminations
- Export and array cables of offshore wind plants
- Medium-voltage overhead distribution feeders

---

## 06 — Products

**Eyebrow:** 05 — PRODUCTS

### Product A — Synaptec Greenlight®

**For:** HV cable circuits
**One line:** A continuous online monitoring system for high-voltage cable circuits from Synaptec, offered by Megger under a strategic alliance between the two companies.

**Spec rows — PER MANUFACTURER DATA**

| Label | Value |
|---|---|
| Monitors | Cable joints and terminations along the circuit |
| Measures | Phase current, screen current, temperature |
| Sensors | Passive; no control power needed at the measuring point |
| Voltage level | High-voltage cable systems |

**Limit box:** Greenlight measures current, screen current and temperature. It is not a partial discharge monitoring system.

**Why passive sensors matter (short explainer):**
Joint bays are often far from any auxiliary supply. A sensor that needs no power at the measuring point can be placed where the joint is, not where the power is.

### Product B — MS5200 with Megger Grid Analytics

**For:** MV overhead feeders
**One line:** MS5200 is a Megger line-mounted sensor for medium-voltage networks. Megger Grid Analytics (MGA) is the software that manages the sensors and analyses their data.

**Spec rows — PER MANUFACTURER DATA**

| Label | Value |
|---|---|
| Hardware | MS5200 line-mounted sensor |
| Software | Megger Grid Analytics (MGA) |
| Measures | Current and voltage on the line |
| Accuracy | 0.5 % current and voltage measurement |
| Versions | MS5200-SU with radio communication; MS5200-GS with an integrated cellular gateway |
| Analytics | MGA identifies conditions such as broken conductors and high-impedance faults |
| Hosting | MGA can run on a Megger-hosted cloud server or on the customer's own server |

**Limit box:** MS5200 is a sensor for overhead lines. For underground MV cable, ask us; the suitable equipment is checked with the manufacturer.

---

## 07 — What happens after an alarm

**Eyebrow:** 06 — AFTER AN ALARM

**HV cable**
1. **Alarm.** A joint or termination shows abnormal temperature or screen current.
2. **Compare.** Check against load and against the other monitored points on the circuit.
3. **Inspect.** Plan a site inspection of the joint bay, link boxes and bonding at that location.
4. **Decide.** Adjust loading, schedule a repair or continue to watch.

**MV overhead feeder**
1. **Event.** The software reports a fault and the section it lies in.
2. **Dispatch.** The crew goes to that section instead of patrolling the whole feeder.
3. **Restore.** Switching isolates the section; supply to the rest is restored.
4. **Review.** Recurring events on the same section are reviewed as a possible developing problem.

**Caption:** General sequences. Switching and dispatch procedures belong to the network operator.

---

## 08 — How it combines with other methods

**Eyebrow:** 07 — RELATED TECHNOLOGY

**Body:**
Partial discharge at cable terminations is covered under Partial Discharge Monitoring. Voltage quality on the same feeders is covered under Distribution Transformer & Power Quality Monitoring. Records from both solutions on this page can feed fleet-level planning under Asset Management.

**Links:** Partial Discharge Monitoring → · Distribution Transformer & Power Quality Monitoring → · Asset Management →

---

## 09 — FAQ

**Q: Does Greenlight measure partial discharge in the cable?**
No. Per manufacturer data it measures phase current, screen current and temperature at joints and terminations.

**Q: Is Greenlight for medium-voltage cable?**
No. It is a system for high-voltage cable circuits.

**Q: Are MS5200 and Megger Grid Analytics the same thing?**
No. MS5200 is the sensor on the line. Megger Grid Analytics is the software that manages the sensors and analyses their data.

**Q: Where does the analytics software run?**
Per manufacturer data, on a Megger-hosted cloud server or on the customer's own server.

**Q: We have underground MV cable. What applies?**
MS5200 is an overhead-line sensor. Tell us about the network and we will check the suitable route with the manufacturer.

---

## 10 — Closing CTA

**Headline:** Ask about cable and MV monitoring.
**Sub:** Tell us the voltage level, whether the route is cable or overhead line, and its approximate length.
**CTA:** Plan a technical meeting
**Secondary link:** Back to all assets →
