# Testing Documentation

## Overview

This project uses **Jest** and **React Testing Library** for comprehensive UI testing. The testing setup ensures code quality, prevents regressions, and provides confidence in component behavior.

## Testing Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **ts-jest**: TypeScript preprocessor for Jest
- **jest-environment-jsdom**: DOM environment for testing

## Configuration

### Jest Configuration (`jest.config.mjs`)

```javascript
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
```

### Setup File (`jest.setup.ts`)

```typescript
import "@testing-library/jest-dom";
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- MenuItem.test.tsx
```

## Test Files Created

### UI Component Tests

#### 1. **MenuItem Component** (`src/components/layouts/LeftDrawer/__tests__/MenuItem.test.tsx`)

Tests:

- ✅ Renders label correctly
- ✅ Applies active styles when active prop is true
- ✅ Does not apply active styles when inactive
- ✅ Calls onClick handler when clicked

**Coverage**: 4 test cases

#### 2. **Button Component** (`src/components/ui/__tests__/Button.test.tsx`)

Tests:

- ✅ Renders button with text
- ✅ Applies default variant styles
- ✅ Applies secondary, ghost, outline, destructive variants
- ✅ Applies small and large size styles
- ✅ Handles click events
- ✅ Is disabled when disabled prop is true
- ✅ Does not call onClick when disabled
- ✅ Renders as child component with asChild prop
- ✅ Applies custom className

**Coverage**: 11 test cases

#### 3. **Badge Component** (`src/components/ui/__tests__/Badge.test.tsx`)

Tests:

- ✅ Renders badge with text
- ✅ Applies default, secondary, destructive, outline variants
- ✅ Applies custom className
- ✅ Renders with status dot

**Coverage**: 7 test cases

#### 4. **Input Component** (`src/components/ui/__tests__/Input.test.tsx`)

Tests:

- ✅ Renders input field
- ✅ Accepts and displays user input
- ✅ Applies custom className
- ✅ Is disabled when disabled prop is true
- ✅ Accepts different input types (email, password)
- ✅ Handles onChange events
- ✅ Handles onFocus and onBlur events
- ✅ Renders with default value
- ✅ Renders with controlled value

**Coverage**: 9 test cases

#### 5. **Theme Toggle** (`src/components/__tests__/theme-toggle.test.tsx`)

Tests:

- ✅ Renders theme toggle button
- ✅ Displays current theme icon
- ✅ Is clickable

**Coverage**: 3 test cases

### Utility Function Tests

#### 6. **cn Utility** (`src/lib/__tests__/utils.test.ts`)

Tests:

- ✅ Merges class names correctly
- ✅ Handles conditional classes
- ✅ Merges Tailwind classes correctly
- ✅ Handles undefined and null values
- ✅ Handles empty strings
- ✅ Handles arrays of classes
- ✅ Handles objects with boolean values
- ✅ Resolves Tailwind conflicts correctly
- ✅ Handles complex combinations

**Coverage**: 9 test cases

## Total Test Coverage

- **Total Test Files**: 6
- **Total Test Cases**: 43+
- **Components Tested**: 5 UI components + 1 utility function

## Testing Best Practices

### 1. **Test Structure**

```typescript
describe("ComponentName", () => {
  it("should do something specific", () => {
    // Arrange
    render(<Component />);

    // Act
    fireEvent.click(screen.getByText("Button"));

    // Assert
    expect(screen.getByText("Result")).toBeInTheDocument();
  });
});
```

### 2. **Query Priority**

Use queries in this order:

1. `getByRole` - Most accessible
2. `getByLabelText` - For form elements
3. `getByPlaceholderText` - For inputs
4. `getByText` - For non-interactive elements
5. `getByTestId` - Last resort

### 3. **Mocking**

```typescript
// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));

// Mock external libraries
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));
```

### 4. **Async Testing**

```typescript
it("handles async operations", async () => {
  render(<AsyncComponent />);

  // Wait for element to appear
  const element = await screen.findByText("Loaded");
  expect(element).toBeInTheDocument();
});
```

### 5. **User Interactions**

```typescript
import { fireEvent } from "@testing-library/react";

// Click
fireEvent.click(button);

// Type
fireEvent.change(input, { target: { value: "text" } });

// Focus/Blur
fireEvent.focus(input);
fireEvent.blur(input);
```

## Common Matchers

```typescript
// Existence
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// Visibility
expect(element).toBeVisible();
expect(element).not.toBeVisible();

// Disabled state
expect(button).toBeDisabled();
expect(button).toBeEnabled();

// Classes
expect(element).toHaveClass("className");

// Attributes
expect(element).toHaveAttribute("href", "/path");

// Text content
expect(element).toHaveTextContent("text");

// Values
expect(input).toHaveValue("value");
```

## Future Testing Additions

### Integration Tests

- [ ] Redux store integration tests
- [ ] API integration tests
- [ ] Form submission flows
- [ ] Navigation flows

### E2E Tests (Playwright/Cypress)

- [ ] Complete user journeys
- [ ] Multi-page workflows
- [ ] Authentication flows
- [ ] Data table interactions (filter, sort, paginate)

### Component Tests to Add

- [ ] DashboardHeader component
- [ ] DataTable component
- [ ] DataTableToolbar component
- [ ] Chart components
- [ ] Drawer components
- [ ] Custom hooks tests

## Continuous Integration

Add to CI/CD pipeline:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test -- --coverage
```

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## Troubleshooting

### Issue: Tests failing with module not found

**Solution**: Check `moduleNameMapper` in `jest.config.mjs` matches your `tsconfig.json` paths.

### Issue: TypeScript errors in test files

**Solution**: Ensure `@types/jest` is installed and `types` array in `tsconfig.json` includes `"jest"`.

### Issue: Next.js specific features not working

**Solution**: Use `next/jest` to automatically configure Jest for Next.js.

### Issue: Async tests timing out

**Solution**: Increase timeout or use `waitFor` from Testing Library.

```typescript
await waitFor(
  () => {
    expect(element).toBeInTheDocument();
  },
  { timeout: 3000 }
);
```

## Summary

This testing setup provides a solid foundation for maintaining code quality and preventing regressions. The combination of Jest and React Testing Library follows industry best practices and integrates seamlessly with Next.js and TypeScript.
