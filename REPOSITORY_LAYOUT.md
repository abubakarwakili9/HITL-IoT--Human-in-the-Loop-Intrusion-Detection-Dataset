# Repository structure and migration map — HITL-IoT v1.1

The folder names were standardized for research discoverability following common dataset-repository conventions: versioned `data/`, runnable `notebooks/`, independent `scripts/`, and task-organized `results/`.

| Earlier upload folder | Updated location | Why |
|:--|:--|:--|
| `frozen_release_v1.1/` | `data/v1.1/` | Preserves the 14 frozen files and 13 original hashes under a versioned data directory |
| `tools/` | `scripts/` | Makes verification scripts easier to discover |
| `results_archives/` | `results/` | Categorizes experiments by objective |
| `results_archives/analysis_v1.1.zip` | `results/dataset_characterization/analysis_v1.1.zip` | Descriptive analyses |
| `results_archives/track1_benchmark_v1.1_review_revision.zip` | `results/intrusion_detection/track1_benchmark_v1.1_review_revision.zip` | IDS baselines |
| `results_archives/Table7_Track1_Temporal_All9_Baselines.csv` | `results/intrusion_detection/Table7_Track1_Temporal_All9_Baselines.csv` | Directly browsable main-results table |
| `results_archives/step7_selective_deferral_calibration_oversight_v1.1.zip` | `results/oversight_and_deferral/step7_selective_deferral_calibration_oversight_v1.1.zip` | Oversight evaluation |
| `results_archives/step8_external_validation_v1.1.zip` | `results/external_validation/step8_external_validation_v1.1.zip` | External evaluation |
| `notebooks/` | `notebooks/` | Standard and already appropriate |

**No original dataset or results artifact was altered**: their SHA-256 hashes remain unchanged. This restructuring changes directory paths and minimal notebook setup configuration only.

The existing GitHub repository has the earlier `Code/`, `benchmark_results/`, `data/Dataset/` and `docs/` directories. Those are historical and should be preserved until an explicit, reviewed migration; this archive does **not** delete or rename them remotely. The GitHub Pages site under `docs/` still requires a separate update because its old descriptions may conflict with the accepted manuscript.

**Upload guidance:** For a normal GitHub commit, the **source-only** ZIP omits bulky CSV and result ZIPs. Publish the complete ZIP as GitHub Release and Zenodo assets; the complete CSV exceeds GitHub's 50 MiB normal-Git warning threshold. The source-only ZIP and full ZIP have matching metadata and relative paths for available files.

**Scientific limitations:** The dataset is deterministically generated, the oversight records are simulated, external capture datasets are not redistributed, and model experiments were not independently rerun during this folder reorganization.

**Verification:** `python scripts/verify_merged_release.py` requires the full ZIP's `data/v1.1/`; `python scripts/verify_results.py` requires all four results ZIPs.
