# Contributing to HITL-IoT

Thank you for using HITL-IoT. Useful contributions include:

- **Benchmark results.** Score your predictions with `benchmark/score_track1_submission.py` and open an issue using the *Benchmark result* template. Accepted results are added to the README table with a link to your paper or code.
- **Reproducibility reports.** If a checksum, count or notebook does not match the documentation, open a *Data or reproducibility problem* issue with the exact command and output.
- **Documentation and code fixes.** Pull requests are welcome. Do not modify files in `data/v1.1/`: they are frozen and their SHA-256 digests are published. Any data change would become a new version (v1.2), with a new Zenodo DOI and changelog entry.

When describing HITL-IoT in your work, please keep its provenance accurate: the flows are generated, and the oversight records are produced by simulated review profiles, not human analysts. Please cite both the article and the dataset version you used (see `CITATION.cff`).
