# Contributing to @neomint/animations

First off, thank you for considering contributing to @neomint/animations! It's people like you that make @neomint/animations such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the [@neomint/animations Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@neomint-research.com](mailto:conduct@neomint-research.com).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for @neomint/animations. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report).

#### Before Submitting A Bug Report

* **Check the [troubleshooting documentation](docs/troubleshooting.md).** You might be able to find the cause of the problem and fix things yourself.
* **Perform a [cursory search](https://github.com/neomint-research/animations-npm/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://github.com/neomint-research/animations-npm/issues). Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **If the problem is related to performance or memory**, include a performance profile capture with your report.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for @neomint/animations, including completely new features and minor improvements to existing functionality.

#### Before Submitting An Enhancement Suggestion

* **Check if there's already [a feature request](https://github.com/neomint-research/animations-npm/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)** which provides that enhancement.
* **Determine which repository the enhancement should be suggested in.**
* **Perform a [cursory search](https://github.com/neomint-research/animations-npm/issues)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/neomint-research/animations-npm/issues). Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of @neomint/animations which the suggestion is related to.
* **Explain why this enhancement would be useful** to most @neomint/animations users.
* **List some other animation libraries or applications where this enhancement exists.**

### Pull Requests

The process described here has several goals:

- Maintain @neomint/animations's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible @neomint/animations
- Enable a sustainable system for @neomint/animations's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](.github/pull_request_template.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐧 `:penguin:` when fixing something on Linux
    * 🍎 `:apple:` when fixing something on macOS
    * 🏁 `:checkered_flag:` when fixing something on Windows
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies
    * 👕 `:shirt:` when removing linter warnings

### JavaScript Styleguide

* Follow the [ESLint configuration](.eslintrc.js) defined in the project
* Prefer ES6+ syntax when possible
* Use meaningful variable and function names
* Add JSDoc comments for all public APIs
* Write tests for new features and bug fixes
* Ensure your code passes all linting rules: `npm run lint`

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown) for documentation
* Reference functions, classes, and modules in backticks: `DataNetwork`
* Use code blocks for examples with appropriate language tags
* Keep line length to 80 characters when possible
* Use present tense ("Returns" not "Returned")
* Use active voice ("The function processes" not "The data is processed by")

## Development Process

### Setting Up Your Development Environment

1. Fork the repository and clone your fork
2. Install dependencies: `npm install`
3. Create a new branch: `git checkout -b my-feature-branch`
4. Make your changes
5. Run tests: `npm test`
6. Run linting: `npm run lint`
7. Build the project: `npm run build`
8. Commit your changes using [conventional commits](#git-commit-messages)
9. Push to your fork and submit a pull request

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Code Coverage

We maintain a minimum of 80% code coverage. New features should include tests that maintain or improve the overall coverage percentage.

### Building

```bash
# Build for production
npm run build

# Build in watch mode
npm run dev
```

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `enhancement` - Issues that are feature requests
* `documentation` - Issues or pull requests related to documentation
* `duplicate` - Issues or pull requests that are duplicates of other issues or pull requests
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `invalid` - This doesn't seem right
* `question` - Further information is requested
* `wontfix` - This will not be worked on

## Recognition

Contributors who submit high-quality pull requests may be invited to join the core team. We value all contributions, whether they're bug fixes, features, or documentation improvements.

Thank you for contributing to @neomint/animations! 🎉