# Sophuckit Podcast - GitHub Pages (Jekyll)

This folder contains a Jekyll-ready version of the Sophuckit Podcast website.

## Directory Structure

- `_layouts/`: Common page shells (header, footer, head).
- `_episodes/`: Individual episode markdown files. Add new episodes here!
- `_guests/`: Guest profiles. Add new guests here!
- `_hosts/`: Host bios. Add Soph or Godfather here!
- `_data/`: Global site content in YAML format.
  - `about.yml`: Change "About" section text and stats here.
  - `sponsors.yml`: Update ad formats, pricing, and audience stats here.
- `assets/`: 
  - `css/`: The site's styling.
  - `fonts/`: Local font files.
  - `images/`: Logos and artwork.
  - `js/`: Interactivity and navigation logic.
- `index.html`: The main page content.

## How to use

### Local Development (Requires Ruby & Jekyll)

1.  Open a terminal in the `GitHubPages` folder.
2.  Install dependencies: `bundle install`
3.  Start the server: `bundle exec jekyll serve`
4.  Open `http://localhost:4000` in your browser.

### Hosting on GitHub Pages

1.  Create a new repository on GitHub.
2.  Push the **contents** of this `GitHubPages` folder to the repository.
3.  In GitHub settings, under **Pages**, ensure the source is set to build from the `main` branch with Jekyll.

## Managing Content

Instead of hard-coding everything into one giant HTML file, you can now manage different types of content separately:

- **Episodes**: Add a `.md` file to `_episodes/`. Include front-matter like `title`, `episode_number`, and `spotify_id`.
- **Guests**: Add a `.md` file to `_guests/`. Include front-matter like `name`, `handle`, and `occupation`.
- **Hosts**: Manage host bios in `_hosts/`. You can update Soph or Godfather's bios and quotes there.
- **Global Content**: Edit files in `_data/` to update sections like "About" or "Sponsors" without touching any HTML.


