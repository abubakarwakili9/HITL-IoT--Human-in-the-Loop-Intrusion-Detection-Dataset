# HITL-IoT v1.1 generation report

All values below are computed automatically from the saved dataframe. All data are generated; no value is a real-traffic or real-analyst measurement.

Seed 42 | rows 127,845 | columns 60 | 2024-01-15T00:00:22 to 2024-01-21T23:59:54 | score_mode=evidence | legacy_profile_mode=False

## Class distribution
| Value | Count | Percent |
|---|---:|---:|
| benign | 108,668 | 85.000% |
| attack | 19,177 | 15.000% |

## Device distribution
| Value | Count | Percent |
|---|---:|---:|
| camera | 25,570 | 20.001% |
| thermostat | 25,570 | 20.001% |
| speaker | 25,569 | 20.000% |
| doorbell | 25,568 | 19.999% |
| tv | 25,568 | 19.999% |

## Attack distribution (observed)
| Value | Count | Percent |
|---|---:|---:|
| botnet_communication | 3,442 | 17.949% |
| port_scanning | 2,681 | 13.980% |
| dns_tunneling | 2,395 | 12.489% |
| remote_administration | 1,602 | 8.354% |
| device_hijacking | 1,523 | 7.942% |
| network_mapping | 1,507 | 7.858% |
| protocol_abuse | 1,380 | 7.196% |
| bulk_data_transfer | 1,301 | 6.784% |
| service_enumeration | 1,205 | 6.284% |
| credential_harvesting | 809 | 4.219% |
| configuration_tampering | 745 | 3.885% |
| firmware_exploitation | 587 | 3.061% |

## Protocol distribution
| Value | Count | Percent |
|---|---:|---:|
| TCP | 101,852 | 79.668% |
| UDP | 25,993 | 20.332% |

## Destination category (benign)
| Value | Count | Percent |
|---|---:|---:|
| legitimate_like | 92,421 | 85.049% |
| ambiguous | 10,907 | 10.037% |
| suspicious_like | 5,340 | 4.914% |

## Destination category (attack)
| Value | Count | Percent |
|---|---:|---:|
| legitimate_like | 7,666 | 39.975% |
| ambiguous | 5,766 | 30.067% |
| suspicious_like | 5,745 | 29.958% |

## Port mimicry
Configured range: 20.0%–70.0%. Observed share of attacks on a device-expected port: 50.92%.

## Byte volume
Median bytes_sent benign 4,076 / attack 13,594; median ratio 0.2998; Wasserstein(log10 bytes) 0.56793.

## Construction score
Accuracy of generated_prediction: full 0.84785, oversight subset 0.5685.

## Evaluation splits
Temporal = PRIMARY (chronological, leakage-conservative). IID stratified = SECONDARY.

| Protocol | Part | n | Proportion | Attack rate | First timestamp | Last timestamp |
|---|---|---:|---:|---:|---|---|
| temporal | train | 89,492 | 0.7 | 0.15051 | 2024-01-15T00:00:22 | 2024-01-19T21:34:44 |
| temporal | validation | 19,176 | 0.14999 | 0.14961 | 2024-01-19T21:34:48 | 2024-01-20T22:45:31 |
| temporal | test | 19,177 | 0.15 | 0.14804 | 2024-01-20T22:45:34 | 2024-01-21T23:59:54 |
| iid_stratified | train | 89,492 | 0.7 | 0.15 | 2024-01-15T00:00:22 | 2024-01-21T23:59:54 |
| iid_stratified | validation | 19,175 | 0.14999 | 0.14993 | 2024-01-15T00:01:44 | 2024-01-21T23:59:16 |
| iid_stratified | test | 19,178 | 0.15001 | 0.15007 | 2024-01-15T00:00:25 | 2024-01-21T23:59:32 |

## Configured/generated oversight profiles
Properties of configured/generated oversight profiles — not measurements of real security analysts.

Selected 10,227 (7.9995%). Ambiguity range [0.881239, 0.999984]. Model–profile agreement 0.566. Overall profile accuracy 0.8023. Majority-class baseline on the subset 0.8323.

| Profile | n | % | Accuracy | Balanced acc. | Alarm rate | Agreement | Conf. mean | Conf. median | ECE | Latency mean (s) | Latency median (s) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| high_competence | 8,160 | 79.789 | 0.8311 | 0.7502 | 0.2124 | 0.5667 | 0.8839 | 0.8899 | 0.0528 | 14.68 | 14.639 |
| low_competence | 510 | 4.987 | 0.549 | 0.5205 | 0.4451 | 0.5157 | 0.6239 | 0.6387 | 0.0792 | 34.085 | 33.957 |
| medium_competence | 1,557 | 15.224 | 0.7341 | 0.6909 | 0.3064 | 0.5787 | 0.7456 | 0.7564 | 0.0312 | 24.048 | 23.636 |

