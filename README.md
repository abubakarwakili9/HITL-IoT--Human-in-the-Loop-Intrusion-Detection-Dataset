# HITL-IoT v1.1 — reproducible IoT cybersecurity benchmark

**Status:** MERGED RELEASE CANDIDATE, prepared 18 November 2026. **Not yet published as a verified v1.1 GitHub/Zenodo/Kaggle release.** See `governance/RELEASE_GATE.md` before using these materials for a public deposit.

## What this is

HITL-IoT provides a **deterministically generated**, controlled smart-home IoT flow benchmark for investigating intrusion detection, probability calibration, selective prediction, oversight allocation and learning to defer. The evaluation protocol separates predictive inputs from construction variables and oversight metadata.

**Critical provenance:** Neither the flows nor the oversight records were captured from real analysts. The 10,227-record challenge subset contains configurable **simulated oversight-profile** decisions, confidence, latency and generated rationales. Do not describe these as measured analyst expertise, expert annotations, human-annotated traffic or deployment-ready regulatory validation.

## Frozen dataset (v1.1; seed 42)

| Property | Frozen source |
| --- | ---: |
| Smart-home flows | 127,845 |
| Benign / attack | 108,668 / 19,177 |
| Dataset columns | 60 |
| IoT types / instances | 5 / 12 |
| Attack families | 12 |
| Generated oversight subset | 10,227 |
| Primary Track 1 permitted source features | 39 |
| Context-enriched Track 1 features | 40 |
| Chronological train / validation / test | 89,492 / 19,176 / 19,177 |

The validation-selected Random Forest reports chronological **test Macro-F1 0.9688**, MCC 0.9395, AUROC 0.9690 in the supplied Table 7. These are **reported benchmark results**, not newly re-executed results from this packaging step.

## Contents

- `frozen_release_v1.1/`: ORIGINAL unchanged byte-for-byte source files, including complete CSV data, oversight subset, generator, config, schemas, splits, feature policy, manifest and SHA-256 checksums.
- `notebooks/`: original executed/clean analyses (02–05) and our separate beginner-friendly quickstart; execution of notebooks 02–05 not independently repeated for this release build.
- `results_archives/`: author-supplied analysis, Track 1 (including baseline probability files and benchmark scorer), oversight, and external validation archives. Raw CICIoT2023 and ToN-IoT datasets are **not** redistributed.
- `kaggle/`: corrected Kaggle description and dataset metadata for the **existing dataset listing**.
- `zenodo/`: publication guidance and draft metadata for the **existing Zenodo version chain, if verified**.
- `governance/`: release gates, provenance, historical claims and software licensing notes.
- `tools/`: local verification and original release checks.

**Trained model binaries** are provided separately as `HITL-IoT_v1.1_Track1_Trained_Models_RC.zip`; see `MODEL_ARCHIVE_SHA256.txt`. Python pickle/joblib files are executable deserialization formats: load only in an isolated, trusted environment and never directly from untrusted sources.

## Reproduce the integrity check

```bash
python tools/verify_merged_release.py
```

Do **not** use generator scores, labels, the constructed ambiguity measure, simulated oversight responses, addresses or identifiers as predictors in the primary IDS evaluation. Read `frozen_release_v1.1/HITL-IoT_feature_policy_v1.1.json` for the exact 39 primary features. Use the distributed split file: the manuscript's principal result uses the chronological split, **not** a random resplit.

## Citation and licensing

This repository's machine-readable `CITATION.cff` intentionally does **not** contain a guessed DOI or future release date. Cite the eventual **version-specific Zenodo DOI** alongside the final article DOI once assigned and published; until then, cite the identified project and version as an unpublished release candidate if you need to refer to this draft. See `CITATION_GUIDE.md`.

The **dataset** is described under CC BY 4.0 in the existing public release. A separate MIT license for source code **has not been verified or granted in this candidate**; see `governance/LICENSING.md`. Do not claim an MIT license until rights-holders approve and publish an actual `LICENSE-CODE` file.

## Publication and version provenance

- Accepted TBench manuscript: *HITL-IoT: A Reproducible Dataset and Benchmark for Studying Trustworthy Human–AI Collaboration, Oversight Mechanisms, and Selective Deferral in IoT Cybersecurity*. Manuscript revision **v1.2** and frozen **dataset v1.1** are different version axes.
- GitHub project: https://github.com/abubakarwakili9/HITL-IoT--Human-in-the-Loop-Intrusion-Detection-Dataset
- Kaggle existing page: https://www.kaggle.com/datasets/abubakarwakili/hitl-iot-human-in-the-loop-iot-ids-dataset
- Zenodo: version-specific DOI pending independent verification/publication. The historical GitHub README mentioned `10.5281/zenodo.17862333` and `.17862334`; their meaning and live deposit contents were not verified in this build. No DOI is asserted for v1.1.

External validation with CICIoT2023 and ToN-IoT identifies domain-shift limitations; simulated performance is not evidence of reliable real-world cross-dataset transfer. See the accepted manuscript for detailed protocol and cautions.

## Maintainers, corrections and reproduction

Corresponding author: Abubakar Wakili. Contributions and affiliations require coauthor sign-off before public publication. Please use GitHub issues to report data, licensing, feature-policy, or reproducibility defects after release.
