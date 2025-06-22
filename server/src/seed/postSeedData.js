import mongoose from "mongoose";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const generatePosts = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/devsnap",
    );
    console.log("Connected to MongoDB");

    const users = await User.find();
    if (users.length === 0)
      throw new Error("No users found. Seed users first.");

    const sampleTitles = [
      "Mastering Async/Await in JavaScript",
      "Understanding React’s useEffect Hook",
      "The Role of TypeScript in Large Codebases",
      "Deploying Node.js Apps with PM2",
      "Optimizing Frontend Performance in 2025",
    ];

    const sampleTexts = [
      `Understanding async/await in JavaScript is essential for writing cleaner and more maintainable asynchronous code. Before promises and async/await, developers relied heavily on callback functions, leading to what's known as "callback hell." Async/await, introduced in ES2017, allows you to write asynchronous code that looks and behaves more like synchronous code. This not only improves readability but also makes debugging much simpler. When using async/await, it's crucial to handle errors properly using try/catch blocks, and always ensure that your async functions return promises. Additionally, avoid mixing async/await with .then() chains, as it can reduce clarity. Async functions always return a promise, so they integrate seamlessly with APIs that expect promises. Understanding the event loop and how JavaScript handles asynchronous operations under the hood can further deepen your mastery. Whether you're working with API calls, database queries, or file operations, async/await provides a robust foundation for modern JavaScript development.`,

      `React’s useEffect hook is one of the most powerful and frequently misunderstood tools in functional components. It runs side effects in your components, such as fetching data, subscribing to services, or manually changing the DOM. One key aspect to remember is that useEffect runs after every render by default, but you can control its execution using the dependency array. If the array is empty, the effect runs only once after the initial render. Including state or props in the array ensures the effect re-runs when they change. Forgetting dependencies or misusing them can lead to unexpected behavior or even infinite loops. Cleanup functions are also essential inside useEffect for tasks like removing subscriptions or clearing timers. Always be aware of stale closures, which happen when your effect references outdated variables. Proper understanding and use of useEffect lead to optimized and predictable React applications, especially when combined with tools like custom hooks or context API.`,

      `TypeScript is a statically typed superset of JavaScript that brings optional typing and powerful tooling to large-scale projects. It helps catch bugs at compile time and enables IDEs to provide richer autocomplete and inline documentation. In large codebases, TypeScript becomes invaluable for managing complex data structures, enforcing contracts via interfaces, and refactoring with confidence. It supports gradual adoption, meaning you can integrate it into existing JavaScript projects without needing to rewrite everything. Type inference, enums, generics, and utility types like Partial, Pick, and Record make code more expressive and robust. TypeScript also integrates well with popular frameworks like React, Angular, and Node.js. Its strict null checks, compile-time validations, and ability to define custom types improve code reliability and team collaboration. While the learning curve can be steep for new developers, the long-term productivity gains are undeniable, especially in growing teams and enterprise-level applications.`,

      `Deploying Node.js apps in production requires tools that ensure reliability, monitoring, and automatic restarts. PM2 (Process Manager 2) is one of the most widely used solutions for managing Node processes. It provides an easy-to-use CLI to start, stop, reload, and monitor applications. PM2 keeps your app alive forever with features like cluster mode for better performance on multi-core CPUs and built-in log management. It also supports ecosystem files where you can define app configs, environment variables, and restart policies. With PM2, deploying a Node.js server becomes more manageable, especially when combined with Git hooks or CI/CD pipelines. PM2 also integrates with services like Keymetrics for real-time monitoring and alerting. If you're deploying on VPS or bare-metal servers, PM2 is an essential tool in your deployment toolkit. Combine it with Nginx for reverse proxying and SSL, and you’ve got a solid production-ready stack.`,

      `Frontend performance directly impacts user experience, SEO, and retention. In 2025, with more advanced tooling and demanding applications, performance optimization has become even more critical. Developers now leverage tools like Webpack, Vite, and ESBuild to bundle and optimize code efficiently. Lazy loading components, code splitting, and tree shaking help reduce initial bundle sizes. Caching strategies, service workers, and HTTP/2 push significantly improve load times. Core Web Vitals — such as LCP, FID, and CLS — guide developers to make data-driven performance decisions. Use tools like Lighthouse and Chrome DevTools to audit and benchmark your app. Also, don't forget about image optimization, font loading strategies, and minimizing critical rendering path. Adopting server-side rendering (SSR) or static site generation (SSG) with frameworks like Next.js or Astro can further enhance perceived performance. Ultimately, keeping performance in mind throughout the development cycle leads to faster, more accessible, and scalable web apps.`,
    ];

    for (let i = 0; i < 50; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const dummyImage = `https://picsum.photos/seed/${i}/800/600`;

      const post = await Post.create({
        title: sampleTitles[i % sampleTitles.length],
        text: sampleTexts[i % sampleTexts.length],
        image: dummyImage,
        author: randomUser._id,
      });

      randomUser.posts.push(post._id);
      await randomUser.save();
    }

    console.log("✅ Successfully seeded posts and linked to users.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating posts:", error.message);
    process.exit(1);
  }
};

generatePosts();
