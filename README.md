# Budget Buddy

## Proposal Document

https://docs.google.com/document/d/18r3f97LHfF1MQrcBu4TFE2jFhboMJkEVPRCAOlpIBVA/edit?usp=sharing

## Workflow Conventions

- All the source code is located in this repo. Backend code is located in `/server` and the Frontend code is located in `/client` respectively.
- All the sensitive information goes into `.env` file that is `.gitignore` 'd. It must not be shared within GitHub but rather via private communication channels.
- When you are working on a new feature, you create a new branch from `main` for it. After finishing the work, you make a Pull Request. Example of the branch name: `server/feature/authorization` or `client/bugfix/search-bar`

## Branch Naming Conventions
### To maintain an organized codebase, we adhere to the following branch naming conventions:

New Features: feature/<feature-name>
Bug Fixes: bugfix/<bug-name>
Hot Fixes: hotfix/<hotfix-name>
Releases: release/<release-version>
Improvements: improvement/<improvement-name>
Refactoring: refactor/<component>
Documentation: docs/<what-to-document>
Development: develop (This is an ongoing branch where features are merged and tested)
Main Branch: main (This is the default branch, often reflecting the production-ready state of our code)
