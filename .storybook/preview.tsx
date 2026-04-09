import type { Preview } from "@storybook/nextjs-vite"
import React from "react"
import "../src/app/globals.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Toggle between light and dark mode",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light"
      React.useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        document.documentElement.style.colorScheme = theme
      }, [theme])

      return (
        <div className="bg-background text-foreground h-full w-full px-6 py-12 font-sans">
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    layout: "fullscreen",
  },
}

export default preview
