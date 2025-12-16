# React Vite Boilerplate

This is a clean boilerplate built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. It is designed to be a starting point for building modern web applications with a pre-configured dashboard layout.

## 🚀 Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start development server:**

    ```bash
    npm run dev
    ```

    The app will start on `http://localhost:5173`.

3.  **Build for production:**

    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── AppLayout.tsx     # Main application shell with Sidebar
│   ├── Dashboard.tsx     # Example dashboard page
│   └── Sidebar.tsx       # Navigation sidebar
├── lib/
│   └── utils.ts          # Utility functions (cn, etc.)
├── App.tsx               # Main application entry & routing
├── index.css             # Global styles & Tailwind configuration
└── main.tsx              # React DOM entry point
```

## 🎨 Design System

-   **Framework**: React 18 + TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **UI Library**: shadcn/ui components (Radix UI based)
-   **Icons**: Lucide React
-   **Font**: Plus Jakarta Sans (configurable in `index.css`)

## 🛠 Customization

-   **Theme**: Edit `src/index.css` to change CSS variables for colors, radius, etc.
-   **Layout**: Modify `src/components/AppLayout.tsx` and `src/components/Sidebar.tsx` to adjust the shell.
-   **Components**: Add new shadcn/ui components using the CLI or by copying them to `src/components/ui`.

## License

MIT
