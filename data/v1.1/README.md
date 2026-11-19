# HITL-IoT v1.1 — data folder

## ▶ Start here: the three data files — in [`dataset/`](dataset/)

| # | File | What it contains | Rows × columns | Size | Download |
|:-:|:--|:--|:-:|:-:|:-:|
| **1** | [`HITL-IoT_dataset_v1.1.csv`](dataset/HITL-IoT_dataset_v1.1.csv) | **The full dataset:** every flow with features, labels and oversight metadata | 127,845 × 60 | 55.1 MB | [⬇ CSV](https://github.com/abubakarwakili9/HITL-IoT-Dataset/raw/main/data/v1.1/dataset/HITL-IoT_dataset_v1.1.csv) |
| **2** | [`HITL-IoT_splits_v1.1.csv`](dataset/HITL-IoT_splits_v1.1.csv) | **Official train/validation/test assignment** (`temporal_split` is primary, `iid_split` secondary); join on `flow_id` | 127,845 × 4 | 5.8 MB | [⬇ CSV](https://github.com/abubakarwakili9/HITL-IoT-Dataset/raw/main/data/v1.1/dataset/HITL-IoT_splits_v1.1.csv) |
| **3** | [`HITL-IoT_oversight_subset_v1.1.csv`](dataset/HITL-IoT_oversight_subset_v1.1.csv) | **The 10,227 oversight-selected flows** (same 60 columns) for deferral and review experiments | 10,227 × 60 | 5.9 MB | [⬇ CSV](https://github.com/abubakarwakili9/HITL-IoT-Dataset/raw/main/data/v1.1/dataset/HITL-IoT_oversight_subset_v1.1.csv) |

Use `temporal_split` from file 2 as the primary protocol, and train IDS models only on the 39 features listed in [`HITL-IoT_feature_policy_v1.1.json`](metadata/HITL-IoT_feature_policy_v1.1.json).

## Supporting files — in [`metadata/`](metadata/) (documentation and verification)

| File | Purpose |
|:--|:--|
| `HITL-IoT_schema_v1.1.csv` / `.json` | Column definitions |
| `HITL-IoT_feature_policy_v1.1.json` | Which columns each evaluation track may use |
| `HITL-IoT_checksums_v1.1.txt` | SHA-256 of all 13 frozen files |
| `HITL-IoT_manifest_v1.1.json`, `HITL-IoT_summary_v1.1.json` | Provenance, counts and statistics |
| `HITL-IoT_config_v1.1.json`, `hitl_iot_generator_v1_1.py` | Generator and its configuration (regenerates every file byte-for-byte) |
| `HITL-IoT_generation_report_v1.1.md`, `CHANGELOG_v1.1.md` | Generation report and changes from v1.0 |
| `HITL-IoT_schema_mapping_v1.0_to_v1.1.csv` | Old → new column names |

---

## About these files

**Do not edit these canonical research files.** They contain the 127,845-record generated dataset (60 columns), 10,227 simulated oversight-profile records, fixed chronological and IID splits, generator, schema, feature policy, manifest, generation report and 13 SHA-256 hash declarations.

- `HITL-IoT_dataset_v1.1.csv`: 127,845 flow records, 108,668 benign and 19,177 attack.
- `HITL-IoT_oversight_subset_v1.1.csv`: 10,227 simulated reviewer/profile records, **not empirical annotations**.
- `HITL-IoT_splits_v1.1.csv`: predefined evaluation partitions.
- `HITL-IoT_feature_policy_v1.1.json`: primary IDS feature policy, including 39 permitted source features.
- `HITL-IoT_checksums_v1.1.txt`: 13 checksums for the original frozen files.

Run `python scripts/verify_merged_release.py` from the repository root (or `cd data/v1.1/metadata && sha256sum -c HITL-IoT_checksums_v1.1.txt` after copying the three CSVs alongside) to validate the frozen files. This check does not retrain the models or reproduce the reported result values.
