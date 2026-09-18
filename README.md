# MAMA CLI 😎

> nee terminal mama.

MAMA is your Telugu-speaking terminal buddy.

Sometimes you need debugging.
Sometimes you need motivation.
Sometimes you just need someone to say:

**"parledhu mama." ❤️**

```console
$ dharani-mama

mama ❤️

"andhariki nachchalani prayathninchaku mama.
 neeku nachche pani cheyyi — migathadhi dhaanikadhe jaruguthundhi."

— nee terminal mama 😎
```

Telugu, written in Latin letters the way you'd type it to a friend — so it
reads correctly in any terminal, with no fonts to install.

No network. No telemetry. No dependencies. Just 176 original Telugu messages
and a friend who lives in your `$PATH`.

---

## Features

MAMA is installed under two names, because the plain `mama` was taken on npm:

| Installed via | Your command |
| --- | --- |
| **npm** | `dharani-mama` |
| **apt** (Debian/Ubuntu) | `mama` |

Everything below is the same either way — substitute whichever you have.
The program itself always prints the name you actually typed, so `--help`
shows commands you can paste straight back.

| Run | What mama does |
| --- | --- |
| *(no arguments)* | Random Telugu wisdom |
| `motivate` | Motivation — persistence, discipline, getting back up |
| `calm` | Slow down, breathe, one thing at a time |
| `morning` | Start-of-day nudge ☀️ |
| `night` | Let the day go, sleep well 🌙 |
| `code` | Developer wisdom, mostly with a grin 👨‍💻 |
| `git` | Git humour 🌿 |
| `roast` | Roast your terminal 🔥 |
| `coffee` | Coffee wisdom ☕ |
| `friday` | Weekend mode 🎉 |
| `--help` | Show help |
| `--version` | Show version |

```bash
dharani-mama roast        # if you installed from npm
mama roast                # if you installed from apt
```

---

## Installation

### npm (recommended)

```bash
npm install -g dharani-mama
```

Installs the command as **`dharani-mama`**:

```bash
dharani-mama
dharani-mama roast
```

Needs Node.js 18 or newer. Works on any platform Node runs on.

### Debian / Ubuntu

Installs the command as **`mama`**, plus a man page, and pulls in Node for you.
Add the repository once:

```bash
sudo install -d -m 0755 /etc/apt/keyrings
curl -fsSL https://dharani123.github.io/mama/mama.asc \
  | sudo tee /etc/apt/keyrings/mama.asc > /dev/null

echo "deb [signed-by=/etc/apt/keyrings/mama.asc] https://dharani123.github.io/mama stable main" \
  | sudo tee /etc/apt/sources.list.d/mama.list > /dev/null

sudo apt update
```

Then, now and for every future version:

```bash
sudo apt install mama
```

`sudo apt upgrade` picks up new releases. Remove it with `sudo apt remove mama`.

### A single .deb, without the repository

```bash
wget https://github.com/dharani123/mama/releases/latest/download/mama_1.1.0-1_all.deb
sudo apt install ./mama_1.1.0-1_all.deb
```

### From source

```bash
git clone https://github.com/dharani123/mama.git
cd mama
npm install
npm run build
npm link       # puts `dharani-mama` on your PATH
```

### Build the .deb yourself

Needs only `dpkg-deb` and `fakeroot`, both present on a stock Ubuntu:

```bash
./packaging/build-deb.sh
sudo apt install ./build/mama_1.1.0-1_all.deb
```

### Requirements

- **Node.js 18 or newer** — that is the only requirement.
- **A UTF-8 terminal**, for the emoji. Messages are Telugu written in Latin
  letters, so no Telugu font and no complex-text support is needed — it works
  in any terminal, over SSH, in tmux, anywhere.

---

## Usage

Examples below use `dharani-mama`, the npm command. If you installed from
apt, the command is `mama` — everything after it is identical.

```console
$ dharani-mama motivate

mama 🔥

"pedhdha kala kanadam thappu kaadhu mama.
 chinna adugu veyakapovadame thappu."

lechi pani modhalupettu raa. 💪
```

```console
$ dharani-mama code

mama 👨‍💻

"sagam bugs typo valle vasthayi mama.
 mundhu okasari spelling choodu."
```

```console
$ dharani-mama roast

mama 🔥

"nee CSS lo !important yennisarlu undho lekkapettanu mama.

 adhi stylesheet kaadhu — adhi oka argument."
```

```console
$ dharani-mama coffee

mama ☕

"nee blood lo caffeine kaadhu mama —
 caffeine lo blood."
```

```console
$ dharani-mama something

mama... 🤔

"something" naaku inka theliyadhu.

Try:
  mama --help
```

### Put mama in your shell startup

```bash
echo 'dharani-mama' >> ~/.bashrc   # a friend greets every new terminal
```

Or on a schedule, for the 11 PM crowd:

