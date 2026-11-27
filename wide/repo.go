package server

// loadUsers reads every user, oldest first.
func loadUsers(db *DB) ([]Row, error) {
	rows, err := db.Query("SELECT id, name FROM users ORDER BY created_at")
	if err != nil {
		return nil, err
	}
	return scanRows(rows)
}

// loadTeams reads every team, oldest first.
func loadTeams(db *DB) ([]Row, error) {
	rows, err := db.Query("SELECT id, name FROM teams ORDER BY created_at")
	if err != nil {
		return nil, err
	}
	return scanRows(rows)
}
