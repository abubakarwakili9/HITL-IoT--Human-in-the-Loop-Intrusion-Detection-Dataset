#!/usr/bin/env python3
"""Verify frozen release exact hashes, counts, split policy, and subset; no model training performed."""
from pathlib import Path
import csv,json,hashlib,sys
root=Path(__file__).resolve().parents[1]
f=root/'data'/'v1.1'
checks={}
for line in (f/'HITL-IoT_checksums_v1.1.txt').read_text().splitlines():
 if not line.strip(): continue
 digest, name=line.split(maxsplit=1);checks[name.strip()]=digest.strip()
for name,digest in checks.items():
 actual=hashlib.sha256((f/name).read_bytes()).hexdigest()
 assert actual==digest, f'Hash differs: {name}'
assert len(checks)==13, len(checks)
from collections import Counter
with (f/'HITL-IoT_dataset_v1.1.csv').open(newline='',encoding='utf-8') as fd:
 rd=csv.DictReader(fd); assert len(rd.fieldnames)==60, len(rd.fieldnames)
 counts=Counter(row['is_attack'] for row in rd)
assert sum(counts.values())==127845,counts
assert counts['False']==108668 and counts['True']==19177,counts
with (f/'HITL-IoT_oversight_subset_v1.1.csv').open(newline='',encoding='utf-8') as fd:
 assert sum(1 for _ in csv.DictReader(fd))==10227
with (f/'HITL-IoT_splits_v1.1.csv').open(newline='',encoding='utf-8') as fd:
 sp=Counter(row['temporal_split'] for row in csv.DictReader(fd))
assert sp==Counter({'train':89492,'validation':19176,'test':19177}),sp
policy=json.loads((f/'HITL-IoT_feature_policy_v1.1.json').read_text())
assert len(policy['track1_primary_flow_only'])==39
print('PASS: 13 frozen SHA-256 checksums; 127,845/60 source dataset; class counts; 10,227 oversight rows; fixed splits; 39 allowed features')
print('NOTE: no models were retrained; results have not been re-executed independently.')
