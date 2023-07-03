### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
React is a frontend JS framework that allows for easy use of reusable components that conform HTML and logic into classes. It is very productive and quick to use.

- What is Babel?
Babel is what allows for the use of non JS like syntax to be translated into proper JS.

- What is JSX?
JSX is a way to write HTML like syntax and use it in React through Babel.

- How is a Component created in React?
A function that is created using JSX which will render said component's functionality and info.

- What are some difference between state and props?
Props are bits of information or arguments that can be passed into or through components, while state is what allows said info to be changed after intialy being rendered.

- What does "downward data flow" refer to in React?
I believe this refers to how there is a main parent like component, that can hold and pass down information to its smaller child like components.

- What is a controlled component?
Any form that React is in control of, where the form data is associated with state.

- What is an uncontrolled component?
Traditional forms, where form fields and their data are read on submits.

- What is the purpose of the `key` prop when rendering a list of components?
The key is what React uses properly identify or make changes to components.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
This is a bad idea due to repeating or duplicate keys.

- Describe useEffect.  What use cases is it used for in React components?
useEffect is a hook that is executed when a component is rendered, but also can be used to run at a different specific time. Timers or API calls are good use cases for useEffect.

- What does useRef do?  Does a change to a ref value cause a rerender of a component?
useRef is another hook that allows for a reference of something, allowing access to underlying DOM elements or allowing the ability to clear/set up timers. This persists across renders and is independant of state. 

- When would you use a ref? When wouldn't you use one?
As stated above, great for timers and accessing DOM elements. Only really used when state cannot be.

- What is a custom hook in React? When would you want to write one?
Custom hooks are non built in hooks that you write yourself. When you would use one is up to you really, best use cases are for shortening repetive code across different parts of a project.
