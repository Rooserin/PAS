"use client"

import { useState } from 'react';
import styles from './SearchBar.module.css'
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';


export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (query.trim() === '') return;
        // 携带查询参数跳转到 /chat 页面
        router.push(`/chat?q=${encodeURIComponent(query)}`);
      };

    return (
        <div className={styles.container}>
            <textarea
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                    const parentElement = e.target.parentElement;
                    if (parentElement) {
                        parentElement.style.height = `${e.target.scrollHeight + '10px'}px`;
                    }
                }}
                className={styles.textarea}
                placeholder='SSVGG'
            />
            <div className={styles.toolbar}>
        <FaSearch 
          className={styles.searchButton} 
          onClick={handleSearch} 
          style={{ cursor: 'pointer' }} 
        />
      </div>
        </div>)
}                             