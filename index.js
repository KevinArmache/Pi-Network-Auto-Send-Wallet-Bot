import StellarSdk from "@stellar/stellar-sdk";
import bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";

const PASSPHRASE_24 =
  "shadow coral cousin spend grab jealous day valid mad ball oyster unfair sauce punch push shadow coral cousin spend grab jealous day valid beyond knife spray chicken online wide tumble visit sweet";

const DESTINATION =
  "MALYJFJ5SVD45FBWN2GT4IW67SEZ3IBOFSBSPUFCWV427NBNLG3PWAAAAAAAAIAGP5T26";

const NETWORK_URL = "https://api.mainnet.minepi.com";
const NETWORK_PASSPHRASE = "Pi Network";

const server = new StellarSdk.Horizon.Server(NETWORK_URL);

let isRunning = false;
let keypair = null;
let publicKey = null;

export async function initKeypair() {
  console.log("\n==================== INITIALISATION ====================");

  const seed = await bip39.mnemonicToSeed(PASSPHRASE_24);
  const { key } = derivePath("m/44'/314159'/0'", seed);
  keypair = StellarSdk.Keypair.fromRawEd25519Seed(key);
  publicKey = keypair.publicKey();

  console.log("🔐 Clé privée :", keypair.secret());
  console.log("🔑 Clé publique :", publicKey);
  console.log("========================================================\n");
}

export async function getAccountBalance(account) {
  const nativeBalance = account.balances.find(
    (b) => b.asset_type === "native"
  )?.balance;
  return parseFloat(nativeBalance || "0");
}

async function createAndSubmitTransaction(account, amountToSend, fee) {
  console.log("\n----- 🚀 Création et soumission de la transaction -----");

  const transaction = new StellarSdk.TransactionBuilder(account, {
    fee: fee.toString(),
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: DESTINATION,
        asset: StellarSdk.Asset.native(),
        amount: amountToSend.toFixed(7),
      })
    )
    .setTimeout(30)
    .build();

  transaction.sign(keypair);

  try {
    const result = await server.submitTransaction(transaction);

    if (result?.hash) {
      console.log("✅ Transaction réussie !");
      console.log("🔗 Hash :", result.hash);
    } else {
      console.log("🔒 Le wallet est verrouillé ou le solde est insuffisant.");
      console.log(result);
    }
  } catch (err) {
    const data = err?.response?.data;
    const codes = data?.extras?.result_codes;

    console.error("\n❌ La transaction a été rejetée !");
    console.log("📡 Status HTTP :", data?.status || "Inconnu");
    console.log("📛 Type        :", data?.type || "Non précisé");
    console.log("🧨 Titre       :", data?.title || "Non précisé");
    console.log("🔎 Détail      :", data?.detail || "Pas de détail");

    if (codes) {
      console.log("📛 Codes Horizon :", codes);

      if (
        codes.operations?.includes("op_underfunded") ||
        codes.transaction === "tx_failed"
      ) {
        console.log(
          "🔒 Explication : le wallet est verrouillé ou le solde est insuffisant."
        );
      }
    }

    console.log(
      "✉️ Envelope XDR :",
      data?.extras?.envelope_xdr || "(non fourni)"
    );
    console.log(
      "📦 Result XDR   :",
      data?.extras?.result_xdr || "(non fourni)"
    );
    console.log("--------------------------------------------\n");
  }
}
async function run() {
  if (isRunning) return;
  isRunning = true;

  try {
    console.log("====== ⏱️ Nouvelle exécution ======");

    const [account, baseFee] = await Promise.all([
      server.loadAccount(publicKey),
      server.fetchBaseFee(),
    ]);

    const balance = await getAccountBalance(account);
    const feeInPi = baseFee / 1e7;

    console.log("💰 Solde Pi        :", balance.toFixed(7));
    console.log("💸 Frais réseau     :", feeInPi.toFixed(7), "Pi");

    const minReserve = 1.0; // solde minimum requis
    const amountToSend = balance - feeInPi - minReserve;

    if (amountToSend <= 0) {
      console.log(
        "⛔ Solde insuffisant pour envoyer après réserve minimale de 1 Pi."
      );
    } else {
      console.log("📤 Montant à envoyer :", amountToSend.toFixed(7), "Pi");
      await createAndSubmitTransaction(account, amountToSend, baseFee);
    }

    console.log("=====================================\n");
  } catch (err) {
    console.error("❌ Erreur :", err.message || err);
  } finally {
    isRunning = false;
  }
}

// Lancement du process
(async () => {
  await initKeypair();
  setInterval(run, 750);
})();
