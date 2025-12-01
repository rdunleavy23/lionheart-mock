# CLAUDE.md - AI Assistant Guide for lionheart-mock

This document provides essential context and guidelines for AI assistants working on the lionheart-mock codebase.

## Project Overview

**Project Name:** lionheart-mock
**Repository:** rdunleavy23/lionheart-mock
**Status:** New/In Development
**Last Updated:** 2025-12-01

### Purpose
<!-- TODO: Add project purpose and description as it develops -->
This is a mock/testing project. Specific purpose and functionality to be documented as the project evolves.

## Repository Structure

```
lionheart-mock/
├── .git/                 # Git repository data
└── CLAUDE.md            # This file
```

### Directory Conventions
<!-- Update this section as directories are added -->
- `/src` - Source code (when created)
- `/test` or `/tests` - Test files (when created)
- `/docs` - Documentation (when created)
- `/scripts` - Build and utility scripts (when created)
- `/config` - Configuration files (when created)

## Development Setup

### Prerequisites
<!-- TODO: Add prerequisites as project stack is determined -->
- [ ] Programming language/runtime (TBD)
- [ ] Package manager (TBD)
- [ ] Build tools (TBD)

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd lionheart-mock

# TODO: Add installation steps as they are defined
# Example: npm install, pip install -r requirements.txt, etc.
```

### Development Workflow

#### Branching Strategy
- **Main branch:** `main` (or default branch)
- **Feature branches:** Use descriptive names (e.g., `feature/add-user-auth`)
- **Bug fix branches:** Use `fix/` prefix (e.g., `fix/login-error`)
- **AI-generated branches:** Automatically created with `claude/` prefix

#### Git Workflow
1. Create a new branch from main for each feature/fix
2. Make changes and commit with clear messages
3. Push to remote branch
4. Create pull request for review

#### Commit Message Conventions
<!-- TODO: Establish commit message format -->
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, Refactor)
- Keep subject line under 72 characters
- Add detailed description if needed

Example:
```
Add user authentication module

- Implement JWT token generation
- Add login/logout endpoints
- Include password hashing
```

## Code Style & Conventions

### General Principles
- **Readability:** Code should be self-documenting
- **Simplicity:** Avoid over-engineering
- **Consistency:** Follow existing patterns in the codebase
- **Testing:** Write tests for new functionality

### Naming Conventions
<!-- TODO: Update based on chosen language/framework -->
- Variables: `camelCase` or `snake_case` (TBD based on language)
- Functions: `camelCase` or `snake_case` (TBD based on language)
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case` or language-appropriate convention

### Code Organization
<!-- TODO: Update as patterns emerge -->
- Keep functions small and focused
- One class/component per file (when applicable)
- Group related functionality together
- Separate concerns (business logic, UI, data access)

## Testing Strategy

### Test Structure
<!-- TODO: Define testing approach -->
- Unit tests: Test individual functions/methods
- Integration tests: Test component interactions
- E2E tests: Test full user workflows (if applicable)

### Running Tests
```bash
# TODO: Add test commands when testing framework is set up
# Example: npm test, pytest, cargo test, etc.
```

### Test Coverage
- Aim for meaningful coverage, not just high percentages
- Critical paths should be thoroughly tested
- Edge cases should be covered

## Build & Deployment

### Build Process
```bash
# TODO: Add build commands
# Example: npm run build, make, cargo build, etc.
```

### Environment Configuration
<!-- TODO: Document environment variables and configuration -->
- Development environment settings
- Production environment settings
- Required environment variables

### Deployment
<!-- TODO: Add deployment procedures -->
- Deployment target: TBD
- Deployment process: TBD
- CI/CD pipeline: TBD

## Dependencies & Third-Party Libraries

### Core Dependencies
<!-- TODO: List main dependencies as they are added -->
- TBD

### Development Dependencies
<!-- TODO: List dev dependencies -->
- TBD

### Dependency Management
- Keep dependencies up to date
- Review security advisories regularly
- Document why each dependency is needed
- Prefer well-maintained libraries

## Architecture & Design Patterns

### Architectural Overview
<!-- TODO: Document architecture as it develops -->
- Design pattern: TBD (MVC, microservices, layered, etc.)
- Data flow: TBD
- State management: TBD

### Key Design Decisions
<!-- Document important architectural decisions here -->
1. **Decision:** TBD
   - **Rationale:** TBD
   - **Date:** TBD

## API Documentation

### Endpoints
<!-- TODO: Document API endpoints if applicable -->

### Request/Response Formats
<!-- TODO: Document data formats -->

### Authentication & Authorization
<!-- TODO: Document auth mechanisms -->

## Database & Data Models

### Database Type
<!-- TODO: Specify database system -->
- Database: TBD (PostgreSQL, MongoDB, SQLite, etc.)

### Schema
<!-- TODO: Document database schema -->

### Migrations
<!-- TODO: Document migration process -->

## Common Tasks for AI Assistants

### Adding a New Feature
1. Review existing code structure
2. Create feature branch
3. Implement feature following established patterns
4. Add tests
5. Update documentation
6. Commit and push

### Fixing a Bug
1. Reproduce the bug
2. Identify root cause
3. Create fix branch
4. Implement fix
5. Add regression test
6. Verify fix works
7. Commit and push

### Refactoring Code
1. Ensure tests exist for the code being refactored
2. Make changes incrementally
3. Run tests after each change
4. Keep commits small and focused
5. Document why refactoring was needed

### Updating Documentation
1. Keep documentation in sync with code
2. Update this CLAUDE.md when patterns change
3. Document new conventions as they are established
4. Update API docs when endpoints change

## Important Warnings & Gotchas

### Security Considerations
- Never commit secrets, API keys, or passwords
- Use environment variables for sensitive data
- Validate all user input
- Follow OWASP security best practices

### Common Pitfalls
<!-- TODO: Add known issues and gotchas as they are discovered -->
- TBD

### Performance Considerations
<!-- TODO: Add performance guidelines -->
- TBD

## Resources & References

### Documentation
- Project README: (to be created)
- API Documentation: (to be created)
- Architecture docs: (to be created)

### External Resources
<!-- TODO: Add relevant external documentation links -->
- Official language documentation: TBD
- Framework documentation: TBD
- Best practices guides: TBD

### Team Contacts
<!-- TODO: Add team member contacts if applicable -->
- Project owner: rdunleavy23
- Contributors: TBD

## FAQ for AI Assistants

**Q: What should I do if there's no existing code for a feature?**
A: Review similar projects or consult language/framework best practices. Create a simple, working implementation first, then iterate.

**Q: How do I handle dependencies?**
A: Add them through the appropriate package manager. Document why they're needed in commit messages.

**Q: Should I create tests for new code?**
A: Yes, always include tests for new functionality when the testing framework is in place.

**Q: What if I'm unsure about a design decision?**
A: Look for existing patterns in the codebase first. If none exist, choose the simplest approach that works and document the decision.

**Q: How detailed should commit messages be?**
A: Subject line should be clear and concise. Add details in the body if the change is complex or non-obvious.

## Maintenance Notes

### Last Review
- **Date:** 2025-12-01
- **Status:** Initial creation - repository is new and empty
- **Next Review:** When first major feature is implemented

### Update Triggers
This document should be updated when:
- Project technology stack is chosen
- First major feature is implemented
- Architectural decisions are made
- Coding conventions are established
- Build/test/deployment processes are set up
- New patterns or conventions emerge

---

**Note to AI Assistants:** This is a living document. As you work on the codebase, please update relevant sections to reflect the current state of the project. If you establish new patterns or make architectural decisions, document them here for future reference.
