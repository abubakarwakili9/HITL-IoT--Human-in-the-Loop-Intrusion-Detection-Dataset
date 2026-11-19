"""Read-only HITL-IoT v1.1 quick start; no model evaluation claims.

Run: python scripts/quickstart_release_check.py [data/v1.1]
"""
import json
import sys
from pathlib import Path
import pandas as pd

folder = Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).resolve().parents[1] / 'data' / 'v1.1'
data = pd.read_csv(folder / 'HITL-IoT_dataset_v1.1.csv', low_memory=False)
splits = pd.read_csv(folder / 'HITL-IoT_splits_v1.1.csv')
policy = json.loads((folder / 'HITL-IoT_feature_policy_v1.1.json').read_text())
features = policy['track1_primary_flow_only']
assert data.shape == (127845, 60)
assert data['is_attack'].astype(str).str.lower().value_counts().to_dict() == {'false': 108668, 'true': 19177}
assert len(features) == 39
assert not set(features) & {'is_attack','attack_type','ambiguity_score','generated_prediction','generated_attack_score','oversight_profile','profile_decision','flow_id','timestamp','dst_category'}
assert all(c in data.columns for c in features)
assert data.flow_id.is_unique and splits.flow_id.is_unique
merged = data.merge(splits[['flow_id','temporal_split']], on='flow_id', validate='one_to_one')
assert len(merged) == len(data)
assert merged.temporal_split.value_counts().to_dict() == {'train': 89492, 'test':19177, 'validation':19176}
print('Validated frozen v1.1 dataset and track-1 primary feature policy.')
print('Dataset:', data.shape, 'Primary IDS source features:',len(features))
print('Chronological splits:', merged.temporal_split.value_counts().to_dict())
print('Sample permitted features:', features[:8])
print('This is a reader/integrity example, not a re-execution of manuscript model results.')
