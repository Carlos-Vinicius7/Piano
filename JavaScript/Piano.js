const keys = document.querySelectorAll('.key');
const checkbox = document.querySelector('.checkbox-keys');
const switcher = document.querySelector('.switcher');
const pianoKeys = document.querySelector('.Piano-keys');

// Objeto para armazenar os áudios pré-carregados (elimina o atraso)
const audioCache = {};

const preloadAudio = () => {
    keys.forEach(key => {
        const note = key.getAttribute('data-notes');
        const audio = new Audio(`../Notes/${note}.wav`);
        audio.preload = 'auto';
        audioCache[note] = audio;
    });
};

const playNote = (note, velocity = 0.7) => {
    const audio = audioCache[note];
    if (audio) {
        // Usa cloneNode para permitir que a mesma nota toque por cima de si mesma sem cortar o final da anterior (suaviza o som)
        const clone = audio.cloneNode();
        clone.volume = Math.min(Math.max(velocity, 0.1), 1.0); // Garante que fique entre 0.1 e 1.0
        clone.play().catch(e => console.log("Erro ao reproduzir:", e));
    }
}

const handleMousedown = (key, velocity = 0.7) => {
    playNote(key.getAttribute('data-notes'), velocity);

    if (typeof checkSongProgress === 'function') {
        const noteChar = key.querySelector('span').textContent;
        checkSongProgress(noteChar);
    }

    if (key.className.includes('black')) {
        key.classList.add('black-pressed');
        return;
    }

    key.style.background = '#ddd';
}

const handleMouseup = (key) => {
    if (key.className.includes('black')) {
        key.classList.remove('black-pressed');
        return;
    }

    key.style.background = 'white';
}

// Eventos de Mouse e Touch tradicionais
keys.forEach(key => {
    key.addEventListener('mousedown', () => handleMousedown(key));
    key.addEventListener('mouseup', () => handleMouseup(key));

    key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleMousedown(key);
    });
    key.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleMouseup(key);
    });
});

// Suporte para deslizar o dedo pelas teclas no celular (Glissando)
pianoKeys.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (target && target.classList.contains('key')) {
        const note = target.getAttribute('data-notes');
        if (!target.dataset.active) {
            target.dataset.active = "true";
            handleMousedown(target);
            
            target.addEventListener('touchend', () => {
                delete target.dataset.active;
                handleMouseup(target);
            }, { once: true });
        }
    }
}, { passive: false });

checkbox.addEventListener('change', ({target}) => {
    if(target.checked){
        switcher.classList.add('switcher--active');
        pianoKeys.classList.remove('disabled-keys');
        return; 
    }

    switcher.classList.remove('switcher--active');
    pianoKeys.classList.add('disabled-keys');
});

const keyNotesMap = {
    'Tab': (v) => handleMousedown(keys[0], v),
    '1': (v) => handleMousedown(keys[1], v),
    'q': (v) => handleMousedown(keys[2], v),
    '2': (v) => handleMousedown(keys[3], v),
    'w': (v) => handleMousedown(keys[4], v),
    'e': (v) => handleMousedown(keys[5], v),
    '3': (v) => handleMousedown(keys[6], v),
    'r': (v) => handleMousedown(keys[7], v),
    '4': (v) => handleMousedown(keys[8], v),
    't': (v) => handleMousedown(keys[9], v),
    '5': (v) => handleMousedown(keys[10], v),
    'y': (v) => handleMousedown(keys[11], v),
    'u': (v) => handleMousedown(keys[12], v),
    '6': (v) => handleMousedown(keys[13], v),
    'i': (v) => handleMousedown(keys[14], v),
    '7': (v) => handleMousedown(keys[15], v),
    'o': (v) => handleMousedown(keys[16], v),
    'p': (v) => handleMousedown(keys[17], v),
    '8': (v) => handleMousedown(keys[18], v),
    '[': (v) => handleMousedown(keys[19], v),
    '9': (v) => handleMousedown(keys[20], v),
    ']': (v) => handleMousedown(keys[21], v),
    '0': (v) => handleMousedown(keys[22], v),
    '-': (v) => handleMousedown(keys[23], v),
    'z': (v) => handleMousedown(keys[24], v),
    's': (v) => handleMousedown(keys[25], v),
    'x': (v) => handleMousedown(keys[26], v),
    'd': (v) => handleMousedown(keys[27], v),
    'c': (v) => handleMousedown(keys[28], v),
    'v': (v) => handleMousedown(keys[29], v),
    'g': (v) => handleMousedown(keys[30], v),
    'b': (v) => handleMousedown(keys[31], v),
    'h': (v) => handleMousedown(keys[32], v),
    'n': (v) => handleMousedown(keys[33], v),
    'j': (v) => handleMousedown(keys[34], v),
    'm': (v) => handleMousedown(keys[35], v)
};

