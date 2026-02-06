"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

export const MusicToggleButton = () => {
    const bars = 5;

    const PLAYLIST = [
        "https://res.cloudinary.com/dainr14h7/video/upload/v1770388387/Hollywood_Strings_Orchestra_-_Instrumental_Music_Ballroom_Dance_-_01-09_A_Summer_Place_ktkrbz.flac",
        "https://res.cloudinary.com/dainr14h7/video/upload/v1766161338/Justin_Hurwitz_-_Mia_Sebastian_s_Theme_djjrpc.flac",
        "https://res.cloudinary.com/dainr14h7/video/upload/v1766162950/Justin_Hurwitz_-_La_La_Land_Original_Motion_Picture_Soundtrack_-_01-07_Planetarium_qqnjii.flac",
    ];

    const CROSSFADE_DURATION = 4000; // 4 seconds
    const DEFAULT_VOLUME = 0.6;

    // State for the two channels
    const [indexA, setIndexA] = useState(0);
    const [indexB, setIndexB] = useState(1);
    const [volumeA, setVolumeA] = useState(DEFAULT_VOLUME);
    const [volumeB, setVolumeB] = useState(0);
    const [activeChannel, setActiveChannel] = useState<'A' | 'B'>('A');
    const [isPlaying, setIsPlaying] = useState(false);

    // Track if we are currently crossfading to avoid multiple triggers
    const [isCrossfading, setIsCrossfading] = useState(false);

    // Channel A Hook
    const [playA, { sound: soundA, pause: pauseA, stop: stopA }] = useSound(PLAYLIST[indexA], {
        volume: volumeA,
        loop: false,
    });

    // Channel B Hook
    const [playB, { sound: soundB, pause: pauseB, stop: stopB }] = useSound(PLAYLIST[indexB], {
        volume: volumeB,
        loop: false,
    });

    const getRandomHeights = () => {
        return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
    };

    const [heights, setHeights] = useState(getRandomHeights());

    // Monitor playback for crossfade
    useEffect(() => {
        if (!isPlaying || isCrossfading) return;

        const checkCrossfade = () => {
            const activeSound = activeChannel === 'A' ? soundA : soundB;
            if (!activeSound) return;

            const seek = activeSound.seek(); // Current position in seconds
            const duration = activeSound.duration(); // Total duration in seconds

            // If duration is unavailable or seek is invalid, skip
            if (!duration || typeof seek !== 'number') return;

            // Time remaining in milliseconds
            const timeRemaining = (duration - seek) * 1000;

            if (timeRemaining <= CROSSFADE_DURATION && timeRemaining > 0) {
                setIsCrossfading(true);
                triggerCrossfade();
            }
        };

        const intervalId = setInterval(checkCrossfade, 500);
        return () => clearInterval(intervalId);
    }, [isPlaying, isCrossfading, activeChannel, soundA, soundB]);

    const triggerCrossfade = () => {
        const fadeInterval = 100; // Update volume every 100ms
        const steps = CROSSFADE_DURATION / fadeInterval;
        const volumeStep = DEFAULT_VOLUME / steps;

        let currentStep = 0;

        // Determine which is current and which is next
        const fadingOutChannel = activeChannel;
        const fadingInChannel = activeChannel === 'A' ? 'B' : 'A';

        // Start playing the new channel (it should start at volume 0 based on state, but let's ensure)
        if (fadingInChannel === 'A') {
            setVolumeA(0);
            playA();
        } else {
            setVolumeB(0);
            playB();
        }

        const scaler = setInterval(() => {
            currentStep++;

            // Calculate new volumes
            const fadeOutVol = Math.max(0, DEFAULT_VOLUME - (volumeStep * currentStep));
            const fadeInVol = Math.min(DEFAULT_VOLUME, volumeStep * currentStep);

            if (fadingOutChannel === 'A') {
                setVolumeA(fadeOutVol);
                setVolumeB(fadeInVol);
            } else {
                setVolumeB(fadeOutVol);
                setVolumeA(fadeInVol);
            }

            if (currentStep >= steps) {
                clearInterval(scaler);

                // Crossfade complete
                setIsCrossfading(false);
                setActiveChannel(fadingInChannel);

                // Stop the previous track
                if (fadingOutChannel === 'A') {
                    stopA();
                    // Prepare next track for A (Current B index + 1)
                    // Note: indexB is the one currently playing now. 
                    // So we need the one AFTER indexB.
                    setIndexA((indexB + 1) % PLAYLIST.length);
                } else {
                    stopB();
                    // Prepare next track for B (Current A index + 1)
                    setIndexB((indexA + 1) % PLAYLIST.length);
                }
            }
        }, fadeInterval);
    };

    // Waveform visualizer
    useEffect(() => {
        if (isPlaying) {
            const waveformIntervalId = setInterval(() => {
                setHeights(getRandomHeights());
            }, 100);

            return () => {
                clearInterval(waveformIntervalId);
            };
        }
        setHeights(Array(bars).fill(0.1));
    }, [isPlaying]);

    const handleClick = () => {
        if (isPlaying) {
            pauseA();
            pauseB();
            setIsPlaying(false);
        } else {
            // Resume or Start
            if (activeChannel === 'A') {
                playA();
                // Ensure volume is correct (might be mid-fade if paused? Let's reset for simplicity or keep state)
                // If we paused mid-fade, this logic might be tricky. 
                // For now, assuming simple pause/resume.
            } else {
                playB();
            }
            setIsPlaying(true);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <motion.div
                onClick={handleClick}
                key="audio"
                initial={{ padding: "14px 14px " }}
                whileHover={{ padding: "18px 22px " }}
                whileTap={{ padding: "18px 22px " }}
                transition={{ duration: 1, bounce: 0.6, type: "spring" }}
                className="bg-background cursor-pointer rounded-full p-2 border shadow-lg"
            >
                <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                    }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", bounce: 0.35 }}
                    className="flex h-[18px] w-full items-center gap-1 rounded-full"
                >
                    {/* Waveform visualization */}
                    {heights.map((height, index) => (
                        <motion.div
                            key={index}
                            className="bg-foreground w-[1px] rounded-full"
                            initial={{ height: 1 }}
                            animate={{
                                height: Math.max(4, height * 14),
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 10,
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};
