# Architekturplanung – Atemglanz Pura App

## 1. Ziel der App

Wichtig:
- Der Luftreiniger sendet aktuell noch keine echten Gerätedaten
- Luftreiniger-Daten werden deshalb simuliert
- Die App nutzt mobilen Kontext wie Uhrzeit und optional Standort

---

## 2. Komponenten

### Layout-Komponenten
- `ScreenContainer`
    - einheitlicher Seitenaufbau
    - Safe Area, Padding, Scroll-Verhalten
- `AppHeader`
    - Titel des Screens
    - optional Untertitel oder Status
- `SectionHeader`
    - Abschnittstitel innerhalb eines Screens

### Basis-Komponenten
- `Card`
    - allgemeiner Container für Inhalte
- `InfoRow`
    - Darstellung von Label + Wert
- `StatusBadge`
    - Statusanzeige wie „Gut“, „Mittel“, „Belastet“
- `PrimaryButton`
    - primäre Aktion
- `SegmentedControl`
    - Modusauswahl wie Auto / Sleep / Boost
- `DemoNotice`
    - Hinweis auf Demo-Modus / simulierte Daten
- `ProgressBar`
    - z. B. für Filterstatus
- `InsightCard`
    - Empfehlung oder Hinweis mit Icon und Kurztext
- `StatTile`
    - kompakte Kachel für einzelne Werte wie PM2.5, Temperatur, Luftfeuchtigkeit
- `ChartCard`
    - Container für Verlauf oder einfache Graphen

### Navigations-Komponenten
- `BottomTabBar`
    - primäre Navigation zwischen Hauptbereichen

---

## 3. Navigation

## Primäres Navigationsschema
Für die MVP-App wird eine **Bottom-Tab-Navigation** als primäres Navigationsmuster verwendet.

---

## 4. Navigationshierarchie

### Hauptnavigation (Bottom Tabs)
1. `HomeScreen`
2. `ValuesScreen`
3. `InsightsScreen`
4. `HistoryScreen`
5. `SettingsScreen`

### Hierarchieübersicht

```text
App
└── BottomTabs
    ├── HomeScreen
    ├── ValuesScreen
    ├── InsightsScreen
    ├── HistoryScreen
    └── SettingsScreen