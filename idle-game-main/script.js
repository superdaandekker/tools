const SAVE_KEYS = ["moneyTapperSaveV3"];
const PRIMARY_SAVE_KEY = SAVE_KEYS[0];
const SAVE_VERSION = 3;

// Edit starting values here.
const DEFAULT_STATE = {
    version: SAVE_VERSION,
    money: 0,
    totalEarned: 0,
    lifetimeEarned: 0,
    totalClicks: 0,
    clickValue: 1,
    baseClickValue: 1,
    moneyPerSecond: 0,
    bestMoneyPerSecond: 0,
    prestigePoints: 0,
    totalPrestiges: 0,
    prestigeBonus: 1,
    lastTickTime: Date.now(),
    lastSaveTime: 0,
    clickFeedback: "Tap the button to get started.",
    soundEnabled: false,
    activeTab: "shop",
    shopFilter: "all",
    buyAmount: "1",
    pendingOfflineEarnings: 0,
    pendingOfflineSeconds: 0,
    shards: 0,
    boostMultiplier: 1,
    boostEndTime: 0,
    dailyRewardClaimedAt: 0,
    dailyClaimStreak: 0,
    activeEventId: "calm-market",
    activeEventEndsAt: 0,
    nextEventAt: 0,
    activeSkin: "mint",
    unlockedSkins: ["mint"],
    achievementRewardedIds: [],
    offlineBonus: 0,
    activeSubTab: "passive",
    offlineTurboActive: false,
    buildings: {},
    buildingUpgrades: {},
};

const UPGRADE_ICONS = {
    "better-finger": "BF",
    "iron-mouse": "IM",
    "espresso-shot": "ES",
    "viral-campaign": "VC",
    "quantum-cursor": "QC",
    "auto-clicker": "AC",
    "money-printer": "MP",
    "mini-factory": "MF",
    "franchise-store": "FS",
    "investment-desk": "ID",
    "venture-fund": "VF",
    "satellite-bank": "SB",
    "offline-relay": "OR",
    "offline-server": "OS",
    "offline-vault": "OV",
    "neural-interface": "NI",
    "reality-glitch": "RG",
    "central-reserve": "CR",
    "mega-exchange": "ME",
    "dark-pool": "DP",
    "printer-mastery": "P5",
    "factory-megaplex": "F5",
    "franchise-monopoly": "FM",
    "desk-omega": "D5",
    "fund-empire": "FE",
    "data-bunker": "DB",
    "quantum-cloud": "QC2"
};

const MILESTONE_VALUES = [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000];

const BUILDING_DEFINITIONS = [
    {
        id: "lemonade-stand",
        name: "Limonade Kraam",
        description: "Je eerste stap naar een financieel imperium.",
        icon: "🍋",
        baseCost: 50,
        costScale: 1.15,
        baseIncome: 0.1,
        unlockAt: 0,
        upgrades: [
            { id: "ls-cup",      name: "Betere bekers",      cost: 200,    effect: 2, desc: "Verdubbel de omzet van elke Limonade Kraam." },
            { id: "ls-recipe",   name: "Geheim recept",      cost: 1500,   effect: 3, desc: "Drievoudige omzet door een legendarisch recept." },
            { id: "ls-franchise",name: "Meerdere locaties",  cost: 8000,   effect: 5, desc: "Vijfvoudige omzet — je staat overal." },
        ]
    },
    {
        id: "corner-shop",
        name: "Hoekwinkel",
        description: "Een kleine buurtwinkel met vaste klanten.",
        icon: "🏪",
        baseCost: 500,
        costScale: 1.18,
        baseIncome: 1.2,
        unlockAt: 300,
        upgrades: [
            { id: "cs-stock",   name: "Meer voorraad",     cost: 2000,   effect: 2, desc: "Dubbel zo veel producten, dubbel zo veel inkomsten." },
            { id: "cs-loyalty", name: "Loyaliteitskaart",  cost: 12000,  effect: 3, desc: "Vaste klanten zorgen voor 3× meer omzet." },
            { id: "cs-chain",   name: "Winkelketen",       cost: 60000,  effect: 5, desc: "Schaal op naar een keten: 5× inkomsten." },
        ]
    },
    {
        id: "restaurant",
        name: "Restaurant",
        description: "Gasten komen voor de sfeer, blijven voor het eten.",
        icon: "🍽️",
        baseCost: 4000,
        costScale: 1.21,
        baseIncome: 8,
        unlockAt: 2500,
        upgrades: [
            { id: "rs-menu",  name: "Uitgebreid menu",  cost: 15000,  effect: 2, desc: "Meer gerechten, meer bestellingen: 2×." },
            { id: "rs-chef",  name: "Sterrenchef",      cost: 80000,  effect: 3, desc: "Een Michelin-ster trekt 3× zoveel gasten." },
            { id: "rs-brand", name: "Restaurantketen",  cost: 400000, effect: 5, desc: "Jouw naam op elke straathoek: 5×." },
        ]
    },
    {
        id: "franchise",
        name: "Franchise",
        description: "Anderen werken voor jou. Geld stroomt vanzelf.",
        icon: "🏬",
        baseCost: 30000,
        costScale: 1.23,
        baseIncome: 50,
        unlockAt: 18000,
        upgrades: [
            { id: "fr-brand",  name: "Sterk merk",      cost: 120000,  effect: 2, desc: "Naamsbekendheid verdubbelt je franchise-inkomsten." },
            { id: "fr-supply", name: "Centrale inkoop",  cost: 600000,  effect: 3, desc: "Schaalvoordeel: 3× rendement." },
            { id: "fr-global", name: "Wereldwijd",       cost: 3000000, effect: 5, desc: "Internationaal uitrollen: 5× omzet." },
        ]
    },
    {
        id: "investment-bank",
        name: "Investeringsbank",
        description: "Geld dat geld maakt, op industriële schaal.",
        icon: "🏦",
        baseCost: 250000,
        costScale: 1.25,
        baseIncome: 400,
        unlockAt: 150000,
        upgrades: [
            { id: "ib-algo",  name: "Handelsalgoritme",  cost: 1000000,  effect: 2, desc: "Geautomatiseerde handel: 2× rendement." },
            { id: "ib-hedge", name: "Hedgefonds",        cost: 5000000,  effect: 3, desc: "Risicospreiding én 3× meer winst." },
            { id: "ib-fed",   name: "Centrale bank",     cost: 25000000, effect: 5, desc: "Je bepaalt zelf de rente: 5× inkomsten." },
        ]
    },
];

// Edit upgrade costs, scaling, and effects here.
const UPGRADE_DEFINITIONS = [
    { id: "better-finger", name: "Better Finger", description: "Basic finger training for a stronger first tap curve.", baseCost: 75, costScale: 1.55, effectType: "click", effectValue: 1, badge: "+Click", tag: "Starter", unlockAt: 0 },
    { id: "iron-mouse", name: "Iron Mouse", description: "Reliable hardware that gives every manual click extra weight.", baseCost: 500, costScale: 1.6, effectType: "click", effectValue: 5, badge: "+Click", tag: "Manual", unlockAt: 200 },
    { id: "espresso-shot", name: "Espresso Shot", description: "Fuel your pace and punch above your early-game weight.", baseCost: 3000, costScale: 1.65, effectType: "click", effectValue: 20, badge: "+Click", tag: "Manual", unlockAt: 1500 },
    { id: "viral-campaign", name: "Viral Campaign", description: "Mass exposure makes each click feel instantly richer.", baseCost: 18000, costScale: 1.7, effectType: "click", effectValue: 100, badge: "+Click", tag: "Growth", unlockAt: 10000 },
    { id: "quantum-cursor", name: "Quantum Cursor", description: "Absurdly advanced precision for late-run manual bursts.", baseCost: 350000, costScale: 1.75, effectType: "click", effectValue: 2500, badge: "+Click", tag: "Late", unlockAt: 200000 },
    { id: "neural-interface", name: "Neural Interface", description: "Direct brain-to-click wiring that obliterates every speed limit.", baseCost: 2500000, costScale: 1.8, effectType: "click", effectValue: 18000, badge: "+Click", tag: "Endgame", unlockAt: 1500000 },
    { id: "reality-glitch", name: "Reality Glitch", description: "Exploit a crack in the simulation for obscene per-click gains.", baseCost: 18000000, costScale: 1.85, effectType: "click", effectValue: 130000, badge: "+Click", tag: "Endgame", unlockAt: 10000000 },
    { id: "auto-clicker", name: "Auto Clicker", description: "A tiny helper that starts your passive engine early.", baseCost: 180, costScale: 1.15, effectType: "passive", effectValue: 0.4, badge: "+Passive", tag: "Starter", unlockAt: 80 },
    { id: "money-printer", name: "Money Printer", description: "The classic idle upgrade: steady returns every second.", baseCost: 150, costScale: 1.18, effectType: "passive", effectValue: 0.35, badge: "+Passive", tag: "Core", unlockAt: 0 },
    { id: "printer-efficiency", name: "Printer Efficiency", description: "Optimized ink cartridges double the output of every Money Printer you own.", baseCost: 3000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 2, badge: "2x", tag: "Boost", targetBuilding: "money-printer", unlockBuilding: "money-printer", unlockAmount: 10, maxOwned: 1 },
    { id: "printer-automation", name: "Printer Automation", description: "Fully automated press lines triple the output of every Money Printer you own.", baseCost: 15000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 3, badge: "3x", tag: "Boost", targetBuilding: "money-printer", unlockBuilding: "money-printer", unlockAmount: 25, maxOwned: 1 },
    { id: "printer-mastery", name: "Printer Mastery", description: "Total mastery of the printing process — 5× output from every Money Printer.", baseCost: 6000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 5, badge: "5x", tag: "Boost", targetBuilding: "money-printer", unlockBuilding: "money-printer", unlockAmount: 50, maxOwned: 1 },
    { id: "mini-factory", name: "Mini Factory", description: "Small footprint, big productivity gains.", baseCost: 1000, costScale: 1.21, effectType: "passive", effectValue: 2.5, badge: "+Passive", tag: "Core", unlockAt: 500 },
    { id: "factory-assembly", name: "Factory Assembly Line", description: "Conveyor belts and streamlined processes double every Mini Factory's yield.", baseCost: 25000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 2, badge: "2x", tag: "Boost", targetBuilding: "mini-factory", unlockBuilding: "mini-factory", unlockAmount: 10, maxOwned: 1 },
    { id: "factory-robotics", name: "Factory Robotics", description: "Industrial robots triple the output of every Mini Factory you own.", baseCost: 120000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 3, badge: "3x", tag: "Boost", targetBuilding: "mini-factory", unlockBuilding: "mini-factory", unlockAmount: 25, maxOwned: 1 },
    { id: "factory-megaplex", name: "Factory Megaplex", description: "Merge all factories into one unstoppable megaplex — 5× output.", baseCost: 40000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 5, badge: "5x", tag: "Boost", targetBuilding: "mini-factory", unlockBuilding: "mini-factory", unlockAmount: 50, maxOwned: 1 },
    { id: "franchise-store", name: "Franchise Store", description: "Open more locations and multiply your recurring cashflow.", baseCost: 7000, costScale: 1.23, effectType: "passive", effectValue: 15, badge: "+Passive", tag: "Growth", unlockAt: 4000 },
    { id: "franchise-chain", name: "Franchise Chain", description: "Shared supply chains double the earnings of every Franchise Store.", baseCost: 180000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 2, badge: "2x", tag: "Boost", targetBuilding: "franchise-store", unlockBuilding: "franchise-store", unlockAmount: 10, maxOwned: 1 },
    { id: "franchise-empire", name: "Franchise Empire", description: "Brand dominance triples every Franchise Store's passive income.", baseCost: 900000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 3, badge: "3x", tag: "Boost", targetBuilding: "franchise-store", unlockBuilding: "franchise-store", unlockAmount: 25, maxOwned: 1 },
    { id: "franchise-monopoly", name: "Franchise Monopoly", description: "Total market domination — 5× earnings from every Franchise Store.", baseCost: 280000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 5, badge: "5x", tag: "Boost", targetBuilding: "franchise-store", unlockBuilding: "franchise-store", unlockAmount: 50, maxOwned: 1 },
    { id: "investment-desk", name: "Investment Desk", description: "Let smart capital work while you keep tapping.", baseCost: 50000, costScale: 1.25, effectType: "passive", effectValue: 90, badge: "+Passive", tag: "Growth", unlockAt: 25000 },
    { id: "desk-algorithm", name: "Desk Algorithm", description: "Proprietary trading algorithms double every Investment Desk's returns.", baseCost: 1300000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 2, badge: "2x", tag: "Boost", targetBuilding: "investment-desk", unlockBuilding: "investment-desk", unlockAmount: 10, maxOwned: 1 },
    { id: "desk-ai", name: "Desk AI", description: "Neural trading AI triples all Investment Desk output permanently.", baseCost: 6500000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 3, badge: "3x", tag: "Boost", targetBuilding: "investment-desk", unlockBuilding: "investment-desk", unlockAmount: 25, maxOwned: 1 },
    { id: "desk-omega", name: "Desk Omega", description: "The ultimate trading system — 5× returns on every Investment Desk.", baseCost: 2000000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 5, badge: "5x", tag: "Boost", targetBuilding: "investment-desk", unlockBuilding: "investment-desk", unlockAmount: 50, maxOwned: 1 },
    { id: "venture-fund", name: "Venture Fund", description: "Big money chases even bigger money over long runs.", baseCost: 350000, costScale: 1.28, effectType: "passive", effectValue: 600, badge: "+Passive", tag: "Late", unlockAt: 180000 },
    { id: "fund-leverage", name: "Fund Leverage", description: "Leveraged positions double the returns of every Venture Fund.", baseCost: 10000000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 2, badge: "2x", tag: "Boost", targetBuilding: "venture-fund", unlockBuilding: "venture-fund", unlockAmount: 10, maxOwned: 1 },
    { id: "fund-syndicate", name: "Fund Syndicate", description: "A global investment syndicate triples every Venture Fund's passive flow.", baseCost: 50000000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 3, badge: "3x", tag: "Boost", targetBuilding: "venture-fund", unlockBuilding: "venture-fund", unlockAmount: 25, maxOwned: 1 },
    { id: "fund-empire", name: "Fund Empire", description: "A global financial empire multiplying every Venture Fund 5× over.", baseCost: 14000000, costScale: 1.0, effectType: "buildingMultiplier", effectValue: 5, badge: "5x", tag: "Boost", targetBuilding: "venture-fund", unlockBuilding: "venture-fund", unlockAmount: 50, maxOwned: 1 },
    { id: "satellite-bank", name: "Satellite Bank", description: "Global systems turn your empire into a passive giant.", baseCost: 2500000, costScale: 1.3, effectType: "passive", effectValue: 4000, badge: "+Passive", tag: "Late", unlockAt: 1300000 },
    { id: "central-reserve", name: "Central Reserve", description: "State-level monetary control printing wealth around the clock.", baseCost: 18000000, costScale: 1.32, effectType: "passive", effectValue: 28000, badge: "+Passive", tag: "Endgame", unlockAt: 9000000 },
    { id: "mega-exchange", name: "Mega Exchange", description: "A trading floor so large it moves entire economies.", baseCost: 130000000, costScale: 1.34, effectType: "passive", effectValue: 200000, badge: "+Passive", tag: "Endgame", unlockAt: 65000000 },
    { id: "dark-pool", name: "Dark Pool", description: "Off-market ultra-capital that compounds beyond all visibility.", baseCost: 900000000, costScale: 1.36, effectType: "passive", effectValue: 1400000, badge: "+Passive", tag: "Endgame", unlockAt: 450000000 },
    { id: "offline-relay", name: "Offline Relay", description: "A basic relay that keeps earning a share of your income while you're away.", baseCost: 2500, costScale: 1.35, effectType: "offline", effectValue: 0.15, badge: "+Offline", tag: "Offline", unlockAt: 1500 },
    { id: "offline-server", name: "Offline Server", description: "A dedicated server that maintains a larger portion of your passive income offline.", baseCost: 18000, costScale: 1.4, effectType: "offline", effectValue: 0.2, badge: "+Offline", tag: "Offline", unlockAt: 12000 },
    { id: "offline-vault", name: "Offline Vault", description: "A secure vault that maximises your offline earnings efficiency.", baseCost: 95000, costScale: 1.45, effectType: "offline", effectValue: 0.3, badge: "+Offline", tag: "Offline", unlockAt: 65000 },
    { id: "data-bunker", name: "Data Bunker", description: "Een beveiligde bunker die 50% van je passief inkomen opslaat terwijl je weg bent.", baseCost: 500000, costScale: 1.5, effectType: "offline", effectValue: 0.5, badge: "+Offline", tag: "Offline", unlockAt: 350000 },
    { id: "quantum-cloud", name: "Quantum Cloud", description: "Cloud-infrastructuur die je offline opbrengst tot het maximum brengt.", baseCost: 3000000, costScale: 1.55, effectType: "offline", effectValue: 0.8, badge: "+Offline", tag: "Offline", unlockAt: 2000000 }
];

