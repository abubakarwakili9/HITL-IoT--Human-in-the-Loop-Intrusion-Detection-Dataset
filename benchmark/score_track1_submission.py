"""HITL-IoT v1.1 Track-1 benchmark scorer.

Usage (from the repository root):
    python benchmark/score_track1_submission.py my_submission.csv

The submission must contain one row per flow in the chosen partition with columns
`flow_id` and `y_probability_attack` (see submission_template_temporal_test.csv).
"""
import pandas as pd
from sklearn.metrics import (accuracy_score, balanced_accuracy_score, confusion_matrix, f1_score,
                             matthews_corrcoef, precision_score, recall_score, roc_auc_score)


def score(submission_csv, dataset_csv='data/v1.1/dataset/HITL-IoT_dataset_v1.1.csv',
          splits_csv='data/v1.1/dataset/HITL-IoT_splits_v1.1.csv', protocol='temporal_split', split='test', threshold=0.5):
    # Score a HITL-IoT v1.1 Track-1 submission (flow_id, y_probability_attack) exactly as in Table 7.
    sub = pd.read_csv(submission_csv)
    truth = pd.read_csv(dataset_csv, usecols=['flow_id', 'is_attack']).merge(pd.read_csv(splits_csv), on='flow_id')
    truth = truth[truth[protocol] == split]
    assert sub['flow_id'].is_unique and set(sub['flow_id']) == set(truth['flow_id']), 'submission must cover the partition exactly once'
    assert sub['y_probability_attack'].between(0, 1).all(), 'probabilities must lie in [0, 1]'
    m = truth.merge(sub, on='flow_id'); y = m['is_attack'].astype(int); p = m['y_probability_attack']
    pred = (p >= threshold).astype(int)
    tn, fp, fn, tp = confusion_matrix(y, pred, labels=[0, 1]).ravel()
    return {'accuracy': accuracy_score(y, pred), 'balanced_accuracy': balanced_accuracy_score(y, pred),
            'precision': precision_score(y, pred, zero_division=0), 'recall': recall_score(y, pred, zero_division=0),
            'f1': f1_score(y, pred, zero_division=0), 'macro_f1': f1_score(y, pred, average='macro', zero_division=0),
            'mcc': matthews_corrcoef(y, pred), 'auroc': roc_auc_score(y, p),
            'fpr': fp / (fp + tn) if fp + tn else float('nan'), 'fnr': fn / (fn + tp) if fn + tp else float('nan')}


if __name__ == '__main__':
    import argparse, json
    ap = argparse.ArgumentParser(description='Score a HITL-IoT v1.1 Track-1 submission (flow_id, y_probability_attack).')
    ap.add_argument('submission_csv')
    ap.add_argument('--dataset', default='data/v1.1/dataset/HITL-IoT_dataset_v1.1.csv')
    ap.add_argument('--splits', default='data/v1.1/dataset/HITL-IoT_splits_v1.1.csv')
    ap.add_argument('--protocol', default='temporal_split', choices=['temporal_split', 'iid_split'])
    ap.add_argument('--split', default='test', choices=['validation', 'test'])
    ap.add_argument('--threshold', type=float, default=0.5)
    a = ap.parse_args()
    print(json.dumps(score(a.submission_csv, a.dataset, a.splits, a.protocol, a.split, a.threshold), indent=2))
