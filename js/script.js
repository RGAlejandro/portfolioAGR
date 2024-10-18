document.addEventListener('DOMContentLoaded', function () {
    const windowElement = document.getElementById('main-window');
    const windowHeader = document.getElementById('window-header');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const maximizeBtn = document.querySelector('.maximize-btn');
    const closeBtn = document.querySelector('.close-btn');
    const taskbarWindows = document.getElementById('taskbar-windows');
    const desktopIcons = document.querySelectorAll('.desktop-icon');

    let isMaximized = false;
    let prevSize = { width: windowElement.style.width, height: windowElement.style.height };
    let prevPosition = { top: windowElement.style.top, left: windowElement.style.left };

    // Variables para arrastrar la ventana
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Abrir la ventana al hacer doble clic en el ícono del escritorio
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            windowElement.style.display = 'block';
        });
    });

    // Minimizar la ventana
    minimizeBtn.addEventListener('click', function () {
        windowElement.style.display = 'none';
        let minimizedWindow = document.createElement('div');
        minimizedWindow.classList.add('minimized-window');
        minimizedWindow.innerHTML = '<img src="assets/icons/w95icon.svg" width="16px" height="16px"> My Showcase';
        minimizedWindow.addEventListener('click', function () {
            windowElement.style.display = 'block';
            minimizedWindow.remove();
        });
        taskbarWindows.appendChild(minimizedWindow);
    });

    // Maximizar o restaurar la ventana
    maximizeBtn.addEventListener('click', function () {
        if (!isMaximized) {
            prevSize = { width: windowElement.style.width, height: windowElement.style.height };
            prevPosition = { top: windowElement.style.top, left: windowElement.style.left };

            windowElement.style.width = '100%';
            windowElement.style.height = '100vh';
            windowElement.style.top = '0';
            windowElement.style.left = '0';
            isMaximized = true;
        } else {
            windowElement.style.width = prevSize.width;
            windowElement.style.height = prevSize.height;
            windowElement.style.top = prevPosition.top;
            windowElement.style.left = prevPosition.left;
            isMaximized = false;
        }
    });

    // Cerrar la ventana
    closeBtn.addEventListener('click', function () {
        windowElement.style.display = 'none';
    });

    // Funcionalidad para arrastrar la ventana
    windowHeader.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging && !isMaximized) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
});
