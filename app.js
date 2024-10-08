const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let currentColor = '#000000';  // Цвет по умолчанию - черный
let eraserEnabled = false;     // Флаг для режима ластика

// Начать рисование
function startPosition(e) {
    painting = true;
    draw(e);
}

// Закончить рисование
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// Рисовать
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = eraserEnabled ? 'white' : currentColor;  // Если активирован ластик, цвет становится белым
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Слушаем события мыши
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Меняем цвет рисования при выборе в color picker
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
    eraserEnabled = false;  // Отключаем режим ластика при выборе цвета
});

// Включаем режим ластика
const eraserButton = document.getElementById('eraser');
eraserButton.addEventListener('click', () => {
    eraserEnabled = true;
});

// Очистка всего холста
const clearButton
