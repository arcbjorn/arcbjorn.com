<p align="center">
  <a href="https://arcbjorn.com" target="_blank" rel="noopener noreferrer">
    <img alt="Arcbjorn" src="https://i.ibb.co/tKfXR6F/bear-icon.jpg" width="60" />
  </a>
</p>

<h1 align="center">
  Personal website
</h1>

<h2 align="center">
  <a href="https://arcbjorn.com" rel="noopener noreferrer">
    Demo
  </a>
</h2>

1.  **Development**

    Navigate into your new site's directory and start it up.

    ```shell
    cd <project-folder>
    pnpm install
    pnpm dev
    ```

    Site is now running at http://localhost:3000!

    **Setting Up Pre-commit Hook**

    To enable the pre-commit hook for checking changes in `places.json`, follow these steps:

    1. Copy the pre-commit hook to your Git hooks directory:

    ```bash
    cp hooks/pre-commit .git/hooks/
    ```

    2. Make the hook executable:

    ```bash
    chmod +x .git/hooks/pre-commit
    ```

    Now, the pre-commit hook will run automatically when you make a commit.

    Install the required libraries to run the pre-commit hook or generate the map overlay manually:

    ```bash
    python3 -m venv ./venv
    source ./venv/bin/activate
    python3 -m pip install requests shapely
    python3 generateMapOverlayGeoDataJson.py
    ```

2.  **Technologies**

    - [Solid](https://solidjs.com/)

    - [Tailwindcss](https://tailwindcss.com/)

    - [Vite](https://vitejs.dev/)
