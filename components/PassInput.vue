<template>
    <div class="password-input-area">
        <h2>Wprowadź hasło</h2>

        <div v-if="isBlocked" class="error-message blocked-message">
            Zbyt wiele błędnych prób. Możliwość logowania została zablokowana.
            Spróbuj ponownie później lub użyj linku z poprawnym hasłem (jeśli go masz).
        </div>

        <form v-if="!isBlocked" @submit.prevent="checkPassword">
            <div>
                <label for="password">Hasło:</label>
                <input type="password" id="password" v-model="enteredPassword" required autocomplete="current-password"
                    :disabled="isBlocked" />
            </div>
            <button type="submit" :disabled="isBlocked">Zatwierdź</button>
        </form>

        <p v-if="loginError && !isBlocked" class="error-message">{{ loginError }}</p>
        <p v-if="incorrectAttempts > 0 && !isBlocked" class="attempts-info">
            Pozostało prób: {{ maxAttempts - incorrectAttempts }}
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// --- Konfiguracja ---
// Komponent musi znać poprawne hasło, aby je sprawdzić
const correctPassword = import.meta.env.VITE_CORRECT_PASSWORD || 'fallback_password';
if (correctPassword === 'fallback_password') {
    console.warn("UWAGA (PassInput): Zmienna VITE_CORRECT_PASSWORD nie jest ustawiona.");
}
// Klucze LocalStorage dla mechanizmu blokady - zarządzane lokalnie przez ten komponent
const blockStatusKey = 'app_block_status';
const attemptsKey = 'app_incorrect_attempts';
const maxAttempts = 3;

// --- Stan lokalny komponentu ---
const enteredPassword = ref('');
const loginError = ref('');
const incorrectAttempts = ref(0);
const isBlocked = ref(false);

// --- Definicja emitowanych zdarzeń ---
// Komponent będzie emitował 'login-success' gdy hasło będzie poprawne
const emit = defineEmits(['login-success']);

// --- Funkcje pomocnicze dla Blokady (lokalne dla komponentu) ---
const saveBlockState = () => {
    localStorage.setItem(attemptsKey, incorrectAttempts.value.toString());
    if (isBlocked.value) {
        localStorage.setItem(blockStatusKey, 'true');
    } else {
        // Upewniamy się, że stary status bloku jest usunięty, jeśli nie jest już blokowany
        localStorage.removeItem(blockStatusKey);
    }
};

const loadBlockState = () => {
    const storedBlockStatus = localStorage.getItem(blockStatusKey);
    const storedAttempts = parseInt(localStorage.getItem(attemptsKey) || '0', 10);

    if (storedBlockStatus === 'true') {
        isBlocked.value = true;
    }
    // Ustaw licznik prób, ale tylko jeśli nie jest już zablokowany
    if (!isBlocked.value && storedAttempts > 0) {
        incorrectAttempts.value = storedAttempts;
    }
};

const resetBlockStateLocally = () => {
    // Resetuje tylko stan w komponencie, LocalStorage czyści rodzic (App.vue)
    // lub samo udane logowanie tutaj
    isBlocked.value = false;
    incorrectAttempts.value = 0;
    loginError.value = '';
    // Czyścimy też LocalStorage przy resecie TUTAJ, np. po udanym logowaniu
    localStorage.removeItem(blockStatusKey);
    localStorage.removeItem(attemptsKey);
};

// --- Logika Blokowania ---
const handleIncorrectAttempt = () => {
    incorrectAttempts.value++;
    const remainingAttempts = maxAttempts - incorrectAttempts.value;

    if (remainingAttempts <= 0) {
        loginError.value = `Błędne hasło. Przekroczono limit prób.`;
        isBlocked.value = true;
    } else {
        loginError.value = `Błędne hasło!`;
    }
    saveBlockState(); // Zapisz stan blokady/prób w LocalStorage
    enteredPassword.value = '';
};

// --- Główna logika komponentu ---
const checkPassword = () => {
    if (isBlocked.value) return;

    if (enteredPassword.value === correctPassword) {
        // Sukces! Zresetuj stan blokady lokalnie i wyemituj zdarzenie do rodzica
        resetBlockStateLocally(); // Resetuje stan komponentu i czyści LS dla blokady
        emit('login-success'); // Powiadom App.vue o sukcesie
        enteredPassword.value = ''; // Wyczyść pole
    } else {
        handleIncorrectAttempt(); // Błąd - obsłuż błędną próbę
    }
};

// --- Przy montowaniu wczytaj stan blokady ---
onMounted(() => {
    loadBlockState();
});
</script>

<style scoped>
/* Tutaj możesz dodać style specyficzne dla tego komponentu */
.password-input-area {
    /* Przykładowe style */
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
    font-weight: bold;
}

.blocked-message {
    margin-bottom: 15px;
}

.attempts-info {
    color: #555;
    font-size: 0.9em;
    text-align: center;
    margin-top: 8px;
}

form div {
    margin-bottom: 10px;
}

label {
    margin-right: 5px;
}

input[type="password"] {
    padding: 5px;
}

button {
    padding: 6px 12px;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

input:disabled {
    background-color: #eee;
    cursor: not-allowed;
}
</style>