# HITL-IoT v1.1 Track-1 benchmark kit

Use this kit to report results that are directly comparable with Table 7 of the paper.

| File | Purpose |
|---|---|
| `track1_benchmark_protocol.json` | Frozen protocol: dataset hash, split, 39 permitted features, metrics |
| `submission_template_temporal_test.csv` | One row per chronological test flow (`flow_id`, `y_probability_attack`) |
| `score_track1_submission.py` | Official scorer (Accuracy, Balanced accuracy, Precision, Recall, F1, Macro-F1, MCC, AUROC, FPR, FNR) |
| `requirements_track1_frozen.txt` | Exact package versions used for the reported baselines |

## Rules

1. Train on `temporal_split == "train"`; tune only on `"validation"`; score `"test"` once.
2. Use only the `track1_primary_flow_only` features (39). Construction signals (`generated_attack_score`, `generated_prediction`, `ambiguity_score`), oversight-profile fields, labels and identifiers are not allowed.
3. Fit every preprocessing step on the training partition only.

## Score a submission

```bash
python scripts/download_release_assets.py          # fetch the data once
python benchmark/score_track1_submission.py my_temporal_test_predictions.csv
```

Check: scoring the released Random Forest probabilities (`track1_benchmark_v1.1_review_revision.zip` → `probabilities/temporal_test_probabilities_all9.csv`) gives Macro-F1 0.9688, MCC 0.9395 and AUROC 0.9690, the same as Table 7.

To add your method to the results table in the README, open an issue with the **Benchmark result** template and attach your submission file.
