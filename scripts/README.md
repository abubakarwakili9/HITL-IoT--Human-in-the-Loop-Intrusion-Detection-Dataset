# Verification scripts

Run from the repository root, with Python installed:

```bash
python scripts/check_repository.py                    # fast: in-Git frozen files, notebooks, feature policy
python scripts/download_release_assets.py --results   # fetch + SHA-256-verify the 7 release assets
python scripts/verify_merged_release.py
python scripts/validate_original_release.py
python scripts/quickstart_release_check.py
python scripts/verify_results.py
```

`download_release_assets.py` uses only the standard library. The quickstart script uses pandas. The other scripts use the Python standard library. These tests verify data hashes, labels, splits, feature policy and result-archive hashes, not the full scientific experiment replication.


The same checks run automatically in GitHub Actions (`.github/workflows/integrity.yml`): the fast checks on every push and pull request, and the full download-and-verify job whenever a release is published.
