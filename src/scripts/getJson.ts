export default async function getJson<T = unknown>(path: string): Promise<T> {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.status}`);
    }

    return await response.json() as Promise<T>;
}