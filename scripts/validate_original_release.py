#!/usr/bin/env python3
"""HITL-IoT v1.1: lightweight file integrity and dataset-statistics validation.
Run: python scripts/validate_original_release.py [data/v1.1]
Does not validate scientific reproducibility of all experiments.
"""
from __future__ import annotations
import csv
import hashlib
import json
import pathlib
import sys
from collections import Counter

EXPECTED = {"rows": 127845, "columns": 60, "benign": 108668, "attack": 19177, "oversight": 10227}

def main(root: pathlib.Path) -> int:
    assert root.is_dir(), f"Missing directory: {root}"
    checksum_file = root / "HITL-IoT_checksums_v1.1.txt"
    lines = [ln.strip().split(None, 1) for ln in checksum_file.read_text().splitlines() if ln.strip()]
    for declared_hash, file_name in lines:
        p = root / file_name.strip().lstrip('*')
        assert p.is_file(), f"Missing file: {p.name}"
        sha = hashlib.sha256()
        with p.open('rb') as fh:
            for chunk in iter(lambda: fh.read(2**20), b''):
                sha.update(chunk)
        assert sha.hexdigest().lower() == declared_hash.lower(), f"SHA-256 mismatch: {p.name}"
    print(f"PASS: {len(lines)} supplied file checksums")
    ds = root / "HITL-IoT_dataset_v1.1.csv"
    labels = Counter()
    with ds.open(newline='', encoding='utf-8') as fh:
        reader = csv.DictReader(fh)
        assert len(reader.fieldnames or []) == EXPECTED['columns'], 'Unexpected number of columns'
        for row in reader:
            labels[str(row['is_attack']).strip().lower()] += 1
    assert sum(labels.values()) == EXPECTED['rows'], 'Unexpected row count'
    assert labels['false'] == EXPECTED['benign'], 'Unexpected benign count'
    assert labels['true'] == EXPECTED['attack'], 'Unexpected attack count'
    with (root / "HITL-IoT_oversight_subset_v1.1.csv").open(newline='', encoding='utf-8') as fh:
        reviewer = csv.DictReader(fh)
        profiles = Counter(row['oversight_profile'] for row in reviewer)
    assert sum(profiles.values()) == EXPECTED['oversight'], 'Unexpected oversight subset size'
    assert profiles == {'high_competence': 8160, 'medium_competence': 1557, 'low_competence': 510}, 'Unexpected oversight profiles'
    summary = json.loads((root / 'HITL-IoT_summary_v1.1.json').read_text())
    assert summary['dataset']['version'] == '1.1'
    assert summary['dataset']['rows'] == EXPECTED['rows']
    print('PASS: 127,845 flows, 60 columns, 108,668 benign, 19,177 attacks')
    print('PASS: 10,227 simulated oversight records (8,160 high; 1,557 medium; 510 low)')
    print('Note: this checks released files and metadata, not re-execution of all results.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main(pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parents[1] / 'data' / 'v1.1'))
