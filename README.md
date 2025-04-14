# Theme Camp Hub - pcb-app

## 1. Overview & Purpose

Theme Camp Hub is a web application designed to streamline the organization, communication, and logistics for Burning Man theme camps. The goal is to provide a central, user-friendly platform for camp members to manage essential information, reducing the reliance on scattered spreadsheets, documents, and chat threads.

This initial version (v1.0) represents the Minimum Viable Product (MVP) focused solely on the **frontend user interface and experience**. It utilizes mock data and local browser state management to demonstrate core features without backend integration.

## 2. Features (MVP v1.0 - Frontend Only)

- **Camp Context:** The UI operates within the context of a single, hardcoded mock camp.
- **User Profile:**
  - View and edit personal details (Legal Name, Playa Name, Contact).
  - View and edit travel itinerary information (Arrival/Departure, Mode of Transport, Origin, Pass/Ride Status).
  - View and edit accommodation details (Type, Size, Power Needs).
  - Form validation using Zod.
- **Camp Roster:**
  - View a table of mock camp members.
  - Display key info: Playa Name, Real Name, Role, Arrival/Departure, Accommodation Type.
  - Placeholder actions for inviting, editing roles, and removing members.
- **Announcements:**
  - View a list of mock camp announcements.
  - View individual announcement details.
  - Create new announcements (saved to local mock state).
- **Lists (Shopping, Tasks, etc.):**
  - View an overview of different mock lists.
  - Create new lists (saved to local mock state).
  - View items within a specific list.
  - Add new items to a list (saved to local mock state).
  - Mark list items as complete.
- **Dashboard:**
  - Displays widgets for Recent Announcements and Assigned Tasks (using mock data).
- **Settings:**
  - Mock UI for configuring AI features (Provider selection, API Key input with security warning).
- **AI Feature Placeholders:**
  - "Draft with AI" / "Suggest Items" buttons integrated into relevant forms (Announcements, Lists) with placeholder actions.

## 3. Tech Stack

- **Framework:** Next.js (v14+ with App Router)
- **Language:** TypeScript
- **UI Library:** Shadcn/ui (built on Radix UI & Tailwind CSS)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod (for validation)
- **State Management (MVP):** React Context, Zustand (for mock data stores), Component State (`useState`)
- **Icons:** Lucide React
- **Linting/Formatting:** ESLint, Prettier
- **Package Manager:** pnpm
- **Deployment:** Vercel

## 4. Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pcb-app
    ```
2.  **Install dependencies:**
    This project uses `pnpm` as the package manager.
    ```bash
    pnpm install
    ```
3.  **Environment Variables:**
    For the frontend-only MVP (v1.0), no specific environment variables are strictly required to run the application locally with mock data. However, Next.js applications often utilize environment variables.
    - If you need to add environment variables later (e.g., for API keys during backend integration), create a `.env.local` file in the `pcb-app` root directory:
      ```
      # Example .env.local
      NEXT_PUBLIC_SOME_VAR=your_value
      SOME_SERVER_VAR=another_value
      ```
    - Ensure `.env.local` is listed in your `.gitignore` file (it should be by default with standard Next.js setups).

## 5. Development

1.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
2.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
3.  **Directory Structure Overview:**
    - `src/app/`: Contains application routes (using App Router conventions).
    - `src/components/`: Reusable UI components.
      - `ui/`: Shadcn/ui components.
      - `features/`: Components specific to application features (Profile, Roster, etc.).
      - `layout/`: Core layout components (Header, Sidebar, etc.).
    - `src/lib/`: Utilities, validation schemas, constants, mock data, types.
    - `src/styles/`: Global styles.
    - `specs/`: (Located in project root) Design, architecture, and sprint planning documents.
4.  **Coding Conventions & Linting:**
    - The project uses ESLint and Prettier for code linting and formatting.
    - These tools are typically run automatically on commit via Husky and lint-staged configuration.
    - You can manually run checks with:
      ```bash
      pnpm run lint
      pnpm run format # (Or configure your editor for format-on-save)
      ```

## 6. Deployment (Vercel)

This application is configured for easy deployment via Vercel.

1.  **Connect Repository:** Link your Git repository (GitHub, GitLab, Bitbucket) to a new Vercel project.
2.  **Build Configuration:** Vercel typically auto-detects Next.js projects. Ensure the following settings are correct:
    - **Framework Preset:** Next.js
    - **Root Directory:** `pcb-app` (Assuming Vercel project points to the repo root containing `pcb-app`)
    - **Build Command:** `pnpm build` (or `pnpm next build` if Vercel uses `next build` by default)
    - **Install Command:** `pnpm install`
3.  **Environment Variables:** Add any required environment variables (like those defined in `.env.local`, especially non-`NEXT_PUBLIC_` ones needed for the build/server) to the Vercel project settings.
4.  **Deployment:** Pushing to the connected Git branch (e.g., `main`) will automatically trigger a deployment on Vercel.

---

_This README will be updated with more details as the project progresses._
