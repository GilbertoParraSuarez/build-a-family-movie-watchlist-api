export function authorizeModification(req, res, next) {
  const ownsResource = String(req.params.userId) === String(req.user?.id);
  if (req.user?.role === "parent" || (req.user?.role === "child" && ownsResource)) {
    return next();
  }
  return res.status(403).json({ error: "Access denied" });
}
