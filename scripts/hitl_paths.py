"""Where the HITL-IoT v1.1 files live.

data/v1.1/dataset/   the three data files (dataset, oversight subset, splits)
data/v1.1/metadata/  schema, feature policy, checksums, manifest, generator, ...

`locate(name)` also accepts a flat folder (e.g. an extracted release_v1.1/ or a
Kaggle download) passed as `base`, so the same scripts work on either layout.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
V11 = ROOT / "data" / "v1.1"
DATASET_DIR = V11 / "dataset"
METADATA_DIR = V11 / "metadata"
DATA_FILES = ("HITL-IoT_dataset_v1.1.csv", "HITL-IoT_oversight_subset_v1.1.csv", "HITL-IoT_splits_v1.1.csv")


def locate(name: str, base: Path = V11) -> Path:
    """Return the path of a frozen v1.1 file by name."""
    base = Path(base)
    for candidate in (base / "dataset" / name, base / "metadata" / name, base / name):
        if candidate.exists():
            return candidate
    return base / ("dataset" if name in DATA_FILES else "metadata") / name
