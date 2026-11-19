# HITL-IoT v1.1 notebooks

| Notebook | Purpose |
|:--|:--|
| `01_Quickstart_Kaggle.ipynb` | Beginner-friendly quickstart for local `data/v1.1/` or a Kaggle dataset attachment |
| `02_Descriptive_Analysis.ipynb` | Dataset characterisation behind Tables 2–6 and Figures 3–6; **executed**, so outputs display on GitHub. Uses only pandas/NumPy/SciPy/Matplotlib |
| `03_Track1_IDS_Benchmark_CLEAN.ipynb` | Nine-model leakage-safe intrusion-detection protocol; setup path points at `data/v1.1/` |
| `04_Selective_Deferral_CLEAN.ipynb` | Calibration, oversight and learned deferral. Requires extracted Step-6 results/model binaries; points at `data/v1.1/` when present |
| `05_External_Validation_CLEAN.ipynb` | External CICIoT2023 and ToN-IoT comparisons, with source datasets obtained separately |

The dataset CSVs and result archives are included in the repository, so the notebooks run after cloning. Notebook 04 also needs the trained-model package from Zenodo; notebook 05 needs CICIoT2023 and ToN-IoT from their providers.

The 03–05 notebooks contain original experiment code. **Only data-discovery/setup paths were updated** to accommodate this repository layout; no algorithms or reported metrics were changed. Run them from the repository root and consult the result ZIPs and trained-model package for required artifacts. Some notebooks have large dependencies, and a full rerun has not been performed as part of packaging.
