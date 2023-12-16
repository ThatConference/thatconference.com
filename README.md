# THAT CONFERENCE.COM

[![GitHub issues open](https://img.shields.io/github/issues/thatconference/that.us.svg)](https://github.com/thatconference/thatconference.com/issues) [![release](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/thatconference/thatconference.com/issues) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Get started

thatconference.com is a SvelteKit application. It uses Tailwind for styling, and makes GraphQL calls against our Api, https://api.that.tech.

### local dependencies

- nodejs v20.x
- npm v8.0.0

### project dependencies

We use nodenv to manage our node versions, it's configed in this repo.

Install the project dependencies...

```bash
  npm i
```

## Building and running in development

### env configuration

You will find the env settings in .env.sample. The current settings in the .env.sample will allow you to do development on pages which do not require authentication. If you're interested in working on those pages in the project you will need some additional values. Email us at <hello@thatconference.com>.

### running

```bash
  npm run dev
```

Navigate to [localhost:5173](http://localhost:5173). You should see your app running. Edit a component file in `src`, save it. It's setup with HMR and Tailwind's JIT. You should see your changes as soon as you make them.

## Building and running in production mode

```bash
  npm run local:build
  npm run preview
```

Mind you the build servers will run the following:

```bash
  npm run build
```

The only difference is how we're managing env settings.

## Development and PRs

We currently build and ship by following stacking prs https://stacking.dev/ and use a tool to aid us called graphite https://graphite.dev/.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://unspecified.io"><img src="https://avatars1.githubusercontent.com/u/772569?v=4?s=100" width="100px;" alt="Clark Sell"/><br /><sub><b>Clark Sell</b></sub></a><br /><a href="https://github.com/ThatConference/thatconference.com/commits?author=csell5" title="Code">💻</a> <a href="#content-csell5" title="Content">🖋</a> <a href="#design-csell5" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.brettski.com"><img src="https://avatars3.githubusercontent.com/u/473633?v=4?s=100" width="100px;" alt="Brett Slaski"/><br /><sub><b>Brett Slaski</b></sub></a><br /><a href="https://github.com/ThatConference/thatconference.com/commits?author=brettski" title="Code">💻</a> <a href="#infra-brettski" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-brettski" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://nate.codes"><img src="https://avatars.githubusercontent.com/u/596293?v=4?s=100" width="100px;" alt="Nate Emerson"/><br /><sub><b>Nate Emerson</b></sub></a><br /><a href="https://github.com/ThatConference/thatconference.com/issues?q=author%3Anateemerson" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hachyderm.io/@alzaudtke"><img src="https://avatars.githubusercontent.com/u/1631560?v=4?s=100" width="100px;" alt="Al"/><br /><sub><b>Al</b></sub></a><br /><a href="https://github.com/ThatConference/thatconference.com/issues?q=author%3Azaudtke" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
