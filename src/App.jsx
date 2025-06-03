import React, { useState, useEffect } from 'react';

// Define available functions and their properties
const functions = {
    horoscope: {
        key: 'horoscope',
        title: 'Ежедневный гороскоп',
        description: 'Получите короткий и позитивный гороскоп на сегодня, основанный на вашем знаке зодиака или общий прогноз. Если указано время рождения, дадим более глубокий анализ по категориям: Любовь, Карьера, Здоровье.',
        inputs: ['zodiacSign', 'userBirthTime'], // Added userBirthTime
        icon: '🌟',
        generateButtonText: 'Получить гороскоп'
    },
    compatibility: {
        key: 'compatibility',
        title: 'Совместимость имен',
        description: 'Узнайте совместимость вашего имени с именем партнера по следующим пунктам: Эмоциональная совместимость, Интеллектуальная совместимость, Физическая совместимость. Для каждого пункта дадим краткий анализ и конкретные советы.',
        inputs: ['userName', 'partnerName'],
        icon: '❤️',
        generateButtonText: 'Проверить совместимость'
    },
    compatibilityBirthDates: {
        key: 'compatibilityBirthDates',
        title: 'Совместимость по дате рождения',
        description: 'Получите анализ совместимости двух людей на основе их дат рождения. Разбейте анализ на пункты: Эмоциональная связь, Интеллектуальное взаимопонимание, Физическая гармония. Для каждого пункта дадим краткий анализ и конкретные советы.',
        inputs: ['userBirthDate', 'partnerBirthDate'],
        icon: '💞',
        generateButtonText: 'Проверить совместимость по дате рождения'
    },
    numerology: {
        key: 'numerology',
        title: 'Нумерологический прогноз',
        description: 'Получите нумерологический прогноз на день, основанный на вашем имени, с акцентом на удачу и возможности.',
        inputs: ['userName'],
        icon: '🔢',
        generateButtonText: 'Получить нумерологический прогноз'
    },
    affirmation: {
        key: 'affirmation',
        title: 'Ежедневная аффирмация',
        description: 'Получите вдохновляющую аффирмацию или мотивирующую цитату для позитивного настроя.',
        inputs: [],
        icon: '✨',
        generateButtonText: 'Получить аффирмацию'
    },
    funFact: {
        key: 'funFact',
        title: 'Эзотерический факт',
        description: 'Узнайте интересный и малоизвестный факт из мира эзотерики, астрологии или нумерологии.',
        inputs: [],
        icon: '📚',
        generateButtonText: 'Получить эзотерический факт'
    },
    dailyAdvice: {
        key: 'dailyAdvice',
        title: 'Совет дня',
        description: 'Получите мудрый совет, специфичный для текущего дня недели, для личностного роста или принятия решений.',
        inputs: [],
        icon: '💡',
        generateButtonText: 'Получить совет дня'
    },
    tarotCard: {
        key: 'tarotCard',
        title: 'Карта Таро дня',
        description: 'Вытяните карту Таро дня с кратким толкованием, соответствующим текущему дню недели. Можно выбрать расклад на одну или три карты.',
        inputs: ['tarotSpread'], // Added tarotSpread input
        icon: '🃏',
        generateButtonText: 'Получить карту Таро дня'
    },
    birthPrediction: {
        key: 'birthPrediction',
        title: 'Предсказание по дате рождения',
        description: 'Получите краткое предсказание или анализ личности, основанное на вашей дате рождения.',
        inputs: ['userBirthDate'],
        icon: '🎂',
        generateButtonText: 'Получить предсказание по дате рождения'
    },
    lunarCalendar: {
        key: 'lunarCalendar',
        title: 'Лунный календарь',
        description: 'Узнайте текущую фазу Луны и ее возможное влияние на сегодняшний день.',
        inputs: [],
        icon: '🌕',
        generateButtonText: 'Получить лунный календарь'
    },
    personalAmulet: {
        key: 'personalAmulet',
        title: 'Персональный амулет/талисман дня',
        description: 'Получите описание амулета или талисмана (камень, цвет, символ), который будет благоприятен для вас сегодня.',
        inputs: ['zodiacSign'],
        icon: '💎',
        generateButtonText: 'Получить амулет дня'
    },
    retrogradePlanets: {
        key: 'retrogradePlanets',
        title: 'Ретроградные планеты и их влияние',
        description: 'Узнайте о текущих ретроградных планетах и их общем влиянии на сегодняшний день.',
        inputs: [],
        icon: '🪐',
        generateButtonText: 'Узнать о ретроградных планетах'
    },
    dreamInterpretation: {
        key: 'dreamInterpretation',
        title: 'Толкование снов',
        description: 'Опишите ваш сон, и мы предложим возможное эзотерическое или психологическое толкование.',
        inputs: ['dreamDescription'],
        icon: '😴',
        generateButtonText: 'Истолковать сон'
    },
    astrologicalCalendar: {
        key: 'astrologicalCalendar',
        title: 'Астрологический календарь событий',
        description: 'Узнайте о предстоящих важных астрологических событиях и их краткое описание.',
        inputs: [],
        icon: '🗓️',
        generateButtonText: 'Показать события'
    },
    biorhythmCheck: {
        key: 'biorhythmCheck',
        title: 'Проверка биоритмов',
        description: 'Введите вашу дату рождения, чтобы получить информацию о текущих физическом, эмоциональном и интеллектуальном циклах.',
        inputs: ['userBirthDate'],
        icon: '📈',
        generateButtonText: 'Проверить биоритмы'
    },
    positiveFocus: {
        key: 'positiveFocus',
        title: 'Позитивный фокус дня',
        description: 'Получите тему или качество, на котором стоит сосредоточиться сегодня, с кратким объяснением, как это применить.',
        inputs: ['focusCategory'],
        icon: '🎯',
        generateButtonText: 'Получить фокус'
    },
    questionToUniverse: {
        key: 'questionToUniverse',
        title: 'Вопрос к Вселенной',
        description: 'Задайте простой вопрос, на который получите метафорический или аллегорический ответ для размышлений.',
        inputs: ['userQuestion'],
        icon: '🌌',
        generateButtonText: 'Задать вопрос'
    },
    archetypeOfDay: {
        key: 'archetypeOfDay',
        title: 'Архетип дня',
        description: 'Узнайте, энергии какого архетипа (например, Мудрец, Герой) наиболее актуальны для вас сегодня.',
        inputs: [],
        icon: '🎭',
        generateButtonText: 'Узнать архетип'
    }
};

