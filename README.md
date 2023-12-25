# Battleship Game

 <p align="center">
	<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/kbly538/Battleship?color=lightblue" />
	<img alt="Number of lines of code" src="https://img.shields.io/badge/total_lines-2214-green" />
	<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/kbly538/Battleship?color=blue" />
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/kbly538/Battleship?color=green" />
 	<img alt="Test coverage files" src="https://img.shields.io/badge/coverage_files-2-green?labelColor=red&color=green" />
	<img alt="Test coverage functions" src="https://img.shields.io/badge/coverage_lines-%2598.38-green?labelColor=red&color=green" />
	<img alt="Test coverage lines" src="https://img.shields.io/badge/coverage_functions-%25100-green?labelColor=red&color=green" />
</p>

---

<p align="center">	
<img width="669" alt="battle-ship-placement" src="https://github.com/kbly538/Battleship/assets/4437722/2f092251-d3a2-4f66-9272-73afe3bd3dcc">
<img width="1124" alt="battleship-player-vs-ai" src="https://github.com/kbly538/Battleship/assets/4437722/c786580b-2bbb-44ad-bf7a-3cfbf3c2af11">
</p>


This is a JavaScript implementation of the Battleship game. It allows two players to place their ships on a gameboard and take turns trying to sink each other's ships by guessing the coordinates. The game supports both player vs. player and player vs. AI modes.
This project were written as part of the ODIN PROJECT to practice especially TDD using jest.

Game mechanics in ```engine``` folder were written using **TDD** but dom manipulation and ui were subject to more orthodox testing methods aka console.log 

## Features

- AI vs. AI mode: An AI player can play against an AI opponent at different difficulty levels (easy and medium).
- Ship placement: Players can place their ships on a gameboard by selecting cells and choosing the ship orientation.
- Hit and miss tracking: The game keeps track of each player's hits and misses, displaying the statistics in real-time.
- Game loop: The game can be played in a loop, allowing multiple rounds to be played consecutively (This is for AI vs AI for statistical analysis of AI implementations success rate.).
- Game results: At the end of the loop, the game displays the winner and the win rate for each player.

## To-Do
- Player vs. Player mode: Two human players can take turns playing against each other.
- Player vs. AI mode: A human player can play against an AI opponent at different difficulty levels (easy and medium).
- Hard difficulty AI
- Game results Screen: At the end of the loop, the game displays the winner and the win rate for each player.

## Example AI vs AI
[ai_vs_ai.webm](https://github.com/kbly538/Battleship/assets/4437722/93d2a26d-5258-4a9d-a924-838e36a62038)

