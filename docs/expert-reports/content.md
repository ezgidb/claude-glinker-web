# Glinker Group — Online Monitoring: verification + English copy

Prepared 2026-11-14. Editor notes are marked `NOTE:` and are never part of page copy.

## 0. How the verification was done (read this first)

Direct access to megger.com, a-eberle.de and the other manufacturer hosts was blocked in this session (hosts outside the network allowlist). Every fact below was therefore checked through **web-search index results of the manufacturer's own pages**, not by opening the page or datasheet. Status codes:

- **S-MFR** = stated on the manufacturer's own page as returned by the search index (megger.com, a-eberle.de, ips-energy.com). Good enough to draft with; **open the URL and confirm the figure before publishing.**
- **S-3RD** = found only on a third-party or regional-partner page (reseller-hosted datasheet, directindustry, a-eberle.co.za). **Do not publish the value** until checked against the manufacturer datasheet.
- **UNVERIFIED** = no usable source found.

Page copy in section 3 uses S-MFR facts only. S-3RD values appear only in the table.

---

## 1. Verification table

| # | Client's name | Correct name / maker | What it monitors (one sentence) | Assets | Key facts (status, source) | Problems / risks in client's assumptions |
|---|---|---|---|---|---|---|
| 1 | ICMobserver | **ICMobserver** — Megger (Power Diagnostix product line; Megger calls the unit "Megger PD Aachen") | Permanently installed system for continuous online partial discharge monitoring. | Power transformers; rotating machines (motors, generators); cable terminations | (a) Combines four functions in one unit: spectrum analyser, time-domain oscilloscope, voltage measurement, PD monitor — S-MFR. (b) Two alarm types: Qp (apparent charge level) and NQS (PD events per second) — S-MFR. (c) Operated from a web browser; PD sensors from other suppliers already fitted on an asset can typically be integrated — S-MFR. (d) 4 PD channels + 4 sync channels, 9 kHz–1 MHz bandwidth — **S-3RD** (reseller-hosted datasheet), confirm. Source: https://www.megger.com/en/products/icmobserver-pd-monitoring-system ; S-3RD: https://tunasdielektrika.com/v2/Pdfs/megger/pdix/ICMobserver_DS_EN.pdf | Checklist 5.1 lists **GIS** in the one-line scope. Megger's public ICMobserver page names transformers, rotating machines and cable terminations; for GIS Megger lists a separate product, **GISmonitor**. Do not pair GIS with ICMobserver. Client deck is titled "ICMObserver G2" — no "G2" variant found publicly: UNVERIFIED, use "ICMobserver". Spelling: lowercase "o". |
| 2 | InsuLogix G2 (DGA) | **InsuLogix® G2** — Megger. Full name on megger.com: "acetylene, hydrogen, and moisture monitor" | Online monitor for dissolved hydrogen, dissolved acetylene and moisture in transformer oil. | Oil-filled power transformers (Megger also addresses medium power and renewable-plant transformers) | (a) Measures hydrogen, acetylene, moisture — S-MFR. (b) Limits of detection 25 ppm H2, 0.5 ppm C2H2, 2 ppm moisture — S-MFR (Megger blog, April 2024). (c) Mounts on a single 38 mm (1.5") valve; approx. 13.5 kg — S-MFR. (d) Modbus RTU and TCP standard; DNP3 and IEC 61850 optional — S-MFR. Sources: https://www.megger.com/en/products/insulogixr-g2-acetylene-hydrogen-and-moisture-monitor ; https://megger.com/en/blog/april-2024/online-disolved-gas-monitoring | **It is not a multi-gas DGA monitor.** It is a two-gas (H2 + C2H2) + moisture early-warning monitor. Megger itself states it cannot provide Duval Triangle or gas-ratio diagnosis. Megger files it under "DGA monitoring", so the page name is acceptable, but copy must never say "full DGA", "fault-type diagnosis", or imply IEC 60599 / IEEE C57.104 ratio interpretation from the device. Prototype row "gas development, thermal faults" overstates: a two-gas unit flags that a fault is developing; identifying the fault type needs laboratory DGA. A multi-gas "InsuLogix G7" was mentioned in a search summary as planned — UNVERIFIED, do not publish. IP rating (IP66) — S-3RD only. |
| 3 | Greenlight | **Synaptec Greenlight®** — Synaptec (UK); offered on megger.com under Cable Monitoring. Megger–Synaptec "strategic alliance" announced 22 Feb 2024 | Continuous online monitoring of high-voltage cable circuits at joints and terminations. | HV cable systems: land transmission cables, offshore wind export/array cables | (a) Monitors joints and terminations — S-MFR. (b) Measured quantities: phase current, screen (sheath) current, temperature — S-MFR. (c) Passive sensors, no control power at the sensor location; based on Synaptec's Distributed Electrical Sensing — S-MFR. Sources: https://www.megger.com/en/cable-monitoring ; https://www.megger.com/en/news/megger-and-synaptec-strategic-alliance | It is **HV**, not MV, and it is **not a partial discharge system** — do not describe it as PD or "insulation" monitoring. Relationship is an alliance (plus a reported minority investment), not an acquisition: keep the Synaptec name, as the owner decided. Sensing distance / number of sensors per fibre: UNVERIFIED, no figures in copy. |
| 4 | MGA / MS5200 | Two different things. **MS5200** = Megger smart-grid medium-voltage **line sensor** (variants MS5200-SU with radio, MS5200-GS with integrated cellular gateway). **MGA** = **Megger Grid Analytics**, the software that manages the sensors and analyses their data | MS5200: measures current and voltage on MV lines and reports faults; MGA: locates and classifies network faults from sensor data. | MV distribution feeders — **overhead lines** | (a) 0.5 % current and voltage measurement accuracy — S-MFR. (b) Two variants SU / GS — S-MFR. (c) MGA can run on Megger's Azure-hosted server or on the customer's server; detects broken conductors and high-impedance faults — S-MFR. (d) Voltage range 4–36 kV — **S-3RD** (directindustry), confirm. Sources: https://www.megger.com/en/products/ms5200-smart-grid-medium-voltage-sensor ; https://www.megger.com/en/grid-analytics-solutions | (1) Not Synaptec, not distributed sensing. (2) "MGA/MS5200" written as one product is wrong: one is software, one is hardware. (3) Listing it against "HV and MV cable — joint and termination failure" is **technically wrong**: MS5200 is an overhead-line sensor. Megger's cable-monitoring page names a different sensor family (**MS6000**) for MV cable fault location — UNVERIFIED beyond one search summary; ask Megger which sensor is in Glinker's scope for underground MV. (4) Origin (MetrySense/Metrycom line; one summary mentioned Sentrisense) — UNVERIFIED, do not state. |
| 5 | TrafoStick TS G2 | **TrafoStick** (generation "TS G2") — A. Eberle GmbH & Co. KG (Nuremberg) | In-oil sensor that continuously tracks the dielectric condition of transformer oil. | Oil-filled transformers (regional A. Eberle site says power and distribution) | (a) TS G2 combines breakdown voltage (BDV), hydrogen, moisture, oil temperature, oil pressure and a partial discharge indication in one sensor — **S-3RD** (A. Eberle South Africa site). (b) Maker confirmed as A. Eberle via older A. Eberle datasheets hosted by resellers — S-3RD. Sources: https://www.a-eberle.co.za/power-transformer-monitoring.html ; https://www.volta.it/wp-content/uploads/2018/12/db_trafostick_en.pdf | **No a-eberle.de product page for "TrafoStick TS G2" was found** — the whole item is S-3RD at best. Measuring ranges (10–120 kV BDV etc.) come from other generations (TS4x / TS5) and must not be attributed to G2. Prototype label "Compact monitoring" is not a method: the method is online oil-condition sensing (BDV + moisture + hydrogen). It overlaps technically with the DGA page (hydrogen, moisture) — cross-link rather than repeat. "PD indication" must not be presented as PD measurement. |
| 6 | PQI-DA Smart | **PQI-DA smart** (lowercase "smart") — A. Eberle GmbH & Co. KG | Fixed-installed power quality analyser and fault recorder. | LV, MV and HV networks: points of common coupling, substations, industrial and data-centre supplies | (a) Class A to IEC 61000-4-30 Ed. 3 — S-MFR. (b) Classified PQI-A-FI-H under IEC 62586 — S-MFR. (c) Fault recorder sampling 40.96 kHz / 10.24 kHz — S-MFR. (d) Predecessor PQI-DA is being discontinued; PQI-DA smart is the named successor — S-MFR. Sources: https://www.a-eberle.de/en/products/power-quality-analyzer-pqi-da-smart/ ; https://www.a-eberle.de/wp-content/uploads/2024/01/TD_PQI-DAsmart_EN.pdf | Spelling only. EN 50160 reporting and communication protocols were not visible in the indexed text — name EN 50160 as the applicable supply-quality standard, do not state device protocol lists until the datasheet is read. Megger sells its own portable PQ analysers (MPQ series): do not blur the two. |
| 7 | Megger APM / IPS | **IPS®APM** (asset performance management), built on the **IPS®SYSTEMS** platform — IPS-ENERGY (IPS Intelligent Process Solutions); Megger partnership announced Sept 2021; IPS states Megger holds a majority shareholding | Software that consolidates test, monitoring and operational data to assess asset condition and plan maintenance and investment. | Whole fleets: transformers, switchgear, cables, lines | (a) Megger offers APM software through IPS-ENERGY — S-MFR. (b) Integrates with SCADA, GIS (geographic information system), ERP — S-MFR/S-3RD mix, confirm. (c) Related modules: asset investment planning (IPS®AIP), test & monitoring data hub — S-MFR (ips-energy.com). Sources: https://www.megger.com/en/asset-performance-management ; https://ips-energy.com/company/partners/ | "Megger APM" is not a product name. Write "IPS®APM, offered by Megger with IPS-ENERGY". It is software, not a monitor: page H1 "Asset Management" is fine but copy must say "asset performance management software". Note the acronym clash: "GIS" = gas-insulated switchgear elsewhere on the site. |
| 8 | "A. Eberle under the Megger umbrella" | — | — | — | **UNVERIFIED.** No public source links Megger and A. Eberle (no megger.com page naming A. Eberle; A. Eberle's own news names a different growth investor). | The owner states the arrangement exists via Megger. That may be true commercially, but the site cannot cite it. Use neutral wording ("A. Eberle products, available through our partnership with Megger") **only after Megger confirms the sentence in writing**; otherwise list A. Eberle by brand name without stating the route. |
| 9 | Megger corporate context | — | — | — | Megger Group agreed in April 2026 to be acquired by ESCO Technologies (owner of Doble); regulatory approval window to April 2027 — S-3RD (law-firm and trade press). | Product names and brand lines may change. Keeps the "technology group, several products" page structure (checklist 5.3) the right choice. Do not mention the transaction on the site. |

---

## 2. Terminology corrections and the single master table

### 2.1 Corrections to the prototype table

| Prototype wording | Problem | Corrected wording |
|---|---|---|
| "Power transformer, generator — Insulation degradation — ICMobserver" | Two assets with different logic merged into one row | Separate rows; the difference goes in the "what is different" column |
| "Gas development, thermal faults — DGA — InsuLogix G2" | Implies fault-type diagnosis; device is two-gas + moisture | "Developing internal fault (early gas generation), moisture ingress" / "Online dissolved gas monitoring (hydrogen, acetylene) and moisture" |
| "HV and MV cable — Joint and termination failure — Greenlight, MGA/MS5200" | Greenlight is HV cable; MS5200 is an MV overhead-line sensor; MGA is software | Two rows: HV cable (Greenlight) and MV overhead feeder (MS5200 sensors with Megger Grid Analytics) |
| "Compact monitoring" | Not a method | "Online oil-condition sensing" |
| "Network, supply quality — Disturbances — Power quality" | Vague | "Voltage dips, harmonics, flicker, unbalance" / "Class A power quality measurement" |
| "PQI-DA Smart" | Spelling | "PQI-DA smart" |
| "Megger APM/IPS" | Not a product name | "IPS®APM" |
| "Asset management" as a method | It is software, not a measurement | "Asset performance management software" |
| GIS implied under ICMobserver | Different Megger product | Row kept, product cell reads "On request" (GISmonitor exists but is outside the confirmed portfolio — owner to decide) |

### 2.2 Shared logic — stated once, above the table (53 words)

> **What every row has in common.** Insulation and network faults usually develop over weeks or months before they cause an outage. A continuous measurement shows the trend while the asset stays in service, so the work can be planned. The table below lists only what differs from one asset to the next.

### 2.3 Master table (the only place asset–method–product mapping appears)

| Asset | Main failure mode | What is different about this asset | Monitoring method | Product |
|---|---|---|---|---|
| Power transformer | Insulation breakdown in windings and bushings; developing internal fault | Long replacement lead time: early warning has the highest value here | Partial discharge monitoring + dissolved gas and moisture monitoring | ICMobserver; InsuLogix® G2 |
| Generator and HV motor | Stator winding insulation deterioration | Some partial discharge is always present in normal operation, so the trend matters, not the single reading | Partial discharge monitoring | ICMobserver |
| Gas-insulated switchgear (GIS) | Internal insulation defects | Sealed and compact: measurement is made in the UHF range from inside the enclosure | UHF partial discharge monitoring | On request |
| HV cable circuit | Joint and termination failure | The weak points are spread along the route, not in one place | Current, screen current and temperature sensing at joints and terminations | Synaptec Greenlight® |
| MV overhead feeder | Line faults, broken conductors, high-impedance faults | The task is locating a fault on a long line, not assessing insulation | Line-mounted current and voltage sensors with analytics software | MS5200 with Megger Grid Analytics |
| Distribution transformer | Oil ageing and moisture | Many low-cost units: one sensor per unit, not a full monitoring system | Online oil-condition sensing | TrafoStick (A. Eberle) |
| Supply point / busbar | Voltage dips, harmonics, flicker, unbalance | A network property measured at a connection point, not a condition of one asset | Class A power quality measurement | PQI-DA smart (A. Eberle) |
| Whole fleet | Maintenance and investment effort placed on the wrong assets | Combines data from all rows above; adds no new measurement | Asset performance management software | IPS®APM |

NOTE: Column 3 is the answer to owner note 5.2. Rule for future rows: columns 1, 2, 4, 5 are factual labels; column 3 is one sentence that must not repeat the shared paragraph. Sector pages link to this table and never copy it.

---

## 3. Page copy

### 3.0 Online Monitoring hub — `/en/online-monitoring/`

**SEO title:** Online Monitoring for Critical Power Assets | Glinker Group
**Meta description:** Continuous monitoring for transformers, rotating machines, cables and networks. Partial discharge, DGA, power quality. In partnership with Megger.

**H1:** Online Monitoring

**Intro (40 words):**
Continuous condition monitoring for power transformers, generators and motors, high-voltage cables, medium-voltage feeders and distribution transformers. Glinker Group provides these solutions in Türkiye as a strategic partner of Megger. Start from your asset in the table, or go directly to a technology.

**Why continuous monitoring (87 words, appears once on the site):**
Most insulation and network faults do not appear suddenly. They develop over weeks or months, and for most of that time the asset keeps operating normally. A periodic test records one moment; a fault that starts the week after goes unseen until the next test. A permanently installed monitor measures while the asset is in service, records the trend and raises an alarm when a set limit is passed. Maintenance can then be planned around the condition of the asset instead of a fixed calendar or an unplanned outage.

**[Master table — section 2.3]**

**Technology links (cards):** Partial Discharge Monitoring · Dissolved Gas Analysis (DGA) Monitoring · Cable & MV Monitoring · Distribution Transformer & Power Quality Monitoring · Asset Management

**Sector strip heading:** Monitoring by sector
**Sector strip labels:** Data Centers · Airports · Distribution Utilities · Other critical facilities

**Closing line:**
For other solutions and field test instruments, contact us. We will help you find the right route for your requirement.

**CTA:** Plan a technical meeting

NOTE: Technical values on all pages below carry the label "per manufacturer data". Source URLs are recorded in section 1 and stay in the notes layer, not on the page, unless the owner wants a visible "Source" link.

---

### 3.1 Partial Discharge Monitoring — `/en/online-monitoring/partial-discharge-monitoring/`

**SEO title (53):** Partial Discharge Monitoring | ICMobserver | Glinker
**Meta description (150):** Continuous online partial discharge monitoring for power transformers, generators and motors with ICMobserver. Glinker Group, in partnership with Megger.

**H1:** Partial Discharge Monitoring

**Intro (50 words):**
Partial discharge is a small electrical discharge that bridges only part of the insulation. It is both a symptom of an insulation defect and a cause of further damage. Monitoring it continuously, while the asset is energised, shows whether a defect is stable or growing long before the insulation fails.

**What it detects**
- Voids, delamination and cracks inside solid insulation
- Surface discharges and tracking on bushings and terminations
- Slot and end-winding discharges in stator windings
- Changes in discharge magnitude and repetition rate over time

A single measurement tells you that partial discharge is present. A trend tells you whether to act.

**Where it applies**
- Power transformers: windings and bushings
- Generators and high-voltage motors: stator winding insulation, where a base level of partial discharge is normal and the change over time is the useful signal
- Cable terminations

**Product: ICMobserver**
ICMobserver is a permanently installed partial discharge monitoring system from Megger's Power Diagnostix product line. Per manufacturer data:
- One unit combines a spectrum analyser, a time-domain oscilloscope, voltage measurement and a partial discharge monitor.
- Two alarm types: a Qp alarm on discharge level and an NQS alarm on the number of discharge events per second.
- Digital signal processing with noise gating for sites with strong interference.
- Operated through a web browser; partial discharge sensors already installed on an asset, including those from other suppliers, can typically be integrated.

Sensor choice (bushing couplers, coupling capacitors, UHF sensors) depends on the asset and is defined with the manufacturer for each installation.

**Relevant standards**
IEC 60270 is the reference standard for partial discharge measurement. IEC TS 62478 covers electromagnetic (including UHF) and acoustic methods. IEC TS 60034-27-2 covers online partial discharge measurement on stator windings of rotating machines.

**Related technology**
Partial discharge shows the electrical condition of the insulation; dissolved gas monitoring shows what is happening in the oil. On power transformers the two are read together. See Dissolved Gas Analysis (DGA) Monitoring.

**CTA:** Plan a technical meeting

NOTE: ~330 words. Channel count and bandwidth withheld until Megger datasheet is checked (S-3RD).

---

### 3.2 Dissolved Gas Analysis (DGA) Monitoring — `/en/online-monitoring/dga-monitoring/`

**SEO title (49):** DGA Monitoring | InsuLogix G2 | Glinker Group
**Meta description (152):** Online monitoring of hydrogen, acetylene and moisture in transformer oil with InsuLogix G2. Early fault warning. Glinker Group, in partnership with Megger.

**H1:** Dissolved Gas Analysis (DGA) Monitoring

**Intro (50 words):**
When a fault develops inside an oil-filled transformer, the oil and paper insulation break down and release gases that dissolve in the oil. Measuring those gases online gives an early warning between laboratory samples. Hydrogen and acetylene are the two gases that carry most of that early-warning information.

**What it detects**
- Hydrogen: produced by most developing faults, including partial discharge and overheating, so it is a general early indicator
- Acetylene: associated with arcing and very high temperatures, so even small amounts need attention
- Moisture in oil: reduces dielectric strength and speeds up ageing of paper insulation

An online two-gas monitor answers the question "is something developing, and how fast?". Identifying the type of fault needs a full multi-gas analysis.

**Where it applies**
- Power transformers in transmission and distribution substations
- Generator step-up and plant transformers
- Transformers supplying critical loads, where an unplanned outage has a high cost

**Product: InsuLogix® G2**
InsuLogix G2 is Megger's online monitor for hydrogen, acetylene and moisture in transformer oil. Per manufacturer data:
- Limits of detection: 25 ppm hydrogen, 0.5 ppm acetylene, 2 ppm moisture.
- Mounts on a single 38 mm (1.5 in) valve; weight approximately 13.5 kg.
- Communication: Modbus RTU and Modbus TCP as standard; DNP3 and IEC 61850 optional.

InsuLogix G2 is a two-gas monitor. It does not replace laboratory DGA, and ratio-based interpretation methods cannot be applied to its readings alone.

**Relevant standards**
IEC 60599 and IEEE C57.104 are the guides used to interpret full multi-gas DGA results from laboratory analysis. An alarm from an online monitor is normally followed by an oil sample interpreted under one of these guides.

**Related technology**
Dissolved gas monitoring and partial discharge monitoring look at the same insulation system from two sides and are read together on power transformers. See Partial Discharge Monitoring. For oil-condition sensing on distribution transformers, see Distribution Transformer & Power Quality Monitoring.

**CTA:** Plan a technical meeting

NOTE: ~340 words.

---

### 3.3 Cable & MV Monitoring — `/en/online-monitoring/cable-mv-monitoring/`

**SEO title (52):** Cable and MV Network Monitoring | Glinker Group
**Meta description (154):** Online monitoring of HV cable joints and terminations with Synaptec Greenlight, and MV feeder fault sensing with MS5200. In partnership with Megger.

**H1:** Cable & MV Monitoring

**Intro (50 words):**
Cables and feeders differ from transformers and machines in one respect: the asset is a route, not a single item. The weak points are spread along kilometres of circuit. Monitoring therefore has two tasks: watching known weak points on high-voltage cables, and locating faults quickly on medium-voltage feeders.

**What it detects**
- High-voltage cables: abnormal screen (sheath) currents, overheating and load imbalance at joints and terminations
- Medium-voltage feeders: fault passage, broken conductors and high-impedance faults, with the faulted section identified

**Where it applies**
- High-voltage land cable circuits and their joint bays and terminations
- Export and array cables of offshore wind plants
- Medium-voltage overhead distribution feeders

**Product: Synaptec Greenlight®**
Greenlight is a continuous online monitoring system for high-voltage cable circuits from Synaptec, offered by Megger under a strategic alliance between the two companies. Per manufacturer data:
- Monitors cable joints and terminations along the circuit.
- Measures phase current, screen current and temperature.
- Uses passive sensors that need no control power at the measuring point.

**Product: MS5200 with Megger Grid Analytics**
MS5200 is a Megger line-mounted sensor for medium-voltage networks. Megger Grid Analytics (MGA) is the software that manages the sensors and analyses their data. Per manufacturer data:
- Current and voltage measurement accuracy of 0.5 %.
- Two versions: MS5200-SU with radio communication and MS5200-GS with an integrated cellular gateway.
- MGA identifies conditions such as broken conductors and high-impedance faults, and can run on a Megger-hosted cloud server or on the customer's own server.

**Related technology**
Partial discharge at cable terminations is covered under Partial Discharge Monitoring. Voltage quality on the same feeders is covered under Distribution Transformer & Power Quality Monitoring.

**CTA:** Plan a technical meeting

NOTE: ~300 words. No standards named: none could be tied to these products with certainty. Open question for Megger: which sensor family covers underground MV cable (MS6000?) and is it in Glinker's scope.

---

### 3.4 Distribution Transformer & Power Quality Monitoring — `/en/online-monitoring/distribution-transformer-power-quality/`

**SEO title (57):** Distribution Transformer & Power Quality Monitoring | Glinker
**Meta description (153):** Oil-condition sensing for distribution transformers with TrafoStick and Class A power quality measurement with PQI-DA smart. In partnership with Megger.

**H1:** Distribution Transformer & Power Quality Monitoring

**Intro (50 words):**
Distribution networks hold thousands of transformers, each too small to justify a full monitoring system, and they deliver the voltage that customers actually receive. Two measurements cover this level: a compact sensor for the condition of the transformer oil, and a Class A analyser for the quality of the supply.

**What it detects**
- In the transformer: falling dielectric strength of the oil, rising moisture, and hydrogen as a sign of a developing fault
- In the network: voltage dips and swells, interruptions, harmonics, flicker, unbalance and frequency deviation, with recorded waveforms of each event

**Where it applies**
- Distribution transformers in utility, industrial and campus networks
- Points of common coupling between a utility and a large customer
- Substation busbars and supplies to sensitive loads such as data halls

**Product: TrafoStick (A. Eberle)**
TrafoStick is an in-oil sensor from A. Eberle for continuous monitoring of transformer oil condition. Per manufacturer data, the TS G2 generation combines breakdown voltage, hydrogen, moisture, oil temperature and oil pressure in one sensor.

**Product: PQI-DA smart (A. Eberle)**
PQI-DA smart is a fixed-installed power quality analyser and fault recorder from A. Eberle for low-, medium- and high-voltage networks. Per manufacturer data:
- Class A measurement to IEC 61000-4-30 Edition 3.
- Classified PQI-A-FI-H under IEC 62586.
- Fault recorder sampling at 40.96 kHz.

**Relevant standards**
EN 50160 defines the voltage characteristics of public electricity networks. IEC 61000-4-30 defines how power quality parameters are measured; Class A is the class used when results must be comparable and contractually reliable.

**Related technology**
For dissolved gas and moisture monitoring on power transformers, see Dissolved Gas Analysis (DGA) Monitoring. To bring these readings into fleet-level planning, see Asset Management.

**CTA:** Plan a technical meeting

NOTE: ~310 words. **HOLD the TrafoStick sentence** until A. Eberle's own TS G2 datasheet is in hand (currently S-3RD). "Partial discharge indication" deliberately left out of the copy. Brand line "available through our partnership with Megger" not used — see table row 8.

---

### 3.5 Asset Management — `/en/online-monitoring/asset-management/`

**SEO title (52):** Asset Performance Management | IPS APM | Glinker
**Meta description (151):** Asset performance management software that brings test and monitoring data together to plan maintenance and investment. In partnership with Megger.

**H1:** Asset Management

**Intro (50 words):**
A monitor reports on one asset. A fleet owner has to decide across hundreds: which unit to maintain first, which to replace, which can wait. Asset performance management software brings test results, online monitoring data and operating history into one place so that those decisions rest on condition data.

**What it does**
- Collects offline test results and online monitoring data in one structured record per asset
- Calculates a condition or health indication for each asset from that data
- Ranks assets by condition and by importance to the network
- Supports maintenance planning and longer-term investment planning

It adds no new measurement. Its value depends on the quality of the data that monitoring and testing provide.

**Where it applies**
- Transmission and distribution utilities with large transformer, switchgear, cable and line populations
- Generation companies with several plants
- Operators of large private networks: airports, industrial sites, data center campuses

**Product: IPS®APM**
IPS®APM is asset performance management software from IPS-ENERGY, offered by Megger. Per manufacturer data:
- Built on the IPS®SYSTEMS enterprise asset management platform for power utilities.
- Brings test and monitoring data into the asset record at the point of capture.
- Extends to asset investment planning through a dedicated module.

Scope, data sources and interfaces to existing systems are defined for each organisation.

**Relevant standards**
ISO 55001 sets requirements for an asset management system. It is a management standard for the organisation, not a product specification; software of this kind supports the data and decision records such a system needs.

**Related technology**
Every monitoring technology on this site can feed an asset management platform. Start with the data you already have: Partial Discharge Monitoring, Dissolved Gas Analysis (DGA) Monitoring, Cable & MV Monitoring, Distribution Transformer & Power Quality Monitoring.

**CTA:** Plan a technical meeting

NOTE: ~310 words. "What it does" replaces "what it detects" (software detects nothing). Integration list (SCADA/ERP) withheld until confirmed on megger.com.

---

## 4. Sector pages (thin; no product specs; every row links to a technology page)

### 4.1 Data Centers — `/en/online-monitoring/sectors/data-centers/`

**H1:** Online Monitoring for Data Centers

**Intro (56 words):**
A data center is designed around redundancy, but every redundant path still starts at the same medium-voltage intake and passes through transformers, switchgear and cables. A slow insulation fault in that chain is not removed by redundancy; it is only hidden by it. Monitoring shows the condition of each link while the load stays online.

| Asset | Typical risk | Monitoring technology |
|---|---|---|
| Main and step-down transformers | Insulation fault developing unnoticed under continuous high load | Partial Discharge Monitoring · Dissolved Gas Analysis (DGA) Monitoring |
| Incoming supply and main busbars | Voltage dips and harmonics from non-linear load | Distribution Transformer & Power Quality Monitoring |
| Standby generators | Stator insulation deterioration on machines that rarely run | Partial Discharge Monitoring |
| HV grid connection cable | Joint or termination failure on the single supply route | Cable & MV Monitoring |
| Whole power chain | No single view of asset condition across sites | Asset Management |

Passive infrastructure and uninterruptible power equipment are covered under Sourcing and Project Solutions.

**CTA:** Plan a technical meeting

### 4.2 Airports — `/en/online-monitoring/sectors/airports/`

**H1:** Online Monitoring for Airports

**Intro (55 words):**
An airport runs terminals, airfield lighting, baggage systems and air navigation equipment from its own substations and a private medium-voltage network. A fault in one substation can affect the whole operation, and maintenance windows are short. Continuous monitoring allows the condition of transformers, cables and supply quality to be followed without taking equipment out of service.

| Asset | Typical risk | Monitoring technology |
|---|---|---|
| Intake substation transformers | Internal fault leading to loss of the main supply | Dissolved Gas Analysis (DGA) Monitoring · Partial Discharge Monitoring |
| HV supply cables | Joint and termination failure on supply routes | Cable & MV Monitoring |
| Terminal and airfield distribution transformers | Oil ageing and moisture across many units | Distribution Transformer & Power Quality Monitoring |
| Supply to sensitive systems | Voltage dips and harmonics affecting electronic loads | Distribution Transformer & Power Quality Monitoring |

**CTA:** Plan a technical meeting

### 4.3 Distribution Utilities — `/en/online-monitoring/sectors/distribution-utilities/`

**H1:** Online Monitoring for Distribution Utilities

**Intro (52 words):**
A distribution company operates a large number of assets over a wide area and is measured on continuity and quality of supply. The practical questions are where a fault is, which assets are closest to failure, and where limited maintenance resources should go first. Each row below addresses one of those questions.

| Asset | Typical risk | Monitoring technology |
|---|---|---|
| Power transformers in primary substations | Developing internal fault; long replacement lead time | Dissolved Gas Analysis (DGA) Monitoring · Partial Discharge Monitoring |
| MV overhead feeders | Long fault-location times; broken conductors | Cable & MV Monitoring |
| HV cable circuits | Joint and termination failure | Cable & MV Monitoring |
| Distribution transformers | Oil ageing and moisture across a large population | Distribution Transformer & Power Quality Monitoring |
| Supply points and the whole fleet | Supply quality obligations; prioritising investment | Distribution Transformer & Power Quality Monitoring · Asset Management |

**CTA:** Plan a technical meeting

### 4.4 Other critical facilities (block, 54 words)

**Other critical facilities**
The same assets — transformers, rotating machines, cables and distribution networks — are found in generation plants, transmission substations, rail and transport systems, defence-industry facilities and other critical infrastructure. The monitoring technologies on this site apply to them in the same way. Start from your asset in the Online Monitoring table, or plan a technical meeting.

NOTE: Sector pages name no products and no specs, so a product change touches only the technology page and the master table. The Heathrow event and EPDK regulation context are left out of v1 copy: both need sourced wording and belong in a Knowledge Note.

---

## 5. Knowledge Notes

### 5.1 Single tag vocabulary (used for filters and for internal links)

| Group | Tags |
|---|---|
| **Asset** | Power transformer · Generator & motor · Gas-insulated switchgear · HV cable · MV network · Distribution transformer · Whole fleet |
| **Method** | Partial discharge · Dissolved gas analysis · Cable & MV monitoring · Power quality · Asset management |
| **Sector** | Data centers · Airports · Distribution utilities · Generation · Transmission · Rail & transport · Defence-industry facilities · Critical infrastructure |
| **Format** | Glinker note · Digest · Guide & standard · Podcast · News & events |

Rules: one vocabulary, fixed spelling; each card carries exactly one Format, at least one Method or Asset, Sector optional. Method tags equal the five technology page names, so each tag links to its page. No "Case study" format (owner decision: no references).

### 5.2 Starter cards

**Card 1 — Glinker note**
**Title:** Invisible Infrastructure
**Summary:** Electrical infrastructure is noticed only when it fails. This note explains why the condition of transformers, cables and switchgear stays out of sight in daily operation, and what continuous measurement makes visible.
**Tags:** Whole fleet · Asset management · Critical infrastructure · Glinker note
**Link:** Read the note

**Card 2 — Glinker note**
**Title:** Reading partial discharge and DGA together
**Summary:** Partial discharge shows the electrical condition of the insulation; dissolved gases show what is happening in the oil. This note sets out what each measurement can and cannot tell you about a power transformer, and why one does not replace the other.
**Tags:** Power transformer · Partial discharge · Dissolved gas analysis · Glinker note
**Link:** Read the note

**Card 3 — Glinker note**
**Title:** Data center reliability: the power chain
**Summary:** Redundancy protects the load, not the equipment. This note follows the power chain from grid connection to distribution board and marks where a slow-developing fault can sit behind a redundant design.
**Tags:** Power transformer · Power quality · Data centers · Glinker note
**Link:** Read the note

**Card 4 — Digest (Megger Knowledge Hub, 7 October 2025)**
**Title:** Choosing a partial discharge monitoring system
- **What it says:** Partial discharge systems fall into distinct categories, with permanent online monitoring at one end and portable or periodic measurement at the other; the choice follows from the asset type, operating requirements and the purpose of the monitoring.
- **Why it matters:** The decision is about the asset and its criticality first and the instrument second, which is a useful order for a specification.
- **Who it is for:** Maintenance and asset management teams preparing a monitoring specification.
**Tags:** Partial discharge · Power transformer · Generator & motor · Digest
**Source:** Megger — https://www.megger.com/en/knowledge-hub/partial-discharge-monitoring-systems-choosing-the-right-solution

**Card 5 — Digest (Megger, June 2026)**
**Title:** Why hydrogen and acetylene are the two gases to watch
- **What it says:** Hydrogen appears early in most developing transformer faults, while acetylene points to high-energy faults; following both online gives a warning between laboratory samples.
- **Why it matters:** It explains what a two-gas online monitor is for, and by implication what still needs a full laboratory analysis.
- **Who it is for:** Transformer engineers and substation maintenance managers.
**Tags:** Dissolved gas analysis · Power transformer · Digest
**Source:** Megger — https://www.megger.com/en/why-hydrogen-and-acetylene-monitoring-prevent-asset-failure

NOTE: Both digest URLs and titles were found through search; the articles could not be opened in full, so the summaries are deliberately general and written from the indexed excerpts. Read each article once before publishing and adjust. Alternative digest candidate with a confirmed URL: "Why Partial Discharge Monitoring is a Powerful Early Warning Tool for Critical Rotating Machines" — https://www.megger.com/en/knowledge-hub/why-partial-discharge-monitoring-is-a-powerful-early-warning-tool-for-critical-rotating-machines

---

## 6. Open items for the owner / Megger

1. Open each S-MFR URL and confirm the figure; obtain manufacturer datasheets for ICMobserver (channels, bandwidth) and TrafoStick TS G2.
2. Megger to confirm in writing: the sentence used for A. Eberle products; whether "ICMobserver G2" is a real variant name; which sensor covers underground MV cable; whether GISmonitor is in Glinker's scope.
3. Decide whether the MV overhead-line sensor stays on a page called "Cable & MV Monitoring" (kept, with the distinction explained in the intro) or the page is renamed "Cable & MV Network Monitoring".
4. Session network settings must allow megger.com, a-eberle.de, synaptec.co.uk and ips-energy.com for a full first-hand verification pass.
