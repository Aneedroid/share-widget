# Shareo

Reusable and highly customisable notion share widget component in React + Storybook

## Philosophy behind structuring things this way

1. The share component needs to have as little logic as possible, in a way a ==dumb component==, meaning, it just renders. It dictates how the data needs to be structured so that this idea is maintained. All the majority of the logic needs to be handled from the consuming side. Having too much logic results in making a highly coupled component with little to no reusability and poor customisations.

2. ==No third party libraries== were used in making this. Did not want to bloat the component size by importing additional dependencies, every component was designed in house without the use of external dependencies.

3. Context API and other Redux based solutions (too heavy) -
   State is managed this way for a reason. React Context is designed to share data that can be considered “global” for a tree of React components. It is primarily used when some data needs to be accessible by many components at different nesting levels.
   Component reuse becomes increasingly difficult if not used sparingly. ==Component Composition== is used wherever necessary.

4. Basic keyboard navigation using divs is enabled. However, it can be made better by using ==customHooks== for keyboard events on down and up keys and handling the tabIndex and element focus programatically. NOTE: Usage of too much refs is NOT ideal too.

5. Include smaller reusable components as stories and add more control via props.

6. This codebase is structured in a way so that publishing it as an ==npm package== is easier in the future.

7. Need to cover Unit tests with jest.

## Development

```
npm install
npm build-storybook
npm storybook
```
