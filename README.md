# Bond Yield Calculator

A React Native application for calculating bond yields, including Current Yield, Yield to Maturity (YTM), and a full cash flow schedule. Supports English and Arabic (RTL) languages.

---

## Features

- **Current Yield** calculation
- **Yield to Maturity (YTM)** via bisection method (numerically stable)
- **Cash Flow Schedule** with payment dates, cumulative interest, and remaining principal
- **Price Status** detection: Premium / Discount / At Par
- **Annual & Semi-Annual** coupon frequency support
- **Bilingual**: English + Arabic with full RTL layout support
- **Input validation** with localized error messages
- **Dark theme** with a consistent design system

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.76.9 | Mobile framework |
| React | 18.3.1 | UI library |
| TypeScript | 5.0.4 | Type safety |
| i18next | ^25.8.18 | Internationalization |
| react-i18next | ^16.5.8 | React i18n bindings |
| react-native-safe-area-context | ^5.7.0 | Safe area handling |
| babel-plugin-module-resolver | ^5.0.3 | Path aliases |
| Husky | ^9.1.7 | Git pre-commit hooks |
| lint-staged | — | Auto-lint on commit |
| Jest | ^29.6.3 | Testing |
| ESLint | ^8.19.0 | Linting |
| Prettier | 2.8.8 | Code formatting |

---

## Project Structure

```
BondYieldCalculator/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CustomButton/
│   │   ├── CustomInput/
│   │   ├── CustomText/
│   │   ├── CustomTouchable/
│   │   ├── CustomView/
│   │   └── FrequencySelector/
│   ├── constants/               # Design system tokens
│   │   ├── colors.ts
│   │   └── spacing.ts
│   ├── i18n/                    # Internationalization
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── en.json
│   │       └── ar.json
│   ├── screens/
│   │   └── calculator/          # Main calculator screen
│   │       ├── BondCalculatorScreen.tsx
│   │       ├── BondCalculatorScreen.style.ts
│   │       ├── components/
│   │       │   ├── InputSection/
│   │       │   ├── ResultsSection/
│   │       │   └── CashFlowTable/
│   │       └── hooks/
│   │           ├── useBondCalculator.ts
│   │           └── types.ts
│   ├── types/
│   │   └── bond.types.ts        # Core TypeScript interfaces
│   └── utils/
│       └── bondCalculations.ts  # Calculation engine
├── App.tsx                      # Root component
├── index.js                     # Entry point
├── babel.config.js
├── tsconfig.json
├── metro.config.js
├── jest.config.js
├── app.json
└── package.json
```

---

## TypeScript Configuration

**File**: `tsconfig.json`

Extends `@react-native/typescript-config/tsconfig.json` with the following path aliases:

| Alias | Resolves To |
|---|---|
| `@components/*` | `src/components/*` |
| `@screens/*` | `src/screens/*` |
| `@hooks/*` | `src/screens/calculator/hooks/*` |
| `@types/*` | `src/types/*` |
| `@utils/*` | `src/utils/*` |
| `@constants/*` | `src/constants/*` |
| `@i18n/*` | `src/i18n/*` |

The same aliases are mirrored in `babel.config.js` via `babel-plugin-module-resolver` so they work at both compile time and runtime.

---

## Custom Components

### `CustomView`
Thin wrapper around React Native `View`. Base building block for all layouts.

### `CustomText`
Wrapper around React Native `Text` with automatic RTL support.
- Detects Arabic language via i18next
- Applies `writingDirection: 'rtl'` and `textAlign: 'right'` automatically
- All screen text uses this component

### `CustomTouchable`
Wrapper around `TouchableOpacity`. Base touchable for interactive elements.

### `CustomButton`
Primary action button built on `CustomTouchable`.

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Button label |
| `disabled` | `boolean` | Optional, dims button at 40% opacity |

- Height: 52px, border-radius: 10px
- Background: accent blue (`#3B82F6`)

### `CustomInput`
Numeric text input with label, prefix, and error display.

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Field label |
| `error` | `string` | Error message (optional) |
| `prefix` | `string` | Symbol shown inside input, e.g. `$`, `%` |
| `allowDecimal` | `boolean` | Whether decimals are allowed (default: `true`) |

- Tracks focus/blur state with visual feedback
- Error state turns border red
- RTL-aware prefix positioning

### `FrequencySelector`
Two-button toggle for selecting coupon frequency.

| Prop | Type | Description |
|---|---|---|
| `value` | `CouponFrequency` | Currently selected option |
| `onChange` | `(value: CouponFrequency) => void` | Change handler |

Options: `Annual` / `Semi-Annual`

---

## Screen Components

### `BondCalculatorScreen`
Main screen orchestrator. Contains:
- Header with title and language toggle
- `InputSection`
- `ResultsSection` (shown after calculation)
- `CashFlowTable` (shown after calculation)

Handles language switching via `i18n.changeLanguage()` and applies RTL layout dynamically.

### `InputSection`
Bond input form with five fields:
- Face Value (`$`)
- Market Price (`$`)
- Coupon Rate (`%`)
- Years to Maturity (integers only)
- Coupon Frequency (Annual / Semi-Annual)

Shows **Calculate** before first run, then **Recalculate** + **Reset** after.

### `ResultsSection`
Displays four result cards in a 2x2 grid:
1. Current Yield
2. Yield to Maturity (highlighted)
3. Total Interest Earned
4. Price Status (Premium / Discount / At Par) with amount difference

### `CashFlowTable`
Horizontally scrollable table showing the full payment schedule.

Columns: Period, Date, Payment, Cumulative Interest, Remaining Principal

