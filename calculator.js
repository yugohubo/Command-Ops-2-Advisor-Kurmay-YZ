// Command Ops 2 Tactical Calculations Engine
window.calculateOrderDelay = function({
  senderLevel,
  receiverLevel,
  hqQuality,
  fatigue,
  suppression,
  comms,
  orderComplexity
}) {
  // 1. Base delay from Sender / Receiver level (Page 120 formula)
  let senderBase = 60; // Division
  switch (senderLevel) {
    case 'division': senderBase = 60; break;
    case 'brigade': senderBase = 40; break;
    case 'battalion': senderBase = 30; break;
  }

  let receiverBase = 30; // Battalion
  switch (receiverLevel) {
    case 'brigade': receiverBase = 40; break;
    case 'battalion': receiverBase = 30; break;
    case 'company': receiverBase = 20; break;
  }

  // 2/3 of sender delay and 1/3 of receiver delay
  let baseCalculatedDelay = (senderBase * 2 / 3) + (receiverBase / 3);

  // 2. Commander / Staff Quality Modifier (+/- 25% variation)
  let staffMod = 1.0;
  switch (hqQuality) {
    case 'elite': staffMod = 0.75; break;   // -25%
    case 'veteran': staffMod = 0.88; break; // -12%
    case 'line': staffMod = 1.0; break;     // 0%
    case 'green': staffMod = 1.12; break;   // +12%
    case 'untrained': staffMod = 1.25; break; // +25%
  }

  let baseDelay = baseCalculatedDelay * staffMod;

  // 3. Fatigue Multiplier
  let fatigueMult = 1.0;
  switch (fatigue) {
    case 'fresh': fatigueMult = 1.0; break;
    case 'tired': fatigueMult = 1.25; break;
    case 'fatigued': fatigueMult = 1.6; break;
    case 'exhausted': fatigueMult = 2.2; break;
  }

  // 4. Suppression (Combat stress) Multiplier
  let suppressionMult = 1.0;
  switch (suppression) {
    case 'none': suppressionMult = 1.0; break;
    case 'light': suppressionMult = 1.35; break;
    case 'heavy': suppressionMult = 1.9; break;
    case 'pinned': suppressionMult = 2.8; break;
  }

  // 5. Command Link / Communication Penalty (in minutes)
  let commsPenalty = 0;
  switch (comms) {
    case 'excellent': commsPenalty = 0; break;
    case 'degraded': commsPenalty = 18; break;
    case 'cut': commsPenalty = 50; break; // Runners only
  }

  // 6. Order Complexity Penalty (in minutes)
  let complexityPenalty = 0;
  switch (orderComplexity) {
    case 'simple': complexityPenalty = 0; break;  // Move in column, In-situ defend
    case 'moderate': complexityPenalty = 12; break; // Probe, basic delay
    case 'complex': complexityPenalty = 30; break;  // Multi-unit coordinated assault
  }

  // Calculate final delay
  const calculatedDelay = (baseDelay * fatigueMult * suppressionMult) + commsPenalty + complexityPenalty;

  return {
    baseDelay: Math.round(baseDelay),
    fatigueMultiplier: fatigueMult.toFixed(2),
    suppressionMultiplier: suppressionMult.toFixed(2),
    commsPenalty,
    complexityPenalty,
    totalMinutes: Math.round(calculatedDelay)
  };
};

