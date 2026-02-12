import React, { useState, useEffect } from 'react';
import '../css/filterbar.css';
import { getGenres } from '../../api';
import { FaSmile, FaSadTear, FaFire, FaGhost, FaHeart, FaBrain } from 'react-icons/fa';

const FilterBar = ({ onFilterChange }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreList = await getGenres();
                setGenres(genreList);
            } catch (error) {
                console.error("Failed to load genres", error);
            }
        };
        fetchGenres();
    }, []);

    const updateFilters = (genre, year, mood, language) => {
        onFilterChange({ genreId: genre, year: year, mood: mood, language: language });
    };

    const handleGenreChange = (e) => {
        const newVal = e.target.value;
        setSelectedGenre(newVal);
        updateFilters(newVal, selectedYear, selectedMood, selectedLanguage);
    };

    const handleYearChange = (e) => {
        const newVal = e.target.value;
        setSelectedYear(newVal);
        updateFilters(selectedGenre, newVal, selectedMood, selectedLanguage);
    };

    const handleLanguageChange = (e) => {
        const newVal = e.target.value;
        setSelectedLanguage(newVal);
        updateFilters(selectedGenre, selectedYear, selectedMood, newVal);
    };

    const handleMoodChange = (mood) => {
        const newMood = selectedMood === mood ? '' : mood;
        setSelectedMood(newMood);
        updateFilters(selectedGenre, selectedYear, newMood, selectedLanguage);
    };

    // Generate years
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1980; i--) {
        years.push(i);
    }

    const moods = [
        { id: 'happy', label: 'Happy', icon: <FaSmile /> },
        { id: 'sad', label: 'Sad', icon: <FaSadTear /> },
        { id: 'exciting', label: 'Exciting', icon: <FaFire /> },
        { id: 'scary', label: 'Scary', icon: <FaGhost /> },
        { id: 'romantic', label: 'Romantic', icon: <FaHeart /> },
        { id: 'thoughtful', label: 'Thoughtful', icon: <FaBrain /> },
    ];

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'ko', name: 'Korean' },
        { code: 'ja', name: 'Japanese' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ta', name: 'Tamil' },
        { code: 'te', name: 'Telugu' },
        { code: 'ml', name: 'Malayalam' }
    ];

    return (
        <div className="filter-bar">
            <div className="filter-group">
                <select className="filter-select" value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">All Genres</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <select className="filter-select" value={selectedYear} onChange={handleYearChange}>
                    <option value="">All Years</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <select className="filter-select" value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="">All Languages</option>
                    {languages.map((l) => (
                        <option key={l.code} value={l.code}>{l.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group mood-selector">
                {moods.map((m) => (
                    <button
                        key={m.id}
                        className={`mood-btn ${selectedMood === m.id ? 'active' : ''}`}
                        onClick={() => handleMoodChange(m.id)}
                        title={m.label}
                    >
                        <span className="mood-icon">{m.icon}</span>
                        <span className="mood-label">{m.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