const PRESTIGE_UPGRADE_DEFINITIONS = [
    { id: "legacy-finger", name: "Legacy Finger", description: "Permanent +1 base click value.", baseCost: 4, costScale: 2.05, effectType: "baseClick", effectValue: 1, badge: "Permanent" },
    { id: "idle-insurance", name: "Idle Insurance", description: "Offline earnings are 10% better per level.", baseCost: 6, costScale: 2.1, effectType: "offline", effectValue: 0.1, badge: "Utility" },
    { id: "market-radar", name: "Market Radar", description: "Random events become 8% stronger per level.", baseCost: 10, costScale: 2.2, effectType: "eventPower", effectValue: 0.08, badge: "Events" },
    { id: "reward-clerk", name: "Reward Clerk", description: "Daily reward grows by 15% per level.", baseCost: 7, costScale: 2.1, effectType: "dailyReward", effectValue: 0.15, badge: "Daily" }
];

const RANDOM_EVENTS = [
    { id: "calm-market", name: "Calm Market", description: "A stable market gives you breathing room.", duration: 0, clickMultiplier: 1, passiveMultiplier: 1 },
    { id: "market-boom", name: "Market Boom", description: "Everyone wants in. Passive income surges.", duration: 55, clickMultiplier: 1, passiveMultiplier: 1.35 },
    { id: "click-rush", name: "Click Rush", description: "Manual action is hot. Clicks feel extra valuable.", duration: 45, clickMultiplier: 1.45, passiveMultiplier: 1 },
    { id: "tax-audit", name: "Tax Audit", description: "The IRS is here. Your empire takes a serious hit.", duration: 50, clickMultiplier: 0.7, passiveMultiplier: 0.6, skippable: true }
];

const SHARD_ACHIEVEMENT_IDS = new Set([
    "earn-100k-life", "earn-10m-life", "earn-1b-life",
    "earn-1m", "earn-100m",
    "one-thousand-mps", "fifty-thousand-mps", "million-mps",
    "hundred-thousand-clicks",
    "fifty-upgrades",
    "first-prestige", "five-prestige", "fifteen-prestige"
]);

// Edit achievement conditions here.
const ACHIEVEMENT_DEFINITIONS = [
    // Clicking (10)
    { id: "first-click",             category: "Clicking", tier: "bronze",   name: "First Dollar",       description: "Click once to start the empire.",     condition: (state) => state.totalClicks >= 1 },
    { id: "ten-clicks",              category: "Clicking", tier: "bronze",   name: "Getting Started",    description: "Click 10 times.",                     condition: (state) => state.totalClicks >= 10 },
    { id: "hundred-clicks",          category: "Clicking", tier: "bronze",   name: "Tap Habit",          description: "Click 100 times.",                    condition: (state) => state.totalClicks >= 100 },
    { id: "five-hundred-clicks",     category: "Clicking", tier: "bronze",   name: "Finger Workout",     description: "Click 500 times.",                    condition: (state) => state.totalClicks >= 500 },
    { id: "thousand-clicks",         category: "Clicking", tier: "silver",   name: "Dedicated Tapper",   description: "Click 1,000 times.",                  condition: (state) => state.totalClicks >= 1000 },
    { id: "five-thousand-clicks",    category: "Clicking", tier: "silver",   name: "Tap Veteran",        description: "Click 5,000 times.",                  condition: (state) => state.totalClicks >= 5000 },
    { id: "ten-thousand-clicks",     category: "Clicking", tier: "gold",     name: "Tap Machine",        description: "Click 10,000 times.",                 condition: (state) => state.totalClicks >= 10000 },
    { id: "fifty-thousand-clicks",   category: "Clicking", tier: "gold",     name: "Relentless",         description: "Click 50,000 times.",                 condition: (state) => state.totalClicks >= 50000 },
    { id: "hundred-thousand-clicks", category: "Clicking", tier: "platinum", name: "Unstoppable",        description: "Click 100,000 times.",                condition: (state) => state.totalClicks >= 100000 },
    { id: "million-clicks",          category: "Clicking", tier: "platinum", name: "Click God",          description: "Click 1,000,000 times.",              condition: (state) => state.totalClicks >= 1000000 },
    // Earnings per run (10)
    { id: "earn-100",    category: "Earnings", tier: "bronze",   name: "Warm Start",    description: "Earn $100 in one run.",           condition: (state) => state.totalEarned >= 100 },
    { id: "earn-1000",   category: "Earnings", tier: "bronze",   name: "Side Hustle",   description: "Earn $1,000 in one run.",         condition: (state) => state.totalEarned >= 1000 },
    { id: "earn-5000",   category: "Earnings", tier: "bronze",   name: "Momentum",      description: "Earn $5,000 in one run.",         condition: (state) => state.totalEarned >= 5000 },
    { id: "earn-25000",  category: "Earnings", tier: "silver",   name: "Small Fortune", description: "Earn $25,000 in one run.",        condition: (state) => state.totalEarned >= 25000 },
    { id: "earn-250k",   category: "Earnings", tier: "silver",   name: "High Roller",   description: "Earn $250,000 in one run.",       condition: (state) => state.totalEarned >= 250000 },
    { id: "earn-1m",     category: "Earnings", tier: "gold",     name: "Millionaire",   description: "Earn $1,000,000 in one run.",     condition: (state) => state.totalEarned >= 1000000 },
    { id: "earn-10m",    category: "Earnings", tier: "gold",     name: "Money Baron",   description: "Earn $10,000,000 in one run.",    condition: (state) => state.totalEarned >= 10000000 },
    { id: "earn-100m",   category: "Earnings", tier: "gold",     name: "Tycoon",        description: "Earn $100,000,000 in one run.",   condition: (state) => state.totalEarned >= 100000000 },
    { id: "earn-1b",     category: "Earnings", tier: "platinum", name: "Billionaire",   description: "Earn $1,000,000,000 in one run.", condition: (state) => state.totalEarned >= 1000000000 },
    { id: "earn-10b",    category: "Earnings", tier: "platinum", name: "Untouchable",   description: "Earn $10,000,000,000 in one run.",condition: (state) => state.totalEarned >= 10000000000 },
    // Lifetime earnings (10)
    { id: "earn-1k-life",   category: "Lifetime", tier: "bronze",   name: "First Steps",       description: "Earn $1,000 across all runs.",           condition: (state) => state.lifetimeEarned >= 1000 },
    { id: "earn-10k-life",  category: "Lifetime", tier: "bronze",   name: "Early Investor",    description: "Earn $10,000 across all runs.",          condition: (state) => state.lifetimeEarned >= 10000 },
    { id: "earn-100k-life", category: "Lifetime", tier: "bronze",   name: "Big Picture",       description: "Earn $100,000 across all runs.",         condition: (state) => state.lifetimeEarned >= 100000 },
    { id: "earn-1m-life",   category: "Lifetime", tier: "silver",   name: "Serial Earner",     description: "Earn $1,000,000 across all runs.",       condition: (state) => state.lifetimeEarned >= 1000000 },
    { id: "earn-10m-life",  category: "Lifetime", tier: "silver",   name: "Empire Builder",    description: "Earn $10,000,000 across all runs.",      condition: (state) => state.lifetimeEarned >= 10000000 },
    { id: "earn-100m-life", category: "Lifetime", tier: "silver",   name: "Wealth Machine",    description: "Earn $100,000,000 across all runs.",     condition: (state) => state.lifetimeEarned >= 100000000 },
    { id: "earn-1b-life",   category: "Lifetime", tier: "gold",     name: "Global Force",      description: "Earn $1,000,000,000 across all runs.",   condition: (state) => state.lifetimeEarned >= 1000000000 },
    { id: "earn-10b-life",  category: "Lifetime", tier: "gold",     name: "World Economy",     description: "Earn $10,000,000,000 across all runs.",  condition: (state) => state.lifetimeEarned >= 10000000000 },
    { id: "earn-100b-life", category: "Lifetime", tier: "platinum", name: "Galactic Banker",   description: "Earn $100,000,000,000 across all runs.", condition: (state) => state.lifetimeEarned >= 100000000000 },
    { id: "earn-1t-life",   category: "Lifetime", tier: "platinum", name: "Beyond Wealth",     description: "Earn $1,000,000,000,000 across all runs.",condition: (state) => state.lifetimeEarned >= 1000000000000 },
    // Empire — upgrades owned (10)
    { id: "first-upgrade",      category: "Empire", tier: "bronze",   name: "Growth Mindset",  description: "Buy your first upgrade.",      condition: (state) => getTotalOwnedUpgrades(state) >= 1 },
    { id: "three-upgrades",     category: "Empire", tier: "bronze",   name: "Getting Equipped", description: "Own 3 upgrades.",             condition: (state) => getTotalOwnedUpgrades(state) >= 3 },
    { id: "seven-upgrades",     category: "Empire", tier: "bronze",   name: "Loaded Up",        description: "Own 7 upgrades.",             condition: (state) => getTotalOwnedUpgrades(state) >= 7 },
    { id: "ten-upgrades",       category: "Empire", tier: "silver",   name: "Well Stocked",     description: "Own 10 upgrades.",            condition: (state) => getTotalOwnedUpgrades(state) >= 10 },
    { id: "fifteen-upgrades",   category: "Empire", tier: "silver",   name: "Stack Builder",    description: "Own 15 upgrades.",            condition: (state) => getTotalOwnedUpgrades(state) >= 15 },
    { id: "twentyfive-upgrades",category: "Empire", tier: "silver",   name: "Serious Stack",    description: "Own 25 upgrades.",            condition: (state) => getTotalOwnedUpgrades(state) >= 25 },
    { id: "fifty-upgrades",     category: "Empire", tier: "gold",     name: "Empire Stack",     description: "Own 50 upgrades.",            condition: (state) => getTotalOwnedUpgrades(state) >= 50 },
    { id: "seventyfive-upgrades",category:"Empire", tier: "gold",     name: "Overcrowded",      description: "Own 75 upgrades.",            condition: (state) => getTotalOwnedUpgrades(state) >= 75 },
    { id: "hundred-upgrades",   category: "Empire", tier: "platinum", name: "Maxed Out",        description: "Own 100 upgrades.",           condition: (state) => getTotalOwnedUpgrades(state) >= 100 },
    { id: "onefifty-upgrades",  category: "Empire", tier: "platinum", name: "Beyond Limits",    description: "Own 150 upgrades.",           condition: (state) => getTotalOwnedUpgrades(state) >= 150 },
    // Automation — passive $/s (10)
    { id: "five-mps",           category: "Automation", tier: "bronze",   name: "First Drip",         description: "Reach $5 per second.",         condition: (state) => state.moneyPerSecond >= 5 },
    { id: "fifty-mps",          category: "Automation", tier: "bronze",   name: "Cash Engine",        description: "Reach $50 per second.",        condition: (state) => state.moneyPerSecond >= 50 },
    { id: "twohundred-mps",     category: "Automation", tier: "bronze",   name: "Steady Flow",        description: "Reach $200 per second.",       condition: (state) => state.moneyPerSecond >= 200 },
    { id: "one-thousand-mps",   category: "Automation", tier: "silver",   name: "Serious Automation", description: "Reach $1,000 per second.",     condition: (state) => state.moneyPerSecond >= 1000 },
    { id: "five-thousand-mps",  category: "Automation", tier: "silver",   name: "Cash Waterfall",     description: "Reach $5,000 per second.",     condition: (state) => state.moneyPerSecond >= 5000 },
    { id: "ten-thousand-mps",   category: "Automation", tier: "silver",   name: "Passive King",       description: "Reach $10,000 per second.",    condition: (state) => state.moneyPerSecond >= 10000 },
    { id: "fifty-thousand-mps", category: "Automation", tier: "gold",     name: "Money Factory",      description: "Reach $50,000 per second.",    condition: (state) => state.moneyPerSecond >= 50000 },
    { id: "twohundredk-mps",    category: "Automation", tier: "gold",     name: "Infinite Tap",       description: "Reach $200,000 per second.",   condition: (state) => state.moneyPerSecond >= 200000 },
    { id: "million-mps",        category: "Automation", tier: "platinum", name: "Economy of Scale",   description: "Reach $1,000,000 per second.", condition: (state) => state.moneyPerSecond >= 1000000 },
    { id: "tenmillion-mps",     category: "Automation", tier: "platinum", name: "Wealth Engine",      description: "Reach $10,000,000 per second.",condition: (state) => state.moneyPerSecond >= 10000000 },
    // Prestige (10)
    { id: "first-prestige",    category: "Prestige", tier: "bronze",   name: "Fresh Start",      description: "Prestige once.",         condition: (state) => state.totalPrestiges >= 1 },
    { id: "two-prestige",      category: "Prestige", tier: "bronze",   name: "Back Again",       description: "Prestige twice.",        condition: (state) => state.totalPrestiges >= 2 },
    { id: "three-prestige",    category: "Prestige", tier: "bronze",   name: "Third Wind",       description: "Prestige 3 times.",      condition: (state) => state.totalPrestiges >= 3 },
    { id: "five-prestige",     category: "Prestige", tier: "silver",   name: "Empire Reborn",    description: "Prestige 5 times.",      condition: (state) => state.totalPrestiges >= 5 },
    { id: "seven-prestige",    category: "Prestige", tier: "silver",   name: "Cycle Master",     description: "Prestige 7 times.",      condition: (state) => state.totalPrestiges >= 7 },
    { id: "ten-prestige",      category: "Prestige", tier: "silver",   name: "Loop Runner",      description: "Prestige 10 times.",     condition: (state) => state.totalPrestiges >= 10 },
    { id: "fifteen-prestige",  category: "Prestige", tier: "gold",     name: "Serial Founder",   description: "Prestige 15 times.",     condition: (state) => state.totalPrestiges >= 15 },
    { id: "twenty-prestige",   category: "Prestige", tier: "gold",     name: "Reborn Legend",    description: "Prestige 20 times.",     condition: (state) => state.totalPrestiges >= 20 },
    { id: "thirty-prestige",   category: "Prestige", tier: "platinum", name: "Eternal Grinder",  description: "Prestige 30 times.",     condition: (state) => state.totalPrestiges >= 30 },
    { id: "fifty-prestige",    category: "Prestige", tier: "platinum", name: "Ascendant",        description: "Prestige 50 times.",     condition: (state) => state.totalPrestiges >= 50 },
];

