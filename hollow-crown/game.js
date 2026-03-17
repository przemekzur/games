(() => {
  const TILE = 48;
  const MAP_W = 24;
  const MAP_H = 15;
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const heroChip = document.getElementById("heroChip");
  const sigilChip = document.getElementById("sigilChip");
  const objectiveChip = document.getElementById("objectiveChip");
  const regionChip = document.getElementById("regionChip");
  const levelChip = document.getElementById("levelChip");
  const goldChip = document.getElementById("goldChip");
  const locationName = document.getElementById("locationName");
  const locationText = document.getElementById("locationText");
  const actionCard = document.getElementById("actionCard");
  const actionTitle = document.getElementById("actionTitle");
  const actionText = document.getElementById("actionText");
  const questHeading = document.getElementById("questHeading");
  const questSummary = document.getElementById("questSummary");
  const questList = document.getElementById("questList");
  const heroClassTag = document.getElementById("heroClassTag");
  const heroName = document.getElementById("heroName");
  const heroBlurb = document.getElementById("heroBlurb");
  const heroAvatar = document.getElementById("heroAvatar");
  const xpChip = document.getElementById("xpChip");
  const potionChip = document.getElementById("potionChip");
  const hpText = document.getElementById("hpText");
  const mpText = document.getElementById("mpText");
  const hpBar = document.getElementById("hpBar");
  const mpBar = document.getElementById("mpBar");
  const statGrid = document.getElementById("statGrid");
  const inventoryGrid = document.getElementById("inventoryGrid");
  const logFeed = document.getElementById("logFeed");
  const focusQuestBtn = document.getElementById("focusQuestBtn");
  const restartBtn = document.getElementById("restartBtn");
  const toast = document.getElementById("toast");

  const startOverlay = document.getElementById("startOverlay");
  const classGrid = document.getElementById("classGrid");
  const startJourneyBtn = document.getElementById("startJourneyBtn");

  const dialogOverlay = document.getElementById("dialogOverlay");
  const dialogKicker = document.getElementById("dialogKicker");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogText = document.getElementById("dialogText");
  const dialogConfirmBtn = document.getElementById("dialogConfirmBtn");

  const battleOverlay = document.getElementById("battleOverlay");
  const battleTitle = document.getElementById("battleTitle");
  const battleHeroName = document.getElementById("battleHeroName");
  const battleHeroSummary = document.getElementById("battleHeroSummary");
  const battleHeroHpText = document.getElementById("battleHeroHpText");
  const battleHeroMpText = document.getElementById("battleHeroMpText");
  const battleHeroHp = document.getElementById("battleHeroHp");
  const battleHeroMp = document.getElementById("battleHeroMp");
  const battleEnemyName = document.getElementById("battleEnemyName");
  const battleEnemySummary = document.getElementById("battleEnemySummary");
  const battleEnemyHpText = document.getElementById("battleEnemyHpText");
  const battleEnemyHp = document.getElementById("battleEnemyHp");
  const battleHeroPortrait = document.getElementById("battleHeroPortrait");
  const battleEnemyPortrait = document.getElementById("battleEnemyPortrait");
  const battleLog = document.getElementById("battleLog");
  const attackBtn = document.getElementById("attackBtn");
  const abilityBtn = document.getElementById("abilityBtn");
  const guardBtn = document.getElementById("guardBtn");
  const potionBtn = document.getElementById("potionBtn");

  const endOverlay = document.getElementById("endOverlay");
  const endKicker = document.getElementById("endKicker");
  const endTitle = document.getElementById("endTitle");
  const endText = document.getElementById("endText");
  const playAgainBtn = document.getElementById("playAgainBtn");

  const archetypes = [
    {
      id: "warden",
      name: "Astra Warden",
      title: "Blade of Lantern Court",
      summary: "Balanced vanguard with heavy vitality and a comet-slash finisher.",
      blurb: "A sworn frontier knight who answers ruin with calm steel and perfect timing.",
      palette: {
        primary: "#f0cf7b",
        secondary: "#6dafff",
        accent: "#f4fbff",
        skin: "#e7bb90",
        hair: "#fff0c6",
        glow: "rgba(240, 207, 123, 0.28)"
      },
      stats: { maxHp: 118, maxMp: 34, attack: 15, defense: 9, magic: 8, speed: 7 },
      ability: { name: "Starfall Slash", cost: 10, text: "A crushing celestial arc that shatters guard.", mode: "burst" }
    },
    {
      id: "seer",
      name: "Bloom Seer",
      title: "Oracle-Bound Arcanist",
      summary: "Fragile mystic with huge focus reserves, drain magic, and map control.",
      blurb: "A veil-reader whose spells turn moonlit petals into living blades.",
      palette: {
        primary: "#82ead0",
        secondary: "#78a9ff",
        accent: "#f2fffc",
        skin: "#ddb38b",
        hair: "#e8fff8",
        glow: "rgba(130, 234, 208, 0.28)"
      },
      stats: { maxHp: 90, maxMp: 62, attack: 9, defense: 6, magic: 16, speed: 8 },
      ability: { name: "Verdant Surge", cost: 12, text: "Explodes in bloomlight and siphons vitality.", mode: "drain" }
    },
    {
      id: "rogue",
      name: "Nightglass Rogue",
      title: "Rift-Edge Saboteur",
      summary: "Fast glassblade duelist with burst crits and slippery tempo.",
      blurb: "Raised on the rim of the rift where every mistake becomes a lesson in speed.",
      palette: {
        primary: "#d7a0ff",
        secondary: "#ff90be",
        accent: "#fff4ff",
        skin: "#deb087",
        hair: "#f6e8ff",
        glow: "rgba(215, 160, 255, 0.28)"
      },
      stats: { maxHp: 98, maxMp: 42, attack: 13, defense: 7, magic: 11, speed: 13 },
      ability: { name: "Nightglass Feint", cost: 8, text: "A flashing combo with elevated critical chance.", mode: "crit" }
    }
  ];

  const enemyTemplates = {
    bloomGuardian: {
      name: "Mirethorn Ravager",
      title: "Guardian of Bloom",
      summary: "A root-beast animated by marshlight and hungry pollen.",
      hp: 74,
      attack: 13,
      defense: 5,
      magic: 4,
      speed: 7,
      xp: 48,
      gold: 24,
      intro: "The bloom marsh parts and a Mirethorn Ravager claws free of the roots.",
      palette: {
        primary: "#77e48c",
        secondary: "#274f35",
        accent: "#dfffe3"
      }
    },
    tideGuardian: {
      name: "Glassbound Archivist",
      title: "Guardian of Tides",
      summary: "A drowned archivist shell that still obeys the old catalogs.",
      hp: 84,
      attack: 14,
      defense: 7,
      magic: 8,
      speed: 6,
      xp: 58,
      gold: 30,
      intro: "Blue shards rise from the library floor and reassemble into the Archivist.",
      palette: {
        primary: "#7dc9ff",
        secondary: "#27415f",
        accent: "#eef8ff"
      }
    },
    starGuardian: {
      name: "Auric Thornknight",
      title: "Guardian of Stars",
      summary: "A glade duelist plated in bark and sharp, ringing light.",
      hp: 94,
      attack: 15,
      defense: 8,
      magic: 6,
      speed: 11,
      xp: 68,
      gold: 36,
      intro: "Roots split and a golden knight draws a blade from pure starlight.",
      palette: {
        primary: "#f4cb76",
        secondary: "#5f4a24",
        accent: "#fff7dd"
      }
    },
    regent: {
      name: "The Hollow Regent",
      title: "Sovereign of the Broken Crown",
      summary: "The will trapped inside the rift itself, searching for a kingdom to inhabit.",
      hp: 156,
      attack: 19,
      defense: 10,
      magic: 13,
      speed: 10,
      xp: 0,
      gold: 0,
      intro: "The Rift Gate blooms open. A regal shadow steps through the wound in the sky.",
      palette: {
        primary: "#ff8a9a",
        secondary: "#632034",
        accent: "#ffe4d8"
      }
    }
  };

  const regionNotes = [
    { name: "Lantern Court", text: "A brass-lit refuge where the oracle still keeps watch.", match: (x, y) => x <= 8 && y >= 8 },
    { name: "Bloomwade", text: "Marshland lit from beneath by green fire and sleeping roots.", match: (x, y) => x <= 13 && y <= 8 },
    { name: "Rift Gate", text: "Black stone, red seams, and the silence of a throne that wants a body.", match: (x, y) => x >= 20 && y <= 3 },
    { name: "Sunken Library", text: "Collapsed vaults and drowned records shimmer under the moon.", match: (x, y) => x >= 15 && y <= 7 },
    { name: "Starglass Grove", text: "A crystal glade where the wind sounds like struck glass.", match: (x, y) => x >= 15 && y >= 8 }
  ];

  const particles = Array.from({ length: 42 }, (_, index) => ({
    x: 40 + (index * 137) % (canvas.width - 80),
    y: 30 + (index * 97) % (canvas.height - 60),
    radius: 1 + (index % 3),
    speed: 0.4 + (index % 5) * 0.09,
    phase: index * 0.71
  }));

  const fogBands = [
    { y: 96, width: 420, speed: 0.014, alpha: 0.08 },
    { y: 248, width: 520, speed: 0.011, alpha: 0.06 },
    { y: 532, width: 470, speed: 0.017, alpha: 0.05 }
  ];

  let terrain = [];
  let events = [];
  let state = null;
  let selectedClassId = archetypes[0].id;
  let lastTime = 0;
  let toastTimer = 0;
  let dialogResolver = null;

  function key(x, y) {
    return x + "," + y;
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function easeInOut(value) {
    return value < 0.5
      ? 2 * value * value
      : 1 - Math.pow(-2 * value + 2, 2) / 2;
  }

  function createTerrain() {
    const grid = Array.from({ length: MAP_H }, () => Array.from({ length: MAP_W }, () => ({ type: "meadow" })));
    const set = (x, y, type) => {
      if (x >= 0 && x < MAP_W && y >= 0 && y < MAP_H) {
        grid[y][x].type = type;
      }
    };
    const fillRect = (x1, y1, x2, y2, type) => {
      for (let y = y1; y <= y2; y += 1) {
        for (let x = x1; x <= x2; x += 1) {
          set(x, y, type);
        }
      }
    };
    const fillEllipse = (cx, cy, rx, ry, type) => {
      for (let y = cy - ry; y <= cy + ry; y += 1) {
        for (let x = cx - rx; x <= cx + rx; x += 1) {
          const dx = (x - cx) / rx;
          const dy = (y - cy) / ry;
          if (dx * dx + dy * dy <= 1) set(x, y, type);
        }
      }
    };
    const carvePath = (points) => {
      for (let index = 0; index < points.length - 1; index += 1) {
        let x = points[index].x;
        let y = points[index].y;
        const target = points[index + 1];

        while (x !== target.x) {
          set(x, y, "path");
          set(x, y + 1, "path");
          x += Math.sign(target.x - x);
        }

        while (y !== target.y) {
          set(x, y, "path");
          set(x + 1, y, "path");
          y += Math.sign(target.y - y);
        }

        set(target.x, target.y, "path");
      }
    };

    for (let y = 0; y < MAP_H; y += 1) {
      for (let x = 0; x < MAP_W; x += 1) {
        if (x === 0 || y === 0 || x === MAP_W - 1 || y === MAP_H - 1) {
          set(x, y, "cliff");
        } else if ((x * 5 + y * 7) % 17 === 0) {
          set(x, y, "flowers");
        }
      }
    }

    fillRect(2, 9, 7, 12, "stone");
    fillRect(9, 4, 11, 6, "altar");
    fillRect(17, 3, 20, 5, "ruin");
    fillRect(18, 9, 21, 11, "glade");
    fillRect(20, 1, 22, 3, "ash");

    fillEllipse(10, 6, 2, 2, "water");
    fillEllipse(13, 5, 2, 1, "water");
    fillEllipse(18, 10, 1, 1, "water");

    for (let y = 1; y <= 7; y += 1) {
      for (let x = 2; x <= 7; x += 1) {
        if ((x + y) % 3 === 0 || x % 4 === 0) set(x, y, "tree");
      }
    }

    for (let y = 8; y <= 12; y += 1) {
      for (let x = 13; x <= 16; x += 1) {
        if ((x + y) % 2 === 0) set(x, y, "tree");
      }
    }

    for (let y = 7; y <= 12; y += 1) {
      for (let x = 20; x <= 22; x += 1) {
        if ((x + y) % 2 === 0) set(x, y, "tree");
      }
    }

    carvePath([
      { x: 3, y: 11 },
      { x: 7, y: 11 },
      { x: 7, y: 7 },
      { x: 10, y: 7 },
      { x: 10, y: 5 }
    ]);

    carvePath([
      { x: 7, y: 11 },
      { x: 14, y: 11 },
      { x: 17, y: 11 },
      { x: 19, y: 10 }
    ]);

    carvePath([
      { x: 10, y: 7 },
      { x: 15, y: 7 },
      { x: 17, y: 5 },
      { x: 19, y: 4 }
    ]);

    carvePath([
      { x: 19, y: 4 },
      { x: 21, y: 4 },
      { x: 21, y: 2 }
    ]);

    set(3, 10, "stone");
    set(6, 10, "stone");
    set(10, 5, "altar");
    set(10, 7, "path");
    set(17, 5, "path");
    set(19, 4, "ruin");
    set(17, 11, "path");
    set(19, 10, "glade");
    set(21, 2, "ash");

    return grid;
  }

  function createEvents() {
    return [
      { id: "oracle", kind: "npc", name: "Oracle Maelin", x: 3, y: 10, blocking: false, active: true },
      { id: "camp", kind: "rest", name: "Emberfire Camp", x: 6, y: 10, blocking: false, active: true },
      { id: "bloomGuardian", kind: "enemy", battle: "bloomGuardian", name: "Mirethorn Ravager", x: 10, y: 7, blocking: true, active: true },
      { id: "bloomSigil", kind: "sigil", sigil: "bloom", name: "Bloom Sigil", x: 10, y: 5, blocking: false, active: true },
      { id: "tideGuardian", kind: "enemy", battle: "tideGuardian", name: "Glassbound Archivist", x: 17, y: 5, blocking: true, active: true },
      { id: "tideSigil", kind: "sigil", sigil: "tide", name: "Tide Sigil", x: 19, y: 4, blocking: false, active: true },
      { id: "starGuardian", kind: "enemy", battle: "starGuardian", name: "Auric Thornknight", x: 17, y: 11, blocking: true, active: true },
      { id: "starSigil", kind: "sigil", sigil: "star", name: "Star Sigil", x: 19, y: 10, blocking: false, active: true },
      { id: "regent", kind: "boss", battle: "regent", name: "The Hollow Regent", x: 21, y: 2, blocking: true, active: true }
    ];
  }

  function makeState(classId) {
    const archetype = archetypes.find((hero) => hero.id === classId) || archetypes[0];
    return {
      started: false,
      finished: false,
      victory: false,
      hover: null,
      route: [],
      pendingInteractionId: null,
      battle: null,
      oracleMet: false,
      restUsed: false,
      sigils: { bloom: false, tide: false, star: false },
      logs: [
        {
          title: "Moonfall over Lantern Court",
          text: "The Hollow Crown has stirred again. Find Oracle Maelin before the rift opens wider."
        }
      ],
      hero: {
        classId: archetype.id,
        name: archetype.name,
        title: archetype.title,
        blurb: archetype.blurb,
        palette: { ...archetype.palette },
        ability: { ...archetype.ability },
        x: 4,
        y: 11,
        renderX: 4,
        renderY: 11,
        facing: "right",
        move: null,
        level: 1,
        xp: 0,
        gold: 12,
        potions: 2,
        maxHp: archetype.stats.maxHp,
        hp: archetype.stats.maxHp,
        maxMp: archetype.stats.maxMp,
        mp: archetype.stats.maxMp,
        attack: archetype.stats.attack,
        defense: archetype.stats.defense,
        magic: archetype.stats.magic,
        speed: archetype.stats.speed
      }
    };
  }

  function xpToNext(level) {
    return 90 + (level - 1) * 55;
  }

  function sigilCount() {
    return Object.values(state.sigils).filter(Boolean).length;
  }

  function activeOverlayOpen() {
    return !startOverlay.classList.contains("hidden")
      || !dialogOverlay.classList.contains("hidden")
      || !battleOverlay.classList.contains("hidden")
      || !endOverlay.classList.contains("hidden");
  }

  function objectiveInfo() {
    if (!state.oracleMet) {
      return {
        title: "Meet Oracle Maelin",
        summary: "Lantern Court still has one clear voice. Find the oracle and learn how to close the crown-rift."
      };
    }

    if (sigilCount() < 3) {
      return {
        title: "Recover the Three Sigils",
        summary: "Defeat each guardian, then reclaim the Bloom, Tide, and Star sigils to make the Rift Gate obey."
      };
    }

    return {
      title: "Challenge the Hollow Regent",
      summary: "All three sigils blaze in your hand. Travel to the Rift Gate and sever the sovereign's hold on the vale."
    };
  }

  function inBounds(x, y) {
    return x >= 0 && x < MAP_W && y >= 0 && y < MAP_H;
  }

  function tileAt(x, y) {
    if (!inBounds(x, y)) return { type: "cliff" };
    return terrain[y][x];
  }

  function tileBlocked(x, y) {
    return ["cliff", "water", "tree"].includes(tileAt(x, y).type);
  }

  function getEventById(id) {
    return events.find((event) => event.id === id) || null;
  }

  function eventAt(x, y) {
    return events.find((event) => event.active !== false && event.x === x && event.y === y) || null;
  }

  function activeBlockingCells(excludeEventId = null) {
    const blocked = new Set();
    events.forEach((event) => {
      if (event.active === false || event.id === excludeEventId || !event.blocking) return;
      blocked.add(key(event.x, event.y));
    });
    return blocked;
  }

  function regionFor(x, y) {
    return regionNotes.find((region) => region.match(x, y)) || regionNotes[0];
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.add("hidden"), 1900);
  }

  function logEvent(title, text) {
    state.logs.unshift({ title, text });
    state.logs = state.logs.slice(0, 8);
  }

  function setAvatar(el, palette, prefix) {
    el.style.setProperty("--" + prefix + "-primary", palette.primary);
    el.style.setProperty("--" + prefix + "-secondary", palette.secondary);
    el.style.setProperty("--" + prefix + "-accent", palette.accent);
  }

  function guardianCleared(sigil) {
    const guardianId = {
      bloom: "bloomGuardian",
      tide: "tideGuardian",
      star: "starGuardian"
    }[sigil];
    const guardian = getEventById(guardianId);
    return !guardian || guardian.active === false;
  }

  function refreshActionCard() {
    const currentRegion = regionFor(state.hero.x, state.hero.y);
    locationName.textContent = currentRegion.name;
    locationText.textContent = currentRegion.text;

    if (!state.started || state.finished) {
      actionCard.classList.remove("hidden");
      actionTitle.textContent = "Choose a vessel";
      actionText.textContent = "Pick a champion and enter the vale to begin.";
      return;
    }

    if (state.hover && state.hover.eventId) {
      const event = getEventById(state.hover.eventId);
      if (event) {
        actionCard.classList.remove("hidden");
        actionTitle.textContent = event.name;

        if (event.id === "oracle") {
          actionText.textContent = state.oracleMet
            ? "Click to revisit the oracle's counsel."
            : "Click to speak with Maelin and begin the true quest.";
        } else if (event.id === "camp") {
          actionText.textContent = state.restUsed
            ? "Click to rest and fully restore your champion."
            : "Click to rest, restore your focus, and gain one extra potion.";
        } else if (event.kind === "sigil") {
          actionText.textContent = state.sigils[event.sigil]
            ? "This sigil already answers to you."
            : guardianCleared(event.sigil)
              ? "Click to claim the sigil."
              : "The guardian must fall before the sigil will answer.";
        } else if (event.kind === "enemy") {
          actionText.textContent = "Click to auto-travel into battle range and challenge the guardian.";
        } else if (event.kind === "boss") {
          actionText.textContent = sigilCount() === 3
            ? "Click to face the Hollow Regent."
            : "The Rift Gate remains sealed. Recover all three sigils first.";
        }
        return;
      }
    }

    if (state.hover && state.hover.path && state.hover.path.length > 1) {
      actionCard.classList.remove("hidden");
      actionTitle.textContent = "Move route";
      actionText.textContent = "Click to auto-travel across the vale.";
      return;
    }

    if (state.route.length) {
      actionCard.classList.remove("hidden");
      actionTitle.textContent = "Moving";
      actionText.textContent = state.pendingInteractionId
        ? "Your champion is traveling toward " + getEventById(state.pendingInteractionId)?.name + "."
        : "Your champion is crossing the vale.";
      return;
    }

    actionCard.classList.add("hidden");
  }

  function questEntries() {
    return [
      {
        title: "Find Oracle Maelin",
        text: "Receive the first omen and learn which sigils still bind the crown-rift.",
        done: state.oracleMet,
        targetId: "oracle"
      },
      {
        title: "Claim the Bloom Sigil",
        text: guardianCleared("bloom")
          ? "The shrine is open. Step onto the altar and claim the Bloom Sigil."
          : "A Mirethorn guardian blocks the marsh shrine.",
        done: state.sigils.bloom,
        targetId: state.sigils.bloom ? null : guardianCleared("bloom") ? "bloomSigil" : "bloomGuardian"
      },
      {
        title: "Claim the Tide Sigil",
        text: guardianCleared("tide")
          ? "The drowned archive has quieted. Recover the Tide Sigil."
          : "The Glassbound Archivist still patrols the library approach.",
        done: state.sigils.tide,
        targetId: state.sigils.tide ? null : guardianCleared("tide") ? "tideSigil" : "tideGuardian"
      },
      {
        title: "Claim the Star Sigil",
        text: guardianCleared("star")
          ? "The grove path is clear. The Star Sigil waits ahead."
          : "The Auric Thornknight bars the glade.",
        done: state.sigils.star,
        targetId: state.sigils.star ? null : guardianCleared("star") ? "starSigil" : "starGuardian"
      },
      {
        title: "Break the Hollow Regent",
        text: sigilCount() === 3
          ? "The gate will answer now. Travel north and end the sovereign inside the rift."
          : "The final gate rejects all who lack the three reclaimed sigils.",
        done: state.finished && state.victory,
        targetId: sigilCount() === 3 && !state.finished ? "regent" : null
      }
    ];
  }

  function renderQuestList() {
    questList.innerHTML = "";
    questEntries().forEach((entry) => {
      const article = document.createElement("article");
      article.className = "quest-item" + (entry.done ? " completed" : "");
      const title = document.createElement("strong");
      title.textContent = entry.title;
      const copy = document.createElement("p");
      copy.textContent = entry.text;
      const button = document.createElement("button");
      button.className = entry.done ? "btn-dark" : "";
      button.textContent = entry.done ? "Completed" : entry.targetId ? "Guide me there" : "Unavailable";
      button.disabled = !entry.targetId || entry.done || !state.started || state.finished;
      if (entry.targetId) button.dataset.target = entry.targetId;
      article.append(title, copy, button);
      questList.append(article);
    });
  }

  function renderHeroCard() {
    const hero = state.hero;
    const objective = objectiveInfo();
    const xpNeeded = xpToNext(hero.level);

    heroChip.textContent = hero.name;
    sigilChip.textContent = sigilCount() + " / 3";
    objectiveChip.textContent = objective.title;
    regionChip.textContent = regionFor(hero.x, hero.y).name;
    levelChip.textContent = String(hero.level);
    goldChip.textContent = String(hero.gold);
    questHeading.textContent = objective.title;
    questSummary.textContent = objective.summary;

    heroClassTag.textContent = hero.title;
    heroName.textContent = hero.name;
    heroBlurb.textContent = hero.blurb;
    xpChip.textContent = hero.xp + " / " + xpNeeded;
    potionChip.textContent = String(hero.potions);
    hpText.textContent = hero.hp + " / " + hero.maxHp;
    mpText.textContent = hero.mp + " / " + hero.maxMp;
    hpBar.style.width = ((hero.hp / hero.maxHp) * 100).toFixed(1) + "%";
    mpBar.style.width = ((hero.mp / hero.maxMp) * 100).toFixed(1) + "%";
    setAvatar(heroAvatar, hero.palette, "avatar");

    statGrid.innerHTML = "";
    [
      ["Attack", hero.attack],
      ["Defense", hero.defense],
      ["Magic", hero.magic],
      ["Speed", hero.speed]
    ].forEach(([label, value]) => {
      const card = document.createElement("div");
      card.className = "inventory-card";
      card.innerHTML = "<strong>" + label + "</strong><span>" + value + "</span>";
      statGrid.append(card);
    });
  }

  function renderInventory() {
    const hero = state.hero;
    const items = [
      ["Ability", hero.ability.name],
      ["Focus Cost", hero.ability.cost + " MP"],
      ["Potions", hero.potions],
      ["Bloom", state.sigils.bloom ? "Claimed" : "Missing"],
      ["Tide", state.sigils.tide ? "Claimed" : "Missing"],
      ["Star", state.sigils.star ? "Claimed" : "Missing"]
    ];

    inventoryGrid.innerHTML = "";
    items.forEach(([label, value]) => {
      const card = document.createElement("div");
      card.className = "inventory-card";
      card.innerHTML = "<strong>" + label + "</strong><span>" + value + "</span>";
      inventoryGrid.append(card);
    });
  }

  function renderChronicle() {
    logFeed.innerHTML = "";
    state.logs.forEach((entry) => {
      const item = document.createElement("article");
      item.className = "log-item";
      item.innerHTML = "<strong>" + entry.title + "</strong><span>" + entry.text + "</span>";
      logFeed.append(item);
    });
  }

  function renderUI() {
    if (!state) return;
    renderHeroCard();
    renderQuestList();
    renderInventory();
    renderChronicle();
    refreshActionCard();
  }

  function openDialog(kicker, title, text, onClose) {
    dialogKicker.textContent = kicker;
    dialogTitle.textContent = title;
    dialogText.textContent = text;
    dialogResolver = onClose || null;
    dialogOverlay.classList.remove("hidden");
  }

  function closeDialog() {
    dialogOverlay.classList.add("hidden");
    const resolver = dialogResolver;
    dialogResolver = null;
    if (typeof resolver === "function") resolver();
    refreshActionCard();
  }

  function openEnd(victory) {
    state.finished = true;
    state.victory = victory;
    endOverlay.classList.remove("hidden");
    if (victory) {
      endKicker.textContent = "Vale restored";
      endTitle.textContent = "You sealed the Hollow Crown.";
      endText.textContent = "The three sigils flare together, the Rift Gate implodes, and the Hollow Regent dissolves into sparks over the valley. Lantern Court sees a clear dawn for the first time in years.";
    } else {
      endKicker.textContent = "Run broken";
      endTitle.textContent = "The crown keeps the vale.";
      endText.textContent = "Your champion falls before the rift can be sealed. The valley still shivers under the Hollow Regent's voice. Choose a new vessel and try again.";
    }
  }

  function heroLevelUp() {
    const hero = state.hero;
    hero.level += 1;
    hero.maxHp += 18;
    hero.maxMp += 10;
    hero.attack += 2;
    hero.defense += 2;
    hero.magic += 2;
    hero.speed += 1;
    hero.hp = hero.maxHp;
    hero.mp = hero.maxMp;
    showToast("Level up. The sigils answer your blood.");
    logEvent("Level " + hero.level, hero.name + " grows stronger beneath the fractured moon.");
  }

  function grantRewards(enemy) {
    const hero = state.hero;
    hero.xp += enemy.xp;
    hero.gold += enemy.gold;
    while (hero.xp >= xpToNext(hero.level)) {
      hero.xp -= xpToNext(hero.level);
      heroLevelUp();
    }
  }

  function canStand(x, y, blockedSet, allowGoalKey) {
    if (!inBounds(x, y) || tileBlocked(x, y)) return false;
    const tileKey = key(x, y);
    if (tileKey !== allowGoalKey && blockedSet.has(tileKey)) return false;
    return true;
  }

  function findPath(start, goal, options = {}) {
    const allowGoalKey = key(goal.x, goal.y);
    const blockedSet = activeBlockingCells(options.excludeEventId);
    const startKey = key(start.x, start.y);
    const queue = [{ x: start.x, y: start.y }];
    const previous = new Map();
    const seen = new Set([startKey]);
    previous.set(startKey, null);

    if (!canStand(goal.x, goal.y, blockedSet, allowGoalKey)) {
      return null;
    }

    while (queue.length) {
      const current = queue.shift();
      if (current.x === goal.x && current.y === goal.y) {
        const path = [];
        let currentKey = key(current.x, current.y);
        while (currentKey) {
          const [x, y] = currentKey.split(",").map(Number);
          path.unshift({ x, y });
          currentKey = previous.get(currentKey);
        }
        return path;
      }

      [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }
      ].forEach((next) => {
        const nextKey = key(next.x, next.y);
        if (seen.has(nextKey)) return;
        if (!canStand(next.x, next.y, blockedSet, allowGoalKey)) return;
        seen.add(nextKey);
        previous.set(nextKey, key(current.x, current.y));
        queue.push(next);
      });
    }

    return null;
  }

  function pathToEvent(event) {
    const hero = state.hero;
    if (!event.blocking) {
      return findPath({ x: hero.x, y: hero.y }, { x: event.x, y: event.y }, { excludeEventId: event.id });
    }

    const targets = [
      { x: event.x + 1, y: event.y },
      { x: event.x - 1, y: event.y },
      { x: event.x, y: event.y + 1 },
      { x: event.x, y: event.y - 1 }
    ];

    let best = null;
    targets.forEach((target) => {
      const path = findPath({ x: hero.x, y: hero.y }, target, { excludeEventId: event.id });
      if (!path) return;
      if (!best || path.length < best.length) best = path;
    });
    return best;
  }

  function canInteractNow(event) {
    const distance = Math.abs(state.hero.x - event.x) + Math.abs(state.hero.y - event.y);
    return distance <= (event.blocking ? 1 : 0);
  }

  function setRoute(path, pendingInteractionId = null) {
    state.route = path ? path.slice(1) : [];
    state.pendingInteractionId = pendingInteractionId;
    if ((!path || path.length <= 1) && pendingInteractionId) {
      const event = getEventById(pendingInteractionId);
      state.pendingInteractionId = null;
      if (event && event.active !== false) executeEvent(event);
    }
    refreshActionCard();
  }

  function routeToTile(x, y) {
    if (!state.started || state.finished || activeOverlayOpen()) return;
    const path = findPath({ x: state.hero.x, y: state.hero.y }, { x, y });
    if (!path) {
      showToast("No clear path reaches that point.");
      return;
    }
    setRoute(path, null);
  }

  function routeToEvent(eventId) {
    if (!state.started || state.finished || activeOverlayOpen()) return;
    const event = getEventById(eventId);
    if (!event || event.active === false) return;
    if (canInteractNow(event)) {
      executeEvent(event);
      return;
    }
    const path = pathToEvent(event);
    if (!path) {
      showToast("That destination is sealed off for now.");
      return;
    }
    setRoute(path, event.id);
  }

  function previewHover(tileX, tileY) {
    if (!state || !state.started || activeOverlayOpen() || state.finished) {
      state.hover = null;
      refreshActionCard();
      return;
    }

    if (!inBounds(tileX, tileY)) {
      state.hover = null;
      refreshActionCard();
      return;
    }

    const hoveredEvent = eventAt(tileX, tileY);
    if (hoveredEvent) {
      state.hover = {
        tile: { x: tileX, y: tileY },
        eventId: hoveredEvent.id,
        path: pathToEvent(hoveredEvent)
      };
      refreshActionCard();
      return;
    }

    if (tileBlocked(tileX, tileY)) {
      state.hover = { tile: { x: tileX, y: tileY }, eventId: null, path: null };
      refreshActionCard();
      return;
    }

    state.hover = {
      tile: { x: tileX, y: tileY },
      eventId: null,
      path: findPath({ x: state.hero.x, y: state.hero.y }, { x: tileX, y: tileY })
    };
    refreshActionCard();
  }

  function recomputeHover() {
    if (!state.hover) return;
    previewHover(state.hover.tile.x, state.hover.tile.y);
  }

  function resetRun() {
    terrain = createTerrain();
    events = createEvents();
    state = makeState(selectedClassId);
    state.started = true;
    startOverlay.classList.add("hidden");
    dialogOverlay.classList.add("hidden");
    battleOverlay.classList.add("hidden");
    endOverlay.classList.add("hidden");
    renderUI();
    showToast("Click a path or marker to guide your champion.");
  }

  function openStartOverlay() {
    startOverlay.classList.remove("hidden");
    endOverlay.classList.add("hidden");
    renderClassCards();
    refreshActionCard();
  }

  function renderClassCards() {
    classGrid.innerHTML = "";
    archetypes.forEach((archetype) => {
      const card = document.createElement("article");
      card.className = "class-card" + (archetype.id === selectedClassId ? " selected" : "");
      card.dataset.classId = archetype.id;
      card.innerHTML =
        "<div class='card-eyebrow'>Hero class</div>" +
        "<h3>" + archetype.name + "</h3>" +
        "<p class='section-copy'>" + archetype.summary + "</p>" +
        "<div class='class-stats'>" +
          "<span>HP " + archetype.stats.maxHp + "</span>" +
          "<span>MP " + archetype.stats.maxMp + "</span>" +
          "<span>ATK " + archetype.stats.attack + "</span>" +
          "<span>MGC " + archetype.stats.magic + "</span>" +
        "</div>" +
        "<p class='section-copy'><strong>" + archetype.ability.name + ":</strong> " + archetype.ability.text + "</p>";
      card.addEventListener("click", () => {
        selectedClassId = archetype.id;
        renderClassCards();
      });
      classGrid.append(card);
    });
  }

  function startBattle(event) {
    const template = enemyTemplates[event.battle];
    state.route = [];
    state.pendingInteractionId = null;
    state.battle = {
      encounterId: event.id,
      enemy: {
        ...template,
        currentHp: template.hp
      },
      log: [{ title: "Encounter", text: template.intro }],
      heroGuarding: false,
      locked: false
    };
    battleTitle.textContent = event.kind === "boss" ? "Final Battle" : template.title;
    battleOverlay.classList.remove("hidden");
    renderBattle();
  }

  function pushBattleLog(title, text) {
    if (!state.battle) return;
    state.battle.log.unshift({ title, text });
    state.battle.log = state.battle.log.slice(0, 8);
  }

  function renderBattle() {
    const battle = state.battle;
    if (!battle) return;

    const hero = state.hero;
    const enemy = battle.enemy;

    battleHeroName.textContent = hero.name;
    battleHeroSummary.textContent = hero.ability.name + " - " + hero.ability.text;
    battleHeroHpText.textContent = hero.hp + " / " + hero.maxHp;
    battleHeroMpText.textContent = hero.mp + " / " + hero.maxMp;
    battleHeroHp.style.width = ((hero.hp / hero.maxHp) * 100).toFixed(1) + "%";
    battleHeroMp.style.width = ((hero.mp / hero.maxMp) * 100).toFixed(1) + "%";

    battleEnemyName.textContent = enemy.name;
    battleEnemySummary.textContent = enemy.summary;
    battleEnemyHpText.textContent = enemy.currentHp + " / " + enemy.hp;
    battleEnemyHp.style.width = ((enemy.currentHp / enemy.hp) * 100).toFixed(1) + "%";

    abilityBtn.textContent = hero.ability.name + " (" + hero.ability.cost + " MP)";
    potionBtn.textContent = "Potion (" + hero.potions + ")";

    setAvatar(battleHeroPortrait, hero.palette, "portrait");
    setAvatar(battleEnemyPortrait, enemy.palette, "portrait");

    battleLog.innerHTML = "";
    battle.log.forEach((entry) => {
      const item = document.createElement("article");
      item.className = "log-item";
      item.innerHTML = "<strong>" + entry.title + "</strong><span>" + entry.text + "</span>";
      battleLog.append(item);
    });

    attackBtn.disabled = battle.locked;
    abilityBtn.disabled = battle.locked;
    guardBtn.disabled = battle.locked;
    potionBtn.disabled = battle.locked;
  }

  function physicalDamage(attack, defense, critChance) {
    const crit = Math.random() < critChance;
    let amount = attack + randInt(-2, 4) - Math.round(defense * 0.55);
    if (crit) amount = Math.round(amount * 1.65);
    return { amount: Math.max(4, amount), crit };
  }

  function spellDamage(power, defense) {
    return Math.max(8, power + randInt(3, 8) - Math.round(defense * 0.3));
  }

  function finishBattle(victory) {
    const battle = state.battle;
    const encounter = getEventById(battle.encounterId);
    const hero = state.hero;
    const enemy = battle.enemy;

    if (!victory) {
      battleOverlay.classList.add("hidden");
      state.battle = null;
      logEvent("Champion fallen", hero.name + " is swallowed by the vale's cold silence.");
      renderUI();
      openEnd(false);
      return;
    }

    if (encounter) encounter.active = false;

    battleOverlay.classList.add("hidden");
    state.battle = null;

    if (encounter && encounter.kind === "boss") {
      logEvent("The Hollow Crown breaks", "The Regent collapses into embers and the Rift Gate seals behind you.");
      renderUI();
      openEnd(true);
      return;
    }

    grantRewards(enemy);
    showToast("Victory. +" + enemy.xp + " XP, +" + enemy.gold + " gold.");
    logEvent(enemy.name + " defeated", enemy.summary + " The road ahead is open.");
    renderUI();
    recomputeHover();
  }

  function enemyTurn() {
    const battle = state.battle;
    if (!battle) return;

    const hero = state.hero;
    const enemy = battle.enemy;
    let amount = 0;
    let line = "";

    if (Math.random() < 0.24 && enemy.magic > 0) {
      amount = spellDamage(enemy.magic + 7, hero.defense);
      line = enemy.name + " unleashes a shardburst for " + amount + " damage.";
    } else {
      const strike = physicalDamage(enemy.attack, hero.defense, Math.min(0.3, 0.06 + enemy.speed * 0.012));
      amount = strike.amount;
      line = enemy.name + " strikes for " + amount + " damage." + (strike.crit ? " The hit tears through your stance." : "");
    }

    if (battle.heroGuarding) {
      amount = Math.max(3, Math.floor(amount * 0.5));
      battle.heroGuarding = false;
      line = "Your ward softens the blow. " + enemy.name + " deals " + amount + " damage.";
    }

    hero.hp = Math.max(0, hero.hp - amount);
    pushBattleLog("Enemy turn", line);

    if (hero.hp <= 0) {
      finishBattle(false);
      return;
    }

    battle.locked = false;
    renderBattle();
    renderUI();
  }

  function battleAction(action) {
    const battle = state.battle;
    if (!battle || battle.locked) return;
    const hero = state.hero;
    const enemy = battle.enemy;

    if (action === "attack") {
      const strike = physicalDamage(hero.attack, enemy.defense, Math.min(0.34, 0.08 + hero.speed * 0.014));
      enemy.currentHp -= strike.amount;
      pushBattleLog("Attack", hero.name + " lands " + strike.amount + " damage." + (strike.crit ? " Critical hit." : ""));
    } else if (action === "ability") {
      if (hero.mp < hero.ability.cost) {
        pushBattleLog("Focus shattered", "Not enough focus remains to cast " + hero.ability.name + ".");
        renderBattle();
        return;
      }

      hero.mp -= hero.ability.cost;
      if (hero.ability.mode === "burst") {
        const amount = spellDamage(hero.attack + hero.magic + 6, enemy.defense);
        enemy.currentHp -= amount;
        pushBattleLog(hero.ability.name, "A comet-bright slash lands for " + amount + " damage.");
      } else if (hero.ability.mode === "drain") {
        const amount = spellDamage(hero.magic + 10, enemy.defense);
        const heal = randInt(10, 16) + Math.floor(hero.magic / 3);
        enemy.currentHp -= amount;
        hero.hp = Math.min(hero.maxHp, hero.hp + heal);
        pushBattleLog(hero.ability.name, "Bloomlight deals " + amount + " damage and restores " + heal + " vitality.");
      } else {
        const strike = physicalDamage(hero.attack + 4, enemy.defense, 0.48);
        enemy.currentHp -= strike.amount;
        pushBattleLog(hero.ability.name, "The feint lands for " + strike.amount + " damage." + (strike.crit ? " A perfect opening." : ""));
      }
    } else if (action === "guard") {
      battle.heroGuarding = true;
      pushBattleLog("Guard", hero.name + " raises a luminous ward and braces for impact.");
    } else if (action === "potion") {
      if (hero.potions <= 0) {
        pushBattleLog("Empty satchel", "No potions remain.");
        renderBattle();
        return;
      }
      hero.potions -= 1;
      const heal = 34 + hero.level * 8;
      hero.hp = Math.min(hero.maxHp, hero.hp + heal);
      pushBattleLog("Potion", "You recover " + heal + " vitality.");
    }

    if (enemy.currentHp <= 0) {
      finishBattle(true);
      return;
    }

    battle.locked = true;
    renderBattle();
    renderUI();
    window.setTimeout(enemyTurn, 560);
  }

  function executeEvent(event) {
    if (!event || event.active === false) return;

    if (event.id === "oracle") {
      openDialog(
        "Oracle",
        "Oracle Maelin",
        state.oracleMet
          ? "The three sigils are already listening to you. Do not linger now — the Hollow Regent grows sharper each minute the rift remains open."
          : "Three sigils once held the Hollow Crown asleep: Bloom in the marsh, Tide in the drowned archive, and Star in the glade of ringing glass. Reclaim them, and the Rift Gate will bow to your hand.",
        () => {
          if (!state.oracleMet) {
            state.oracleMet = true;
            state.hero.potions += 1;
            logEvent("The oracle speaks", "Maelin reveals the sigil trail and slips an extra potion into your satchel.");
            renderUI();
          }
        }
      );
      return;
    }

    if (event.id === "camp") {
      const firstRest = !state.restUsed;
      openDialog(
        "Camp",
        "Emberfire Camp",
        firstRest
          ? "The embers swell at your approach. Warmth floods your limbs, your focus steadies, and a spare potion turns up in an old satchel by the stone."
          : "The campfire still remembers you. Its warmth settles your nerves and restores your strength.",
        () => {
          state.restUsed = true;
          state.hero.hp = state.hero.maxHp;
          state.hero.mp = state.hero.maxMp;
          if (firstRest) state.hero.potions += 1;
          logEvent("Emberfire Rest", "You gather yourself beside the emberfire and step back onto the path renewed.");
          renderUI();
        }
      );
      return;
    }

    if (event.kind === "sigil") {
      if (state.sigils[event.sigil]) {
        showToast("That sigil already burns in your grasp.");
        return;
      }

      if (!guardianCleared(event.sigil)) {
        showToast("The sigil recoils. Its guardian still stands.");
        return;
      }

      state.sigils[event.sigil] = true;
      const copy = {
        bloom: {
          title: "Bloom Sigil",
          text: "The marsh exhales as green light spirals around your palm. The Bloom Sigil awakens."
        },
        tide: {
          title: "Tide Sigil",
          text: "Ancient water smooths to glass and the Tide Sigil settles into your hand like cold moonlight."
        },
        star: {
          title: "Star Sigil",
          text: "The grove rings like crystal. The Star Sigil flashes once and binds itself to your pulse."
        }
      }[event.sigil];

      openDialog("Sigil claimed", copy.title, copy.text, () => {
        logEvent(copy.title, copy.text);
        renderUI();
        if (sigilCount() === 3) {
          showToast("All sigils answer. The Rift Gate can be broken.");
          logEvent("The gate awakens", "With all three sigils reclaimed, the northern wind points only toward the rift.");
          renderUI();
        }
      });
      return;
    }

    if (event.kind === "enemy") {
      startBattle(event);
      return;
    }

    if (event.kind === "boss") {
      if (sigilCount() < 3) {
        openDialog("Rift Gate", "The gate rejects you", "The broken crown snarls through the stone. All three sigils must answer to you before the sovereign will grant a final audience.");
        return;
      }
      startBattle(event);
    }
  }

  function updateMovement(dt) {
    if (!state.started || state.finished || activeOverlayOpen()) return;

    const hero = state.hero;

    if (hero.move) {
      hero.move.progress = clamp(hero.move.progress + dt / hero.move.duration, 0, 1);
      const eased = easeInOut(hero.move.progress);
      hero.renderX = lerp(hero.move.fromX, hero.move.toX, eased);
      hero.renderY = lerp(hero.move.fromY, hero.move.toY, eased);

      if (hero.move.progress >= 1) {
        hero.x = hero.move.toX;
        hero.y = hero.move.toY;
        hero.renderX = hero.x;
        hero.renderY = hero.y;
        hero.move = null;
        renderUI();
        recomputeHover();
        if (!state.route.length && state.pendingInteractionId) {
          const interactionId = state.pendingInteractionId;
          state.pendingInteractionId = null;
          executeEvent(getEventById(interactionId));
        }
      }
      return;
    }

    if (!state.route.length) return;

    const next = state.route.shift();
    hero.facing = next.x > hero.x
      ? "right"
      : next.x < hero.x
        ? "left"
        : next.y > hero.y
          ? "down"
          : "up";
    hero.move = {
      fromX: hero.x,
      fromY: hero.y,
      toX: next.x,
      toY: next.y,
      progress: 0,
      duration: 0.16
    };
  }

  function screenToTile(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((event.clientX - rect.left) * scaleX / TILE);
    const y = Math.floor((event.clientY - rect.top) * scaleY / TILE);
    return { x, y };
  }

  function onCanvasMove(event) {
    const tile = screenToTile(event);
    previewHover(tile.x, tile.y);
  }

  function onCanvasClick(event) {
    if (!state.started || state.finished || activeOverlayOpen()) return;
    const tile = screenToTile(event);
    const clickedEvent = eventAt(tile.x, tile.y);
    if (clickedEvent) {
      routeToEvent(clickedEvent.id);
      return;
    }
    routeToTile(tile.x, tile.y);
  }

  function drawBackdrop(time) {
    const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#0b1220");
    sky.addColorStop(0.5, "#0a1322");
    sky.addColorStop(1, "#05070c");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const moonGlow = ctx.createRadialGradient(canvas.width - 220, 100, 12, canvas.width - 220, 100, 170);
    moonGlow.addColorStop(0, "rgba(255, 242, 215, 0.88)");
    moonGlow.addColorStop(0.25, "rgba(255, 222, 167, 0.28)");
    moonGlow.addColorStop(1, "rgba(255, 222, 167, 0)");
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(canvas.width - 220, 100, 92, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 246, 225, 0.88)";
    ctx.beginPath();
    ctx.arc(canvas.width - 220, 100, 34, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(7, 13, 24, 0.58)";
    ctx.beginPath();
    ctx.moveTo(0, 230);
    ctx.lineTo(120, 180);
    ctx.lineTo(260, 220);
    ctx.lineTo(370, 150);
    ctx.lineTo(510, 228);
    ctx.lineTo(640, 170);
    ctx.lineTo(820, 250);
    ctx.lineTo(980, 190);
    ctx.lineTo(1152, 232);
    ctx.lineTo(1152, 320);
    ctx.lineTo(0, 320);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(11, 18, 32, 0.66)";
    ctx.beginPath();
    ctx.moveTo(0, 270);
    ctx.lineTo(190, 215);
    ctx.lineTo(380, 268);
    ctx.lineTo(620, 202);
    ctx.lineTo(890, 284);
    ctx.lineTo(1152, 228);
    ctx.lineTo(1152, 360);
    ctx.lineTo(0, 360);
    ctx.closePath();
    ctx.fill();

    fogBands.forEach((band, index) => {
      const offset = ((time * band.speed) + index * 180) % (canvas.width + band.width) - band.width;
      const gradient = ctx.createLinearGradient(offset, band.y, offset + band.width, band.y);
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.5, "rgba(194,219,255," + band.alpha + ")");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(offset, band.y, band.width, 60);
    });
  }

  function drawTile(x, y, type, time) {
    const screenX = x * TILE;
    const screenY = y * TILE;
    const pulse = Math.sin(time * 0.002 + x * 0.5 + y * 0.25);

    if (type === "meadow" || type === "flowers" || type === "glade") {
      const gradient = ctx.createLinearGradient(screenX, screenY, screenX, screenY + TILE);
      gradient.addColorStop(0, type === "glade" ? "#244c4c" : "#183522");
      gradient.addColorStop(1, type === "glade" ? "#173635" : "#102219");
      ctx.fillStyle = gradient;
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = type === "glade" ? "rgba(115, 238, 214, 0.18)" : "rgba(255,255,255,0.04)";
      ctx.fillRect(screenX, screenY, TILE, 6);
      ctx.fillStyle = type === "glade" ? "rgba(155, 255, 238, 0.36)" : "rgba(125, 184, 112, 0.18)";
      for (let index = 0; index < 4; index += 1) {
        ctx.fillRect(screenX + 6 + index * 9, screenY + 18 + (index % 2) * 6, 2, 8);
      }
      if (type === "flowers") {
        ctx.fillStyle = "#f4c4ff";
        ctx.fillRect(screenX + 8, screenY + 12, 2, 2);
        ctx.fillRect(screenX + 17, screenY + 24, 2, 2);
        ctx.fillRect(screenX + 30, screenY + 18, 2, 2);
      }
      if (type === "glade") {
        ctx.fillStyle = "rgba(240, 219, 127, 0.5)";
        ctx.fillRect(screenX + 11, screenY + 10 + pulse, 2, 2);
        ctx.fillRect(screenX + 24, screenY + 18 - pulse, 2, 2);
      }
    } else if (type === "path") {
      ctx.fillStyle = "#736752";
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = "#8d7f66";
      ctx.fillRect(screenX, screenY + 10, TILE, 12);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(screenX + 4, screenY + 6, TILE - 8, 3);
      ctx.fillRect(screenX + 10, screenY + 26, 10, 3);
    } else if (type === "stone") {
      ctx.fillStyle = "#3d4357";
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = "#5b657f";
      ctx.fillRect(screenX + 2, screenY + 2, TILE - 4, 5);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.strokeRect(screenX + 0.5, screenY + 0.5, TILE - 1, TILE - 1);
    } else if (type === "altar") {
      ctx.fillStyle = "#1f4043";
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = "#2e6f72";
      ctx.fillRect(screenX + 6, screenY + 6, TILE - 12, TILE - 12);
      ctx.fillStyle = "rgba(124, 232, 206, 0.18)";
      ctx.fillRect(screenX + 10, screenY + 10, TILE - 20, TILE - 20);
    } else if (type === "ruin") {
      ctx.fillStyle = "#2b3245";
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = "#4b5a79";
      ctx.fillRect(screenX + 6, screenY + 8, 8, 20);
      ctx.fillRect(screenX + 18, screenY + 5, 8, 23);
      ctx.fillStyle = "rgba(125, 201, 255, 0.12)";
      ctx.fillRect(screenX + 6, screenY + 8, 20, 3);
    } else if (type === "ash") {
      ctx.fillStyle = "#25161f";
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = "rgba(255, 120, 102, 0.24)";
      ctx.fillRect(screenX + 6, screenY + 12, 12, 2);
      ctx.fillRect(screenX + 18, screenY + 24, 10, 2);
      ctx.fillRect(screenX + 14, screenY + 18, 2, 8);
    } else if (type === "water") {
      const gradient = ctx.createLinearGradient(screenX, screenY, screenX, screenY + TILE);
      gradient.addColorStop(0, "#17304d");
      gradient.addColorStop(1, "#0f1c30");
      ctx.fillStyle = gradient;
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = "rgba(136, 189, 255, 0.2)";
      ctx.fillRect(screenX, screenY + 7 + pulse, TILE, 3);
      ctx.fillRect(screenX, screenY + 19 - pulse, TILE, 3);
      ctx.fillRect(screenX + 6, screenY + 30 + pulse, TILE - 12, 2);
    } else if (type === "tree") {
      ctx.fillStyle = "#12291c";
      ctx.fillRect(screenX, screenY, TILE, TILE);
      ctx.fillStyle = "#2d6038";
      ctx.beginPath();
      ctx.arc(screenX + 16, screenY + 16, 13, 0, Math.PI * 2);
      ctx.arc(screenX + 24, screenY + 15, 11, 0, Math.PI * 2);
      ctx.arc(screenX + 20, screenY + 22, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#553926";
      ctx.fillRect(screenX + 20, screenY + 20, 5, 11);
    } else {
      ctx.fillStyle = "#1d2029";
      ctx.fillRect(screenX, screenY, TILE, TILE);
    }

    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.strokeRect(screenX + 0.5, screenY + 0.5, TILE - 1, TILE - 1);
  }

  function drawRoute(path, stroke, glow, dashed) {
    if (!path || path.length < 2) return;
    ctx.save();
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if (dashed) ctx.setLineDash([10, 8]);
    ctx.strokeStyle = glow;
    ctx.shadowColor = glow;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    path.forEach((step, index) => {
      const px = step.x * TILE + TILE / 2;
      const py = step.y * TILE + TILE / 2;
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.restore();
  }

  function drawHumanoid(tileX, tileY, palette, time, facing, scale = 1) {
    const x = tileX * TILE + TILE / 2;
    const y = tileY * TILE + TILE / 2;
    const bob = Math.sin(time * 0.004 + tileX * 0.4 + tileY * 0.3) * 1.6;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 16, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(0, bob - 8);
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.moveTo(-10, 4);
    ctx.lineTo(0, -4);
    ctx.lineTo(10, 4);
    ctx.lineTo(8, 16);
    ctx.lineTo(-8, 16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = palette.secondary;
    ctx.fillRect(-10, 10, 20, 8);
    ctx.fillStyle = palette.skin;
    ctx.fillRect(-5, -8, 10, 8);
    ctx.fillStyle = palette.hair || palette.accent;
    ctx.fillRect(-6, -10, 12, 4);
    ctx.fillStyle = palette.accent;
    ctx.fillRect(facing === "left" ? -14 : 11, 0, 3, 10);
    ctx.fillStyle = palette.primary;
    ctx.fillRect(-7, 16, 4, 10);
    ctx.fillRect(3, 16, 4, 10);
    ctx.restore();
  }

  function drawGuardian(tileX, tileY, palette, time, boss = false) {
    const x = tileX * TILE + TILE / 2;
    const y = tileY * TILE + TILE / 2;
    const bob = Math.sin(time * 0.004 + tileX * 0.5 + tileY * 0.4) * 1.4;
    const size = boss ? 1.22 : 1;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size, size);
    ctx.fillStyle = boss ? "rgba(255, 120, 120, 0.28)" : "rgba(255, 196, 122, 0.18)";
    ctx.beginPath();
    ctx.ellipse(0, 18, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(0, bob - 10);
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.moveTo(-11, 4);
    ctx.lineTo(0, -8);
    ctx.lineTo(11, 4);
    ctx.lineTo(9, 18);
    ctx.lineTo(-9, 18);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = palette.secondary;
    ctx.fillRect(-12, 8, 24, 9);
    ctx.fillStyle = palette.accent;
    ctx.fillRect(-5, -9, 10, 8);
    ctx.fillRect(-15, 1, 4, 8);
    ctx.fillRect(11, 1, 4, 8);
    ctx.fillStyle = boss ? "#ffd5cb" : "#fff5d7";
    ctx.fillRect(-2, -4, 4, 2);
    ctx.fillRect(-6, -13, 4, 7);
    ctx.fillRect(2, -13, 4, 7);
    ctx.restore();
  }

  function drawSigil(tileX, tileY, time) {
    const x = tileX * TILE + TILE / 2;
    const y = tileY * TILE + TILE / 2;
    const bob = Math.sin(time * 0.004 + tileX) * 1.5;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(124, 232, 206, 0.16)";
    ctx.beginPath();
    ctx.ellipse(0, 16, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#274d4e";
    ctx.fillRect(-5, 6, 10, 10);
    ctx.fillStyle = "#9df7e1";
    ctx.beginPath();
    ctx.moveTo(0, -10 + bob);
    ctx.lineTo(-7, 1 + bob);
    ctx.lineTo(0, 12 + bob);
    ctx.lineTo(7, 1 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawCamp(tileX, tileY, time) {
    const x = tileX * TILE + TILE / 2;
    const y = tileY * TILE + TILE / 2;
    const bob = Math.sin(time * 0.004 + tileX) * 1.2;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(255, 168, 110, 0.14)";
    ctx.beginPath();
    ctx.ellipse(0, 16, 13, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#69432a";
    ctx.fillRect(-7, 14, 14, 3);
    ctx.fillStyle = "#ffb06a";
    ctx.beginPath();
    ctx.moveTo(0, -8 + bob);
    ctx.lineTo(-6, 14);
    ctx.lineTo(6, 14);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffe08d";
    ctx.fillRect(-2, -2 + bob, 4, 6);
    ctx.restore();
  }

  function drawMarker(event, time) {
    if (event.active === false) return;
    const x = event.x * TILE + TILE / 2;
    const y = event.y * TILE + 8;
    const pulse = 0.45 + Math.sin(time * 0.005 + event.x * 0.4 + event.y * 0.2) * 0.22;
    let glow = "rgba(232, 206, 142, 0.42)";
    if (event.kind === "sigil") glow = "rgba(124, 232, 206, 0.46)";
    if (event.kind === "enemy" || event.kind === "boss") glow = "rgba(255, 127, 143, 0.42)";

    ctx.save();
    ctx.strokeStyle = glow;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 8 + pulse * 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawEvents(time) {
    events.forEach((event) => {
      if (event.active === false) return;
      if (event.id === "oracle") {
        drawHumanoid(event.x, event.y, {
          primary: "#f0d283",
          secondary: "#8edfd4",
          accent: "#fff7df",
          skin: "#eabb8a",
          hair: "#fff0c6"
        }, time, "down");
      } else if (event.id === "camp") {
        drawCamp(event.x, event.y, time);
      } else if (event.kind === "sigil") {
        drawSigil(event.x, event.y, time);
      } else if (event.kind === "enemy") {
        drawGuardian(event.x, event.y, enemyTemplates[event.battle].palette, time, false);
      } else if (event.kind === "boss") {
        drawGuardian(event.x, event.y, enemyTemplates[event.battle].palette, time, true);
      }
      drawMarker(event, time);
    });
  }

  function drawHero(time) {
    drawHumanoid(state.hero.renderX, state.hero.renderY, state.hero.palette, time, state.hero.facing, 1.04);
  }

  function drawHoverState() {
    if (!state.hover) return;
    const { tile, path, eventId } = state.hover;
    if (path) {
      drawRoute(path, "rgba(255,255,255,0.86)", eventId ? "rgba(124,232,206,0.58)" : "rgba(232,206,142,0.5)", true);
    }
    ctx.save();
    ctx.strokeStyle = eventId ? "rgba(124,232,206,0.92)" : "rgba(232,206,142,0.9)";
    ctx.lineWidth = 2;
    ctx.strokeRect(tile.x * TILE + 2, tile.y * TILE + 2, TILE - 4, TILE - 4);
    ctx.restore();
  }

  function drawActiveRoute() {
    if (!state.route.length) return;
    const path = [{ x: state.hero.x, y: state.hero.y }, ...state.route];
    drawRoute(path, "rgba(255, 246, 220, 0.92)", "rgba(232, 206, 142, 0.58)", false);
  }

  function drawAmbient(time) {
    particles.forEach((particle) => {
      const x = particle.x + Math.sin(time * 0.001 * particle.speed + particle.phase) * 18;
      const y = particle.y + Math.cos(time * 0.0014 * particle.speed + particle.phase) * 14;
      ctx.fillStyle = "rgba(232, 206, 142, 0.32)";
      ctx.fillRect(x, y, particle.radius, particle.radius);
    });
  }

  function drawWorld(time) {
    drawBackdrop(time);
    for (let y = 0; y < MAP_H; y += 1) {
      for (let x = 0; x < MAP_W; x += 1) {
        drawTile(x, y, tileAt(x, y).type, time);
      }
    }
    drawAmbient(time);
    drawActiveRoute();
    drawHoverState();
    drawEvents(time);
    drawHero(time);

    const vignette = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 180, canvas.width / 2, canvas.height / 2, canvas.width * 0.75);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.42)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function loop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = Math.min(0.05, (timestamp - lastTime) / 1000);
    lastTime = timestamp;

    if (state) {
      updateMovement(dt);
      drawWorld(timestamp);
    }

    requestAnimationFrame(loop);
  }

  questList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-target]");
    if (!button) return;
    routeToEvent(button.dataset.target);
  });

  focusQuestBtn.addEventListener("click", () => {
    const objective = objectiveInfo();
    openDialog("Quest hint", objective.title, objective.summary);
  });

  restartBtn.addEventListener("click", () => {
    openStartOverlay();
  });

  startJourneyBtn.addEventListener("click", () => {
    resetRun();
  });

  dialogConfirmBtn.addEventListener("click", closeDialog);
  playAgainBtn.addEventListener("click", openStartOverlay);

  attackBtn.addEventListener("click", () => battleAction("attack"));
  abilityBtn.addEventListener("click", () => battleAction("ability"));
  guardBtn.addEventListener("click", () => battleAction("guard"));
  potionBtn.addEventListener("click", () => battleAction("potion"));

  canvas.addEventListener("mousemove", onCanvasMove);
  canvas.addEventListener("mouseleave", () => {
    state.hover = null;
    refreshActionCard();
  });
  canvas.addEventListener("click", onCanvasClick);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialogOverlay.classList.contains("hidden")) {
      event.preventDefault();
      closeDialog();
    }
  });

  terrain = createTerrain();
  events = createEvents();
  state = makeState(selectedClassId);
  renderClassCards();
  renderUI();
  requestAnimationFrame(loop);
})();
