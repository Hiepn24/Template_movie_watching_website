import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://api.themoviedb.org",
    headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTYzZDJiYTE4YzE0ZDgxN2ZkZjBmYjA0MmI3MmZmNyIsIm5iZiI6MTczNTgxMDQxNC40NDgsInN1YiI6IjY3NzY1ZDZlMGYyNDhlODUwODEyZWQzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V8a4V6yZ02J8umJKDa_DZvQwmdisSQ3pFaucz5bNko0",
    }
})