// Define themes
const themes = {
    darkMagic: {
        name: 'Темная магия',
        gradient: 'from-gray-900 to-purple-900',
        cardBorder: 'border-purple-700',
        textColor: 'text-purple-200',
        inputBg: 'bg-gray-700 bg-opacity-50',
        inputBorder: 'border-gray-600',
        inputPlaceholder: 'placeholder-gray-400',
        inputFocusRing: 'focus:ring-purple-500',
        buttonBg: 'bg-purple-900 bg-opacity-30 hover:bg-purple-800 hover:bg-opacity-50', // More subtle, then slightly more opaque on hover
        buttonFocusRing: 'focus:ring-purple-600',
        secondaryButtonBg: 'bg-gray-700 hover:bg-gray-800',
        secondaryButtonFocusRing: 'focus:ring-gray-600',
        errorBg: 'bg-red-800 bg-opacity-30',
        errorBorder: 'border-red-700',
        errorText: 'text-red-300',
        loaderBorder: 'border-purple-500',
        h1Color: 'text-purple-300',
        h2Color: 'text-purple-300',
        pColor: 'text-gray-100',
        selectOptionBg: 'bg-gray-900',
        // Crystal Ball specific styles
        crystalBallBackground: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(128, 0, 128, 0.3) 30%, rgba(0,0,0,0.7) 100%), linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)',
        crystalBallAnimation: 'pulse-dark-glow',
        crystalBallShadowStart: 'inset 10px 10px 20px rgba(255, 255, 255, 0.05), inset -10px -10px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(128,0,128,0.6), 0 0 40px rgba(128,0,128,0.4)',
        crystalBallShadowEnd: 'inset 10px 10px 20px rgba(255, 255, 255, 0.05), inset -10px -10px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(128,0,128,0.8), 0 0 60px rgba(128,0,128,0.6)',
        textGlowColor: 'rgba(216, 180, 254, 0.8)', // purple-200 with opacity
        textGlowColorSecondary: 'rgba(216, 180, 254, 0.4)'
    },
    lightEnergy: {
        name: 'Светлая энергия',
        gradient: 'from-blue-100 to-indigo-300',
        cardBorder: 'border-blue-400',
        textColor: 'text-indigo-800',
        inputBg: 'bg-white bg-opacity-90',
        inputBorder: 'border-blue-300',
        inputPlaceholder: 'placeholder-blue-400',
        inputFocusRing: 'focus:ring-blue-500',
        buttonBg: 'bg-blue-300 bg-opacity-30 hover:bg-blue-400 hover:bg-opacity-50',
        buttonFocusRing: 'focus:ring-blue-400',
        secondaryButtonBg: 'bg-gray-300 hover:bg-gray-400',
        secondaryButtonFocusRing: 'focus:ring-gray-200',
        errorBg: 'bg-red-200 bg-opacity-70',
        errorBorder: 'border-red-300',
        errorText: 'text-red-700',
        loaderBorder: 'border-blue-500',
        h1Color: 'text-indigo-700',
        h2Color: 'text-indigo-700',
        pColor: 'text-gray-800',
        selectOptionBg: 'bg-white',
        // Crystal Ball specific styles
        crystalBallBackground: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(66, 153, 225, 0.6) 30%, rgba(255,255,255,0.9) 100%), linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
        crystalBallAnimation: 'pulse-light-glow',
        crystalBallShadowStart: 'inset 10px 10px 20px rgba(255, 255, 255, 0.3), inset -10px -10px 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(66,153,225,0.6), 0 0 40px rgba(66,153,225,0.4)',
        textGlowColor: 'rgba(66, 153, 225, 0.8)', // blue-500 with opacity
        textGlowColorSecondary: 'rgba(66, 153, 225, 0.4)'
    },
    cosmicBlues: {
        name: 'Космический блюз',
        gradient: 'from-blue-900 to-teal-900',
        cardBorder: 'border-teal-700',
        textColor: 'text-teal-200',
        inputBg: 'bg-blue-700 bg-opacity-40',
        inputBorder: 'border-blue-600',
        inputPlaceholder: 'placeholder-blue-300',
        inputFocusRing: 'focus:ring-teal-400',
        buttonBg: 'bg-teal-900 bg-opacity-30 hover:bg-teal-800 hover:bg-opacity-50',
        buttonFocusRing: 'focus:ring-teal-500',
        secondaryButtonBg: 'bg-blue-700 hover:bg-blue-800',
        secondaryButtonFocusRing: 'focus:ring-blue-600',
        errorBg: 'bg-red-700 bg-opacity-20',
        errorBorder: 'border-red-600',
        errorText: 'text-red-200',
        loaderBorder: 'border-teal-400',
        h1Color: 'text-teal-300',
        h2Color: 'text-teal-300',
        pColor: 'text-blue-100',
        selectOptionBg: 'bg-blue-900',
        // Crystal Ball specific styles
        crystalBallBackground: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 128, 128, 0.5) 30%, rgba(0,0,0,0.9) 100%), linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)',
        crystalBallAnimation: 'pulse-cosmic-glow',
        crystalBallShadowStart: 'inset 10px 10px 20px rgba(255, 255, 255, 0.1), inset -10px -10px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0,128,128,0.6), 0 0 40px rgba(0,128,128,0.4)',
        textGlowColor: 'rgba(129, 230, 217, 0.8)', // teal-200 with opacity
        textGlowColorSecondary: 'rgba(129, 230, 217, 0.4)'
    }
};

