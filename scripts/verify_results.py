#!/usr/bin/env python3
"""Read-only SHA-256 verification of v1.1 result artifacts."""
from pathlib import Path
import hashlib, json
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'results'/'RESULTS_SHA256.json').read_text())
for item in manifest['files']:
    path=root/item['path']
    assert path.is_file(),f'Missing {path}'
    digest=hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda:stream.read(2**20), b''):
            digest.update(chunk)
    assert digest.hexdigest()==item['sha256'],f'Checksum mismatch: {path}'
print(f'PASS: {len(manifest["files"])} results artifacts match their original SHA-256 digests')
