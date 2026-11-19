# HITL-IoT v1.1 changelog

v1.0 is preserved unchanged. v1.1 is a new version; hashes and numerical results differ from v1.0
by design. Every v1.1 statistic must be taken from the v1.1 summary/report, not from v1.0 text.

## Configuration and counts
- attack_ratio is now functional: attack = round(N*ratio), benign = N - attack (v1.0 hard-coded counts).
- Attack-category weights explicitly normalised; integer counts by largest remainder; seeded shuffle.
- Device allocation explicit (uniform 0.20 default) by largest remainder within each class.
- One named, seeded NumPy stream per component (no unseeded or mixed RNG calls).

## Taxonomy / encoding
- One-hot columns now exist for all five devices (v1.0 lacked device_tv and device_doorbell,
  which produced the legacy "Mixed/Unknown" artefact).
- Stable flow_id added.

## Shortcut / leakage removal
- dst_mac: v1.0 set FF:FF:FF:FF:FF:FF for every attack only (perfect label leak). v1.1 uses the
  gateway MAC for all external flows.
- Protocol: v1.0 forced all attacks to TCP (any UDP flow was benign). v1.1 derives transport from
  port rules for both classes (DNS/NTP/CoAP/SSDP/SNMP/mDNS UDP; QUIC-like UDP/443).
- Duration: v1.0 benign <=10 s vs attacks up to 60 s. v1.1 uses device-specific benign ranges and
  attack-specific ranges, with benign-like draws at probability data_similarity.
- Benign DNS/NTP auxiliary flows added so a non-device port is not an automatic attack indicator.
- risk_score (label-conditioned, non-overlapping ranges) removed from canonical output; available only
  as configured_intrinsic_risk in score_mode=legacy_risk.
- is_internal_dst and is_localhost removed (constant False in v1.0).

## Construction score and oversight
- ml_confidence -> generated_attack_score, computed from observable flow evidence plus logit noise
  (v1.0: label-conditioned risk + U(-0.15,0.15)). ml_prediction -> generated_prediction
  (threshold 0.5 on the logistic score; v1.0 used 0.6).
- ambiguity_score retained in all files.
- Oversight selection: deterministic Top-K by ambiguity (v1.0: threshold >0.4 then weighted random
  sampling, contradicting the manuscript).
- Profile decisions generated from evidence + profile-specific context weight, model anchoring,
  threshold and noise (v1.0: copy/flip ground truth with fixed accuracy). Accuracy is now an observed
  output. v1.0 behaviour available as legacy_profile_mode=true for comparison only.
- Profile confidence from decision margin and ambiguity; no longer depends on agreement with the
  model (v1.0 leak: confidence predicted disagreement with AUC ~0.95).
- profile_rationale added (template-generated; not analyst reasoning).
- Non-selected rows carry nulls instead of 0/-1 placeholders.
- Human-oriented names replaced (see schema mapping); file renamed to oversight_subset.

## Feature semantics
- packet_rate = packet_count / duration (v1.0: packet_size / duration, wrong units); packet_count added.
- baseline_deviation computed as |bytes_sent - mu_d| / sigma_d from configured benign device ranges
  (v1.0: random U(-2,2)); duration_deviation and packet_size_deviation added.
- connection_frequency = prior flows of the same instance in the preceding 60 s (v1.0: random 1-10;
  connections_per_hour config was unused and is removed).
- Rolling statistics per device instance over previous flows only (v1.0: per device type, including
  the current flow).
- Destination addresses use RFC 5737 documentation blocks; categories replace live-IP reputation claims.
- service_category added (port-derived; not application-protocol emulation).

## Reporting
- "Realism" wording removed; "byte volume overlap ratio" renamed median_byte_volume_ratio and
  complemented by IQRs and a Wasserstein distance.
- Automatic summary, report, shortcut audit, schema, feature policy, fixed splits, manifest, and
  expanded checksums.

## Final v1.1 revision (freeze candidate)
- Profile anchoring corrected: anchored profiles now use the evidence-scale value implied by the
  construction score (offset + logit(score)/slope) instead of the raw score. The draft added a
  0.5-centred score to evidence thresholded at 0.35, biasing all anchored profiles towards "attack"
  (low-competence alarm rate 0.69 on an ~83%-benign queue). This affects all three profiles.
- Low-competence profile: threshold 0.30 -> 0.35 (common threshold for all profiles; profiles now
  differ only in context access, anchoring and noise). Accuracy is not hard-coded; it is an observed
  output checked by acceptance rules (ordering high > medium > low; low > 0.50).
- Added chronological temporal split (PRIMARY) with strict timestamp boundaries; the stratified IID
  split is retained as SECONDARY. Split file: flow_id, timestamp, temporal_split, iid_split.
- Feature policy: track1_primary_flow_only (PRIMARY IDS set, excludes dst_category),
  track1_context_enriched (SECONDARY), track2_oversight.
- "Oracle" terminology removed. The disagreement-override figure is reported only in the summary JSON
  as the descriptive "Profile-override-on-disagreement policy".
- Generator source copied verbatim (shutil.copy2) and hashed automatically; --source-file option for
  interactive use; release is not marked publication-ready without the source.
- Manifest contains no wall-clock timestamp, so every artefact is byte-reproducible; the manifest is
  hashed in the checksum file (no self-hashing).
- --check-determinism now regenerates the full release in a temporary directory and compares SHA-256
  of every artefact.
- Added validations: profile ordering, low-profile accuracy, split coverage/proportions/strict
  chronology, independent recomputation of a prior-only rolling feature, source inclusion/hash,
  checksum/manifest/config consistency.
