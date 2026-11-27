package server

import "net/http"

// newMux wires every API route onto one mux.
func newMux(cfg Config) *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("/api/teams", teamsHandler(cfg.TeamsStore))
	mux.Handle("/api/health", healthHandler())
	mux.Handle("/api/version", versionHandler(cfg.Build))
	mux.Handle("/api/metrics", metricsHandler(cfg.Registry))
	mux.Handle("/api/login", loginHandler(cfg.Auth))
	mux.Handle("/api/logout", logoutHandler(cfg.Auth))
	mux.Handle("/api/users", usersHandler(cfg.UsersStore))
	return mux
}