window.calculateCombatEfficiency = function({
  basePower,
  supplyState,
  entrenchment,
  fatigue,
  cohesion,
  terrain
}) {
  // 1. Supply State Modifier
  let supplyMod = 1.0;
  switch (supplyState) {
    case 'full': supplyMod = 1.0; break;
    case 'degraded': supplyMod = 0.65; break;
    case 'out': supplyMod = 0.25; break;
  }

  // 2. Deployment / Entrenchment Defense Factor (Lower = Better protection / Less damage taken)
  // According to Page 147 of the Game Manual, Undeployed is extremely vulnerable, while Fortified is invulnerable to light bombardments.
  let entrenchmentDef = 1.0;
  let firingPenalty = 1.0; // Firing capacity / accuracy multiplier based on deployment
  
  switch (entrenchment) {
    case 'undeployed': 
      entrenchmentDef = 1.35; // +35% vulnerability penalty (moving, crew exposed)
      firingPenalty = 0.45;   // 55% accuracy and rate of fire penalty
      break;
    case 'taking_cover': 
      entrenchmentDef = 0.85; // Prone cover
      firingPenalty = 0.70;   // 30% accuracy and rate of fire penalty
      break;
    case 'deployed': 
      entrenchmentDef = 0.65; // Spread out battle formation, vehicles hull-down
      firingPenalty = 1.00;   // No firing penalties, heavy weapons active
      break;
    case 'dug_in': 
      entrenchmentDef = 0.45; // Slit trenches and vehicle scrapes
      firingPenalty = 1.00;
      break;
    case 'entrenched': 
      entrenchmentDef = 0.25; // Roofed-over trenches (high protection from artillery fragments)
      firingPenalty = 1.00;
      break;
    case 'fortified': 
      entrenchmentDef = 0.10; // Concrete bunkers / pillboxes
      firingPenalty = 1.00;
      break;
  }

  // 3. Fatigue Modifier (Affects offensive speed, fire rate, and defense)
  let fatigueMod = 1.0;
  switch (fatigue) {
    case 'fresh': fatigueMod = 1.0; break;
    case 'tired': fatigueMod = 0.8; break;
    case 'fatigued': fatigueMod = 0.55; break;
    case 'exhausted': fatigueMod = 0.25; break;
  }

  // 4. Cohesion Modifier (Represents tactical organization)
  let cohesionMod = 1.0;
  switch (cohesion) {
    case 'high': cohesionMod = 1.0; break;
    case 'normal': cohesionMod = 0.85; break;
    case 'disorganized': cohesionMod = 0.5; break;
    case 'broken': cohesionMod = 0.15; break;
  }

  // 5. Target Terrain Defense Modifier (Lower = Denser cover, harder to hit)
  let terrainCover = 1.0;
  switch (terrain) {
    case 'open': terrainCover = 1.0; break;       // Plain / Fields
    case 'forest': terrainCover = 0.45; break;    // Woods / Forest
    case 'urban': terrainCover = 0.25; break;     // Towns / Stone buildings
    case 'swamp': terrainCover = 0.55; break;     // Marsh / Mud
  }

  // Combat Efficiency Rating (Offensive Capacity)
  // Combines logistics supply state, fatigue, cohesion, and deployment firing penalties (Page 146 & 147)
  const offensiveEfficiency = supplyMod * fatigueMod * cohesionMod * firingPenalty;
  const actualOffensivePower = Math.round(basePower * offensiveEfficiency);

  // Defensive Coverage Rating (Total protection multiplier)
  // Combines physical deployment cover (entrenchmentDef) and terrain cover.
  // Clamp the protection so it doesn't exceed 100% or fall below 0%
  const defensiveProtectionMultiplier = Math.min(1.35, entrenchmentDef * terrainCover);
  const damageTakenPercent = Math.round(defensiveProtectionMultiplier * 100);
  const defensiveProtection = Math.max(0, 100 - damageTakenPercent);

  return {
    offensiveEfficiency: (offensiveEfficiency * 100).toFixed(0),
    actualOffensivePower,
    defensiveProtection, // Protection rating (higher is better)
    damageTakenPercent: Math.min(100, damageTakenPercent),
    supplyModifier: supplyMod.toFixed(2),
    fatigueModifier: fatigueMod.toFixed(2),
    cohesionModifier: cohesionMod.toFixed(2),
    terrainCover: terrainCover.toFixed(2),
    entrenchmentModifier: entrenchmentDef.toFixed(2),
    firingPenalty: firingPenalty.toFixed(2)
  };
};
