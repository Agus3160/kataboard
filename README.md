# Kataboard (Kanban + Pomodoro Extension)

Kataboard is a **Chromium browser extension** that combines a **simple Kanban board** with full **drag-and-drop support** (for both tasks and columns) and an integrated **Pomodoro timer** that uses the **Chrome Alarms API** to send notifications even while the extension runs in the background.

Designed to be lightweight, fast, and fully local (no backend required).

![banner](https://private-user-images.githubusercontent.com/115951412/523378458-6e3684b2-fbcf-4d1a-be17-d7d0fc0c7a91.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjUwNTg4OTUsIm5iZiI6MTc2NTA1ODU5NSwicGF0aCI6Ii8xMTU5NTE0MTIvNTIzMzc4NDU4LTZlMzY4NGIyLWZiY2YtNGQxYS1iZTE3LWQ3ZDBmYzBjN2E5MS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjA2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIwNlQyMjAzMTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hYjU5MWZiYTVmMmY2OGIxNjY5ZDQ4ZjZjOWJkM2RlYTY0MGEwMTRkN2ZmOWQ4ZDJkMGE3ZTE1YTY2MzY2NDRiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.8JajbrjQQm2WAX3yJtfAwaawP1GLxxg9zfYmNtT4_Vc)

## 🚀 Features

### 🗂️ Kanban Board

* Create, edit, and delete tasks
* Create and reorganize columns
* State persisted in Chrome local storage

### ⏱️ Pomodoro Timer

* Customizable cycles (pomodoro, break, focus)
* Notifications using `chrome.alarms`

### ⚡ Tech Stack

* **React + Vite**
* **Tailwind CSS**
* **DnD Kit**
* **Lucide React**
* **Manifest v3**

## 📦 Installation (Development Mode)

```bash
git clone https://github.com/Agus3160/kataboard.git
cd your-repo
pnpm install
pnpm run build
```

Then load the extension from `chrome://extensions/` using **Load unpacked** and selecting the `dist/` folder.

## 📜 License

MIT License.