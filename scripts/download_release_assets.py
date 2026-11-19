#!/usr/bin/env python3
"""Download the HITL-IoT v1.1 release assets and verify their SHA-256 digests.

Run from the repository root (standard library only):

    python scripts/download_release_assets.py            # data CSVs only (~70 MB)
    python scripts/download_release_assets.py --results  # data CSVs + four result archives

The large files are published as GitHub Release assets (tag v1.1) rather than
committed to Git history. Each file is placed where the notebooks and
verification scripts expect it, and is checked against RELEASE_ASSETS_v1.1.sha256.
"""
from __future__ import annotations

import argparse
import hashlib
import sys
import urllib.request
from pathlib import Path

REPO = "abubakarwakili9/HITL-IoT--Human-in-the-Loop-Intrusion-Detection-Dataset"
TAG = "v1.1"
ROOT = Path(__file__).resolve().parents[1]

DESTINATIONS = {
    "HITL-IoT_dataset_v1.1.csv": "data/v1.1",
    "HITL-IoT_oversight_subset_v1.1.csv": "data/v1.1",
    "HITL-IoT_splits_v1.1.csv": "data/v1.1",
    "analysis_v1.1.zip": "results/dataset_characterization",
    "track1_benchmark_v1.1_review_revision.zip": "results/intrusion_detection",
    "step7_selective_deferral_calibration_oversight_v1.1.zip": "results/oversight_and_deferral",
    "step8_external_validation_v1.1.zip": "results/external_validation",
}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--results", action="store_true", help="also download the four result archives")
    ap.add_argument("--force", action="store_true", help="re-download files that already verify")
    args = ap.parse_args()

    manifest = {}
    for line in (ROOT / "RELEASE_ASSETS_v1.1.sha256").read_text().splitlines():
        if line.strip():
            digest, name = line.split(maxsplit=1)
            manifest[name.strip().lstrip("*")] = digest.lower()

    wanted = [n for n in DESTINATIONS if args.results or n.endswith(".csv")]
    failures = 0
    for name in wanted:
        dest = ROOT / DESTINATIONS[name] / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        if dest.is_file() and not args.force and sha256(dest) == manifest[name]:
            print(f"OK (cached)  {dest.relative_to(ROOT)}")
            continue
        url = f"https://github.com/{REPO}/releases/download/{TAG}/{name}"
        print(f"Downloading  {name} ...", flush=True)
        tmp = dest.with_suffix(dest.suffix + ".part")
        try:
            urllib.request.urlretrieve(url, tmp)
        except Exception as exc:  # network errors, 404 before the release is published
            print(f"FAILED       {name}: {exc}\n             Download it manually from {url}")
            tmp.unlink(missing_ok=True)
            failures += 1
            continue
        if sha256(tmp) != manifest[name]:
            print(f"FAILED       {name}: SHA-256 mismatch; file discarded")
            tmp.unlink()
            failures += 1
            continue
        tmp.replace(dest)
        print(f"OK           {dest.relative_to(ROOT)}")

    if failures:
        print(f"\n{failures} file(s) could not be fetched or verified.")
        return 1
    print("\nAll requested assets verified. Next: python scripts/verify_merged_release.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