const game = {
    ...clone(DEFAULT_STATE),
    upgrades: createDefaultUpgrades(),
    prestigeUpgrades: createDefaultPrestigeUpgrades(),
    achievements: createDefaultAchievements()
};

const elements = {
    moneyDisplay: document.getElementById("money-display"),
    mpsDisplay: document.getElementById("mps-display"),
    clickValueDisplay: document.getElementById("click-value-display"),
    prestigeBonusDisplay: document.getElementById("prestige-bonus-display"),
    shardsDisplay: document.getElementById("shards-display"),
    totalEarnedDisplay: document.getElementById("total-earned-display"),
    lifetimeEarnedDisplay: document.getElementById("lifetime-earned-display"),
    totalClicksDisplay: document.getElementById("total-clicks-display"),
    totalUpgradesDisplay: document.getElementById("total-upgrades-display"),
    bestMpsDisplay: document.getElementById("best-mps-display"),
    prestigeCountDisplay: document.getElementById("prestige-count-display"),
    tapButton: document.getElementById("tap-button"),
    floatingFeedbackLayer: document.getElementById("floating-feedback-layer"),
    burstFeedbackLayer: document.getElementById("burst-feedback-layer"),
    upgradesList: null, // assigned dynamically by renderSubTab
    subtabContent: document.getElementById("subtab-content"),
    saveStatus: document.getElementById("save-status"),
    saveTextarea: document.getElementById("save-textarea"),
    toastContainer: document.getElementById("toast-container"),
    resetButton: document.getElementById("reset-button"),
    dailyRewardButton: document.getElementById("daily-reward-button"),
    adModal: document.getElementById("ad-modal"),
    adCountdownDisplay: document.getElementById("ad-countdown-display"),
    skipAdButton: document.getElementById("skip-ad-button"),
    watchAdButton: null, // rendered dynamically in premium subtab
    boostAdCard: null, // rendered dynamically in premium subtab
    exportButton: document.getElementById("export-button"),
    importButton: document.getElementById("import-button"),
    copyExportButton: document.getElementById("copy-export-button"),
    clearSaveTextButton: document.getElementById("clear-save-text-button"),
    soundToggle: document.getElementById("sound-toggle"),
    prestigeButton: document.getElementById("prestige-button"),
    prestigePointsDisplay: document.getElementById("prestige-points-display"),
    prestigeGainDisplay: document.getElementById("prestige-gain-display"),
    prestigeShardsDisplay: document.getElementById("prestige-shards-display"),
    prestigeNextDisplay: document.getElementById("prestige-next-display"),
    prestigeUpgradesList: document.getElementById("prestige-upgrades-list"),
    boostStatusDisplay: document.getElementById("boost-status-display"),
    eventBanner: document.getElementById("event-banner"),
    eventTitle: document.getElementById("event-title"),
    eventDescription: document.getElementById("event-description"),
    eventTimer: document.getElementById("event-timer"),
    eventModal: document.getElementById("event-modal"),
    eventModalTitle: document.getElementById("event-modal-title"),
    eventModalDescription: document.getElementById("event-modal-description"),
    eventModalEffect: document.getElementById("event-modal-effect"),
    eventModalDuration: document.getElementById("event-modal-duration"),
    closeEventButton: document.getElementById("close-event-button"),
    skipEventButton: document.getElementById("skip-event-button"),
    offlineModal: document.getElementById("offline-modal"),
    offlineDescription: document.getElementById("offline-description"),
    offlineTimeDisplay: document.getElementById("offline-time-display"),
    offlineEarningsDisplay: document.getElementById("offline-earnings-display"),
    claimOfflineButton: document.getElementById("claim-offline-button"),
    offlineHeroAmount: document.getElementById("offline-hero-amount"),
    filterButtons: Array.from(document.querySelectorAll(".filter-button")),
    amountButtons: Array.from(document.querySelectorAll(".amount-button")),
    overviewCards: Array.from(document.querySelectorAll(".overview-card")),
    statCards: Array.from(document.querySelectorAll(".stat-card")),
    tabButtons: Array.from(document.querySelectorAll(".tab-button")),
    tabPanels: Array.from(document.querySelectorAll(".tab-panel")),
    skinSwitcher: document.getElementById("skin-switcher"),
    navDropdown: document.getElementById("nav-dropdown"),
    navDropdownBackdrop: document.getElementById("nav-dropdown-backdrop"),
    navDropdownTitle: document.getElementById("nav-dropdown-title"),
    navDropdownClose: document.getElementById("nav-dropdown-close"),
    navDropdownBody: document.getElementById("nav-dropdown-body"),
};

let activeNavDropdown = null;
let passiveFeedbackBuffer = 0;
let lastPassiveFeedbackTime = Date.now();
let lastMilestoneValue = 0;
const animatedValues = {};

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function createDefaultUpgrades() {
    return UPGRADE_DEFINITIONS.map((upgrade) => ({
        id: upgrade.id,
        name: upgrade.name,
        description: upgrade.description,
        baseCost: upgrade.baseCost,
        currentCost: upgrade.baseCost,
        amountOwned: 0,
        effectType: upgrade.effectType,
        effectValue: upgrade.effectValue,
        costScale: upgrade.costScale,
        badge: upgrade.badge,
        tag: upgrade.tag,
        unlockAt: upgrade.unlockAt || 0
    }));
}

function createDefaultPrestigeUpgrades() {
    return PRESTIGE_UPGRADE_DEFINITIONS.map((upgrade) => ({
        id: upgrade.id,
        name: upgrade.name,
        description: upgrade.description,
        baseCost: upgrade.baseCost,
        currentCost: upgrade.baseCost,
        amountOwned: 0,
        effectType: upgrade.effectType,
        effectValue: upgrade.effectValue,
        costScale: upgrade.costScale,
        badge: upgrade.badge
    }));
}

function createDefaultAchievements() {
    return ACHIEVEMENT_DEFINITIONS.map((achievement) => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        unlocked: false
    }));
}

function formatNumber(value) {
    if (!Number.isFinite(value)) {
        return "0";
    }

    const absoluteValue = Math.abs(value);
    if (absoluteValue < 1000) {
        const rounded = absoluteValue >= 100 ? Math.round(value) : Math.round(value * 10) / 10;
        return rounded.toLocaleString("en-US", {
            minimumFractionDigits: rounded % 1 === 0 ? 0 : 1,
            maximumFractionDigits: 1
        });
    }

    const units = [
        { value: 1e15, suffix: "Q" },
        { value: 1e12, suffix: "T" },
        { value: 1e9, suffix: "B" },
        { value: 1e6, suffix: "M" },
        { value: 1e3, suffix: "K" }
    ];

    for (const unit of units) {
        if (absoluteValue >= unit.value) {
            const scaled = value / unit.value;
            const rounded = Math.round(scaled * 10) / 10;
            return `${rounded.toLocaleString("en-US", {
                minimumFractionDigits: rounded % 1 === 0 ? 0 : 1,
                maximumFractionDigits: 1
            })}${unit.suffix}`;
        }
    }

    return "0";
}

function getPrestigeBonus(points) {
    return 1 + (points * 0.15);
}

function getAvailablePrestigeGain() {
    return Math.max(0, Math.floor(Math.sqrt(game.lifetimeEarned / 80000)) - game.prestigePoints);
}

function getTotalOwnedUpgrades(state) {
    return state.upgrades.reduce((total, upgrade) => total + upgrade.amountOwned, 0);
}

function getUpgradeById(upgradeId) {
    return game.upgrades.find((upgrade) => upgrade.id === upgradeId);
}

function getVisibleUpgrades() {
    const unlocked = game.upgrades.filter((upgrade) => {
        const def = UPGRADE_DEFINITIONS.find((d) => d.id === upgrade.id);
        if (!def) return false;
        // lifetimeEarned-based unlock (skip for buildingMultiplier — they use unlockBuilding instead)
        if (def.effectType !== "buildingMultiplier" && game.lifetimeEarned < (upgrade.unlockAt || 0)) return false;
        // Building ownership unlock
        if (def.unlockBuilding && def.unlockAmount) {
            const target = game.upgrades.find((u) => u.id === def.unlockBuilding);
            if (!target || target.amountOwned < def.unlockAmount) return false;
        }
        // Hide maxed one-time upgrades
        if (def.maxOwned && upgrade.amountOwned >= def.maxOwned) return false;
        return true;
    });

    if (game.shopFilter === "all") {
        return unlocked;
    }

    if (game.shopFilter === "click") {
        return unlocked.filter((upgrade) => upgrade.effectType === "click");
    }

    if (game.shopFilter === "offline") {
        return unlocked.filter((upgrade) => upgrade.effectType === "offline");
    }

    return unlocked.filter((upgrade) => upgrade.effectType === "passive" || upgrade.effectType === "buildingMultiplier");
}

function getPrestigeUpgradeById(upgradeId) {
    return game.prestigeUpgrades.find((upgrade) => upgrade.id === upgradeId);
}

function getPrestigeLevel(upgradeId) {
    return getPrestigeUpgradeById(upgradeId)?.amountOwned || 0;
}

function getEventById(eventId) {
    return RANDOM_EVENTS.find((event) => event.id === eventId) || RANDOM_EVENTS[0];
}

function getCurrentEvent() {
    return getEventById(game.activeEventId);
}

function getOfflineMultiplier() {
    return Math.min(3.0, (game.offlineBonus || 0) + (getPrestigeLevel("idle-insurance") * 0.1));
}

function getEventPowerMultiplier() {
    return 1 + (getPrestigeLevel("market-radar") * 0.08);
}

function getDailyRewardAmount() {
    const scaling = 1 + (getPrestigeLevel("reward-clerk") * 0.15);
    const baseReward = Math.max(40, game.moneyPerSecond * 90);
    return baseReward * scaling;
}


function getBaseClickValue() {
    return game.baseClickValue + getPrestigeLevel("legacy-finger");
}

function isDailyRewardReady() {
    const lastClaim = Number(game.dailyRewardClaimedAt) || 0;
    return Date.now() - lastClaim >= 24 * 60 * 60 * 1000;
}

function getNextEventDelayMs() {
    const minutes = 5 + (Math.random() * 10);
    return Math.floor(minutes * 60 * 1000);
}

function getEventEffectText(event) {
    if (event.passiveMultiplier > 1) {
        return `Passive income +${Math.round((event.passiveMultiplier - 1) * 100)}%`;
    }

    if (event.clickMultiplier > 1) {
        return `Click value +${Math.round((event.clickMultiplier - 1) * 100)}%`;
    }

    if (event.passiveMultiplier < 1) {
        return `Passive income ${Math.round((1 - event.passiveMultiplier) * 100)}% lower`;
    }

    return `Click value ${Math.round((1 - event.clickMultiplier) * 100)}% lower`;
}

const SKIN_LABELS = { mint: "Mint", gold: "Gold", cosmic: "Cosmic" };
const SKIN_UNLOCK_HINTS = { mint: "Default", gold: "Prestige once", cosmic: "Earn $100k lifetime" };

function maybeUnlockSkins() {
    const unlocks = [
        { id: "mint", condition: true },
        { id: "gold", condition: game.totalPrestiges >= 1 },
        { id: "cosmic", condition: game.lifetimeEarned >= 100000 }
    ];

    unlocks.forEach((skin) => {
        if (skin.condition && !game.unlockedSkins.includes(skin.id)) {
            game.unlockedSkins.push(skin.id);
            game.activeSkin = skin.id;
            showToast(`New skin unlocked: ${SKIN_LABELS[skin.id] || skin.id}. Check Appearance in Stats tab.`, "info");
        }
    });
}

function applyThemeFromProgress() {
    document.body.classList.remove("theme-dawn", "theme-gold", "theme-cosmic", "skin-mint", "skin-gold", "skin-cosmic");

    if (!game.unlockedSkins.includes(game.activeSkin)) {
        game.activeSkin = game.unlockedSkins[game.unlockedSkins.length - 1] || "mint";
    }

    const themeClass = game.lifetimeEarned >= 100000 ? "theme-cosmic" : game.totalPrestiges >= 1 ? "theme-gold" : "theme-dawn";
    const skinClass = `skin-${game.activeSkin}`;
    document.body.classList.add(themeClass);
    document.body.classList.add(skinClass);
}

function renderSkinSwitcher() {
    if (!elements.skinSwitcher) return;
    elements.skinSwitcher.innerHTML = ["mint", "gold", "cosmic"].map((id) => {
        const unlocked = game.unlockedSkins.includes(id);
        const active = game.activeSkin === id;
        return `<button class="skin-btn${active ? " active" : ""}${!unlocked ? " locked" : ""}" data-skin-id="${id}" ${!unlocked ? "disabled" : ""} title="${unlocked ? SKIN_LABELS[id] : SKIN_UNLOCK_HINTS[id]}">${SKIN_LABELS[id]}${!unlocked ? " (locked)" : ""}</button>`;
    }).join("");
}

