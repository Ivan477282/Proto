// Состояние приложения
let currentTab = 'home';
let currentSettingsTab = 'personal';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMainNavigation();
    setupSettingsNavigation();
    setupToggleSwitches();
    setupEditButtons();
    setupDepositForm();
    console.log('Мобильное банковское приложение инициализировано');
}

// Основная навигация между вкладками
function setupMainNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchMainTab(targetTab);
        });
    });
}

function switchMainTab(tabName) {
    // Убираем активное состояние у всех кнопок навигации
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Скрываем все содержимое вкладок
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Активируем выбранную вкладку
    const activeNavBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeTabContent = document.getElementById(`${tabName}-tab`);
    
    if (activeNavBtn && activeTabContent) {
        activeNavBtn.classList.add('active');
        activeTabContent.classList.add('active');
        currentTab = tabName;
        
        console.log(`Переключено на вкладку: ${tabName}`);
    }
}

// ИСПРАВЛЕННАЯ навигация по вкладкам настроек
function setupSettingsNavigation() {
    const settingsTabButtons = document.querySelectorAll('.settings-tab-btn');
    const settingsTabContents = document.querySelectorAll('.settings-tab-content');
    
    settingsTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchSettingsTab(targetTab);
        });
    });
}

// КЛЮЧЕВАЯ ФУНКЦИЯ: Правильное переключение вкладок настроек
function switchSettingsTab(tabName) {
    // Убираем активное состояние у всех кнопок вкладок настроек
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // ВАЖНО: Скрываем ВСЕ содержимое вкладок настроек
    document.querySelectorAll('.settings-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Активируем выбранную вкладку настроек
    const activeSettingsBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeSettingsContent = document.getElementById(`${tabName}-settings`);
    
    if (activeSettingsBtn && activeSettingsContent) {
        // Добавляем активный класс с небольшой задержкой для плавной анимации
        setTimeout(() => {
            activeSettingsBtn.classList.add('active');
            activeSettingsContent.classList.add('active');
        }, 50);
        
        currentSettingsTab = tabName;
        
        console.log(`Переключено на вкладку настроек: ${tabName}`);
    }
}

// Настройка переключателей
function setupToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.id;
            const isEnabled = this.checked;
            
            handleToggleChange(setting, isEnabled);
        });
    });
}

function handleToggleChange(setting, isEnabled) {
    const settingNames = {
        'biometric': 'Биометрическая авторизация',
        'sms-notifications': 'SMS-уведомления',
        'push-notifications': 'Push-уведомления'
    };
    
    const settingName = settingNames[setting] || setting;
    const status = isEnabled ? 'включена' : 'выключена';
    
    console.log(`${settingName} ${status}`);
    
    // Здесь можно добавить логику сохранения настроек
    // Например, отправка на сервер или сохранение в localStorage
    saveSettingToStorage(setting, isEnabled);
}

// Сохранение настроек в локальное хранилище
function saveSettingToStorage(setting, value) {
    try {
        const settings = JSON.parse(localStorage.getItem('bankAppSettings') || '{}');
        settings[setting] = value;
        localStorage.setItem('bankAppSettings', JSON.stringify(settings));
        
        console.log(`Настройка ${setting} сохранена:`, value);
    } catch (error) {
        console.error('Ошибка сохранения настройки:', error);
    }
}

// Загрузка настроек из локального хранилища
function loadSettingsFromStorage() {
    try {
        const settings = JSON.parse(localStorage.getItem('bankAppSettings') || '{}');
        
        Object.keys(settings).forEach(setting => {
            const toggle = document.getElementById(setting);
            if (toggle && typeof settings[setting] === 'boolean') {
                toggle.checked = settings[setting];
            }
        });
        
        console.log('Настройки загружены из хранилища');
    } catch (error) {
        console.error('Ошибка загрузки настроек:', error);
    }
}

// Настройка кнопок редактирования
function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const changeButtons = document.querySelectorAll('.change-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input) {
                handleEditField(input, this);
            }
        });
    });
    
    changeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const field = this.parentElement.querySelector('label').textContent;
            handleChangeField(field);
        });
    });
}

function handleEditField(input, button) {
    if (input.readOnly) {
        input.readOnly = false;
        input.focus();
        button.textContent = 'Сохранить';
        input.style.backgroundColor = 'white';
    } else {
        input.readOnly = true;
        button.textContent = 'Изменить';
        input.style.backgroundColor = '#f5f7fa';
        
        // Здесь можно добавить логику сохранения изменений
        console.log(`Поле обновлено: ${input.value}`);
        showNotification('Данные успешно обновлены');
    }
}

