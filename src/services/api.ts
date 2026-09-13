const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function getBeds() {
    try {
        const response = await fetch(`${API_BASE_URL}/beds`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        throw e;
    }
}
