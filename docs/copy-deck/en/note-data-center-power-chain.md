# NOTE 03 — DATA CENTER RELIABILITY: THE POWER CHAIN (slug: note-data-center-power-chain) — English copy deck

**SEO title:** Data Center Reliability: The Power Chain | Glinker
**Meta description:** Redundancy protects the load, not the equipment. A walk along the data center power chain, and where a slow fault can sit behind a redundant design.

---

## Article header

**Breadcrumb:** Knowledge Notes / Glinker note
**Eyebrow (mono):** GLINKER NOTE 03
**H1:** Data center reliability: the power chain
**Standfirst:** Redundancy protects the load, not the equipment. This note follows the power chain from grid connection to distribution board and marks where a slow-developing fault can sit behind a redundant design.
**Tags:** Power transformer · Power quality · Data centers · Glinker note
**Byline:** Glinker Group

**In brief (3 bullets, sidebar)**
- Redundancy answers the question "what if one path is lost?". It does not answer "what condition is the other path in?".
- Every redundant path still passes through transformers, switchgear and cables that age out of sight.
- Monitoring shows the condition of each link while the load stays online.

---

## Article body

### What redundancy is for

A data center is designed around redundancy. Two supplies, two transformers, two distribution paths, standby generation, uninterruptible power between them. The principle is sound: if one element is lost, another carries the load.

Redundancy is a statement about the load. It says the servers stay on when a component fails. It is not a statement about the components. It says nothing about the condition of the transformer that is now carrying everything, or about why the first one failed.

That gap is the subject of this note. Redundancy protects the load, not the equipment. And a slow insulation fault in the power chain is not removed by redundancy; it is only hidden by it.

### How a fault hides behind a redundant design

Three mechanisms are at work.

**Nothing forces the question.** In a single-path installation, any weakness shows itself quickly as an interruption. In a redundant one, the system tolerates a great deal before anyone is disturbed. That tolerance is the purpose of the design. It also means there is no operational signal that a component is deteriorating.

**The paths are alike.** Redundant transformers are usually of the same design and age, installed at the same time, in the same environment, under similar load. Whatever ages one is ageing the other. Redundancy assumes failures are independent. Common conditions make them less so.

**Failover is the hardest moment.** When one path is lost, the remaining one takes the full load at once. An asset that was comfortable at part load is now at its highest stress, at the moment when there is no further reserve. If its condition is unknown, this is when it is found out.

None of this is an argument against redundancy. It is an argument for knowing the condition of what the redundancy consists of.

### Walking the chain

Follow the power from the grid connection to the distribution board. At each link, ask what could develop unseen.

**The grid connection cable.** Many sites have a single high-voltage route to the network, or two routes that share a trench for part of the way. The cable itself is factory-made; its joints and terminations are assembled on site and are the usual weak points. A joint in difficulty tends to show it in temperature and in screen current before it fails. These can be measured continuously at the joints and terminations.

**Main and step-down transformers.** These run under continuous high load, and there is rarely a convenient moment to take one out for testing. An insulation fault can develop unnoticed, because the output voltage does not change. Two measurements are made in service. Partial discharge shows electrical activity in the insulation. Dissolved gas and moisture show what is happening in the oil. On an oil-filled power transformer the two are read together. An online two-gas monitor gives a warning between laboratory samples; it does not replace them.

**The incoming supply and main busbars.** Here the concern is not the condition of an asset but the quality of the voltage. A data center's load is largely power electronics, which is non-linear: it draws distorted current and raises harmonic levels. From the other direction, faults elsewhere on the network arrive as voltage dips. A Class A power quality analyser at the intake and the main busbars records dips, harmonics, flicker and unbalance with the waveform of each event. This is also the record that shows whether a disturbance came from the grid or from the site.

**Standby generators.** A generator that rarely runs is easy to assume healthy. But stator winding insulation ages with time, moisture, contamination and temperature cycles, not only with running hours. Routine starts prove that the engine starts. They say little about the state of the winding insulation. Partial discharge measurement on the stator does. In rotating machines some partial discharge is always present in normal operation, so the trend matters, not the single reading.

**Distribution towards the halls.** Further down, the chain divides into many smaller transformers and boards. Here the logic changes from depth to breadth: more units, each of lower individual importance, and measurement chosen accordingly.

**The uninterruptible power equipment** sits in this chain as well. It bridges interruptions and conditions the supply to the load. It does not change the condition of anything upstream of it, and everything it does depends on the upstream chain returning.

### The view across the chain

Each of these measurements describes one link. An operator, particularly one with several sites, needs the view across all of them: which transformer first, which site next, where the budget goes this year.

The typical difficulty is that there is no single view of asset condition across sites. Test reports, oil results and monitoring data sit in separate systems. Asset performance management software brings them into one record per asset and ranks them by condition and importance. It adds no new measurement. It makes the existing ones usable together.

### What monitoring does not change

Some limits should be stated.

Monitoring does not make a failure impossible. Some failures are sudden, and no method sees every failure mode.

It does not replace redundancy. A monitored single path is still a single path.

It does not replace testing. An alarm is normally followed by a laboratory sample or a targeted test at a planned outage.

What it changes is the state of knowledge. Without it, a redundant design gives confidence in the load and no information about the equipment. With it, the condition of each link is followed while the load stays online, and maintenance is planned at a time of the operator's choosing instead of during a failover.

### A question for a design review

Reliability reviews usually ask: what happens if this component fails? It is a necessary question, and redundancy is the answer to it.

A second question is worth adding: how would we know that this component is on its way to failing? Where the honest answer is "we would not", the redundancy behind it is being relied on blind.

---

## Article footer

**Related on this site:**
- Online Monitoring for Data Centers →
- Partial Discharge Monitoring → · DGA Monitoring → · Distribution Transformer & Power Quality Monitoring →
- Supply & Project Solutions: data center power (passive infrastructure, racks, PDU, UPS, ATS/STS) →

**Footer note (small):** This note is general engineering explanation. It describes a generic power chain, not a specific facility or design standard.

**CTA block**
**Headline:** Discuss your data center.
**CTA:** Plan a technical meeting
