import Driver from "./Driver";

class LocalStorage extends Driver {
    storage: Storage = localStorage

    clear(): void {
        this.storage.clear()
    }

    getItem(key: string): object | null {
        let item = this.storage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }

        return null
    }

    removeItem(key: string): void {
        this.storage.removeItem(key)
    }

    save(key: string, data: any): void {
        this.storage.setItem(key, JSON.stringify(data))
    }
}

export default LocalStorage