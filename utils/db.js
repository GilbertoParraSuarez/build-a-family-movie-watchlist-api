import fs from "node:fs";

const usersFile = "./data/users.json";
const watchlistsFile = "./data/watchlists.json";
const readJson = file => JSON.parse(fs.readFileSync(file, "utf8"));
const writeJson = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2));

export const readWatchlists = () => readJson(watchlistsFile);
export const writeWatchlists = watchlists => writeJson(watchlistsFile, watchlists);
export const findByUsername = username => readJson(usersFile).find(user => user.username === username);
export const findById = id => readJson(usersFile).find(user => user.id === Number(id));

export function getWatchlist(userId) {
  return findById(userId) ? readWatchlists()[String(userId)] ?? [] : null;
}
export function addMovie(userId, movieData) {
  if (!findById(userId)) return null;
  const watchlists = readWatchlists();
  const list = watchlists[String(userId)] ?? [];
  const movie = { id: list.reduce((max, item) => Math.max(max, item.id), 0) + 1, title: movieData.title, genre: movieData.genre, watched: false };
  watchlists[String(userId)] = [...list, movie];
  writeWatchlists(watchlists);
  return movie;
}
export function updateMovie(userId, movieId, updates) {
  const watchlists = readWatchlists();
  const list = watchlists[String(userId)];
  const index = list?.findIndex(movie => movie.id === movieId) ?? -1;
  if (index < 0) return null;
  list[index] = { ...list[index], ...updates, id: movieId };
  writeWatchlists(watchlists);
  return list[index];
}
export function deleteMovie(userId, movieId) {
  const watchlists = readWatchlists();
  const list = watchlists[String(userId)];
  const index = list?.findIndex(movie => movie.id === movieId) ?? -1;
  if (index < 0) return false;
  list.splice(index, 1);
  watchlists[String(userId)] = list;
  writeWatchlists(watchlists);
  return true;
}