function getBulkBuildingInfo(bDef) {
    const owned = game.buildings[bDef.id]?.owned || 0;
    const costAt = (n) => Math.ceil(bDef.baseCost * Math.pow(bDef.costScale, n));

    if (game.buyAmount === "max") {
        let amount = 0;
        let totalCost = 0;
        while (game.money >= totalCost + costAt(owned + amount)) {
            totalCost += costAt(owned + amount);
            amount += 1;
        }
        return { amount, totalCost };
    }

    const requested = Math.max(1, Number(game.buyAmount) || 1);
    let totalCost = 0;
    for (let i = 0; i < requested; i++) totalCost += costAt(owned + i);
    return { amount: requested, totalCost };
}

function getBulkPurchaseInfo(upgrade) {
    if (!upgrade) {
        return { amount: 0, totalCost: 0 };
    }

    const upgradeDef = UPGRADE_DEFINITIONS.find((d) => d.id === upgrade.id);
    const maxRemaining = upgradeDef?.maxOwned != null ? upgradeDef.maxOwned - upgrade.amountOwned : Infinity;

    if (game.buyAmount === "max") {
        let amount = 0;
        let totalCost = 0;
        let nextCost = upgrade.currentCost;

        while (game.money >= totalCost + nextCost && amount < maxRemaining) {
            totalCost += nextCost;
            amount += 1;
            nextCost = Math.ceil(upgrade.baseCost * Math.pow(upgrade.costScale, upgrade.amountOwned + amount));
        }

        return { amount, totalCost };
    }

    const requestedAmount = Math.min(Math.max(1, Number(game.buyAmount) || 1), maxRemaining);
    let totalCost = 0;

    for (let count = 0; count < requestedAmount; count += 1) {
        totalCost += Math.ceil(upgrade.baseCost * Math.pow(upgrade.costScale, upgrade.amountOwned + count));
    }

    return {
        amount: requestedAmount,
        totalCost
    };
}

function formatDuration(totalSeconds) {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    }

    return `${seconds}s`;
}

function getAchievementProgress(definition, state) {
    const progressMap = {
        "first-click": { current: state.totalClicks, target: 1 },
        "earn-100": { current: state.totalEarned, target: 100 },
        "earn-5000": { current: state.totalEarned, target: 5000 },
        "earn-100k-life": { current: state.lifetimeEarned, target: 100000 },
        "first-upgrade": { current: getTotalOwnedUpgrades(state), target: 1 },
        "fifteen-upgrades": { current: getTotalOwnedUpgrades(state), target: 15 },
        "fifty-mps": { current: state.moneyPerSecond, target: 50 },
        "one-thousand-mps":       { current: state.moneyPerSecond, target: 1000 },
        "fifty-thousand-mps":     { current: state.moneyPerSecond, target: 50000 },
        "million-mps":            { current: state.moneyPerSecond, target: 1000000 },
        "hundred-clicks":         { current: state.totalClicks, target: 100 },
        "thousand-clicks":        { current: state.totalClicks, target: 1000 },
        "ten-thousand-clicks":    { current: state.totalClicks, target: 10000 },
        "hundred-thousand-clicks": { current: state.totalClicks, target: 100000 },
        "earn-1m":                { current: state.totalEarned, target: 1000000 },
        "earn-100m":              { current: state.totalEarned, target: 100000000 },
        "earn-10m-life":          { current: state.lifetimeEarned, target: 10000000 },
        "earn-1b-life":           { current: state.lifetimeEarned, target: 1000000000 },
        "fifty-upgrades":         { current: getTotalOwnedUpgrades(state), target: 50 },
        "first-prestige":         { current: state.totalPrestiges, target: 1 },
        "five-prestige":          { current: state.totalPrestiges, target: 5 },
        "fifteen-prestige":       { current: state.totalPrestiges, target: 15 }
    };

    return progressMap[definition.id] || { current: 0, target: 1 };
}

function getAchievementTier(definition) {
    return definition.tier || "bronze";
}

function animateValue(key, element, nextValue, formatter) {
    if (!element) {
        return;
    }

    const previousValue = Number(animatedValues[key]);
    if (!Number.isFinite(previousValue)) {
        animatedValues[key] = nextValue;
        element.textContent = formatter(nextValue);
        return;
    }

    const startValue = previousValue;
    const startTime = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    const duration = 220;

    const step = (timestamp) => {
        const now = timestamp || Date.now();
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + ((nextValue - startValue) * eased);
        element.textContent = formatter(currentValue);

        if (progress < 1) {
            const raf = window.requestAnimationFrame || ((callback) => window.setTimeout(() => callback(Date.now()), 16));
            raf(step);
        } else {
            element.textContent = formatter(nextValue);
        }
    };

    animatedValues[key] = nextValue;
    step(startTime);
}

function pulseElement(element) {
    if (!element) {
        return;
    }

    element.classList.add("is-updating");
    window.setTimeout(() => {
        element.classList.remove("is-updating");
    }, 260);
}

function pulseStatCards() {
    elements.overviewCards.forEach((card) => pulseElement(card));
    elements.statCards.forEach((card) => pulseElement(card));
}

function maybeShowMilestone(amount) {
    for (const value of MILESTONE_VALUES) {
        if (lastMilestoneValue < value && amount >= value) {
            lastMilestoneValue = value;
            createMilestonePop(`${formatNumber(value)} reached`);
        }
    }
}

function recalculateDerivedStats() {
    let clickBonus = 0;
    let passiveIncome = 0;
    const ownedClick = game.upgrades.reduce((total, upgrade) => total + (upgrade.effectType === "click" ? upgrade.amountOwned : 0), 0);
    const ownedPassive = game.upgrades.reduce((total, upgrade) => total + (upgrade.effectType === "passive" ? upgrade.amountOwned : 0), 0);

    // Pass 1: build per-building multiplier map from buildingMultiplier upgrades
    const buildingMults = {};
    game.upgrades.forEach((upgrade) => {
        const def = UPGRADE_DEFINITIONS.find((d) => d.id === upgrade.id);
        if (def && def.effectType === "buildingMultiplier" && upgrade.amountOwned > 0) {
            buildingMults[def.targetBuilding] = (buildingMults[def.targetBuilding] || 1) * Math.pow(def.effectValue, upgrade.amountOwned);
        }
    });

    // Pass 2: accumulate all income types
    game.upgrades.forEach((upgrade) => {
        if (upgrade.effectType === "click") {
            clickBonus += upgrade.amountOwned * upgrade.effectValue;
        }

        if (upgrade.effectType === "passive") {
            passiveIncome += upgrade.amountOwned * upgrade.effectValue * (buildingMults[upgrade.id] || 1);
        }

    });
    game.offlineBonus = game.upgrades.reduce((sum, u) => u.effectType === "offline" ? sum + u.amountOwned * u.effectValue : sum, 0);

    // Building income
    BUILDING_DEFINITIONS.forEach(bDef => {
        const owned = (game.buildings[bDef.id]?.owned || 0);
        if (owned === 0) return;
        let multiplier = 1;
        bDef.upgrades.forEach(upg => {
            if (game.buildingUpgrades[upg.id]) multiplier *= upg.effect;
        });
        passiveIncome += owned * bDef.baseIncome * multiplier;
    });

    game.prestigeBonus = getPrestigeBonus(game.prestigePoints);
    const synergyBonus = 1 + (Math.min(ownedClick, ownedPassive) * 0.02);
    const event = getCurrentEvent();
    const eventPower = getEventPowerMultiplier();
    const clickEventMultiplier = 1 + ((event.clickMultiplier - 1) * eventPower);
    const passiveEventMultiplier = 1 + ((event.passiveMultiplier - 1) * eventPower);
    const boostActive = Date.now() < game.boostEndTime ? game.boostMultiplier : 1;

    game.clickValue = (getBaseClickValue() + clickBonus) * game.prestigeBonus * synergyBonus * clickEventMultiplier * boostActive;
    game.moneyPerSecond = passiveIncome * game.prestigeBonus * synergyBonus * passiveEventMultiplier * boostActive;
    game.bestMoneyPerSecond = Math.max(game.bestMoneyPerSecond, game.moneyPerSecond);
}

function earnMoney(amount) {
    const safeAmount = Math.max(0, amount);
    game.money += safeAmount;
    game.totalEarned += safeAmount;
    game.lifetimeEarned += safeAmount;
    maybeShowMilestone(game.totalEarned);
}

function clickMoney() {
    const earned = game.clickValue;

    earnMoney(earned);
    game.totalClicks += 1;
    game.clickFeedback = `+$${formatNumber(earned)}`;

    elements.tapButton.classList.add("pressed");
    window.setTimeout(() => {
        elements.tapButton.classList.remove("pressed");
    }, 120);

    createFloatingFeedback(`+$${formatNumber(earned)}`, "click");
    createBurstFeedback();
    pulseStatCards();
    updateStats();
    if (checkAchievements()) {
        updateStats();
    }
}

function buyUpgrade(upgradeId) {
    const upgrade = getUpgradeById(upgradeId);
    if (!upgrade) {
        return;
    }

    const bulkInfo = getBulkPurchaseInfo(upgrade);
    if (bulkInfo.amount <= 0) {
        showToast(`You cannot afford any ${upgrade.name} yet.`, "warning");
        return;
    }

    if (game.money < bulkInfo.totalCost) {
        showToast(`You need $${formatNumber(bulkInfo.totalCost)} for ${upgrade.name}.`, "warning");
        return;
    }

    game.money -= bulkInfo.totalCost;
    upgrade.amountOwned += bulkInfo.amount;
    upgrade.currentCost = Math.ceil(upgrade.baseCost * Math.pow(upgrade.costScale, upgrade.amountOwned));

    recalculateDerivedStats();
    game.clickFeedback = `${upgrade.name} boosted your empire.`;
    updateStats();
    if (checkAchievements()) {
        updateStats();
    }
    addFeedItem(`<div class="feed-item-title">${upgrade.name} x${bulkInfo.amount}</div><div class="feed-item-sub">Cost: $${formatNumber(bulkInfo.totalCost)}</div>`, "buy", 2500);
}

function buyPrestigeUpgrade(upgradeId) {
    const upgrade = getPrestigeUpgradeById(upgradeId);
    if (!upgrade) {
        return;
    }

    if (game.shards < upgrade.currentCost) {
        showToast(`You need ${formatNumber(upgrade.currentCost)} gold for ${upgrade.name}.`, "warning");
        return;
    }

    game.shards -= upgrade.currentCost;
    upgrade.amountOwned += 1;
    upgrade.currentCost = Math.ceil(upgrade.baseCost * Math.pow(upgrade.costScale, upgrade.amountOwned));
    recalculateDerivedStats();
    maybeUnlockSkins();
    updateStats();
    renderPrestigeUpgrades();
    saveGame(false);
    addFeedItem(`<div class="feed-item-title">${upgrade.name} (permanent)</div><div class="feed-item-sub">Cost: ${formatNumber(upgrade.baseCost * Math.pow(upgrade.costScale, upgrade.amountOwned - 1) | 0)} shards</div>`, "buy", 2500);
}

function renderUpgrades() {
    elements.upgradesList.innerHTML = "";

    getVisibleUpgrades().forEach((upgrade) => {
        const bulkInfo = getBulkPurchaseInfo(upgrade);
        const canAfford = bulkInfo.amount > 0 && game.money >= bulkInfo.totalCost;
        const effectText = upgrade.effectType === "click"
            ? `+$${formatNumber(upgrade.effectValue * game.prestigeBonus)} click value`
            : upgrade.effectType === "offline"
                ? `+${Math.round(upgrade.effectValue * 100)}% offline earnings per level`
                : upgrade.effectType === "buildingMultiplier"
                    ? (() => {
                        const upDef = UPGRADE_DEFINITIONS.find((d) => d.id === upgrade.id);
                        const tDef = upDef ? UPGRADE_DEFINITIONS.find((d) => d.id === upDef.targetBuilding) : null;
                        return `${upgrade.effectValue}x ${tDef ? tDef.name : upgrade.id} output`;
                    })()
                    : `+$${formatNumber(upgrade.effectValue * game.prestigeBonus)}/s`;
        const costText = bulkInfo.amount > 0
            ? `$${formatNumber(bulkInfo.totalCost)}`
            : `$${formatNumber(upgrade.currentCost)}`;
        const buttonText = bulkInfo.amount > 0
            ? `Buy x${bulkInfo.amount}`
            : "Too Expensive";
        const targetCost = Math.max(1, bulkInfo.totalCost || upgrade.currentCost);
        const affordabilityProgress = Math.min(100, (game.money / targetCost) * 100);
        const shortage = targetCost - game.money;
        const affordabilityLabel = canAfford
            ? "Ready to buy"
            : game.moneyPerSecond > 0
                ? `in ${formatDuration(Math.ceil(shortage / game.moneyPerSecond))}`
                : `${Math.min(100, Math.floor(affordabilityProgress))}% to afford`;

        const card = document.createElement("article");
        card.className = `upgrade-row ${canAfford ? "affordable" : ""}`;
        card.dataset.upgradeCard = upgrade.id;
        card.innerHTML = `
            <div class="upgrade-row-icon">${UPGRADE_ICONS[upgrade.id] || "UP"}</div>
            <div class="upgrade-row-body">
                <div class="upgrade-row-title">
                    <span class="upgrade-row-name">${upgrade.name}</span>
                    <span class="upgrade-tag">${upgrade.tag}</span>
                    <span class="upgrade-badge">${upgrade.badge}</span>
                </div>
                <p class="upgrade-description">${upgrade.description}</p>
                <div class="upgrade-row-progress">
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${affordabilityProgress}%"></div>
                    </div>
                    <span class="progress-label">${affordabilityLabel}</span>
                </div>
            </div>
            <div class="upgrade-row-owned">
                <span class="mini-label">Owned</span>
                <strong>${upgrade.amountOwned}</strong>
            </div>
            <div class="upgrade-row-action">
                <span class="upgrade-row-cost">${costText}</span>
                <button class="buy-button buy-button--row" type="button" data-upgrade-id="${upgrade.id}" ${canAfford ? "" : "disabled"}>
                    ${buttonText}
                </button>
            </div>
        `;
        elements.upgradesList.appendChild(card);
    });

    const nextLocked = game.upgrades
        .filter((u) => game.lifetimeEarned < (u.unlockAt || 0))
        .sort((a, b) => a.unlockAt - b.unlockAt)[0];
    if (nextLocked && (game.shopFilter === "all" || game.shopFilter === nextLocked.effectType || (game.shopFilter === "click" && nextLocked.effectType === "click"))) {
        const shortage = formatNumber(nextLocked.unlockAt - game.lifetimeEarned);
        const teaser = document.createElement("div");
        teaser.className = "upgrade-next-teaser";
        teaser.innerHTML = `
            <div class="upgrade-next-icon">?</div>
            <div>
                <div class="upgrade-next-name">${nextLocked.name}</div>
                <div class="upgrade-next-hint">Earn <strong>$${shortage}</strong> more lifetime to unlock</div>
            </div>
        `;
        elements.upgradesList.appendChild(teaser);
    }
}