Disagreements: 4,439 (generated prediction correct 1,024, profile correct 3,415; prediction-benign/profile-attack 1,196, prediction-attack/profile-benign 3,243). AUC of low profile confidence for predicting disagreement: 0.5174.

## Shortcut audit (Track-1 context-enriched features)
Rule: single_feature_auc >= 0.95 or >= 50% rows in near-pure categories. Flagged: none.

| Feature | Single-feature AUC / near-pure rows % |
|---|---:|
| hour | 0.5021 |
| day_of_week | 0.5019 |
| is_weekend | 0.5014 |
| is_business_hours | 0.5005 |
| is_night | 0.5001 |
| dst_category | 0.0 |
| protocol | 0.0 |
| dst_port | 0.5438 |
| service_category | 10.566 |
| is_well_known_port | 0.6115 |
| is_registered_port | 0.6034 |
| is_dynamic_port | 0.5081 |
| port_expected_for_device | 0.7454 |
| device_type | 0.0 |
| device_thermostat | 0.5 |
| device_camera | 0.5 |
| device_speaker | 0.5 |
| device_tv | 0.5 |
| device_doorbell | 0.5 |
| ttl | 0.5 |
| packet_size | 0.5358 |
| packet_count | 0.6732 |
| duration | 0.5424 |
| bytes_sent | 0.6596 |
| bytes_received | 0.6157 |
| bytes_ratio | 0.7212 |
| bytes_per_second | 0.6032 |
| packet_rate | 0.6063 |
| baseline_deviation | 0.7807 |
| duration_deviation | 0.5491 |
| packet_size_deviation | 0.5753 |
| connection_frequency | 0.5022 |
| connection_count_prev_5min | 0.5006 |
| connection_count_prev_10min | 0.5007 |
| bytes_sent_mean_5 | 0.5002 |
| bytes_sent_std_5 | 0.5004 |
| bytes_sent_mean_10 | 0.5 |
| bytes_sent_std_10 | 0.5 |
| bytes_sent_mean_20 | 0.5001 |
| bytes_sent_std_20 | 0.5001 |

## Pre-export validation
| Check | Result | Detail |
|---|---|---|
| row count | PASS | 127845 vs 127845 |
| class counts | PASS | attack=19177 benign=108668 |
| unique flow_id | PASS |  |
| five device types | PASS | ['camera', 'doorbell', 'speaker', 'thermostat', 'tv'] |
| no Mixed/Unknown/Other device | PASS |  |
| one-hot devices complete | PASS |  |
| twelve attack types + normal | PASS |  |
| attack category counts sum | PASS |  |
| oversight count == floor(N*rate) | PASS | 10227 vs 10227 |
| Top-K property | PASS | max unselected=0.881232 min selected=0.881239 |
| ambiguity in [0,1] | PASS |  |
| score in [0,1] | PASS |  |
| selected rows have complete metadata | PASS |  |
| non-selected rows have null metadata | PASS |  |
| rationale non-empty | PASS |  |
| confidence in [0,1] | PASS |  |
| latency > 0 | PASS |  |
| profile performance ordering: high > medium > low | PASS | high_competence=0.8311 > medium_competence=0.7341 > low_competence=0.5490 |
| low-competence profile accuracy > 0.50 | PASS | 0.5490 |
| durations > 0 | PASS |  |
| byte counts >= 0 | PASS |  |
| packet_count >= 1 | PASS |  |
| ports in range | PASS |  |
| no constant dst_mac leakage | PASS |  |
| historical features prior-only (independent recomputation) | PASS | camera_21 |
| chronological row order | PASS |  |
| primary Track-1 flow-only defined | PASS |  |
| contextual Track-1 defined | PASS |  |
| Track-2 oversight defined | PASS |  |
| Track-1 excludes labels/construction/oversight/identifiers | PASS |  |
| every column documented | PASS |  |
| device percentages sum to 100 | PASS |  |
| split file covers every flow exactly once | PASS |  |
| temporal split coverage | PASS |  |
| temporal split approximately 70/15/15 | PASS | train=0.7000, validation=0.1500, test=0.1500 |
| IID split coverage | PASS |  |
| IID split approximately 70/15/15 | PASS | train=0.7000, validation=0.1500, test=0.1500 |
| temporal train precedes validation (strict) | PASS | 2024-01-19T21:34:44 < 2024-01-19T21:34:48 |
| temporal validation precedes test (strict) | PASS | 2024-01-20T22:45:31 < 2024-01-20T22:45:34 |
| no temporal-train record later than any test record | PASS |  |
