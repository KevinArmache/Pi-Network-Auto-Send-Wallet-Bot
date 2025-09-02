# 🔥 Pi/Stellar Auto-Send Wallet Bot

**Languages:** Français | English

---

## 🇫🇷 Français

### Description

**Pi/Stellar Auto-Send Wallet Bot (Éducatif)**  
Un script Node.js qui :

- Récupère une clé privée et une clé publique à partir d’une phrase mnémonique BIP-39.
- Se connecte au réseau Pi (Horizon API).
- Surveille en boucle le solde du portefeuille.
- Envoie automatiquement tout solde disponible (après réserve et frais) vers une adresse prédéfinie.

> **But pédagogique :** comprendre la dérivation Ed25519 (m/44'/314159'/0'), la soumission de transactions via Horizon, et la gestion des frais et erreurs.

### ⚠️ Avertissement éthique et sécurité

- Usage **strictement éducatif**. N’utilisez ce script que sur vos comptes personnels ou sur le testnet.
- Toute utilisation pour siphonner des comptes tiers est **illégale**.
- **Ne partagez jamais** votre phrase mnémonique ou clé privée.
- L’auteur décline toute responsabilité en cas de mauvaise utilisation.

### 🚀 Fonctionnalités

- Dérivation Ed25519 depuis une phrase mnémonique (BIP-39/BIP-44).
- Connexion automatique à un serveur Horizon (Pi/Stellar).
- Lecture du solde natif Pi.
- Vérification continue du portefeuille (intervalle par défaut : 750 ms).
- Calcul dynamique des frais réseau et de la réserve minimale.
- Envoi automatique des fonds disponibles vers une adresse fixe.
- Logs détaillés (clé publique/privée, soldes, frais, résultats des transactions).
- Gestion des erreurs Horizon (soldes insuffisants, wallet verrouillé, etc.).

### 📦 Prérequis

- Node.js 18+
- NPM, PNPM ou Yarn

Installer les dépendances :

```bash
npm install @stellar/stellar-sdk bip39 ed25519-hd-key
```

### ⚙️ Configuration

Modifier ces constantes dans le script :

```js
const PASSPHRASE_24 = "votre phrase mnémonique BIP-39 ici";
const DESTINATION = "adresse_destination_en_Pi";
const NETWORK_URL = "https://api.mainnet.minepi.com";
const NETWORK_PASSPHRASE = "Pi Network";
```

**Description des variables**

- `PASSPHRASE_24` : votre phrase mnémonique de 24 mots.
- `DESTINATION` : adresse Pi destinataire.
- `NETWORK_URL` : URL du nœud Horizon (testnet ou mainnet).
- `NETWORK_PASSPHRASE` : passphrase du réseau (ex. "Pi Network").

### 🛠️ Lancement

```bash
node index.js
```

### 🔍 Fonctionnement (détail)

- **Initialisation (`initKeypair`)** : conversion de la phrase en `seed` via `bip39.mnemonicToSeed()` et dérivation Ed25519 via `ed25519-hd-key` (chemin `m/44'/314159'/0'`).
- **Surveillance (`run`)** : récupération des infos du compte via Horizon, lecture du solde natif, calcul des frais (`fetchBaseFee`) et réserve (ex. 1 Pi). Si solde > réserve + frais, déclenche envoi.
- **Création & soumission de transaction (`createAndSubmitTransaction`)** : construction d’une transaction signée (`TransactionBuilder`) avec opération `payment` vers `DESTINATION`, soumission à Horizon, affichage des hashes et erreurs (XDR inclus).
- **Boucle** : `run` exécuté toutes les 750 ms via `setInterval`.

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

### 📖 Bonnes pratiques

- Toujours tester sur **testnet** avant le mainnet.
- Ne pas réduire l’intervalle `setInterval` (éviter surcharge API).
- Stocker les clés privées de manière sécurisée (offline si possible).
- Comprendre la réserve minimale et les frais avant l’utilisation sur mainnet.

### ⚠️ Limites et remarques

- Dépend du réseau Horizon (latence / limites d’API possibles).
- Boucle de vérification fréquente peut surcharger l’API.
- Si le compte est verrouillé ou insuffisamment approvisionné, la transaction échoue (XDR fourni).

### 📜 Licence

MIT — Utilisation responsable exigée.

---

## 🇬🇧 English

### Description

**Pi/Stellar Auto-Send Wallet Bot (Educational)**  
A Node.js script that:

- Recovers a private and public keypair from a BIP-39 mnemonic phrase.
- Connects to the Pi Network (Horizon API).
- Continuously monitors the wallet balance.
- Automatically sends all available funds (after reserve and fees) to a predefined address.

> **Educational purpose:** understand Ed25519 derivation (m/44'/314159'/0'), Horizon transactions submission, fees, and error handling.

### ⚠️ Ethics and Security Warning

- **Educational use only**: only use with your personal accounts or testnet.
- Any attempt to drain others’ accounts is **illegal**.
- **Never share** your mnemonic or private keys.
- The author disclaims any responsibility for misuse.

### 🚀 Features

- Ed25519 key derivation from mnemonic (BIP-39/BIP-44).
- Automatic connection to a Horizon server (Pi/Stellar).
- Reads native Pi balance.
- Continuous wallet monitoring (750 ms default interval).
- Dynamic calculation of network fees and minimum reserve.
- Automatic fund transfer to a fixed address.
- Detailed logs (public/private key, balances, fees, transaction results).
- Horizon error handling (insufficient balance, locked wallet, etc.).

### 📦 Requirements

- Node.js 18+
- NPM, PNPM, or Yarn

Install dependencies:

```bash
npm install @stellar/stellar-sdk bip39 ed25519-hd-key
```

### ⚙️ Configuration

Edit these constants in the script:

```js
const PASSPHRASE_24 = "your BIP-39 mnemonic here";
const DESTINATION = "destination_address_in_Pi";
const NETWORK_URL = "https://api.mainnet.minepi.com";
const NETWORK_PASSPHRASE = "Pi Network";
```

**Variable description:**

- `PASSPHRASE_24`: your 24-word mnemonic.
- `DESTINATION`: Pi address to send funds to.
- `NETWORK_URL`: Horizon node URL (testnet or mainnet).
- `NETWORK_PASSPHRASE`: network passphrase (e.g. "Pi Network").

### 🛠️ Run

```bash
node index.js
```

### 🔍 Detailed Functionality

- **Initialization (`initKeypair`)**: converts mnemonic to `seed` via `bip39.mnemonicToSeed()`, derives Ed25519 keypair with `ed25519-hd-key` (path `m/44'/314159'/0'`).
- **Monitoring (`run`)**: fetches account info via Horizon, reads Pi balance, calculates fees (`fetchBaseFee`) and reserve (e.g., 1 Pi). If balance > reserve + fees, triggers transfer.
- **Transaction Creation & Submission (`createAndSubmitTransaction`)**: builds signed transaction (`TransactionBuilder`) with a `payment` operation, submits to Horizon, displays hashes and detailed XDR errors.
- **Loop**: `run` executes every 750 ms via `setInterval`.

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

### 📖 Best Practices

- Always test on **testnet** before mainnet.
- Do not reduce `setInterval` timing (to avoid API overload).
- Store private keys securely (preferably offline).
- Understand reserve and fees before mainnet usage.

### ⚠️ Limitations

- Dependent on Horizon network (possible latency / API limits).
- Frequent checks may overload the API.
- Locked or underfunded accounts will fail transactions (XDR provided).

### 📜 License

MIT — Responsible usage required.
