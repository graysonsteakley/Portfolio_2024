---
title: "Grayson Steakley - Setting Up My Astro Project: A Journey of Daily Learning"
pubDate: "May 26 2024"
description: "Join me as I embark on a daily blogging journey with Astro, sharing new learnings and discoveries each workday."
heroImage: "/blog-placeholder-1.jpg"
---

# About Me

Welcome to my first blog post! I am Grayson, Steakley, a software developer with 5 years of experience, primarily focused on frontend development for both enterprises and startups. My journey in software development has equipped me with a deep understanding of modern web technologies, and I'm always eager to learn and share my knowledge with others.

## A Daily Commitment to Learning

I am committed to posting a new blog every workday. This journey is not just about sharing my knowledge but also about pushing myself to learn something new each day. Whether it's a new technology, a coding challenge, or a development best practice, I will be documenting my findings and experiences here.

# Setting Up My Astro Project: A Journey of Daily Learning

I'm excited to share that I've recently set up my Astro project and will be using this platform to document my journey of learning something new every workday. I plan to spend 30 minutes - an hour in my downtime coding to learn and create potential small applications micro-sass.

## Why Astro?

Astro is an innovative framework that supports modern web development with a focus on performance and simplicity. It allows me to use MDX (Markdown with React components), making it easier to write and style my blog posts. The out-of-the-box support for MDX is one of the key reasons I chose Astro for my blogging needs.
The island architechture of interactivity works great for this mostly static site.

## Getting Started with Astro

Here’s a quick guide on how I set up my Astro project:

### Step 1: Install Astro

First, I installed Astro using the command line. Make sure you have Node.js installed on your machine.

```bash
npm create astro@latest
```

### Step 2: Set Up the Project

I followed the prompts to create a new project. I chose a starter template to get things up and running quickly.

### Step 3: Install Starting Dependencies

I used OOTB MDX files for blogging since astro has first class support with this.
I used Tailwind and Daisy UI for simple clean and modular components.

```bash
npm install @astrojs/mdx @astrojs/tailwind @tailwindcss/typography daisyui prettier prettier-plugin-astro tailwindcss
```

```ts
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: true,
      },
    }),
  ],
});
```
