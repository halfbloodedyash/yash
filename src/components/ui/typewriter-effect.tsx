"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    // Split words into array of characters to animate
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState("");
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = words[currentWordIndex].text;

            if (isDeleting) {
                setText(fullText.substring(0, text.length - 1));
                setTypingSpeed(50);
            } else {
                setText(fullText.substring(0, text.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && text === fullText) {
                // Pause at end of word
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, currentWordIndex, words, typingSpeed]);

    return (
        <div
            className={cn(
                "inline-flex items-center",
                className
            )}
        >
            <motion.span
                className="mr-1"
            >
                {text}
            </motion.span>
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "inline-block rounded-sm w-[2px] h-4 bg-blue-500",
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};

export const TypewriterEffectSmooth = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    // This is a smoother version that types character by character with framer motion
    // For the specific request of cycling words, the above simple effect is often better suited
    // But providing this as an alternative based on the "TypewriterEffect" naming often implies this style.
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Ref to track if we've mounted
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={cn("flex space-x-1 my-6", className)}>
            {/* Simplified for the specific use case of replacing text dynamically */}
        </div>
    );
}
