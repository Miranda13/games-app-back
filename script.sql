CREATE TABLE teams (
	team_id SMALLSERIAL PRIMARY KEY,
	name VARCHAR(250) NOT NULL,
	url_flag_image VARCHAR NOT NULL
);

CREATE TABLE locations (
	location_id SMALLSERIAL PRIMARY KEY,
	name_stadium VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	active boolean NOT NULL
);

CREATE TABLE games (
	game_id SMALLSERIAL PRIMARY KEY,
	hour TIME NOT NULL,
	date DATE NOT NULL,
	played BOOLEAN NOT NULL,
	active BOOLEAN NOT NULL,
	location_id SMALLINT,
	CONSTRAINT fk_locations
		FOREIGN KEY(location_id)
			REFERENCES locations(location_id)
			ON DELETE CASCADE
);

CREATE TABLE scores (
	score_id SMALLSERIAL PRIMARY KEY,
	score SMALLINT NOT NULL,
	team_id SMALLINT NOT NULL,
	game_id SMALLINT NOT NULL,
	CONSTRAINT fk_teams
		FOREIGN KEY(team_id)
			REFERENCES teams(team_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_games
		FOREIGN KEY(game_id)
			REFERENCES games(game_id)
			ON DELETE CASCADE
);