- Alternating row colors
- Final (maturity) row highlighted in accent blue

---

## Hooks

### `useBondCalculator`
Central state management hook for the calculator screen.

**Returns:**

| Field | Type | Description |
|---|---|---|
| `inputs` | `BondInputs` | Current form values |
| `result` | `BondCalculationResult \| null` | Calculation output |
| `errors` | `Partial<Record<keyof BondInputs, string>>` | Validation errors |
| `isCalculated` | `boolean` | Whether a result is showing |
| `handleInputChange` | `(field, value) => void` | Update a field |
| `handleCalculate` | `() => void` | Validate + run calculation |
| `handleReset` | `() => void` | Clear all state |

**Validation rules:**
- Face Value: must be > 0
- Market Price: must be > 0
- Coupon Rate: must be between 0 and 100
- Years to Maturity: must be a positive integer

---

## Utility Functions

**File**: `src/utils/bondCalculations.ts`

### `calculateCurrentYield(faceValue, couponRate, marketPrice)`
```
Current Yield = (Annual Coupon / Market Price) × 100
```

### `calculateYTM(faceValue, marketPrice, couponRate, yearsToMaturity, frequency)`
Solves the bond pricing equation using the **bisection method** (2000 iterations, convergence threshold `< 0.00001`):
```
Price = Σ [coupon / (1+r)^t] + faceValue / (1+r)^n
```
Returns annualized YTM percentage.

### `buildCashFlowSchedule(faceValue, couponRate, yearsToMaturity, frequency)`
Generates one row per coupon period with payment dates, cumulative interest, and remaining principal.

### `calculateBond(...)`
Orchestrates all calculations and returns a `BondCalculationResult` with results + cash flow schedule.

### `formatCurrency(value)` / `formatPercent(value)`
Formatting helpers. Currency uses 2 decimal places; percent uses 4.

---

## TypeScript Interfaces

**File**: `src/types/bond.types.ts`

```ts
type CouponFrequency = 'annual' | 'semi-annual';

interface BondInputs {
  faceValue: string;
  couponRate: string;
  marketPrice: string;
  yearsToMaturity: string;
  couponFrequency: CouponFrequency;
}

interface BondResults {
  currentYield: number;
  ytm: number;
  totalInterestEarned: number;
  priceStatus: 'premium' | 'discount' | 'par';
  priceDifference: number;
}

interface CashFlowRow {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

interface BondCalculationResult {
  results: BondResults;
  cashFlowSchedule: CashFlowRow[];
}
```

---

## Design System

### Colors (`src/constants/colors.ts`) — Dark Theme

| Token | Value | Usage |
|---|---|---|
| `primary` | `#0A0E1A` | App background |
| `surface` | `#111827` | Card/section background |
| `surfaceElevated` | `#1C2535` | Elevated elements |
| `surfaceBorder` | `#2A3548` | Borders |
| `accent` | `#3B82F6` | Buttons, active states |
| `accentLight` | `#60A5FA` | Highlighted text |
| `accentDim` | `#1E3A5F` | Subtle blue backgrounds |
| `success` | green | Premium/positive status |
| `danger` | red | Discount/error states |
| `warning` | orange | At Par status |

### Spacing (`src/constants/spacing.ts`)

| Scale | px |
|---|---|
| xs | 4 |
| sm | 8 |
| md | 12 |
| lg | 16 |
| xl | 20 |
| xxl | 24 |
| xxxl | 32 |

Font sizes: xs(11), sm(13), md(15), lg(17), xl(20), xxl(24), xxxl(28)

Border radius: sm(6), md(10), lg(14), xl(20), full(9999)

---

## Internationalization

**i18next** with `compatibilityJSON: 'v4'`

| Language | Code | Direction |
|---|---|---|
| English | `en` | LTR |
| Arabic | `ar` | RTL |

**RTL handling:**
- `CustomText` auto-applies `writingDirection: 'rtl'` and `textAlign: 'right'` when language is Arabic
- `BondCalculatorScreen` flips `flexDirection` to `row-reverse` for RTL
- `CustomInput` positions prefix correctly for RTL
- `CashFlowTable` reverses row direction for RTL

Translation keys cover: header, input labels, button labels, frequency options, result labels, cash flow table headers, and all validation error messages.

---

## Styling Approach

- **React Native `StyleSheet`** — no third-party styling library
- Each component has a dedicated `.style.ts` file
- Styles reference design system tokens from `constants/`
- Dynamic styles are computed inline using arrays: `[styles.base, condition && styles.modifier]`
- All components are wrapped in `React.memo()` to prevent unnecessary re-renders

---

## Available Scripts

```bash
# Development
npm start              # Start Metro bundler
npm run start:clean    # Start with cache reset
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator

# Production builds
npm run ios:release    # iOS production build
npm run android:release  # Android release APK
npm run android:bundle   # Android App Bundle (.aab)

# Code quality
npm run lint           # Check for lint errors
npm run lint:fix       # Auto-fix lint errors

# Cleanup
npm run node:clean     # Remove node_modules
npm run ios:clean      # Clean iOS build
npm run android:clean  # Clean Android build

# Testing
npm test
```

---

## Git Hooks

**Husky** + **lint-staged** run ESLint automatically on every commit for `.js`, `.jsx`, `.ts`, `.tsx` files. Commits are blocked if lint errors exist.

---

## Getting Started

```bash
# Install dependencies
npm install

# iOS: install pods
cd ios && pod install && cd ..

# Start Metro
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

**Requirements:** Node >= 18, Xcode (iOS), Android Studio (Android)
