# 🔥 Pi/Stellar Auto-Send Wallet Bot

**Languages:** [Français](#-français) | [English](#-english)

---

## 🇫🇷 Français

### 📖 Description

**Pi/Stellar Auto-Send Wallet Bot (Éducatif)**  
Un script Node.js qui :

- Récupère une clé privée et publique depuis une phrase mnémonique BIP-39.
- Se connecte au réseau Pi (Horizon API).
- Surveille en boucle le solde du portefeuille.
- Envoie automatiquement tout solde disponible (après réserve et frais) vers une adresse prédéfinie.

> **But pédagogique :** comprendre la dérivation Ed25519 (`m/44'/314159'/0'`), la soumission de transactions via Horizon, et la gestion des frais et erreurs.

---

### ⚠️ Avertissement éthique et sécurité

- Usage **strictement éducatif** : testnet ou comptes personnels uniquement.
- Toute utilisation pour siphonner des comptes tiers est **illégale**.
- **Ne partagez jamais** votre phrase mnémonique ou vos clés privées.
- L’auteur décline toute responsabilité en cas de mauvaise utilisation.

---

### 🚀 Fonctionnalités

- Dérivation Ed25519 (BIP-39/BIP-44).
- Connexion automatique à un serveur Horizon (Pi/Stellar).
- Lecture du solde natif Pi.
- Vérification continue (par défaut : toutes les 750 ms).
- Calcul dynamique des frais réseau et de la réserve minimale.
- Envoi automatique des fonds disponibles.
- Logs détaillés (clés, soldes, frais, transactions).
- Gestion des erreurs Horizon (soldes insuffisants, wallet verrouillé, etc.).

---

### 📦 Prérequis

- Node.js 18+
- NPM, PNPM ou Yarn

Installer les dépendances :

```bash
npm install @stellar/stellar-sdk bip39 ed25519-hd-key
```

---

### ⚙️ Configuration

Modifier ces constantes dans le script :

```js
const PASSPHRASE_24 = "votre phrase mnémonique BIP-39 ici";
const DESTINATION = "adresse_destination_en_Pi";
const NETWORK_URL = "https://api.mainnet.minepi.com";
const NETWORK_PASSPHRASE = "Pi Network";
```

- `PASSPHRASE_24` : votre phrase mnémonique (24 mots).
- `DESTINATION` : l’adresse Pi destinataire.
- `NETWORK_URL` : URL Horizon (testnet ou mainnet).
- `NETWORK_PASSPHRASE` : passphrase du réseau (ex. `"Pi Network"`).

---

### 🛠️ Lancement

```bash
node index.js
```

---

### 🔍 Fonctionnement détaillé

1. **Initialisation (`initKeypair`)** : conversion mnémonique → `seed` avec `bip39`, dérivation Ed25519 (`m/44'/314159'/0'`).
2. **Surveillance (`run`)** : récupération des infos du compte, lecture du solde, calcul des frais et réserve. Si `solde > réserve + frais`, envoi déclenché.
3. **Transaction (`createAndSubmitTransaction`)** : création d’une transaction signée avec opération `payment`, soumission à Horizon, affichage des résultats.
4. **Boucle** : exécution toutes les 750 ms via `setInterval`.

---

### 🔑 Exemple de logs

```
==================== INITIALISATION ====================
🔐 Clé privée : SBY7...TYSN
🔑 Clé publique : GABC...XYZ
========================================================
====== ⏱️ Nouvelle exécution ======
💰 Solde Pi : 3.0000000
💸 Frais réseau : 0.0000100 Pi
📤 Montant à envoyer : 1.9999900 Pi
----- 🚀 Création et soumission de la transaction -----
✅ Transaction réussie ! 🔗 Hash : 1234abcd5678ef...
=====================================
```

---

### 📖 Bonnes pratiques

- Toujours tester sur **testnet** avant le mainnet.
- Ne pas réduire l’intervalle `setInterval` (éviter surcharge API).
- Stocker les clés privées **sécurisées** (offline recommandé).
- Bien comprendre réserve minimale et frais avant mainnet.

---

### ⚠️ Limites

- Dépendance au réseau Horizon (latence, quotas API).
- Boucle de vérification fréquente peut surcharger l’API.
- Échec si compte verrouillé ou insuffisamment approvisionné (XDR fourni).

---

### 📜 Licence

MIT — Utilisation responsable exigée.

---

## 🇬🇧 English

### 📖 Description

**Pi/Stellar Auto-Send Wallet Bot (Educational)**  
A Node.js script that:

- Recovers a private/public keypair from a BIP-39 mnemonic phrase.
- Connects to the Pi Network (Horizon API).
- Continuously monitors wallet balance.
- Automatically sends available funds (after reserve/fees) to a predefined address.

> **Educational purpose:** understand Ed25519 derivation (`m/44'/314159'/0'`), Horizon transaction submission, fees, and error handling.

---

### ⚠️ Ethics and Security Warning

- **Educational use only** (testnet or personal accounts).
- Any attempt to drain third-party accounts is **illegal**.
- **Never share** mnemonic or private keys.
- Author disclaims responsibility for misuse.

---

### 🚀 Features

- Ed25519 derivation (BIP-39/BIP-44).
- Automatic Horizon connection (Pi/Stellar).
- Reads native Pi balance.
- Continuous monitoring (750 ms default).
- Dynamic fees and reserve calculation.
- Auto fund transfer.
- Detailed logs (keys, balances, fees, transactions).
- Horizon error handling.

---

### 📦 Requirements

- Node.js 18+
- NPM, PNPM, or Yarn

Install dependencies:

```bash
npm install @stellar/stellar-sdk bip39 ed25519-hd-key
```

---

### ⚙️ Configuration

```js
const PASSPHRASE_24 = "your BIP-39 mnemonic here";
const DESTINATION = "destination_address_in_Pi";
const NETWORK_URL = "https://api.mainnet.minepi.com";
const NETWORK_PASSPHRASE = "Pi Network";
```

- `PASSPHRASE_24`: 24-word mnemonic.
- `DESTINATION`: Pi destination address.
- `NETWORK_URL`: Horizon URL (testnet/mainnet).
- `NETWORK_PASSPHRASE`: network passphrase (e.g. `"Pi Network"`).

---

### 🛠️ Run

```bash
node index.js
```

---

### 🔍 Detailed Functionality

1. **Initialization (`initKeypair`)** : mnemonic → `seed` via `bip39`, Ed25519 derivation with `ed25519-hd-key`.
2. **Monitoring (`run`)** : fetch account, read balance, calculate fees/reserve, send if `balance > reserve + fees`.
3. **Transaction (`createAndSubmitTransaction`)** : build signed payment transaction, submit via Horizon, log results.
4. **Loop** : executed every 750 ms with `setInterval`.

---

### 🔑 Example Logs

```
==================== INITIALIZATION ====================
🔐 Private Key: SBY7...TYSN
🔑 Public Key: GABC...XYZ
========================================================
====== ⏱️ New Execution ======
💰 Pi Balance: 3.0000000
💸 Network Fee: 0.0000100 Pi
📤 Amount to Send: 1.9999900 Pi
----- 🚀 Creating and Submitting Transaction -----
✅ Transaction Successful! 🔗 Hash: 1234abcd5678ef...
=====================================
```

---

### 📖 Best Practices

- Always test on **testnet** first.
- Don’t lower `setInterval` interval (avoid API overload).
- Store private keys **securely** (preferably offline).
- Understand reserve/fees before mainnet use.

---

### ⚠️ Limitations

- Dependent on Horizon (latency / API limits).
- Frequent checks may overload API.
- Transactions fail if locked/underfunded (XDR returned).

---

### 📜 License

MIT — Responsible usage required.