function handleChangeField(fieldName) {
    console.log(`Запрос на изменение: ${fieldName}`);
    
    if (fieldName === 'PIN-код') {
        showPinChangeDialog();
    }
}

function showPinChangeDialog() {
    // Простая имитация диалога смены PIN-кода
    const newPin = prompt('Введите новый PIN-код (4 цифры):');
    
    if (newPin && newPin.length === 4 && /^\d+$/.test(newPin)) {
        console.log('PIN-код изменен');
        showNotification('PIN-код успешно изменен');
    } else if (newPin !== null) {
        alert('PIN-код должен содержать ровно 4 цифры');
    }
}

// Система уведомлений
function showNotification(message, type = 'success') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    `;
    
    // Добавляем CSS анимацию
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Обработка действий на главной странице
document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn')) {
        const actionBtn = e.target.closest('.action-btn');
        const actionText = actionBtn.querySelector('span').textContent;
        
        console.log(`Выполнено действие: ${actionText}`);
        showNotification(`Функция "${actionText}" будет доступна в следующих версиях`);
    }
    
    if (e.target.closest('.payment-category')) {
        const category = e.target.closest('.payment-category');
        const categoryText = category.querySelector('span').textContent;
        
        console.log(`Выбрана категория платежа: ${categoryText}`);
        showNotification(`Открываем раздел "${categoryText}"`);
    }
});

// Загрузка настроек при запуске
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadSettingsFromStorage, 100);
});

// Обработка изменений в выпадающих списках настроек
document.addEventListener('change', function(e) {
    if (e.target.tagName === 'SELECT' && e.target.closest('.settings-tab-content')) {
        const setting = e.target.parentElement.querySelector('label').textContent;
        const value = e.target.value;
        
        console.log(`Настройка "${setting}" изменена на: ${value}`);
        showNotification(`Настройка "${setting}" обновлена`);
        
        // Сохраняем в localStorage
        saveSettingToStorage(setting.toLowerCase().replace(/\s+/g, '_'), value);
    }
});

// Утилиты для отладки
window.debugApp = {
    getCurrentTab: () => currentTab,
    getCurrentSettingsTab: () => currentSettingsTab,
    switchTab: switchMainTab,
    switchSettingsTab: switchSettingsTab,
    showNotification: showNotification
};

// Настройка формы пополнения
function setupDepositForm() {
    const amountInput = document.getElementById('deposit-amount');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const depositMethodSelect = document.getElementById('deposit-method');
    const cardDetails = document.getElementById('card-details');
    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvvInput = document.getElementById('card-cvv');
    const depositSubmitBtn = document.getElementById('deposit-submit');
    // Обработка кнопок быстрого выбора суммы
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            
            // Убираем выделение со всех кнопок
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Выделяем выбранную кнопку
            this.classList.add('selected');
            
            // Устанавливаем значение в поле ввода
            amountInput.value = amount;
            
            console.log(`Выбрана сумма: ${amount} ₽`);
        });
    });
    // Обработка ввода суммы вручную
    amountInput.addEventListener('input', function() {
        // Убираем выделение с кнопок при ручном вводе
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Форматируем число с разделителями тысяч
        let value = this.value.replace(/\D/g, '');
        if (value) {
            this.value = parseInt(value, 10);
        }
    });
    // Управление отображением деталей карты
    depositMethodSelect.addEventListener('change', function() {
        const selectedMethod = this.value;
        
        if (selectedMethod === 'card') {
            cardDetails.classList.remove('hide');
        } else {
            cardDetails.classList.add('hide');
        }
        
        console.log(`Выбран способ пополнения: ${this.options[this.selectedIndex].text}`);
    });
    // Форматирование номера карты
    cardNumberInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        
        if (formattedValue.length <= 19) {
            this.value = formattedValue;
        }
    });
    // Форматирование срока действия карты
    cardExpiryInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        this.value = value;
    });
    // Ограничение ввода CVV только цифрами
    cardCvvInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
    // Обработка отправки формы
    depositSubmitBtn.addEventListener('click', function() {
        handleDepositSubmit();
    });
}
// Обработка отправки формы пополнения
function handleDepositSubmit() {
    const amount = document.getElementById('deposit-amount').value;
    const method = document.getElementById('deposit-method').value;
    const methodText = document.getElementById('deposit-method').options[document.getElementById('deposit-method').selectedIndex].text;
    
    // Базовая валидация
    if (!amount || parseFloat(amount) <= 0) {
        showNotification('Пожалуйста, укажите сумму пополнения', 'error');
        return;
    }
    if (parseFloat(amount) < 100) {
        showNotification('Минимальная сумма пополнения: 100 ₽', 'error');
        return;
    }
    if (parseFloat(amount) > 1000000) {
        showNotification('Максимальная сумма пополнения: 1 000 000 ₽', 'error');
        return;
    }
    // Валидация данных карты, если выбран способ "карта"
    if (method === 'card') {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        if (!cardNumber || cardNumber.length !== 16) {
            showNotification('Введите корректный номер карты', 'error');
            return;
        }
        if (!cardExpiry || cardExpiry.length !== 5) {
            showNotification('Введите срок действия карты в формате ММ/ГГ', 'error');
            return;
        }
        if (!cardCvv || cardCvv.length !== 3) {
            showNotification('Введите корректный CVV код', 'error');
            return;
        }
    }
    // Имитация отправки запроса
    depositSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
    depositSubmitBtn.disabled = true;
    setTimeout(() => {
        // Имитация успешного пополнения
        const formattedAmount = new Intl.NumberFormat('ru-RU').format(amount);
        showNotification(`Счет успешно пополнен на ${formattedAmount} ₽`);
        
        // Обновляем баланс на главной странице
        updateBalance(parseFloat(amount));
        
        // Добавляем запись в историю
        addDepositToHistory(amount, methodText);
        
        // Очищаем форму
        resetDepositForm();
        
        // Восстанавливаем кнопку
        depositSubmitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Пополнить счет';
        depositSubmitBtn.disabled = false;
        
        console.log(`Пополнение выполнено: ${formattedAmount} ₽ через ${methodText}`);
    }, 2000);
}
// Обновление баланса на главной странице
function updateBalance(depositAmount) {
    const balanceElement = document.querySelector('.balance-amount');
    if (balanceElement) {
        // Парсим текущий баланс
        const currentBalanceText = balanceElement.textContent.replace(/[^\d,]/g, '').replace(',', '.');
        const currentBalance = parseFloat(currentBalanceText) || 125430.50;
        
        // Добавляем сумму пополнения
        const newBalance = currentBalance + depositAmount;
        
        // Обновляем отображение
        balanceElement.textContent = new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(newBalance) + ' ₽';
    }
}
// Добавление записи в историю пополнений
function addDepositToHistory(amount, method) {
    const historyContainer = document.querySelector('.deposit-history');
    if (!historyContainer) return;
    const formattedAmount = new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    // Определяем иконку в зависимости от способа
    let iconClass = 'fas fa-credit-card';
    if (method.includes('перевод')) iconClass = 'fas fa-university';
    if (method.includes('Мобильный')) iconClass = 'fas fa-mobile-alt';
    if (method.includes('банкомат')) iconClass = 'fas fa-money-bill-wave';
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <div class="history-icon">
            <i class="${iconClass}"></i>
        </div>
        <div class="history-details">
            <div class="history-title">Пополнение</div>
            <div class="history-date">Сегодня, ${timeString}</div>
            <div class="history-method">${method}</div>
        </div>
        <div class="history-amount positive">+${formattedAmount} ₽</div>
    `;
    // Добавляем новую запись в начало списка
    const firstHistoryItem = historyContainer.querySelector('.history-item');
    if (firstHistoryItem) {
        historyContainer.insertBefore(historyItem, firstHistoryItem);
    } else {
        historyContainer.appendChild(historyItem);
    }
    // Анимация появления
    historyItem.style.opacity = '0';
    historyItem.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        historyItem.style.transition = 'all 0.3s ease';
        historyItem.style.opacity = '1';
        historyItem.style.transform = 'translateY(0)';
    }, 100);
}
// Сброс формы пополнения
function resetDepositForm() {
    document.getElementById('deposit-amount').value = '';
    document.getElementById('deposit-method').value = 'card';
    document.getElementById('card-number').value = '';
    document.getElementById('card-expiry').value = '';
    document.getElementById('card-cvv').value = '';
    
    // Убираем выделение с кнопок сумм
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
        // Показываем детали карты (так как по умолчанию выбрана карта)
    document.getElementById('card-details').classList.remove('hide');
}


console.log('Мобильное банковское приложение загружено успешно');
console.log('Доступные команды отладки: window.debugApp');
