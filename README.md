# Battleship Game

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