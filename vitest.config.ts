// This project uses Node's built-in test runner (node --test), not Vitest.
// This config exists solely to prevent `npx vitest run` from failing with
// "No test suite found" when it auto-discovers *.test.cjs files that use
// `require('node:test')` instead of Vitest's test API.
//
// Canonical test command: npm test
export default {
  test: {
    include: [],
    passWithNoTests: true,
  },
}
