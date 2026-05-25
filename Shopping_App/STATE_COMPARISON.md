# State Management Patterns Comparison

This document compares different state management approaches used in the Shopping App (Cove) and explains when to use each pattern.

---

## Summary Table

| Pattern | Complexity | Learning Curve | Best For | Used In This App |
|---------|-----------|-----------------|----------|-----------------|
| **Context API** | Low | Very Easy | Simple, app-level state | Auth, Wishlist |
| **Redux (Manual)** | High | Hard | Complex state logic, large apps | Cart management |
| **Redux Toolkit** | Medium | Moderate | Modern Redux, less boilerplate | Product list |
| **Redux Saga** | Very High | Very Hard | Complex async operations | Product fetching |
| **MobX** | Medium | Easy | Observable-based reactivity | Not used |
| **Recoil** | Low-Medium | Easy | Atomic state management | Not used |
| **Zustand** | Low | Very Easy | Lightweight, minimal boilerplate | Not used |

---

## Detailed Comparison

### 1. Context API

**What it is:**
React's built-in state management using `createContext`, `useContext`, and custom hooks.

**Example in this app:**
```ts
// src/context/auth-context.tsx
export const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    // mock delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({ id: '1', email, name: email.split('@')[0] });
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

**Pros:**
- ✅ Built-in to React (no dependencies)
- ✅ Easy to understand and implement
- ✅ Minimal boilerplate
- ✅ Good for simple, localized state
- ✅ Perfect for theme, auth, language preferences

**Cons:**
- ❌ Performance issues with large state updates (all consumers re-render)
- ❌ Can lead to "prop drilling" if not organized well
- ❌ No built-in dev tools or time-travel debugging
- ❌ Difficult to handle complex async operations

**When to use:**
- User authentication
- Theme/dark mode
- Language/locale selection
- Simple feature flags
- Any state that doesn't change frequently

**In This App:**
- `AuthContext` — user login state, profile data
- `WishlistContext` — simple toggle array

---

### 2. Redux (Manual)

**What it is:**
State management library with actions, reducers, and a centralized store. Manual implementation (no Redux Toolkit).

**Example in this app:**
```ts
// src/redux/cart/actions.ts
export const addToCart = (
  productId: string,
  name: string,
  price: number,
  color?: string,
  size?: string,
): AddItemAction => ({
  type: ADD_ITEM,
  payload: { productId, name, price, color, size },
});

// src/redux/cart/reducer.ts
export const cartReducer = (state = initialState, action: AnyAction): CartState => {
  switch (action.type) {
    case ADD_ITEM:
      // check if combo of productId+color+size exists
      if (existingItem) {
        return { items: [...state.items].map(...) };
      }
      return { items: [...state.items, newItem] };
    case REMOVE_ITEM:
      return { items: state.items.filter(...) };
    default:
      return state;
  }
};

// In a component:
const dispatch = useAppDispatch();
dispatch(addToCart(productId, name, price, color, size));
```

**Pros:**
- ✅ Excellent for learning state management fundamentals
- ✅ Predictable state changes (pure functions)
- ✅ Great for debugging (easy to trace action → state)
- ✅ Excellent TypeScript support
- ✅ Works well for medium-to-large apps

**Cons:**
- ❌ Boilerplate-heavy (actions, action types, reducer)
- ❌ Verbose for simple state
- ❌ Requires manual async handling (needs middleware like Saga)
- ❌ Steep learning curve
- ❌ Manual immutability management

**When to use:**
- Complex state logic with many actions
- Need for time-travel debugging
- Large team projects (consistency)
- State that changes based on user interactions
- Building predictable, testable state flows

**In This App:**
- Cart management — adding, removing, updating quantities
- All cart state changes are predictable and traceable

**Code pattern:**
```ts
// 1. Define action type
const ADD_ITEM = 'cart/ADD_ITEM';

// 2. Create action creator
export const addToCart = (...): Action => ({ type: ADD_ITEM, payload: {...} });

// 3. Handle in reducer
case ADD_ITEM: return { ...state, items: [...] };

// 4. Use in component
dispatch(addToCart(...));
```

---

### 3. Redux Toolkit

**What it is:**
Modern, opinionated Redux library that reduces boilerplate using `createSlice`, `createAsyncThunk`, and `configureStore`.

**Example in this app:**
```ts
// src/redux/products/productSlice.ts
const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Auto-generates actions: fetchProductsStart, fetchProductsSuccess, etc.
export const { fetchProductsStart, fetchProductsSuccess } = productSlice.actions;

// Selectors
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.loading;

export default productSlice.reducer;
```

**Pros:**
- ✅ Much less boilerplate than manual Redux
- ✅ Immer integration (mutate draft state directly)
- ✅ Built-in serialization support
- ✅ Better TypeScript support
- ✅ Scales well for large projects
- ✅ Official Redux recommendation (as of 2021)

**Cons:**
- ❌ Still requires learning Redux concepts
- ❌ Overkill for simple state
- ❌ Still requires middleware for async
- ❌ One more dependency

**When to use:**
- Complex application state
- Product/data lists that need filtering, sorting
- When you want Redux benefits with less boilerplate
- Modern React Native / React applications
- Any project that could outgrow simple Context API

**In This App:**
- Product list state — fetching, caching, errors
- `selectedProduct` for detail screen
- Loading/error handling

**Key difference from manual Redux:**
```ts
// Manual Redux: lots of files and boilerplate
// Redux Toolkit: single createSlice call

createSlice({
  name: 'products',
  initialState,
  reducers: { /* immutably mutate draft state */ },
});

