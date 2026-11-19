# HITL-IoT v1.1 — Frozen dataset

**Do not edit these canonical research files.** They contain the 127,845-record generated dataset (60 columns), 10,227 simulated oversight-profile records, fixed chronological and IID splits, generator, schema, feature policy, manifest, generation report and 13 SHA-256 hash declarations.

- `HITL-IoT_dataset_v1.1.csv`: 127,845 flow records, 108,668 benign and 19,177 attack.
- `HITL-IoT_oversight_subset_v1.1.csv`: 10,227 simulated reviewer/profile records, **not empirical annotations**.
- `HITL-IoT_splits_v1.1.csv`: predefined evaluation partitions.
- `HITL-IoT_feature_policy_v1.1.json`: primary IDS feature policy, including 39 permitted source features.
- `HITL-IoT_checksums_v1.1.txt`: 13 checksums for the original frozen files.

Run `python scripts/verify_merged_release.py` from the repository root to validate the frozen files. This check does not retrain the models or reproduce the reported result values.
