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

const playNote = (note) => {
    const audio = audioCache[note];
    if (audio) {
        audio.currentTime = 0; // Reseta o som para permitir notas rápidas seguidas
        audio.play().catch(e => console.log("Erro ao reproduzir:", e));
    }
}

const handleMousedown = (key) => {
    playNote(key.getAttribute('data-notes'));

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
    'Tab': () => handleMousedown(keys[0]),
    '1': () => handleMousedown(keys[1]),
    'q': () => handleMousedown(keys[2]),
    '2': () => handleMousedown(keys[3]),
    'w': () => handleMousedown(keys[4]),
    'e': () => handleMousedown(keys[5]),
    '3': () => handleMousedown(keys[6]),
    'r': () => handleMousedown(keys[7]),
    '4': () => handleMousedown(keys[8]),
    't': () => handleMousedown(keys[9]),
    '5': () => handleMousedown(keys[10]),
    'y': () => handleMousedown(keys[11]),
    'u': () => handleMousedown(keys[12]),
    '6': () => handleMousedown(keys[13]),
    'i': () => handleMousedown(keys[14]),
    '7': () => handleMousedown(keys[15]),
    'o': () => handleMousedown(keys[16]),
    'p': () => handleMousedown(keys[17]),
    '8': () => handleMousedown(keys[18]),
    '[': () => handleMousedown(keys[19]),
    '9': () => handleMousedown(keys[20]),
    ']': () => handleMousedown(keys[21]),
    '0': () => handleMousedown(keys[22]),
    '-': () => handleMousedown(keys[23]),
    'z': () => handleMousedown(keys[24]),
    's': () => handleMousedown(keys[25]),
    'x': () => handleMousedown(keys[26]),
    'd': () => handleMousedown(keys[27]),
    'c': () => handleMousedown(keys[28]),
    'v': () => handleMousedown(keys[29]),
    'g': () => handleMousedown(keys[30]),
    'b': () => handleMousedown(keys[31]),
    'h': () => handleMousedown(keys[32]),
    'n': () => handleMousedown(keys[33]),
    'j': () => handleMousedown(keys[34]),
    'm': () => handleMousedown(keys[35])
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
function mapSimpleSequence(seq, interval = 0.4) {
    return seq.map((key, i) => ({
        key: key,
        time: i * interval,
        duration: interval * 0.8
    }));
}

const songsData = {
    'brilha': mapSimpleSequence(['Tab', 'Tab', 'w', 'w', 'e', 'e', 'w', '2', '2', 'q', 'q', '1', '1', 'Tab']),
    'parabens': mapSimpleSequence(['Tab', 'Tab', '1', 'Tab', 'w', 'q', 'Tab', 'Tab', '1', 'Tab', 'e', 'w'])
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
let autoPlayInterval = null;

const renderSongSequence = () => {
    songSequenceContainer.innerHTML = '';
    currentSongSequence.forEach((note, index) => {
        const span = document.createElement('div');
        span.classList.add('note-tag');
        if (index === 0) span.classList.add('active');
        
        let displayNote = note.key;
        if (displayNote.toLowerCase() === 'tab') displayNote = 'TAB';
        span.textContent = displayNote;
        
        songSequenceContainer.appendChild(span);
    });

    if (currentSongSequence.length > 0) {
        autoPlayBtn.disabled = false;
    } else {
        autoPlayBtn.disabled = true;
    }
};

autoPlayBtn.addEventListener('click', () => {
    if (autoPlayInterval) {
        cancelAnimationFrame(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayBtn.innerHTML = '▶ Auto Play';
    } else {
        autoPlayBtn.innerHTML = '⏸ Pausar';
        
        let startTime = performance.now() - (currentSongSequence[currentNoteIndex].time * 1000);
        
        const loop = () => {
            if (currentNoteIndex >= currentSongSequence.length) {
                autoPlayInterval = null;
                autoPlayBtn.innerHTML = '▶ Auto Play';
                return;
            }
            
            const now = performance.now();
            const elapsed = (now - startTime) / 1000;
            const noteObj = currentSongSequence[currentNoteIndex];
            
            if (elapsed >= noteObj.time) {
                const noteChar = noteObj.key;
                let mapKey = noteChar;
                if(mapKey.toLowerCase() === 'tab') mapKey = 'Tab';
                
                const keyFunc = keyNotesMap[mapKey];
                if (keyFunc) {
                    keyFunc();
                    
                    setTimeout(() => {
                        const keyUpFunc = keyNotesMap2[mapKey];
                        if(keyUpFunc) keyUpFunc();
                    }, Math.min(noteObj.duration * 1000, 500));
                } else {
                    currentNoteIndex++;
                }
                
                autoPlayInterval = requestAnimationFrame(loop);
            } else {
                autoPlayInterval = requestAnimationFrame(loop);
            }
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
    } else if (val === 'midi') {
        customSongInput.style.display = 'none';
        midiSongInput.style.display = 'flex';
        currentSongSequence = [];
        songSequenceContainer.innerHTML = '';
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
    
    const expectedNote = currentSongSequence[currentNoteIndex].key;
    if (playedNote.toLowerCase() === expectedNote.toLowerCase()) {
        const tags = songSequenceContainer.querySelectorAll('.note-tag');
        if (tags[currentNoteIndex]) {
            tags[currentNoteIndex].classList.remove('active');
            tags[currentNoteIndex].classList.add('played');
        }
        
        currentNoteIndex++;
        
        if (tags[currentNoteIndex]) {
            const nextTag = tags[currentNoteIndex];
            nextTag.classList.add('active');
            
            // Auto scroll to center the active tag
            const containerCenter = songSequenceContainer.clientWidth / 2;
            const tagCenter = nextTag.offsetLeft + (nextTag.clientWidth / 2);
            songSequenceContainer.scrollTo({
                left: tagCenter - containerCenter - songSequenceContainer.offsetLeft,
                behavior: 'smooth'
            });
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
        
        // ===== PASSO 5: Construir sequência final com filtragem de acordes =====
        const parsedSequence = [];
        let lastTime = -1;
        const chordThreshold = 0.05; // Notas dentro de 50ms = acorde
        
        filteredNotes.forEach(note => {
            let midiNote = note.midi + octaveShift;
            
            // Fallback individual se ainda fora do range
            while (midiNote < 60) midiNote += 12;
            while (midiNote > 95) midiNote -= 12;
            
            if (midiToKeyMap[midiNote]) {
                if (parsedSequence.length > 0 && Math.abs(note.time - lastTime) < chordThreshold) {
                    // Acorde: manter a nota mais aguda (melodia)
                    const lastNoteObj = parsedSequence[parsedSequence.length - 1];
                    if (midiNote > lastNoteObj.originalMidi) {
                        lastNoteObj.key = midiToKeyMap[midiNote];
                        lastNoteObj.originalMidi = midiNote;
                        lastNoteObj.duration = Math.max(lastNoteObj.duration, note.duration);
                    }
                } else {
                    parsedSequence.push({
                        key: midiToKeyMap[midiNote],
                        time: note.time,
                        duration: note.duration,
                        originalMidi: midiNote
                    });
                    lastTime = note.time;
                }
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