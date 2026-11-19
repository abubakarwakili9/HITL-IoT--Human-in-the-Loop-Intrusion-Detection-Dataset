# HITL-IoT v1.1 — Dataset and reproducible cybersecurity benchmark

**Release title:** HITL-IoT Dataset v1.1 — Reproducible IoT Cybersecurity Benchmark  
**GitHub release tag:** `v1.1`  
**Release target:** `main`  
**Associated paper:** Accepted in *BenchCouncil Transactions on Benchmarks, Standards and Evaluations* (TBench); final article DOI and bibliographic details pending.

HITL-IoT v1.1 provides a controlled, deterministically generated smart-home IoT intrusion-detection benchmark for studying **predictive performance, probability calibration, uncertainty-aware review, simulated human–AI oversight, selective prediction and learning to defer**.

## Dataset at a glance

| Property | v1.1 |
|---|---:|
| Generated network flows | 127,845 |
| Benign / attack flows | 108,668 / 19,177 |
| Columns | 60 |
| Primary permitted IDS source features | 39 |
| IoT device types / instances | 5 / 12 |
| Attack families | 12 |
| Simulated oversight challenge records | 10,227 |
| Chronological train / validation / test | 89,492 / 19,176 / 19,177 |

**Provenance:** Flows are synthetically generated, not packet captures from a live operational network. The oversight decisions, rationales, confidence and latency are **simulated profile outputs**; these data do **not** represent decisions collected from cybersecurity professionals or empirical estimates of analyst expertise.

## Files

The dataset CSVs and result archives are stored in the repository at this tag, so the source-code archive of this release already contains them (byte-exact). They may also be attached individually below. `python scripts/download_release_assets.py --results` fetches and verifies each one.

### Data (CSV)

1. `HITL-IoT_dataset_v1.1.csv` — complete network-flow dataset
2. `HITL-IoT_oversight_subset_v1.1.csv` — simulated reviewer-profile subset
3. `HITL-IoT_splits_v1.1.csv` — frozen temporal and IID partition assignments

### Experimental evidence (ZIP)

4. `analysis_v1.1.zip` — dataset characterization and descriptive analyses
5. `track1_benchmark_v1.1_review_revision.zip` — nine-model IDS experiments, probabilities and scoring evidence
6. `step7_selective_deferral_calibration_oversight_v1.1.zip` — calibration, simulated oversight, workload and selective-deferral experiments
7. `step8_external_validation_v1.1.zip` — external evaluation using CICIoT2023 and ToN-IoT (third-party raw datasets are not redistributed)

## Reproduce and verify

The repository contains the `data/v1.1/` metadata and the deterministic generator, five notebooks (01–05) under `notebooks/`, the official scorer kit under `benchmark/`, download and validation scripts under `scripts/`, and the Table 7 summary under `results/intrusion_detection/`. The quickest way to get every asset into the right place is `python scripts/download_release_assets.py --results`, which also verifies each SHA-256 digest.

Download all seven release files into one folder. Check each file against the official [SHA-256 release manifest](RELEASE_ASSETS_v1.1.sha256) before using it. On Windows PowerShell, run `Get-FileHash -Algorithm SHA256 .\HITL-IoT_dataset_v1.1.csv` and compare the result with the manifest; on Linux/macOS run `sha256sum -c RELEASE_ASSETS_v1.1.sha256` in the download directory with the manifest saved there.

For comparable IDS experiments, use the published partition assignments and 39 permitted primary features; do not train on construction scores, oversight outputs, labels or identifiers.

The accepted manuscript reports a chronological test Macro-F1 of **0.9688** for its validation-selected Random Forest model. Those results are manuscript-reported and have **not** been independently reproduced merely by archiving the files.

## Publication and reuse

**Associated research article:** Wakili, A., Idris, M., and Bakkali, S. *HITL-IoT: A Reproducible Dataset and Benchmark for Studying Trustworthy Human–AI Collaboration, Oversight Mechanisms, and Selective Deferral in IoT Cybersecurity.* Accepted in *BenchCouncil Transactions on Benchmarks, Standards and Evaluations* (TBench); final publication details pending.

Cite both the peer-reviewed article and the **specific v1.1 dataset release** once the version-specific Zenodo DOI is published and verified. Data licensing is identified as **CC BY 4.0** in the existing repository; source-code redistribution rights and any third-party artifacts are governed separately.

This dataset is intended for controlled benchmarking. It does not establish real analyst performance, operational generalization, legal compliance certification or deployment fitness.

## Maintainer release checklist

The full public GitHub Release must not be marked complete until:

- [ ] Tag `v1.1` is created from the reviewed `main` commit
- [ ] All seven files above are individually attached to the release
- [ ] Every file's SHA-256 digest matches `RELEASE_ASSETS_v1.1.sha256`
- [ ] The public release page, download links, README and GitHub Pages agree on provenance and version
- [ ] A matching Zenodo version is published; only then is its verified version DOI linked
- [ ] Kaggle is updated with the same frozen v1.1 data and corrected documentation

The v1.0.0 release is preserved for research traceability.
