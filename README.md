# Live-Poll

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-17-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Set Up

1. Clone repository
1. Run `npm install`
1. Copy and rename `.env.example` to `.env`
1. Run `npm run postinstall` (optional)
1. Run `npm run dev` (development mode) or `npm start` (production mode)
1. Open the page in your browser (https://localhost:3000). It will list all the active polls.
1. Type in the username and password found in `.env`

## Available Routes

- http://localhost:3000/create to create a new poll
- http://localhost:3000/newest to show the results of the newest poll
- http://localhost:3000/vote/{poll_id} to vote in a poll
- http://localhost:3000/poll/{poll_id} to show the results of a poll
- http://localhost:3000/qrcode to show a qrcode with the url to newest poll

## Additional URL-Parameters

- monotone=boolean
  - applies a reduced color scheme for voting bars
  - ignored if _compact=true_ is used
- simple=boolean
  - applies a basic font type
- transparent=boolean/number
  - adds transparency to the body background
  - _boolean_: enables / disables transparency
  - _number_: sets transparency to a percentage value (0 - 100)
  - ignored if _compact=true_ is used
- compact=boolean
  - only for _/poll/{poll_id}_ route
  - overwrites _monotone_ and _transparent_ parameters
  - applies a compact view especially for live streams / OBS

Example usage

```
/poll/{poll_id}?monotone=true&simple=true&transparent=true
/poll/{poll_id}?monotone=true&simple=false&transparent=80
/poll/{poll_id}?compact=true
/poll/{poll_id}?compact=true&simple=true
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/crunchypi"><img src="https://avatars2.githubusercontent.com/u/53178205?v=4" width="100px;" alt=""/><br /><sub><b>crunchypi</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=crunchypi" title="Code">💻</a> <a href="#ideas-crunchypi" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jriegraf"><img src="https://avatars1.githubusercontent.com/u/16071323?v=4" width="100px;" alt=""/><br /><sub><b>Julian</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=jriegraf" title="Code">💻</a> <a href="#ideas-jriegraf" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/manthanabc"><img src="https://avatars2.githubusercontent.com/u/48511543?v=4" width="100px;" alt=""/><br /><sub><b>Manthan</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=manthanabc" title="Code">💻</a> <a href="#design-manthanabc" title="Design">🎨</a></td>
    <td align="center"><a href="https://simontiger.com"><img src="https://avatars1.githubusercontent.com/u/21979673?v=4" width="100px;" alt=""/><br /><sub><b>Simon Tiger</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=simon-tiger" title="Code">💻</a> <a href="#ideas-simon-tiger" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/pieterdeschepper"><img src="https://avatars0.githubusercontent.com/u/4106097?v=4" width="100px;" alt=""/><br /><sub><b>Pieter De Schepper</b></sub></a><br /><a href="#design-pieterdeschepper" title="Design">🎨</a> <a href="https://github.com/CodingTrain/Live-Poll/commits?author=pieterdeschepper" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/D-T-666"><img src="https://avatars1.githubusercontent.com/u/35934791?v=4" width="100px;" alt=""/><br /><sub><b>Dimitri Tabatadze</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=D-T-666" title="Code">💻</a> <a href="#ideas-D-T-666" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/ShawKai91"><img src="https://avatars3.githubusercontent.com/u/66273574?v=4" width="100px;" alt=""/><br /><sub><b>Shaw Kai</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=ShawKai91" title="Code">💻</a> <a href="#ideas-ShawKai91" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/BeeryShklar"><img src="https://avatars3.githubusercontent.com/u/52495055?v=4" width="100px;" alt=""/><br /><sub><b>Beery Shklar</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=BeeryShklar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dipamsen"><img src="https://avatars2.githubusercontent.com/u/59444569?v=4" width="100px;" alt=""/><br /><sub><b>Fun Planet</b></sub></a><br /><a href="#ideas-dipamsen" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/CodingTrain/Live-Poll/commits?author=dipamsen" title="Code">💻</a></td>
    <td align="center"><a href="https://smartineau.me"><img src="https://avatars3.githubusercontent.com/u/44237969?v=4" width="100px;" alt=""/><br /><sub><b>Samuel Martineau</b></sub></a><br /><a href="#ideas-Samuel-Martineau" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.shiffman.net"><img src="https://avatars0.githubusercontent.com/u/191758?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Shiffman</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=shiffman" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/johntalton"><img src="https://avatars1.githubusercontent.com/u/13648537?v=4" width="100px;" alt=""/><br /><sub><b>John</b></sub></a><br /><a href="#ideas-johntalton" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/adriaan1313"><img src="https://avatars0.githubusercontent.com/u/19620346?v=4" width="100px;" alt=""/><br /><sub><b>Bunnygamers</b></sub></a><br /><a href="#ideas-adriaan1313" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://cbkm.in"><img src="https://avatars1.githubusercontent.com/u/38382861?v=4" width="100px;" alt=""/><br /><sub><b>Rajaram Joshi</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=TheCBKM" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://aassila.com"><img src="https://avatars1.githubusercontent.com/u/47226184?v=4" width="100px;" alt=""/><br /><sub><b>Younes Aassila</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=younesaassila" title="Documentation">📖</a></td>
    <td align="center"><a href="https://giggiog.github.com"><img src="https://avatars3.githubusercontent.com/u/47040505?v=4" width="100px;" alt=""/><br /><sub><b>GiggioG</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=GiggioG" title="Code">💻</a> <a href="#design-GiggioG" title="Design">🎨</a></td>
    <td align="center"><a href="http://eluni.co"><img src="https://avatars3.githubusercontent.com/u/10181211?v=4" width="100px;" alt=""/><br /><sub><b>Tom</b></sub></a><br /><a href="https://github.com/CodingTrain/Live-Poll/commits?author=elunico" title="Code">💻</a> <a href="#design-elunico" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
