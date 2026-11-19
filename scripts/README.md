# Verification scripts

Run from the repository root, with Python installed:

```bash
python scripts/verify_merged_release.py
python scripts/validate_original_release.py
python scripts/quickstart_release_check.py
python scripts/verify_results.py
```

The quickstart script uses pandas. The other scripts use the Python standard library. These tests verify data hashes, labels, splits, feature policy and result-archive hashes, not the full scientific experiment replication.
