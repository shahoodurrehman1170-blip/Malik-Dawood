# Malik Dawood — Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it (one command)

Open a terminal inside this folder and run:

```
python serve.py
```

On macOS / Linux use `python3 serve.py`.

The site opens in your browser at http://localhost:8000. Press `Ctrl+C` to stop.
Use another port with `python serve.py 3000`.

Alternative with no script: `python -m http.server 8000`, then open http://localhost:8000.

You can also just double-click `index.html`.

## Structure

```
index.html
css/style.css
js/script.js
images/
serve.py
```

## Status

Complete site: Header, Hero, About, Skills, Experience, Projects, Education, Contact, Footer.

On Windows, if `python` is not found, try `py serve.py` or just open `index.html`.

## Things to update

- Add your LinkedIn / GitHub links (not in the CV) in the Contact section and footer.
- Add project links (GitHub / live demo) to the project cards once you have them.
- The contact form opens the visitor's email app (mailto), because this is a static site.
