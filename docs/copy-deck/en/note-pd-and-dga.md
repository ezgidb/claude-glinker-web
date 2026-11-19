# NOTE 02 — READING PARTIAL DISCHARGE AND DGA TOGETHER (slug: note-pd-and-dga) — English copy deck

**SEO title:** Reading Partial Discharge and DGA Together | Glinker
**Meta description:** What partial discharge and dissolved gas monitoring each can and cannot tell you about a power transformer, and why one does not replace the other.

---

## Article header

**Breadcrumb:** Knowledge Notes / Glinker note
**Eyebrow (mono):** GLINKER NOTE 02
**H1:** Reading partial discharge and DGA together
**Standfirst:** Partial discharge shows the electrical condition of the insulation; dissolved gases show what is happening in the oil. This note sets out what each measurement can and cannot tell you about a power transformer, and why one does not replace the other.
**Tags:** Power transformer · Partial discharge · Dissolved gas analysis · Glinker note
**Byline:** Glinker Group

**In brief (3 bullets, sidebar)**
- Partial discharge is an electrical signal, seen as it happens. Dissolved gas is a chemical record, accumulated over time.
- Each misses things the other catches. Agreement between them is a strong finding; disagreement is information.
- A two-gas online monitor gives a warning. Fault-type diagnosis still needs laboratory DGA.

---

## Article body

### One insulation system, two views

The insulation of a power transformer is oil and paper, working together. When something goes wrong inside, the fault leaves two kinds of trace. One is electrical: small discharges at the point of the defect. The other is chemical: gases formed as oil and paper break down, dissolved in the oil.

Partial discharge monitoring reads the first trace. Dissolved gas monitoring reads the second. They are often discussed as alternatives. They are better understood as two views of one system, and the useful question is what each view shows that the other does not.

### What partial discharge tells you

Partial discharge is a small electrical discharge that bridges only part of the insulation. It occurs where a defect raises the local electric field beyond what the material withstands: a void, a delamination, a contaminated surface on a bushing.

Its strengths follow from being an electrical signal.

It is immediate. A discharge is seen when it happens, not hours or days later.

It is descriptive. The size of the pulses, how often they occur and where they fall on the voltage cycle form a pattern, and different kinds of defect give different patterns.

It is sensitive to defects that release very little energy. A small void can discharge for a long time before it produces a measurable amount of gas.

Its limits are equally clear. Partial discharge measurement says nothing about a fault that produces no discharge. Overheating of a connection or of the core is a thermal process; it can become serious without any discharge at all. And on site, the measurement has to be separated from electrical interference, which takes care and good signal processing.

### What dissolved gas tells you

When a fault develops inside an oil-filled transformer, the oil and paper break down and release gases that dissolve in the oil. Hydrogen is produced by most developing faults, including partial discharge and overheating, so it is a general early indicator. Acetylene is associated with arcing and very high temperatures, so even small amounts need attention. Moisture, measured alongside, reduces dielectric strength and speeds up ageing of the paper.

The strengths of gas measurement follow from being a chemical record.

It is broad. Thermal faults, discharges and arcing all leave gas. Whatever the cause, something appears in the oil.

It integrates. Gas accumulates, so a weak process that runs for weeks becomes visible in the end.

It covers the whole tank. The oil circulates past everything.

The limits follow from the same properties. Gas takes time to form, dissolve and reach the sensor, so the signal lags the event. It says that something is happening, not where. And what it can say about the type of fault depends on how many gases are measured.

That last point needs to be stated plainly. An online two-gas monitor answers the question "is something developing, and how fast?". Identifying the type of fault needs a full multi-gas analysis. Ratio-based interpretation under IEC 60599 or IEEE C57.104 works on the full set of gases from a laboratory sample. It cannot be applied to hydrogen and acetylene alone.

### Side by side

| | Partial discharge | Dissolved gas (two-gas online) |
|---|---|---|
| Kind of signal | Electrical, at the moment it occurs | Chemical, accumulated in the oil |
| Responds to | Discharge activity in the insulation | Most fault processes that decompose oil or paper |
| Speed | Immediate | Delayed |
| Says something about | The kind of defect, from the pattern | That a fault is developing, and how fast |
| Blind to | Faults without discharge, such as purely thermal ones | Very low-energy defects, until enough gas has formed |
| Needs for diagnosis | Pattern analysis; often a targeted offline test | Laboratory multi-gas DGA |

### Reading them together

With both measurements running on the same transformer, four situations are possible. Each means something.

**Both stable.** No sign of an active process in either view. This is not proof of health, but it is the best evidence available in service.

**Partial discharge rising, gas stable.** An electrical defect is active but has not yet produced measurable gas. The defect may be small, recent, or outside the main oil volume, for example at a bushing. Check for interference first. Then watch the trend closely. If it continues, hydrogen would be expected to follow.

**Gas rising, partial discharge stable.** Something is decomposing oil or paper without discharge activity at the monitored points. A thermal process is one possibility. This is the case a partial discharge monitor alone would miss. The next step is an oil sample for full laboratory DGA.

**Both rising.** Two independent methods agree that a process is active. This is the strongest finding, and it justifies prompt investigation. If acetylene is part of the rise, more so.

Note what the combination does and does not add. It adds confidence that a change is real, and it narrows the kind of process. It does not replace the confirming step. In each of the last three cases, the next action is the same: confirm with a laboratory sample or a targeted test, then decide.

### Why one does not replace the other

It is tempting to choose one method and consider the transformer covered. The table above shows why that leaves a gap. Each method is blind exactly where the other sees.

There is also a practical reason. A single alarm from a single method always raises the question of whether it is real. A second, independent measurement answers that question faster than any amount of analysis of the first.

For a power transformer the argument is stronger than for most assets. Its replacement lead time is long, so early warning has its highest value here. That is why, on the asset table on this site, the power transformer is the one row with two monitoring methods.

### In short

Partial discharge tells you about the electrical condition of the insulation, now. Dissolved gas tells you what has been happening in the oil. Neither gives a diagnosis alone, and neither gives a failure date. Read together, with laboratory analysis behind them, they turn a hidden process into a decision that can be made in time.

---

## Article footer

**Related on this site:**
- Partial Discharge Monitoring →
- Dissolved Gas Analysis (DGA) Monitoring →
- Digest: Why hydrogen and acetylene are the two gases to watch →

**Footer note (small):** This note is general engineering explanation. The four cases are a way of thinking, not a diagnostic procedure. Diagnosis belongs to qualified engineers with the full data for the unit.

**CTA block**
**Headline:** Ask about transformer monitoring.
**CTA:** Plan a technical meeting