const keyNotesMap2 = {
    'Tab': () => handleMouseup(keys[0]),
    '1': () => handleMouseup(keys[1]),
    'q': () => handleMouseup(keys[2]),
    '2': () => handleMouseup(keys[3]),
    'w': () => handleMouseup(keys[4]),
    'e': () => handleMouseup(keys[5]),
    '3': () => handleMouseup(keys[6]),
    'r': () => handleMouseup(keys[7]),
    '4': () => handleMouseup(keys[8]),
    't': () => handleMouseup(keys[9]),
    '5': () => handleMouseup(keys[10]),
    'y': () => handleMouseup(keys[11]),
    'u': () => handleMouseup(keys[12]),
    '6': () => handleMouseup(keys[13]),
    'i': () => handleMouseup(keys[14]),
    '7': () => handleMouseup(keys[15]),
    'o': () => handleMouseup(keys[16]),
    'p': () => handleMouseup(keys[17]),
    '8': () => handleMouseup(keys[18]),
    '[': () => handleMouseup(keys[19]),
    '9': () => handleMouseup(keys[20]),
    ']': () => handleMouseup(keys[21]),
    '0': () => handleMouseup(keys[22]),
    '-': () => handleMouseup(keys[23]),
    'z': () => handleMouseup(keys[24]),
    's': () => handleMouseup(keys[25]),
    'x': () => handleMouseup(keys[26]),
    'd': () => handleMouseup(keys[27]),
    'c': () => handleMouseup(keys[28]),
    'v': () => handleMouseup(keys[29]),
    'g': () => handleMouseup(keys[30]),
    'b': () => handleMouseup(keys[31]),
    'h': () => handleMouseup(keys[32]),
    'n': () => handleMouseup(keys[33]),
    'j': () => handleMouseup(keys[34]),
    'm': () => handleMouseup(keys[35])
};

document.addEventListener('keydown', (event) => {
    if (keyNotesMap[event.key]) {
        event.preventDefault();
        keyNotesMap[event.key]();
    }
});

document.addEventListener('keyup', (event) => {
    if (keyNotesMap2[event.key]) {
        event.preventDefault();
        keyNotesMap2[event.key]();
    }
});

// Inicializa o pré-carregamento dos áudios ao carregar a página
preloadAudio();

// Lógica de Sequência de Músicas
const brilhaData = [
    {key: 'Tab', time: 0.0, duration: 0.4},
    {key: 'Tab', time: 0.5, duration: 0.4},
    {key: 'r', time: 1.0, duration: 0.4},
    {key: 'r', time: 1.5, duration: 0.4},
    {key: 't', time: 2.0, duration: 0.4},
    {key: 't', time: 2.5, duration: 0.4},
    {key: 'r', time: 3.0, duration: 0.8},
    
    {key: 'e', time: 4.0, duration: 0.4},
    {key: 'e', time: 4.5, duration: 0.4},
    {key: 'w', time: 5.0, duration: 0.4},
    {key: 'w', time: 5.5, duration: 0.4},
    {key: 'q', time: 6.0, duration: 0.4},
    {key: 'q', time: 6.5, duration: 0.4},
    {key: 'Tab', time: 7.0, duration: 0.8}
];

