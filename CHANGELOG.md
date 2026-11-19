# HITL-IoT — Changelog

This file records changes to the HITL-IoT research dataset and benchmark. Dataset versions and manuscript revision numbers are separate. The accepted article's editorial revision v1.2 does **not** rename the frozen dataset v1.1.

## v1.1 — Release candidate (not yet published)

### Dataset and documentation

- Documented the frozen, deterministically generated smart-home dataset: **127,845 flows**, comprising **108,668 benign** and **19,177 attack** records, with **60 columns**, **5 device types**, **12 device instances** and **12 attack families**.
- Clarified the provenance of the **10,227-record oversight challenge subset**: decisions, profile confidence, latency and rationales are **generated under configurable simulation profiles**, not collected from recruited analysts.
- Added machine-readable schema, a feature-governance policy, predefined chronological and IID evaluation splits, generator configuration, generation report and SHA-256 integrity manifest to the prepared release.
- Specified **39 permitted source features** for the primary IDS evaluation (75 after categorical encoding) and excluded construction signals, oversight fields, labels and identifiers from IDS inputs.

### Benchmark and evaluation

- Documented nine model families and the chronological 70/15/15 evaluation protocol.
- Reported the validation-selected Random Forest's chronological **test Macro-F1 of 0.9688** (as presented in the accepted manuscript; this changelog is not evidence of independent retraining).
- Added reproducibility materials for probability calibration, selective prediction, oversight allocation, correction-versus-harm analysis and learning to defer.
- Documented external analyses involving CICIoT2023 and ToN-IoT, including substantial dataset shift and limited cross-dataset transfer. External datasets are not redistributed.

### Publication preparation

- Redesigned the README, corrected citation metadata and identified the associated paper accepted in *BenchCouncil Transactions on Benchmarks, Standards and Evaluations*.
- Prepared metadata and documentation for coordinated GitHub, Zenodo and Kaggle releases. A **v1.1 Zenodo DOI is not asserted until the matching record is published and verified**.
- Retained the earlier release history. Data licensing and separate code redistribution rights require final confirmation before the full public release.

### Compatibility and research limits

- The v1.1 schema, labels and oversight semantics must not be treated as interchangeable with legacy v1.0 assets; use the supplied schema mapping and version-specific checksums.
- This is a controlled generated-flow benchmark, not a packet capture from real network operations, an empirical human-analyst dataset or a regulatory certification.
- Chronological evaluation does not, by itself, demonstrate concept-drift robustness or operational deployment readiness.

## v1.0.0 — 2025-12-09 (historical release)

The original public release remains available for historical traceability: [HITL-IoT v1.0.0](https://github.com/abubakarwakili9/HITL-IoT-Dataset/releases/tag/v1.0.0).

Its original documentation used descriptions such as `human-annotated` and `expert annotations` that must not be transferred to the v1.1 simulated oversight profiles. Earlier documentation can be examined in Git history; this version note is a correction of the public research description, not a claim of new participant data.