// CSS Keyframes for global animations
const GlobalStyles = () => (
    <style>
        {`
        @keyframes background-shift {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
        }

        .background-animated {
            background-size: 400% 400%; /* Make gradient larger than screen */
            animation: background-shift 15s infinite alternate; /* Slower, more subtle animation */
        }

        /* Pulsing glow animations for crystal ball */
        @keyframes pulse-dark-glow {
            0%, 100% { box-shadow: var(--crystal-ball-shadow-start); }
            50% { box-shadow: var(--crystal-ball-shadow-end); }
        }
        @keyframes pulse-light-glow {
            0%, 100% { box-shadow: var(--crystal-ball-shadow-start); }
            50% { box-shadow: var(--crystal-ball-shadow-end); }
        }
        @keyframes pulse-cosmic-glow {
            0%, 100% { box-shadow: var(--crystal-ball-shadow-start); }
            50% { box-shadow: var(--crystal-ball-shadow-end); }
        }

        /* Inner fog animation */
        @keyframes fog-move {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; } /* Increased base opacity */
            50% { transform: translate(-45%, -55%) scale(1.05); opacity: 0.5; } /* Increased peak opacity */
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        }

        /* Prediction text reveal */
        @keyframes text-reveal {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        /* Background star animation */
        @keyframes star-field-pan {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
        }

        /* Northern Lights specific animations */
        @keyframes aurora-move {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
        }

        @keyframes aurora-color {
            0% { filter: hue-rotate(0deg); opacity: 0.5; }
            50% { filter: hue-rotate(180deg); opacity: 0.8; }
            100% { filter: hue-rotate(360deg); opacity: 0.5; }
        }

        .crystal-ball {
            width: min(70vw, 600px); /* Max 600px, 70vw for responsiveness */
            height: min(70vw, 600px); /* Ensure it's always a square, maintaining circularity */
            border-radius: 9999px; /* Force rounded-full */
            flex-shrink: 0; /* Prevent shrinking */
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; /* Centered content vertically */
            overflow: hidden; /* Crucial for maintaining circular shape and clipping content */
            transition: all 0.5s ease-in-out; /* Smooth transitions for theme changes */
            z-index: 1; /* Ball is now the primary element */
            margin-bottom: 0; /* No margin needed without stand */
            backdrop-filter: blur(5px); /* Distortion effect */
            filter: url(#noiseFilter); /* Micro-cracks/imperfections */
        }

        .crystal-ball.touch-active {
            transform: scale(1.02);
            box-shadow: 0 0 40px rgba(255,255,255,0.3), var(--crystal-ball-shadow-start); /* Enhanced glow on touch */
        }

        .crystal-ball-content-wrapper {
            flex-grow: 0; /* Ensures content does not stretch, relies on justify-content: center */
            width: 100%; /* Take full width of parent flex item */
            max-width: 80%; /* Increased content width relative to ball */
            height: 100%; /* Ensure it takes full height for scrolling */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; /* Centered content vertically */
            padding: 1rem; /* Padding for content inside the ball */
            overflow-y: auto; /* Allow vertical scrolling if content overflows */
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
            margin: 0 auto; /* Center horizontally */
            /* Hide scrollbar */
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
            position: relative; /* For z-index of content */
            z-index: 10; /* Content above internal effects */
        }
        .crystal-ball-content-wrapper::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }

        /* Fade-out effect for scrollable content */
        /* This mask is now applied to a specific div containing only the text content */
        .fade-out-mask-text {
            mask-image: linear-gradient(to bottom, black 80%, transparent 95%); /* Adjusted for more subtle fade */
            -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 95%);
        }


        .inner-fog {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 150%;
            height: 150%;
            border-radius: 50%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%); /* Slightly more opaque base for fog */
            animation: fog-move 15s infinite ease-in-out alternate;
            z-index: 5;
        }

        .prediction-text-reveal {
            animation: text-reveal 1s ease-out forwards;
        }

        /* Adjustments for carousel */
        .carousel-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow-x: hidden; /* Ensure hidden elements are not visible */
        }

        .carousel-track {
            display: flex;
            height: 100%;
            width: 100%; /* Each page takes full width of the track */
            transition: transform 0.5s ease-in-out; /* Smooth slide animation */
        }

        .carousel-page {
            flex-shrink: 0; /* Prevent pages from shrinking */
            width: 100%;
            height: 100%;
            display: flex; /* Changed to flex for better centering of single item */
            align-items: center; /* Center item vertically */
            justify-content: center; /* Center item horizontally */
            padding: 0.5rem; /* Reduced padding for the page to maximize button size */
            box-sizing: border-box; /* Include padding in width calculation */
        }

        /* Responsive adjustments for buttons */
        .carousel-page button {
            width: 180px; /* Default width for mobile */
            height: 250px; /* Default height for mobile */
            padding: 0.8rem; /* Adjusted padding for smaller card */
            font-size: 0.9rem; /* Base font size */
            border: 1px solid; /* Add a subtle border */
            backdrop-filter: blur(3px); /* Add a subtle blur effect */
            -webkit-backdrop-filter: blur(3px); /* For Safari */
            transition: all 0.3s ease-in-out; /* Smooth transitions */
            display: flex; /* Make it a flex container */
            flex-direction: column; /* Stack content vertically */
            align-items: center; /* Changed to center for vertical centering */
            justify-content: center; /* Changed to center for horizontal centering */
            text-align: center; /* Ensure text is centered */
            overflow-y: auto; /* Allow vertical scrolling if content overflows */
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
            box-sizing: border-box; /* Ensure padding is included in width/height */
            flex-shrink: 0; /* Explicitly prevent shrinking */
            flex-grow: 0; /* Changed to 0, or removed, to rely on fixed dimensions */
        }

        @media (min-width: 640px) { /* Styles for small screens and up (sm breakpoint) */
            .carousel-page button {
                width: 234px; /* Larger width for desktop (180 * 1.3) */
                height: 325px; /* Larger height for desktop (250 * 1.3) */
                padding: 1rem; /* Adjusted padding for larger card */
                font-size: 1rem; /* Larger font size */
            }
        }

        .carousel-page button::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }

        .carousel-page button span:first-child { /* Icon */
            font-size: 1.8rem; /* Adjusted icon size for mobile */
            margin-bottom: 0.4rem; /* Space between icon and title */
        }
        @media (min-width: 640px) {
            .carousel-page button span:first-child {
                font-size: 2rem; /* Larger icon size for desktop */
            }
        }

        .carousel-page button span:nth-child(2) { /* Title */
            font-size: 0.9rem; /* Adjusted title size for mobile */
            font-weight: bold;
            margin-bottom: 0.4rem; /* Space between title and description */
            line-height: 1.2;
            width: 100%; /* Ensure it takes full width for left alignment */
        }
        @media (min-width: 640px) {
            .carousel-page button span:nth-child(2) {
                font-size: 1rem; /* Larger title size for desktop */
            }
        }

        .carousel-page button span:last-child { /* Description */
            font-size: 0.7rem; /* Adjusted description size for mobile */
            line-height: 1.4;
            opacity: 0.9; /* Slightly less prominent */
            width: 100%; /* Ensure it takes full width for left alignment */
        }
        @media (min-width: 640px) {
            .carousel-page button span:last-child {
                font-size: 0.75rem; /* Larger description size for desktop */
            }
        }


        .carousel-page button:hover {
            transform: scale(1.02); /* Slightly less scale on hover for large button */
            box-shadow: 0 0 25px var(--button-glow-color); /* Stronger glow on hover */
        }

        /* Theme specific button styles */
        .theme-darkMagic .carousel-page button {
            border-color: rgba(128, 0, 128, 0.6);
            --button-glow-color: rgba(128,0,128,0.8);
        }

        .theme-lightEnergy .carousel-page button {
            border-color: rgba(66, 153, 225, 0.6);
            --button-glow-color: rgba(66,153,225,0.8);
        }

        .theme-cosmicBlues .carousel-page button {
            border-color: rgba(0, 128, 128, 0.6);
            --button-glow-color: rgba(0,128,128,0.8);
        }

        /* Adjustments for input/result view elements */
        .crystal-ball-content-wrapper h2 { /* Function Title in input/details view */
            font-size: 1.25rem; /* Further reduced from 1.35rem */
            line-height: 1.2;
            margin-bottom: 0.8rem; /* Further reduced margin */
            text-shadow: 0 0 5px rgba(255,255,255,0.7); /* Added text shadow */
        }
        @media (min-width: 640px) {
            .crystal-ball-content-wrapper h2 {
                font-size: 1.6rem; /* Adjusted for sm breakpoint, slightly smaller than before */
            }
        }

        .crystal-ball-content-wrapper p { /* Description in details view, generated content */
            font-size: 0.85rem; /* Further reduced from 0.9rem */
            line-height: 1.6; /* Slightly looser line height for better readability */
            margin-bottom: 1rem; /* Further reduced margin */
            text-shadow: 0 0 10px var(--text-glow-color), 0 0 20px var(--text-glow-color-secondary); /* Dynamic glow */
        }
        @media (min-width: 640px) {
            .crystal-ball-content-wrapper p {
                font-size: 0.95rem; /* Adjusted for sm breakpoint */
            }
        }

        .crystal-ball-content-wrapper label { /* Input labels */
            font-size: 0.75rem; /* Further reduced from 0.8rem */
            margin-bottom: 0.15rem; /* Further reduced margin */
        }

        .crystal-ball-content-wrapper input,
        .crystal-ball-content-wrapper textarea,
        .crystal-ball-content-wrapper select { /* Input fields */
            padding: 0.35rem 0.5rem; /* Further reduced padding */
            font-size: 0.8rem; /* Further reduced font size for inputs */
        }
        @media (min-width: 640px) {
            .crystal-ball-content-wrapper input,
            .crystal-ball-content-wrapper textarea,
            .crystal-ball-content-wrapper select {
                padding: 0.5rem 0.75rem; /* Slightly more padding for desktop */
                font-size: 0.9rem; /* Slightly reduced font size */
            }
        }

        .crystal-ball-content-wrapper button { /* Buttons in input/result view */
            padding: 0.5rem 0.9rem; /* Further reduced padding */
            font-size: 0.8rem; /* Further reduced font size */
        }
        @media (min-width: 640px) {
            .crystal-ball-content-wrapper button {
                padding: 0.65rem 1.1rem; /* Slightly more padding for desktop */
                font-size: 0.9rem; /* Slightly reduced font size */
            }
        }

        .crystal-ball-content-wrapper .grid {
            gap: 0.7rem; /* Further reduced gap between input fields */
            margin-bottom: 1rem; /* Further reduced margin below input grid */
        }

        .crystal-ball-content-wrapper .flex.flex-col.sm\\:flex-row {
            gap: 0.5rem; /* Further reduced gap between buttons */
            margin-bottom: 1rem; /* Further reduced margin below button group */
        }

        /* Removed the specific styling for the generated content box */
        /* .crystal-ball-content-wrapper .bg-gray-800 {
            padding: 0.9rem;
        } */

        /* Custom styles for carousel arrows */
        .carousel-arrow-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            padding: 0.75rem; /* Increased padding for better touch target */
            border-radius: 9999px; /* Full rounded */
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-in-out;
            border: 1px solid; /* Add a subtle border */
            backdrop-filter: blur(5px); /* Stronger blur for a mystical feel */
            -webkit-backdrop-filter: blur(5px); /* For Safari */
        }

        .carousel-arrow-button:hover {
            transform: translateY(-50%) scale(1.1); /* Slightly larger on hover */
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); /* Subtle white glow on hover */
        }

        .carousel-arrow-button.left-arrow {
            left: 0.5rem; /* Position from left */
        }

        .carousel-arrow-button.right-arrow {
            right: 0.5rem; /* Position from right */
        }

        .carousel-arrow-svg {
            width: 1.5rem; /* Size of the SVG icon */
            height: 1.5rem;
        }

        /* Theme specific arrow styles */
        .theme-darkMagic .carousel-arrow-button {
            background-color: rgba(128, 0, 128, 0.2); /* Purple with transparency */
            border-color: rgba(128, 0, 128, 0.6);
            color: #d8b4fe; /* Light purple text */
        }
        .theme-darkMagic .carousel-arrow-button:hover {
            background-color: rgba(128, 0, 128, 0.4);
        }

        .theme-lightEnergy .carousel-arrow-button {
            background-color: rgba(66, 153, 225, 0.2); /* Blue with transparency */
            border-color: rgba(66, 153, 225, 0.6);
            color: #4299e1; /* Light blue text */
        }
        .theme-lightEnergy .carousel-arrow-button:hover {
            background-color: rgba(66, 153, 225, 0.4);
        }

        .theme-cosmicBlues .carousel-arrow-button {
            background-color: rgba(0, 128, 128, 0.2); /* Teal with transparency */
            border-color: rgba(0, 128, 128, 0.6);
            color: #81e6d9; /* Light teal text */
        }
        .theme-cosmicBlues .carousel-arrow-button:hover {
            background-color: rgba(0, 128, 128, 0.4);
        }

        /* Styles for the function list modal */
        .function-list-modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 1); /* Made fully opaque */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 50;
            padding: 1rem;
        }

        .function-list-modal {
            background-color: var(--modal-bg-color); /* Use CSS variable for theme-specific color */
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            padding: 1.5rem;
            text-align: center;
            border: 1px solid var(--modal-border-color); /* Use CSS variable for theme-specific color */
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            opacity: 1; /* Explicitly set to 1 to ensure full opacity */
        }

        .function-list-modal h3 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
            color: var(--modal-h3-color); /* Use CSS variable for theme-specific color */
        }

        .function-list-modal-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* Responsive grid */
            gap: 0.75rem;
            padding-bottom: 1rem; /* Space for scrollbar */
        }

        .function-list-modal-grid button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0.75rem;
            border-radius: 0.5rem;
            background-color: var(--modal-button-bg); /* Use CSS variable for theme-specific color */
            color: var(--modal-button-text-color); /* Use CSS variable for theme-specific color */
            font-size: 0.8rem;
            font-weight: 500;
            text-align: center;
            transition: all 0.2s ease-in-out;
            border: 1px solid var(--modal-button-border); /* Use CSS variable for theme-specific color */
            height: 100px; /* Fixed height for uniformity */
        }

        .function-list-modal-grid button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            background-color: var(--modal-button-hover-bg); /* Use CSS variable for theme-specific color */
        }

        .function-list-modal-grid button span:first-child {
            font-size: 1.8rem;
            margin-bottom: 0.25rem;
        }

        .function-list-modal-grid button span:nth-child(2) {
            line-height: 1.2;
        }

        .function-list-modal-close-button {
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            background-color: var(--modal-close-button-bg); /* Use CSS variable for theme-specific color */
            color: white;
            font-weight: bold;
            transition: all 0.2s ease-in-out;
        }

        .function-list-modal-close-button:hover {
            background-color: var(--modal-close-button-hover-bg); /* Use CSS variable for theme-specific color */
            transform: scale(1.05);
        }

        /* Theme specific modal styles */
        .theme-darkMagic .function-list-modal {
            --modal-bg-color: #1a202c; /* gray-900 */
            --modal-border-color: #6b46c1; /* purple-700 */
            --modal-h3-color: #d8b4fe; /* purple-300 */
            --modal-button-bg: #4a004a; /* Darker purple for buttons */
            --modal-button-text-color: #d8b4fe;
            --modal-button-border: #800080;
            --modal-button-hover-bg: #6b006b;
            --modal-close-button-bg: #4a5568; /* gray-700 */
            --modal-close-button-hover-bg: #2d3748; /* gray-800 */
        }

        .theme-lightEnergy .function-list-modal {
            --modal-bg-color: #ffffff;
            --modal-border-color: #63b3ed; /* blue-400 */
            --modal-h3-color: #3182ce; /* blue-600 */
            --modal-button-bg: #e0f2fe; /* Light blue for buttons */
            --modal-button-text-color: #2b6cb0; /* blue-700 */
            --modal-button-border: #90cdf4;
            --modal-button-hover-bg: #bfdbfe;
            --modal-close-button-bg: #a0aec0; /* gray-400 */
            --modal-close-button-hover-bg: #718096; /* gray-500 */
        }

        .theme-cosmicBlues .function-list-modal {
            --modal-bg-color: #0a192f; /* Darker blue */
            --modal-border-color: #38b2ac; /* teal-500 */
            --modal-h3-color: #81e6d9; /* teal-300 */
            --modal-button-bg: #0f3460; /* Darker blue for buttons */
            --modal-button-text-color: #81e6d9;
            --modal-button-border: #38b2ac;
            --modal-button-hover-bg: #1a4e8c;
            --modal-close-button-bg: #2c5282; /* blue-700 */
            --modal-close-button-hover-bg: #2a4365; /* blue-800 */
        }

        /* Background elements (stars/particles) */
        .background-elements {
            position: fixed;
            inset: 0;
            z-index: 0;
            /* Base stars */
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.8)" /><circle cx="50" cy="50" r="0.5" fill="rgba(255,255,255,0.6)" /><circle cx="90" cy="20" r="0.7" fill="rgba(255,255,255,0.7)" /><circle cx="30" cy="80" r="0.6" fill="rgba(255,255,255,0.5)" /></svg>') repeat;
            background-size: 200px 200px; /* Larger pattern for slower movement */
            animation: star-field-pan 60s linear infinite; /* Slower animation */
            opacity: 0.3;
        }

        .background-elements.layer-2 {
            background-size: 150px 150px; /* Smaller pattern for faster movement (closer) */
            animation: star-field-pan 45s linear infinite; /* Faster animation */
            opacity: 0.2;
            transform: scale(1.1); /* Slightly larger to enhance depth */
        }

        .background-elements.layer-3 {
            background-size: 100px 100px; /* Even smaller/faster */
            animation: star-field-pan 30s linear infinite;
            opacity: 0.15;
            transform: scale(1.2);
        }

        /* Northern Lights background layer */
        .northern-lights-bg {
            position: fixed;
            inset: 0;
            z-index: 5; /* Between stars and crystal ball */
            background: linear-gradient(
                to right,
                rgba(0, 255, 0, 0.1), /* Green */
                rgba(0, 200, 255, 0.1), /* Cyan */
                rgba(150, 0, 255, 0.1), /* Purple */
                rgba(0, 200, 255, 0.1),
                rgba(0, 255, 0, 0.1)
            );
            background-size: 300% 300%; /* Large background for smooth movement */
            animation: aurora-move 40s linear infinite, aurora-color 20s ease-in-out infinite alternate;
            filter: blur(50px) brightness(1.2); /* Heavy blur for ethereal glow */
            opacity: 0.4; /* Base opacity */
            pointer-events: none; /* Allow clicks to pass through */
        }

        /* Vignette effect */
        .vignette {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 75%);
            z-index: 40;
            pointer-events: none; /* Allows clicks to pass through */
        }

        /* Full content modal styles */
        .full-content-modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.9); /* Opaque background */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 60; /* Higher than other modals */
            padding: 1rem;
        }

        .full-content-modal {
            background-color: var(--modal-bg-color);
            border-radius: 0.75rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            max-width: 700px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 2rem;
            text-align: left; /* Align text left for better readability */
            border: 1px solid var(--modal-border-color);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .full-content-modal p {
            font-size: 1rem; /* Standard font size for full content */
            line-height: 1.7; /* Good line height for readability */
            color: var(--modal-text-color); /* Use theme text color */
            text-shadow: none; /* No glow effect for plain text */
            overflow-wrap: break-word; /* Ensure long words break */
        }
        .full-content-modal::-webkit-scrollbar {
            width: 8px;
        }
        .full-content-modal::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
        }
        .full-content-modal::-webkit-scrollbar-thumb {
            background: var(--modal-scrollbar-thumb);
            border-radius: 10px;
        }

        /* Theme specific modal text colors */
        .theme-darkMagic .full-content-modal {
            --modal-text-color: #d8b4fe; /* purple-200 */
            --modal-scrollbar-thumb: #800080; /* purple */
        }
        .theme-lightEnergy .full-content-modal {
            --modal-text-color: #2d3748; /* gray-800 */
            --modal-scrollbar-thumb: #4299e1; /* blue */
        }
        .theme-cosmicBlues .full-content-modal {
            --modal-text-color: #e0f2f2; /* teal-100 */
            --modal-scrollbar-thumb: #008080; /* teal */
        }

        `}
    </style>
);


