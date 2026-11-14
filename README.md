# Let's Make a Deal!

An interactive browser-based game inspired by the classic television game show. Players select one of three mystery stage curtains hiding randomized college and lifestyle prizes, negotiate a cash buyout offer with the host, and discover whether they made the right call when all three curtains are revealed.

## Features

- **Randomized Prize Assignment:** Each round randomly selects three unique prizes from a pool of nine college and lifestyle items (ranging from a `$8,500` Full Semester Tuition Grant down to a `$1` Raw Baking Potato "Zonk!") using `Math.random()` and array manipulation.
- **Dual Mouse & Keyboard Controls:** Built with Chapter 9 page events, allowing players to lock in a curtain either by clicking on it or by pressing keys `1`, `2`, or `3` on their keyboard.
- **Input Locking:** Uses a round-state flag (`roundFinished`) to immediately disable extra clicks or key presses once a curtain has been selected.
- **Dynamic Host Buyout Negotiation:** Before opening the chosen curtain, the host presents a guaranteed cash offer via a `confirm()` dialog—giving the player the choice to take the cash (`OK`) or keep their curtain (`Cancel`).
- **Full Stage Reveal & Outcome Breakdown:** At the end of each round, all three curtains open to reveal every hidden prize, tag the player's original choice, and calculate the net gain or loss of their decision.
- **Instant Replay:** Includes a **Play Another Round** button (`location.reload()`) to reset the board and shuffle a fresh set of prizes.

## Host Negotiation Strategy

To keep the game unpredictable rather than always offering a bad deal, the host uses a probability-based pricing strategy:

- **70% Budget-Protection Offer (Lowball):** Offers between `40%` and `80%` of the selected prize's actual value to minimize payout costs.
- **30% Bluff / Generous Offer:** Offers between `115%` and `155%` of the prize's value (plus `$15`), occasionally paying more than the hidden item is worth so players cannot reliably assume the host's offer is always lower.

## Technologies Used

- **HTML5:** Semantic structure (`<header>`, `<main>`, `<footer>`) and keyboard-focusable stage elements (`tabindex="0"`).
- **CSS3:** Responsive Flexbox grid layout with a Crimson Velvet Theater theme, hover transitions, and visual state indicators (`.is-picked`, `.is-open`).
- **JavaScript (ES6):** Prize shuffling logic, probability calculations, and native `confirm()` dialog handling.
- **jQuery (v3.2.1):** Mouse and keyboard event listeners (`.click()`, `.keydown()`), DOM updates (`.html()`, `.addClass()`), and smooth reveal effects (`.fadeIn()`).

## Project Structure

```text
project06/
├── index.html      # Main HTML layout for the three stage curtains and results panel
├── game.js         # Game setup, mouse/keyboard listeners, host logic, and reveal flow
├── style.css       # Crimson Velvet Theater styling and curtain state animations
└── README.md       # Project documentation
```

## Getting Started

1. Clone or download this repository to your local machine:
   ```bash
   git clone [https://github.com/your-username/project06.git](https://github.com/your-username/project06.git)
   ```
2. Navigate into the `project06` directory.
3. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, or Edge). No build tools or local server setup are required.

## Author

- **Peter Tran** — © 2026
