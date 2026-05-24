// Command Ops 2 TAC-COM Main Application Controller

// Access global modules from the window namespace (to bypass CORS file:// limitations)
const { natoSymbols } = window;
const { scenarios, operationalChecklist } = window;
const { calculateOrderDelay, calculateCombatEfficiency } = window;
const { askAdvisor } = window;
const { manualDatabase } = window;

// --- State Variables ---
let currentTab = 'tab-advisor';
let currentPersona = 'staff';
let activeScenarioId = 'st_vith';
let activeSymbolId = 'hq';
let checkedChecklistSteps = new Set();

// Web Audio API Elements for Atmospheric SFX
let audioCtx = null;
let staticNode = null;
let staticGainNode = null;

// --- Initialize DOM Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  initTelemetryClock();
  initTabs();
  initAtmosphericSound();
  initOllamaConfig();
  initAdvisorChat();
  initCalculators();
  initNatoSymbols();
  initScenariosAndChecklist();
  initManualDatabase();
});

// 1. Live Telemetry Clock & Metadata
function initTelemetryClock() {
  const timeEl = document.getElementById('telemetry-time');
  
  function updateTime() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hrs}:${mins}:${secs}`;
  }
  
  setInterval(updateTime, 1000);
  updateTime();
}

// 2. Tab Navigation
function initTabs() {
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Button click SFX
      playBeep(400, 0.03);

      const targetTab = item.getAttribute('data-tab');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      tabContents.forEach(tab => tab.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
      
      currentTab = targetTab;
    });
  });
}

// 3. Web Audio Military Radio Synthesizer (Zero-Assets Atmosphere)
function initAtmosphericSound() {
  const soundToggle = document.getElementById('sound-toggle');
  
  soundToggle.addEventListener('change', () => {
    playBeep(500, 0.05);

    if (soundToggle.checked) {
      startRadioStatic();
    } else {
      stopRadioStatic();
    }
  });
}

function startRadioStatic() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // 1. Synthesize Radio Noise Buffer (Brownian / Pink-ish noise)
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brownian filter integration
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    staticNode = audioCtx.createBufferSource();
    staticNode.buffer = noiseBuffer;
    staticNode.loop = true;

    // 2. Add Bandpass Filter (Simulates tactical military radio band restrictions)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200; // Peak voice freq
    filter.Q.value = 1.8;

    // 3. Gain management for quiet background hum
    staticGainNode = audioCtx.createGain();
    staticGainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // Subtle background static

    // Connect nodes
    staticNode.connect(filter);
    filter.connect(staticGainNode);
    staticGainNode.connect(audioCtx.destination);

    staticNode.start(0);
  } catch (err) {
    console.error('Web Audio static synth failed:', err);
  }
}

function stopRadioStatic() {
  if (staticNode) {
    try {
      staticNode.stop();
      staticNode.disconnect();
    } catch(e) {}
    staticNode = null;
  }
}

// Play custom terminal beep sound (Click effects)
function playBeep(freq = 600, duration = 0.05, type = 'sine') {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return;
    }
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio click playback failed:', e);
  }
}

// 4. Ollama Configuration Settings Persistence & Auto-Detection
function initOllamaConfig() {
  const activeToggle = document.getElementById('ollama-active-toggle');
  const urlInput = document.getElementById('ollama-url-input');
  const modelSelect = document.getElementById('ollama-model-input');
  const systemModeTag = document.getElementById('system-mode-tag');
  const connectionIndicator = document.getElementById('connection-indicator');
  const connectionText = document.getElementById('connection-status-text');

  // Load from local storage
  const isOllamaActive = localStorage.getItem('cops_ollama_active') === 'true';
  const savedUrl = localStorage.getItem('cops_ollama_url') || 'http://localhost:11434';
  const savedModel = localStorage.getItem('cops_ollama_model') || 'gpt-oss-120';

  urlInput.value = savedUrl;
  activeToggle.checked = isOllamaActive;

  // Auto-detect & populate installed models dropdown
  async function fetchOllamaModels(url, preferredModel) {
    try {
      if (activeToggle.checked) {
        connectionIndicator.classList.add('offline');
        connectionText.textContent = 'TESPİT EDİLİYOR...';
      }

      const res = await fetch(`${url}/api/tags`);
      if (!res.ok) throw new Error('Tags API failed');
      
      const data = await res.json();
      const models = data.models || [];
      
      // Clear options
      modelSelect.innerHTML = '';
      
      if (models.length === 0) {
        const opt = document.createElement('option');
        opt.value = 'gpt-oss-120';
        opt.textContent = 'gpt-oss-120 (Model bulunamadı)';
        modelSelect.appendChild(opt);
      } else {
        models.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m.name;
          opt.textContent = m.name;
          modelSelect.appendChild(opt);
        });
      }

      // Selection priority logic: preferredModel -> gpt-oss-120 -> gpt-oss-120:latest -> first available
      const modelNames = models.map(m => m.name);
      if (modelNames.includes(preferredModel)) {
        modelSelect.value = preferredModel;
      } else if (modelNames.includes('gpt-oss-120:latest')) {
        modelSelect.value = 'gpt-oss-120:latest';
      } else if (modelNames.includes('gpt-oss-120')) {
        modelSelect.value = 'gpt-oss-120';
      } else if (models.length > 0) {
        modelSelect.value = models[0].name;
      }

      localStorage.setItem('cops_ollama_model', modelSelect.value);

      if (activeToggle.checked) {
        connectionIndicator.classList.remove('offline');
        connectionText.textContent = 'LLM BAĞLANTISI OK';
        systemModeTag.textContent = `LOCAL LLM (${modelSelect.value.toUpperCase()})`;
      }
    } catch (err) {
      console.warn('Ollama tags auto-detect failed:', err);
      // Fallback
      modelSelect.innerHTML = '';
      const opt = document.createElement('option');
      opt.value = preferredModel;
      opt.textContent = `${preferredModel} (Çevrimdışı / Tespit Yok)`;
      modelSelect.appendChild(opt);
      modelSelect.value = preferredModel;

      if (activeToggle.checked) {
        connectionIndicator.classList.add('offline');
        connectionText.textContent = 'OLLAMA BULUNAMADI';
        systemModeTag.textContent = 'ÇEVRİMDIŞI MOD';
      }
    }
  }

  function updateStatusTag() {
    if (activeToggle.checked) {
      fetchOllamaModels(urlInput.value, localStorage.getItem('cops_ollama_model') || savedModel);
    } else {
      systemModeTag.textContent = 'OFFLINE VERİTABANI';
      connectionIndicator.classList.remove('offline');
      connectionText.textContent = 'SİSTEM AKTİF';
    }
  }

  // Bind saving & click events
  activeToggle.addEventListener('change', () => {
    localStorage.setItem('cops_ollama_active', activeToggle.checked);
    playBeep(450, 0.08);
    updateStatusTag();
  });

  urlInput.addEventListener('change', () => {
    localStorage.setItem('cops_ollama_url', urlInput.value);
    fetchOllamaModels(urlInput.value, modelSelect.value);
  });

  modelSelect.addEventListener('change', () => {
    localStorage.setItem('cops_ollama_model', modelSelect.value);
    playBeep(400, 0.04);
    if (activeToggle.checked) {
      systemModeTag.textContent = `LOCAL LLM (${modelSelect.value.toUpperCase()})`;
    }
  });

  // Init models fetch at startup
  fetchOllamaModels(urlInput.value, savedModel).then(() => {
    updateStatusTag();
  });
}

// 5. Advisor Chat Logic
function initAdvisorChat() {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-user-input');
  const chatStream = document.getElementById('chat-stream');
  const personaButtons = document.querySelectorAll('.persona-btn');
  const suggestionChips = document.querySelectorAll('.suggest-chip');

  // Change advisor persona
  personaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      playBeep(400, 0.05);
      personaButtons.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      currentPersona = btn.getAttribute('data-persona');
    });
  });

  // Suggestion chip triggers
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const qText = chip.getAttribute('data-question');
      chatInput.value = qText;
      chatForm.dispatchEvent(new Event('submit'));
    });
  });

  // Submit form
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const questionText = chatInput.value.trim();
    if (!questionText) return;

    // Play click sound
    playBeep(700, 0.04);

    // Clear input
    chatInput.value = '';

    // Append User message to stream
    appendChatMessage('user', 'KOMUTAN', questionText);

    // Append advisor processing placeholder
    const processingId = 'msg-' + Date.now();
    appendChatMessage('advisor', getPersonaName(currentPersona), 'İstihbarat toplanıyor ve emir zinciri haritalanıyor, lütfen bekleyin...', processingId);

    // Fetch config values
    const useLocalOllama = document.getElementById('ollama-active-toggle').checked;
    const ollamaUrl = document.getElementById('ollama-url-input').value;
    const ollamaModel = document.getElementById('ollama-model-input').value;

    // Compile RAG context from manual database
    let manualContext = '';
    const qLower = questionText.toLowerCase();
    if (window.manualDatabase) {
      Object.keys(window.manualDatabase).forEach(key => {
        const topic = window.manualDatabase[key];
        const keywords = [
          key,
          'gecikme', 'delay', 'order delay', 'emir gecikmesi',
          'ikmal', 'supply', 'mühimmat', 'ammo', 'los', 'yakıt',
          'yorgunluk', 'fatigue', 'kondisyon', 'dinlenme', 'rest',
          'uyum', 'cohesion', 'suppression', 'baskı', 'reorg',
          'topçu', 'artillery', 'havan', 'bombard', 'menzil'
        ];
        
        // Match key or topic titles
        const topicMatch = key.split('_').some(word => qLower.includes(word)) || 
                           topic.title.toLowerCase().split(' ').some(word => word.length > 3 && qLower.includes(word));
        
        if (topicMatch) {
          manualContext += `\n--- OYUN REHBERİ: ${topic.title} ---\n[PDF Kılavuz Özeti]:\n${topic.raw_snippet}\n[Kurmay Taktik Bilgisi]:\n${topic.turkish_summary}\n`;
        }
      });
    }

    // Trigger AI advisor
    const advisorAnswer = await askAdvisor({
      question: questionText,
      persona: currentPersona,
      ollamaUrl,
      ollamaModel,
      useLocalOllama,
      manualContext
    });

    // Replace the processing message with the real answer
    const processingEl = document.getElementById(processingId);
    if (processingEl) {
      // Typewriter-like effect
      processingEl.querySelector('.msg-body').innerHTML = formatMarkdown(advisorAnswer);
      playBeep(850, 0.1, 'triangle');
      // Scroll to bottom
      chatStream.scrollTop = chatStream.scrollHeight;
    }
  });
}

function appendChatMessage(sender, prefix, text, uniqueId = '') {
  const chatStream = document.getElementById('chat-stream');
  
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${sender}`;
  if (uniqueId) {
    msgDiv.id = uniqueId;
  }
  
  msgDiv.innerHTML = `
    <div class="msg-prefix">${prefix}</div>
    <div class="msg-body">${text}</div>
  `;
  
  chatStream.appendChild(msgDiv);
  chatStream.scrollTop = chatStream.scrollHeight;
}

