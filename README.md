# 🗓️ Meeting Reservation App

Aplikacja webowa do zarządzania rezerwacjami spotkań. Projekt zrealizowany w technologii **React + TypeScript** z backendem opartym o **JSON Server**.

---

## 🎯 Cel projektu

Celem było stworzenie pełnej aplikacji do:

- tworzenia i zarządzania rezerwacjami spotkań,
- autoryzacji użytkowników,
- różnicowania uprawnień (administrator / użytkownik),
- wizualizacji rezerwacji w kalendarzu.

Projekt realizowany w ramach zaliczenia na kierunku **Informatyka – Framework React**.

---

## ✨ Funkcje

### 👥 Rejestracja i logowanie

- Walidacja danych przy użyciu `React Hook Form` i `Zod`
- Przechowywanie sesji w `localStorage`
- Logowanie po e-mailu i haśle

### 🔐 Role i autoryzacja

- `admin`: dostęp do wszystkich spotkań i użytkowników
- `user`: dostęp tylko do własnych rezerwacji
- Ochrona tras przy użyciu komponentu `RequireAuth`

### 📅 Rezerwacje spotkań

- Tworzenie spotkania z datą, godziną, tytułem, opisem i uczestnikami
- Edycja i anulowanie spotkania
- Filtrowanie po tytule, dacie i statusie
- Sortowanie po dacie i czasie utworzenia

### 📆 Widok kalendarza

- Implementacja `FullCalendar`
- Pokazuje zaplanowane (nieanulowane) spotkania
- Responsywny i przejrzysty układ

### 🧑‍💼 Panel administratora

- Lista wszystkich użytkowników
- Usuwanie konta
- Zmiana roli `user/admin` w locie

---

## 🛠️ Technologie

- **React 18 + TypeScript**
- **Tailwind CSS** – stylowanie
- **React Hook Form + Zod** – formularze i walidacja
- **FullCalendar** – kalendarz
- **JSON Server** – backend lokalny
- **React Router v6** – routing

---

## ⚙️ Uruchomienie aplikacji

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

### 1. Backend (JSON Server)

```bash
cd backend
npm install -g json-server
json-server --watch db.json --port 5000
```

---

## 🧪 Konta testowe

````admin
Email: admin@admin.com
Hasło: admin123

```user
Email: user1@user.com
Hasło: user123
````

---

## 📌 Autorzy

Projekt zaliczeniowy z React
Dominik Pazurek, Marcin Grabania
Specjalność: Frontend Development
