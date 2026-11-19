# Experimental results — HITL-IoT v1.1

The four result archives are published as **GitHub Release assets** (tag `v1.1`) and on Zenodo, unchanged byte for byte. Only `intrusion_detection/Table7_Track1_Temporal_All9_Baselines.csv` is stored in Git. Run `python scripts/download_release_assets.py --results` to place each archive in the folder listed below. The folder organization does not constitute independent scientific re-execution. The source CSV dataset and fixed evaluation splits are in [`../data/v1.1/`](../data/v1.1/).

| Directory | Included evidence |
|:--|:--|
| `dataset_characterization/` | Descriptive analysis and dataset characterization |
| [`intrusion_detection/`](intrusion_detection/) | Nine-model Track 1 results, scored predictions and Table 7 |
| `oversight_and_deferral/` | Calibration, review allocation, deferral and intervention analysis |
| `external_validation/` | Independent-domain analyses with CICIoT2023 and ToN-IoT |

The source datasets CICIoT2023 and ToN-IoT are not redistributed. Each ZIP must be extracted separately for detailed inspection; some analysis notebooks require associated trained models or the original provider datasets.

For SHA-256 verification of the five result artifacts, see [`RESULTS_SHA256.json`](RESULTS_SHA256.json) or run `python scripts/verify_results.py` from the repository root.

The oversight-profile outcomes are **generated simulation parameters**, not observations of actual cybersecurity analysts.
