# HITL-IoT: Human-in-the-Loop Intrusion Detection Dataset

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17862333.svg)](https://doi.org/10.5281/zenodo.17862333)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Paper](https://img.shields.io/badge/Paper-blue)](https://doi.org/your-paper-doi)

> **The first IoT intrusion detection dataset with human decision metadata for human-AI collaboration research**

---

## 🔍 Overview

**HITL-IoT** is the first benchmark dataset for IoT intrusion detection that incorporates **human decision behavior** into the labeling process. Unlike traditional IDS datasets that only provide automated benign/attack labels, HITL-IoT includes:

- 👥 **Human judgments** from security professionals
- 💯 **Analyst confidence** scores (0-1 scale)
- ⏱️ **Decision latency** (time taken per decision)
- 📝 **Analyst reasoning** (justification text)
- 🎓 **Expertise-level profiles** (expert/intermediate/novice)

This enables research on **human-AI collaboration**, **analyst modeling**, **trustworthy AI**, and **regulatory compliance** (EU AI Act Article 14) in IoT cybersecurity.

---

## 📊 Dataset Statistics

| Metric | Value |
|--------|-------|
| **Total Network Flows** | 127,845 |
| **Benign Flows** | 108,630 (85%) |
| **Attack Flows** | 19,215 (15%) |
| **Human Annotations** | 10,227 |
| **Expert Annotations** | 8,230 (80.5%) |
| **Intermediate Annotations** | 1,473 (14.4%) |
| **Novice Annotations** | 524 (5.1%) |
| **IoT Devices** | 12 |
| **Attack Categories** | 12 |
| **Features per Flow** | 54 (CICFlowMeter-style) |
| **ML Baselines** | 9 models evaluated |

---

## 📂 Dataset Contents

### **Core Files**

| File | Size | Description |
|------|------|-------------|
| `HITL-IoT_full_dataset.csv` | 142 MB | Complete dataset (127,845 flows) |
| `HITL-IoT_human_annotations.csv` | 2.1 MB | Annotated subset (10,227 flows) |
| `HITL-IoT_baseline_results.csv` | 1.2 KB | ML baseline results (9 models) |

### **Metadata Structure**

#### **Network Flow Features (54 attributes)**
- **Network:** Protocol, src/dst ports, src/dst IPs
- **Traffic:** Bytes sent/received, packet rate, duration
- **Behavioral:** Connection frequency, baseline deviation
- **Device:** Device type, MAC address
- **ML-Ready:** Risk score, ML confidence, ML prediction

#### **Human Annotation Metadata**
| Field | Type | Description |
|-------|------|-------------|
| `annotator_id` | string | Expertise level (expert/intermediate/novice) |
| `human_decision` | binary | Analyst label (0=benign, 1=attack) |
| `human_confidence` | float | Analyst certainty (0.0-1.0) |
| `decision_time` | float | Time taken (seconds) |
| `ml_human_agreement` | boolean | ML and human agree? |
| `ground_truth` | binary | True label (0=benign, 1=attack) |

---

## ⚔️ Attack Categories
The dataset covers twelve distinct IoT attack families:

1. **Botnet C&C** - Command and control communications
2. **Port Scanning** - Network reconnaissance via port probing
3. **DNS Tunneling**- Covert data exfiltration through DNS
4. **Network Mapping** - Topology discovery and enumeration
5. **Remote Admin** - Unauthorized remote administration attempts
6. **Bulk Exfiltration** - Large-scale data theft
7. **Device Hijacking** - Unauthorized device control
8. **Credential Harvesting** - Password and authentication theft
9. **Config Tampering** - Configuration modification attacks
10. **Firmware Exploit** - Firmware-level compromise
11. **Protocol Abuse** - MQTT, CoAP, and IoT protocol manipulation
12. **Service Enumeration** - Service discovery and fingerprinting


---

## 🎯 Research Applications

### **Primary Use Cases**
- 🤝 **Human-AI Collaboration**: Design cooperative IDS workflows
- 🎯 **Selective Deferral**: When should AI defer to humans?
- 📊 **Confidence Calibration**: Study analyst self-assessment accuracy
- 👨‍🏫 **Expertise Modeling**: Understand expert vs novice behavior
- 🏛️ **Regulatory Compliance**: EU AI Act Article 14 oversight validation
- 🔄 **Trust Dynamics**: How does trust evolve in human-AI teams?

### **Secondary Applications**
- Alert triage and prioritization
- Analyst training and skill assessment
- Benchmark comparison across datasets
- Cross-dataset generalization studies
- IoT device behavior profiling

---

## 🤖 Baseline Results

### **Top ML Models**

| Model | Accuracy | F1-Score | Precision | Recall | Training Time | Inference (μs) |
|-------|----------|----------|-----------|--------|---------------|----------------|
| **Voting Ensemble** | 99.60% | 98.64% | 100.00% | 97.31% | 13.2s | 247 μs |
| **XGBoost** | 99.59% | 98.61% | 99.97% | 97.29% | 1.67s | 2.3 μs |
| **LightGBM** | 99.57% | 98.54% | 99.76% | 97.36% | 1.15s | 4.1 μs |
| Random Forest | 99.48% | 98.30% | 99.60% | 97.04% | 14.2s | 6.8 μs |
| 1D-CNN | 99.45% | 98.20% | 99.62% | 96.83% | 274s | 76 μs |
| MLP | 99.41% | 98.07% | 99.45% | 96.74% | 1,704s | 342 μs |
| LSTM | 99.34% | 97.82% | 99.23% | 96.45% | 848s | 673 μs |
| Decision Tree | 98.96% | 96.65% | 98.38% | 94.99% | 3.2s | 2.1 μs |
| Logistic Regression | 97.85% | 93.37% | 96.14% | 90.76% | 0.89s | 2.0 μs |

**Key Findings:**
- ✅ **XGBoost optimal**: Best accuracy-efficiency trade-off (99.59%, 1.67s training, 2.3μs inference)
- ✅ **Zero false positives**: Voting Ensemble achieves 100% precision
- ✅ **Real-time ready**: Tree-based models enable 2-7μs inference
- ⚠️ **Deep learning cost**: 100-1000× slower training, 30-300× slower inference

### **Human Annotation Performance**

| Expertise | Accuracy | Mean Confidence | ECE (Calibration) | Decision Time |
|-----------|----------|-----------------|-------------------|---------------|
| **Expert** | 92.2% | 0.856 | 0.152 | 13.4s |
| **Intermediate** | 84.0% | 0.719 | 0.204 | 22.1s |
| **Novice** | 76.9% | 0.590 | 0.256 | 30.7s |

**Key Findings:**
- ✅ Experts are 1.7× better calibrated than novices (lower ECE)
- ✅ Experts 2.3× faster than novices (13.4s vs 30.7s)
- ⚠️ Confidence does NOT correlate with expertise (r=0.087)
- ✅ Decision speed STRONGLY correlates with expertise

---

## 📁 Repository Structure

```
HITL-IoT/
├── data/
│   ├── HITL-IoT_full_dataset.csv           # Complete dataset (127,845 flows)
│   ├── HITL-IoT_human_annotations.csv      # Annotated subset (10,227 flows)
│   ├── HITL-IoT_baseline_results.csv       # ML results (9 models)
│   ├── feature_description.json            # Feature documentation
│   ├── attack_categories.json              # Attack taxonomy
│   └── checksums.txt                       # SHA256 checksums
│
├── code/
│   ├── data_loader.py                      # Load and validate dataset
│   ├── preprocessing.py                    # Data preprocessing
│   ├── feature_engineering.py              # Feature extraction
│   └── utils.py                            # Utility functions
│
├── benchmarks/
│   ├── classical_ml/                       # Tree-based, logistic regression
│   ├── deep_learning/                      # CNN, LSTM, MLP
│   ├── ensemble/                           # Voting, stacking
│   └── evaluate.py                         # Evaluation metrics
│
├── examples/
│   ├── 01_basic_usage.ipynb                # Getting started
│   ├── 02_ml_baseline.ipynb                # Reproduce baselines
│   ├── 03_human_analysis.ipynb             # Analyze human annotations
│   └── 04_hitl_workflow.ipynb              # Human-AI collaboration
│
├── figures/
│   ├── Figure9_Baseline_Comparison.pdf
│   ├── Figure10_Confusion_Matrices.pdf
│   ├── Figure11_Training_Efficiency.pdf
│   ├── Figure12_Annotation_Behavior.pdf
│   └── Figure13_Confidence_Calibration.pdf
│
├── docs/
│   ├── dataset_description.md              # Detailed methodology
│   ├── baseline_results.md                 # Complete ML evaluation
│   ├── annotation_protocol.md              # Human annotation process
│   └── faq.md                              # Frequently asked questions
│
├── README.md                               # This file
├── LICENSE                                 # CC BY 4.0
├── CITATION.cff                            # Citation metadata
├── requirements.txt                        # Python dependencies
├── CHANGELOG.md                            # Version history
└── .gitignore                              # Git ignore rules
```

---

## 🚀 Quick Start

### **1. Installation**

```bash
# Clone repository
git clone https://github.com/abubakarwakili9/HITL-IoT.git
cd HITL-IoT

# Install dependencies
pip install -r requirements.txt

# Download dataset from Zenodo
# Place CSV files in data/ directory
```

### **2. Load Dataset**

```python
import pandas as pd
from code.data_loader import load_hitl_iot

# Load full dataset
df_full = load_hitl_iot('data/HITL-IoT_full_dataset.csv')
print(f"Total flows: {len(df_full):,}")

# Load human annotations
df_annotations = load_hitl_iot('data/HITL-IoT_human_annotations.csv')
print(f"Annotated flows: {len(df_annotations):,}")

# Filter by expertise
experts = df_annotations[df_annotations['annotator_id'] == 'expert']
print(f"Expert annotations: {len(experts):,}")
```

### **3. Basic Analysis**

```python
# Class distribution
print(df_full['is_attack'].value_counts())

# Attack type distribution
print(df_full[df_full['is_attack'] == 1]['attack_type'].value_counts())

# Device type distribution
print(df_full['device_type'].value_counts())

# Human annotation statistics
print(df_annotations.groupby('annotator_id').agg({
    'human_confidence': ['mean', 'std'],
    'decision_time': ['mean', 'median'],
    'human_decision': lambda x: (x == df_annotations.loc[x.index, 'is_attack']).mean()
}).round(3))
```

### **4. Reproduce Baselines**

```python
from benchmarks.evaluate import train_and_evaluate
from sklearn.ensemble import RandomForestClassifier

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
results = train_and_evaluate(model, df_full)

print(f"Accuracy: {results['accuracy']:.4f}")
print(f"F1-Score: {results['f1_score']:.4f}")
print(f"Precision: {results['precision']:.4f}")
print(f"Recall: {results['recall']:.4f}")
```

---

## 📥 Download

### **Primary Download (Zenodo)**

**🔗 [Download from Zenodo](https://doi.org/10.5281/zenodo.17862334)**

The complete HITL-IoT dataset is hosted on Zenodo with a permanent DOI for citation.

### **Verify Downloads**

```bash
# Verify file integrity
sha256sum -c data/checksums.txt

# Expected output:
# HITL-IoT_full_dataset.csv: OK
# HITL-IoT_human_annotations.csv: OK
# HITL-IoT_baseline_results.csv: OK
```

---

## 📚 Citation

If you use this dataset in your research, please cite both the dataset and the paper:

### **Dataset Citation**

```bibtex
@dataset{Wakili2025hitliot_dataset,
  author       = {Abubakar Wakili, Muhammad Idris, Sara Bakkali 
                  },
  title        = {HITL-IoT: Human-in-the-Loop Intrusion Detection Dataset},
  year         = 2025,
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.17862334},
  url          = {https://doi.org/10.5281/zenodo.17862334}
}
```


### **APA Style**

Wakili A., et al. (2025). HITL-IoT: Human-in-the-Loop Intrusion Detection Dataset [Data set]. Zenodo. https://doi.org/10.5281/zenodo.XXXXXXX

---

## 📖 Documentation

- **[Dataset Description](docs/dataset_description.md)** - Detailed methodology and generation process
- **[Baseline Results](docs/baseline_results.md)** - Complete ML/DL evaluation
- **[Annotation Protocol](docs/annotation_protocol.md)** - Human annotation procedures
- **[FAQ](docs/faq.md)** - Frequently asked questions
- **[Changelog](CHANGELOG.md)** - Version history and updates

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### **How to Contribute:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Contribution Areas:**

- Additional baseline models
- Improved preprocessing scripts
- New analysis notebooks
- Documentation improvements
- Bug fixes
- Feature suggestions

---

## 🐛 Issues

Found a problem? Have a question?

**👉 [Open an issue](https://github.com/abubakarwakili9/HITL-IoT/issues)**

Before opening an issue, please:
1. Check existing issues
2. Provide detailed description
3. Include code to reproduce (if applicable)
4. Specify dataset version

---

## 📜 License

This dataset is licensed under the **[Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE)**.

**You are free to:**
- ✅ **Share** — copy and redistribute the material
- ✅ **Adapt** — remix, transform, and build upon the material
- ✅ **Commercial use** — use for commercial purposes

**Under the following terms:**
- 📝 **Attribution** — You must give appropriate credit and cite our paper



## 📧 Contact

**Lead Author:** Abubakar Wakili   
**Email:** a.wakili@ueuromed.org  
**Institution:** Euromed University of Fez, Morocco  
**ORCID:** [orcid-id]

### **Links:**
- 🌐 **Project Website:** 
- 📦 **Dataset (Zenodo):** https://doi.org/10.5281/zenodo.178623341
- 📄 **Paper:** 
- 💻 **GitHub:** 

---

## 📊 Dataset Statistics

![GitHub stars](https://img.shields.io/github/stars/[username]/HITL-IoT?style=social)
![GitHub forks](https://img.shields.io/github/forks/[username]/HITL-IoT?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/[username]/HITL-IoT?style=social)
![Downloads](https://img.shields.io/badge/dynamic/json?url=https://zenodo.org/api/records/17862334&label=downloads&query=$.metadata.downloads&color=blue)

---

## 🔗 Related Resources

- **CICIoT2023:** Large-scale IoT attack dataset
- **Bot-IoT:** Botnet attack dataset
- **ToN-IoT:** Telemetry data of IoT/IIoT sensors
- **Edge-IIoTset:** Edge computing IoT dataset


---

**⭐ If you find this dataset useful, please star this repository!**

---

<p align="center">
  Made with ❤️ for open science and cybersecurity research
</p>
```
