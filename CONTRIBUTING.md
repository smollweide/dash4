# Contributing to Dash4

Thanks for your interest in improving Dash4!

Please review this document to help to streamline the process and save everyone's precious time.

This repo uses lerna, and npm.

## Table of Contents

* [Issues](#issues)
* [Pull Requests (PRs)](#prs)
* [Closing issues](#closing-issues)
* [Development](#development)

## <a name="issues">Issues</a>

No software is bug-free. So, if you got an issue, follow these steps:

- Search the [issue list](https://github.com/smollweide/dash4/issues) for current and old issues.
  - If you find an existing issue, please UPVOTE the issue by adding a "thumbs-up reaction". We use this to help prioritize issues!
- If none of that is helping, create an issue with the following information:
  - Clear title (shorter is better).
  - Describe the issue in clear language.
  - Share error logs, screenshots and etc.
  - To speed up the issue fixing process, send us a sample repo with the issue you faced:

## <a name="prs">Pull Requests (PRs)</a>

- Fix typos and add more [documentation](https://github.com/smollweide/dash4/labels/needs%20docs).
- Try to fix some [bugs](https://github.com/smollweide/dash4/labels/bug).
- Work on new [features](https://github.com/smollweide/dash4/labels/feature%20request).
- Add more tests

Use the [PR template](https://github.com/smollweide/dash4/blob/master/.github/PULL_REQUEST_TEMPLATE.md)

Before you submit a new PR, make sure you run `npm run test`. Do not submit a PR if tests are failing. If you need any help, create an issue and ask.

## <a name="closing-issues">Closing issues</a>

- Duplicate issues should be closed with a link to the original.
- Unreproducible issues should be closed if it's not possible to reproduce them (if the reporter drops offline,
  it is reasonable to wait 2 weeks before closing).
- `bug`s should be labelled `merged` when merged, and be closed when the issue is fixed and released.
- `feature`s, `maintenance`s, should be labelled `merged` when merged,
  and closed when released or if the feature is deemed not appropriate.
- `question / support`s should be closed when the question has been answered.
  If the questioner drops offline, a reasonable period to wait is two weeks.
- `discussion`s should be closed at a maintainer's discretion.

## <a name="development">Development</a>

### 1. Installation

If you run into trouble here, make sure your node and npm are on the latest versions.

1.  `cd ~` (optional)
2.  `git clone https://github.com/smollweide/dash4.git` _bonus_: use your own fork for this step
3.  `cd dash4`
4.  `npm run bootstrap`
5.  `npm run build`
7.  `npm start`

### 2. Run unit tests

This command will list all the suites and options for running tests.

```sh
npm run test
```

Before any contributes are submitted in a PR, make sure to add or update meaningful tests. A PR that has failing tests will be regarded as a “Work in Progress” and will not be merged until all tests pass.
When creating new unit test files, the tests should adhere to a particular folder structure and naming convention, as defined below.

```sh
#Proper naming convention and structure for js tests files
+-- parentFolder
|   +-- [filename].ts
|   +-- [filename].spec.ts
```

### 3. Linters

This command will list all lint errors and warnings.

```sh
npm run lint
```

Before any contributes are submitted in a PR, make sure there are no errors or warnings.

### 4. Commitlint

We are using [commitlint](https://github.com/conventional-changelog/commitlint#README.md), please follow the commitlint rules.
At best by execute 

```sh
npm run cz
```

### 5. Formatting

We are using [prettier](https://github.com/prettier/prettier) and [sort-package-json](https://github.com/keithamus/sort-package-json) for autoformatting.
Please make sure everything is formatted befor commiting by executing 

```sh
npm run prettier && npm run sort-package-json
```
