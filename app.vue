<template>
  <div v-if="checkingAuth" class="loading-state">
    <p>Sprawdzanie statusu uwierzytelnienia...</p>
  </div>

  <div v-else class="">
    <PassInput v-if="!isAuthenticated" @login-success="handleLoginSuccess" />
    <NuxtLayout v-else @logout="handleLogout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PassInput from './components/PassInput.vue';

// --- Konfiguracja (potrzebna w App.vue do początkowej weryfikacji) ---
const correctPassword = import.meta.env.VITE_CORRECT_PASSWORD || 'fallback_password';
if (correctPassword === 'fallback_password') {
  console.warn("UWAGA (App.vue): Zmienna VITE_CORRECT_PASSWORD nie jest ustawiona.");
}
const urlParamName = 'pwd';
const authStatusKey = 'app_auth_status_ls'; // Klucz statusu logowania w LS
// Klucze blokady - potrzebne tutaj do ewentualnego wyczyszczenia przy logowaniu przez URL/LS
const blockStatusKey = 'app_block_status';
const attemptsKey = 'app_incorrect_attempts';

// --- Stan Aplikacji ---
const isAuthenticated = ref(false); // Główny stan decydujący co pokazać
const checkingAuth = ref(true); // Czy trwa początkowe sprawdzanie?

// --- Funkcje Pomocnicze (w App.vue) ---

// Czyści stan blokady w LocalStorage (wywoływane po udanym logowaniu przez URL/LS)
const clearBlockStatusInStorage = () => {
  localStorage.removeItem(blockStatusKey);
  localStorage.removeItem(attemptsKey);
  console.log("(App.vue) Wyczyścił stan blokady w LocalStorage.");
};

// Ustawia stan jako zalogowany, zapisuje status w LS i czyści blokadę
const setAuthenticated = () => {
  isAuthenticated.value = true;
  localStorage.setItem(authStatusKey, 'true'); // Zapisz status 'true'
  clearBlockStatusInStorage(); // Udane logowanie czyści blokadę
  console.log("(App.vue) Użytkownik uwierzytelniony.");
};

// Ustawia stan jako wylogowany i czyści status w LS
const setLoggedOut = () => {
  isAuthenticated.value = false;
  localStorage.removeItem(authStatusKey); // Usuń status logowania
  // Nie czyścimy blokady przy wylogowaniu
  console.log("(App.vue) Użytkownik wylogowany.");
};


// --- Obsługa Zdarzeń od Komponentów Potomnych ---

// Wywoływane, gdy PassInput.vue wyemituje 'login-success'
const handleLoginSuccess = () => {
  console.log("(App.vue) Otrzymano login-success z PassInput.");
  setAuthenticated();
};

// Wywoływane, gdy ContentPage.vue wyemituje 'logout'
const handleLogout = () => {
  console.log("(App.vue) Otrzymano logout z ContentPage.");
  setLoggedOut();
};

// --- Logika Uruchamiana Przy Starcie Aplikacji ---
onMounted(() => {
  console.log("(App.vue) Rozpoczynanie sprawdzania onMounted...");
  let authenticatedInitially = false;

  // 1. Sprawdź parametr URL
  const urlParams = new URLSearchParams(window.location.search);
  const passwordFromUrl = urlParams.get(urlParamName);

  if (passwordFromUrl) {
    console.log("(App.vue) Znaleziono parametr URL.");
    const newUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, newUrl); // Usuń parametr

    if (passwordFromUrl === correctPassword) {
      console.log("(App.vue) Hasło z URL poprawne.");
      setAuthenticated(); // Uwierzytelnij (to też zapisze status w LS i wyczyści blokadę)
      authenticatedInitially = true;
    } else {
      console.warn("(App.vue) Hasło z URL niepoprawne.");
      // Nie robimy nic więcej, nie pokazujemy błędu tutaj, PassInput to obsłuży
    }
  }

  // 2. Sprawdź LocalStorage dla statusu logowania (jeśli nie przez URL)
  if (!authenticatedInitially) {
    console.log("(App.vue) Sprawdzanie LocalStorage dla statusu logowania...");
    const storedAuth = localStorage.getItem(authStatusKey);
    if (storedAuth === 'true') {
      console.log("(App.vue) Znaleziono poprawny status logowania w LocalStorage.");
      setAuthenticated(); // Uwierzytelnij (to też wyczyści blokadę)
      authenticatedInitially = true;
    } else {
      console.log("(App.vue) Brak poprawnego statusu logowania w LocalStorage.");
    }
  }

  // 3. Zakończ sprawdzanie
  console.log("(App.vue) Zakończono sprawdzanie onMounted.");
  checkingAuth.value = false;
});

</script>

<style>
html {
  @apply text-gray-700;
  overflow-y: scroll;
}
</style>