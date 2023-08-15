'use client'
import { useEffect, useState } from "react";
import styles from './search.module.css'
//react-instantsearch-hooks-web
//https://github.com/algolia/instantsearch


export interface SearchBoxProps {
    setSearchedOrg: any
}

export interface SearchResultsProps {
    clear: any
    value: string
    setValue: any
    setSearchedOrg: any
}

export interface SearchHitProps {
    hit: any
    clear: any
    value: string
    setValue: any
    setSearchedOrg: any
}

export interface SearchbarProps {
    setSearchedOrg: any
}


const Search = () => {
    return (
        <>
            <div className={styles.Search}>
                <input type="text" placeholder="Search for an organization" />
            </div>
        </>
    )
}
export default Search