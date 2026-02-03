import { r as reactExports, j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { P as Papa } from "../_libs/papaparse.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";
import "stream";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const creditCards = [
  // ===== CHASE =====
  {
    id: "chase-sapphire-preferred",
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    annualFee: 95,
    categories: [
      { category: "travel", multiplier: 5 },
      { category: "dining", multiplier: 3 },
      { category: "online-grocery", multiplier: 3 },
      { category: "streaming", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1.25
  },
  {
    id: "chase-sapphire-reserve",
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    annualFee: 550,
    categories: [
      { category: "travel", multiplier: 5 },
      { category: "dining", multiplier: 3 },
      { category: "flights", multiplier: 10 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1.5
  },
  {
    id: "chase-freedom-flex",
    name: "Chase Freedom Flex",
    issuer: "Chase",
    annualFee: 0,
    categories: [
      { category: "rotating", multiplier: 5, isRotating: true },
      { category: "travel", multiplier: 5 },
      { category: "dining", multiplier: 3 },
      { category: "drugstores", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  {
    id: "chase-freedom-unlimited",
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    annualFee: 0,
    categories: [
      { category: "travel", multiplier: 5 },
      { category: "dining", multiplier: 3 },
      { category: "drugstores", multiplier: 3 }
    ],
    baseReward: 1.5,
    rewardType: "points",
    pointValue: 1
  },
  {
    id: "chase-ink-preferred",
    name: "Chase Ink Business Preferred",
    issuer: "Chase",
    annualFee: 95,
    categories: [
      { category: "travel", multiplier: 3 },
      { category: "shipping", multiplier: 3 },
      { category: "internet", multiplier: 3 },
      { category: "phone", multiplier: 3 },
      { category: "advertising", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1.25
  },
  {
    id: "chase-ink-cash",
    name: "Chase Ink Business Cash",
    issuer: "Chase",
    annualFee: 0,
    categories: [
      { category: "office-supplies", multiplier: 5 },
      { category: "internet", multiplier: 5 },
      { category: "phone", multiplier: 5 },
      { category: "dining", multiplier: 2 },
      { category: "gas", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  // ===== AMEX =====
  {
    id: "amex-gold",
    name: "Amex Gold Card",
    issuer: "American Express",
    annualFee: 250,
    categories: [
      { category: "dining", multiplier: 4 },
      { category: "groceries", multiplier: 4 },
      { category: "flights", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 2
  },
  {
    id: "amex-platinum",
    name: "Amex Platinum Card",
    issuer: "American Express",
    annualFee: 695,
    categories: [
      { category: "flights", multiplier: 5 },
      { category: "hotels", multiplier: 5 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 2
  },
  {
    id: "amex-blue-cash-preferred",
    name: "Amex Blue Cash Preferred",
    issuer: "American Express",
    annualFee: 95,
    categories: [
      { category: "groceries", multiplier: 6 },
      { category: "streaming", multiplier: 6 },
      { category: "transit", multiplier: 3 },
      { category: "gas", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "amex-blue-cash-everyday",
    name: "Amex Blue Cash Everyday",
    issuer: "American Express",
    annualFee: 0,
    categories: [
      { category: "groceries", multiplier: 3 },
      { category: "gas", multiplier: 3 },
      { category: "online-shopping", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "amex-green",
    name: "Amex Green Card",
    issuer: "American Express",
    annualFee: 150,
    categories: [
      { category: "travel", multiplier: 3 },
      { category: "dining", multiplier: 3 },
      { category: "transit", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 2
  },
  {
    id: "amex-business-gold",
    name: "Amex Business Gold",
    issuer: "American Express",
    annualFee: 375,
    categories: [
      { category: "flights", multiplier: 4 },
      { category: "advertising", multiplier: 4 },
      { category: "shipping", multiplier: 4 },
      { category: "gas", multiplier: 4 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 2
  },
  // ===== CITI =====
  {
    id: "citi-double-cash",
    name: "Citi Double Cash",
    issuer: "Citi",
    annualFee: 0,
    categories: [],
    baseReward: 2,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "citi-custom-cash",
    name: "Citi Custom Cash",
    issuer: "Citi",
    annualFee: 0,
    categories: [
      { category: "dining", multiplier: 5 },
      { category: "groceries", multiplier: 5 },
      { category: "gas", multiplier: 5 },
      { category: "travel", multiplier: 5 },
      { category: "transit", multiplier: 5 },
      { category: "streaming", multiplier: 5 },
      { category: "drugstores", multiplier: 5 },
      { category: "fitness", multiplier: 5 },
      { category: "entertainment", multiplier: 5 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "citi-premier",
    name: "Citi Premier",
    issuer: "Citi",
    annualFee: 95,
    categories: [
      { category: "flights", multiplier: 3 },
      { category: "hotels", multiplier: 3 },
      { category: "dining", multiplier: 3 },
      { category: "groceries", multiplier: 3 },
      { category: "gas", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  {
    id: "citi-strata-premier",
    name: "Citi Strata Premier",
    issuer: "Citi",
    annualFee: 95,
    categories: [
      { category: "flights", multiplier: 10 },
      { category: "hotels", multiplier: 3 },
      { category: "dining", multiplier: 3 },
      { category: "groceries", multiplier: 3 },
      { category: "gas", multiplier: 3 },
      { category: "ev-charging", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  // ===== CAPITAL ONE =====
  {
    id: "capital-one-venture-x",
    name: "Capital One Venture X",
    issuer: "Capital One",
    annualFee: 395,
    categories: [
      { category: "flights", multiplier: 10 },
      { category: "hotels", multiplier: 10 },
      { category: "car-rental", multiplier: 10 }
    ],
    baseReward: 2,
    rewardType: "miles",
    pointValue: 1
  },
  {
    id: "capital-one-venture",
    name: "Capital One Venture",
    issuer: "Capital One",
    annualFee: 95,
    categories: [
      { category: "hotels", multiplier: 5 }
    ],
    baseReward: 2,
    rewardType: "miles",
    pointValue: 1
  },
  {
    id: "capital-one-savor",
    name: "Capital One Savor",
    issuer: "Capital One",
    annualFee: 95,
    categories: [
      { category: "dining", multiplier: 4 },
      { category: "entertainment", multiplier: 4 },
      { category: "streaming", multiplier: 4 },
      { category: "groceries", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "capital-one-savorone",
    name: "Capital One SavorOne",
    issuer: "Capital One",
    annualFee: 0,
    categories: [
      { category: "dining", multiplier: 3 },
      { category: "entertainment", multiplier: 3 },
      { category: "streaming", multiplier: 3 },
      { category: "groceries", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "capital-one-quicksilver",
    name: "Capital One Quicksilver",
    issuer: "Capital One",
    annualFee: 0,
    categories: [],
    baseReward: 1.5,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "capital-one-quicksilver-one",
    name: "Capital One QuicksilverOne",
    issuer: "Capital One",
    annualFee: 39,
    categories: [],
    baseReward: 1.5,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== DISCOVER =====
  {
    id: "discover-it",
    name: "Discover It Cash Back",
    issuer: "Discover",
    annualFee: 0,
    categories: [
      { category: "rotating", multiplier: 5, isRotating: true }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "discover-it-miles",
    name: "Discover It Miles",
    issuer: "Discover",
    annualFee: 0,
    categories: [],
    baseReward: 1.5,
    rewardType: "miles",
    pointValue: 1
  },
  // ===== WELLS FARGO =====
  {
    id: "wells-fargo-active-cash",
    name: "Wells Fargo Active Cash",
    issuer: "Wells Fargo",
    annualFee: 0,
    categories: [],
    baseReward: 2,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "wells-fargo-autograph",
    name: "Wells Fargo Autograph",
    issuer: "Wells Fargo",
    annualFee: 0,
    categories: [
      { category: "dining", multiplier: 3 },
      { category: "travel", multiplier: 3 },
      { category: "gas", multiplier: 3 },
      { category: "transit", multiplier: 3 },
      { category: "streaming", multiplier: 3 },
      { category: "phone", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  {
    id: "wells-fargo-autograph-journey",
    name: "Wells Fargo Autograph Journey",
    issuer: "Wells Fargo",
    annualFee: 95,
    categories: [
      { category: "hotels", multiplier: 5 },
      { category: "flights", multiplier: 4 },
      { category: "dining", multiplier: 3 },
      { category: "transit", multiplier: 3 },
      { category: "gas", multiplier: 3 },
      { category: "streaming", multiplier: 3 },
      { category: "phone", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  // ===== US BANK =====
  {
    id: "us-bank-altitude-go",
    name: "US Bank Altitude Go",
    issuer: "US Bank",
    annualFee: 0,
    categories: [
      { category: "dining", multiplier: 4 },
      { category: "groceries", multiplier: 2 },
      { category: "streaming", multiplier: 2 },
      { category: "gas", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  {
    id: "us-bank-cash-plus",
    name: "US Bank Cash+",
    issuer: "US Bank",
    annualFee: 0,
    categories: [
      { category: "utilities", multiplier: 5 },
      { category: "tv-internet-streaming", multiplier: 5 },
      { category: "cell-phone", multiplier: 5 },
      { category: "gyms", multiplier: 5 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "us-bank-altitude-connect",
    name: "US Bank Altitude Connect",
    issuer: "US Bank",
    annualFee: 95,
    categories: [
      { category: "travel", multiplier: 5 },
      { category: "dining", multiplier: 4 },
      { category: "streaming", multiplier: 2 },
      { category: "groceries", multiplier: 2 },
      { category: "gas", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1
  },
  // ===== BANK OF AMERICA =====
  {
    id: "boa-customized-cash",
    name: "Bank of America Customized Cash",
    issuer: "Bank of America",
    annualFee: 0,
    categories: [
      { category: "dining", multiplier: 3 },
      { category: "groceries", multiplier: 3 },
      { category: "gas", multiplier: 3 },
      { category: "online-shopping", multiplier: 3 },
      { category: "travel", multiplier: 3 },
      { category: "drugstores", multiplier: 3 },
      { category: "home-improvement", multiplier: 3 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  {
    id: "boa-premium-rewards",
    name: "Bank of America Premium Rewards",
    issuer: "Bank of America",
    annualFee: 95,
    categories: [
      { category: "travel", multiplier: 2 },
      { category: "dining", multiplier: 2 }
    ],
    baseReward: 1.5,
    rewardType: "points",
    pointValue: 1
  },
  {
    id: "boa-unlimited-cash",
    name: "Bank of America Unlimited Cash",
    issuer: "Bank of America",
    annualFee: 0,
    categories: [],
    baseReward: 1.5,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== APPLE =====
  {
    id: "apple-card",
    name: "Apple Card",
    issuer: "Apple / Goldman Sachs",
    annualFee: 0,
    categories: [
      { category: "apple", multiplier: 3 },
      { category: "apple-pay", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== AMAZON =====
  {
    id: "amazon-prime-visa",
    name: "Amazon Prime Visa",
    issuer: "Chase",
    annualFee: 0,
    categories: [
      { category: "amazon", multiplier: 5 },
      { category: "whole-foods", multiplier: 5 },
      { category: "dining", multiplier: 2 },
      { category: "gas", multiplier: 2 },
      { category: "transit", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== COSTCO =====
  {
    id: "costco-anywhere-visa",
    name: "Costco Anywhere Visa",
    issuer: "Citi",
    annualFee: 0,
    categories: [
      { category: "gas", multiplier: 4 },
      { category: "dining", multiplier: 3 },
      { category: "travel", multiplier: 3 },
      { category: "costco", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== BARCLAYS =====
  {
    id: "barclays-aadvantage-aviator-red",
    name: "AAdvantage Aviator Red",
    issuer: "Barclays",
    annualFee: 99,
    categories: [
      { category: "american-airlines", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "miles",
    pointValue: 1.4
  },
  // ===== UNITED / CHASE =====
  {
    id: "united-explorer",
    name: "United Explorer Card",
    issuer: "Chase",
    annualFee: 95,
    categories: [
      { category: "united-airlines", multiplier: 2 },
      { category: "dining", multiplier: 2 },
      { category: "hotels", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "miles",
    pointValue: 1.3
  },
  {
    id: "united-quest",
    name: "United Quest Card",
    issuer: "Chase",
    annualFee: 250,
    categories: [
      { category: "united-airlines", multiplier: 3 },
      { category: "dining", multiplier: 3 },
      { category: "hotels", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "miles",
    pointValue: 1.3
  },
  // ===== SOUTHWEST / CHASE =====
  {
    id: "southwest-rapid-rewards-plus",
    name: "Southwest Rapid Rewards Plus",
    issuer: "Chase",
    annualFee: 69,
    categories: [
      { category: "southwest-airlines", multiplier: 2 },
      { category: "hotels", multiplier: 2 },
      { category: "car-rental", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1.4
  },
  {
    id: "southwest-rapid-rewards-priority",
    name: "Southwest Rapid Rewards Priority",
    issuer: "Chase",
    annualFee: 149,
    categories: [
      { category: "southwest-airlines", multiplier: 3 },
      { category: "hotels", multiplier: 2 },
      { category: "car-rental", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1.4
  },
  // ===== DELTA / AMEX =====
  {
    id: "delta-skymiles-gold",
    name: "Delta SkyMiles Gold",
    issuer: "American Express",
    annualFee: 150,
    categories: [
      { category: "delta-airlines", multiplier: 2 },
      { category: "dining", multiplier: 2 },
      { category: "groceries", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "miles",
    pointValue: 1.2
  },
  {
    id: "delta-skymiles-platinum",
    name: "Delta SkyMiles Platinum",
    issuer: "American Express",
    annualFee: 350,
    categories: [
      { category: "delta-airlines", multiplier: 3 },
      { category: "hotels", multiplier: 3 },
      { category: "dining", multiplier: 2 },
      { category: "groceries", multiplier: 2 }
    ],
    baseReward: 1,
    rewardType: "miles",
    pointValue: 1.2
  },
  // ===== MARRIOTT / AMEX =====
  {
    id: "marriott-bonvoy-brilliant",
    name: "Marriott Bonvoy Brilliant",
    issuer: "American Express",
    annualFee: 650,
    categories: [
      { category: "marriott", multiplier: 6 },
      { category: "dining", multiplier: 3 },
      { category: "flights", multiplier: 3 }
    ],
    baseReward: 2,
    rewardType: "points",
    pointValue: 0.8
  },
  {
    id: "marriott-bonvoy-boundless",
    name: "Marriott Bonvoy Boundless",
    issuer: "Chase",
    annualFee: 95,
    categories: [
      { category: "marriott", multiplier: 6 },
      { category: "groceries", multiplier: 3 },
      { category: "dining", multiplier: 3 },
      { category: "gas", multiplier: 3 }
    ],
    baseReward: 2,
    rewardType: "points",
    pointValue: 0.8
  },
  // ===== HILTON / AMEX =====
  {
    id: "hilton-honors-surpass",
    name: "Hilton Honors Surpass",
    issuer: "American Express",
    annualFee: 150,
    categories: [
      { category: "hilton", multiplier: 12 },
      { category: "dining", multiplier: 6 },
      { category: "groceries", multiplier: 6 },
      { category: "gas", multiplier: 6 }
    ],
    baseReward: 3,
    rewardType: "points",
    pointValue: 0.5
  },
  {
    id: "hilton-honors-aspire",
    name: "Hilton Honors Aspire",
    issuer: "American Express",
    annualFee: 550,
    categories: [
      { category: "hilton", multiplier: 14 },
      { category: "dining", multiplier: 7 },
      { category: "flights", multiplier: 7 }
    ],
    baseReward: 3,
    rewardType: "points",
    pointValue: 0.5
  },
  // ===== PAYPAL / SYNCHRONY =====
  {
    id: "paypal-cashback-mastercard",
    name: "PayPal Cashback Mastercard",
    issuer: "Synchrony",
    annualFee: 0,
    categories: [],
    baseReward: 2,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== FIDELITY =====
  {
    id: "fidelity-rewards-visa",
    name: "Fidelity Rewards Visa",
    issuer: "Fidelity / Elan",
    annualFee: 0,
    categories: [],
    baseReward: 2,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== SOFI =====
  {
    id: "sofi-credit-card",
    name: "SoFi Credit Card",
    issuer: "SoFi",
    annualFee: 0,
    categories: [],
    baseReward: 2,
    rewardType: "cashback",
    pointValue: 1
  },
  // ===== BILT =====
  {
    id: "bilt-mastercard",
    name: "Bilt Mastercard",
    issuer: "Bilt / Wells Fargo",
    annualFee: 0,
    categories: [
      { category: "dining", multiplier: 3 },
      { category: "travel", multiplier: 2 },
      { category: "rent", multiplier: 1 }
    ],
    baseReward: 1,
    rewardType: "points",
    pointValue: 1.5
  }
];
function CardSelector({ selectedCards: initialCards, onConfirm }) {
  const [selected, setSelected] = reactExports.useState(
    new Set(initialCards.map((c) => c.id))
  );
  const [search, setSearch] = reactExports.useState("");
  const [filterIssuer, setFilterIssuer] = reactExports.useState("all");
  const issuers = reactExports.useMemo(() => {
    const set = new Set(creditCards.map((c) => c.issuer));
    return ["all", ...Array.from(set).sort()];
  }, []);
  const filteredCards = reactExports.useMemo(() => {
    return creditCards.filter((card) => {
      const matchesSearch = search === "" || card.name.toLowerCase().includes(search.toLowerCase()) || card.issuer.toLowerCase().includes(search.toLowerCase());
      const matchesIssuer = filterIssuer === "all" || card.issuer === filterIssuer;
      return matchesSearch && matchesIssuer;
    });
  }, [search, filterIssuer]);
  const toggleCard = (card) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(card.id)) {
        next.delete(card.id);
      } else {
        next.add(card.id);
      }
      return next;
    });
  };
  const handleConfirm = () => {
    const cards = creditCards.filter((c) => selected.has(c.id));
    onConfirm(cards);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Which cards are in your wallet?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Select all the credit cards you currently have. We'll analyze how well you're using them." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", children: "🔍" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search cards...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: filterIssuer,
          onChange: (e) => setFilterIssuer(e.target.value),
          className: "px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer",
          children: issuers.map((issuer) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: issuer, className: "bg-navy-900", children: issuer === "all" ? "All Issuers" : issuer }, issuer))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-400", children: [
      selected.size,
      " card",
      selected.size !== 1 ? "s" : "",
      " selected"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filteredCards.map((card) => {
      const isSelected = selected.has(card.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          layout: true,
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          onClick: () => toggleCard(card),
          className: `relative text-left p-4 rounded-xl border transition-all duration-200 ${isSelected ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected ? "bg-indigo-500 text-white" : "bg-white/10"}`,
                children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "✓" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white text-sm leading-tight", children: card.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: card.issuer }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300", children: card.rewardType === "cashback" ? `${card.baseReward}% base` : `${card.baseReward}x base` }),
                card.annualFee > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500", children: [
                  "$",
                  card.annualFee,
                  "/yr"
                ] })
              ] }),
              card.categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-indigo-400 mt-2 line-clamp-1", children: card.categories.slice(0, 3).map((c) => `${c.multiplier}x ${c.category}`).join(", ") })
            ] })
          ]
        },
        card.id
      );
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleConfirm,
        disabled: selected.size === 0,
        className: "px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg text-white shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed",
        children: [
          "Continue with ",
          selected.size,
          " Card",
          selected.size !== 1 ? "s" : "",
          " →"
        ]
      }
    ) })
  ] });
}
function FileUpload({ onFileUploaded, onBack }) {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [fileName, setFileName] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const processFile = reactExports.useCallback(
    (file) => {
      setError(null);
      if (!file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (!text || text.trim().length === 0) {
          setError("File appears to be empty");
          return;
        }
        onFileUploaded(text);
      };
      reader.onerror = () => setError("Failed to read file");
      reader.readAsText(file);
    },
    [onFileUploaded]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = reactExports.useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleFileSelect = reactExports.useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Upload your statement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Upload a CSV export from your credit card provider. We support Chase, Amex, Citi, Capital One, Discover, and more." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onClick: () => fileInputRef.current?.click(),
        className: `drop-zone rounded-2xl p-16 text-center cursor-pointer transition-all ${isDragging ? "active" : ""}`,
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: ".csv",
              className: "hidden",
              onChange: handleFileSelect
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "text-6xl mb-4",
              animate: isDragging ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 },
              children: "📄"
            }
          ),
          fileName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-white", children: fileName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mt-1", children: "Processing..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-white mb-2", children: isDragging ? "Drop it here!" : "Drag & drop your CSV file" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "or click to browse your files" })
          ] })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "text-center text-red-400 text-sm bg-red-500/10 rounded-xl p-4",
        children: error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-slate-300 mb-3", children: "Supported formats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["Chase", "Amex", "Citi", "Capital One", "Discover", "Wells Fargo", "Bank of America", "US Bank"].map(
        (bank) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-400 border border-white/5",
            children: bank
          },
          bank
        )
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-3", children: "💡 Most banks let you export transactions as CSV from your online account or app." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onBack,
        className: "text-sm text-slate-400 hover:text-white transition-colors",
        children: "← Back to card selection"
      }
    ) })
  ] });
}
function ProcessingAnimation({ transactionCount }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-40 h-40", children: [
      [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute inset-0 rounded-full border-2 border-indigo-500/30",
          initial: { scale: 0.8, opacity: 0 },
          animate: {
            scale: [0.8, 1.5],
            opacity: [0.6, 0]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }
        },
        i
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute inset-0 flex items-center justify-center",
          animate: { rotate: 360 },
          transition: { duration: 3, repeat: Infinity, ease: "linear" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "📊" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          className: "text-2xl font-bold text-white",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          children: "Analyzing your spending..."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "space-y-2",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessingStep, { text: `Parsing ${transactionCount} transactions`, delay: 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessingStep, { text: "Categorizing merchants", delay: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessingStep, { text: "Calculating optimal rewards", delay: 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessingStep, { text: "Generating your report card", delay: 1.5 })
          ]
        }
      )
    ] })
  ] });
}
function ProcessingStep({ text, delay }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex items-center justify-center gap-2 text-sm text-slate-400",
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay, duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            animate: { opacity: [0.3, 1, 0.3] },
            transition: { duration: 1.5, repeat: Infinity, delay },
            className: "text-indigo-400",
            children: "●"
          }
        ),
        text
      ]
    }
  );
}
const merchantCategoryMap = {
  // ===== DINING / RESTAURANTS =====
  "mcdonald": "dining",
  "burger king": "dining",
  "wendy": "dining",
  "taco bell": "dining",
  "chipotle": "dining",
  "chick-fil-a": "dining",
  "chick fil a": "dining",
  "subway": "dining",
  "starbucks": "dining",
  "dunkin": "dining",
  "panera": "dining",
  "domino": "dining",
  "pizza hut": "dining",
  "papa john": "dining",
  "olive garden": "dining",
  "applebee": "dining",
  "chili": "dining",
  "outback": "dining",
  "red lobster": "dining",
  "ihop": "dining",
  "denny": "dining",
  "waffle house": "dining",
  "five guys": "dining",
  "shake shack": "dining",
  "panda express": "dining",
  "popeye": "dining",
  "jack in the box": "dining",
  "sonic drive": "dining",
  "arby": "dining",
  "wingstop": "dining",
  "buffalo wild wings": "dining",
  "cracker barrel": "dining",
  "cheesecake factory": "dining",
  "ruth chris": "dining",
  "texas roadhouse": "dining",
  "longhorn steakhouse": "dining",
  "red robin": "dining",
  "bob evans": "dining",
  "golden corral": "dining",
  "cava": "dining",
  "sweetgreen": "dining",
  "noodles": "dining",
  "qdoba": "dining",
  "jersey mike": "dining",
  "firehouse sub": "dining",
  "jimmy john": "dining",
  "jason deli": "dining",
  "zaxby": "dining",
  "raising cane": "dining",
  "whataburger": "dining",
  "in-n-out": "dining",
  "culver": "dining",
  "dairy queen": "dining",
  "baskin": "dining",
  "cold stone": "dining",
  "krispy kreme": "dining",
  "doordash": "dining",
  "uber eats": "dining",
  "ubereats": "dining",
  "grubhub": "dining",
  "postmates": "dining",
  "seamless": "dining",
  "caviar": "dining",
  "restaurant": "dining",
  "grill": "dining",
  "bistro": "dining",
  "cafe": "dining",
  "pizzeria": "dining",
  "sushi": "dining",
  "ramen": "dining",
  "thai": "dining",
  "pho": "dining",
  "diner": "dining",
  "steakhouse": "dining",
  "tavern": "dining",
  "pub": "dining",
  "bar and grill": "dining",
  // ===== GROCERIES =====
  "walmart grocery": "groceries",
  "kroger": "groceries",
  "safeway": "groceries",
  "albertsons": "groceries",
  "publix": "groceries",
  "h-e-b": "groceries",
  "heb": "groceries",
  "whole foods": "groceries",
  "trader joe": "groceries",
  "aldi": "groceries",
  "lidl": "groceries",
  "food lion": "groceries",
  "giant": "groceries",
  "stop & shop": "groceries",
  "stop and shop": "groceries",
  "wegmans": "groceries",
  "meijer": "groceries",
  "winco": "groceries",
  "sprouts": "groceries",
  "fresh market": "groceries",
  "piggly wiggly": "groceries",
  "harris teeter": "groceries",
  "food city": "groceries",
  "shoprite": "groceries",
  "acme markets": "groceries",
  "hannaford": "groceries",
  "market basket": "groceries",
  "price chopper": "groceries",
  "instacart": "groceries",
  "fresh direct": "groceries",
  "peapod": "groceries",
  "grocery": "groceries",
  "supermarket": "groceries",
  // ===== GAS / FUEL =====
  "shell": "gas",
  "exxon": "gas",
  "mobil": "gas",
  "chevron": "gas",
  "bp": "gas",
  "texaco": "gas",
  "citgo": "gas",
  "marathon": "gas",
  "sunoco": "gas",
  "valero": "gas",
  "phillips 66": "gas",
  "conoco": "gas",
  "circle k": "gas",
  "speedway": "gas",
  "wawa": "gas",
  "sheetz": "gas",
  "racetrac": "gas",
  "quiktrip": "gas",
  "casey": "gas",
  "pilot": "gas",
  "loves travel": "gas",
  "flying j": "gas",
  "buc-ee": "gas",
  "fuel": "gas",
  "gas station": "gas",
  "petroleum": "gas",
  // ===== TRAVEL =====
  "expedia": "travel",
  "booking.com": "travel",
  "hotels.com": "travel",
  "priceline": "travel",
  "kayak": "travel",
  "orbitz": "travel",
  "travelocity": "travel",
  "hotwire": "travel",
  "tripadvisor": "travel",
  "vrbo": "travel",
  "airbnb": "travel",
  // ===== FLIGHTS / AIRLINES =====
  "american airlines": "flights",
  "delta air": "flights",
  "united air": "flights",
  "southwest air": "flights",
  "jetblue": "flights",
  "alaska air": "flights",
  "spirit air": "flights",
  "frontier air": "flights",
  "hawaiian air": "flights",
  "allegiant": "flights",
  "british airways": "flights",
  "air france": "flights",
  "lufthansa": "flights",
  "emirates": "flights",
  "airline": "flights",
  // ===== HOTELS =====
  "marriott": "hotels",
  "hilton": "hotels",
  "hyatt": "hotels",
  "ihg": "hotels",
  "holiday inn": "hotels",
  "best western": "hotels",
  "wyndham": "hotels",
  "choice hotel": "hotels",
  "radisson": "hotels",
  "sheraton": "hotels",
  "westin": "hotels",
  "w hotel": "hotels",
  "ritz carlton": "hotels",
  "four seasons": "hotels",
  "hampton inn": "hotels",
  "courtyard": "hotels",
  "residence inn": "hotels",
  "fairfield": "hotels",
  "doubletree": "hotels",
  "embassy suites": "hotels",
  "hotel": "hotels",
  "motel": "hotels",
  "lodging": "hotels",
  // ===== STREAMING =====
  "netflix": "streaming",
  "hulu": "streaming",
  "disney+": "streaming",
  "disney plus": "streaming",
  "hbo max": "streaming",
  "max.com": "streaming",
  "apple tv": "streaming",
  "amazon prime video": "streaming",
  "paramount+": "streaming",
  "paramount plus": "streaming",
  "peacock": "streaming",
  "youtube premium": "streaming",
  "youtube music": "streaming",
  "spotify": "streaming",
  "apple music": "streaming",
  "pandora": "streaming",
  "tidal": "streaming",
  "audible": "streaming",
  "crunchyroll": "streaming",
  "fubo": "streaming",
  "sling": "streaming",
  "dazn": "streaming",
  // ===== TRANSIT =====
  "uber": "transit",
  "lyft": "transit",
  "metro": "transit",
  "subway fare": "transit",
  "bus fare": "transit",
  "train fare": "transit",
  "amtrak": "transit",
  "bart": "transit",
  "mta": "transit",
  "cta": "transit",
  "wmata": "transit",
  "toll": "transit",
  "ez pass": "transit",
  "parking": "transit",
  "lime scooter": "transit",
  "bird scooter": "transit",
  // ===== CAR RENTAL =====
  "hertz": "car-rental",
  "avis": "car-rental",
  "enterprise": "car-rental",
  "national car": "car-rental",
  "budget car": "car-rental",
  "alamo": "car-rental",
  "sixt": "car-rental",
  "turo": "car-rental",
  "zipcar": "car-rental",
  // ===== AMAZON =====
  "amazon.com": "amazon",
  "amazon prime": "amazon",
  "amzn": "amazon",
  "amazon mktp": "amazon",
  "amazon marke": "amazon",
  // ===== ONLINE SHOPPING =====
  "walmart.com": "online-shopping",
  "target.com": "online-shopping",
  "ebay": "online-shopping",
  "etsy": "online-shopping",
  "wayfair": "online-shopping",
  "overstock": "online-shopping",
  "zappos": "online-shopping",
  "nordstrom": "online-shopping",
  "macys.com": "online-shopping",
  "best buy": "online-shopping",
  "newegg": "online-shopping",
  // ===== DRUGSTORES =====
  "cvs": "drugstores",
  "walgreens": "drugstores",
  "rite aid": "drugstores",
  "pharmacy": "drugstores",
  "duane reade": "drugstores",
  // ===== ENTERTAINMENT =====
  "amc theatre": "entertainment",
  "regal cinema": "entertainment",
  "cinemark": "entertainment",
  "fandango": "entertainment",
  "ticketmaster": "entertainment",
  "stubhub": "entertainment",
  "seatgeek": "entertainment",
  "live nation": "entertainment",
  "dave & buster": "entertainment",
  "topgolf": "entertainment",
  "bowling": "entertainment",
  "arcade": "entertainment",
  "museum": "entertainment",
  "zoo": "entertainment",
  "aquarium": "entertainment",
  "theme park": "entertainment",
  "disney world": "entertainment",
  "disneyland": "entertainment",
  "universal studios": "entertainment",
  "six flags": "entertainment",
  "cedar point": "entertainment",
  "xbox": "entertainment",
  "playstation": "entertainment",
  "nintendo": "entertainment",
  "steam": "entertainment",
  "epic games": "entertainment",
  // ===== FITNESS =====
  "planet fitness": "fitness",
  "equinox": "fitness",
  "orangetheory": "fitness",
  "anytime fitness": "fitness",
  "la fitness": "fitness",
  "crunch gym": "fitness",
  "ymca": "fitness",
  "peloton": "fitness",
  "crossfit": "fitness",
  "gym": "fitness",
  // ===== PHONE / INTERNET =====
  "verizon": "phone",
  "at&t": "phone",
  "att": "phone",
  "t-mobile": "phone",
  "tmobile": "phone",
  "sprint": "phone",
  "xfinity": "internet",
  "comcast": "internet",
  "spectrum": "internet",
  "cox": "internet",
  "frontier comm": "internet",
  "centurylink": "internet",
  // ===== UTILITIES =====
  "electric": "utilities",
  "power company": "utilities",
  "water utility": "utilities",
  "gas utility": "utilities",
  "sewer": "utilities",
  "trash collection": "utilities",
  // ===== HOME IMPROVEMENT =====
  "home depot": "home-improvement",
  "lowe": "home-improvement",
  "menards": "home-improvement",
  "ace hardware": "home-improvement",
  "true value": "home-improvement",
  // ===== COSTCO =====
  "costco": "costco",
  // ===== OFFICE SUPPLIES =====
  "staples": "office-supplies",
  "office depot": "office-supplies",
  "office max": "office-supplies",
  // ===== SHIPPING =====
  "fedex": "shipping",
  "ups": "shipping",
  "usps": "shipping",
  "dhl": "shipping",
  // ===== RENT =====
  "rent payment": "rent",
  "apartment rent": "rent",
  "zelle rent": "rent"
};
const categoryKeywords = {
  dining: ["restaurant", "food", "eat", "kitchen", "grill", "bbq", "wok", "noodle", "burger", "pizza", "taco", "wing", "brew"],
  groceries: ["grocery", "market", "food store", "fresh", "organic"],
  gas: ["gas", "fuel", "petro", "service station"],
  travel: ["travel", "tour", "vacation"],
  flights: ["airline", "air line", "airways", "flight"],
  hotels: ["hotel", "resort", "inn", "lodge", "suites"],
  streaming: ["stream", "subscription", "digital media"],
  transit: ["transit", "transport", "cab", "ride"],
  entertainment: ["theater", "theatre", "cinema", "concert", "show", "event", "ticket", "game"],
  drugstores: ["drug", "pharma", "rx"],
  fitness: ["fitness", "gym", "workout", "health club"]
};
function categorizeTransaction(description) {
  const lower = description.toLowerCase().trim();
  for (const [merchant, category] of Object.entries(merchantCategoryMap)) {
    if (lower.includes(merchant)) {
      return category;
    }
  }
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return category;
      }
    }
  }
  return "uncategorized";
}
const categoryLabels = {
  "dining": "Dining & Restaurants",
  "groceries": "Groceries",
  "gas": "Gas & Fuel",
  "travel": "Travel",
  "flights": "Flights",
  "hotels": "Hotels",
  "streaming": "Streaming",
  "transit": "Transit & Rideshare",
  "car-rental": "Car Rental",
  "entertainment": "Entertainment",
  "drugstores": "Drugstores",
  "fitness": "Fitness",
  "phone": "Phone",
  "internet": "Internet",
  "utilities": "Utilities",
  "home-improvement": "Home Improvement",
  "office-supplies": "Office Supplies",
  "shipping": "Shipping",
  "online-shopping": "Online Shopping",
  "amazon": "Amazon",
  "costco": "Costco",
  "whole-foods": "Whole Foods",
  "apple": "Apple",
  "apple-pay": "Apple Pay",
  "rent": "Rent",
  "uncategorized": "Uncategorized"
};
function getCategoryLabel(category) {
  return categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");
}
function getRewardRate(card, category) {
  for (const catReward of card.categories) {
    if (catReward.category === category) {
      return catReward.multiplier * card.pointValue / 100;
    }
  }
  return card.baseReward * card.pointValue / 100;
}
function findOptimalCard(cards, category) {
  let bestCard = cards[0];
  let bestRate = 0;
  for (const card of cards) {
    const rate = getRewardRate(card, category);
    if (rate > bestRate) {
      bestRate = rate;
      bestCard = card;
    }
  }
  return { card: bestCard, rate: bestRate };
}
function getGrade(score) {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 85) return "B+";
  if (score >= 80) return "B";
  if (score >= 75) return "C+";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
function getGradeColor(grade) {
  switch (grade) {
    case "A+":
      return "#22c55e";
    case "A":
      return "#4ade80";
    case "B+":
      return "#a3e635";
    case "B":
      return "#facc15";
    case "C+":
      return "#fb923c";
    case "C":
      return "#f97316";
    case "D":
      return "#ef4444";
    case "F":
      return "#dc2626";
    default:
      return "#94a3b8";
  }
}
function scoreTransactions(transactions, userCards, assignedCardId) {
  if (userCards.length === 0 || transactions.length === 0) {
    return {
      efficiencyScore: 0,
      grade: "F",
      totalSpend: 0,
      totalActualReward: 0,
      totalOptimalReward: 0,
      totalMissedReward: 0,
      scoredTransactions: [],
      categoryBreakdown: [],
      cardUsage: [],
      topMisses: []
    };
  }
  const actualCard = userCards[0];
  const scoredTransactions = [];
  const categoryMap = /* @__PURE__ */ new Map();
  const cardUsageMap = /* @__PURE__ */ new Map();
  let totalActualReward = 0;
  let totalOptimalReward = 0;
  let totalSpend = 0;
  for (const tx of transactions) {
    const category = tx.category || categorizeTransaction(tx.description);
    const actualRate = getRewardRate(actualCard, category);
    const actualReward = tx.amount * actualRate;
    const { card: optimalCard, rate: optimalRate } = findOptimalCard(userCards, category);
    const optimalReward = tx.amount * optimalRate;
    const missed = optimalReward - actualReward;
    totalActualReward += actualReward;
    totalOptimalReward += optimalReward;
    totalSpend += tx.amount;
    scoredTransactions.push({
      transaction: tx,
      assignedCategory: category,
      actualCard,
      actualReward,
      optimalCard,
      optimalReward,
      missedReward: missed
    });
    const existing = categoryMap.get(category) || {
      category,
      totalSpend: 0,
      actualReward: 0,
      optimalReward: 0,
      missedReward: 0,
      transactionCount: 0
    };
    existing.totalSpend += tx.amount;
    existing.actualReward += actualReward;
    existing.optimalReward += optimalReward;
    existing.missedReward += missed;
    existing.transactionCount += 1;
    categoryMap.set(category, existing);
    const cardKey = actualCard.id;
    const cardUsage2 = cardUsageMap.get(cardKey) || {
      card: actualCard,
      totalSpend: 0,
      totalReward: 0,
      transactionCount: 0
    };
    cardUsage2.totalSpend += tx.amount;
    cardUsage2.totalReward += actualReward;
    cardUsage2.transactionCount += 1;
    cardUsageMap.set(cardKey, cardUsage2);
  }
  const efficiencyScore = totalOptimalReward > 0 ? Math.round(totalActualReward / totalOptimalReward * 100) : 100;
  const grade = getGrade(efficiencyScore);
  const categoryBreakdown = Array.from(categoryMap.values()).sort(
    (a, b) => b.missedReward - a.missedReward
  );
  const topMisses = [...scoredTransactions].sort((a, b) => b.missedReward - a.missedReward).slice(0, 5);
  const cardUsage = Array.from(cardUsageMap.values()).sort(
    (a, b) => b.totalSpend - a.totalSpend
  );
  return {
    efficiencyScore,
    grade,
    totalSpend,
    totalActualReward,
    totalOptimalReward,
    totalMissedReward: totalOptimalReward - totalActualReward,
    scoredTransactions,
    categoryBreakdown,
    cardUsage,
    topMisses
  };
}
function CategoryBreakdown({ categories }) {
  const chartData = categories.filter((c) => c.totalSpend > 0).slice(0, 10).map((c) => ({
    name: getCategoryLabel(c.category),
    actual: parseFloat(c.actualReward.toFixed(2)),
    optimal: parseFloat(c.optimalReward.toFixed(2)),
    spend: parseFloat(c.totalSpend.toFixed(2))
  }));
  if (chartData.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-6", children: "Category Breakdown" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data: chartData,
        margin: { top: 5, right: 10, left: 0, bottom: 60 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.05)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: { fill: "#94a3b8", fontSize: 11 },
              angle: -45,
              textAnchor: "end",
              height: 80
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fill: "#94a3b8", fontSize: 12 },
              tickFormatter: (v) => `$${v}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                backgroundColor: "#1e1b4b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#e2e8f0"
              },
              formatter: (value) => [`$${value.toFixed(2)}`, void 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Legend,
            {
              wrapperStyle: { color: "#94a3b8", paddingTop: "10px" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "actual",
              name: "Rewards Earned",
              fill: "#6366f1",
              radius: [4, 4, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "optimal",
              name: "Optimal Rewards",
              fill: "#22c55e",
              radius: [4, 4, 0, 0]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-slate-400 border-b border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2", children: "Spent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2", children: "Earned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2", children: "Optimal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pl-2", children: "Missed" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: categories.filter((c) => c.totalSpend > 0).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-white/5 hover:bg-white/5 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-white", children: getCategoryLabel(cat.category) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-2 text-right text-slate-300", children: [
              "$",
              cat.totalSpend.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-2 text-right text-indigo-400", children: [
              "$",
              cat.actualReward.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-2 text-right text-green-400", children: [
              "$",
              cat.optimalReward.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 pl-2 text-right text-red-400", children: [
              "$",
              cat.missedReward.toFixed(2)
            ] })
          ]
        },
        cat.category
      )) })
    ] }) })
  ] });
}
function TransactionTable({ title, transactions }) {
  if (transactions.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-4", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-slate-400 border-b border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2", children: "Used" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2", children: "Should've Used" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pl-2", children: "Missed" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: transactions.map((st, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-white/5 hover:bg-white/5 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-white max-w-[200px] truncate", children: st.transaction.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-white/5 text-xs", children: getCategoryLabel(st.assignedCategory) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-2 text-right text-slate-300", children: [
              "$",
              st.transaction.amount.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 text-slate-400 text-xs max-w-[120px] truncate", children: st.actualCard?.name || "N/A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 text-indigo-400 text-xs max-w-[120px] truncate", children: st.optimalCard.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 pl-2 text-right text-red-400 font-semibold", children: [
              "$",
              st.missedReward.toFixed(2)
            ] })
          ]
        },
        i
      )) })
    ] }) })
  ] });
}
function ShareScore({ result }) {
  const [copied, setCopied] = reactExports.useState(false);
  const shareText = `🎯 My Credit Card Rewards Score: ${result.grade} (${result.efficiencyScore}%)
💰 I left $${result.totalMissedReward.toFixed(2)} on the table!
📊 Analyzed ${result.scoredTransactions.length} transactions across ${result.categoryBreakdown.length} categories.

Check your score at pointscorer.app`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: handleCopy,
      className: "px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          children: "✓ Copied!"
        },
        "copied"
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          children: "📋 Share Your Score"
        },
        "share"
      ) })
    }
  );
}
const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#c084fc",
  "#d8b4fe",
  "#818cf8",
  "#a78bfa",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6"
];
function CardUsageChart({ cardUsage }) {
  const data = cardUsage.map((cu) => ({
    name: cu.card.name,
    value: parseFloat(cu.totalSpend.toFixed(2)),
    transactions: cu.transactionCount,
    reward: parseFloat(cu.totalReward.toFixed(2))
  }));
  if (data.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-6", children: "Card Usage" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-1/2 h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Pie,
          {
            data,
            cx: "50%",
            cy: "50%",
            innerRadius: 70,
            outerRadius: 120,
            dataKey: "value",
            stroke: "none",
            children: data.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Cell,
              {
                fill: COLORS[i % COLORS.length]
              },
              `cell-${i}`
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: {
              backgroundColor: "#1e1b4b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#e2e8f0"
            },
            formatter: (value) => [`$${value.toFixed(2)}`, "Spend"]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-1/2 space-y-3", children: data.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-3 h-3 rounded-full shrink-0",
            style: { backgroundColor: COLORS[i % COLORS.length] }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white truncate", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
            item.transactions,
            " txn",
            item.transactions !== 1 ? "s" : "",
            " • $",
            item.value.toFixed(2),
            " spent • $",
            item.reward.toFixed(2),
            " ",
            "earned"
          ] })
        ] })
      ] }, item.name)) })
    ] })
  ] });
}
function ReportCard({ result, onReset }) {
  const gradeColor = getGradeColor(result.grade);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "glass-strong rounded-3xl p-12 text-center glow-strong",
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5, type: "spring", stiffness: 200 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-sm uppercase tracking-widest text-slate-400 mb-4",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.3 },
              children: "Your Rewards Efficiency Score"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "grade-glow mb-6",
              style: { color: gradeColor },
              initial: { scale: 0, rotate: -20 },
              animate: { scale: 1, rotate: 0 },
              transition: { delay: 0.4, duration: 0.5, type: "spring", stiffness: 300 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[120px] md:text-[160px] font-black leading-none", children: result.grade })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-5xl font-bold text-white mb-2",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6 },
              children: [
                result.efficiencyScore,
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-slate-400 text-lg",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.7 },
              children: "efficiency score"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "grid grid-cols-2 md:grid-cols-4 gap-4",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.8 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Spent",
              value: `$${result.totalSpend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              color: "text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Rewards Earned",
              value: `$${result.totalActualReward.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              color: "text-green-400"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Optimal Rewards",
              value: `$${result.totalOptimalReward.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              color: "text-indigo-400"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Left on Table",
              value: `$${result.totalMissedReward.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              color: "text-red-400",
              highlight: true
            }
          )
        ]
      }
    ),
    result.totalMissedReward > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "glass rounded-2xl p-6 text-center border-red-500/20",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-slate-300", children: [
          "You left",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-red-400", children: [
            "$",
            result.totalMissedReward.toFixed(2)
          ] }),
          " ",
          "on the table by not using the optimal card for each purchase."
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 1.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBreakdown, { categories: result.categoryBreakdown })
      }
    ),
    result.cardUsage.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 1.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardUsageChart, { cardUsage: result.cardUsage })
      }
    ),
    result.topMisses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 1.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TransactionTable,
          {
            title: "Top 5 Biggest Misses",
            transactions: result.topMisses
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col sm:flex-row gap-4 justify-center items-center pt-4",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 1.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShareScore, { result }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onReset,
              className: "px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all",
              children: "Start Over"
            }
          )
        ]
      }
    )
  ] });
}
function StatCard({
  label,
  value,
  color,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `glass rounded-xl p-4 text-center ${highlight ? "border-red-500/20 bg-red-500/5" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mb-1", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold ${color}`, children: value })
      ]
    }
  );
}
const datePatterns = ["date", "transaction date", "trans date", "post date", "posting date", "trans_date"];
const descriptionPatterns = ["description", "merchant", "name", "memo", "transaction description", "merchant name", "payee"];
const amountPatterns = ["amount", "debit", "charge", "transaction amount", "debit amount"];
const creditPatterns = ["credit", "payment", "credit amount"];
const categoryPatterns = ["category", "type", "transaction type", "merchant category"];
function findColumn(headers, patterns) {
  const normalized = headers.map((h) => h.toLowerCase().trim());
  for (const pattern of patterns) {
    const idx = normalized.indexOf(pattern);
    if (idx !== -1) return headers[idx];
  }
  for (const pattern of patterns) {
    const idx = normalized.findIndex((h) => h.includes(pattern));
    if (idx !== -1) return headers[idx];
  }
  return null;
}
function parseAmount(value) {
  if (!value) return 0;
  const cleaned = value.replace(/[$,\s]/g, "").replace(/\((.+)\)/, "-$1");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}
function parseDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split("T")[0];
  }
  return value;
}
function parseCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim()
  });
  if (!result.data || result.data.length === 0) return [];
  const headers = result.meta.fields || [];
  const dateCol = findColumn(headers, datePatterns);
  const descCol = findColumn(headers, descriptionPatterns);
  const amountCol = findColumn(headers, amountPatterns);
  const creditCol = findColumn(headers, creditPatterns);
  const categoryCol = findColumn(headers, categoryPatterns);
  if (!descCol) {
    if (headers.length >= 2) {
      return parseWithPositionalColumns(result.data, headers);
    }
    return [];
  }
  const transactions = [];
  for (const row of result.data) {
    const description = row[descCol]?.trim();
    if (!description) continue;
    let amount = 0;
    if (amountCol) {
      amount = parseAmount(row[amountCol]);
    }
    if (creditCol && row[creditCol]) {
      const credit = parseAmount(row[creditCol]);
      if (credit > 0 && amount === 0) {
        continue;
      }
    }
    amount = Math.abs(amount);
    if (amount === 0) continue;
    const date = dateCol ? parseDate(row[dateCol]) : "";
    const category = categoryCol ? row[categoryCol]?.trim() : void 0;
    transactions.push({
      date,
      description,
      amount,
      category: category || void 0
    });
  }
  return transactions;
}
function parseWithPositionalColumns(data, headers) {
  const transactions = [];
  for (const row of data) {
    const values = headers.map((h) => row[h]?.trim() || "");
    let amountIdx = -1;
    let descIdx = -1;
    let dateIdx = -1;
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      if (amountIdx === -1 && /^-?[\$]?[\d,]+\.?\d*$/.test(val.replace(/\s/g, ""))) {
        amountIdx = i;
      } else if (dateIdx === -1 && /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(val)) {
        dateIdx = i;
      }
    }
    if (dateIdx !== -1) {
      descIdx = dateIdx + 1;
    } else {
      descIdx = 0;
    }
    if (amountIdx === -1 || descIdx === amountIdx) continue;
    const amount = Math.abs(parseAmount(values[amountIdx]));
    if (amount === 0) continue;
    transactions.push({
      date: dateIdx !== -1 ? parseDate(values[dateIdx]) : "",
      description: values[descIdx],
      amount
    });
  }
  return transactions;
}
const steps = [{
  id: "select-cards",
  label: "Select Cards",
  num: 1
}, {
  id: "upload",
  label: "Upload Statement",
  num: 2
}, {
  id: "processing",
  label: "Processing",
  num: 3
}, {
  id: "results",
  label: "Results",
  num: 4
}];
function ScorePage() {
  const [currentStep, setCurrentStep] = reactExports.useState("select-cards");
  const [selectedCards, setSelectedCards] = reactExports.useState([]);
  const [transactions, setTransactions] = reactExports.useState([]);
  const [result, setResult] = reactExports.useState(null);
  const handleCardsSelected = reactExports.useCallback((cards) => {
    setSelectedCards(cards);
    setCurrentStep("upload");
  }, []);
  const handleFileUploaded = reactExports.useCallback((csvText) => {
    const parsed = parseCSV(csvText);
    setTransactions(parsed);
    setCurrentStep("processing");
    setTimeout(() => {
      const scoreResult = scoreTransactions(parsed, selectedCards);
      setResult(scoreResult);
      setCurrentStep("results");
    }, 2500);
  }, [selectedCards]);
  const handleReset = reactExports.useCallback(() => {
    setCurrentStep("select-cards");
    setSelectedCards([]);
    setTransactions([]);
    setResult(null);
  }, []);
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "text-center mb-8", initial: {
      opacity: 0,
      y: -20
    }, animate: {
      opacity: 1,
      y: 0
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent", children: "Point Scorer" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-12", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${i <= currentStepIndex ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "bg-white/10 text-slate-500"}`, children: step.num }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-2 text-sm hidden sm:inline ${i <= currentStepIndex ? "text-white" : "text-slate-500"}`, children: step.label }),
      i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 sm:w-16 h-0.5 mx-2 transition-all duration-500 ${i < currentStepIndex ? "bg-indigo-600" : "bg-white/10"}` })
    ] }, step.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      currentStep === "select-cards" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: 50
      }, animate: {
        opacity: 1,
        x: 0
      }, exit: {
        opacity: 0,
        x: -50
      }, transition: {
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardSelector, { selectedCards, onConfirm: handleCardsSelected }) }, "select-cards"),
      currentStep === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: 50
      }, animate: {
        opacity: 1,
        x: 0
      }, exit: {
        opacity: 0,
        x: -50
      }, transition: {
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileUpload, { onFileUploaded: handleFileUploaded, onBack: () => setCurrentStep("select-cards") }) }, "upload"),
      currentStep === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        scale: 0.9
      }, animate: {
        opacity: 1,
        scale: 1
      }, exit: {
        opacity: 0,
        scale: 0.9
      }, transition: {
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessingAnimation, { transactionCount: transactions.length }) }, "processing"),
      currentStep === "results" && result && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, exit: {
        opacity: 0,
        y: -30
      }, transition: {
        duration: 0.5
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportCard, { result, onReset: handleReset }) }, "results")
    ] })
  ] }) });
}
export {
  ScorePage as component
};
