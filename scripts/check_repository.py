#!/usr/bin/env python3
"""Fast repository checks that need no large downloads (standard library only).

- SHA-256 of every frozen v1.1 file stored in Git (the three large CSVs are release
  assets and are checked by verify_merged_release.py after download)
- notebooks are valid JSON
- feature policy lists 39 primary features and excludes construction/oversight fields
"""
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from hitl_paths import locate  # noqa: E402
DATA = ROOT / "data" / "v1.1"
RELEASE_ASSETS = {"HITL-IoT_dataset_v1.1.csv", "HITL-IoT_oversight_subset_v1.1.csv", "HITL-IoT_splits_v1.1.csv"}

errors = []
checked = 0
for line in locate("HITL-IoT_checksums_v1.1.txt").read_text().splitlines():
    if not line.strip():
        continue
    digest, name = line.split(maxsplit=1)
    name = name.strip().lstrip("*")
    path = locate(name)
    if name in RELEASE_ASSETS and not path.exists():
        continue
    if not path.is_file():
        errors.append(f"missing frozen file: {name}")
        continue
    if hashlib.sha256(path.read_bytes()).hexdigest() != digest.lower():
        errors.append(f"SHA-256 mismatch: {name} (line endings changed? see .gitattributes)")
    checked += 1

for nb in sorted((ROOT / "notebooks").glob("*.ipynb")):
    try:
        json.loads(nb.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"invalid notebook JSON: {nb.name}: {exc}")

policy = json.loads(locate("HITL-IoT_feature_policy_v1.1.json").read_text())
primary = policy["track1_primary_flow_only"]
forbidden = {"is_attack", "attack_type", "generated_attack_score", "generated_prediction", "ambiguity_score",
             "oversight_selected", "oversight_profile", "profile_decision", "profile_confidence", "flow_id", "timestamp"}
if len(primary) != 39:
    errors.append(f"expected 39 primary features, found {len(primary)}")
if forbidden & set(primary):
    errors.append(f"forbidden fields in primary feature policy: {sorted(forbidden & set(primary))}")

if errors:
    print("FAIL\n  " + "\n  ".join(errors))
    sys.exit(1)
print(f"PASS: {checked} in-repository frozen files match their SHA-256; notebooks valid; feature policy OK")
