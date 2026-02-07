"use client"

import { useCallback, useRef, useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number
}

export const AnimatedThemeToggler = ({
    className,
    duration = 400,
    ...props
}: AnimatedThemeTogglerProps) => {
    const { setTheme, resolvedTheme } = useTheme()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [mounted, setMounted] = useState(false)

    // Only show icons after client-side hydration to prevent mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = resolvedTheme === "dark"

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current) return

        const newTheme = isDark ? "light" : "dark"

        // @ts-ignore: startViewTransition is not yet in all TS definitions
        if (!document.startViewTransition) {
            // Fallback for browsers that don't support view transitions
            setTheme(newTheme)
            return
        }

        // @ts-ignore
        await document.startViewTransition(() => {
            flushSync(() => {
                setTheme(newTheme)
            })
        }).ready

        const { top, left, width, height } =
            buttonRef.current.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }, [isDark, duration, setTheme])

    // Render a placeholder during SSR to prevent hydration mismatch
    if (!mounted) {
        return (
            <button
                className={cn("relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground", className)}
                {...props}
            >
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            className={cn("relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground", className)}
            {...props}
        >
            {isDark ? <Sun /> : <Moon />}
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