```cron
0 23 * * * /usr/bin/mama night        # path from the apt install
```

### Environment variables

| Variable | Effect |
| --- | --- |
| `NO_COLOR` | Disable colour entirely ([no-color.org](https://no-color.org)) |
| `FORCE_COLOR` | Keep colour even when output is piped |
| `MAMA_SEED` | Fix the random seed — the same seed always gives the same message |
| `MAMA_DEBUG` | Show real stack traces instead of a friendly Telugu apology |

Colour is off automatically when output is not a terminal, so `mama | cat`
and `mama > motivation.txt` stay clean. Only cyan, yellow and dim are used,
all of which read on light and dark backgrounds alike.

---

## Safety

MAMA is a humour utility, and it behaves like one. It never:

- executes any command — a quote may *contain* `git commit -m "mama said so"`,
  but MAMA only ever prints it
- touches your files, your git repository or your system configuration
- makes a network request
- runs `sudo`

There is a test that fails the build if the source ever imports
`child_process`, `eval`, `new Function` or anything that writes to disk.

---

## Development

```bash
git clone https://github.com/dharani123/mama.git mama
cd mama
npm install

npm run build        # compile TypeScript to dist/
npm test             # build, then run the full suite
npm run mama -- code # build and run a command locally
```

### Project structure

```text
src/
  cli.ts             executable entry point (shebang, printing, exit code)
  run.ts             argv → { stdout, stderr, exitCode }; pure and testable
  commands.ts        the command table
  help.ts            --help, --version, unknown-command output
  quotes/
    types.ts         Message and CategoryStyle
    general.ts …     one file per category
    index.ts         QUOTES and STYLES
  utils/
    random.ts        seedable picker, avoids immediate repeats
    format.ts        heading / quote / sign-off layout, meters
    colors.ts        tiny ANSI helper, NO_COLOR aware
tests/               node:test — unit and real-binary integration
```

Content lives entirely in `src/quotes/`. No quote is ever written inside
command-handling logic.

### Deterministic output

Randomness is seedable, which is how the tests stay stable:

```bash
MAMA_SEED=42 mama motivate   # same message every single time
```

---

## Contributing

Pull requests very welcome — especially quotes.

### Adding a quote

Open the right file in `src/quotes/` and add an entry:

```ts
{
  body: `Code review lo comments yekkuva vachchaya mama?
ante yevaro nee code ni nijanga chadhivarani artham.`,
  emoji: '😄',            // optional, overrides the category default
  footer: 'santhoshinchu.', // optional; `null` means no sign-off
},
```

Then `npm test`. The suite checks that the corpus has no duplicates, that
every message renders, and that no line is too wide for an 80-column terminal.

**Style guide for quotes**

- **Write Telugu in Latin letters, not Telugu script** — `parledhu mama`.
  Terminals cannot shape Telugu script reliably, so the whole corpus is
  romanised; a quote in Telugu script would be unreadable for most people
  running this, and CI will reject it.
- Spell it so an English reader lands near the Telugu pronunciation:
  - the soft (dental) t and d take an h — `tharvatha`, `ledhu`, `mundhu`.
    The hard (retroflex) ones do not — `padaku`, `choodu`, `okkati`.
  - double a long vowel only in a word's **first** syllable — `laabham`,
    `naalugu`, `oopiri`, but `alasipothavu`, `nemmadhiga`.
  - a word starting with the "e" sound takes the y it is pronounced with —
    `yedhi`, `yem`, `yekkuva`, `yeppatiki`.
  - English loanwords stay English — `tension`, not `tenshan`.
- Developer English stays English — `code`, `bug`, `commit`, `push`, `branch`,
  `production`, `deploy`, `coffee`, `terminal`. Don't translate technical
  words just because you can.
- Say mama naturally, the way you'd actually say it. Don't force it.
- Keep it short. Four lines is usually plenty.
- Emojis: one or two. This is a terminal, not a group chat.
- Roasts target **code, habits and terminal chaos** — never a person's
  identity. Nothing hateful, nothing you wouldn't say to a friend sitting
  next to you.
- `calm` messages are a friend's words, not advice. No medical claims.
- Original content only. Please don't paste in famous quotes from
  copyrighted sources.

### Adding a command

1. Create `src/quotes/<name>.ts` with your messages.
2. Register it in `src/quotes/index.ts` — add to both `QUOTES` and `STYLES`,
   and add the name to `Category` in `src/quotes/types.ts`.
3. Add one row to `COMMANDS` in `src/commands.ts`.

That's it. `--help`, routing, tests and exit codes all pick it up
automatically.

### Translations

The architecture keeps content in plain data files, so a future
`src/quotes/<lang>/` layout is an easy change. If you want to bring MAMA to
another language, open an issue first so we can agree on the layout.

---

## License

[MIT](LICENSE) — do whatever you like, mama. 🙂
