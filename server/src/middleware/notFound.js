// Catches any request that didn't match a route.
// Must be registered AFTER all routes and BEFORE the error handler.

export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  error.errorCode = "ROUTE_NOT_FOUND";
  next(error);
}
