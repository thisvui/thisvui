# ThisVui Contributing Guide

:tada: Thank you so much for taking the time to contribute! :tada:

It's really exciting that you are interested in contributing to ThisVui!. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Issue Guidelines](#issues-guidelines)
- [CODE OF CONDUCT](https://github.com/thisvui/thisvui/blob/master/.github/CODE_OF_CONDUCT.md)
- [Reporting Bugs](#reporting-bugs)
- [Feature Request](#feature-request)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)

## Issues Guidelines

The issue tracker is the preferred channel to report bugs, request new features and send pull request, but please respect the following rules:

- Do not use the tracker to request personal support.
- Please follow the [Code of Conduct](https://github.com/thisvui/thisvui/blob/master/.github/CODE_OF_CONDUCT.md) when posting comments.
- Please keep the comments/discussion focused on the issue topic.
- If you want to add reactions please use the [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments)
  when submitting comments, issues or pull request.

We reserve the right to delete comments which violate any of this rules.

## Reporting bugs

When reporting a bug please follow the bug report guidelines:

##### **Describe the bug**
A clear and concise description of what the bug is.

##### **Steps To Reproduce the behavior**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

##### **Expected behavior**
A clear and concise description of what you expected to happen.

##### **Screenshots**
If applicable, add screenshots to help explain your problem.

##### **Environment information**
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS]

##### **Additional context**
Add any other context about the problem here.

##### **Add the corresponding label**
Add the `bug` label to the issue.

## Feature Request

Feature requests are most welcome!, please follow the feature request guidelines when submitting new FR:

##### **Take your time**
Before submitting a request please take some time to think about whether your idea can really help improve the project
and is aligned with the objectives and scope of the project. 

##### **Make a solid case**
It is up to you to make a solid case to convince the project developers that the requested feature it's worth implementing.

##### **Provide context**
Please provide a detailed context about the feature request. If your feature request is related to a problem add a 
clear and concise description of what the problem is. 

##### **Describe the solution you'd like**
A clear and concise description of what you want to happen.

##### **Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

## Pull Request Guidelines

- The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `dev`, and merge back against that branch.

- Work in the `src` folder and **DO NOT** checkin `dist` in the commits.

- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

Please follow the following process to get your work included in the project:

1. [Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Create a local clone of your fork
   git clone https://github.com/<YOUR-USERNAME>/thisvui.git
   
   # Navigate to the newly cloned directory
   cd thisvui
   
   # Configure Git to sync your fork with the original thisvui repository
   git remote add upstream https://github.com/thisvui/thisvui.git
   ```

2. If you cloned the repo a while ago, update your local repo with the latest changes from upstream:

   ```bash
   git checkout dev
   git pull upstream dev
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Please follow these [commit message guidelines](https://chris.beams.io/posts/git-commit/)
   or your code is unlikely to be merged into the main project. 

5. Locally merge (or rebase) the upstream development branch into your topic branch. To better understanding of the interactive rebase 
   please check the following guides: [Git-Branching-Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing), [about-git-rebase](https://help.github.com/en/github/using-git/about-git-rebase).

   ```bash
   git pull [--rebase] upstream dev
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork)
    with a clear title and description against the `dev` branch. **Do not submit PRs against the `master` branch.**

**Important!** By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [MIT License](LICENSE).

### Committing Changes

Commit messages should follow the following [commit message guidelines](https://chris.beams.io/posts/git-commit/).

## Development Setup

You will need [Node.js](http://nodejs.org) **version 8+**

After cloning the repo, run:

``` bash
$ npm install
```

### Commonly used NPM scripts

``` bash
# build dist files, including npm packages
$ npm run build

# build dist files for production (optimized)
$ npm run build:prod

# build all dist files.
$ npm run bundle
```