function renderAchievements() {
    const grid = document.getElementById("achievements-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const categories = [];
    const seen = {};
    ACHIEVEMENT_DEFINITIONS.forEach(def => {
        const cat = def.category || "Other";
        if (!seen[cat]) { seen[cat] = true; categories.push(cat); }
    });

    categories.forEach(cat => {
        const defs = ACHIEVEMENT_DEFINITIONS.filter(d => (d.category || "Other") === cat);
        const unlockedCount = defs.filter(d => game.achievements.find(a => a.id === d.id)?.unlocked).length;

        const section = document.createElement("div");
        section.className = "ach-category";

        const header = document.createElement("div");
        header.className = "ach-category-header";
        header.innerHTML = `<span class="ach-category-name">${cat}</span><span class="ach-category-count">${unlockedCount}/${defs.length}</span>`;
        section.appendChild(header);

        const row = document.createElement("div");
        row.className = "achievements-grid";
        defs.forEach(def => {
            const ach = game.achievements.find(a => a.id === def.id);
            const unlocked = ach?.unlocked || false;
            const icon = document.createElement("div");
            icon.className = `achievement-icon${unlocked ? " unlocked" : " locked"}`;
            icon.dataset.tooltip = unlocked ? `${def.name}\n${def.description}` : "???";
            icon.innerHTML = unlocked
                ? `<span class="ach-tier ach-tier--${def.tier || "bronze"}"></span>`
                : `<span class="ach-unknown">?</span>`;
            row.appendChild(icon);
        });
        section.appendChild(row);
        grid.appendChild(section);
    });
}

// renderPrestigeUpgrades is defined later in the sub-tab section (accepts optional container param)

function checkAchievements() {
    let unlockedAny = false;

    ACHIEVEMENT_DEFINITIONS.forEach((definition) => {
        const achievement = game.achievements.find((item) => item.id === definition.id);
        if (!achievement || achievement.unlocked) {
            return;
        }

        if (definition.condition(game)) {
            achievement.unlocked = true;
            unlockedAny = true;
            if (!game.achievementRewardedIds.includes(achievement.id)) {
                const moneyReward = Math.max(25, game.moneyPerSecond * 5);
                earnMoney(moneyReward);
                if (SHARD_ACHIEVEMENT_IDS.has(achievement.id)) {
                    game.shards += 1;
                }
                game.achievementRewardedIds.push(achievement.id);
            }
            const def = ACHIEVEMENT_DEFINITIONS.find((d) => d.id === achievement.id);
            const shardLine = SHARD_ACHIEVEMENT_IDS.has(achievement.id) ? `<div class="feed-item-sub">+1 gold rewarded</div>` : "";
            addFeedItem(`<div class="feed-item-title">🏆 ${achievement.name}</div><div class="feed-item-sub">${def ? def.description : ""}</div>${shardLine}`, "achievement", 6000);
        }
    });

    if (unlockedAny) {
        renderAchievements();
    }

    return unlockedAny;
}

function updatePrestigePanel() {
    const gain = getAvailablePrestigeGain();
    elements.prestigePointsDisplay.textContent = formatNumber(game.prestigePoints);
    elements.prestigeGainDisplay.textContent = formatNumber(gain);
    elements.prestigeBonusDisplay.textContent = `x${game.prestigeBonus.toFixed(2)}`;
    elements.shardsDisplay.textContent = formatNumber(game.shards);
    elements.prestigeShardsDisplay.textContent = formatNumber(game.shards);
    elements.prestigeButton.textContent = `Prestige For ${formatNumber(gain)} Points`;
    elements.prestigeButton.disabled = gain <= 0;
    if (elements.prestigeNextDisplay) {
        const nextThreshold = Math.pow(game.prestigePoints + gain + 1, 2) * 80000;
        const shortage = Math.max(0, nextThreshold - game.lifetimeEarned);
        elements.prestigeNextDisplay.textContent = shortage > 0 ? `$${formatNumber(nextThreshold)} lifetime` : "Ready now";
    }
}

function updateStats(options = {}) {
    const shouldRenderCollections = options.renderCollections !== false;

    animateValue("money", elements.moneyDisplay, game.money, (value) => `$${formatNumber(value)}`);
    animateValue("mps", elements.mpsDisplay, game.moneyPerSecond, (value) => `$${formatNumber(value)}/s`);
    animateValue("clickValue", elements.clickValueDisplay, game.clickValue, (value) => `$${formatNumber(value)}`);
    animateValue("totalEarned", elements.totalEarnedDisplay, game.totalEarned, (value) => `$${formatNumber(value)}`);
    animateValue("lifetimeEarned", elements.lifetimeEarnedDisplay, game.lifetimeEarned, (value) => `$${formatNumber(value)}`);
    animateValue("totalClicks", elements.totalClicksDisplay, game.totalClicks, (value) => formatNumber(value));
    animateValue("totalUpgrades", elements.totalUpgradesDisplay, getTotalOwnedUpgrades(game), (value) => formatNumber(value));
    animateValue("bestMps", elements.bestMpsDisplay, game.bestMoneyPerSecond, (value) => `$${formatNumber(value)}/s`);
    animateValue("prestigeCount", elements.prestigeCountDisplay, game.totalPrestiges, (value) => formatNumber(value));
    elements.boostStatusDisplay.textContent = Date.now() < game.boostEndTime
        ? `Boost live for ${formatDuration((game.boostEndTime - Date.now()) / 1000)}`
        : "No boost active";
    const dailyBaseText = isDailyRewardReady() ? "Claim Daily Reward" : "Daily Reward Claimed";
    const streakSuffix = ` (Day ${Math.max(1, game.dailyClaimStreak + (isDailyRewardReady() ? 1 : 0))}/5)`;
    elements.dailyRewardButton.textContent = `${dailyBaseText}${streakSuffix}`;
    elements.dailyRewardButton.disabled = !isDailyRewardReady();
    elements.dailyRewardButton.classList.toggle("is-ready", isDailyRewardReady());
    elements.saveStatus.textContent = getSaveStatusText();
    elements.soundToggle.textContent = `Sound: ${game.soundEnabled ? "On" : "Off"}`;
    elements.soundToggle.setAttribute("aria-pressed", String(game.soundEnabled));
    updatePrestigePanel();
    renderShopControls();
    updateEventBanner();
    applyThemeFromProgress();
    renderSkinSwitcher();

    if (shouldRenderCollections) {
        renderSubTab(game.activeSubTab);
        if (activeNavDropdown === "progress" || activeNavDropdown === "achievements") renderAchievements();
        if (activeNavDropdown === "prestige") renderPrestigeUpgrades();
        renderTabs();
    }
}

function renderShopControls() {
    elements.filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === game.shopFilter);
    });

    document.querySelectorAll(".amount-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.buyAmount === game.buyAmount);
    });
}

function renderTabs() {
    document.querySelectorAll(".nav-button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tab === activeNavDropdown);
    });
}

function getSaveData() {
    return {
        version: SAVE_VERSION,
        money: game.money,
        totalEarned: game.totalEarned,
        lifetimeEarned: game.lifetimeEarned,
        totalClicks: game.totalClicks,
        bestMoneyPerSecond: game.bestMoneyPerSecond,
        prestigePoints: game.prestigePoints,
        totalPrestiges: game.totalPrestiges,
        prestigeBonus: game.prestigeBonus,
        lastTickTime: Date.now(),
        lastSaveTime: Date.now(),
        clickFeedback: game.clickFeedback,
        soundEnabled: game.soundEnabled,
        activeTab: game.activeTab,
        shopFilter: game.shopFilter,
        buyAmount: game.buyAmount,
        shards: game.shards,
        boostMultiplier: game.boostMultiplier,
        boostEndTime: game.boostEndTime,
        dailyRewardClaimedAt: game.dailyRewardClaimedAt,
        dailyClaimStreak: game.dailyClaimStreak,
        activeEventId: game.activeEventId,
        activeEventEndsAt: game.activeEventEndsAt,
        nextEventAt: game.nextEventAt,
        activeSkin: game.activeSkin,
        unlockedSkins: game.unlockedSkins,
        achievementRewardedIds: game.achievementRewardedIds,
        activeSubTab: game.activeSubTab,
        offlineTurboActive: game.offlineTurboActive,
        buildings: game.buildings,
        buildingUpgrades: game.buildingUpgrades,
        upgrades: game.upgrades.map((upgrade) => ({
            id: upgrade.id,
            currentCost: upgrade.currentCost,
            amountOwned: upgrade.amountOwned
        })),
        prestigeUpgrades: game.prestigeUpgrades.map((upgrade) => ({
            id: upgrade.id,
            currentCost: upgrade.currentCost,
            amountOwned: upgrade.amountOwned
        })),
        achievements: game.achievements.map((achievement) => ({
            id: achievement.id,
            unlocked: achievement.unlocked
        }))
    };
}

function saveGame(showSavedMessage = true) {
    try {
        const saveData = getSaveData();
        localStorage.setItem(PRIMARY_SAVE_KEY, JSON.stringify(saveData));
        game.lastSaveTime = saveData.lastSaveTime;
        if (showSavedMessage) {
            elements.saveStatus.textContent = "Progress saved just now.";
        }
    } catch (error) {
        console.error("Save failed:", error);
        elements.saveStatus.textContent = "Save failed.";
    }
}

function getRawSave() {
    for (const key of SAVE_KEYS) {
        const value = localStorage.getItem(key);
        if (value) {
            return value;
        }
    }
    return "";
}

function migrateSave(rawSave) {
    const parsedSave = JSON.parse(rawSave);

    return {
        version: Number(parsedSave.version) || 1,
        money: Math.max(0, Number(parsedSave.money) || 0),
        totalEarned: Math.max(0, Number(parsedSave.totalEarned) || 0),
        lifetimeEarned: Math.max(0, Number(parsedSave.lifetimeEarned) || Number(parsedSave.totalEarned) || 0),
        totalClicks: Math.max(0, Number(parsedSave.totalClicks) || 0),
        bestMoneyPerSecond: Math.max(0, Number(parsedSave.bestMoneyPerSecond) || Number(parsedSave.moneyPerSecond) || 0),
        prestigePoints: Math.max(0, Number(parsedSave.prestigePoints) || 0),
        totalPrestiges: Math.max(0, Number(parsedSave.totalPrestiges) || 0),
        prestigeBonus: getPrestigeBonus(Math.max(0, Number(parsedSave.prestigePoints) || 0)),
        lastTickTime: Number(parsedSave.lastTickTime) || Date.now(),
        lastSaveTime: Number(parsedSave.lastSaveTime) || 0,
        clickFeedback: typeof parsedSave.clickFeedback === "string" ? parsedSave.clickFeedback : DEFAULT_STATE.clickFeedback,
        soundEnabled: Boolean(parsedSave.soundEnabled),
        activeTab: (() => {
            const t = parsedSave.activeTab;
            if (["shop", "progress", "achievements", "prestige", "settings"].includes(t)) return t;
            if (t === "stats") return "progress";
            return "shop";
        })(),
        shopFilter: ["all", "click", "passive"].includes(parsedSave.shopFilter) ? parsedSave.shopFilter : "all",
        buyAmount: ["1", "10", "max"].includes(String(parsedSave.buyAmount)) ? String(parsedSave.buyAmount) : "1",
        shards: Math.max(0, Number(parsedSave.shards) || 0),
        boostMultiplier: Math.max(1, Number(parsedSave.boostMultiplier) || 1),
        boostEndTime: Math.max(0, Number(parsedSave.boostEndTime) || 0),
        dailyRewardClaimedAt: Math.max(0, Number(parsedSave.dailyRewardClaimedAt) || 0),
        dailyClaimStreak: Math.max(0, Number(parsedSave.dailyClaimStreak) || 0),
        activeEventId: typeof parsedSave.activeEventId === "string" ? parsedSave.activeEventId : "calm-market",
        activeEventEndsAt: Math.max(0, Number(parsedSave.activeEventEndsAt) || 0),
        nextEventAt: Math.max(0, Number(parsedSave.nextEventAt) || 0),
        activeSkin: typeof parsedSave.activeSkin === "string" ? parsedSave.activeSkin : "mint",
        unlockedSkins: Array.isArray(parsedSave.unlockedSkins) ? parsedSave.unlockedSkins : ["mint"],
        achievementRewardedIds: Array.isArray(parsedSave.achievementRewardedIds) ? parsedSave.achievementRewardedIds : [],
        activeSubTab: ["click", "passive", "offline", "premium"].includes(parsedSave.activeSubTab) ? parsedSave.activeSubTab : "click",
        offlineTurboActive: Boolean(parsedSave.offlineTurboActive),
        buildings: (typeof parsedSave.buildings === "object" && parsedSave.buildings !== null) ? parsedSave.buildings : {},
        buildingUpgrades: (typeof parsedSave.buildingUpgrades === "object" && parsedSave.buildingUpgrades !== null) ? parsedSave.buildingUpgrades : {},
        upgrades: Array.isArray(parsedSave.upgrades) ? parsedSave.upgrades : [],
        prestigeUpgrades: Array.isArray(parsedSave.prestigeUpgrades) ? parsedSave.prestigeUpgrades : [],
        achievements: Array.isArray(parsedSave.achievements) ? parsedSave.achievements : []
    };
}