function getPersonaName(persona) {
  switch (persona) {
    case 'staff': return 'Kurmay Binbaşı';
    case 'veteran': return 'Gazi Çavuş';
    case 'technical': return 'Teknik Analist';
    default: return 'Danışman';
  }
}

// Basic markdown format compiler for retro styling
function formatMarkdown(text) {
  let html = text;
  // bold **text**
  html = html.replace(/\*\*(.*?)\*\"/g, '<strong>$1</strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // bullet points * text
  html = html.replace(/^\*\s(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  // newlines
  html = html.replace(/\n/g, '<br>');
  // code blocks style
  html = html.replace(/`(.*?)`/g, '<code style="background-color: var(--bg-darkest); color: var(--color-amber); padding: 2px 5px; border-radius: 2px;">$1</code>');
  return html;
}

// 6. Calculators Bindings & Math Rendering
function initCalculators() {
  // Select DOM inputs
  const inputSenderLevel = document.getElementById('calc-sender-level');
  const inputReceiverLevel = document.getElementById('calc-receiver-level');
  const inputHqQuality = document.getElementById('calc-hq-quality');
  const inputHqFatigue = document.getElementById('calc-hq-fatigue');
  const inputHqSuppression = document.getElementById('calc-hq-suppression');
  const inputHqComms = document.getElementById('calc-hq-comms');
  const inputHqComplexity = document.getElementById('calc-hq-complexity');

  const inputUnitPower = document.getElementById('calc-unit-power');
  const inputUnitSupply = document.getElementById('calc-unit-supply');
  const inputUnitEntrench = document.getElementById('calc-unit-entrench');
  const inputUnitFatigue = document.getElementById('calc-unit-fatigue');
  const inputUnitCohesion = document.getElementById('calc-unit-cohesion');
  const inputUnitTerrain = document.getElementById('calc-unit-terrain');

  // Trigger calculation
  function runOrderDelayCalc() {
    const delayData = calculateOrderDelay({
      senderLevel: inputSenderLevel.value,
      receiverLevel: inputReceiverLevel.value,
      hqQuality: inputHqQuality.value,
      fatigue: inputHqFatigue.value,
      suppression: inputHqSuppression.value,
      comms: inputHqComms.value,
      orderComplexity: inputHqComplexity.value
    });

    // Render results
    document.getElementById('result-delay-val').textContent = delayData.totalMinutes;
    document.getElementById('breakdown-base').textContent = `${delayData.baseDelay} dk`;
    document.getElementById('breakdown-fatigue').textContent = `x${delayData.fatigueMultiplier}`;
    document.getElementById('breakdown-suppression').textContent = `x${delayData.suppressionMultiplier}`;
    document.getElementById('breakdown-comms').textContent = `+${delayData.commsPenalty} dk`;
    document.getElementById('breakdown-complexity').textContent = `+${delayData.complexityPenalty} dk`;
    
    // Play subtle tick sound
    playBeep(900, 0.01);
  }

  function runCombatCalc() {
    const baseP = parseInt(inputUnitPower.value) || 100;
    const combatData = calculateCombatEfficiency({
      basePower: baseP,
      supplyState: inputUnitSupply.value,
      entrenchment: inputUnitEntrench.value,
      fatigue: inputUnitFatigue.value,
      cohesion: inputUnitCohesion.value,
      terrain: inputUnitTerrain.value
    });

    // Render results
    document.getElementById('result-power-val').textContent = combatData.actualOffensivePower;
    document.getElementById('result-def-val').textContent = combatData.defensiveProtection;
    document.getElementById('breakdown-efficiency').textContent = `${combatData.offensiveEfficiency}%`;
    document.getElementById('breakdown-supply-mod').textContent = `x${combatData.supplyModifier}`;
    document.getElementById('breakdown-entrench-mod').textContent = `x${combatData.entrenchmentModifier}`;
    document.getElementById('breakdown-terrain-cover').textContent = `x${combatData.terrainCover}`;

    // Adjust Efficiency progress fill bar
    const progressFill = document.getElementById('efficiency-fill');
    const effPercent = parseInt(combatData.offensiveEfficiency);
    progressFill.style.width = `${effPercent}%`;
    
    progressFill.className = 'efficiency-progress-fill';
    if (effPercent < 35) {
      progressFill.classList.add('red');
    } else if (effPercent < 70) {
      progressFill.classList.add('amber');
    }

    playBeep(950, 0.01);
  }

  // Bind listeners
  const delayInputs = [inputSenderLevel, inputReceiverLevel, inputHqQuality, inputHqFatigue, inputHqSuppression, inputHqComms, inputHqComplexity];
  delayInputs.forEach(ctrl => ctrl.addEventListener('change', runOrderDelayCalc));

  const combatInputs = [inputUnitPower, inputUnitSupply, inputUnitEntrench, inputUnitFatigue, inputUnitCohesion, inputUnitTerrain];
  combatInputs.forEach(ctrl => {
    ctrl.addEventListener('change', runCombatCalc);
    ctrl.addEventListener('input', runCombatCalc);
  });

  // Init runs
  runOrderDelayCalc();
  runCombatCalc();
}

// 7. NATO Symbols Encyclopedia Render
function initNatoSymbols() {
  const gridContainer = document.getElementById('nato-grid-container');
  const detailPane = document.getElementById('nato-detail-pane');

  function renderGrid() {
    gridContainer.innerHTML = '';
    natoSymbols.forEach(symbol => {
      const card = document.createElement('div');
      card.className = `symbol-card ${symbol.id === activeSymbolId ? 'active' : ''}`;
      card.innerHTML = `
        ${symbol.svg}
        <div class="symbol-name">${symbol.name}</div>
      `;
      card.addEventListener('click', () => {
        playBeep(600, 0.03);
        activeSymbolId = symbol.id;
        renderGrid();
        renderDetail();
      });
      gridContainer.appendChild(card);
    });
  }

  function renderDetail() {
    const symbol = natoSymbols.find(s => s.id === activeSymbolId);
    if (!symbol) return;

    detailPane.innerHTML = `
      <div class="detail-pane-header">
        ${symbol.svg}
        <div class="detail-title">${symbol.name}</div>
        <div class="detail-role">${symbol.role}</div>
      </div>
      <div class="detail-body">
        <h4>Tanım / Savaş Alanı Rolü</h4>
        <p>${symbol.description}</p>
        
        <h4>Güçlü Yönleri (Avantaj)</h4>
        <p style="color: var(--color-phosphor);">${symbol.strengths}</p>
        
        <h4>Zayıf Yönleri (Dezavantaj)</h4>
        <p style="color: var(--color-red);">${symbol.weaknesses}</p>
        
        <h4>Operasyonel Kurmay Tavsiyesi</h4>
        <p style="border-left: 2px solid var(--color-amber); padding-left: 10px; font-style: italic;">
          ${symbol.advice}
        </p>
      </div>
    `;
  }

  // Initial render
  renderGrid();
  renderDetail();
}

// 8. Scenario Selector & Pre-Engagement Planning Checklist
function initScenariosAndChecklist() {
  const scenSelectorList = document.getElementById('scenarios-selector-list');
  const checklistContainer = document.getElementById('checklist-container');

  function renderScenarios() {
    scenSelectorList.innerHTML = '';
    scenarios.forEach(scen => {
      const item = document.createElement('div');
      item.className = `scenario-item ${scen.id === activeScenarioId ? 'active' : ''}`;
      item.innerHTML = `
        <div class="scenario-name">${scen.name}</div>
        <div class="scenario-diff">Zorluk: ${scen.difficulty}</div>
      `;
      item.addEventListener('click', () => {
        playBeep(550, 0.03);
        activeScenarioId = scen.id;
        document.getElementById('telemetry-map').textContent = scen.name.split(' (')[0];
        
        // Reset checklist when switching map
        checkedChecklistSteps.clear();
        updateChecklistCounter();

        renderScenarios();
        renderScenarioBrief();
        renderChecklist();
      });
      scenSelectorList.appendChild(item);
    });
  }

  function renderScenarioBrief() {
    const scen = scenarios.find(s => s.id === activeScenarioId);
    if (!scen) return;

    document.getElementById('scen-detail-name').textContent = scen.name;
    document.getElementById('scen-detail-diff').textContent = scen.difficulty;
    document.getElementById('scen-detail-allied').textContent = scen.forces.allied;
    document.getElementById('scen-detail-axis').textContent = scen.forces.axis;
    document.getElementById('scen-detail-dur').textContent = scen.duration;
    document.getElementById('scen-detail-area').textContent = scen.mapArea;
    document.getElementById('scen-detail-brief').innerHTML = scen.briefing;

    // Tips
    const tipsList = document.getElementById('scen-detail-tips');
    tipsList.innerHTML = '';
    scen.tacticalTips.forEach(tip => {
      const li = document.createElement('li');
      li.innerHTML = formatMarkdown(tip);
      tipsList.appendChild(li);
    });
  }

  function renderChecklist() {
    checklistContainer.innerHTML = '';
    operationalChecklist.forEach(step => {
      const card = document.createElement('div');
      card.className = `checklist-card ${checkedChecklistSteps.has(step.step) ? 'checked' : ''}`;
      card.innerHTML = `
        <input type="checkbox" class="checkbox-custom" id="chk-step-${step.step}" ${checkedChecklistSteps.has(step.step) ? 'checked' : ''}>
        <div class="checklist-body">
          <div class="checklist-step-title">${step.step}. ${step.title}</div>
          <div class="checklist-desc">${step.description}</div>
        </div>
      `;

      const chk = card.querySelector('.checkbox-custom');
      chk.addEventListener('change', () => {
        playBeep(650, 0.05);
        if (chk.checked) {
          checkedChecklistSteps.add(step.step);
        } else {
          checkedChecklistSteps.delete(step.step);
        }
        card.classList.toggle('checked', chk.checked);
        updateChecklistCounter();
      });

      checklistContainer.appendChild(card);
    });
  }

  function updateChecklistCounter() {
    const current = checkedChecklistSteps.size;
    const total = operationalChecklist.length;
    document.getElementById('telemetry-checklist').textContent = `${current}/${total}`;
  }

  // Initial Render runs
  renderScenarios();
  renderScenarioBrief();
  renderChecklist();
}

// 9. Official Game Manual Database Viewer
function initManualDatabase() {
  const topicsList = document.getElementById('manual-topics-list');
  const contentDisplay = document.getElementById('manual-content-display');
  let activeTopicId = 'order_delay';

  function renderTopics() {
    topicsList.innerHTML = '';
    Object.keys(manualDatabase).forEach(key => {
      const topic = manualDatabase[key];
      const item = document.createElement('div');
      item.className = `scenario-item ${key === activeTopicId ? 'active' : ''}`;
      item.innerHTML = `
        <div class="scenario-name">${topic.title}</div>
        <div class="scenario-diff">Sayfa Ref: ${topic.pages.join(', ')}</div>
      `;
      item.addEventListener('click', () => {
        playBeep(550, 0.03);
        activeTopicId = key;
        renderTopics();
        renderContent();
      });
      topicsList.appendChild(item);
    });
  }

  function renderContent() {
    const topic = manualDatabase[activeTopicId];
    if (!topic) return;

    contentDisplay.innerHTML = `
      <div class="detail-pane-header" style="align-items: flex-start;">
        <div class="detail-title" style="font-size: 22px;">📖 ${topic.title}</div>
        <div class="detail-role" style="color: var(--color-amber); border-color: var(--color-amber); background: rgba(255, 183, 0, 0.05);">
          Resmi Kılavuz Sayfa Referansları: P. ${topic.pages.join(', ')}
        </div>
      </div>
      <div class="detail-body" style="margin-top: 15px;">
        <h4 style="color: var(--color-phosphor); font-size: 13px; margin-bottom: 8px;">🎖️ KURMAY TAKTİK ÖZETİ (TÜRKÇE)</h4>
        <p style="font-size: 13.5px; line-height: 1.6; color: #daf5ff; margin-bottom: 20px; background: rgba(0, 229, 255, 0.02); padding: 15px; border-radius: 4px; border: 1px solid rgba(0, 229, 255, 0.1);">
          ${formatMarkdown(topic.turkish_summary)}
        </p>

        <h4 style="color: var(--color-amber); font-size: 13px; margin-bottom: 8px;">📄 ORİJİNAL KILAVUZ METNİ (ORIGINAL PDF EXTRACT)</h4>
        <div style="background: var(--bg-darkest); border: 1px solid var(--border-color); padding: 15px; border-radius: 4px; font-family: var(--font-mono); font-size: 12px; line-height: 1.5; color: #a4bfae; max-height: 300px; overflow-y: auto; white-space: pre-line;">
          ${topic.raw_snippet}
        </div>
      </div>
    `;
  }

  // Initial runs
  renderTopics();
  renderContent();
}
