// In this file we are simply creating context API that's it. 

// In layman terms context api
// Imagine you have a large family, and you want to share some news with everyone in the family. Instead of individually going to each family member and telling them the news, you can use a "family announcement board" where you write the news once, and everyone can read it from there.
// In React, the Context API acts like that family announcement board. It allows you to define a central place (context) where you can store data or state that needs to be accessed by multiple components.

import { createContext } from "react";

const noteContext = createContext();

export default noteContext;