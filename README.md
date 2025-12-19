# AB COMPONENTS

# Requirements

- shadcn
- dayjs
- react-lucide

# Usage

1. Your css root where shadcn did it's initialization

```css
/* Should already be presented */
@import "tailwindcss";
@import "tw-animate-css";

@source "../../packages/components/calendar";

/* ... Rest of the rules */
```

2. Your `index.tsx` with Vite or any nearest to calendar usage client layout in nextjs

```typescript
// imports
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

// dayjs extension
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(localeData)
```
