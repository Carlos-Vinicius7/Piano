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
    '6': () => handleMousedown(keys[12]),
    'u': () => handleMousedown(keys[13]),
    'i': () => handleMousedown(keys[14]),
    '7': () => handleMousedown(keys[15]),
    'o': () => handleMousedown(keys[16]),
    '8': () => handleMousedown(keys[17]),
    'p': () => handleMousedown(keys[18]),
    '9': () => handleMousedown(keys[19]),
    '[': () => handleMousedown(keys[20]),
    '0': () => handleMousedown(keys[21]),
    ']': () => handleMousedown(keys[22]),
    '-': () => handleMousedown(keys[23])
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
    '-': () => handleMouseup(keys[23])
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