const parabensData = [
    {key: 'Tab', time: 0.0, duration: 0.3},
    {key: 'Tab', time: 0.4, duration: 0.3},
    {key: 'q', time: 0.8, duration: 0.6},
    {key: 'Tab', time: 1.6, duration: 0.6},
    {key: 'e', time: 2.4, duration: 0.6},
    {key: 'w', time: 3.2, duration: 1.0},
    
    {key: 'Tab', time: 4.6, duration: 0.3},
    {key: 'Tab', time: 5.0, duration: 0.3},
    {key: 'q', time: 5.4, duration: 0.6},
    {key: 'Tab', time: 6.2, duration: 0.6},
    {key: 'r', time: 7.0, duration: 0.6},
    {key: 'e', time: 7.8, duration: 1.0}
];

const songsData = {
    'brilha': brilhaData,
    'parabens': parabensData
};

let currentSongSequence = [];
let currentNoteIndex = 0;

const songSelect = document.getElementById('song-select');
const customSongInput = document.getElementById('custom-song-input');
const customSequenceInput = document.getElementById('custom-sequence');
const loadCustomSongBtn = document.getElementById('load-custom-song');
const midiSongInput = document.getElementById('midi-song-input');
const midiFileInput = document.getElementById('midi-file');
const midiFileName = document.getElementById('midi-file-name');
const songSequenceContainer = document.getElementById('song-sequence');
const autoPlayBtn = document.getElementById('auto-play-btn');
const restartBtn = document.getElementById('restart-song-btn');
let autoPlayInterval = null;

function updateActiveTags() {
    const tags = songSequenceContainer.querySelectorAll('.note-tag');
    if (currentNoteIndex >= currentSongSequence.length) return;
    
    const currentTime = currentSongSequence[currentNoteIndex].time;
    let i = currentNoteIndex;
    
    // Ativar todas as notas que ocorrem no mesmo momento (acordes)
    while (i < currentSongSequence.length && Math.abs(currentSongSequence[i].time - currentTime) < 0.05) {
        if (tags[i] && !tags[i].classList.contains('played')) {
            tags[i].classList.add('active');
        }
        i++;
    }
    
    // Scroll para manter a nota atual visível
    if (tags[currentNoteIndex]) {
        const nextTag = tags[currentNoteIndex];
        const containerCenter = songSequenceContainer.clientWidth / 2;
        const tagCenter = nextTag.offsetLeft + (nextTag.clientWidth / 2);
        songSequenceContainer.scrollTo({
            left: tagCenter - containerCenter - songSequenceContainer.offsetLeft,
            behavior: 'smooth'
        });
    }
}

const renderSongSequence = () => {
    songSequenceContainer.innerHTML = '';
    currentSongSequence.forEach((note) => {
        const span = document.createElement('div');
        span.classList.add('note-tag');
        
        let displayNote = note.key;
        if (displayNote.toLowerCase() === 'tab') displayNote = 'TAB';
        span.textContent = displayNote;
        
        songSequenceContainer.appendChild(span);
    });

    if (currentSongSequence.length > 0) {
        autoPlayBtn.disabled = false;
        restartBtn.disabled = false;
        updateActiveTags();
    } else {
        autoPlayBtn.disabled = true;
        restartBtn.disabled = true;
    }
};

