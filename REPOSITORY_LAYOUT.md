# Repository layout — HITL-IoT v1.1

| Path | In Git? | Contents |
|:--|:--|:--|
| `data/v1.1/` | yes | 10 frozen metadata files + generator + `HITL-IoT_checksums_v1.1.txt` (byte-exact; `.gitattributes` disables line-ending conversion) |
| `data/v1.1/HITL-IoT_{dataset,oversight_subset,splits}_v1.1.csv` | no (release assets) | Fetched by `scripts/download_release_assets.py` |
| `results/intrusion_detection/Table7_…csv` | yes | Main benchmark table |
| `results/*/*.zip` (4 archives) | no (release assets) | `download_release_assets.py --results` |
| `notebooks/` | yes | 01–05 |
| `benchmark/` | yes | Scorer kit |
| `scripts/` | yes | Download and verification |
| `docs/` | yes | GitHub Pages site |
| `legacy/v1.0/` | yes | Superseded v1.0 files (formerly `Code/`, `benchmark_results/`, `data/Dataset/`) |

## Migration from earlier paths

| Earlier path | Current path |
|:--|:--|
| `frozen_release_v1.1/` | `data/v1.1/` |
| `tools/` | `scripts/` |
| `results_archives/analysis_v1.1.zip` | `results/dataset_characterization/` |
| `results_archives/track1_benchmark_v1.1_review_revision.zip` | `results/intrusion_detection/` |
| `results_archives/step7_…_v1.1.zip` | `results/oversight_and_deferral/` |
| `results_archives/step8_external_validation_v1.1.zip` | `results/external_validation/` |
| `Code/`, `benchmark_results/`, `data/Dataset/` (v1.0) | `legacy/v1.0/notebooks/`, `legacy/v1.0/benchmark_results/`, `legacy/v1.0/data/` |

No dataset or result artifact was altered by these moves; every SHA-256 digest is unchanged.