function applySaveData(saveData, options = {}) {
    const shouldApplyOfflineProgress = options.applyOfflineProgress !== false;

    resetToDefaults(false);

    game.money = saveData.money;
    game.totalEarned = saveData.totalEarned;
    game.lifetimeEarned = saveData.lifetimeEarned;
    game.totalClicks = saveData.totalClicks;
    game.bestMoneyPerSecond = saveData.bestMoneyPerSecond;
    game.prestigePoints = saveData.prestigePoints;
    game.totalPrestiges = saveData.totalPrestiges;
    game.lastTickTime = saveData.lastTickTime;
    game.lastSaveTime = saveData.lastSaveTime;
    game.clickFeedback = "Tap the button to get started.";
    game.soundEnabled = saveData.soundEnabled;
    game.activeTab = saveData.activeTab;
    game.shopFilter = saveData.shopFilter;
    game.buyAmount = saveData.buyAmount;
    game.shards = saveData.shards;
    game.boostMultiplier = saveData.boostMultiplier;
    game.boostEndTime = saveData.boostEndTime;
    game.dailyRewardClaimedAt = saveData.dailyRewardClaimedAt;
    game.dailyClaimStreak = saveData.dailyClaimStreak;
    game.activeEventId = saveData.activeEventId;
    game.activeEventEndsAt = saveData.activeEventEndsAt;
    game.nextEventAt = saveData.nextEventAt;
    game.activeSkin = saveData.activeSkin;
    game.unlockedSkins = saveData.unlockedSkins.includes("mint") ? saveData.unlockedSkins : ["mint", ...saveData.unlockedSkins];
    game.achievementRewardedIds = saveData.achievementRewardedIds;
    game.activeSubTab = saveData.activeSubTab || "click";
    game.offlineTurboActive = Boolean(saveData.offlineTurboActive);
    game.buildings = (typeof saveData.buildings === "object" && saveData.buildings !== null) ? saveData.buildings : {};
    game.buildingUpgrades = (typeof saveData.buildingUpgrades === "object" && saveData.buildingUpgrades !== null) ? saveData.buildingUpgrades : {};
    game.pendingOfflineEarnings = 0;
    game.pendingOfflineSeconds = 0;
    elements.offlineModal.hidden = true;

    game.upgrades = createDefaultUpgrades().map((defaultUpgrade) => {
        const savedUpgrade = saveData.upgrades.find((item) => item.id === defaultUpgrade.id);
        if (!savedUpgrade) {
            return defaultUpgrade;
        }

        return {
            ...defaultUpgrade,
            amountOwned: Math.max(0, Number(savedUpgrade.amountOwned) || 0),
            currentCost: Math.max(defaultUpgrade.baseCost, Number(savedUpgrade.currentCost) || defaultUpgrade.baseCost)
        };
    });

    game.achievements = createDefaultAchievements().map((defaultAchievement) => {
        const savedAchievement = saveData.achievements.find((item) => item.id === defaultAchievement.id);
        return {
            ...defaultAchievement,
            unlocked: Boolean(savedAchievement && savedAchievement.unlocked)
        };
    });

    game.prestigeUpgrades = createDefaultPrestigeUpgrades().map((defaultUpgrade) => {
        const savedUpgrade = saveData.prestigeUpgrades.find((item) => item.id === defaultUpgrade.id);
        return savedUpgrade
            ? {
                ...defaultUpgrade,
                amountOwned: Math.max(0, Number(savedUpgrade.amountOwned) || 0),
                currentCost: Math.max(defaultUpgrade.baseCost, Number(savedUpgrade.currentCost) || defaultUpgrade.baseCost)
            }
            : defaultUpgrade;
    });

    recalculateDerivedStats();
    maybeUnlockSkins();
    ensureEvent();
    if (shouldApplyOfflineProgress) {
        applyOfflineProgress(saveData.lastTickTime);
    } else {
        game.lastTickTime = Date.now();
    }
    updateStats();
}

function loadGame() {
    const rawSave = getRawSave();
    if (!rawSave) {
        ensureEvent(true);
        maybeUnlockSkins();
        recalculateDerivedStats();
        updateStats();
        renderSubTab(game.activeSubTab);
        return;
    }

    try {
        const migrated = migrateSave(rawSave);
        applySaveData(migrated, { applyOfflineProgress: true });
        saveGame(false);
    } catch (error) {
        console.error("Load failed, using defaults:", error);
        resetToDefaults();
        showToast("Save data was corrupted. Starting fresh safely.", "warning");
    }
}

function applyOfflineProgress(lastTickTime) {
    const previousTime = Number(lastTickTime);
    if (!Number.isFinite(previousTime) || previousTime <= 0 || game.moneyPerSecond <= 0) {
        return;
    }

    const elapsedSeconds = Math.min(8 * 60 * 60, Math.max(0, (Date.now() - previousTime) / 1000));
    if (elapsedSeconds < 5) {
        return;
    }

    const turboMult = game.offlineTurboActive ? 2 : 1;
    game.offlineTurboActive = false;
    const earnings = game.moneyPerSecond * elapsedSeconds * getOfflineMultiplier() * turboMult;
    earnMoney(earnings);
    game.pendingOfflineEarnings = earnings;
    game.pendingOfflineSeconds = elapsedSeconds;
    game.clickFeedback = `Welcome back! Offline earnings brought in $${formatNumber(earnings)}.`;
    openOfflineModal();
}

function exportSave() {
    try {
        setActiveTab("settings");
        const exportText = JSON.stringify(getSaveData());
        elements.saveTextarea.value = exportText;
        elements.saveTextarea.focus();
        elements.saveTextarea.select();
        showToast("Save exported to the text box.", "success");
    } catch (error) {
        console.error("Export failed:", error);
        showToast("Export failed.", "warning");
    }
}

function importSave() {
    setActiveTab("settings");
    const rawText = elements.saveTextarea.value.trim();
    if (!rawText) {
        showToast("Paste a save into the text box first.", "warning");
        return;
    }

    const confirmed = window.confirm("Import this save and replace current progress?");
    if (!confirmed) {
        return;
    }

    try {
        const migrated = migrateSave(rawText);
        applySaveData(migrated, { applyOfflineProgress: false });
        saveGame(true);
        showToast("Save imported successfully.", "success");
    } catch (error) {
        console.error("Import failed:", error);
        showToast("That save code is not valid.", "warning");
    }
}

function copyExportText() {
    const exportText = elements.saveTextarea.value.trim();
    if (!exportText) {
        exportSave();
    }

    const textToCopy = elements.saveTextarea.value.trim();
    if (!textToCopy) {
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => showToast("Export copied to clipboard.", "success"))
            .catch(() => showToast("Copy failed. The save is still in the text box.", "warning"));
        return;
    }

    elements.saveTextarea.focus();
    elements.saveTextarea.select();
    showToast("Copy shortcut unavailable here. The save text is selected for you.", "info");
}

function clearSaveText() {
    setActiveTab("settings");
    elements.saveTextarea.value = "";
    showToast("Save text cleared.", "info");
}

function resetToDefaults(showMessage = true) {
    Object.assign(game, clone(DEFAULT_STATE));
    game.upgrades = createDefaultUpgrades();
    game.prestigeUpgrades = createDefaultPrestigeUpgrades();
    game.achievements = createDefaultAchievements();
    game.lastTickTime = Date.now();
    elements.offlineModal.hidden = true;
    elements.eventModal.hidden = true;
    ensureEvent(true);
    recalculateDerivedStats();
    updateStats();

    if (showMessage) {
        elements.saveStatus.textContent = "Progress reset. New game ready.";
    }
}

function resetGame() {
    const confirmed = window.confirm("Reset all Money Tapper progress? This cannot be undone.");
    if (!confirmed) {
        return;
    }

    SAVE_KEYS.forEach((key) => localStorage.removeItem(key));
    resetToDefaults();
    showToast("Progress reset.", "warning");
}

function prestigeGame() {
    const gain = getAvailablePrestigeGain();
    if (gain <= 0) {
        showToast("Keep growing before you prestige.", "warning");
        return;
    }

    const confirmed = window.confirm(`Prestige now for ${gain} points? This resets money and upgrades, but keeps permanent bonuses.`);
    if (!confirmed) {
        return;
    }

    game.prestigePoints += gain;
    game.totalPrestiges += 1;
    game.shards += gain;
    game.money = 0;
    game.totalEarned = 0;
    game.totalClicks = 0;
    game.clickFeedback = `Prestige complete. Your empire returns with x${getPrestigeBonus(game.prestigePoints).toFixed(2)} power.`;
    game.upgrades = createDefaultUpgrades();
    game.lastTickTime = Date.now();
    recalculateDerivedStats();
    maybeUnlockSkins();
    ensureEvent(true);
    if (checkAchievements()) {
        updateStats();
    }
    createFloatingFeedback(`+${gain} PP`, "prestige");
    createMilestonePop("Prestige boosted");
    pulseStatCards();
    updateStats();
    saveGame(true);
    showToast(`Prestige complete. +${gain} points earned.`, "success");
}

function toggleSoundPlaceholder() {
    game.soundEnabled = !game.soundEnabled;
    updateStats();
    showToast(`Sound is ${game.soundEnabled ? "enabled" : "disabled"} as a placeholder for future audio.`, "info");
}

const NAV_DROPDOWN_TITLES = {
    progress: "Progress",
    achievements: "Achievements",
    prestige: "Prestige",
    settings: "Settings",
};

function openNavDropdown(name) {
    const panel = document.getElementById(`tab-${name}`);
    if (!panel || !elements.navDropdown) return;

    if (activeNavDropdown && activeNavDropdown !== name) {
        const prevPanel = document.getElementById(`tab-${activeNavDropdown}`);
        if (prevPanel) {
            prevPanel.hidden = true;
            document.querySelector(".tabs-panel").appendChild(prevPanel);
        }
    }

    activeNavDropdown = name;
    game.activeTab = name;

    elements.navDropdownBody.innerHTML = "";
    panel.hidden = false;
    elements.navDropdownBody.appendChild(panel);
    elements.navDropdownTitle.textContent = NAV_DROPDOWN_TITLES[name] || name;
    elements.navDropdownBackdrop.hidden = false;
    elements.navDropdown.hidden = false;

    if (name === "progress" || name === "achievements") renderAchievements();
    if (name === "prestige") renderPrestigeUpgrades();
    renderTabs();
}

function closeNavDropdown() {
    if (!activeNavDropdown) return;
    const panel = document.getElementById(`tab-${activeNavDropdown}`);
    if (panel) {
        panel.hidden = true;
        document.querySelector(".tabs-panel").appendChild(panel);
    }
    activeNavDropdown = null;
    game.activeTab = "shop";
    if (elements.navDropdown) elements.navDropdown.hidden = true;
    if (elements.navDropdownBackdrop) elements.navDropdownBackdrop.hidden = true;
    renderTabs();
}

function setActiveTab(tabName) {
    if (tabName === "shop" || !["progress", "achievements", "prestige", "settings"].includes(tabName)) {
        closeNavDropdown();
        return;
    }
    if (activeNavDropdown === tabName) {
        closeNavDropdown();
        return;
    }
    openNavDropdown(tabName);
}

function setShopFilter(filterName) {
    if (!["all", "click", "passive"].includes(filterName)) {
        return;
    }

    game.shopFilter = filterName;
    renderShopControls();
    renderUpgrades();
}

function setBuyAmount(amountValue) {
    if (!["1", "10", "max"].includes(String(amountValue))) {
        return;
    }

    game.buyAmount = String(amountValue);
    renderSubTab(game.activeSubTab);
    renderShopControls();
}

function openOfflineModal() {
    if (game.pendingOfflineEarnings <= 0) {
        return;
    }

    elements.offlineTimeDisplay.textContent = formatDuration(game.pendingOfflineSeconds);
    elements.offlineEarningsDisplay.textContent = `$${formatNumber(game.pendingOfflineEarnings)}`;
    elements.offlineHeroAmount.textContent = `$${formatNumber(game.pendingOfflineEarnings)}`;
    elements.offlineDescription.textContent = "Your empire kept working while you were away. Nice.";
    elements.offlineModal.removeAttribute?.("hidden");
    elements.offlineModal.hidden = false;
}

function closeOfflineModal() {
    game.pendingOfflineEarnings = 0;
    game.pendingOfflineSeconds = 0;
    elements.offlineModal.hidden = true;
    elements.offlineModal.setAttribute("hidden", "");
}

function addFeedItem(message, type, duration) {
    const list = document.getElementById("feed-list");
    if (!list) return null;
    const item = document.createElement("div");
    item.className = `feed-item type-${type}`;
    item.innerHTML = message;
    list.prepend(item);
    while (list.children.length > 20) list.removeChild(list.lastChild);
    return item;
}

function openEventModal(event) {
    const isTax = event.id === "tax-audit";
    const type = isTax ? "event-negative" : "event";
    const item = addFeedItem(
        `<div class="feed-item-title">${event.name}</div>` +
        `<div class="feed-item-sub">${event.description} ${getEventEffectText(event)}.</div>` +
        `<div class="feed-countdown" id="event-feed-countdown">Active for ${formatDuration(event.duration)}</div>`,
        type, 0
    );
    if (item) {
        let remaining = 10;
        const cd = item.querySelector("#event-feed-countdown");
        const tick = window.setInterval(() => {
            remaining--;
            if (cd) cd.textContent = remaining > 0
                ? `Event start over ${remaining}s`
                : `Event actief — ${formatDuration(event.duration)}`;
            if (remaining <= 0) window.clearInterval(tick);
        }, 1000);
    }
}

function closeEventModal() {
    elements.eventModal.hidden = true;
    elements.eventModal.setAttribute("hidden", "");
}

function ensureEvent(force = false) {
    const now = Date.now();
    if (force) {
        game.activeEventId = "calm-market";
        game.activeEventEndsAt = 0;
        game.nextEventAt = now + getNextEventDelayMs();
        closeEventModal();
        recalculateDerivedStats();
        return;
    }

    if (game.activeEventId !== "calm-market" && game.activeEventEndsAt > now) {
        return;
    }

    if (game.activeEventId !== "calm-market" && game.activeEventEndsAt <= now) {
        game.activeEventId = "calm-market";
        game.activeEventEndsAt = 0;
        game.nextEventAt = now + getNextEventDelayMs();
        closeEventModal();
        recalculateDerivedStats();
        showToast("Live event ended.", "info");
        return;
    }

    if (game.activeEventId === "calm-market" && game.nextEventAt > now) {
        return;
    }

    const pool = RANDOM_EVENTS.filter((event) => event.id !== "calm-market");
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    game.activeEventId = chosen.id;
    game.activeEventEndsAt = now + (chosen.duration * 1000);
    game.nextEventAt = 0;
    recalculateDerivedStats();
    openEventModal(chosen);
    showToast(`Live event: ${chosen.name}`, chosen.id === "tax-audit" ? "warning" : "success");
}

function getTaxAuditSkipCost() {
    return Math.max(500, Math.floor(game.moneyPerSecond * 20));
}

function skipTaxAudit() {
    const cost = getTaxAuditSkipCost();
    if (game.money < cost) {
        showToast(`Not enough money. Skip costs $${formatNumber(cost)}.`, "warning");
        return;
    }
    game.money -= cost;
    game.activeEventId = "calm-market";
    game.activeEventEndsAt = 0;
    game.nextEventAt = Date.now() + getNextEventDelayMs();
    recalculateDerivedStats();
    updateStats();
    showToast("Tax Audit dismissed. Back to business.", "success");
}

