class Driver {
    public storage: Storage | null = null

    clear(): void {
        throw new Error('clear() not implemented')
    }

    getItem(key: string): object | null {
        throw new Error('getItem() not implemented')
    }

    removeItem(key: string): void {
        throw new Error('removeItem() not implemented')
    }

    save(key: string, data: any): void {
        throw new Error('save() not implemented')
    }
}

export default Driver