# React Performance Optimizations Demo

A comprehensive demonstration of React performance optimization techniques including `React.memo`, `useMemo`, `useCallback`, and the React Profiler API. This demonstartion helps with getting experience in senior level React programming.

## 📋 Overview

This project showcases best practices for optimizing React application performance. It demonstrates how to prevent unnecessary re-renders, memoize expensive computations, and measure component performance using React's built-in tools.

## ✨ Features

### Performance Optimization Techniques

- **React.memo** - Component memoization to prevent unnecessary re-renders
- **useMemo** - Memoization of expensive computations (filtering large lists)
- **useCallback** - Memoization of callback functions to maintain referential equality
- **React Profiler** - Performance measurement and monitoring

### Demo Components

- **ExpensiveList** - Demonstrates list rendering with filtering and memoization
- **ExpensiveListItem** - Individual list items wrapped with React.memo
- **ComplexComponent** - Shows custom comparison function with React.memo

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Andrew112/react-performance-optimizations-demo.git
cd react-performance-optimizations-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Understanding the Demo

The application includes:

1. **Counter Button** - Increment a counter to trigger re-renders and observe which components actually re-render
2. **Filter Dropdown** - Filter items by "All", "Even", or "Odd" to see memoization in action
3. **Profiler Toggle** - Enable/disable the React Profiler to measure performance
4. **Browser Console** - Check the console logs to see when components render

### Performance Observations

Open the browser console to see:
- When components re-render
- When expensive filtering operations occur
- Profiler reports showing render timings

Try the following:
- Click the "Increment" button and notice that the list doesn't re-render (thanks to React.memo and useCallback)
- Change the filter and observe that only the filtering operation runs (thanks to useMemo)
- Toggle the Profiler on/off to see detailed performance metrics in the console

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ComplexComponent.js      # Demo of React.memo with custom comparison
│   ├── ExpensiveList.js         # List component with useMemo filtering
│   └── ExpensiveListItem.js     # Memoized list item component
├── utils/
│   └── generateItems.js         # Utility to generate demo data
├── App.js                       # Main application component
├── index.js                     # Application entry point
└── styles.css                   # Global styles
```

## 🔍 Key Concepts Demonstrated

### 1. React.memo
Wraps components to prevent re-renders when props haven't changed:
```javascript
const ExpensiveListItem = React.memo(({ item, onClick }) => {
  // Component will only re-render if item or onClick changes
});
```

### 2. useMemo
Memoizes expensive computations:
```javascript
const filteredItems = useMemo(() => {
  return items.filter(item => filter === "all" || item.category === filter);
}, [items, filter]);
```

### 3. useCallback
Memoizes callback functions:
```javascript
const handleItemClick = useCallback((item) => {
  console.log("Item clicked:", item);
}, []);
```

### 4. React Profiler
Measures component render performance:
```javascript
<Profiler id="ExpensiveListProfiler" onRender={onRenderCallback}>
  <ExpensiveList />
</Profiler>
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## 📚 Learn More

### React Performance Documentation
- [Optimizing Performance](https://react.dev/learn/render-and-commit)
- [React.memo](https://react.dev/reference/react/memo)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [Profiler API](https://react.dev/reference/react/Profiler)

### Additional Resources
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://react.dev/)

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve this demo.

## 📝 License

This project is open source and available under the MIT License.