function updateEventBanner() {
    const now = Date.now();
    const currentEvent = getCurrentEvent();
    if (currentEvent.id === "calm-market") {
        elements.eventBanner.hidden = true;
        elements.eventBanner.classList.remove("event-negative");
        return;
    }

    const currentRemaining = Math.max(0, Math.floor((game.activeEventEndsAt - now) / 1000));
    const isTaxAudit = currentEvent.id === "tax-audit";
    elements.eventBanner.hidden = false;
    elements.eventBanner.classList.toggle("event-negative", isTaxAudit);
    elements.eventTitle.textContent = currentEvent.name;
    elements.eventDescription.textContent = `${currentEvent.description} ${getEventEffectText(currentEvent)}.`;
    elements.eventTimer.textContent = formatDuration(currentRemaining);

    if (elements.skipEventButton) {
        elements.skipEventButton.hidden = !isTaxAudit;
        if (isTaxAudit) {
            const cost = getTaxAuditSkipCost();
            elements.skipEventButton.textContent = `Pay $${formatNumber(cost)} to skip`;
            elements.skipEventButton.disabled = game.money < cost;
        }
    }
}

function claimDailyReward() {
    if (!isDailyRewardReady()) {
        showToast("Daily reward already claimed. Come back later.", "warning");
        return;
    }

    if (game.dailyRewardClaimedAt > 0 && Date.now() - game.dailyRewardClaimedAt > 48 * 60 * 60 * 1000) {
        game.dailyClaimStreak = 0;
    }

    const reward = getDailyRewardAmount();
    earnMoney(reward);
    game.dailyClaimStreak += 1;
    game.dailyRewardClaimedAt = Date.now();
    createFloatingFeedback(`+$${formatNumber(reward)}`, "prestige");
    if (game.dailyClaimStreak % 5 === 0) {
        game.shards += 1;
        showToast("Daily streak reward: +1 gold", "success");
    }
    pulseStatCards();
    updateStats();
    saveGame(false);
    showToast(`Daily reward claimed: $${formatNumber(reward)}`, "success");
}

function activateBoost() {
    if (Date.now() < game.boostEndTime) {
        showToast("Boost is al actief.", "warning");
        return;
    }
    game.boostMultiplier = 2;
    game.boostEndTime = Date.now() + (45 * 1000);
    recalculateDerivedStats();
    updateStats();
    saveGame(false);
    addFeedItem(`<div class="feed-item-title">2x Boost geactiveerd</div><div class="feed-item-sub">45 seconden lang 2x meer verdienen</div>`, "event", 0);
    showToast("Boost geactiveerd voor 45 seconden.", "success");
}

function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.dataset.icon = type === "success" ? "OK" : type === "warning" ? "!" : "i";
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 2800);
}

function getSaveStatusText() {
    if (!game.lastSaveTime) {
        return "Progress not saved yet.";
    }

    const secondsSinceSave = Math.max(0, Math.floor((Date.now() - game.lastSaveTime) / 1000));
    return secondsSinceSave < 3 ? "Progress saved just now." : `Progress saved ${secondsSinceSave}s ago.`;
}

function createFloatingFeedback(text, type = "click") {
    const marker = document.createElement("span");
    marker.className = `floating-gain ${type}`;
    marker.textContent = text;
    marker.style.left = `${38 + Math.random() * 24}%`;
    elements.floatingFeedbackLayer.appendChild(marker);

    window.setTimeout(() => {
        marker.remove();
    }, 950);
}

function createMilestonePop(text) {
    const pop = document.createElement("span");
    pop.className = "milestone-pop";
    pop.textContent = text;
    elements.burstFeedbackLayer.appendChild(pop);

    window.setTimeout(() => {
        pop.remove();
    }, 1000);
}

function createBurstFeedback() {
    const burst = document.createElement("span");
    burst.className = "burst";
    elements.burstFeedbackLayer.appendChild(burst);

    window.setTimeout(() => {
        burst.remove();
    }, 500);
}

function passiveIncomeLoop() {
    const now = Date.now();
    const deltaSeconds = Math.max(0, (now - game.lastTickTime) / 1000);
    game.lastTickTime = now;

    if (game.boostEndTime > 0 && now >= game.boostEndTime && game.boostMultiplier !== 1) {
        game.boostMultiplier = 1;
        recalculateDerivedStats();
        showToast("Boost ended.", "info");
    }

    ensureEvent(false);

    if (game.moneyPerSecond > 0 && deltaSeconds > 0) {
        const earned = game.moneyPerSecond * deltaSeconds;
        earnMoney(earned);
        passiveFeedbackBuffer += earned;
        game.bestMoneyPerSecond = Math.max(game.bestMoneyPerSecond, game.moneyPerSecond);
        updateStats({ renderCollections: false });
        if (checkAchievements()) {
            updateStats();
        }

        if (Date.now() - lastPassiveFeedbackTime > 1200 && passiveFeedbackBuffer >= 1) {
            createFloatingFeedback(`+$${formatNumber(passiveFeedbackBuffer)}`, "passive");
            passiveFeedbackBuffer = 0;
            lastPassiveFeedbackTime = Date.now();
        }
    } else {
        elements.saveStatus.textContent = getSaveStatusText();
        updateEventBanner();
    }
}

function handleUpgradeClick(event) {
    const button = event.target.closest("[data-upgrade-id]");
    if (button) {
        buyUpgrade(button.dataset.upgradeId);
        return;
    }

    const card = event.target.closest("[data-upgrade-card]");
    if (!card) {
        return;
    }

    const upgrade = getUpgradeById(card.dataset.upgradeCard);
    if (!upgrade) {
        return;
    }

    const bulkInfo = getBulkPurchaseInfo(upgrade);
    if (bulkInfo.amount <= 0) {
        showToast(`You cannot afford any ${upgrade.name} yet.`, "warning");
        return;
    }

    if (game.money < bulkInfo.totalCost) {
        showToast(`You need $${formatNumber(bulkInfo.totalCost)} for ${upgrade.name}.`, "warning");
    }
}

function handlePrestigeUpgradeClick(event) {
    const button = event.target.closest("[data-prestige-upgrade-id]");
    if (!button) {
        return;
    }

    buyPrestigeUpgrade(button.dataset.prestigeUpgradeId);
}

function bindEvents() {
    elements.tapButton.addEventListener("click", clickMoney);
    if (elements.upgradesList) elements.upgradesList.addEventListener("click", handleUpgradeClick);
    if (elements.prestigeUpgradesList) elements.prestigeUpgradesList.addEventListener("click", handlePrestigeUpgradeClick);

    // Shop sub-tab delegation (subtab buttons, buy-amount, ad-type, upgrade buy)
    const shopPanel = document.getElementById("tab-shop");
    if (shopPanel) {
        shopPanel.addEventListener("click", (e) => {
            const subtabBtn = e.target.closest(".shop-subtab-button");
            if (subtabBtn) { setActiveSubTab(subtabBtn.dataset.subtab); return; }

            const buyAmtBtn = e.target.closest("[data-buy-amount]");
            if (buyAmtBtn) { setBuyAmount(buyAmtBtn.dataset.buyAmount); return; }

            const adBtn = e.target.closest("[data-ad-type]");
            if (adBtn && !adBtn.disabled) { openAdModal(adBtn.dataset.adType); return; }

            const buildingBtn = e.target.closest("[data-building-id]");
            if (buildingBtn && !buildingBtn.disabled) {
                const id = buildingBtn.dataset.buildingId;
                const cost = Number(buildingBtn.dataset.buildingCost);
                const amount = Math.max(1, Number(buildingBtn.dataset.buildingAmount) || 1);
                if (game.money >= cost) {
                    game.money -= cost;
                    if (!game.buildings[id]) game.buildings[id] = { owned: 0 };
                    game.buildings[id].owned += amount;
                    recalculateDerivedStats();
                    renderSubTab("passive");
                    updateStats({ renderCollections: false });
                    saveGame(false);
                }
                return;
            }

            const buildingUpgBtn = e.target.closest("[data-building-upgrade-id]");
            if (buildingUpgBtn && !buildingUpgBtn.disabled) {
                const id = buildingUpgBtn.dataset.buildingUpgradeId;
                const cost = Number(buildingUpgBtn.dataset.buildingUpgradeCost);
                if (game.money >= cost) {
                    game.money -= cost;
                    game.buildingUpgrades[id] = true;
                    recalculateDerivedStats();
                    renderSubTab("passive");
                    updateStats({ renderCollections: false });
                    saveGame(false);
                }
                return;
            }

            const upgradeBtn = e.target.closest("[data-upgrade-id]");
            if (upgradeBtn && !upgradeBtn.disabled) { buyUpgrade(upgradeBtn.dataset.upgradeId); return; }

            const prestigeBtn = e.target.closest("[data-prestige-upgrade-id]");
            if (prestigeBtn && !prestigeBtn.disabled) { buyPrestigeUpgrade(prestigeBtn.dataset.prestigeUpgradeId); return; }
        });
    }
    elements.resetButton.addEventListener("click", resetGame);
    elements.dailyRewardButton.addEventListener("click", claimDailyReward);
    elements.exportButton.addEventListener("click", exportSave);
    elements.importButton.addEventListener("click", importSave);
    elements.copyExportButton.addEventListener("click", copyExportText);
    elements.clearSaveTextButton.addEventListener("click", clearSaveText);
    elements.soundToggle.addEventListener("click", toggleSoundPlaceholder);
    elements.prestigeButton.addEventListener("click", prestigeGame);
    elements.claimOfflineButton.addEventListener("click", closeOfflineModal);
    elements.closeEventButton.addEventListener("click", closeEventModal);
    if (elements.skipEventButton) {
        elements.skipEventButton.addEventListener("click", skipTaxAudit);
    }
    elements.offlineModal.addEventListener("click", (event) => {
        if (event.target === elements.offlineModal) {
            closeOfflineModal();
        }
    });
    elements.eventModal.addEventListener("click", (event) => {
        if (event.target === elements.eventModal) {
            closeEventModal();
        }
    });
    elements.tabButtons.forEach((button) => {
        button.addEventListener("click", () => setActiveTab(button.dataset.tab));
    });
    elements.filterButtons.forEach((button) => {
        button.addEventListener("click", () => setShopFilter(button.dataset.filter));
    });
    elements.amountButtons.forEach((button) => {
        button.addEventListener("click", () => setBuyAmount(button.dataset.buyAmount));
    });

    if (elements.skinSwitcher) {
        elements.skinSwitcher.addEventListener("click", (event) => {
            const btn = event.target.closest("[data-skin-id]");
            if (!btn || btn.disabled) return;
            game.activeSkin = btn.dataset.skinId;
            applyThemeFromProgress();
            renderSkinSwitcher();
            saveGame(false);
        });
    }

    if (elements.adModal) {
        elements.adModal.addEventListener("click", (e) => {
            if (e.target === elements.adModal) elements.adModal.hidden = true;
        });
    }

    document.querySelectorAll(".nav-button").forEach(btn => {
        btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
    });

    // Achievement tooltip — viewport-aware
    const achTooltipEl = document.getElementById("ach-tooltip");
    if (achTooltipEl) {
        document.addEventListener("mouseover", (e) => {
            const icon = e.target.closest(".achievement-icon[data-tooltip]");
            if (!icon) return;
            achTooltipEl.textContent = icon.dataset.tooltip;
            achTooltipEl.style.display = "block";
            const rect = icon.getBoundingClientRect();
            const ttRect = achTooltipEl.getBoundingClientRect();
            const margin = 8;
            let left = rect.left + rect.width / 2 - ttRect.width / 2;
            left = Math.max(margin, Math.min(left, window.innerWidth - ttRect.width - margin));
            let top = rect.top - ttRect.height - margin;
            if (top < margin) top = rect.bottom + margin;
            achTooltipEl.style.left = left + "px";
            achTooltipEl.style.top = top + "px";
        });
        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(".achievement-icon[data-tooltip]")) {
                achTooltipEl.style.display = "none";
            }
        });
    }

    if (elements.navDropdownClose) {
        elements.navDropdownClose.addEventListener("click", closeNavDropdown);
    }
    if (elements.navDropdownBackdrop) {
        elements.navDropdownBackdrop.addEventListener("click", closeNavDropdown);
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && activeNavDropdown) closeNavDropdown();
    });

    window.addEventListener("beforeunload", () => saveGame(false));
}

// ── Sub-tab system ────────────────────────────────────────────────────────────

let pendingAdType = null;

function createBuyAmountBar() {
    const div = document.createElement("div");
    div.className = "buy-amount-group subtab-buy-bar";
    div.setAttribute("role", "group");
    div.innerHTML = `
        <span class="toolbar-label">Buy</span>
        <button class="amount-button${game.buyAmount === "1" ? " active" : ""}" type="button" data-buy-amount="1">x1</button>
        <button class="amount-button${game.buyAmount === "10" ? " active" : ""}" type="button" data-buy-amount="10">x10</button>
        <button class="amount-button${game.buyAmount === "max" ? " active" : ""}" type="button" data-buy-amount="max">Max</button>
    `;
    return div;
}

function setActiveSubTab(name) {
    if (!["click", "passive", "offline", "premium"].includes(name)) return;
    game.activeSubTab = name;
    renderSubTab(name);
}

function renderSubTab(name) {
    const container = document.getElementById("subtab-content");
    if (!container) return;
    container.innerHTML = "";

    if (name === "click") {
        renderClickShop(container);
    } else if (name === "passive") {
        renderBuildingShop(container);
    } else if (name === "offline") {
        renderOfflineShop(container);
    } else if (name === "premium") {
        renderPremiumSubtab(container);
    }

    document.querySelectorAll(".shop-subtab-button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.subtab === name);
    });
}

