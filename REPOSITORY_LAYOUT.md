# Repository layout — HITL-IoT v1.1

| Path | In Git? | Contents |
|:--|:--|:--|
| `data/v1.1/dataset/` | yes | The three data files: dataset, oversight subset, splits (byte-exact) |
| `data/v1.1/metadata/` | yes | Schema, feature policy, config, manifest, summary, generation report, changelog, v1.0→v1.1 mapping, generator and `HITL-IoT_checksums_v1.1.txt` (byte-exact; `.gitattributes` disables line-ending conversion) |
| `results/intrusion_detection/Table7_…csv` | yes | Main benchmark table |
| `results/*/*.zip` (4 archives) | yes | Result archives (byte-exact) |
| Trained-model package (128.6 MB) | no | Above GitHub's 100 MB file limit; on Zenodo |
| `notebooks/` | yes | 01–05 |
| `benchmark/` | yes | Scorer kit |
| `scripts/` | yes | Download and verification |
| `docs/` | yes | GitHub Pages site |
| `legacy/v1.0/` | yes | Superseded v1.0 files (formerly `Code/`, `benchmark_results/`, `data/Dataset/`) |

## Migration from earlier paths

| Earlier path | Current path |
|:--|:--|
| `frozen_release_v1.1/` | `data/v1.1/dataset/` (CSVs) and `data/v1.1/metadata/` (everything else) |
| `tools/` | `scripts/` |
| `results_archives/analysis_v1.1.zip` | `results/dataset_characterization/` |
| `results_archives/track1_benchmark_v1.1_review_revision.zip` | `results/intrusion_detection/` |
| `results_archives/step7_…_v1.1.zip` | `results/oversight_and_deferral/` |
| `results_archives/step8_external_validation_v1.1.zip` | `results/external_validation/` |
| `Code/`, `benchmark_results/`, `data/Dataset/` (v1.0) | `legacy/v1.0/notebooks/`, `legacy/v1.0/benchmark_results/`, `legacy/v1.0/data/` |

The frozen release was split into `dataset/` and `metadata/` subfolders for readability; the checksum file lists bare file names, and `scripts/hitl_paths.py` resolves them in either layout. No dataset or result artifact was altered by these moves; every SHA-256 digest is unchanged.