restartBtn.addEventListener('click', () => {
    currentNoteIndex = 0;
    const tags = songSequenceContainer.querySelectorAll('.note-tag');
    tags.forEach(t => {
        t.classList.remove('played');
        t.classList.remove('active');
    });
    
    updateActiveTags();
    
    if (autoPlayInterval) {
        cancelAnimationFrame(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayBtn.innerHTML = '▶ Auto Play';
    }
});

autoPlayBtn.addEventListener('click', () => {
    if (autoPlayInterval) {
        cancelAnimationFrame(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayBtn.innerHTML = '▶ Auto Play';
    } else {
        if (currentNoteIndex >= currentSongSequence.length) {
            restartBtn.click();
        }
        
        autoPlayBtn.innerHTML = '⏸ Pausar';
        
        let autoPlayIndex = currentNoteIndex;
        let startTime = performance.now() - (currentSongSequence[autoPlayIndex].time * 1000);
        
        const loop = () => {
            if (autoPlayIndex >= currentSongSequence.length) {
                autoPlayInterval = null;
                autoPlayBtn.innerHTML = '▶ Auto Play';
                return;
            }
            
            const now = performance.now();
            const elapsed = (now - startTime) / 1000;
            
            while (autoPlayIndex < currentSongSequence.length && currentSongSequence[autoPlayIndex].time <= elapsed) {
                const noteObj = currentSongSequence[autoPlayIndex];
                const noteChar = noteObj.key;
                let mapKey = noteChar;
                if (mapKey.toLowerCase() === 'tab') mapKey = 'Tab';
                
                const keyFunc = keyNotesMap[mapKey];
                if (keyFunc) {
                    const vel = noteObj.velocity !== undefined ? noteObj.velocity : 0.7;
                    keyFunc(vel); // Isso também dispara checkSongProgress e atualiza a UI
                    
                    setTimeout(() => {
                        const keyUpFunc = keyNotesMap2[mapKey];
                        if(keyUpFunc) keyUpFunc();
                    }, Math.min(noteObj.duration * 1000, 500));
                }
                autoPlayIndex++;
            }
            
            autoPlayInterval = requestAnimationFrame(loop);
        };
        
        autoPlayInterval = requestAnimationFrame(loop);
    }
});

songSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'custom') {
        customSongInput.style.display = 'flex';
        midiSongInput.style.display = 'none';
        currentSongSequence = [];
        songSequenceContainer.innerHTML = '';
        autoPlayBtn.disabled = true;
        restartBtn.disabled = true;
    } else if (val === 'midi') {
        customSongInput.style.display = 'none';
        midiSongInput.style.display = 'flex';
        currentSongSequence = [];
        songSequenceContainer.innerHTML = '';
        autoPlayBtn.disabled = true;
        restartBtn.disabled = true;
    } else {
        customSongInput.style.display = 'none';
        midiSongInput.style.display = 'none';
        if (songsData[val]) {
            currentSongSequence = [...songsData[val]];
            currentNoteIndex = 0;
            renderSongSequence();
        } else {
            currentSongSequence = [];
            songSequenceContainer.innerHTML = '';
            autoPlayBtn.disabled = true;
            restartBtn.disabled = true;
        }
    }
});

loadCustomSongBtn.addEventListener('click', () => {
    const input = customSequenceInput.value.trim();
    if (!input) return;
    
    const rawNotes = input.split(/[\s,]+/);
    const validNotes = Object.keys(keyNotesMap);
    
    const parsedSequence = [];
    rawNotes.forEach((n, i) => {
        const found = validNotes.find(v => v.toLowerCase() === n.toLowerCase());
        if (found) {
            parsedSequence.push({
                key: found,
                time: i * 0.4,
                duration: 0.3
            });
        }
    });
    
    if (parsedSequence.length > 0) {
        currentSongSequence = parsedSequence;
        currentNoteIndex = 0;
        renderSongSequence();
    } else {
        alert("Nenhuma nota válida encontrada. Use as teclas do piano (ex: Tab w e 2).");
    }
});

function checkSongProgress(playedNote) {
    if (currentSongSequence.length === 0 || currentNoteIndex >= currentSongSequence.length) return;
    
    const currentTime = currentSongSequence[currentNoteIndex].time;
    let i = currentNoteIndex;
    let foundMatchIndex = -1;
    
    // Procura na janela do acorde atual
    while (i < currentSongSequence.length && Math.abs(currentSongSequence[i].time - currentTime) < 0.05) {
        const tags = songSequenceContainer.querySelectorAll('.note-tag');
        if (tags[i] && !tags[i].classList.contains('played') && currentSongSequence[i].key.toLowerCase() === playedNote.toLowerCase()) {
            foundMatchIndex = i;
            break;
        }
        i++;
    }
    
    if (foundMatchIndex !== -1) {
        const tags = songSequenceContainer.querySelectorAll('.note-tag');
        tags[foundMatchIndex].classList.remove('active');
        tags[foundMatchIndex].classList.add('played');
        
        let allPlayed = true;
        let j = currentNoteIndex;
        while (j < currentSongSequence.length && Math.abs(currentSongSequence[j].time - currentTime) < 0.05) {
            if (!tags[j].classList.contains('played')) {
                allPlayed = false;
                break;
            }
            j++;
        }
        
        if (allPlayed) {
            currentNoteIndex = j;
            updateActiveTags();
        }
    }
}