function renderClickShop(container) {
    container.appendChild(createBuyAmountBar());

    const saved = game.shopFilter;
    game.shopFilter = "click";
    const upgrades = getVisibleUpgrades();
    game.shopFilter = saved;

    upgrades.forEach((upgrade) => {
        const bulkInfo = getBulkPurchaseInfo(upgrade);
        const canAfford = bulkInfo.amount > 0 && game.money >= bulkInfo.totalCost;
        const costText = bulkInfo.amount > 0 ? `$${formatNumber(bulkInfo.totalCost)}` : `$${formatNumber(upgrade.currentCost)}`;
        const buttonText = bulkInfo.amount > 0 ? `Buy x${bulkInfo.amount}` : "Too Expensive";

        const card = document.createElement("article");
        card.className = `building-card${canAfford ? " affordable" : ""}`;
        card.innerHTML = `
            <div class="building-card-header">
                <div class="building-card-icon">${UPGRADE_ICONS[upgrade.id] || "UP"}</div>
                <div class="building-card-meta">
                    <div class="building-card-name">${upgrade.name}</div>
                    <div class="building-card-desc">${upgrade.description}</div>
                </div>
                <div class="building-card-owned-badge">
                    <span class="mini-label">Owned</span>
                    <strong>${upgrade.amountOwned}</strong>
                </div>
            </div>
            <div class="building-card-output">+$${formatNumber(upgrade.effectValue * game.prestigeBonus)} per klik</div>
            <div class="building-card-footer">
                <span class="building-card-cost">${costText}</span>
                <button class="buy-button buy-button--building" type="button"
                    data-upgrade-id="${upgrade.id}"
                    ${canAfford ? "" : "disabled"}>
                    ${buttonText}
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    const nextLocked = game.upgrades
        .filter((u) => u.effectType === "click" && game.lifetimeEarned < (u.unlockAt || 0))
        .sort((a, b) => a.unlockAt - b.unlockAt)[0];
    if (nextLocked) {
        const teaser = document.createElement("div");
        teaser.className = "upgrade-next-teaser";
        teaser.innerHTML = `
            <div class="upgrade-next-icon">?</div>
            <div>
                <div class="upgrade-next-name">${nextLocked.name}</div>
                <div class="upgrade-next-hint">Earn <strong>$${formatNumber(nextLocked.unlockAt - game.lifetimeEarned)}</strong> more</div>
            </div>`;
        container.appendChild(teaser);
    }
}

function renderOfflineShop(container) {
    const badge = document.createElement("div");
    badge.className = "offline-mult-display";
    badge.innerHTML = `<span class="mini-label">Current offline multiplier</span><strong class="offline-mult-value">${Math.round(getOfflineMultiplier() * 100)}%</strong>`;
    container.appendChild(badge);
    container.appendChild(createBuyAmountBar());

    const saved = game.shopFilter;
    game.shopFilter = "offline";
    const upgrades = getVisibleUpgrades();
    game.shopFilter = saved;

    upgrades.forEach((upgrade) => {
        const bulkInfo = getBulkPurchaseInfo(upgrade);
        const canAfford = bulkInfo.amount > 0 && game.money >= bulkInfo.totalCost;
        const costText = bulkInfo.amount > 0 ? `$${formatNumber(bulkInfo.totalCost)}` : `$${formatNumber(upgrade.currentCost)}`;
        const buttonText = bulkInfo.amount > 0 ? `Buy x${bulkInfo.amount}` : "Too Expensive";

        const card = document.createElement("article");
        card.className = `building-card${canAfford ? " affordable" : ""}`;
        card.innerHTML = `
            <div class="building-card-header">
                <div class="building-card-icon">${UPGRADE_ICONS[upgrade.id] || "OF"}</div>
                <div class="building-card-meta">
                    <div class="building-card-name">${upgrade.name}</div>
                    <div class="building-card-desc">${upgrade.description}</div>
                </div>
                <div class="building-card-owned-badge">
                    <span class="mini-label">Owned</span>
                    <strong>${upgrade.amountOwned}</strong>
                </div>
            </div>
            <div class="building-card-output">+${Math.round(upgrade.effectValue * 100)}% offline earnings per level</div>
            <div class="building-card-footer">
                <span class="building-card-cost">${costText}</span>
                <button class="buy-button buy-button--building" type="button"
                    data-upgrade-id="${upgrade.id}"
                    ${canAfford ? "" : "disabled"}>
                    ${buttonText}
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    const nextLocked = game.upgrades
        .filter((u) => u.effectType === "offline" && game.lifetimeEarned < (u.unlockAt || 0))
        .sort((a, b) => a.unlockAt - b.unlockAt)[0];
    if (nextLocked) {
        const teaser = document.createElement("div");
        teaser.className = "upgrade-next-teaser";
        teaser.innerHTML = `
            <div class="upgrade-next-icon">?</div>
            <div>
                <div class="upgrade-next-name">${nextLocked.name}</div>
                <div class="upgrade-next-hint">Earn <strong>$${formatNumber(nextLocked.unlockAt - game.lifetimeEarned)}</strong> more</div>
            </div>`;
        container.appendChild(teaser);
    }
}

function renderBuildingShop(container) {
    container.appendChild(createBuyAmountBar());
    BUILDING_DEFINITIONS.forEach(bDef => {
        if (game.lifetimeEarned < bDef.unlockAt) return;

        const owned = game.buildings[bDef.id]?.owned || 0;
        const bulk = getBulkBuildingInfo(bDef);
        const canAfford = bulk.amount > 0 && game.money >= bulk.totalCost;

        let multiplier = 1;
        bDef.upgrades.forEach(upg => {
            if (game.buildingUpgrades[upg.id]) multiplier *= upg.effect;
        });
        const totalOutput = owned * bDef.baseIncome * multiplier;
        const costText = bulk.amount > 0 ? `$${formatNumber(bulk.totalCost)}` : `$${formatNumber(Math.ceil(bDef.baseCost * Math.pow(bDef.costScale, owned)))}`;
        const buttonText = bulk.amount > 0 ? `Buy x${bulk.amount}` : "Too Expensive";

        const card = document.createElement("article");
        card.className = `building-card${canAfford ? " affordable" : ""}`;
        card.innerHTML = `
            <div class="building-card-header">
                <div class="building-card-icon">${bDef.icon}</div>
                <div class="building-card-meta">
                    <div class="building-card-name">${bDef.name}</div>
                    <div class="building-card-desc">${bDef.description}</div>
                </div>
                <div class="building-card-owned-badge">
                    <span class="mini-label">Owned</span>
                    <strong>${owned}</strong>
                </div>
            </div>
            <div class="building-card-output">Output: <strong>$${formatNumber(totalOutput)}/s</strong></div>
            <div class="building-card-footer">
                <span class="building-card-cost">${costText}</span>
                <button class="buy-button buy-button--building" type="button"
                    data-building-id="${bDef.id}"
                    data-building-cost="${bulk.totalCost}"
                    data-building-amount="${bulk.amount}"
                    ${canAfford ? "" : "disabled"}>
                    ${buttonText}
                </button>
            </div>
            ${owned > 0 ? renderBuildingUpgradesHtml(bDef) : ""}
        `;
        container.appendChild(card);
    });

    const next = BUILDING_DEFINITIONS.find(b => game.lifetimeEarned < b.unlockAt);
    if (next) {
        const teaser = document.createElement("div");
        teaser.className = "upgrade-next-teaser";
        teaser.innerHTML = `
            <div class="upgrade-next-icon">?</div>
            <div>
                <div class="upgrade-next-name">${next.name}</div>
                <div class="upgrade-next-hint">Earn <strong>$${formatNumber(next.unlockAt - game.lifetimeEarned)}</strong> more</div>
            </div>`;
        container.appendChild(teaser);
    }
}

function renderBuildingUpgradesHtml(bDef) {
    return `<div class="building-card-multipliers">
        ${bDef.upgrades.map(upg => {
            const bought = !!game.buildingUpgrades[upg.id];
            const canAfford = !bought && game.money >= upg.cost;
            return `<div class="multiplier-tier${bought ? " owned" : ""}">
                <span class="multiplier-badge">${upg.effect}×</span>
                <span class="multiplier-label">${upg.name}</span>
                ${bought
                    ? `<span class="multiplier-status">✓</span>`
                    : `<button class="buy-button buy-button--sm" type="button"
                        data-building-upgrade-id="${upg.id}"
                        data-building-upgrade-cost="${upg.cost}"
                        ${canAfford ? "" : "disabled"}>
                        $${formatNumber(upg.cost)}
                      </button>`
                }
            </div>`;
        }).join("")}
    </div>`;
}

function renderPrestigeUpgrades(container) {
    const listEl = container || elements.prestigeUpgradesList;
    if (!listEl) return;
    listEl.innerHTML = "";
    game.prestigeUpgrades.forEach((upgrade) => {
        const canAfford = game.shards >= upgrade.currentCost;
        const card = document.createElement("article");
        card.className = `upgrade-row rarity-prestige ${canAfford ? "affordable" : ""}`;
        card.innerHTML = `
            <div class="upgrade-row-icon">PS</div>
            <div class="upgrade-row-body">
                <div class="upgrade-row-title">
                    <span class="upgrade-row-name">${upgrade.name}</span>
                    <span class="upgrade-tag">Permanent</span>
                    <span class="upgrade-badge">${upgrade.badge}</span>
                </div>
                <p class="upgrade-description">${upgrade.description}</p>
            </div>
            <div class="upgrade-row-owned">
                <span class="mini-label">Owned</span>
                <strong>${upgrade.amountOwned}</strong>
            </div>
            <div class="upgrade-row-action">
                <span class="upgrade-row-cost">${formatNumber(upgrade.currentCost)} gold</span>
                <button class="buy-button buy-button--row" type="button" data-prestige-upgrade-id="${upgrade.id}" ${canAfford ? "" : "disabled"}>
                    ${canAfford ? "Buy Upgrade" : "Need More Gold"}
                </button>
            </div>`;
        listEl.appendChild(card);
    });
}

function renderPremiumSubtab(container) {
    container.appendChild(createBuyAmountBar());
    // Permanent (Gold)
    const h4a = document.createElement("h4");
    h4a.className = "prestige-shop-title";
    h4a.textContent = "Permanent (Gold)";
    container.appendChild(h4a);

    const shardsInfo = document.createElement("div");
    shardsInfo.className = "premium-shards-info";
    shardsInfo.innerHTML = `<span class="mini-label">Available gold</span> <strong>${formatNumber(game.shards)}</strong>`;
    container.appendChild(shardsInfo);

    game.prestigeUpgrades.forEach((upgrade) => {
        const canAfford = game.shards >= upgrade.currentCost;
        const card = document.createElement("article");
        card.className = `building-card rarity-prestige${canAfford ? " affordable" : ""}`;
        card.innerHTML = `
            <div class="building-card-header">
                <div class="building-card-icon">★</div>
                <div class="building-card-meta">
                    <div class="building-card-name">${upgrade.name}</div>
                    <div class="building-card-desc">${upgrade.description}</div>
                </div>
                <div class="building-card-owned-badge">
                    <span class="mini-label">Owned</span>
                    <strong>${upgrade.amountOwned}</strong>
                </div>
            </div>
            <div class="building-card-output">${upgrade.badge} — Permanent bonus</div>
            <div class="building-card-footer">
                <span class="building-card-cost">${formatNumber(upgrade.currentCost)} 🥇</span>
                <button class="buy-button buy-button--building" type="button"
                    data-prestige-upgrade-id="${upgrade.id}"
                    ${canAfford ? "" : "disabled"}>
                    ${canAfford ? "Buy" : "Not enough gold"}
                </button>
            </div>`;
        container.appendChild(card);
    });

    // Boosts (Advertentie)
    const h4b = document.createElement("h4");
    h4b.className = "prestige-shop-title";
    h4b.style.marginTop = "1.5rem";
    h4b.textContent = "Boosts (Ad)";
    container.appendChild(h4b);

    const boostActive = Date.now() < game.boostEndTime;
    const boostRemaining = boostActive ? formatDuration((game.boostEndTime - Date.now()) / 1000) : "";
    const boostBtnText = boostActive ? `Active: ${boostRemaining}` : "Watch Ad";

    [
        { type: "boost-2x", icon: "⚡", label: "2× Boost", output: "Earn 2× more for 45 seconds", desc: "Watch an ad to earn 2× more for 45 seconds.", disabled: boostActive, btnText: boostBtnText },
        { type: "boost-3x", icon: "⚡", label: "3× Boost", output: "Earn 3× more for 30 seconds", desc: "Watch an ad to earn 3× more for 30 seconds.", disabled: boostActive, btnText: boostBtnText },
        { type: "offline-turbo", icon: "🌙", label: "Offline Turbo", output: "Double offline multiplier (one-time)", desc: "Double the offline multiplier for the next offline session.", disabled: game.offlineTurboActive, btnText: game.offlineTurboActive ? "Active (next offline)" : "Watch Ad" }
    ].forEach(({ type, icon, label, output, desc, disabled, btnText }) => {
        const card = document.createElement("article");
        card.className = `building-card${!disabled ? " affordable" : ""}`;
        card.innerHTML = `
            <div class="building-card-header">
                <div class="building-card-icon">${icon}</div>
                <div class="building-card-meta">
                    <div class="building-card-name">${label}</div>
                    <div class="building-card-desc">${desc}</div>
                </div>
            </div>
            <div class="building-card-output">${output}</div>
            <div class="building-card-footer">
                <span class="building-card-cost">Gratis</span>
                <button class="buy-button buy-button--building" type="button"
                    data-ad-type="${type}"
                    ${disabled ? "disabled" : ""}>
                    ${btnText}
                </button>
            </div>`;
        container.appendChild(card);
    });
}

function openAdModal(adType) {
    pendingAdType = adType;
    const titles = { "boost-2x": "2× Boost beschikbaar!", "boost-3x": "3× Boost beschikbaar!", "offline-turbo": "Offline Turbo beschikbaar!" };
    const titleEl = document.getElementById("ad-modal-title");
    if (titleEl) titleEl.textContent = titles[adType] || "Boost beschikbaar!";
    elements.adModal.hidden = false;
    let secs = 5;
    elements.adCountdownDisplay.textContent = secs;
    elements.skipAdButton.disabled = true;
    elements.skipAdButton.textContent = `Wacht... (${secs}s)`;
    const iv = window.setInterval(() => {
        secs -= 1;
        elements.adCountdownDisplay.textContent = secs;
        elements.skipAdButton.textContent = secs > 0 ? `Wacht... (${secs}s)` : "Claim Boost";
        if (secs <= 0) {
            window.clearInterval(iv);
            elements.skipAdButton.disabled = false;
        }
    }, 1000);
    elements.skipAdButton.onclick = () => {
        elements.adModal.hidden = true;
        claimAdReward(pendingAdType);
        pendingAdType = null;
    };
}

function claimAdReward(adType) {
    if (adType === "boost-2x") {
        game.boostMultiplier = 2;
        game.boostEndTime = Date.now() + 45000;
        recalculateDerivedStats();
        addFeedItem(`<div class="feed-item-title">2× Boost activated</div><div class="feed-item-sub">Earn 2× more for 45 seconds</div>`, "event", 0);
        showToast("2× Boost activated for 45 seconds.", "success");
    } else if (adType === "boost-3x") {
        game.boostMultiplier = 3;
        game.boostEndTime = Date.now() + 30000;
        recalculateDerivedStats();
        addFeedItem(`<div class="feed-item-title">3× Boost activated</div><div class="feed-item-sub">Earn 3× more for 30 seconds</div>`, "event", 0);
        showToast("3× Boost activated for 30 seconds.", "success");
    } else if (adType === "offline-turbo") {
        game.offlineTurboActive = true;
        addFeedItem(`<div class="feed-item-title">Offline Turbo active</div><div class="feed-item-sub">Next offline session 2× earnings</div>`, "event", 0);
        showToast("Offline Turbo activated!", "success");
    }
    updateStats();
    saveGame(false);
}

function startGame() {
    loadGame();
    bindEvents();

    // Edit autosave timing here.
    window.setInterval(passiveIncomeLoop, 100);
    window.setInterval(() => saveGame(true), 5000);
}

startGame();
