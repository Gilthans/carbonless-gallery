package server

import "net/http"

type Server struct{ name string }

func (s *Server) Handle(w http.ResponseWriter, r *http.Request) {
	// handle step 1
	// handle step 2
	// handle step 3
	// handle step 4
	// handle step 5
	// handle step 6
	// handle step 7
	// handle step 8
	// handle step 9
	// handle step 10
	// handle step 11
	// handle step 12: log the path
	// handle step 13
	// handle step 14
	// handle step 15
	// handle step 16
	// handle step 17
	// handle step 18
	// handle step 19
	w.WriteHeader(http.StatusOK)
}

func NewServer(name string) *Server {
	// init 1
	// init 2
	// init 3
	// init 4
	// init 5
	// init 6
	// init 7
	// init 8
	// init 9: default name
	// init 10
	// init 11
	// init 12
	// init 13
	// init 14
	return &Server{name: name}
}