// Массив сообщений загрузки (расширенный)
const loadingMessages = [
    "Анализирую звезды...",
    "Заглядываю в хрустальный шар...",
    "Расшифровываю древние письмена...",
    "Соединяюсь с космическими энергиями...",
    "Визуализирую будущее...",
    "Концентрирую магическую силу...",
    "Шепчу заклинания...",
    "Перебираю карты судьбы...",
    "Настраиваюсь на ваш вопрос...",
    "Ищу ваш внутренний архетип...",
    "Формирую позитивный фокус...",
    "Открываю портал к знаниям...",
    "Считываю энергетические потоки...",
    "Жду ответа от мироздания...",
    "Пробуждаю древнюю мудрость...",
    "Собираю космическую пыль для предсказания...",
    "Настраиваю частоты сознания...",
    "Призываю космическую энергию...",
    "Гармонизирую потоки судьбы...",
    "Изучаю древние руны...",
    "Наполняю сферу мудростью..."
];

// Thematic error messages
const thematicErrorMessages = {
    zodiacSign: "Звезды молчат без вашего знака зодиака. Выберите его, чтобы раскрыть тайны!",
    userName: "Имя — ключ к вашей судьбе. Введите его, чтобы начать предсказание!",
    partnerName: "Для гармонии двух душ нужны оба имени. Введите имя партнера!",
    userBirthDate: "Дата рождения — это ваш личный код. Введите её, чтобы я мог заглянуть глубже!",
    partnerBirthDate: "Для проверки совместимости нужны обе даты рождения. Введите их, и я покажу вам путь!",
    dreamDescription: "Мир снов ждет толкования! Опишите ваш сон, чтобы я мог его расшифровать.",
    tarotSpread: "Карты Таро ждут вашего выбора. Выберите расклад, чтобы узнать судьбу!",
    focusCategory: "Чтобы сфокусировать энергию, мне нужна цель. Выберите категорию!",
    userQuestion: "Вселенная ждет вашего вопроса. Сформулируйте его, чтобы получить ответ!",
    unknownFunction: "Мой хрустальный шар не видит такой функции. Пожалуйста, выберите из известных путей.",
    apiError: "Космические потоки нестабильны. Попробуйте еще раз, возможно, энергии скоро выровняются."
};

