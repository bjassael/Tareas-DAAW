const ROUND_INCREMENT = 0.005;

// in seconds
const MAX_ROUND_TIME = 5;
const SCORE_PER_CORRECT_ANSWER = 5;

const PENALTY_SCORE_FOR_MISSING = -5;
const PENALTY_SCORE_FOR_EXCEED_MAX_TIME = -3;

// grab button reference
const option1 = document.getElementById("guess1");
const option2 = document.getElementById("guess2");
const option3 = document.getElementById("guess3");
const option4 = document.getElementById("guess4");

const PLAYER_1_KEYS = { a: option1, s: option2, d: option3, f: option4 };
const PLAYER_2_KEYS = { h: option1, j: option2, k: option3, l: option4 };