// Automatically generates:
// - action creators
// - action types
// - reducer
// - selectors helpers
```

---

### 4. Redux Saga

**What it is:**
Middleware for Redux that handles side effects (async operations, API calls) using generator functions.

**Example in this app:**
```ts
// src/redux/sagas/productSaga.ts
function* fetchProductsSaga(): Generator<any, void, Product[]> {
  try {
    yield put(fetchProductsStart());
    const products = yield call(mockFetchProducts); // async call
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* watchProductSaga() {
  yield takeLatest(FETCH_PRODUCTS, fetchProductsSaga);
}

// In component:
useEffect(() => {
  dispatch({ type: FETCH_PRODUCTS });
}, []);
```

**Pros:**
- ✅ Excellent for complex async flows
- ✅ Handles race conditions (`takeLatest`, `takeEvery`)
- ✅ Centralized side effect logic
- ✅ Testable (pure generator functions)
- ✅ Great for handling multiple API calls

**Cons:**
- ❌ Very steep learning curve (generators, yield, effects)
- ❌ Overkill for simple API calls
- ❌ Can make code harder to follow
- ❌ Generator functions are not intuitive
- ❌ Redux Thunk is simpler alternative

**When to use:**
- Complex async operations with multiple steps
- Need to handle race conditions
- Polling, retries, timeouts
- Dependent API calls
- Large teams with heavy async logic

**In This App:**
- Fetching product list on app load
- Simulates 500ms API delay with `mockFetchProducts`
- Manages loading/error states during fetch

**Generator syntax:**
```ts
function* mySaga() {
  // yield put() → dispatch Redux action
  yield put(someAction());
  
  // yield call() → call async function
  const data = yield call(asyncFunction);
  
  // yield takeLatest() → listen for actions
  yield takeLatest(ACTION_TYPE, handleAction);
}
```

---

## Other Approaches (Not Used Here)

### MobX
- **Use when:** You prefer observable-based state
- **Pros:** Auto-tracking, less boilerplate, intuitive
- **Cons:** Harder to debug, less predictable
- **Example:** `@observable count = 0; @action increment() { this.count++ }`

### Recoil (Facebook)
- **Use when:** You want atomic, fine-grained reactivity
- **Pros:** Easy to learn, minimal boilerplate, good for large apps
- **Cons:** Still experimental, smaller ecosystem
- **Example:** Use `atoms` and `selectors` for granular state pieces

### Zustand
- **Use when:** You want lightweight state with Redux DevTools
- **Pros:** Very simple, minimal boilerplate, ~2KB
- **Cons:** Less ecosystem, not as powerful for complex flows
- **Example:** `const store = create((set) => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }))`

---

## Decision Tree

```
Is state simple & rarely changes?
├─ YES → Use Context API ✅
│   (auth, theme, preferences)
│
└─ NO → Does it need async operations?
    ├─ NO → Use Redux or Redux Toolkit
    │   ├─ Simple? → Redux Toolkit ✅
    │   └─ Learning exercise? → Manual Redux ✅
    │
    └─ YES → How complex is the async?
        ├─ Simple (single API call) → Redux Thunk
        ├─ Complex (multiple steps, race conditions) → Redux Saga ✅
        └─ Want simplicity? → Zustand + Tanstack Query
```

---

## Performance Comparison

| Approach | Renders on State Change | Developer Tools | Devtools Bundle Size |
|----------|----------------------|-----------------|----------------------|
| Context API | Entire subtree | None | 0KB |
| Manual Redux | Memoized selectors only | Redux DevTools | ~20KB |
| Redux Toolkit | Memoized selectors only | Redux DevTools | ~15KB |
| Redux Saga | Memoized selectors only | Redux DevTools | ~35KB |
| MobX | Fine-grained (tracked) | MobX DevTools | ~25KB |
| Zustand | Memoized selectors only | Zustand DevTools | ~2KB |

---

## In This App

### Architecture Summary
```
Root Provider Hierarchy:
ThemeProvider
└─ Redux Provider (configureStore)
   └─ AppProviders (Auth + Wishlist via Context)
      └─ Stack/Tabs
```

### State Breakdown
| State | Pattern | Why |
|-------|---------|-----|
| User auth, token | Context API | Simple, not deeply nested |
| Wishlist (array) | Context API | Simple toggle, no async |
| **Cart items** | **Redux (manual)** | **Complex state logic (add, remove, update), teaches fundamentals** |
| **Product list** | **Redux Toolkit** | **Moderate complexity, loading/error states, modern approach** |
| **Product fetch** | **Redux Saga** | **Async operation, learning generator functions** |

### Code Locations
- Context API: `src/context/auth-context.tsx`, `src/context/wishlist-context.tsx`
- Manual Redux: `src/redux/cart/` (types, actions, reducer, selectors)
- Redux Toolkit: `src/redux/products/productSlice.ts`
- Redux Saga: `src/redux/sagas/productSaga.ts`
- Store config: `src/redux/store.ts`

---

## Recommendations

1. **Start with Context API** if:
   - App is simple
   - State is co-located with components
   - No shared state across deep component trees

2. **Move to Redux Toolkit** when:
   - State becomes complex
   - Multiple actions affect same state
   - Need for debugging/DevTools
   - Multiple developers working on state

3. **Add Redux Saga** when:
   - Multiple async operations
   - Complex async flows
   - Race condition handling needed

4. **Consider Zustand** if:
   - You want Redux benefits with zero boilerplate
   - App doesn't need complex async middleware

---

## References

- [React Context API Docs](https://react.dev/reference/react/createContext)
- [Redux Docs](https://redux.js.org/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Redux Saga Docs](https://redux-saga.js.org/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Recoil Docs](https://recoiljs.org/)
