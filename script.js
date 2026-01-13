const CONTRACT_ADDRESS = "0xcC5E38e81F6cC2973CE01E945d45c846CF839aaF";

const CONTRACT_ABI = [
    "function deposit() payable",
    "function balances(address) view returns (uint256)",
    "function getContractBalance() view returns (uint256)"
];

let provider;
let signer;
let contract;

const connectBtn = document.getElementById("connectBtn");
const depositBtn = document.getElementById("depositBtn");
const walletTxt = document.getElementById("walletAddress");
const myBalTxt = document.getElementById("userBalance");
const contractBalTxt = document.getElementById("contractBalance");
const statusText = document.getElementById("statusMsg");
const amountInput = document.getElementById("depositAmount");

connectBtn.onclick = async function () {
    if (!window.ethereum) {
        statusText.innerText = "No MetaMask";
        return;
    }

    statusText.innerText = "Connecting...";

    await window.ethereum.request({ method: "eth_requestAccounts" });

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const a = await signer.getAddress();
    walletTxt.innerText = "Connected: " + a.slice(0, 6) + "..." + a.slice(-4);

    depositBtn.disabled = false;
    connectBtn.innerText = "Connected";

    const bal = await contract.balances(a);
    const total = await provider.getBalance(CONTRACT_ADDRESS);

    myBalTxt.innerText = ethers.formatEther(bal) + " ETH";
    contractBalTxt.innerText = ethers.formatEther(total) + " ETH";

    statusText.innerText = "Ready";
};

depositBtn.onclick = async function () {
    const v = amountInput.value;

    if (!v) {
        statusText.innerText = "Enter amount";
        return;
    }

    statusText.innerText = "Sending...";

    const tx = await contract.deposit({
        value: ethers.parseEther(v)
    });

    await tx.wait();

    statusText.innerText = "Done";

    const addr = await signer.getAddress();
    const bal2 = await contract.balances(addr);
    const total2 = await provider.getBalance(CONTRACT_ADDRESS);

    myBalTxt.innerText = ethers.formatEther(bal2) + " ETH";
    contractBalTxt.innerText = ethers.formatEther(total2) + " ETH";

    amountInput.value = "";
};
