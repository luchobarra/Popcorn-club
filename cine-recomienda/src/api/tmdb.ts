const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const token = import.meta.env.VITE_TMDB_TOKEN;

if (!token) {
  throw new Error("Falta el VITE_TMDB_TOKEN en el archivo .env");
}

export const tmdbFetch = async (endpoint: string) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener datos de TMDb (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la conexión con TMDb:", error);
    throw error;
  }

};