// Full Content Modal Component
const FullContentModal = ({ content, onClose, theme }) => {
    return (
        <div className="full-content-modal-overlay">
            <div className={`full-content-modal ${theme}`} style={{ backgroundColor: `var(--modal-bg-color)`, borderColor: `var(--modal-border-color)` }}>
                <h3 className={`text-xl font-bold mb-4 ${themes[theme].h2Color}`}>Полный прогноз:</h3>
                <p className={`${themes[theme].pColor}`}>
                    {content}
                </p>
                <button
                    onClick={onClose}
                    className={`
                        ${themes[theme].secondaryButtonBg}
                        text-white font-bold py-2 px-4 rounded-lg shadow-lg
                        transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 ${themes[theme].secondaryButtonFocusRing} focus:ring-opacity-75
                        mt-4 self-center
                    `}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
};


// Main App component
const App = () => {
    const [userName, setUserName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [zodiacSign, setZodiacSign] = useState('');
    const [userBirthDate, setUserBirthDate] = useState('');
    const [userBirthTime, setUserBirthTime] = useState('');
    const [partnerBirthDate, setPartnerBirthDate] = useState('');
    const [dreamDescription, setDreamDescription] = useState('');
    const [tarotSpread, setTarotSpread] = useState('');
    const [focusCategory, setFocusCategory] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [contentKey, setContentKey] = useState(0);
    const [currentView, setCurrentView] = useState('mainMenu');
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [currentTheme, setCurrentTheme] = useState('darkMagic');
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [showAbout, setShowAbout] = useState(false);
    const [showFunctionListModal, setShowFunctionListModal] = useState(false);
    const [isCrystalBallActive, setIsCrystalBallActive] = useState(false); // For touch effect
    const [contentFontSizeClass, setContentFontSizeClass] = useState('text-base'); // Dynamic font size state
    const [showFullContentModal, setShowFullContentModal] = useState(false); // New state for "read more" modal

    // Carousel state for infinite scroll
    const actualFunctions = Object.values(functions);
    // Add clones for seamless looping: [last_item, ...actual_items, first_item]
    const extendedFunctions = [
        actualFunctions[actualFunctions.length - 1],
        ...actualFunctions,
        actualFunctions[0]
    ];
    const [currentPage, setCurrentPage] = useState(1); // Start at the first actual function
    const [allowTransition, setAllowTransition] = useState(true); // Controls CSS transition

    // Effect to handle snapping for infinite scroll
    useEffect(() => {
        if (!allowTransition) return; // Don't snap if transition is already off

        const timeout = setTimeout(() => {
            if (currentPage === 0) { // If we moved to the cloned last item
                setAllowTransition(false); // Turn off transition
                setCurrentPage(actualFunctions.length); // Snap to the actual last item
            } else if (currentPage === actualFunctions.length + 1) { // If we moved to the cloned first item
                setAllowTransition(false); // Turn off transition
                setCurrentPage(1); // Snap to the actual first item
            }
        }, 500); // Match this with your CSS transition duration

        return () => clearTimeout(timeout);
    }, [currentPage, allowTransition, actualFunctions.length]);

    // Effect for dynamic font size based on content length
    useEffect(() => {
        if (generatedContent) {
            const contentLen = generatedContent.length;
            if (contentLen < 200) {
                setContentFontSizeClass('text-base');
            } else if (contentLen >= 200 && contentLen < 400) {
                setContentFontSizeClass('text-sm');
            } else {
                setContentFontSizeClass('text-xs');
            }
        } else {
            setContentFontSizeClass('text-base'); // Reset when no content
        }
    }, [generatedContent]);


    // Функция для выбора случайного сообщения загрузки
    const getRandomLoadingMessage = () => {
        return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    };

    // Функция для повторной генерации контента
    const handleRegenerateContent = () => {
        if (selectedFunction) {
            handleGenerateContent();
        }
    };

    // Функция для отображения "О проекте" и "Дисклеймер"
    const renderAboutModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className={`
                bg-gray-900 // Более темный и непрозрачный фон для читабельности
                p-6 sm:p-8 rounded-lg shadow-lg text-center
                ${themes.darkMagic.textColor}
                max-w-md w-full mx-auto
                border ${themes.darkMagic.cardBorder}
                transition-all duration-500 ease-in-out // Плавный переход для модального окна
            `}>
                <h2 className={`text-xl font-bold mb-4 ${themes.darkMagic.h2Color}`}>О проекте "Генератор Прогнозов"</h2>
                <p className="mb-4 text-sm sm:text-base">
                    Этот проект создан для развлекательных целей и предлагает различные эзотерические прогнозы и анализы.
                    Используются возможности искусственного интеллекта для генерации текстов на основе астрологических,
                    нумерологических и других эзотерических знаний.
                </p>
                <h2 className={`text-xl font-bold mb-4 ${themes.darkMagic.h2Color}`}>Дисклеймер</h2>
                <p className="mb-4 text-sm sm:text-base">
                    Пожалуйста, помните, что все предсказания, полученные с помощью этого приложения, носят исключительно
                    развлекательный характер. Они не должны рассматриваться как руководство к действию или как
                    профессиональный совет в любых сферах жизни. Принимайте решения, основываясь на собственном здравом
                    смысле и, при необходимости, консультируйтесь со специалистами.
                </p>
                <button onClick={() => setShowAbout(false)} className={`
                    ${themes.darkMagic.buttonBg}
                    text-white font-bold py-2 px-4 rounded-lg
                    focus:outline-none focus:ring-2 ${themes.darkMagic.buttonFocusRing} focus:ring-opacity-75
                    transition duration-300 ease-in-out hover:scale-105
                `}>
                    Закрыть
                </button>
            </div>
        </div>
    );

    // Function to call the LLM API
    const generateText = async (prompt) => {
        setIsLoading(true);
        setErrorMessage('');
        setGeneratedContent('');
        setLoadingMessage(getRandomLoadingMessage()); // Устанавливаем случайное сообщение загрузки
        setShowFullContentModal(false); // Reset to hide full content modal on new generation

        try {
            // Ваш API-ключ, который теперь используется напрямую в фронтенде.
            // ВНИМАНИЕ: Это небезопасно для публичных проектов.
            const apiKey = "AIzaSyByL6L_lTZIozrLRUu8SbAYhY6Fv-01yjM";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Gemini API Error:', errorData);
                throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setGeneratedContent(text);
                setContentKey(prevKey => prevKey + 1);
            } else {
                setGeneratedContent('Не удалось сгенерировать контент. Попробуйте еще раз.');
            }
        } catch (error) {
            console.error('Ошибка при вызове API:', error);
            setErrorMessage(thematicErrorMessages.apiError);
        } finally {
            setIsLoading(false);
        }
    };

    // Handlers for specific content generation based on selected function
    const handleGenerateContent = () => {
        setErrorMessage('');
        let prompt = '';
        const currentDate = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
        const currentTime = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        // Reset all input errors
        let inputErrors = {};

        switch (selectedFunction) {
            case 'horoscope':
                if (!zodiacSign) {
                    inputErrors.zodiacSign = thematicErrorMessages.zodiacSign;
                }
                const signText = zodiacSign ? `для ${zodiacSign}` : 'для всех знаков зодиака';
                const birthTimeText = userBirthTime ? ` и время рождения ${userBirthTime}` : '';
                prompt = `Придумай короткий и позитивный ежедневный гороскоп на сегодня, ${currentDate}, ${signText}. Если указано время рождения (${userBirthTime}), дай более глубокий анализ по категориям: Любовь, Карьера, Здоровье. Ответь простым текстом, без Markdown.`;
                break;
            case 'compatibility':
                if (!userName) inputErrors.userName = thematicErrorMessages.userName;
                if (!partnerName) inputErrors.partnerName = thematicErrorMessages.partnerName;
                prompt = `Оцени совместимость имен '${userName}' и '${partnerName}' по следующим пунктам: Эмоциональная совместимость, Интеллектуальная совместимость, Физическая совместимость. Для каждого пункта дай краткий анализ и конкретные советы. Ответь простым текстом, без Markdown.`;
                break;
            case 'compatibilityBirthDates':
                if (!userBirthDate) inputErrors.userBirthDate = thematicErrorMessages.userBirthDate;
                if (!partnerBirthDate) inputErrors.partnerBirthDate = thematicErrorMessages.partnerBirthDate;
                if (userBirthDate && partnerBirthDate) {
                    // Removed compatibility percentage logic
                } else if (!userBirthDate || !partnerBirthDate) {
                    inputErrors.userBirthDate = thematicErrorMessages.partnerBirthDates; // Reusing for "both dates" scenario
                }
                prompt = `Оцени совместимость двух людей с датами рождения '${userBirthDate}' и '${partnerBirthDate}' с точки зрения астрологии и нумерологии. Разбей анализ на пункты: Эмоциональная связь, Интеллектуальное взаимопонимание, Физическая гармония. Для каждого пункта дай краткий анализ и конкретные советы. Ответь простым текстом, без Markdown.`;
                break;
            case 'numerology':
                if (!userName) inputErrors.userName = thematicErrorMessages.userName;
                prompt = `Сгенерируй краткий нумерологический прогноз на сегодня, ${currentDate}, для имени '${userName}'. Сосредоточься на удаче и возможностях. Ответь простым текстом, без Markdown.`;
                break;
            case 'affirmation':
                prompt = `Придумай вдохновляющую ежедневную аффирмацию или цитату, связанную с позитивом и саморазвитием. Ответь простым текстом, без Markdown.`;
                break;
            case 'funFact':
                prompt = `Сгенерируй интересный и малоизвестный факт об астрологии, нумерологии или эзотерике. Ответь простым текстом, без Markdown.`;
                break;
            case 'dailyAdvice':
                const daysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу'];
                const today = new Date();
                const dayName = daysOfWeek[today.getDay()];
                prompt = `Сгенерируй короткий, мудрый совет на ${dayName} (${currentDate}), связанный с личностным ростом или принятием решений. Ответь простым текстом, без Markdown.`;
                break;
            case 'tarotCard':
                if (!tarotSpread) {
                    inputErrors.tarotSpread = thematicErrorMessages.tarotSpread;
                }
                let tarotPrompt = '';
                if (tarotSpread === 'singleCard') {
                    tarotPrompt = `Вытяни одну карту Таро дня для ${currentDate} и дай краткое толкование, сосредоточившись на совете или предсказании.`;
                } else if (tarotSpread === 'threeCardSpread') {
                    tarotPrompt = `Сделай расклад Таро на три карты (Прошлое, Настоящее, Будущее) для ${currentDate}. Для каждой карты дай краткое толкование и их взаимосвязь.`;
                }
                prompt = `${tarotPrompt} Ответь простым текстом, без Markdown.`;
                break;
            case 'birthPrediction':
                if (!userBirthDate) inputErrors.userBirthDate = thematicErrorMessages.userBirthDate;
                prompt = `Сгенерируй краткое предсказание или анализ личности на основе даты рождения '${userBirthDate}'. Ответь простым текстом, без Markdown.`;
                break;
            case 'lunarCalendar':
                prompt = `Опиши текущую фазу Луны и ее возможное влияние на сегодняшний день, ${currentDate}. Ответь простым текстом, без Markdown.`;
                break;
            case 'personalAmulet':
                if (!zodiacSign) {
                    inputErrors.zodiacSign = thematicErrorMessages.zodiacSign;
                }
                const amuletSignText = zodiacSign ? `для знака зодиака ${zodiacSign}` : '';
                prompt = `Сгенерируй описание персонального амулета или талисмана (камень, цвет, символ), который будет благоприятен ${amuletSignText} на сегодняшний день, ${currentDate}. Ответь простым текстом, без Markdown.`;
                break;
            case 'retrogradePlanets':
                prompt = `Опиши текущие ретроградные планеты (если таковые есть) и их общее влияние на сегодняшний день, ${currentDate}. Ответь простым текстом, без Markdown.`;
                break;
            case 'dreamInterpretation':
                if (!dreamDescription) inputErrors.dreamDescription = thematicErrorMessages.dreamDescription;
                prompt = `Истолкуй следующий сон с эзотерической или психологической точки зрения: "${dreamDescription}". Дай краткое и понятное толкование. Ответь простым текстом, без Markdown.`;
                break;
            case 'astrologicalCalendar':
                prompt = `Опиши важные астрологические события, происходящие или предстоящие в ближайшее время (например, новолуния, полнолуния, вхождения планет в знаки), на текущую дату ${currentDate}. Ответь простым текстом, без Markdown.`;
                break;
            case 'biorhythmCheck':
                if (!userBirthDate) inputErrors.userBirthDate = thematicErrorMessages.userBirthDate;
                prompt = `Рассчитай и опиши текущие физический, эмоциональный и интеллектуальный биоритмы для человека, родившегося ${userBirthDate}, на текущую дату ${currentDate}. Ответь простым текстом, без Markdown.`;
                break;
            case 'positiveFocus':
                if (!focusCategory) inputErrors.focusCategory = thematicErrorMessages.focusCategory;
                prompt = `Сгенерируй "Позитивный фокус дня" для категории "${focusCategory}" на сегодня, ${currentDate}. Выдай тему или качество, на котором стоит сосредоточиться сегодня, с кратким объяснением, как это применить. Ответь простым текстом, без Markdown.`;
                break;
            case 'questionToUniverse':
                if (!userQuestion) inputErrors.userQuestion = thematicErrorMessages.userQuestion;
                // Modified prompt for short, direct answers
                prompt = `На вопрос "${userQuestion}" ответь одним из следующих вариантов: "да", "нет", "больше нет чем да", "возможно", "скорее да, чем нет", "неизвестно". Ответь только одним из этих вариантов, без дополнительных слов или объяснений.`;
                break;
            case 'archetypeOfDay':
                prompt = `Определи и опиши "Архетип дня" для сегодня, ${currentDate}. Объясни, какие энергии или качества этого архетипа будут наиболее актуальны для пользователя сегодня. Ответь простым текстом, без Markdown.`;
                break;
            default:
                setErrorMessage(thematicErrorMessages.unknownFunction);
                return;
        }

        if (Object.keys(inputErrors).length > 0) {
            // Combine all thematic error messages into a single string
            const combinedErrorMessage = Object.values(inputErrors).join(' ');
            setErrorMessage(combinedErrorMessage);
            return;
        }

        generateText(prompt); // Removed .then() for compatibility percentage
    };

    const handleSelectFunction = (funcKey) => {
        setSelectedFunction(funcKey);
        setCurrentView('functionInput'); // Directly go to input view
        setGeneratedContent('');
        setErrorMessage('');
        setUserName('');
        setPartnerName('');
        setZodiacSign('');
        setUserBirthDate('');
        setUserBirthTime('');
        setPartnerBirthDate('');
        setDreamDescription('');
        setTarotSpread('');
        setFocusCategory('');
        setUserQuestion('');
        setShowFunctionListModal(false); // Close the modal if open
    };

    // Carousel navigation functions
    const goToNextPage = () => {
        setAllowTransition(true);
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPrevPage = () => {
        setAllowTransition(true);
        setCurrentPage((prevPage) => prevPage - 1);
    };

    // Function to get a summary (first 3 sentences)
    const getSummary = (text) => {
        if (!text) return '';
        const sentences = text.match(/[^.!?]+[.!?]*/g) || [];
        return sentences.slice(0, 3).join('').trim();
    };


    const renderMainMenu = () => (
        <div className="carousel-container">
            <div
                className="carousel-track"
                style={{
                    transform: `translateX(-${currentPage * 100}%)`,
                    transition: allowTransition ? 'transform 0.5s ease-in-out' : 'none'
                }}
            >
                {extendedFunctions.map((func, index) => (
                    <div key={index} className="carousel-page">
                        <button onClick={() => handleSelectFunction(func.key)} className={`
                            ${themes[currentTheme].buttonBg}
                            text-white rounded-lg shadow-lg
                            transform hover:scale-102 active:scale-95 transition-all duration-300 ease-in-out
                            focus:outline-none focus:ring-2 ${themes[currentTheme].buttonFocusRing} focus:ring-opacity-75
                            flex flex-col items-center justify-center text-center
                        `}>
                            <span className="">{func.icon}</span>
                            <span className="font-bold">{func.title}</span>
                            <span className="text-sm opacity-80 mt-2">{func.description}</span>
                        </button>
                    </div>
                ))}
            </div>
            {actualFunctions.length > 1 && ( // Only show arrows if there's more than one actual function
                <>
                    <button onClick={goToPrevPage} className={`carousel-arrow-button left-arrow ${currentTheme}`}>
                        <svg className="carousel-arrow-svg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <button onClick={goToNextPage} className={`carousel-arrow-button right-arrow ${currentTheme}`}>
                        <svg className="carousel-arrow-svg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </>
            )}
        </div>
    );

    const renderFunctionDetails = () => (
        <div className="animate-fade-in transition-all duration-500 ease-in-out crystal-ball-content-wrapper">
            <h2 className={`text-xl sm:text-2xl font-bold text-center mb-6 ${themes[currentTheme].h2Color}`}>
                {functions[selectedFunction].title}
            </h2>
            <p className={`text-base ${themes[currentTheme].pColor} leading-relaxed mb-8 text-center`}>
                {functions[selectedFunction].description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3"> {/* Reduced gap */}
                <button
                    onClick={() => setCurrentView('functionInput')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                    Использовать функцию
                </button>
                <button
                    onClick={() => setCurrentView('mainMenu')}
                    className={`
                        ${themes[currentTheme].secondaryButtonBg}
                        text-white font-bold py-2 px-4 rounded-lg shadow-lg
                        transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 ${themes[currentTheme].secondaryButtonFocusRing} focus:ring-opacity-75
                    `}
                >
                    Вернуться в главное меню
                </button>
            </div>
        </div>
    );

    const renderFunctionInput = () => {
        const func = functions[selectedFunction];
        // Helper to check if a specific thematic error message is present
        const hasThematicError = (key) => errorMessage.includes(thematicErrorMessages[key]);

        const isLongContent = (generatedContent.match(/[^.!?]+[.!?]*/g) || []).length > 3;
        const displayContent = isLongContent ? getSummary(generatedContent) : generatedContent;

        return (
            <div className={`animate-fade-in transition-all duration-500 ease-in-out crystal-ball-content-wrapper`}>
                <h2 className={`text-xl sm:text-2xl font-bold text-center mb-5 ${themes[currentTheme].h2Color}`}> {/* Reduced mb */}
                    {functions[selectedFunction].title}
                </h2>

                {func.inputs.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mb-6 w-full max-w-md"> {/* Reduced gap and mb */}
                        {func.inputs.includes('userName') && (
                            <div>
                                <label htmlFor="userName" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}> {/* Reduced mb */}
                                    Ваше имя:
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("userName") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].inputPlaceholder} ${themes[currentTheme].textColor} transition-all duration-300 ease-in-out`}
                                    placeholder="Например, Анна"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    title="Введите ваше имя для персонализированных прогнозов."
                                />
                                {hasThematicError("userName") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.userName}</p>}
                            </div>
                        )}
                        {func.inputs.includes('partnerName') && (
                            <div>
                                <label htmlFor="partnerName" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Имя партнера:
                                </label>
                                <input
                                    type="text"
                                    id="partnerName"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("partnerName") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].inputPlaceholder} ${themes[currentTheme].textColor} transition-all duration-300 ease-in-out`}
                                    placeholder="Например, Иван"
                                    value={partnerName}
                                    onChange={(e) => setPartnerName(e.target.value)}
                                    title="Введите имя партнера для проверки совместимости имен."
                                />
                                {hasThematicError("partnerName") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.partnerName}</p>}
                            </div>
                        )}
                        {func.inputs.includes('zodiacSign') && (
                            <div>
                                <label htmlFor="zodiacSign" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Ваш знак зодиака:
                                </label>
                                <select
                                    id="zodiacSign"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("zodiacSign") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].textColor} appearance-none pr-8 ${themes[currentTheme].selectOptionBg} transition-all duration-300 ease-in-out`}
                                    value={zodiacSign}
                                    onChange={(e) => setZodiacSign(e.target.value)}
                                    title="Выберите ваш знак зодиака для получения персонализированного гороскопа."
                                >
                                    <option value="" className={themes[currentTheme].selectOptionBg}>Выберите знак</option>
                                    <option value="Овен" className={themes[currentTheme].selectOptionBg}>Овен</option>
                                    <option value="Телец" className={themes[currentTheme].selectOptionBg}>Телец</option>
                                    <option value="Близнецы" className={themes[currentTheme].selectOptionBg}>Близнецы</option>
                                    <option value="Рак" className={themes[currentTheme].selectOptionBg}>Рак</option>
                                    <option value="Лев" className={themes[currentTheme].selectOptionBg}>Лев</option>
                                    <option value="Дева" className={themes[currentTheme].selectOptionBg}>Дева</option>
                                    <option value="Весы" className={themes[currentTheme].selectOptionBg}>Весы</option>
                                    <option value="Скорпион" className={themes[currentTheme].selectOptionBg}>Скорпион</option>
                                    <option value="Стрелец" className={themes[currentTheme].selectOptionBg}>Стрелец</option>
                                    <option value="Козерог" className={themes[currentTheme].selectOptionBg}>Козерог</option>
                                    <option value="Водолей" className={themes[currentTheme].selectOptionBg}>Водолей</option>
                                    <option value="Рыбы" className={themes[currentTheme].selectOptionBg}>Рыбы</option>
                                </select>
                                {hasThematicError("zodiacSign") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.zodiacSign}</p>}
                            </div>
                        )}
                        {func.inputs.includes('userBirthDate') && (
                            <div>
                                <label htmlFor="userBirthDate" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Ваша дата рождения:
                                </label>
                                <input
                                    type="date"
                                    id="userBirthDate"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${(hasThematicError("userBirthDate") || hasThematicError("partnerBirthDate")) ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].inputPlaceholder} ${themes[currentTheme].textColor} transition-all duration-300 ease-in-out`}
                                    value={userBirthDate}
                                    onChange={(e) => setUserBirthDate(e.target.value)}
                                    title="Введите вашу дату рождения для получения персонального предсказания."
                                />
                                {(hasThematicError("userBirthDate") || hasThematicError("partnerBirthDate")) && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.userBirthDate}</p>}
                            </div>
                        )}
                        {func.inputs.includes('userBirthTime') && (
                            <div>
                                <label htmlFor="userBirthTime" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Ваше время рождения (необязательно):
                                </label>
                                <input
                                    type="time"
                                    id="userBirthTime"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].inputPlaceholder} ${themes[currentTheme].textColor} transition-all duration-300 ease-in-out`}
                                    value={userBirthTime}
                                    onChange={(e) => setUserBirthTime(e.target.value)}
                                    title="Введите ваше время рождения для более точного гороскопа."
                                />
                            </div>
                        )}
                        {func.inputs.includes('partnerBirthDate') && (
                            <div>
                                <label htmlFor="partnerBirthDate" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Дата рождения партнера:
                                </label>
                                <input
                                    type="date"
                                    id="partnerBirthDate"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("partnerBirthDate") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].inputPlaceholder} ${themes[currentTheme].textColor} transition-all duration-300 ease-in-out`}
                                    value={partnerBirthDate}
                                    onChange={(e) => setPartnerBirthDate(e.target.value)}
                                    title="Введите дату рождения партнера для проверки совместимости."
                                />
                                {hasThematicError("partnerBirthDate") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.partnerBirthDate}</p>}
                            </div>
                        )}
                        {func.inputs.includes('dreamDescription') && (
                            <div>
                                <label htmlFor="dreamDescription" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Опишите ваш сон:
                                </label>
                                <textarea
                                    id="dreamDescription"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("dreamDescription") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].inputPlaceholder} ${themes[currentTheme].textColor} h-24 resize-y transition-all duration-300 ease-in-out`}
                                    placeholder="Например, мне приснилось, что я лечу над городом..."
                                    value={dreamDescription}
                                    onChange={(e) => setDreamDescription(e.target.value)}
                                    title="Опишите ваш сон для толкования."
                                ></textarea>
                                {hasThematicError("dreamDescription") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.dreamDescription}</p>}
                            </div>
                        )}
                        {func.inputs.includes('tarotSpread') && (
                            <div>
                                <label htmlFor="tarotSpread" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Выберите расклад Таро:
                                </label>
                                <select
                                    id="tarotSpread"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("tarotSpread") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].textColor} appearance-none pr-8 ${themes[currentTheme].selectOptionBg} transition-all duration-300 ease-in-out`}
                                    value={tarotSpread}
                                    onChange={(e) => setTarotSpread(e.target.value)}
                                    title="Выберите тип расклада Таро."
                                >
                                    <option value="" className={themes[currentTheme].selectOptionBg}>Выберите расклад</option>
                                    <option value="singleCard" className={themes[currentTheme].selectOptionBg}>Одна карта</option>
                                    <option value="threeCardSpread" className={themes[currentTheme].selectOptionBg}>Расклад на 3 карты (Прошлое, Настоящее, Будущее)</option>
                                </select>
                                {hasThematicError("tarotSpread") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.tarotSpread}</p>}
                            </div>
                        )}
                        {func.inputs.includes('focusCategory') && (
                            <div>
                                <label htmlFor="focusCategory" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Выберите категорию фокуса:
                                </label>
                                <select
                                    id="focusCategory"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("focusCategory") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].textColor} appearance-none pr-8 ${themes[currentTheme].selectOptionBg} transition-all duration-300 ease-in-out`}
                                    value={focusCategory}
                                    onChange={(e) => setFocusCategory(e.target.value)}
                                    title="Выберите категорию для позитивного фокуса дня."
                                >
                                    <option value="">Выберите категорию</option>
                                    <option value="Любовь">Любовь</option>
                                    <option value="Карьера">Карьера</option>
                                    <option value="Здоровье">Здоровье</option>
                                    <option value="Личностный рост">Личностный рост</option>
                                    <option value="Финансы">Финансы</option>
                                </select>
                                {hasThematicError("focusCategory") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.focusCategory}</p>}
                            </div>
                        )}
                        {func.inputs.includes('userQuestion') && (
                            <div>
                                <label htmlFor="userQuestion" className={`block text-sm font-medium ${themes[currentTheme].textColor} mb-1`}>
                                    Ваш вопрос к Вселенной:
                                </label>
                                <textarea
                                    id="userQuestion"
                                    className={`w-full px-3 py-2 rounded-lg ${themes[currentTheme].inputBg} ${themes[currentTheme].inputBorder} border ${hasThematicError("userQuestion") ? 'border-red-500' : ''} ${themes[currentTheme].inputFocusRing} ${themes[currentTheme].inputPlaceholder} ${themes[currentTheme].textColor} h-24 resize-y transition-all duration-300 ease-in-out`}
                                    placeholder="Например, что мне нужно знать о завтрашнем дне?"
                                    value={userQuestion}
                                    onChange={(e) => setUserQuestion(e.target.value)}
                                    title="Введите ваш вопрос для получения метафорического ответа."
                                ></textarea>
                                {hasThematicError("userQuestion") && <p className="text-red-500 text-xs mt-1">{thematicErrorMessages.userQuestion}</p>}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6 w-full max-w-md"> {/* Reduced gap and mb */}
                    {!generatedContent && ( // Only show "Generate" button if content is not yet generated
                        <button
                            onClick={handleGenerateContent}
                            className={`
                                ${themes[currentTheme].buttonBg} text-white font-bold py-2 px-4 rounded-lg shadow-lg
                                transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                                focus:outline-none focus:ring-2 ${themes[currentTheme].buttonFocusRing} focus:ring-opacity-75
                            `}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className={`animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 ${themes[currentTheme].loaderBorder} mr-2`}></div> {/* Reduced loader size */}
                                    {loadingMessage}
                                </div>
                            ) : (
                                func.generateButtonText
                            )}
                        </button>
                    )}
                    {generatedContent && !isLoading && (
                        <button
                            onClick={handleRegenerateContent}
                            className={`
                                ${themes[currentTheme].secondaryButtonBg}
                                text-white font-bold py-2 px-4 rounded-lg shadow-lg
                                transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                                focus:outline-none focus:ring-2 ${themes[currentTheme].secondaryButtonFocusRing} focus:ring-opacity-75
                            `}
                        >
                            Сгенерировать снова
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setCurrentView('mainMenu');
                            setGeneratedContent('');
                            setErrorMessage('');
                        }}
                        className={`
                            ${themes[currentTheme].secondaryButtonBg}
                            text-white font-bold py-2 px-4 rounded-lg shadow-lg
                            transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                            focus:outline-none focus:ring-2 ${themes[currentTheme].secondaryButtonFocusRing} focus:ring-opacity-75
                        `}
                    >
                        Вернуться в главное меню
                    </button>
                </div>

                {errorMessage && (
                    <div className={`
                        ${themes[currentTheme].errorBg} ${themes[currentTheme].errorBorder} border
                        ${themes[currentTheme].errorText} p-3 rounded-lg mb-5 text-center animate-fade-in transition-all duration-300 ease-in-out w-full max-w-md
                    `}> {/* Reduced padding and mb */}
                        {errorMessage}
                    </div>
                )}

                {generatedContent && (
                    <div key={contentKey} className={`
                        w-full max-w-md prediction-text-reveal flex flex-col items-center
                    `}>
                        {/* Изменения здесь: уменьшен размер шрифта и отступ надписи "Ваш прогноз:" */}
                        <h2 className={`text-sm sm:text-base font-semibold ${themes[currentTheme].h2Color} mb-1`}>
                            Ваш прогноз:
                        </h2>
                        <div className={`w-full relative overflow-hidden ${isLongContent ? 'fade-out-mask-text' : ''}`}>
                            <p
                                className={`${contentFontSizeClass} ${themes[currentTheme].pColor} font-serif font-normal whitespace-pre-wrap`}
                                // Атрибут style используется для применения инлайн-стилей, включая CSS-переменвые для эффекта свечения текста.
                                style={{ '--text-glow-color': themes[currentTheme].textGlowColor, '--text-glow-color-secondary': themes[currentTheme].textGlowColorSecondary }}
                            >
                                {displayContent} {/* Display summarized content here */}
                            </p>
                        </div>
                        {isLongContent && (
                            <button
                                onClick={() => setShowFullContentModal(true)} // Open the modal
                                className={`
                                    mt-4 py-1 px-2 text-xs
                                    ${themes[currentTheme].secondaryButtonBg}
                                    text-white font-bold rounded-lg shadow-lg
                                    transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                                    focus:outline-none focus:ring-2 ${themes[currentTheme].secondaryButtonFocusRing} focus:ring-opacity-75
                                `}
                            >
                                Подробнее
                            </button>
                        )}
                        {/* Removed the conditional rendering for "Попробуйте переформулировать..." */}
                    </div>
                )}
            </div>
        );
    };

    const renderFunctionListModal = () => (
        <div className="function-list-modal-overlay">
            <div className={`function-list-modal ${currentTheme}`} style={{ backgroundColor: `var(--modal-bg-color)` }}>
                <h3>Список функций</h3>
                <div className="function-list-modal-grid">
                    {Object.keys(functions).map((key) => (
                        <button
                            key={key}
                            onClick={() => handleSelectFunction(key)}
                            className=""
                        >
                            <span>{functions[key].icon}</span>
                            <span>{functions[key].title}</span>
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setShowFunctionListModal(false)}
                    className={`function-list-modal-close-button ${currentTheme}`}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );

    const themeKeys = Object.keys(themes);

    const handleCycleTheme = () => {
        const currentIndex = themeKeys.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        setCurrentTheme(themeKeys[nextIndex]);
    };

    return (
        <>
            <GlobalStyles /> {/* Inject global CSS animations */}
            {/* SVG filter for micro-cracks/imperfections */}
            <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="f1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2" />
                    <feComposite operator="in" in2="SourceGraphic" in="f2" result="f3" />
                    <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="f3" />
                </filter>
            </svg>

            <div className={`min-h-screen w-full bg-gradient-to-br ${themes[currentTheme].gradient} ${themes[currentTheme].textColor} p-4 sm:p-8 flex flex-col items-center justify-center font-inter background-animated transition-colors duration-500 ease-in-out`}>
                {/* Background elements (stars/particles) - Layer 1 (farthest) */}
                <div className="background-elements"></div>
                {/* Background elements (stars/particles) - Layer 2 (mid-distance) */}
                <div className="background-elements layer-2"></div>
                {/* Background elements (stars/particles) - Layer 3 (closest) */}
                <div className="background-elements layer-3"></div>

                {/* Northern Lights background layer */}
                <div className="northern-lights-bg"></div>

                {/* Top right controls */}
                <div className="absolute top-4 right-4 z-10 flex flex-col items-end space-y-2">
                    {/* Settings Icon and Dropdown */}
                    <div className="relative z-20">
                        <button
                            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                            className={`
                                ${themes[currentTheme].secondaryButtonBg}
                                text-white p-3 rounded-full shadow-lg
                                focus:outline-none focus:ring-2 ${themes[currentTheme].secondaryButtonFocusRing} focus:ring-opacity-75
                                transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                            `}
                            title="Настройки"
                        >
                            <span className="text-xl">⚙️</span>
                        </button>
                        {showSettingsMenu && (
                            <div className={`
                                absolute right-0 mt-2 w-48 rounded-md shadow-lg
                                bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none
                                transition-all duration-300 ease-in-out transform origin-top-right scale-100 opacity-100 z-30`}>
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {/* Кнопка для смены темы */}
                                    <button
                                        onClick={handleCycleTheme}
                                        className={`
                                            ${themes[currentTheme].textColor} block w-full text-left px-4 py-2 text-sm
                                            hover:bg-opacity-20 hover:bg-white transition-colors duration-200 ease-in-out
                                        `}
                                        role="menuitem"
                                    >
                                        Сменить тему 🎨
                                    </button>
                                    {/* Кнопка для "О проекте" */}
                                    <button
                                        onClick={() => {
                                            setShowAbout(true);
                                            setShowSettingsMenu(false);
                                        }}
                                        className={`
                                            ${themes[currentTheme].textColor} block w-full text-left px-4 py-2 text-sm
                                            hover:bg-opacity-20 hover:bg-white border-t border-gray-700 mt-1 pt-2 transition-colors duration-200 ease-in-out
                                        `}
                                        role="menuitem"
                                    >
                                        О проекте ℹ️
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* New button for function list, outside the dropdown */}
                    <button
                        onClick={() => setShowFunctionListModal(true)}
                        className={`
                            ${themes[currentTheme].secondaryButtonBg}
                            text-white p-3 rounded-full shadow-lg
                            focus:outline-none focus:ring-2 ${themes[currentTheme].secondaryButtonFocusRing} focus:ring-opacity-75
                            transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
                        `}
                        title="Список функций"
                    >
                        <span className="text-xl">📋</span>
                    </button>
                </div>

                {/* Moved title outside the crystal ball */}
                <h1 className={`absolute top-10 sm:top-16 text-2xl sm:text-3xl font-bold ${themes[currentTheme].h1Color} drop-shadow-lg text-center px-4 z-0`}>
                    🔮 Твой Прогноз 🌟
                </h1>

                {/* Crystal Ball and Stand Wrapper (now just the ball) */}
                <div className="crystal-ball-and-stand-wrapper">
                    <div className={`
                        crystal-ball
                        ${themes[currentTheme].crystalBallAnimation ? `animate-[${themes[currentTheme].crystalBallAnimation}_4s_infinite_alternate]` : ''}
                        ${isCrystalBallActive ? 'touch-active' : ''}
                        `}
                        style={{
                            background: themes[currentTheme].crystalBallBackground,
                            boxShadow: themes[currentTheme].crystalBallShadowStart,
                            '--crystal-ball-shadow-start': themes[currentTheme].crystalBallShadowStart,
                            '--crystal-ball-shadow-end': themes[currentTheme].crystalBallShadowEnd,
                        }}
                        onMouseEnter={() => setIsCrystalBallActive(true)}
                        onMouseLeave={() => setIsCrystalBallActive(false)}
                        onMouseDown={() => setIsCrystalBallActive(true)}
                        onMouseUp={() => setIsCrystalBallActive(false)}
                    >
                        {/* Inner Fog Effect */}
                        <div className="inner-fog"></div>

                        <div className="crystal-ball-content-wrapper">
                            {currentView === 'mainMenu' && renderMainMenu()}
                            {currentView === 'functionDetails' && selectedFunction && renderFunctionDetails()}
                            {currentView === 'functionInput' && selectedFunction && renderFunctionInput()}
                        </div>
                    </div>
                </div>

                {showAbout && renderAboutModal()}
                {showFunctionListModal && renderFunctionListModal()}
                {showFullContentModal && (
                    <FullContentModal
                        content={generatedContent}
                        onClose={() => setShowFullContentModal(false)}
                        theme={currentTheme}
                    />
                )}

                {/* Vignette effect */}
                <div className="vignette"></div>
            </div>
        </>
    );
};

export default App;