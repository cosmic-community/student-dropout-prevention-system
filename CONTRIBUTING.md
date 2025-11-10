# Contributing Guidelines

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone your-fork-url`
3. Install dependencies: `bun install`
4. Create `.env.local` with your Cosmic credentials
5. Run dev server: `bun run dev`

## Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind CSS for styling
- Add proper type definitions
- Include JSDoc comments for complex functions

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run type check: `bun run type-check`
4. Commit with descriptive message
5. Push to your fork
6. Open a Pull Request

## Testing

Before submitting a PR:
- Test all modified features
- Verify mobile responsiveness
- Check for TypeScript errors
- Ensure proper error handling

## Questions?

Open an issue for discussion before starting major changes.