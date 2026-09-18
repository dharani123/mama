# MAMA CLI 😎

> నీ టెర్మినల్ మామా.

MAMA is your Telugu-speaking terminal buddy.

Sometimes you need debugging.
Sometimes you need motivation.
Sometimes you just need someone to say:

**"పర్లేదు మామా." ❤️**

```console
$ mama

మామా ❤️

"నెమ్మదిగా వెళ్తున్నావని బాధపడకు మామా,
 ఆగిపోలేదుగా... అదే ముఖ్యం."

— నీ టెర్మినల్ మామా 😎
```

No network. No telemetry. No dependencies. Just 176 original Telugu messages
and a friend who lives in your `$PATH`.

---

## Features

| Command | What మామా does |
| --- | --- |
| `mama` | Random Telugu wisdom |
| `mama motivate` | Motivation — persistence, discipline, getting back up |
| `mama calm` | Slow down, breathe, one thing at a time |
| `mama morning` | Start-of-day nudge ☀️ |
| `mama night` | Let the day go, sleep well 🌙 |
| `mama code` | Developer wisdom, mostly with a grin 👨‍💻 |
| `mama git` | Git humour 🌿 |
| `mama roast` | Roast your terminal 🔥 |
| `mama coffee` | Coffee wisdom ☕ |
| `mama friday` | Weekend mode 🎉 |
| `mama --help` | Show help |
| `mama --version` | Show version |

---

## Installation

```bash
npm install -g mama-cli
```

Then, anywhere:

```bash
mama
```

### From source

```bash
git clone <repository-url> mama
cd mama
npm install
npm run build
npm link       # puts `mama` on your PATH
```

### Requirements

- **Node.js 18 or newer** — that is the only requirement.
- **A UTF-8 terminal.** MAMA speaks Telugu, so your terminal needs UTF-8
  encoding and a font with Telugu glyphs. Most modern Linux terminals
  (GNOME Terminal, Konsole, Alacritty, Kitty, WezTerm) handle this out of the
  box. If you see boxes instead of letters:

  ```bash
  locale                              # LANG should end in .UTF-8
  sudo apt install fonts-telugu       # Debian / Ubuntu
  ```

---

## Usage

```console
$ mama motivate

మామా 🔥

"నీకు నువ్వు నమ్మకం పెట్టుకున్న రోజు
 నీ జీవితంలో అసలు turning point మొదలవుతుంది మామా."

లేచి పని మొదలుపెట్టు రా. 💪
```

```console
$ mama code

మామా 👨‍💻

"Bug చూసి భయపడకు మామా...
 Bug కూడా ఎవరో రాసిన code ఏ."

Debug చెయ్యి. 😎
```

```console
$ mama roast

మామా 😂

"47 Chrome tabs,
 18 Git branches,
 3 TODO files...

 నువ్వు developer వా
 లేక operating system వా?"
```

```console
$ mama coffee

మామా ☕

Coffee level:
████████░░ 80%

Productivity:
████░░░░░░ 40%

ఇంకో coffee అవసరం అనిపిస్తోంది మామా. 😂
```

```console
$ mama something

మామా... 🤔

"something" నాకు ఇంకా తెలియదు.

Try:
  mama --help
```

### Put మామా in your shell startup

```bash
echo 'mama' >> ~/.bashrc      # a friend greets every new terminal
```

Or on a schedule, for the 11 PM crowd:

```cron
0 23 * * * /usr/bin/mama night
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
git clone <repository-url> mama
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
  body: `Code review లో comments ఎక్కువ వచ్చాయా మామా?
అంటే ఎవరో నీ code ని నిజంగా చదివారని అర్థం.`,
  emoji: '😄',            // optional, overrides the category default
  footer: 'సంతోషించు.',   // optional; `null` means no sign-off
},
```

Then `npm test`. The suite checks that the corpus has no duplicates, that
every message renders, and that no line is too wide for an 80-column terminal.

**Style guide for quotes**

- Telugu first, with developer English left in English — `code`, `bug`,
  `commit`, `push`, `branch`, `production`, `deploy`, `coffee`, `terminal`.
  Don't translate technical words just because you can.
- Say మామా naturally, the way you'd actually say it. Don't force it.
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

[MIT](LICENSE) — do whatever you like, మామా. 🙂