// Lógica de importação MIDI
const midiToKeyMap = {
    60: 'Tab', 61: '1', 62: 'q', 63: '2', 64: 'w', 65: 'e', 66: '3', 67: 'r', 68: '4', 69: 't', 70: '5', 71: 'y',
    72: 'u', 73: '6', 74: 'i', 75: '7', 76: 'o', 77: 'p', 78: '8', 79: '[', 80: '9', 81: ']', 82: '0', 83: '-',
    84: 'z', 85: 's', 86: 'x', 87: 'd', 88: 'c', 89: 'v', 90: 'g', 91: 'b', 92: 'h', 93: 'n', 94: 'j', 95: 'm'
};

midiFileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) {
        midiFileName.textContent = "Nenhum arquivo...";
        return;
    }
    
    midiFileName.textContent = file.name;
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const midi = new Midi(arrayBuffer); 
        
        // ===== PASSO 1: Coletar TODAS as notas de TODAS as tracks (exceto percussão) =====
        let allNotes = [];
        let tracksUsed = 0;
        
        midi.tracks.forEach((track, index) => {
            // Ignorar tracks vazias
            if (track.notes.length === 0) return;
            
            // Ignorar canal de percussão (canal 10 no MIDI = index 9)
            if (track.channel === 9) return;
            
            tracksUsed++;
            const trackName = track.name || `Track ${index + 1}`;
            console.log(`🎵 Track incluída: "${trackName}" (${track.notes.length} notas)`);
            
            track.notes.forEach(note => {
                allNotes.push(note);
            });
        });
        
        if (allNotes.length === 0) {
            alert("Nenhuma nota válida encontrada no arquivo MIDI.");
            return;
        }
        
        console.log(`📊 Total: ${allNotes.length} notas de ${tracksUsed} tracks`);
        
        // ===== PASSO 2: Ordenar todas as notas por tempo cronológico =====
        allNotes.sort((a, b) => a.time - b.time);
        
        // ===== PASSO 3: Filtrar ghost notes (notas muito curtas) =====
        const minDuration = 0.05; // 50ms mínimo
        const filteredNotes = allNotes.filter(n => n.duration >= minDuration);
        
        // ===== PASSO 4: Transposição global de todas as notas =====
        let sumPitch = 0;
        filteredNotes.forEach(n => sumPitch += n.midi);
        const avgPitch = filteredNotes.length > 0 ? sumPitch / filteredNotes.length : 78;
        
        // Centro do nosso piano: 78 (entre 60 e 95)
        let octaveShift = 0;
        while (avgPitch + octaveShift < 70) octaveShift += 12;
        while (avgPitch + octaveShift > 85) octaveShift -= 12;
        
        // ===== PASSO 5: Construir sequência final SEM filtragem de acordes =====
        const parsedSequence = [];
        
        filteredNotes.forEach(note => {
            let midiNote = note.midi + octaveShift;
            
            // Fallback individual se ainda fora do range
            while (midiNote < 60) midiNote += 12;
            while (midiNote > 95) midiNote -= 12;
            
            if (midiToKeyMap[midiNote]) {
                parsedSequence.push({
                    key: midiToKeyMap[midiNote],
                    time: note.time,
                    duration: note.duration,
                    originalMidi: midiNote
                });
            }
        });
        
        if (parsedSequence.length > 0) {
            currentSongSequence = parsedSequence;
            currentNoteIndex = 0;
            renderSongSequence();
            console.log(`✅ ${parsedSequence.length} notas carregadas (de ${allNotes.length} originais). Transposição: ${octaveShift > 0 ? '+' : ''}${octaveShift} semitons.`);
        } else {
            alert("Nenhuma nota válida encontrada no arquivo MIDI.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao ler arquivo MIDI. Verifique se é um arquivo .mid válido.");
    }
});