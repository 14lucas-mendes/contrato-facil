import { useEffect, useState } from "react";

export default function useLocalStorage<D>(key: string, initialValue: D) {
    const [value, setvalue] = useState<D>(() => {
        try {
            const item = localStorage.getItem(key)

            return item ? (JSON.parse(item) as D) : initialValue
        }catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        }catch{
            //error
        }
    }, [key, value])

    return [value, setvalue] as const
}